'use client'

export function BigMarquee() {
  const text = 'Wa Talk — Japan Story from the World'
  const items = Array.from({ length: 4 })

  return (
    <section
      aria-hidden="true"
      className="border-y border-brand-brown/15 bg-white/30 py-6 backdrop-blur-sm md:py-8"
    >
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center">
          {items.map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-6 font-display text-5xl uppercase leading-none tracking-tight text-brand-ink md:text-7xl lg:text-8xl"
            >
              {text}
              <span className="px-6 text-brand-green">•</span>
            </span>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center"
          aria-hidden="true"
        >
          {items.map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-6 font-display text-5xl uppercase leading-none tracking-tight text-brand-ink md:text-7xl lg:text-8xl"
            >
              {text}
              <span className="px-6 text-brand-green">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
