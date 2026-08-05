'use client'

import { LanguageProvider, useLang } from '@/components/language-provider'
import { MarbleBackground } from '@/components/marble-background'
import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { BigMarquee } from '@/components/big-marquee'
import { CategorySlider } from '@/components/category-slider'
import { DanmakuStrip } from '@/components/danmaku-strip'
import { GiantFooter } from '@/components/giant-footer'

function Stories() {
  const { t } = useLang()
  return (
    <div id="stories">
      {t.categories.map((cat, i) => (
        <CategorySlider
          key={cat.id}
          id={cat.id}
          title={cat.title}
          caption={cat.caption}
          index={i}
        />
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <MarbleBackground />
      <div className="relative z-10 min-h-screen">
        <SiteHeader />
        <main>
          <HeroSection />
          <BigMarquee />
          <Stories />
          <DanmakuStrip />
        </main>
        <GiantFooter />
      </div>
    </LanguageProvider>
  )
}
