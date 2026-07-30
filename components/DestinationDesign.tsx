export default function DestinationDesign() {
  const methods = [
    {
      number: "01",
      title: "Meaning Design",
      subtitle: "意味の再定義",
      desc: "既存の価値観や前提を根底から覆し、「本来の意味」を再発見して魂を入れるフェーズ。あなたの宿が、世界にとってどんな「価値」なのかを言葉にします。",
      img: "/images/method_meaning.jpg",
    },
    {
      number: "02",
      title: "Innovation Design",
      subtitle: "パラダイムの設計",
      desc: "見出した意味をベースに、全く新しい顧客体験や「届けるべき相手」の枠組みをデザイン。まだ誰も気づいていない、あなたの宿のファンを創造します。",
      img: "/images/method_innovation.jpg",
    },
    {
      number: "03",
      title: "Business Design",
      subtitle: "収益構造の設計",
      desc: "アイデアで終わらせず、価格設計や販路（直販化）など、確実に稼ぎ続けるビジネスモデルを構築。OTAに依存しない、自立した経営を設計します。",
      img: "/images/method_business.jpg",
    },
    {
      number: "04",
      title: "Business Transformation",
      subtitle: "変革の実装",
      desc: "組織、採用体制、システム、顧客体験のすべてを根本から変容させ、現実のエコシステムを動かします。持続可能な「越境創生」の始まりです。",
      img: "/images/method_transformation.jpg",
    },
  ];

  const steps = [
    {
      step: "Step 1",
      title: "足がかり",
      subtitle: "現場の最適化と利益創出",
      desc: "OTA運用代行や既存事業の営業支援から入り、現場の無駄を省いて即効性のある利益を生み出します。まずは、ここからリスクゼロで。",
      img: "/images/step1_foundation.jpg",
    },
    {
      step: "Step 2",
      title: "攻めの変革",
      subtitle: "Web・ダイレクト戦略の構築",
      desc: "生み出した利益を原資に、自社WebサイトをAIで高速実装。脱下請け・脱OTAを実現し、直接顧客と繋がる強い構造を作ります。",
      img: "/images/step2_offense.jpg",
    },
    {
      step: "Step 3",
      title: "守りの変革",
      subtitle: "HR BPO・組織の再構築",
      desc: "新たなステージに合わせて採用を最適化。プロの人事として入り、無駄な広告費を削り、定着率を高め、盤石な組織を作ります。",
      img: "/images/step3_defense.jpg",
    },
    {
      step: "Step 4",
      title: "プロジェクト完了・自走化",
      subtitle: "顧問パートナーへ",
      desc: "攻めと守りの完璧な動線が完成したら卒業。その後は経営・人事の社外アドバイザーとして月額顧問で伴走し続けます。",
      img: "/images/step4_autonomy.jpg",
    },
  ];

  return (
    <>
      {/* ---- セクション1：4つのデザイン（メソッド） ---- */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* 浮遊イラスト */}
        <img src="/images/illust/illus_1.jpg" className="absolute top-20 left-[-40px] w-40 opacity-40 rotate-[-3deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" />
        <img src="/images/illust/illus_2.jpg" className="absolute bottom-40 right-[-30px] w-48 opacity-30 rotate-[2deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">OUR METHOD</p>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-foreground mb-6">
              私たちは「モノじゃないデザイン」を届けます。
            </h2>
            <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              地方の宿や企業、地域に眠る価値を再発見し、「世界中が訪れたくなる目的地」へと再設計する。それが、私たちのデスティネーションデザインです。
            </p>
          </div>

          <div className="space-y-32">
            {methods.map((method, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-16 items-center">
                <div className={`relative h-96 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img src={method.img} className="w-full h-full object-cover shadow-2xl" alt={method.title} />
                  <img
                    src={`/images/illust/illus_${i + 3}.jpg`}
                    className="absolute -bottom-6 -right-6 w-24 opacity-60 rotate-[4deg] hover:opacity-100 transition-opacity duration-700 z-10"
                    alt=""
                  />
                </div>
                <div className={`max-w-md ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-6xl font-light text-accent-rust/20 mb-4">{method.number}</p>
                  <h3 className="font-serif font-light text-2xl md:text-3xl text-foreground mb-2">{method.title}</h3>
                  <p className="text-xs tracking-[0.2em] text-accent-rust mb-6">{method.subtitle}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- セクション2：4つのステップ ---- */}
      <section className="py-24 bg-background relative overflow-hidden border-t border-hairline">
        {/* 浮遊イラスト */}
        <img src="/images/illust/illus_5.jpg" className="absolute top-1/2 left-[10%] w-36 opacity-30 rotate-[-2deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" />
        <img src="/images/illust/illus_6.jpg" className="absolute top-20 right-[5%] w-44 opacity-25 rotate-[3deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">OUR PROCESS</p>
            <h2 className="font-serif font-light text-3xl md:text-5xl text-foreground mb-6">
              利益を再投資し、共に成長する。
            </h2>
            <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              最初から高額な一括投資は求めません。成果を生み出しながら、4つのステップで確実に変革を実装します。
            </p>
          </div>

          <div className="space-y-32">
            {steps.map((step, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-16 items-center">
                <div className={`relative h-96 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img src={step.img} className="w-full h-full object-cover shadow-2xl" alt={step.title} />
                  {i === 3 && (
                    <img
                      src="/images/illust/illus_7.jpg"
                      className="absolute -top-6 -left-6 w-28 opacity-70 rotate-[-6deg] hover:opacity-100 transition-opacity duration-700 z-10"
                      alt=""
                    />
                  )}
                </div>
                <div className={`max-w-md ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-sm tracking-[0.2em] text-accent-rust mb-2">{step.step}</p>
                  <h3 className="font-serif font-light text-2xl md:text-3xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-xs tracking-[0.2em] text-accent-rust mb-6">{step.subtitle}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- セクション3：FAQ ---- */}
      <section className="py-24 bg-background border-t border-hairline">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">FAQ</p>
            <h2 className="font-serif font-light text-3xl text-foreground">よくある質問</h2>
          </div>
          <div className="space-y-8">
            {[
              { q: "本当に初月は完全無料ですか？", a: "はい。まずは1ヶ月、完全無料でOTAの基礎設定や分析を行います。その間、一切の費用は発生しません。私たちがまず価値を証明します。" },
              { q: "どのような宿でも対応可能ですか？", a: "旅館、ホテル、民宿、ゲストハウスまで、規模や形態を問わず対応します。特に地方の中小規模の宿泊施設の課題に寄り添います。" },
              { q: "Webサイト制作も依頼できますか？", a: "はい。Step 2以降、利益が出始めた段階で、補助金を活用したWebサイト制作や自社予約システムの構築を支援します。" },
              { q: "越境エコシステムとは何ですか？", a: "集客代行にとどまらず、教育、村づくり、越境EC、HR BPOを統合した、地域全体を持続可能にするビジネスモデルです。InnBuddyはその入り口です。" },
            ].map((faq, i) => (
              <details key={i} className="group border-b border-hairline pb-6">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-serif font-light text-lg text-foreground">{faq.q}</span>
                  <span className="text-accent-rust text-2xl group-open:hidden">+</span>
                  <span className="text-accent-rust text-2xl hidden group-open:inline">-</span>
                </summary>
                <p className="mt-4 text-sm text-foreground/60 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 最終CTA ---- */}
      <section className="py-32 bg-background text-center border-t border-hairline relative overflow-hidden">
        <img src="/images/illust/illus_1.jpg" className="absolute top-0 left-1/2 -translate-x-1/2 w-96 opacity-20 rotate-[-2deg] z-0" alt="" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
            まずは、あなたの宿の「眠れる資産」を教えてください。
          </h2>
          <p className="text-sm text-foreground/60 mb-12 leading-relaxed">
            私たちが最初にやることは、無料であなたの宿の可能性を診断することです。リスクはゼロ。そこから、あなたと共に次の一歩を考えます。
          </p>
          <button className="bg-accent-rust text-white px-10 py-4 text-sm tracking-widest hover:bg-[#9a3a2e] transition-colors duration-700">
            2ヶ月の完全無料診断を試す
          </button>
        </div>
      </section>
    </>
  );
}
