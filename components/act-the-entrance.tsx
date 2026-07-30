import Image from "next/image"

export function ActTheEntrance() {
  return (
    <section
      aria-labelledby="entrance-heading"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* 朝日に照らされる森 — 全画面 */}
      <div aria-hidden="true" className="absolute inset-0 -z-0">
        <Image
          src="/images/fog_forest_dawn.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 文字の可読性を保つための、ごく淡いベール */}
        <div className="absolute inset-0 bg-[#2C2C2C]/25" />
      </div>

      {/* 中央のテキストボックス */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center md:py-48">
        <h2
          id="entrance-heading"
          className="text-balance font-serif text-3xl font-light leading-relaxed text-white/90 md:text-5xl md:leading-relaxed"
        >
          あなたの物語を、世界の感動へ。
        </h2>

        <p className="mt-8 text-pretty font-sans text-sm font-normal leading-relaxed text-white/70 md:text-base">
          まずは、御宿の“眠れる資産”を診断するところから。
        </p>

        <a
          href="#"
          className="mt-16 inline-block bg-[#B44A3A] px-10 py-4 font-sans text-sm tracking-widest text-white transition-all duration-700 ease-in-out hover:bg-[#8F3428]"
        >
          資産診断シートをダウンロード（無料）
        </a>

        <p className="mt-12 font-sans text-xs tracking-widest text-white/60">
          <span className="font-mono">InnBuddy</span> — 越境エコシステムの入り口
        </p>
      </div>
    </section>
  )
}
