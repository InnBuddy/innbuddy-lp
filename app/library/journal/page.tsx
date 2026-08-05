import Link from 'next/link';
import { getSortedPostsData } from '@/lib/library';

export default function JournalPage() {
  const posts = getSortedPostsData('journal');

  return (
    <div className="min-h-screen bg-[var(--background)] py-24">
      <header className="max-w-6xl mx-auto px-6 pt-6">
        <a href="/" className="text-sm text-[var(--accent-rust)] hover:underline font-serif">
          ← InnBuddyへ戻る
        </a>
      </header>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-serif font-light text-4xl md:text-5xl text-[var(--foreground)] mb-4 text-center">
          Journal
        </h1>
        <p className="text-center text-sm text-[var(--foreground)]/60 mb-2">
          強固な組織で持続的な利益確保を。
        </p>
        <p className="text-center text-sm text-[var(--foreground)]/60 mb-16">
          ホテル経営者に向けた、OTA運用・ブランディングの専門知見
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/library/journal/${post.slug}`} className="group block">
              <article className="border border-[#8A9A7B] bg-white/50 backdrop-blur-sm p-6 transition-all duration-500 group-hover:border-[var(--accent-rust)]/30 group-hover:shadow-sm h-full flex flex-col">
                <div className="mb-4 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex-grow">
                  <p className="text-xs tracking-[0.2em] text-[var(--accent-rust)] mb-2">
                    {post.category} · {post.date}
                  </p>
                  <h2 className="font-serif font-light text-xl text-[var(--foreground)] mb-3 leading-tight group-hover:text-[var(--accent-rust)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--foreground)]/60 leading-relaxed">{post.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
