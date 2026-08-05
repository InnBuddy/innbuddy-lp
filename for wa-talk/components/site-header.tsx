'use client'

import { motion } from 'framer-motion'
import { LANGS } from '@/lib/content'
import { useLang } from './language-provider'

export function SiteHeader() {
  const { lang, setLang, t } = useLang()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-xl font-black tracking-tight text-brand-ink md:text-2xl">
            Wa&nbsp;Talk
          </span>
          <span className="text-sm font-medium text-brand-brown md:text-base">和とーく</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-brown md:flex">
          <a className="transition-colors hover:text-brand-green" href="#stories">
            {t.nav.stories}
          </a>
          <a className="transition-colors hover:text-brand-green" href="#about">
            {t.nav.about}
          </a>
          <a className="transition-colors hover:text-brand-green" href="#contact">
            {t.nav.contact}
          </a>
        </nav>

        <div
          className="flex items-center gap-1 rounded-full border border-brand-brown/25 bg-white/60 p-1 backdrop-blur-md"
          role="group"
          aria-label="言語切り替え / Language"
        >
          {LANGS.map(({ code, label }) => {
            const active = lang === code
            return (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={active}
                className="relative rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="lang-pill"
                    className="absolute inset-0 rounded-full bg-brand-green"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={
                    active ? 'relative text-white' : 'relative text-brand-brown hover:text-brand-green'
                  }
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.header>
  )
}
