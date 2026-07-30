"use client"

import { useEffect, useRef, useState } from "react"

export function ActSilentAsset() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      // 画像がスクロールに連動してゆっくり上昇する（負方向へ移動）
      // 係数を小さく保ち、動きを極限まで抑える
      const progress = -rect.top
      setOffset(progress * 0.25)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="沈黙の資産"
      className="relative flex min-h-screen w-full items-end overflow-hidden"
    >
      {/* パララックス背景：スクロールに連動してゆっくり上昇 */}
      <div aria-hidden="true" className="absolute inset-0 -z-0">
        <div
          className="absolute inset-x-0 -top-[15vh] h-[130vh] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <img
            src="/images/fog_forest.png"
            alt="夜明けの霧に包まれた深い森。宿がまだ売っていない、静寂という眠れる資産の象徴。"
            className="h-full w-full object-cover shadow-none"
          />
        </div>
        {/* テキストの可読性を保つための、ごく僅かな暗がり */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full px-8 pb-32 md:px-16 md:pb-40 lg:px-24">
        <p className="max-w-3xl font-serif text-2xl font-light leading-relaxed text-balance text-white/80 md:text-4xl md:leading-[1.7]">
          これは、ただの霧ではありません。
          <br className="hidden md:block" />
          あなたの宿がまだ売っていない、最高級の眠りです。
        </p>
      </div>

      {/* 画面左下の静かなスクロールダウンアイコン */}
      <div className="absolute bottom-10 left-8 z-10 flex flex-col items-center gap-3 md:left-16 lg:left-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <span
          aria-hidden="true"
          className="h-12 w-px bg-white/40 [animation:quiet-pulse_3s_ease-in-out_infinite]"
        />
      </div>
    </section>
  )
}
