import { notFound } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";
import "../articles.css";
import ArticleDetailView, { ArticleItem } from "./ArticleDetailView";

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

  // 軽量化はしつつ、本文の表示に必要なプロパティ（articleHtml, goal, etc）を維持する
  const lightArticles = articles.map((a: any) => ({
    id: String(a.id),
    title: a.title,
    goal: a.goal,
    goalColor: a.goalColor,
    length: a.length,
    lead: a.lead,
    articleHtml: String(a.id) === String(id) ? a.articleHtml : "", // 現在のページの本文だけを渡す
  })) as unknown as ArticleItem[];

  return (
    <ArticleDetailView
      initialArticle={article}
      allArticles={lightArticles}
    />
  );
}