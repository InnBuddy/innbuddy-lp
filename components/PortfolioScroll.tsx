export default function PortfolioScroll() {
  const items = [
    { img: "/images/portfolio/portfolio_1.jpg", caption: "グローバルな視点で価値を再発見" },
    { img: "/images/portfolio/portfolio_2.jpg", caption: "データが導く、最適な価格とタイミング" },
    { img: "/images/portfolio/portfolio_3.jpg", caption: "口コミが自然に集まる仕組み設計" },
    { img: "/images/portfolio/portfolio_4.jpg", caption: "自社予約へと育つ、リピーターの循環" },
    { img: "/images/portfolio/portfolio_5.jpg", caption: "越境EC、教育、村づくりへと続く道" },
  ];

  return (
    <section className="py-24 bg-background">
      <h2 className="text-center font-serif font-light text-3xl mb-16 text-foreground">
        私たちは、このように宿を見ています
      </h2>
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex space-x-8 px-8">
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[350px] group">
              <img src={item.img} alt={item.caption} className="h-96 w-full object-cover transition-transform duration-1000 group-hover:scale-[0.98]" />
              <p className="mt-3 text-sm text-foreground/70 font-serif font-light">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}