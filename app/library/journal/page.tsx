import Link from 'next/link';

export const metadata = {
  title: 'Journal | ホテル運営・ブランディングのデジタル専門誌 | InnBuddy',
  description: 'OTA運用・インバウンド集客・ブランディングに関する実践的な記事を掲載。宿泊施設の経営に役立つ情報が満載です。',
  openGraph: {
    title: 'Journal | InnBuddy',
    description: 'ホテル運営・ブランディングのデジタル専門誌',
    url: 'https://innbuddy-japan.com/library/journal',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

export default function JournalPage() {
  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* パンくずリスト */}
        <div className="text-sm text-foreground/40 mb-6">
          <Link href="/" className="hover:text-foreground">ホーム</Link>
          <span className="mx-2">›</span>
          <Link href="/library" className="hover:text-foreground">ライブラリ</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground/60">Journal</span>
        </div>

        <Link
          href="/library"
          className="inline-block mb-6 text-sm text-foreground/60 hover:text-foreground transition-colors no-underline border-none"
        >
          ← ライブラリ一覧に戻る
        </Link>

        <h1 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
          Journal
        </h1>

        <div className="space-y-6 text-foreground/70 leading-relaxed">
          <p>ホテル運営・ブランディングに関する記事を掲載しています。</p>
          <p className="text-foreground/50 italic">📝 記事は準備中です。しばらくお待ちください。</p>
        </div>

        {/* ★ LP誘導CTA（診断へ）- 残す */}
        <div className="mt-12 p-6 bg-[#f0e8d0]/30 border border-[#E8B93C] rounded-lg text-center">
          <p className="text-sm text-foreground/70 mb-4">
            あなたの宿の「眠れる資産」を診断してみませんか？
          </p>
          <Link
            href="/#diagnostic"
            className="inline-block bg-[#ABBAA9] text-black font-['Zen_Old_Mincho'] px-8 py-3 text-sm tracking-widest hover:bg-[#B4BC4E] hover:text-white transition-colors"
          >
            無料診断を受ける
          </Link>
        </div>
      </div>
    </article>
  );
}