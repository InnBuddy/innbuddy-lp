import type { ReactNode } from "react"

type AssetSectionProps = {
  image: string
  alt: string
  label: string
  heading: ReactNode
  /** 写真を配置する側。テキストは反対側に置かれる。 */
  imageSide: "left" | "right"
}

function AssetSection({ image, alt, label, heading, imageSide }: AssetSectionProps) {
  return (
    <section
      aria-label={label}
      className="relative grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-32"
    >
      {/* 写真：画面に固定され、テキストだけがスクロールする */}
      <div
        className={
          imageSide === "right"
            ? "md:order-2 md:col-start-2"
            : "md:order-1 md:col-start-1"
        }
      >
        <div className="sticky top-0 h-[50vh] w-full overflow-hidden md:h-screen">
          <img
            src={image || "/placeholder.svg"}
            alt={alt}
            className="h-full w-full object-cover shadow-none"
          />
        </div>
      </div>

      {/* テキスト：広大な余白の中で垂直中央に置かれ、スクロールに委ねられる */}
      <div
        className={
          imageSide === "right"
            ? "md:order-1 md:col-start-1 md:row-start-1"
            : "md:order-2 md:col-start-2 md:row-start-1"
        }
      >
        <div className="flex min-h-[60vh] items-center px-8 py-32 md:min-h-screen md:px-0 md:py-48">
          <div className="max-w-md">
            <p className="mb-8 text-xs uppercase tracking-widest text-[#B44A3A]">
              {label}
            </p>
            <h2 className="font-serif text-2xl font-light leading-relaxed text-balance md:text-4xl md:leading-relaxed">
              {heading}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ActAnatomyOfValue() {
  return (
    <div className="relative w-full">
      <AssetSection
        imageSide="left"
        image="/images/forest_stream.png"
        alt="緑の森を流れる澄んだ渓流。都会の人が対価を払う静寂という体験の象徴。"
        label="資産01 — 自然"
        heading="この静寂は、都会の人が1泊5万円で買う体験です。"
      />
      <AssetSection
        imageSide="right"
        image="/images/food_kaiseki.png"
        alt="手仕事の器に盛り付けられた懐石の一皿。まだ世界に知られていない食の物語。"
        label="資産02 — 食"
        heading="この一皿の物語を、世界はまだ知りません。"
      />
      <AssetSection
        imageSide="left"
        image="/images/craftsman_hands.png"
        alt="自然素材に向き合う老練な職人の手。継がれてきた手仕事の時間。"
        label="資産03 — 人と時間"
        heading="継がれる手仕事は、最も贅沢なインテリアです。"
      />
    </div>
  )
}
