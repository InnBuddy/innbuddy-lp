export default function BreathingModule() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/images/breath_1.jpg" className="h-64 w-full object-cover" alt="" />
          <img src="/images/breath_2.jpg" className="h-64 w-full object-cover" alt="" />
          <img src="/images/breath_3.jpg" className="h-64 w-full object-cover" alt="" />
        </div>
        <p className="text-center mt-6 text-xs text-foreground/50 italic">静けさが、資産になる。</p>
      </div>
    </section>
  );
}
