import Link from 'next/link';

export const metadata = {
  title: 'Analysis | マーケット分析レポート | InnBuddy',
  description: 'インバウンド市場・ASEAN・ESG関連の最新分析レポート。宿泊施設の経営戦略に役立つデータを提供します。',
  openGraph: {
    title: 'Analysis | InnBuddy',
    description: 'マーケット分析レポート',
    url: 'https://innbuddy-japan.com/library/analysis',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

export default function AnalysisPage() {
  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* パンくずリスト */}
        <div className="text-sm text-foreground/40 mb-6">
          <Link href="/" className="hover:text-foreground">ホーム</Link>
          <span className="mx-2">›</span>
          <Link href="/library" className="hover:text-foreground">ライブラリ</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground/60">Analysis</span>
        </div>

        <Link
          href="/library"
          className="inline-block mb-6 text-sm text-foreground/60 hover:text-foreground transition-colors no-underline border-none"
        >
          ← ライブラリ一覧に戻る
        </Link>

        <h1 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
          Analysis
        </h1>

        <div className="space-y-6 text-foreground/70 leading-relaxed">
          <p>マーケット分析レポートを掲載しています。</p>
          <p className="text-foreground/50 italic">📝 記事は準備中です。しばらくお待ちください。</p>
          <p className="text-sm text-foreground/40">※現在 ASEAN &amp; ESG 関連レポートを更新中です。</p>
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
