import journalArticles from "@/data/journalarticles.json";

export interface Article {
  slug: string;
  date?: string;
  cat?: string;
  catEn?: string;
  catZh?: string;
  category?: string;
  image?: string;
  imageThumb?: string;
  title: string | { ja: string; en: string; zh?: string };
  excerpt?: string | { ja: string; en: string; zh?: string };
  body: string | { ja: string; en: string; zh?: string };
  meta?: {
    date?: string;
    cat?: string;
    catEn?: string;
    catZh?: string;
    image?: string;
    imageThumb?: string;
    excerpt?: {
      ja?: string;
      en?: string;
      zh?: string;
    };
  };
  [key: string]: any;
}

/**
 * 渡された画像パスを確実に "/library/journal/ファイル名" に正規化
 */
export function resolveJournalImagePath(name: string): string {
  if (!name) return "";
  const filename = name.split("/").pop() || name;
  return `/library/journal/${filename}`;
}

export function getImage(article: any): string {
  if (!article) return "";
  const raw =
    article.meta?.image ||
    article.image ||
    article.imageThumb ||
    article.meta?.imageThumb ||
    "";
  return resolveJournalImagePath(raw);
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return dateStr.replace(/-/g, ".");
}

export function getArticles(): Article[] {
  if (!Array.isArray(journalArticles)) return [];
  return journalArticles as Article[];
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getArticles();
  return articles.find((a) => a.slug === slug);
}

export default getArticles;