'use client';

import { useState } from 'react';
import Link from 'next/link';
import DiagnosticSelectorModal from '@/components/diagnostics/DiagnosticSelectorModal';
import RevenueDiagnosticModal from '@/components/diagnostics/RevenueDiagnosticModal';
import HiringDiagnosticModal from '@/components/diagnostics/HiringDiagnosticModal';

export default function JournalClient() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isRevenueOpen, setIsRevenueOpen] = useState(false);
  const [isHiringOpen, setIsHiringOpen] = useState(false);

  const handleSelectRevenue = () => {
    setIsSelectorOpen(false);
    setIsRevenueOpen(true);
  };

  const handleSelectHiring = () => {
    setIsSelectorOpen(false);
    setIsHiringOpen(true);
  };

  return (
    <article className="min-h-screen bg-[#fdfbf7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* パンくずリスト */}
        <div className="text-sm text-foreground/40 mb-6">
          <Link href="/" className="hover:text-foreground">ホーム</Link>
          <span className="mx-2">›</span>
          <Link href="/#library" className="hover:text-foreground">ライブラリ</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground/60">Journal</span>
        </div>

        <Link
          href="/#library"
          className="inline-block mb-6 text-sm text-foreground/60 hover:text-foreground transition-colors no-underline border-none"
        >
          ← ライブラリに戻る
        </Link>

        <h1 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
          Journal
        </h1>

        <div className="space-y-6 text-foreground/70 leading-relaxed">
          <p>ホテル運営・ブランディングに関する記事を掲載しています。</p>
          <p className="text-foreground/50 italic">📝 記事は準備中です。しばらくお待ちください。</p>
        </div>

        {/* ★ CTA：診断セレクタを開く */}
        <div className="mt-12 p-6 bg-[#f0e8d0]/30 border border-[#E8B93C] rounded-lg text-center">
          <p className="text-sm text-foreground/70 mb-4">
            あなたの宿の「眠れる資産」を診断してみませんか？
          </p>
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="inline-block bg-[#ABBAA9] text-black font-['Zen_Old_Mincho'] px-8 py-3 text-sm tracking-widest hover:bg-[#B4BC4E] hover:text-white transition-colors"
          >
            宿の伸びしろを測定
          </button>
        </div>
      </div>

      {/* 診断セレクタモーダル */}
      <DiagnosticSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelectRevenue={handleSelectRevenue}
        onSelectHiring={handleSelectHiring}
      />

      {/* 売上診断モーダル */}
      <RevenueDiagnosticModal
        isOpen={isRevenueOpen}
        onClose={() => setIsRevenueOpen(false)}
      />

      {/* 採用診断モーダル */}
      <HiringDiagnosticModal
        isOpen={isHiringOpen}
        onClose={() => setIsHiringOpen(false)}
      />
    </article>
  );
}