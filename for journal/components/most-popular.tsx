import { popularArticles } from '@/lib/articles'

export function MostPopular() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <h2 className="mb-8 font-display text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
          Most Popular
        </h2>
        <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {popularArticles.map((article, index) => (
            <li key={article.id}>
              <a
                href="#"
                className="group flex items-start gap-5 border-b border-border py-6 transition-colors"
              >
                <span className="font-display text-5xl font-bold leading-none text-muted-foreground/40 transition-colors group-hover:text-foreground md:text-6xl">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {article.category}
                  </span>
                  <h3 className="text-base font-bold leading-snug text-foreground text-pretty transition-opacity group-hover:opacity-60">
                    {article.title}
                  </h3>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
