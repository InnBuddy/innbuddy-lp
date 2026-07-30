'use client';
import { useState, useEffect, useRef } from 'react';
import RevenueDiagnosticModal from '@/components/diagnostics/RevenueDiagnosticModal';
import HiringDiagnosticModal from '@/components/diagnostics/HiringDiagnosticModal';
import DiagnosticSelectorModal from '@/components/diagnostics/DiagnosticSelectorModal';
import FloatingCta from '@/components/FloatingCta';
import DiagnosticBackground from '@/components/diagnostics/DiagnosticBackground';
import MeaningDesignSection from '@/components/MeaningDesignSection';
import { AssetTag } from '@/components/AssetTag';
import { assetTagsNature, assetTagsFood, assetTagsPeopleTime, assetBlockColors } from '@/data/assetTags';

export default function Home() {
  const [revenueOpen, setRevenueOpen] = useState(false);
  const [hiringOpen, setHiringOpen] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const serviceCardsRef = useRef<HTMLDivElement>(null);
  const diagnosticSectionRef = useRef<HTMLDivElement>(null);
  const hasReachedServiceCards = useRef(false);

  const [natureOpenTag, setNatureOpenTag] = useState<string | null>(null);
  const [foodOpenTag, setFoodOpenTag] = useState<string | null>(null);
  const [peopleTimeOpenTag, setPeopleTimeOpenTag] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasReachedServiceCards.current = true;
          setFloatingVisible(false);
        } else {
          if (hasReachedServiceCards.current) {
            const isAnyModalOpen = revenueOpen || hiringOpen || selectorOpen;
            if (!isAnyModalOpen) setFloatingVisible(true);
          }
        }
      },
      { threshold: 0 }
    );
    if (serviceCardsRef.current) observer.observe(serviceCardsRef.current);
    return () => { if (serviceCardsRef.current) observer.unobserve(serviceCardsRef.current); };
  }, [revenueOpen, hiringOpen, selectorOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFloatingVisible(false); },
      { threshold: 0.1 }
    );
    if (diagnosticSectionRef.current) observer.observe(diagnosticSectionRef.current);
    return () => { if (diagnosticSectionRef.current) observer.unobserve(diagnosticSectionRef.current); };
  }, []);

  useEffect(() => {
    if (revenueOpen || hiringOpen || selectorOpen) setFloatingVisible(false);
  }, [revenueOpen, hiringOpen, selectorOpen]);

  const openSelector = () => setSelectorOpen(true);
  const closeSelector = () => setSelectorOpen(false);
  const openRevenue = () => { setRevenueOpen(true); setSelectorOpen(false); };
  const openHiring = () => { setHiringOpen(true); setSelectorOpen(false); };

  return (
    <main className="relative w-full overflow-x-hidden">
      <img src="/images/illust/illus_2.jpg" className="fixed bottom-8 left-4 w-36 opacity-70 rotate-[-2deg] z-10 hover:opacity-90 transition-opacity duration-1000" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <img src="/images/illust/illus_3.jpg" className="fixed right-0 top-0 w-72 opacity-[0.06] z-0" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />

      {/* Act 1: 沈黙の資産 */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/fog_forest.png" className="w-full h-full object-cover animate-kenburns" alt="" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 text-center px-6 w-full max-w-full">
          <h1 className="font-serif font-light text-4xl md:text-6xl text-white/80 leading-tight mb-6 whitespace-normal md:whitespace-nowrap">これは、ただの霧ではありません。</h1>
          <p className="font-serif font-light text-xl md:text-2xl text-white/70 mb-12">あなたの宿がまだ売っていない、最高級の眠りです。</p>
          <p className="text-sm tracking-widest text-white/60 font-sans">誰も知らない、あなたの宿の資産を、世界の感動へ。</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
      </section>

      {/* Act 2: 価値の解剖 */}
      <section className="py-16 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16 md:space-y-32">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative h-64 md:h-96"><img src="/images/forest_stream.png" className="w-full h-full object-cover" alt="" /></div>
            <div className="max-w-md mx-auto md:mx-0">
              <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">資産01 — 自然</p>
              <h2 className="font-serif font-light text-2xl md:text-4xl leading-relaxed text-foreground">
                この静寂は、都会の人が1泊5万円で買う体験です。
              </h2>
              <div className="flex flex-wrap gap-2 mt-6">
                {assetTagsNature.map((tag) => (
                  <AssetTag
                    key={tag.label}
                    label={tag.label}
                    description={tag.description}
                    colorClass={assetBlockColors.nature}
                    isOpen={natureOpenTag === tag.label}
                    onToggle={() => setNatureOpenTag(natureOpenTag === tag.label ? null : tag.label)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1 max-w-md mx-auto md:mx-0">
              <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">資産02 — 食</p>
              <h2 className="font-serif font-light text-2xl md:text-4xl leading-relaxed text-foreground">
                この一皿の物語を、世界はまだ知りません。
              </h2>
              <div className="flex flex-wrap gap-2 mt-6">
                {assetTagsFood.map((tag) => (
                  <AssetTag
                    key={tag.label}
                    label={tag.label}
                    description={tag.description}
                    colorClass={assetBlockColors.food}
                    isOpen={foodOpenTag === tag.label}
                    onToggle={() => setFoodOpenTag(foodOpenTag === tag.label ? null : tag.label)}
                  />
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-64 md:h-96"><img src="/images/food_kaiseki.png" className="w-full h-full object-cover" alt="" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative h-64 md:h-96"><img src="/images/craftsman_hands.png" className="w-full h-full object-cover" alt="" /></div>
            <div className="max-w-md mx-auto md:mx-0">
              <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">資産03 — 人と時間</p>
              <h2 className="font-serif font-light text-2xl md:text-4xl leading-relaxed text-foreground">
                継がれる手仕事は、最も贅沢なインテリアです。
              </h2>
              <div className="flex flex-wrap gap-2 mt-6">
                {assetTagsPeopleTime.map((tag) => (
                  <AssetTag
                    key={tag.label}
                    label={tag.label}
                    description={tag.description}
                    colorClass={assetBlockColors.peopleTime}
                    isOpen={peopleTimeOpenTag === tag.label}
                    onToggle={() => setPeopleTimeOpenTag(peopleTimeOpenTag === tag.label ? null : tag.label)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 資産の解像度 */}
      <section className="py-16 md:py-24 bg-background"><p className="text-center text-xs tracking-[0.2em] text-accent-rust mb-8 md:mb-16">資産の解像度</p><div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 gap-4 md:gap-6"><div className="space-y-4 md:space-y-6"><div className="h-48 md:h-64 w-full"><img src="/images/detail_steam.png" className="w-full h-full object-cover" alt="" /></div><div className="h-56 md:h-80 w-full"><img src="/images/detail_wood.png" className="w-full h-full object-cover" alt="" /></div><div className="h-48 md:h-72 w-full"><img src="/images/detail_light.png" className="w-full h-full object-cover" alt="" /></div></div><div className="space-y-4 md:space-y-6 mt-12 md:mt-24"><div className="h-48 md:h-72 w-full"><img src="/images/detail_hand.png" className="w-full h-full object-cover" alt="" /></div><div className="h-48 md:h-64 w-full"><img src="/images/detail_water.png" className="w-full h-full object-cover" alt="" /></div><div className="h-56 md:h-80 w-full"><img src="/images/detail_stone.png" className="w-full h-full object-cover" alt="" /></div></div></div></section>

      {/* 呼吸モジュール① */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <img src="/images/breath_1.jpg" className="h-48 md:h-64 w-full object-cover" alt="" />
            <img src="/images/breath_2.jpg" className="h-48 md:h-64 w-full object-cover" alt="" />
            <img src="/images/breath_3.jpg" className="h-48 md:h-64 w-full object-cover" alt="" />
          </div>
          <p className="text-center mt-6 text-xs text-foreground/50 italic">静けさが、資産になる。</p>
        </div>
      </section>

      {/* Act 3: サービスカード */}
      <section ref={serviceCardsRef} className="py-16 md:py-24 bg-background"><div className="max-w-6xl mx-auto px-4 md:px-6"><h2 className="text-center font-serif font-light text-3xl mb-12 md:mb-16 text-foreground">私たちの視点</h2><div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">{[ { title: 'グローバルOTA運用', desc: '世界77カ国の視点で、あなたの宿を最適な販路へ。' }, { title: 'データドリブン単価最適化', desc: '感覚を数値に。適正価格が、最高の利益を呼ぶ。' }, { title: '自社予約シフト設計', desc: 'リピーターを育み、OTA手数料から卒業する仕組み。' }, { title: '多言語ブランド構築', desc: '日・英・中、3言語で紡ぐ、世界に響く物語。' }, { title: '越境エコシステム', desc: '教育、村づくり、EC。集客のその先まで、共に。' }].map((s, i) => (<div key={i} className="text-center md:text-left p-4 md:p-6"><h3 className="font-serif font-light text-lg mb-3 text-foreground">{s.title}</h3><p className="text-sm text-foreground/70 leading-relaxed">{s.desc}</p></div>))}</div></div></section>

      {/* 予告カード */}
      <section className="py-12 md:py-16 bg-background"><div className="max-w-2xl mx-auto px-4 md:px-6 text-center border border-hairline p-6 md:p-8"><h3 className="font-serif font-light text-2xl text-foreground mb-4">では、あなたの宿は、どれくらい伸びるのか。</h3><p className="text-sm text-foreground/60 mb-6">稼働率とお部屋単価を動かすだけで、3秒でわかります。</p><button onClick={openSelector} className="bg-[#ABBAA9] text-black font-['Zen_Old_Mincho'] px-6 py-2 text-sm tracking-widest hover:bg-[#B4BC4E] hover:text-white transition-colors">宿の伸びしろを測定</button></div></section>

      {/* 水平スクロール・ポートフォリオ */}
      <section className="py-16 md:py-24 bg-background">
        <h2 className="text-center font-serif font-light text-3xl mb-12 md:mb-16 text-foreground">私たちは、このように宿を見ています</h2>
        <div className="relative overflow-x-auto scrollbar-hide px-4 md:px-8">
          <div className="flex space-x-4 md:space-x-8">
            {[
              { img: "/images/portfolio/portfolio_1.jpg", caption: "数字だけでは見えない、静かなる価値。" },
              { img: "/images/portfolio/portfolio_2.jpg", caption: "世界に開かれた、24時間の窓口。" },
              { img: "/images/portfolio/portfolio_3.jpg", caption: "いつもの日常が、特別な「おもてなし」に変わる瞬間。" },
              { img: "/images/portfolio/portfolio_4.jpg", caption: "口コミが、次の予約を育てていく。" },
              { img: "/images/portfolio/portfolio_5.jpg", caption: "地域とともに成長し、還元し合う関係へ。" },
              { img: "/images/portfolio/portfolio_6.jpg", caption: "世界がまだ知らない、日本の美しさ。" },
              { img: "/images/portfolio/portfolio_7.jpg", caption: "いずれ、越境するエコシステムへ。" },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] md:w-[350px] group">
                <img src={item.img} alt={item.caption} className="h-64 md:h-96 w-full object-cover transition-transform duration-1000 group-hover:scale-[0.98]" />
                <p className="mt-3 text-sm text-foreground/70 font-serif font-light">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meaning Design（日常の断片） */}
      <MeaningDesignSection />

      {/* DestinationDesign：4つのメソッド */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <img src="/images/illust/illus_1.jpg" className="absolute top-20 left-[-40px] w-40 opacity-40 rotate-[-3deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <img src="/images/illust/illus_2.jpg" className="absolute bottom-40 right-[-30px] w-48 opacity-30 rotate-[2deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10"><div className="text-center mb-16 md:mb-24"><p className="text-xs tracking-[0.2em] text-accent-rust mb-4">OUR METHOD</p>
          <h2 className="font-serif font-light text-3xl md:text-5xl text-foreground mb-6">私たちは「モノのないデザイン」を届けます。</h2>
          <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-8 px-2 md:px-0">日本各地の宿や地域に眠る価値を再発見し、「日本だけでなく世界中から訪れたくなる目的地」へと再設計する。それが、私たちのデスティネーションデザインです。</p>
          <p className="font-['Ogg',_'Times_New_Roman',_serif] font-light text-2xl md:text-4xl text-[#6C6059] tracking-[0.15em] mt-8">A Stay Starts a Story</p></div><div className="space-y-16 md:space-y-32">{[ { number:"01", title:"Meaning Design", subtitle:"意味の再定義", desc:"既存の価値観や前提を根底から覆し、「本来の意味」を再発見して魂を入れるフェーズ。", img:"/images/method_meaning.jpg" }, { number:"02", title:"Innovation Design", subtitle:"パラダイムの設計", desc:"見出した意味をベースに、全く新しい顧客体験や「届けるべき相手」の枠組みをデザイン。", img:"/images/method_innovation.jpg" }, { number:"03", title:"Business Design", subtitle:"収益構造の設計", desc:"アイデアで終わらせず、価格設計や販路（直販化）など、確実に稼ぎ続けるビジネスモデルを構築。", img:"/images/method_business.jpg" }, { number:"04", title:"Business Transformation", subtitle:"変革の実装", desc:"組織、採用体制、システム、顧客体験のすべてを根本から変容させ、現実のエコシステムを動かします。", img:"/images/method_transformation.jpg" }].map((m, i) => (<div key={i} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"><div className={`relative h-48 md:h-96 ${i%2===1 ? "md:order-2" : ""}`}><img src={m.img} className="w-full h-full object-cover shadow-2xl" alt={m.title} /><img src={`/images/illust/illus_${i+3}.jpg`} className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 w-16 md:w-24 opacity-60 rotate-[4deg] hover:opacity-100 transition-opacity duration-700 z-10" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div><div className={`max-w-md mx-auto md:mx-0 ${i%2===1 ? "md:order-1" : ""}`}><p className="text-6xl font-light text-accent-rust/20 mb-4">{m.number}</p><h3 className="font-serif font-light text-2xl md:text-3xl text-foreground mb-2">{m.title}</h3><p className="text-xs tracking-[0.2em] text-accent-rust mb-6">{m.subtitle}</p><p className="text-sm text-foreground/60 leading-relaxed">{m.desc}</p></div></div>))}</div></div>
      </section>

      {/* 4つのステップ */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-hairline">
        <img src="/images/illust/illus_5.jpg" className="absolute top-1/2 left-[10%] w-36 opacity-30 rotate-[-2deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <img src="/images/illust/illus_6.jpg" className="absolute top-20 right-[5%] w-44 opacity-25 rotate-[3deg] z-0 hover:opacity-80 transition-opacity duration-1000" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10"><div className="text-center mb-16 md:mb-24"><p className="text-xs tracking-[0.2em] text-accent-rust mb-4">OUR PROCESS</p><h2 className="font-serif font-light text-3xl md:text-5xl text-foreground mb-6">利益を再投資し、共に成長する。</h2><p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">共に成果を生み出しながら、4つのステップで確実に変革を実装します。</p></div><div className="space-y-16 md:space-y-32">{[ { step:"Step 1", title:"足がかり", subtitle:"現場の最適化と利益創出", desc:"OTA運用代行や既存事業の運営支援から入り、現場の無駄を省いて即効性のある利益を生み出します。", img:"/images/step1_foundation.jpg" }, { step:"Step 2", title:"攻めの変革", subtitle:"Web・ダイレクト戦略の構築", desc:"生み出した利益を原資に、自社Webサイト作成。脱下請け・脱OTAを実現し、直接顧客と繋がる強い構造を作ります。", img:"/images/step2_offense.jpg" }, { step:"Step 3", title:"守りの変革", subtitle:"HR BPO・組織の再構築", desc:"新たなステージに合わせて組織を最適化。人事戦略家（HRBPO）として、無駄な採用費を削り、定着率を高め、盤石な組織を作ります。", img:"/images/step3_defense.jpg" }, { step:"Step 4", title:"プロジェクト完了・自走化", subtitle:"顧問パートナーへ", desc:"攻めと守りの完璧な動線が完成したらプロジェクト完了。その後もサステナブルな成長を目指し、経営・人事の社外アドバイザーとして共創し続けます。", img:"/images/step4_autonomy.jpg" }].map((st, i) => (<div key={i} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"><div className={`relative h-48 md:h-96 ${i%2===1 ? "md:order-2" : ""}`}><img src={st.img} className="w-full h-full object-cover shadow-2xl" alt={st.title} />{i===3 && <img src="/images/illust/illus_7.jpg" className="absolute -top-3 -left-3 md:-top-6 md:-left-6 w-16 md:w-28 opacity-70 rotate-[-6deg] hover:opacity-100 transition-opacity duration-700 z-10" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}</div><div className={`max-w-md mx-auto md:mx-0 ${i%2===1 ? "md:order-1" : ""}`}><p className="text-sm tracking-[0.2em] text-accent-rust mb-2">{st.step}</p><h3 className="font-serif font-light text-2xl md:text-3xl text-foreground mb-2">{st.title}</h3><p className="text-xs tracking-[0.2em] text-accent-rust mb-6">{st.subtitle}</p><p className="text-sm text-foreground/60 leading-relaxed">{st.desc}</p></div></div>))}</div></div></section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background border-t border-hairline"><div className="max-w-3xl mx-auto px-4 md:px-6"><div className="text-center mb-12 md:mb-16"><p className="text-xs tracking-[0.2em] text-accent-rust mb-4">FAQ</p><h2 className="font-serif font-light text-3xl text-foreground">よくある質問</h2></div><div className="space-y-6 md:space-y-8">{[ { q: "本当に初月は完全無料ですか？", a: "はい。まずは1ヶ月、完全無料でOTAの基礎設定や分析を行います。その間、一切の費用は発生しません。私たちがまず価値を証明します。" }, { q: "どのような宿でも対応可能ですか？", a: "旅館、ホテル、民宿、ゲストハウスまで、規模や形態を問わず対応します。特に地方の中小規模の宿泊施設の課題に寄り添います。" }, { q: "費用はかかりますか？", a: "初期費用はいただいておりません。初月は完全無料でご利用いただけます。2ヶ月目以降は成果報酬制度となります。" }, { q: "他社のOTA代行と何が違うのか？", a: "海外でのネットワークや経験値が圧倒的に異なります。私たちは、OTAを上手に使いこなすだけの代行業ではなく、新たなマーケットからの新規売上獲得を共創する「デスティネーションデザイン」を行います。" }, { q: "診断だけでも利用できますか？", a: "はい、このサイトから無料で、どなたでもご利用いただけます。詳細な分析をご希望の場合は、コンサルタントとのオンラインミーティングをご案内しています。" }].map((faq, i) => (<details key={i} className="group border-b border-hairline pb-6"><summary className="flex justify-between items-center cursor-pointer list-none"><span className="font-serif font-light text-lg text-foreground">{faq.q}</span><span className="text-accent-rust text-2xl group-open:hidden">+</span><span className="text-accent-rust text-2xl hidden group-open:inline">-</span></summary><p className="mt-4 text-sm text-foreground/60 leading-relaxed">{faq.a}</p></details>))}</div></div></section>

      {/* 中間CTA */}
      <section className="py-16 md:py-32 bg-background text-center border-t border-hairline relative overflow-hidden"><img src="/images/illust/illus_1.jpg" className="absolute top-0 left-1/2 -translate-x-1/2 w-96 opacity-20 rotate-[-2deg] z-0" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /><div className="relative z-10 max-w-2xl mx-auto px-4 md:px-6"><h2 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">まずは、あなたの宿の「眠れる資産」を教えてください。</h2><p className="text-sm text-foreground/60 mb-12 leading-relaxed">私たちが最初にやることは、無料であなたの宿の可能性を診断することです。リスクはゼロ。そこから、あなたと共に次の一歩を考えます。</p><a href="https://timerex.net/s/InnBuddy_ESG/386fd946" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#ABBAA9] text-black font-['Zen_Old_Mincho'] px-10 py-4 text-sm tracking-widest hover:bg-[#B4BC4E] hover:text-white transition-colors duration-700">お話を聞かせてください</a></div></section>

      {/* 呼吸モジュール② */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <img src="/images/breath_4.jpg" className="h-36 md:h-48 w-full object-cover" alt="" />
            <img src="/images/breath_5.jpg" className="h-36 md:h-48 w-full object-cover" alt="" />
            <img src="/images/breath_6.jpg" className="h-36 md:h-48 w-full object-cover" alt="" />
            <img src="/images/breath_7.jpg" className="h-36 md:h-48 w-full object-cover" alt="" />
            <img src="/images/breath_8.jpg" className="h-36 md:h-48 w-full object-cover" alt="" />
          </div>
          <p className="text-center mt-6 text-xs text-foreground/50 italic">静けさを、資産にする。</p>
        </div>
      </section>

      {/* フォトエッセイ（完全レスポンシブ対応） */}
      <section className="relative py-16 md:py-32 bg-background overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 h-auto md:h-[600px] flex flex-wrap justify-center items-center gap-3 md:block">
          <img src="/images/guest_peace.jpg" className="w-[42%] md:w-48 h-48 md:h-64 md:absolute md:top-4 md:left-[28%] md:z-20 md:rotate-[-2deg] object-cover border-4 border-white shadow-sm" alt="" />
          <img src="/images/local_smile.jpg" className="w-[42%] md:w-48 h-48 md:h-64 md:absolute md:top-16 md:left-[48%] md:z-10 md:rotate-[1.5deg] object-cover border-4 border-white shadow-sm" alt="" />
          <img src="/images/entrance_night.jpg" className="w-[42%] md:w-48 h-48 md:h-64 md:absolute md:top-8 md:left-[62%] md:z-30 md:rotate-[-1deg] object-cover border-4 border-white shadow-sm" alt="" />
          <img src="/images/kids_future.jpg" className="w-[42%] md:w-48 h-48 md:h-64 md:absolute md:top-24 md:left-[32%] md:z-0 md:rotate-[2.5deg] object-cover border-4 border-white shadow-sm" alt="" />
          <img src="/images/photo_essay_5.jpg" className="w-[42%] md:w-44 h-48 md:h-60 md:absolute md:top-0 md:left-[42%] md:z-15 md:rotate-[-3.5deg] object-cover border-4 border-white shadow-sm" alt="" />
          <img src="/images/photo_essay_6.jpg" className="w-[42%] md:w-48 h-48 md:h-64 md:absolute md:top-32 md:left-[52%] md:z-5 md:rotate-[0.5deg] object-cover border-4 border-white shadow-sm" alt="" />
          <img src="/images/photo_essay_7.jpg" className="w-[42%] md:w-44 h-48 md:h-60 md:absolute md:top-12 md:left-[22%] md:z-25 md:rotate-[-0.5deg] object-cover border-4 border-white shadow-sm" alt="" />
          <div className="w-full md:absolute md:top-[65%] md:left-1/2 md:-translate-x-1/2 z-40 bg-background/80 backdrop-blur-sm px-6 md:px-8 py-4 md:py-6 text-center mt-4 md:mt-0">
            <p className="font-serif text-lg md:text-2xl text-center text-foreground">この景色は、まだ誰の予約も取っていない。</p>
          </div>
        </div>
      </section>

      {/* 静かなる約束（料金体系） */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <p className="text-center text-xs tracking-[0.2em] text-accent-rust mb-12 md:mb-16">私たちの報酬設計</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number:"01", title:"初月、完全無料", desc:"リスクゼロで始めてください。私たちがまず価値を証明します。1ヶ月でOTAの文章見直しなど、全ての基礎設定を準備します。" },
              { number:"02", title:"成果報酬", desc:"初月の努力が徐々に成果へと結びつきます。ここから、私たちはあなたの宿の未来に本気で伴走を始めます。" },
              { number:"03", title:"資産の自走化", desc:"OTAに頼らずとも選ばれる宿へ。売上の安定化と直接予約の確立に向け、新たな経営資産を共に耕します。" },
              { number:"04", title:"デスティネーションデザインへ。", desc:"ここから先には、決まった型がありません。" },
            ].map((step, i) => (
              <div key={i} className="text-center md:text-left relative">
                <div className="text-4xl font-light text-accent-rust/20 mb-4">{step.number}</div>
                <h3 className="font-serif font-light text-lg mb-2 text-foreground">{step.title}</h3>
                {step.desc && <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>}
              </div>
            ))}
          </div>
          <hr className="border-t border-hairline my-8 md:my-12" />
          <p className="text-center font-serif text-lg md:text-2xl text-foreground leading-relaxed max-w-4xl mx-auto">
            <span className="block">宿そのものを『目的地（Destination）』へ。</span>
            <span className="block">その価値を『共感の届け先（Destination）』へ。</span>
            <span className="block">二つのDestinationを重ね合わせ、唯一無二のブランドを創り上げます。</span>
          </p>
        </div>
      </section>

      {/* Act 4: 未来の約束（最終CTA） */}
      <section className="relative py-32 md:py-48 bg-background">
        <div className="absolute inset-0 z-0">
          <img src="/images/fog_forest_dawn.png" className="w-full h-full object-cover opacity-90 animate-kenburns" alt="" />
        </div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-2xl mx-auto">
          <h2 className="font-serif font-light text-3xl md:text-5xl text-white mb-6 md:mb-8 leading-tight whitespace-normal md:whitespace-nowrap">あなたの物語を、世界の感動へ。</h2>
          <p className="text-white/80 mb-8 md:mb-12 font-sans text-sm md:text-base">まずは、御宿の“眠れる資産”を診断するところから。</p>
          <a href="https://timerex.net/s/InnBuddy_ESG/386fd946" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FDF7F5] text-[#515D46] font-['Zen_Old_Mincho'] px-8 md:px-10 py-3 md:py-4 text-sm tracking-widest hover:bg-[#B4BC4E] hover:text-white transition-colors duration-700">無料相談を予約する</a>
          <p className="mt-6 md:mt-8 text-xs text-white/40 tracking-widest">InnBuddy — 越境エコシステムの入り口</p>
        </div>
      </section>

      {/* 診断入口カード（オリーブベース＋黄色グラデーション） */}
      <section ref={diagnosticSectionRef} className="py-16 md:py-24 bg-background border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative overflow-hidden rounded-sm shadow-md border border-[var(--diag-brown1)]/20 p-6 md:p-8 text-center">
            <DiagnosticBackground showContourOverlay={false} />
            <div className="relative z-10">
              <h3 className="font-serif font-light text-2xl text-foreground mb-2">売上期待値測定</h3>
              <p className="text-sm text-foreground/60 mb-6">
                OTA運用最適化で年間売上UPをシミュレーション<br />
                （所要時間20秒）
              </p>
              <button onClick={openRevenue} className="bg-[var(--diag-base)] text-[var(--diag-text)] font-['Zen_Old_Mincho'] px-8 py-3 text-sm tracking-widest hover:bg-[var(--diag-accent)] hover:text-white transition-colors shadow-md border border-[var(--diag-brown1)]/30">診断を始める</button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm shadow-md border border-[var(--diag-brown1)]/20 p-6 md:p-8 text-center">
            <DiagnosticBackground showContourOverlay={false} />
            <div className="relative z-10">
              <h3 className="font-serif font-light text-2xl text-foreground mb-2">採用スコア診断</h3>
              <p className="text-sm text-foreground/60 mb-6">28問のチェックで採用体制スコアを可視化</p>
              <button onClick={openHiring} className="bg-[var(--diag-base)] text-[var(--diag-text)] font-['Zen_Old_Mincho'] px-8 py-3 text-sm tracking-widest hover:bg-[var(--diag-accent)] hover:text-white transition-colors shadow-md border border-[var(--diag-brown1)]/30">診断を始める</button>
            </div>
          </div>
        </div>
      </section>

      <FloatingCta onDiagnosticClick={openSelector} visible={floatingVisible} />
      <DiagnosticSelectorModal isOpen={selectorOpen} onClose={closeSelector} onSelectRevenue={openRevenue} onSelectHiring={openHiring} />
      <RevenueDiagnosticModal isOpen={revenueOpen} onClose={() => setRevenueOpen(false)} />
      <HiringDiagnosticModal isOpen={hiringOpen} onClose={() => setHiringOpen(false)} />
    </main>
  );
}