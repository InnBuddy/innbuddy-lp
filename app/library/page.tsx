import Link from 'next/link';

export const metadata = {
  title: 'ライブラリ一覧 | InnBuddy',
  description: 'ホテル運営・ブランディング・インバウンド集客に関する記事をまとめています。',
};

export default function LibraryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">ライブラリ</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/library/journal" className="p-6 border border-hairline hover:shadow-md transition-shadow">
          <h2 className="font-serif text-xl text-foreground">Journal</h2>
          <p className="text-sm text-foreground/60">ホテル運営・ブランディング</p>
        </Link>
        <Link href="/library/story" className="p-6 border border-hairline hover:shadow-md transition-shadow">
          <h2 className="font-serif text-xl text-foreground">Story</h2>
          <p className="text-sm text-foreground/60">世界から届くジャパントーク</p>
        </Link>
        <Link href="/library/analysis" className="p-6 border border-hairline hover:shadow-md transition-shadow">
          <h2 className="font-serif text-xl text-foreground">Analysis</h2>
          <p className="text-sm text-foreground/60">マーケット分析レポート</p>
        </Link>
      </div>
    </div>
  );
}
