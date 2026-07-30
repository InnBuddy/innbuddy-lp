export default function ValueDetails() {
  const leftImages = [
    { src: "/images/detail_steam.jpg", height: "h-64" },
    { src: "/images/detail_wood.jpg", height: "h-80" },
    { src: "/images/detail_light.jpg", height: "h-72" },
  ];
  const rightImages = [
    { src: "/images/detail_hand.jpg", height: "h-72" },
    { src: "/images/detail_water.jpg", height: "h-64" },
    { src: "/images/detail_stone.jpg", height: "h-80" },
  ];

  return (
    <section className="py-24 bg-background">
      <p className="text-center text-xs tracking-[0.2em] text-accent-rust mb-16">資産の解像度</p>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-6">
        <div className="space-y-6">
          {leftImages.map((img, i) => (
            <div key={i} className={img.height + " w-full"}>
              <img src={img.src} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>
        <div className="space-y-6 mt-24">
          {rightImages.map((img, i) => (
            <div key={i} className={img.height + " w-full"}>
              <img src={img.src} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
