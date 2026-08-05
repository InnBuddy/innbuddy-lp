'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ARTICLE_IMAGES } from '@/lib/content'
import { useLang } from './language-provider'

export function ArticleCard({ id }: { id: string }) {
  const { t } = useLang()
  const img = ARTICLE_IMAGES[id]
  const meta = t.articles[id]

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative w-[78vw] shrink-0 sm:w-[420px]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-brown/10 shadow-lg shadow-brand-brown/10">
        {/* デフォルト写真 */}
        <Image
          src={img.front}
          alt={meta.title}
          fill
          sizes="(max-width: 640px) 78vw, 420px"
          className="object-cover"
        />
        {/* ホバー時に滑らかに切り替わる別写真 */}
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Image
            src={img.back}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 78vw, 420px"
            className="object-cover"
          />
        </motion.div>

        <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-green px-3 py-1 text-xs font-bold text-white">
          {meta.tag}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="text-pretty text-lg font-bold leading-snug text-brand-ink transition-colors group-hover:text-brand-green">
          {meta.title}
        </h3>
        <span className="mt-1 shrink-0 text-xs font-bold uppercase tracking-wide text-brand-green">
          {t.readMore}
        </span>
      </div>
    </motion.article>
  )
}
