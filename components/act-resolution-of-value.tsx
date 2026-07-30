"use client"

import { useEffect, useRef, useState } from "react"

type DetailImage = {
  src: string
  alt: string
  height: string
  bordered: boolean
}

const leftColumn: DetailImage[] = [
  {
    src: "/images/detail_steam.png",
    alt: "料理から静かに立ちのぼる湯気。提供されるひと皿の温度そのもの。",
    height: "h-64",
    bordered: false,
  },
  {
    src: "/images/detail_wood.png",
    alt: "古材に刻まれた年月の質感。時間だけがつくる意匠。",
    height: "h-80",
    bordered: true,
  },
  {
    src: "/images/detail_light.png",
    alt: "障子に落ちるやわらかな影。光がつくる室内の静けさ。",
    height: "h-72",
    bordered: false,
  },
]

const rightColumn: DetailImage[] = [
  {
    src: "/images/detail_hand.png",
    alt: "手仕事に向き合う職人の手。継がれてきた所作の細部。",
    height: "h-72",
    bordered: true,
  },
  {
    src: "/images/detail_water.png",
    alt: "温泉の湯面に広がる静かな波紋。湯の温もりの気配。",
    height: "h-64",
    bordered: false,
  },
  {
    src: "/images/detail_stone.png",
    alt: "雨に濡れて色を深める石畳。足元にまで宿る風情。",
    height: "h-80",
    bordered: true,
  },
]

function DetailPhoto({ image, delay }: { image: DetailImage; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        className={`${image.height} w-full object-cover shadow-none ${
          image.bordered ? "border border-white/80" : ""
        }`}
      />
    </div>
  )
}

export function ActResolutionOfValue() {
  return (
    <section
      aria-label="資産の解像度"
      className="mx-auto w-full max-w-5xl px-6 py-32 md:px-8 md:py-48"
    >
      <p className="mb-24 text-center text-xs tracking-[0.2em] text-[#B44A3A]">
        資産の解像度
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 左カラム */}
        <div className="mt-0 flex flex-col gap-6">
          {leftColumn.map((image, i) => (
            <DetailPhoto key={image.src} image={image} delay={i * 120} />
          ))}
        </div>

        {/* 右カラム：md以上で mt-24 のオフセット */}
        <div className="mt-0 flex flex-col gap-6 md:mt-24">
          {rightColumn.map((image, i) => (
            <DetailPhoto key={image.src} image={image} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
