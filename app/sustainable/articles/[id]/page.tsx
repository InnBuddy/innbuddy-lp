import { notFound } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";
import "../articles.css";
import ArticleDetailView, { ArticleItem } from "./ArticleDetailView";

// 500記事すべてを事前生成（SEO・表示速度を最大化）
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

  // 容量パンク（ENOSPC）を防ぐため、一覧・サイドバー用のデータから重い本文を除去して軽量化
  const lightArticles = articles.map((a: any) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    date: a.date,
    thumbnail: a.thumbnail,
    tags: a.tags,
  })) as unknown as ArticleItem[];

  return (
    <ArticleDetailView
      initialArticle={article}
      allArticles={lightArticles}
    />
  );
}