import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, getImage, formatDate } from "@/lib/journal/articles";
import { Markdown } from "@/lib/journal/markdown";
import "../../style.css";

function resolveJournalImage(item: any): string {
  if (!item) return "";
  let raw = "";
  if (typeof item === "string") {
    raw = item;
  } else if (item.meta?.image) {
    raw = item.meta.image;
  } else if (item.image) {
    raw = item.image;
  } else if (typeof getImage === "function") {
    try {
      raw = getImage(item);
    } catch {
      raw = "";
    }
  }
  if (!raw) return "";
  const filename = raw.split("/").pop() || raw;
  return `/library/journal/${filename}`;
}

export function generateStaticParams() {
  const articles = typeof getArticles === "function" ? getArticles() : [];
  return articles.map((a: any) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return {};
  
  const titleText = typeof a.title === "string" ? a.title : a.title?.ja || "";
  const excerptText =
    a.meta?.excerpt?.ja ||
    (typeof a.excerpt === "string" ? a.excerpt : a.excerpt?.ja) ||
    "";

  return { 
    title: `${titleText} | InnBuddy JOURNAL`, 
    description: excerptText
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const all = typeof getArticles === "function" ? getArticles() : [];
  const idx = all.findIndex((a: any) => a.slug === article.slug);
  
  const currentCat = article.meta?.cat || article.cat || article.category;
  const related = all
    .filter(
      (a: any) =>
        a.slug !== article.slug &&
        (a.meta?.cat === currentCat || a.cat === currentCat || a.category === currentCat)
    )
    .slice(0, 3);

  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  const articleTitle = typeof article.title === "string" ? article.title : article.title?.ja || "";
  const articleDate = article.meta?.date || article.date;
  const categoryName = article.meta?.cat ?? article.cat ?? article.category ?? "JOURNAL";
  const categoryEn = article.meta?.catEn ?? article.catEn ?? "JOURNAL";
  const excerptText =
    article.meta?.excerpt?.ja ||
    (typeof article.excerpt === "string" ? article.excerpt : article.excerpt?.ja) ||
    null;
  const bodyText = typeof article.body === "string" ? article.body : article.body?.ja || "";

  return (
    <div id="articleView">
      <header className="article-headbar container">
        <Link className="logo serif" href="/journal">
          InnBuddy <span className="logo-pill">JOURNAL</span>
        </Link>
        <div className="head-right">
          <Link className="back" href="/journal">
            ← JOURNAL
          </Link>
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
            <span className="chip">{categoryName}</span>
            <span>ARTICLE {String(Math.max(1, idx + 1)).padStart(3, "0")}</span>
          </div>

          <h1>{articleTitle}</h1>

          {excerptText && <p className="excerpt">{excerptText}</p>}

          <div className="hero-img">
            <img src={resolveJournalImage(article)} alt={articleTitle} />
          </div>

          <div className="meta-row">
            <span>{typeof formatDate === "function" && articleDate ? formatDate(articleDate) : articleDate}</span>
            <span>{categoryEn}</span>
            <span>{Math.max(1, Math.ceil((bodyText.length || 700) / 700))}分で読めます</span>
          </div>

          <div className="body">
            <Markdown source={bodyText} />
          </div>

          <div className="rel">
            <div className="rel-label">RELATED — 同じテーマの記事</div>
            <div className="rel-grid">
              {related.map((r: any) => {
                const rTitle = typeof r.title === "string" ? r.title : r.title?.ja || "";
                const rDate = r.meta?.date || r.date;
                return (
                  <Link href={`/journal/articles/${r.slug}`} key={r.slug}>
                    <img src={resolveJournalImage(r)} alt={rTitle} />
                    <div className="t">
                      <div className="d">
                        {typeof formatDate === "function" && rDate ? formatDate(rDate) : rDate}
                      </div>
                      <h4>{rTitle}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pager">
            {prev ? (
              <Link href={`/journal/articles/${prev.slug}`}>
                ← {typeof prev.title === "string" ? prev.title : prev.title?.ja}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/journal/articles/${next.slug}`}>
                {typeof next.title === "string" ? next.title : next.title?.ja} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </main>

      <footer>
        <div className="f1">InnBuddy</div>
        <div className="f2">WEB × OPERATION × BRANDING — ホテル運営の知恵を、もっと身近に。</div>
        <div className="f3">© 2026 InnBuddy</div>
        <div className="f4">
          記事内の数値は一般的な情報に基づく参考値・一例であり、InnBuddyの実績を示すものではありません。
        </div>
      </footer>
    </div>
  );
}