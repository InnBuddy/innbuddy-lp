import rawArticlesData from '@/data/journalarticles.json';

// rawArticlesData を as any[] で明示的に配列として扱う
const rawArticles = rawArticlesData as any[];

export function getArticles() {
  return rawArticles.map((a: any) => ({
    ...a,
    id: a.slug,
    title: a.title?.ja || a.title || "",
    category: a.cat,
    body: a.body?.ja || a.body || "",
    meta: {
      cat: a.cat,
      catEn: a.catEn,
      date: a.date,
      excerpt: a.excerpt
    }
  }));
}

export function getArticleBySlug(slug: string) {
  const articles = getArticles();
  return articles.find((a: any) => a.slug === slug);
}

export function getImage(article: any) {
  if (!article || !article.image) return '';
  const filename = article.image.split('/').pop();
  return `/journal/${filename}`;
}

export function formatDate(dateStr: string) {
  return dateStr ? dateStr.replace(/-/g, '.') : '';
}