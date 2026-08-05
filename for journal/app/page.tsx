import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { LatestSection } from '@/components/latest-section'
import { MostPopular } from '@/components/most-popular'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <LatestSection />
        <MostPopular />
      </main>
      <SiteFooter />
    </div>
  )
}
