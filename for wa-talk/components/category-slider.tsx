'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CATEGORY_ARTICLES } from '@/lib/content'
import { ArticleCard } from './article-card'
import { useLang } from './language-provider'

export function CategorySlider({
  id,
  title,
  caption,
  index,
}: {
  id: string
  title: string
  caption: string
  index: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()
  const articleIds = CATEGORY_ARTICLES[id] ?? []

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 460, behavior: 'smooth' })
  }

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
            {String(index + 1).padStart(2, '0')} — {caption}
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-ink md:text-5xl">
            {title}
          </h2>
        </motion.div>

        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="前へ"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown/25 bg-white/60 text-brand-brown backdrop-blur-md transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="次へ"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown/25 bg-white/60 text-brand-brown backdrop-blur-md transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {articleIds.map((articleId, i) => (
          <div key={`${articleId}-${i}`} className="snap-start">
            <ArticleCard id={articleId} />
          </div>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>

      <span className="sr-only">{t.readMore}</span>
    </section>
  )
}
