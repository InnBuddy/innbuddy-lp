import { notFound } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";
import "../articles.css";
import ArticleDetailView, { ArticleItem } from "./ArticleDetailView";

export const dynamic = 'force-static';
export const dynamicParams = false;

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

  // サイドバーや前後ナビ用の目次リスト（本文や警告等の重いHTMLは削ぎ落としてCPU・メモリを最小化）
  const lightArticles = articles.map((a: any) => ({
    id: String(a.id),
    title: a.title,
    goal: a.goal,
    goalColor: a.goalColor,
    length: a.length,
    lead: a.lead,
    articleHtml: "",
    warnHtml: null,
    chkHtml: null,
    sameHtml: null,
    anchor: "",
    group: "",
    meta: "",
  })) as unknown as ArticleItem[];

  return (
    <ArticleDetailView
      key={article.id}
      initialArticle={article}
      allArticles={lightArticles}
    />
  );
}