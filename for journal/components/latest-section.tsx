import Image from 'next/image'
import { latestArticles, type Article } from '@/lib/articles'

function ArticleCard({ article }: { article: Article }) {
  return (
    <a href="#" className="group flex flex-col gap-3">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={article.image || '/placeholder.svg'}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-0 top-0 bg-foreground px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-background">
          {article.category}
        </span>
      </div>
      <h3 className="line-clamp-3 text-lg font-bold leading-snug text-foreground text-pretty transition-opacity group-hover:opacity-60">
        {article.title}
      </h3>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {article.author}　/　{article.date}
      </p>
    </a>
  )
}

export function LatestSection() {
  return (
    <section id="business" className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 flex items-baseline justify-between border-b-2 border-foreground pb-3">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
          Latest
        </h2>
        <a
          href="#"
          className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-opacity hover:opacity-60"
        >
          もっと見る
        </a>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {latestArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
