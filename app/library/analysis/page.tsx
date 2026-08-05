import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analysis | InnBuddy',
  description: 'マーケット分析レポート',
  robots: { index: false, follow: false },
};

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center px-6">
        <header className="mb-6">
          <a href="/#library" className="text-sm text-[var(--accent-rust)] hover:underline font-serif">
            ← InnBuddyへ戻る
          </a>
        </header>
        <h1 className="font-serif font-light text-3xl md:text-4xl text-[var(--foreground)] mb-4">
          Analysis
        </h1>
        <p className="text-sm text-[var(--foreground)]/60">
          現在、ASEAN & ESG関連レポートを更新中です。
        </p>
      </div>
    </div>
  );
}