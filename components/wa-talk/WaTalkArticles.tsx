'use client';

import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string };
  category?: string;
  publishedAt?: string;
  slug?: string;
}

interface WaTalkArticlesProps {
  lang?: string;
  articles: Article[];
}

const CATEGORY_COLORS: Record<string, string> = {
  food: '#E8B93C',
  culture: '#8A9A7B',
  travel: '#6B7F5E',
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ja: { food: '食文化', culture: '伝統文化', travel: '風景・旅' },
  en: { food: 'Food', culture: 'Culture', travel: 'Travel' },
  zh: { food: '食文化', culture: '传统文化', travel: '风景・旅行' },
};

export default function WaTalkArticles({ lang = 'ja', articles }: WaTalkArticlesProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const labels = CATEGORY_LABELS[lang] || CATEGORY_LABELS.ja;

  // 読了時間の推定
  const estimateReadTime = (content: string) => {
    if (!content) return 3;
    const text = content.replace(/<[^>]+>/g, '');
    return Math.max(1, Math.ceil(text.length / 600));
  };

  // 日付フォーマット
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* セクションヘッダー */}
        <p className="text-xs tracking-[0.35em] font-bold text-center text-[var(--accent)]">
          WA TALK
        </p>
        <h2 className="text-center mt-2 text-[clamp(24px,4vw,38px)] font-black text-[var(--ink)]">
          和の物語
        </h2>

        {/* 記事グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
          {articles.map((article) => {
            const catColor = CATEGORY_COLORS[article.category || 'culture'] || '#8A9A7B';
            return (
              <article
                key={article.id}
                className="wa-card bg-white border border-[#e7e5e4] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                {/* 画像 */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {article.eyecatch?.url ? (
                    <img
                      src={article.eyecatch.url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-600 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--cream)] to-[var(--mist)]" />
                  )}
                  {/* バッジ */}
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm"
                    style={{
                      backgroundColor: `${catColor}18`,
                      color: catColor,
                    }}
                  >
                    {labels[article.category || 'culture'] || article.category}
                  </span>
                </div>

                {/* 本文 */}
                <div className="p-5">
                  <div className="text-xs text-[var(--charcoal)] opacity-50">
                    {formatDate(article.publishedAt)} · {estimateReadTime(article.content)}
                    {lang === 'ja' ? '分' : ' min'}
                  </div>
                  <h3 className="mt-2 text-base font-bold text-[var(--ink)] leading-relaxed">
                    {article.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 記事詳細モーダル */}
      {selectedArticle && (
        <WaTalkArticleView
          article={selectedArticle}
          lang={lang}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}

// 記事詳細コンポーネント
function WaTalkArticleView({
  article,
  lang,
  onClose,
}: {
  article: Article;
  lang: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  const estimateReadTime = (content: string) => {
    if (!content) return 3;
    const text = content.replace(/<[^>]+>/g, '');
    return Math.max(1, Math.ceil(text.length / 600));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--warm-white)] overflow-y-auto">
      {/* 戻るボタン */}
      <button
        onClick={onClose}
        className="fixed top-22 left-4 z-60 bg-white/90 border border-[#e7e5e4] px-4 py-2 rounded-full text-xs cursor-pointer backdrop-blur-sm hover:bg-white transition-colors"
      >
        ← 戻る
      </button>

      {/* ヒーロー画像 */}
      <div className="relative h-[52vh] min-h-[340px] overflow-hidden">
        {article.eyecatch?.url ? (
          <img
            src={article.eyecatch.url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--cream)] to-[var(--mist)]" />
        )}
      </div>

      {/* 記事本文 */}
      <div className="max-w-[720px] mx-auto px-5 py-12 pb-20">
        <h2 className="text-left text-[clamp(22px,3.4vw,34px)] leading-relaxed font-bold text-[var(--ink)]">
          {article.title}
        </h2>

        <div className="mt-3 flex gap-3 flex-wrap text-xs text-[var(--charcoal)] opacity-50">
          <span>{formatDate(article.publishedAt)}</span>
          <span>{estimateReadTime(article.content)}{lang === 'ja' ? '分読了' : ' min read'}</span>
        </div>

        <div className="w-13 h-0.5 bg-[var(--accent)] mt-7 mb-7" />

        {/* 本文コンテンツ */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
