import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LOCAL_STORIES } from '@/data/localStories';
import '../story.css';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return LOCAL_STORIES.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = LOCAL_STORIES.find((item) => item.id === slug);
  if (!article) return {};

  return {
    title: `${article.title} | WAAI STORY - InnBuddy`,
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = LOCAL_STORIES.find((item) => item.id === slug);
  if (!article) notFound();

  return (
    <article className="min-h-screen bg-[#fdfbf7] text-[#222222] px-4 sm:px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/story"
            className="inline-flex items-center gap-1.5 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors"
          >
            <span>←</span>
            <span>ストーリー一覧に戻る</span>
          </Link>
        </div>

        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {article.category && (
              <span className="inline-block text-xs font-medium tracking-wider text-[#b85a3a] bg-[#b85a3a]/10 border border-[#b85a3a]/25 px-3 py-1 rounded-full">
                {typeof article.category === 'object' ? article.category.name : article.category}
              </span>
            )}
            <time className="text-xs tracking-wider text-[#777777]">{article.publishedAt}</time>
          </div>

          <h1 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl leading-[1.45] text-[#1a1a1a] tracking-tight">
            {article.title}
          </h1>
        </header>

        {article.coverImage && (
          <div className="mb-12 overflow-hidden rounded-2xl shadow-sm border border-[#ebe5dc] bg-[#f4efe6]">
            <img
              src={article.coverImage.url}
              alt={article.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}

        <div
          className="story-article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-16 pt-8 border-t border-[#e8e1d5] text-center">
          <Link
            href="/story"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#1a1a1a] text-sm font-medium text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            ← ストーリー一覧へ戻る
          </Link>
        </footer>
      </div>
    </article>
  );
}