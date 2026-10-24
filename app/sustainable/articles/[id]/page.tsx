import { notFound } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";
import "../articles.css";
import ArticleDetailView, { ArticleItem } from "./ArticleDetailView";
import SdgBottomNav from "../SdgBottomNav";

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

  const lightArticles = articles.map((a: any) => ({
    id: String(a.id),
    title: a.title,
    goal: a.goal,
    goalColor: a.goalColor,
    length: a.length,
    lead: a.lead,
    articleHtml: String(a.id) === String(id) ? a.articleHtml : "",
  })) as unknown as ArticleItem[];

  return (
    <div className="pb-16 md:pb-0">
      <ArticleDetailView
        initialArticle={article}
        allArticles={lightArticles}
      />
      {/* ★ スマホ用 SDGs ボトムナビ（個別ページから一覧へ遷移） ★ */}
      <SdgBottomNav />
    </div>
  );
}