import { notFound } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";
import "../articles.css";
import ArticleDetailView, { ArticleItem } from "./ArticleDetailView";

// 500記事すべての静的HTMLを事前生成（Google検索のSEOを100%確保）
export async function generateStaticParams() {
  const articles = articlesData as unknown as ArticleItem[];
  if (!Array.isArray(articles)) return [];
  return articles.map((art) => ({
    id: String(art.id),
  }));
}

export default async function SustainableArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articles = articlesData as unknown as ArticleItem[];

  if (!Array.isArray(articles)) {
    notFound();
  }

  const article = articles.find((a) => String(a.id) === String(id));

  if (!article) {
    notFound();
  }

  return (
    <ArticleDetailView
      initialArticle={article}
      allArticles={articles}
    />
  );
}