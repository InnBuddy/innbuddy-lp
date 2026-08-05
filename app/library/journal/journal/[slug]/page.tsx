import { getPostData, getAllPostSlugs } from '@/lib/library';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllPostSlugs('journal');
}

export default async function JournalPost({ params }: { params: { slug: string } }) {
  const post = await getPostData('journal', params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: post.image,
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <header className="mb-12 text-center">
          <p className="text-xs tracking-[0.2em] text-[var(--accent-rust)] mb-4">
            {post.category} · {post.date}
          </p>
          <h1 className="font-serif font-light text-3xl md:text-5xl text-[var(--foreground)] leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-sm text-[var(--foreground)]/60 max-w-xl mx-auto">{post.description}</p>
        </header>

        <div className="mb-12 overflow-hidden rounded-sm">
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
        </div>

        <div
          className="prose prose-lg max-w-none font-sans text-[var(--foreground)]/80 leading-relaxed
            [&>h2]:font-serif [&>h2]:font-light [&>h2]:text-2xl [&>h2]:text-[var(--foreground)]
            [&>p]:mb-6 [&>p]:leading-8
            [&>a]:text-[var(--accent-rust)] [&>a]:no-underline hover:[&>a]:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  )
}
