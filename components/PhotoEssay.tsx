export default function PhotoEssay() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="relative max-w-4xl mx-auto h-[500px]">
        <img src="/images/guest_peace.jpg" className="absolute top-0 left-[10%] z-20 rotate-[-2deg] w-48 h-64 object-cover border-4 border-white shadow-sm" alt="" />
        <img src="/images/local_smile.jpg" className="absolute top-16 left-[30%] z-10 rotate-[1.5deg] w-48 h-64 object-cover border-4 border-white shadow-sm" alt="" />
        <img src="/images/entrance_night.jpg" className="absolute top-8 left-[55%] z-30 rotate-[-1deg] w-48 h-64 object-cover border-4 border-white shadow-sm" alt="" />
        <img src="/images/kids_future.jpg" className="absolute top-24 left-[45%] z-0 rotate-[2.5deg] w-48 h-64 object-cover border-4 border-white shadow-sm" alt="" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm px-8 py-6">
          <p className="font-serif text-xl md:text-2xl text-center text-foreground">この景色は、まだ誰の予約も取っていない。</p>
        </div>
      </div>
    </section>
  );
}
