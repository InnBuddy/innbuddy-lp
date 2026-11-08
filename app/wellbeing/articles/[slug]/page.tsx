import { notFound } from 'next/navigation';
import Link from 'next/link';
import parse, { HTMLReactParserOptions, domToReact, Element, Text } from 'html-react-parser';
import articlesData from '@/data/wellbeingarticles.json';

interface Article {
  filename: string;
  base_id: string;
  no: string;
  id: string;
  title: string;
  category: string;
  subcategory: string;
  type: string;
  intent: string;
  reader: string;
  wb_theme: string;
  mg_theme: string;
  markdown?: string;
  html: string;
}

// 漢数字を算用数字に変換する関数
function convertKanjiNumbers(text: string): string {
  const kanjiMap: { [key: string]: string } = {
    '一': '1', '二': '2', '三': '3', '四': '4', '五': '5',
    '六': '6', '七': '7', '八': '8', '九': '9', '〇': '0'
  };
  return text.replace(/[一二三四五六七八九〇]+/g, (match) => {
    return match.split('').map((char) => kanjiMap[char] || char).join('');
  });
}

// 静的パス事前生成(SSG用)
export async function generateStaticParams() {
  const articles = articlesData as Article[];
  return articles.map((article) => ({
    slug: article.base_id,
  }));
}

