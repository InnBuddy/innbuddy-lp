import { getPostData, getAllPostSlugs } from '@/lib/library';
import { notFound } from 'next/navigation';
import LeadCaptureForm from '@/components/diagnostics/LeadCaptureForm';

export async function generateStaticParams() {
  return getAllPostSlugs('analysis');
}

export default async function AnalysisPost({ params }: { params: { slug: string } }) {
  const post = await getPostData('analysis', params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <article className="max-w-3xl mx-auto px-6 py-24">
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

        <div className="mt-16 border-t border-[var(--hairline)] pt-12">
          <h2 className="font-serif font-light text-2xl text-[var(--foreground)] text-center mb-8">資料ダウンロード</h2>
          <LeadCaptureForm
            diagnosticType="analysis"
            payload={{ reportSlug: params.slug, reportTitle: post.title }}
            onClose={() => {}}
            analysisMode={true}
          />
        </div>
      </article>
    </div>
  );
}