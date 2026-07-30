"use client"

import { useRef } from "react"

type Lens = {
  id: string
  image: string
  service: string
  copy: string
}

const lenses: Lens[] = [
  { id: "01", image: "/images/lens_ota.png", service: "OTA運用", copy: "販路を、世界に" },
  { id: "02", image: "/images/lens_web.png", service: "Webサイト", copy: "物語を、資産に" },
  { id: "03", image: "/images/lens_brand.png", service: "ブランディング", copy: "価値を、再定義" },
  { id: "04", image: "/images/lens_sns.png", service: "SNS", copy: "共感を、予約に" },
  { id: "05", image: "/images/lens_ai.png", service: "AI導入", copy: "効率を、進化に" },
  { id: "06", image: "/images/lens_inbound.png", service: "インバウンド戦略", copy: "地域を、国境に" },
]

export function ActBorderlessEcosystem() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * 400, behavior: "smooth" })
  }

  return (
    <section className="relative bg-background py-32 md:py-48">
      {/* 章題 */}
      <div className="mx-auto mb-20 max-w-2xl px-6 text-center md:mb-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-rust">Act Ⅲ &mdash; Borderless</p>
        <h2 className="mt-8 font-serif text-3xl font-light leading-relaxed text-foreground md:text-4xl text-balance">
          越境エコシステム
        </h2>
        <p className="mt-8 font-sans text-sm font-normal leading-relaxed text-foreground/60 text-pretty">
          これはサービスの一覧ではありません。私たちが世界を見るための、六つのレンズです。
        </p>
      </div>

      {/* 水平スクロール帯 */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto border-y border-[color:var(--hairline)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {lenses.map((lens) => (
          <article
            key={lens.id}
            className="group relative flex h-[500px] w-[400px] flex-none snap-start flex-col justify-between border-r border-[color:var(--hairline)] bg-[#FDFBF7]"
          >
            {/* 象徴写真 */}
            <div className="relative h-[300px] w-full overflow-hidden">
              <img
                src={lens.image || "/placeholder.svg"}
                alt={`${lens.service}を象徴する抽象的な情景`}
                className="h-full w-full object-cover shadow-none grayscale-[0.15] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>

            {/* テキスト */}
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-foreground/40">
                {lens.id} &nbsp;/&nbsp; {lens.service}
              </p>
              <p className="mt-6 font-serif text-2xl font-light leading-relaxed text-foreground text-balance">
                {lens.copy}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* 静かな左右の矢印 */}
      <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-12 px-6">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="前のレンズへ"
          className="font-serif text-2xl font-light text-foreground/40 transition-colors duration-[800ms] ease-in-out hover:text-rust"
        >
          &larr;
        </button>
        <span className="h-px w-16 bg-[color:var(--hairline)]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="次のレンズへ"
          className="font-serif text-2xl font-light text-foreground/40 transition-colors duration-[800ms] ease-in-out hover:text-rust"
        >
          &rarr;
        </button>
      </div>
    </section>
  )
}
