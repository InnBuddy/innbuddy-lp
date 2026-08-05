'use client'

import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { categories } from '@/lib/articles'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-t-2 border-b border-t-foreground border-b-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-6">
        {/* Left: hamburger */}
        <div className="flex flex-1 items-center justify-start">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="メニューを開く"
            className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-60"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
            <span className="hidden text-xs font-bold uppercase tracking-widest sm:inline">
              Menu
            </span>
          </button>
        </div>

        {/* Center: logo */}
        <div className="flex flex-1 items-center justify-center">
          <a
            href="/"
            aria-label="InnBuddy ホーム"
            className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            InnBuddy
          </a>
        </div>

        {/* Right: search + subscribe */}
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <button
            type="button"
            aria-label="検索"
            className="text-foreground transition-opacity hover:opacity-60"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="hidden border border-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background sm:block"
          >
            ニュースレター登録
          </button>
          <button
            type="button"
            className="text-xs font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-60"
          >
            ログイン
          </button>
        </div>
      </div>

      {/* Desktop category nav */}
      <nav className="hidden border-t border-border md:block">
        <ul className="mx-auto flex max-w-[1400px] items-center justify-center gap-8 px-6 py-3">
          {categories.map((cat) => (
            <li key={cat}>
              <a
                href={`#${cat.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-50"
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile slide-over menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-xs bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-display text-2xl font-bold text-foreground">
                InnBuddy
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="メニューを閉じる"
                className="text-foreground transition-opacity hover:opacity-60"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-6 flex flex-col gap-5">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href={`#${cat.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-50"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-8 w-full border border-foreground px-4 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              ニュースレター登録
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