export default async function ArticleDetailPage(props: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const params = await Promise.resolve(props.params);
  const slug = params.slug;
  const articles = articlesData as Article[];
  const article = articles.find((a) => a.base_id === slug);

  if (!article) {
    notFound();
  }

  // カテゴリごとに記事をグループ化 (サイドバー用)
  const groupedByCategory = articles.reduce((acc, a) => {
    const cat = a.category || 'その他';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(a);
    return acc;
  }, {} as Record<string, Article[]>);

  const categories = Object.keys(groupedByCategory);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // 1. 指定された「この記事は InnBuddy...」のblockquote を完全削除
        if (domNode.name === 'blockquote') {
          let textContent = '';
          const extractText = (node: any) => {
            if (node.type === 'text') textContent += node.data;
            if (node.children) node.children.forEach(extractText);
          };
          extractText(domNode);
          if (textContent.includes('この記事は') && textContent.includes('Knowledge Hub')) {
            return <></>;
          }
        }

        // 2. 「NEXT READ」 およびそれに続くリストをキャッチしてカード化
        if (domNode.name === 'p') {
          let textContent = '';
          const getPText = (node: any) => {
            if (node.type === 'text') textContent += node.data;
            if (node.children) node.children.forEach(getPText);
          };
          getPText(domNode);
          if (textContent.includes('NEXT READ')) {
            return (
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-12 mb-4 bg-gray-100 px-3 py-1 inline-block rounded">
                NEXT READ
              </h3>
            );
          }

          // IDコード(例: RC025) を含む段落全体をカードリンクへ置換
          const articleIdRegex = /([A-Z]{2}\d{3})/;
          if (textContent.match(articleIdRegex) && (textContent.includes('・') || textContent.includes('...'))) {
            const match = textContent.match(articleIdRegex);
            if (match) {
              const targetId = match[1];
              const linkedArticle = articles.find((a) => a.id === targetId);
              if (linkedArticle) {
                return (
                  <Link
                    href={`/wellbeing/articles/${linkedArticle.base_id}`}
                    className="flex items-center gap-3 px-4 py-3.5 my-2.5 bg-white hover:bg-[#fbfaf6] rounded-xl border border-gray-200 hover:border-[#3a5a40]/40 text-[#1a231c] text-sm font-bold transition-all shadow-sm w-full max-w-md group"
                  >
                    <span className="bg-[#f4f1de] px-2 py-0.5 rounded text-[11px] text-[#3a5a40] font-mono group-hover:bg-[#3a5a40] group-hover:text-white transition-colors">
                      {linkedArticle.id}
                    </span>
                    <span className="truncate flex-1 group-hover:text-[#3a5a40]">
                      {linkedArticle.title}
                    </span>
                    <span className="text-gray-300 group-hover:text-[#3a5a40] transition-colors group-hover:translate-x-1 transform">
                      →
                    </span>
                  </Link>
                );
              }
            }
          }
        }

        // 3. 各タグのタイポグラフィ調整
        if (domNode.name === 'a') {
          const href = domNode.attribs?.href || '#';

          // 内部の .md リンク (例: A003-RC003.md) を Next.js のルートへ変換
          if (href.endsWith('.md')) {
            const cleanSlug = href.replace(/\.md$/, '').replace(/^\.\//, '');
            return (
              <Link
                href={`/wellbeing/articles/${cleanSlug}`}
                className="text-[#3a5a40] hover:underline font-bold break-words"
              >
                {/* @ts-ignore */}
                {domToReact(domNode.children, options)}
              </Link>
            );
          }

          // 外部Webサイトへのリンク
          if (href.startsWith('http://') || href.startsWith('https://')) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3a5a40] underline underline-offset-2 hover:opacity-80 font-medium break-all"
              >
                {/* @ts-ignore */}
                {domToReact(domNode.children, options)}
              </a>
            );
          }

          return (
            <Link href={href} className="text-[#3a5a40] hover:underline font-bold break-words">
              {/* @ts-ignore */}
              {domToReact(domNode.children, options)}
            </Link>
          );
        }

        if (domNode.name === 'hr') {
          return <hr className="border-t-2 border-[#E2DDD5] my-10" />;
        }

        const className = domNode.attribs?.class || '';

        // ▼ 記事タイトル（H1）: 背景 #e8eedd、文字色 #3a5a40 に変更
        if (className.includes('art-h1') || domNode.name === 'h1') {
          // @ts-ignore
          return (
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3a5a40] bg-[#e8eedd] p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl leading-snug sm:leading-tight mb-8 tracking-tight break-words shadow-sm">
              {domToReact(domNode.children, options)}
            </h1>
          );
        }

        if (className.includes('art-h2') || domNode.name === 'h2') {
          // @ts-ignore
          return (
            <h2 className="text-xl md:text-2xl font-bold text-[#3a5a40] leading-snug mt-12 mb-6 tracking-tight flex items-center gap-3 break-words">
              <span className="w-1.5 h-6 bg-[#D3E173] rounded-full inline-block shrink-0"></span>
              {domToReact(domNode.children, options)}
            </h2>
          );
        }

        if (className.includes('art-h3') || domNode.name === 'h3') {
          // @ts-ignore
          return (
            <h3 className="text-lg md:text-xl font-bold text-[#1a231c] mt-10 mb-4 break-words">
              {domToReact(domNode.children, options)}
            </h3>
          );
        }

        if (className.includes('art-p') || domNode.name === 'p') {
          // @ts-ignore
          return (
            <p className="text-[15px] md:text-base text-gray-700 leading-[1.9] mb-6 tracking-wide break-words">
              {domToReact(domNode.children, options)}
            </p>
          );
        }

        if (className.includes('quote-box') || domNode.name === 'blockquote') {
          // @ts-ignore
          return (
            <blockquote className="bg-[#f8f9fa] border-l-4 border-[#3a5a40] p-4 sm:p-6 md:p-8 rounded-r-xl my-8 text-gray-700 italic shadow-sm break-words">
              {domToReact(domNode.children, options)}
            </blockquote>
          );
        }

        // 出典などの番号付きリスト
        if (domNode.name === 'ol') {
          // @ts-ignore
          return (
            <ol className="list-decimal pl-6 mb-8 text-[14px] md:text-[15px] text-gray-600 leading-[1.8] space-y-3 marker:text-[#3a5a40] marker:font-bold break-words">
              {domToReact(domNode.children, options)}
            </ol>
          );
        }

        if (className.includes('art-ul') || domNode.name === 'ul') {
          // @ts-ignore
          return (
            <ul className="list-disc pl-6 mb-8 text-[15px] md:text-base text-gray-700 leading-[1.8] space-y-2 marker:text-[#3a5a40] break-words">
              {domToReact(domNode.children, options)}
            </ul>
          );
        }

        if (domNode.name === 'li') {
          // @ts-ignore
          return (
            <li className="pl-1 leading-relaxed break-words">
              {domToReact(domNode.children, options)}
            </li>
          );
        }
      }

      // 4. テキスト内の漢数字変換 & URLの自動リンク化
      if (domNode instanceof Text) {
        if (domNode.data.trim() === '') return;

        const urlRegex = /(https?:\/\/[^\s（）()]+)/g;
        if (urlRegex.test(domNode.data)) {
          const parts = domNode.data.split(urlRegex);
          return (
            <>
              {parts.map((part: string, i: number) =>
                urlRegex.test(part) ? (
                  <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3a5a40] underline underline-offset-2 break-all hover:opacity-80 font-medium"
                  >
                    {part}
                  </a>
                ) : (
                  convertKanjiNumbers(part)
                )
              )}
            </>
          );
        }

        return <>{convertKanjiNumbers(domNode.data)}</>;
      }
    },
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#f4f5f4] min-h-screen text-[#1a231c] font-sans flex flex-col">
      {/* #C7DC68 のアクセントヘッダー */}
      <header className="w-full bg-[#C7DC68] sticky top-0 z-50 shadow-sm border-b border-[#3a5a40]/15 py-3.5 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/wellbeing/articles"
            className="text-xs md:text-sm font-bold text-[#1a231c] hover:text-[#3a5a40] flex items-center gap-1.5 transition-colors bg-white/70 hover:bg-white px-3.5 py-1.5 rounded-full shadow-sm shrink-0"
          >
            <span>←</span> 記事一覧へ戻る
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1a231c] bg-white/80 px-3 py-1 rounded-full shadow-sm border border-[#1a231c]/10">
              {article.no}
            </span>
          </div>
        </div>
      </header>

      {/* メインレイアウト(左: 記事本体 / 右:カテゴリ別アコーディオン) */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 mt-6 sm:mt-8 mb-24 flex flex-col lg:flex-row gap-8 items-start flex-grow">
        {/* 左側: 記事コンテンツ */}
        <main className="w-full min-w-0 lg:w-[72%] bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-8 md:p-12 xl:p-16">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-gray-100">
            <span className="text-xs font-bold text-white px-3 sm:px-4 py-1.5 bg-[#3a5a40] rounded-full shadow-sm">
              {article.category}
            </span>
            <span className="text-xs font-bold text-gray-600 px-3 sm:px-4 py-1.5 bg-[#f4f1de] rounded-full">
              {article.subcategory}
            </span>
            <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-medium text-gray-400 mt-2 sm:mt-0">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></span>
                {article.type}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></span>
                対象:{article.reader}
              </span>
            </div>
          </div>

          <div className="article-content w-full min-w-0 break-words [overflow-wrap:anywhere]">
            {parse(article.html, options)}
          </div>
        </main>

        {/* 右側: サイドバー (アコーディオン) */}
        <aside className="w-full min-w-0 lg:w-[28%] lg:sticky lg:top-[88px] self-start">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-7">
            <h3 className="text-sm font-bold text-[#3a5a40] mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
              <svg className="w-4 h-4 text-[#3a5a40] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              カテゴリから探す
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => {
                const catArticles = groupedByCategory[cat];
                const isCurrentCat = cat === article.category;
                return (
                  <details
                    key={cat}
                    open={isCurrentCat}
                    className="group border-b border-gray-100 last:border-0 pb-2"
                  >
                    <summary className="cursor-pointer list-none flex items-center justify-between py-2 text-xs font-bold text-gray-700 hover:text-[#3a5a40] transition-colors select-none">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrentCat ? 'bg-[#3a5a40]' : 'bg-gray-300'}`}></span>
                        <span className="truncate">{cat}</span>
                      </span>
                      <span className="text-gray-400 text-[10px] transition-transform duration-200 group-open:rotate-180 shrink-0">▼</span>
                    </summary>
                    <ul className="pl-3.5 border-l-2 border-[#e8eedd] space-y-1.5 mt-2 mb-3 max-h-60 overflow-y-auto">
                      {catArticles.map((a) => {
                        const isCurrentArticle = a.base_id === article.base_id;
                        return (
                          <li key={a.id}>
                            <Link
                              href={`/wellbeing/articles/${a.base_id}`}
                              className={`block text-[11px] py-1 transition-colors truncate ${
                                isCurrentArticle
                                  ? 'text-[#3a5a40] font-bold underline'
                                  : 'text-gray-500 hover:text-[#3a5a40] hover:underline'
                              }`}
                            >
                              {a.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* フッター */}
      <footer className="w-full bg-[#3a5a40] text-white pt-16 pb-14 px-6 relative mt-auto overflow-hidden">
        <div className="absolute right-[-40px] md:right-8 bottom-[-20px] w-[340px] md:w-[480px] h-[300px] md:h-[400px] pointer-events-none opacity-15 select-none z-0">
          <svg viewBox="0 0 400 320" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M200 320 V110" />
            <path d="M200 110 L160 70 M200 110 L240 70" />
            <path d="M200 150 L150 110 M200 150 L250 110" />
            <path d="M200 190 L140 150 M200 190 L260 150" />
            <path d="M200 230 L130 190 M200 230 L270 190" />
            <path d="M200 70 L200 40 M200 40 L180 20 M200 40 L220 20" />
            <path d="M90 320 V150" />
            <path d="M90 150 L60 120 M90 150 L120 120" />
            <path d="M90 190 L50 160 M90 190 L130 160" />
            <path d="M90 230 L45 200 M90 230 L135 200" />
            <path d="M310 320 V140" />
            <path d="M310 140 L280 110 M310 140 L340 110" />
            <path d="M310 180 L270 150 M310 180 L350 150" />
            <path d="M310 220 L265 190 M310 220 L355 190" />
            <path d="M10 320 C100 300, 250 310, 390 320" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/wellbeing#top" className="text-2xl font-bold text-[#f4f1de] flex items-center gap-2 mb-4">
                <span>InnBuddy <span className="font-light opacity-80">Well-being</span></span>
              </Link>
              <p className="text-xs sm:text-sm text-gray-200 max-w-sm mb-6 font-medium leading-relaxed">
                宿泊業界の未来を創る、HRと組織づくりのための専門メディア。スタッフの充足感が、最高のサービスを生み出します。
              </p>
            </div>
            <div className="pt-2 text-[10px] sm:text-xs text-white/50 font-medium">
              &copy; 2026 InnBuddy Well-being. All rights reserved.
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-semibold">
            <div>
              <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider border-b border-[#f4f1de]/30 pb-2 inline-block">MENU</h4>
              <ul className="space-y-3 font-medium text-gray-200">
                <li><a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">InnBuddyとは</a></li>
                <li><a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">運営チーム</a></li>
                <li><a href="https://innbuddy-japan.com/library" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">他のメディアも見る</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider border-b border-[#f4f1de]/30 pb-2 inline-block">SUPPORT</h4>
              <ul className="space-y-3 font-medium text-gray-200">
                <li><a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider border-b border-[#f4f1de]/30 pb-2 inline-block">AUDIT</h4>
              <Link
                href="/wellbeing#top"
                className="inline-block bg-[#f4f1de] text-[#3a5a40] border-2 border-[#f4f1de] hover:bg-[#3a5a40] hover:text-[#f4f1de] px-6 py-2.5 rounded-full font-bold transition-all text-xs shadow-md"
              >
                無料診断を受ける
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}