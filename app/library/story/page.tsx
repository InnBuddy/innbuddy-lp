import Link from 'next/link';

export const metadata = {
  title: 'Story | 世界から届くジャパントーク | InnBuddy',
  description: '世界の旅行者が語る日本体験ストーリー。インバウンド集客・海外旅行者の生の声を紹介します。',
  openGraph: {
    title: 'Story | InnBuddy',
    description: '世界から届くジャパントーク',
    url: 'https://innbuddy-japan.com/library/story',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

export default function StoryPage() {
  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
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

        <h1 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
          Story
        </h1>

        <div className="space-y-6 text-foreground/70 leading-relaxed">
          <p>世界の旅行者が語る日本体験ストーリーを掲載しています。</p>
          <p className="text-foreground/50 italic">📝 記事は準備中です。しばらくお待ちください。</p>
        </div>

        {/* ★ CTAは削除（診断は付けない） */}
      </div>
    </article>
  );
}
