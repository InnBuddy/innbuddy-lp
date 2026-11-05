import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, getImage, formatDate } from "@/lib/journal/articles";
import { Markdown } from "@/lib/journal/markdown";
import "../../style.css";

const getVal = (obj: any, lang: 'ja' | 'en' | 'zh') => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.ja || "";
};

function resolveJournalImage(item: any): string {
  if (!item) return "";
  let raw = "";
  if (typeof item === "string") {
    raw = item;
  } else if (item.meta?.image) {
    raw = item.meta.image;
  } else if (item.image) {
    raw = item.image;
  } else if (typeof getImage === "function") {
    try {
      raw = getImage(item);
    } catch {
      raw = "";
    }
  }
  if (!raw) return "";
  const filename = raw.split("/").pop() || raw;
  return `/library/journal/${filename}`;
}

export function generateStaticParams() {
  const articles = typeof getArticles === "function" ? getArticles() : [];
  return articles.map((a: any) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return {};
  const titleText = typeof a.title === "string" ? a.title : a.title?.ja || "";
  const excerptText =
    a.meta?.excerpt?.ja ||
    (typeof a.excerpt === "string" ? a.excerpt : a.excerpt?.ja) ||
    "";
  return {
    title: `${titleText} | InnBuddy JOURNAL`,
    description: excerptText,
  };
}

export default async function ArticlePage({ params }: any) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const all = typeof getArticles === "function" ? getArticles() : [];
  const idx = all.findIndex((a: any) => a.slug === article.slug);
  const currentCat = article.meta?.cat || article.cat || article.category;
  
  const related = all
    .filter(
      (a: any) =>
        a.slug !== article.slug &&
        (a.meta?.cat === currentCat || a.cat === currentCat || a.category === currentCat)
    )
    .slice(0, 3);
    
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  
  const articleDate = article.meta?.date || article.date;
  const categoryName = article.meta?.cat ?? article.cat ?? article.category ?? "JOURNAL";
  const categoryEn = article.meta?.catEn ?? article.catEn ?? "JOURNAL";

  return (
    <div id="articleView">
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          try {
            var params = new URLSearchParams(window.location.search);
            var lang = params.get('lang');
            if (!lang) {
              lang = localStorage.getItem('journal_lang') || 'ja';
              var newUrl = new URL(window.location.href);
              newUrl.searchParams.set('lang', lang);
              window.history.replaceState({}, '', newUrl);
            } else {
              localStorage.setItem('journal_lang', lang);
            }
            document.documentElement.setAttribute('data-lang', lang);
          } catch(e) {}
        })();
      `}} />
      <style dangerouslySetInnerHTML={{ __html: `
        html:not([data-lang]) .en-only, html:not([data-lang]) .zh-only { display: none !important; }
        html[data-lang="ja"] .en-only, html[data-lang="ja"] .zh-only { display: none !important; }
        html[data-lang="en"] .ja-only, html[data-lang="en"] .zh-only { display: none !important; }
        html[data-lang="zh"] .ja-only, html[data-lang="zh"] .en-only { display: none !important; }
        
        .lang a { text-decoration: none; display: inline-block; }
        html[data-lang="ja"] .lang-ja, html[data-lang="en"] .lang-en, html[data-lang="zh"] .lang-zh {
          background-color: #1a1a1a !important; color: #fff !important; border-color: #1a1a1a !important; opacity: 1 !important;
        }

        /* スリム＆シンプルな黄色フッター */
        footer {
          background-color: #FFF04B !important;
          color: #1a1a1a !important;
          padding: 24px 20px 20px !important;
          text-align: center !important;
        }
        footer .f1 {
          font-size: 16px !important;
          font-weight: 800 !important;
          margin-bottom: 4px !important;
          color: #1a1a1a !important;
        }
        footer .f2 {
          font-size: 11px !important;
          color: rgba(26, 26, 26, 0.75) !important;
          margin-bottom: 12px !important;
        }
        .f-nav {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 6px 20px !important;
          margin: 0 0 12px !important;
        }
        .journal-clean-link {
          color: #1a1a1a !important;
          background: transparent !important;
          border: none !important;
          padding: 2px 6px !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          text-decoration: none !important;
          display: inline-block !important;
          transition: transform 0.2s ease, opacity 0.2s ease !important;
        }
        .journal-clean-link:hover {
          transform: translateY(-2px) !important;
          opacity: 0.6 !important;
        }
        footer .f3 {
          font-size: 11px !important;
          font-weight: 600 !important;
          margin: 0 0 4px !important;
          color: #1a1a1a !important;
        }
        footer .f4 {
          font-size: 10px !important;
          color: rgba(26, 26, 26, 0.55) !important;
          margin: 0 !important;
          line-height: 1.4 !important;
        }
      `}} />

      <header className="article-headbar container">
        <Link className="logo serif" href="/journal">
          InnBuddy <span className="logo-pill">JOURNAL</span>
        </Link>
        <div className="head-right">
          <Link className="back" href="/journal">
            - JOURNAL
          </Link>
          <div className="lang">
            <a href="?lang=ja"><button type="button" className="lang-ja" style={{ pointerEvents: 'none' }}>日本語</button></a>
            <a href="?lang=en"><button type="button" className="lang-en" style={{ pointerEvents: 'none' }}>EN</button></a>
            <a href="?lang=zh"><button type="button" className="lang-zh" style={{ pointerEvents: 'none' }}>中文</button></a>
          </div>
        </div>
      </header>
      
      <main className="container">
        <article className="article">
          <div className="kicker">
            <span className="chip">{categoryName}</span>
            <span className="ARTICLE">{String(Math.max(1, idx + 1)).padStart(3, "0")}</span>
          </div>
          
          <h1>
            <span className="ja-only">{getVal(article.title, 'ja')}</span>
            <span className="en-only">{getVal(article.title, 'en')}</span>
            <span className="zh-only">{getVal(article.title, 'zh')}</span>
          </h1>
          
          {getVal(article.meta?.excerpt || article.excerpt, 'ja') && (
            <p className="excerpt">
              <span className="ja-only">{getVal(article.meta?.excerpt || article.excerpt, 'ja')}</span>
              <span className="en-only">{getVal(article.meta?.excerpt || article.excerpt, 'en')}</span>
              <span className="zh-only">{getVal(article.meta?.excerpt || article.excerpt, 'zh')}</span>
            </p>
          )}
          
          <div className="hero-img">
            <img src={resolveJournalImage(article)} alt={getVal(article.title, 'ja')} />
          </div>
          
          <div className="meta-row">
            <span>{typeof formatDate === "function" && articleDate ? formatDate(articleDate) : articleDate}</span>
            <span>{categoryEn}</span>
            <span>{Math.max(1, Math.ceil((getVal(article.body, 'ja').length || 700) / 700))}分で読めます</span>
          </div>
          
          <div className="body">
            <div className="ja-only"><Markdown source={getVal(article.body, 'ja')} /></div>
            <div className="en-only"><Markdown source={getVal(article.body, 'en')} /></div>
            <div className="zh-only"><Markdown source={getVal(article.body, 'zh')} /></div>
          </div>
          
          <div className="rel">
            <div className="rel-label">
              <span className="ja-only">RELATED 同じテーマの記事</span>
              <span className="en-only">RELATED Articles on the same theme</span>
              <span className="zh-only">RELATED 同主题文章</span>
            </div>
            <div className="rel-grid">
              {related.map((r: any) => {
                const rDate = r.meta?.date || r.date;
                return (
                  <Link href={`/journal/articles/${r.slug}`} key={r.slug}>
                    <img src={resolveJournalImage(r)} alt={getVal(r.title, 'ja')} />
                    <div className="t">
                      <div className="d">
                        {typeof formatDate === "function" && rDate ? formatDate(rDate) : rDate}
                      </div>
                      <h4>
                        <span className="ja-only">{getVal(r.title, 'ja')}</span>
                        <span className="en-only">{getVal(r.title, 'en')}</span>
                        <span className="zh-only">{getVal(r.title, 'zh')}</span>
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="pager">
            {prev ? (
              <Link href={`/journal/articles/${prev.slug}`}>
                - <span className="ja-only">{getVal(prev.title, 'ja')}</span>
                  <span className="en-only">{getVal(prev.title, 'en')}</span>
                  <span className="zh-only">{getVal(prev.title, 'zh')}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/journal/articles/${next.slug}`}>
                  <span className="ja-only">{getVal(next.title, 'ja')}</span>
                  <span className="en-only">{getVal(next.title, 'en')}</span>
                  <span className="zh-only">{getVal(next.title, 'zh')}</span> -
              </Link>
            ) : <span />}
          </div>
        </article>
      </main>
      
      <footer>
        <div className="f1">InnBuddy</div>
        <div className="f2">WEB × OPERATION × BRANDING - ホテル運営の知恵を、もっと身近に。</div>
        
        <div className="f-nav">
          <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">InnBuddyとは</span>
            <span className="en-only">About InnBuddy</span>
            <span className="zh-only">关于InnBuddy</span>
          </a>
          <a href="https://innbuddy-japan.com/team/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">運営組織</span>
            <span className="en-only">Our Team</span>
            <span className="zh-only">运营组织</span>
          </a>
          <a href="https://innbuddy-japan.com/library/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">メディア一覧</span>
            <span className="en-only">Media List</span>
            <span className="zh-only">媒体一览</span>
          </a>
          <a href="https://innbuddy-japan.com/contact/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">お問い合わせ</span>
            <span className="en-only">Contact</span>
            <span className="zh-only">联系我们</span>
          </a>
        </div>

        <div className="f3">© 2026 InnBuddy</div>
        <div className="f4">記事内の数値は一般的な情報に基づく参考値・一例であり、InnBuddyの実績を示すものではありません。</div>
      </footer>
    </div>
  );
}