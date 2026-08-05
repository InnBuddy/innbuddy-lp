'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from './language-provider'

export function HeroSection() {
  const { t } = useLang()

  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pt-8 pb-16 md:px-8 md:pt-12 md:pb-24">
      <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-white/50 px-4 py-1.5 text-xs font-bold tracking-wide text-brand-green backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="whitespace-pre-line text-balance text-5xl font-black leading-[1.05] tracking-tight text-brand-ink md:text-6xl lg:text-7xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-brand-brown md:text-lg"
          >
            {t.hero.body}
          </motion.p>

          <motion.a
            href="#stories"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-ink"
          >
            {t.hero.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="md:col-span-7"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-brand-brown/10 shadow-2xl shadow-brand-brown/20">
            <Image
              src="/hero.png"
              alt="日差しの差し込む和室で抹茶を点てる茶人"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/25 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
