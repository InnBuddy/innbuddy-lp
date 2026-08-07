import Link from 'next/link';

export default function StoryPage() {
  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#library"
          className="inline-block mb-12 text-sm text-[#2c2c2c]/60 hover:text-[#2c2c2c] transition-colors no-underline border-none"
        >
          ← ライブラリに戻る
        </Link>
        <h1 className="font-serif font-light text-3xl md:text-4xl text-[#2c2c2c] mb-8">
          Story
        </h1>
        <div className="space-y-8 text-[#2c2c2c]/70 leading-relaxed">
          <p>世界の旅行者が語る日本体験ストーリーを掲載しています。</p>
        </div>
      </div>
    </article>
  );
}
