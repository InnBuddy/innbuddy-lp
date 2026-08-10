import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStoryArticles, getStoryArticleById } from '@/lib/microcms';

export async function generateStaticParams() {
  const articles = await getStoryArticles();
  return articles.map((article: any) => ({ slug: article.id }));
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getStoryArticleById(slug);
  if (!article) notFound();

  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/library/story" className="inline-block mb-6 text-sm text-foreground/60 hover:text-foreground">
          ← ストーリー一覧に戻る
        </Link>

        <p className="text-xs text-foreground/50 mb-2">{article.publishedAt}</p>

        {/* ★ タイトル：style で強制的に黒色・中央揃えに */}
        <h1
          className="font-serif font-light text-3xl md:text-4xl mb-8"
          style={{ color: '#1a1a1a', textAlign: 'center' }}
        >
          {article.title}
        </h1>

        {article.category && (
          <span className="inline-block mb-4 text-xs text-accent-rust/60 border border-accent-rust/20 px-2 py-0.5 rounded">
            {article.category}
          </span>
        )}

        {article.coverImage && (
          <img src={article.coverImage.url} alt={article.title} className="w-full h-auto rounded-lg mb-8" />
        )}

        <div
          className="prose prose-lg max-w-none text-foreground/70 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}
