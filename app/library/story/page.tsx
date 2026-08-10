import Link from 'next/link';
import { getStoryArticles } from '@/lib/microcms';

export const metadata = {
  title: 'Story | 世界から届くジャパントーク | InnBuddy',
  description: '世界の旅行者が語る日本体験ストーリー。',
};

export default async function StoryPage() {
  const articles = await getStoryArticles();

  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* パンくずリスト */}
        <div className="text-sm text-foreground/40 mb-6">
          <Link href="/" className="hover:text-foreground">ホーム</Link>
          <span className="mx-2">›</span>
          <Link href="/#library" className="hover:text-foreground">ライブラリ</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground/60">Story</span>
        </div>

        <Link
          href="/#library"
          className="inline-block mb-6 text-sm text-foreground/60 hover:text-foreground transition-colors no-underline border-none"
        >
          ← ライブラリに戻る
        </Link>

        <h1 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">Story</h1>

        {/* 記事一覧（microCMSから取得） */}
        <div className="space-y-8">
          {articles.map((article: any) => (
            <div key={article.id} className="border-b border-hairline pb-6 hover:opacity-70 transition-opacity">
              {/* ★ リンク先を article.id に変更（コンテンツID） */}
              <Link href={`/library/story/${article.id}`}>
                <p className="text-xs text-foreground/50 mb-2">{article.publishedAt}</p>
                <h2 className="font-serif text-xl text-foreground">{article.title}</h2>
                {/* ★ カテゴリーがあれば表示（任意） */}
                {article.category && (
                  <span className="inline-block mt-1 text-xs text-accent-rust/60 border border-accent-rust/20 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
