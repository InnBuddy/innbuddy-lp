'use client'

import Link from 'next/link'

export const SDG_GOALS = [
  { num: '5', label: 'GOAL 5', color: '#FF3A21' },
  { num: '6', label: 'GOAL 6', color: '#26BDE2' },
  { num: '7', label: 'GOAL 7', color: '#FCC30B' },
  { num: '8', label: 'GOAL 8', color: '#A21942' },
  { num: '10', label: 'GOAL 10', color: '#DD1367' },
  { num: '12', label: 'GOAL 12', color: '#BF8B2E' },
  { num: '14', label: 'GOAL 14', color: '#0A97D9' },
  { num: '15', label: 'GOAL 15', color: '#56C02B' },
]

export default function SdgBottomNav({ onSelectGoal }: { onSelectGoal?: (goal: string) => void }) {
  const handleClick = (goalLabel: string) => {
    if (onSelectGoal) {
      onSelectGoal(goalLabel)
      const archiveEl = document.getElementById('archive-title')
      if (archiveEl) {
        archiveEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#fcfbf9]/95 backdrop-blur-md border-t border-[#e5e5e0] px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      aria-label="SDGsゴール別ナビゲーション"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {SDG_GOALS.map((item) => (
          <Link
            key={item.num}
            href={`/sustainable/articles?goal=${encodeURIComponent(item.label)}#archive-title`}
            onClick={() => handleClick(item.label)}
            className="flex items-center justify-center p-1 active:scale-90 transition-transform"
            aria-label={`${item.label}の記事一覧を見る`}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shadow-sm"
              style={{ backgroundColor: item.color }}
            >
              {item.num}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}