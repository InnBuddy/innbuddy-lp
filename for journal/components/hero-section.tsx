import Image from 'next/image'
import { heroArticles, type Article } from '@/lib/articles'

function CategoryLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  )
}

function SubArticle({ article }: { article: Article }) {
  return (
    <a href="#" className="group flex flex-col gap-2">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
        <Image
          src={article.image || '/placeholder.svg'}
          alt={article.title}
          fill
          sizes="(max-width: 1024px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CategoryLabel>{article.category}</CategoryLabel>
      <h3 className="text-base font-bold leading-snug text-foreground text-pretty transition-opacity group-hover:opacity-60">
        {article.title}
      </h3>
    </a>
  )
}

export function HeroSection() {
  const [main, ...subs] = heroArticles
  const left = subs.slice(0, 2)
  const right = subs.slice(2, 4)

  return (
    <section className="border-b border-border">
      {/* Mobile / Tablet: carousel */}
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-6 no-scrollbar">
          {heroArticles.map((article) => (
            <a
              key={article.id}
              href="#"
              className="group flex w-[86%] flex-none snap-center flex-col gap-3 sm:w-[70%]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={article.image || '/placeholder.svg'}
                  alt={article.title}
                  fill
                  sizes="86vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CategoryLabel>{article.category}</CategoryLabel>
              <h3 className="text-xl font-bold leading-snug text-foreground text-pretty">
                {article.title}
              </h3>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: 3-column layout */}
      <div className="mx-auto hidden max-w-[1400px] grid-cols-12 gap-8 px-6 py-10 lg:grid">
        {/* Left sub column */}
        <div className="col-span-3 flex flex-col gap-8 border-r border-border pr-8">
          {left.map((a) => (
            <SubArticle key={a.id} article={a} />
          ))}
        </div>

        {/* Main feature */}
        <div className="col-span-6">
          <a href="#" className="group flex flex-col gap-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <Image
                src={main.image || '/placeholder.svg'}
                alt={main.title}
                fill
                priority
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CategoryLabel>{main.category}</CategoryLabel>
            <h2 className="text-4xl font-black leading-[1.15] text-foreground text-balance transition-opacity group-hover:opacity-70 xl:text-5xl">
              {main.title}
            </h2>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {main.author}　/　{main.date}
            </p>
          </a>
        </div>

        {/* Right sub column */}
        <div className="col-span-3 flex flex-col gap-8 border-l border-border pl-8">
          {right.map((a) => (
            <SubArticle key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
