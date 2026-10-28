import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, getImage, formatDate } from "@/lib/journal/articles";
import { Markdown } from "@/lib/journal/markdown";

export function generateStaticParams(){
  return getArticles().map((a: any) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if(!a) return {};
  return { title: a.title, description: a.meta?.excerpt?.ja };
}

export default async function ArticlePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const all = getArticles();
  const idx = all.findIndex((a: any) => a.slug === article.slug);
  const related = all.filter((a: any) => a.slug !== article.slug && (a.meta?.cat === article.meta?.cat || a.category === article.category)).slice(0,3);
  const prev = all[idx-1];
  const next = all[idx+1];

  return (
    <div id="articleView">
      <header className="article-headbar container">
        <Link className="logo serif" href="/journal">InnBuddy <span className="logo-pill">JOURNAL</span></Link>
        <div className="head-right">
          <Link className="back" href="/journal">← JOURNAL</Link>
          <div className="lang">
            <button className="on" type="button">日本語</button>
            <button type="button">EN</button>
            <button type="button">中文</button>
          </div>
        </div>
      </header>
      <main className="container">
        <article className="article">
          <div className="kicker">
            <span className="chip">{article.meta?.cat ?? article.category}</span>
            <span>ARTICLE {String(idx + 1).padStart(3,"0")}</span>
          </div>
          <h1>{article.title}</h1>
          {article.meta?.excerpt?.ja && <p className="excerpt">{article.meta.excerpt.ja}</p>}
          <div className="hero-img"><img src={getImage(article)} alt=""/></div>
          <div className="meta-row">
            <span>{formatDate(article.meta?.date)}</span>
            <span>{article.meta?.catEn ?? article.category}</span>
            <span>{Math.max(1, Math.ceil(article.body.length/700))}分で読めます</span>
          </div>
          <div className="body">
            <Markdown source={article.body}/>
          </div>
          <div className="rel">
            <div className="rel-label">RELATED — 同じテーマの記事</div>
            <div className="rel-grid">
              {related.map((r: any) => 
                <Link href={`/journal/articles/${r.slug}`} key={r.slug}>
                  <img src={getImage(r)} alt=""/>
                  <div className="t">
                    <div className="d">{formatDate(r.meta?.date)}</div>
                    <h4>{r.title}</h4>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className="pager">
            {prev ? <Link href={`/journal/articles/${prev.slug}`}>← {prev.title}</Link> : <span/>}
            {next ? <Link href={`/journal/articles/${next.slug}`}>{next.title} →</Link> : <span/>}
          </div>
        </article>
      </main>
      <footer>
        <div className="f1">InnBuddy</div>
        <div className="f2">WEB × OPERATION × BRANDING — ホテル運営の知恵を、もっと身近に。</div>
        <div className="f3">© 2026 InnBuddy</div>
        <div className="f4">* 記事内の数値は一般的な情報に基づく参考値・一例であり、InnBuddyの実績を示すものではありません。</div>
      </footer>
    </div>
  );
}