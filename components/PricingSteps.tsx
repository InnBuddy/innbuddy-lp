const steps = [
  { number: "01", title: "初月、完全無料", desc: "リスクゼロで始めてください。私たちがまず価値を証明します。1ヶ月あればOTAの文章見直しなど基礎設定が完了します。" },
  { number: "02", title: "成果報酬 10%", desc: "前年を超えた売上の、増えた分だけを報酬とします。初月の努力が徐々に成果に結びつきます。" },
  { number: "03", title: "オンライン全体売上の5%", desc: "安定成長が見えたら、信頼の共有へ。透明な計算式です。勝てるチャンスを発見してさらに売上拡大へ。" },
  { number: "04", title: "固定30万円 or 宿全体売上の5%", desc: "共に歩く長期パートナーとして、越境の未来を創ります。売上の安定化＆独立した予約方法確立に向けての準備。" },
];

export default function PricingSteps() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-center text-xs tracking-[0.2em] text-accent-rust mb-16">私たちの報酬設計</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center md:text-left relative">
              <div className="text-4xl font-light text-accent-rust/20 mb-4">{step.number}</div>
              <h3 className="font-serif font-light text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && <hr className="hidden md:block border-t border-hairline my-8" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
