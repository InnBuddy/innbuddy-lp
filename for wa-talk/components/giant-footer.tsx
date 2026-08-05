'use client'

import { motion } from 'framer-motion'

export function GiantFooter() {
  return (
    <footer id="contact" className="overflow-hidden pt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 border-t border-brand-brown/20 py-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-black text-brand-ink">Wa Talk 和とーく</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-brown">
              Japan Story from the World. 世界の視点で日本を綴るブログマガジン。
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-brand-brown">
            <a className="transition-colors hover:text-brand-green" href="#stories">
              Stories
            </a>
            <a className="transition-colors hover:text-brand-green" href="#top">
              About
            </a>
            <a className="transition-colors hover:text-brand-green" href="#">
              Instagram
            </a>
            <a className="transition-colors hover:text-brand-green" href="#">
              Newsletter
            </a>
          </nav>
        </div>
      </div>

      {/* 超特大タイポグラフィ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full px-2 pb-6"
      >
        <h2 className="w-full text-center font-display uppercase leading-[0.82] tracking-tighter text-brand-ink [font-size:22vw]">
          Wa Talk Japan
        </h2>
      </motion.div>

      <div className="border-t border-brand-brown/15 py-6">
        <p className="text-center text-xs text-brand-brown/70">
          © {new Date().getFullYear()} Wa Talk 和とーく. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
