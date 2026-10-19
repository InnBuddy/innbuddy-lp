"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";
import "./articles.css";

interface ArticleMeta {
  id: string;
  anchor: string;
  title: string;
  length: string;
  goal: string;
  goalColor: string;
  group: string;
  flag: string;
  lead?: string;
  meta?: string;
}

const FILTER_GOALS = [
  { label: "すべて", value: "ALL", color: "#17201d" },
  { label: "GOAL 5", value: "GOAL 5", color: "#FF3A21" },
  { label: "GOAL 6", value: "GOAL 6", color: "#26BDE2" },
  { label: "GOAL 7", value: "GOAL 7", color: "#FCC30B" },
  { label: "GOAL 8", value: "GOAL 8", color: "#A21942" },
  { label: "GOAL 10", value: "GOAL 10", color: "#DD1367" },
  { label: "GOAL 12", value: "GOAL 12", color: "#BF8B2E" },
  { label: "GOAL 14", value: "GOAL 14", color: "#0A97D9" },
  { label: "GOAL 15", value: "GOAL 15", color: "#56C02B" },
];

const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85",
    alt: "木々が広がる豊かな森林",
    label: "NATURE & BIODIVERSITY",
  },
  {
    url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=85",
    alt: "環境とエネルギーを考える風景",
    label: "ENERGY & INNOVATION",
  },
  {
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85",
    alt: "自然環境と持続可能性をイメージした風景",
    label: "SUSTAINABLE FUTURE",
  },
];

function ArticlesContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("ALL");

  // URLクエリパラメータの初期同期
  useEffect(() => {
    const qParam = searchParams.get("q");
    const goalParam = searchParams.get("goal");
    if (qParam !== null) setQuery(qParam);
    if (goalParam !== null) setSelectedGoal(goalParam);
  }, [searchParams]);

  const articles = useMemo(() => {
    return (articlesData as unknown as ArticleMeta[]) || [];
  }, []);

  const hasActiveFilter = query.trim().length > 0 || selectedGoal !== "ALL";

  const featuredArticles = useMemo(() => {
    return articles.slice(0, 3);
  }, [articles]);

  const filtered = useMemo(() => {
    if (!Array.isArray(articles)) return [];
    const q = query.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesQuery =
        !q ||
        String(article.id ?? "").toLowerCase().includes(q) ||
        (article.title ?? "").toLowerCase().includes(q) ||
        (article.lead ?? "").toLowerCase().includes(q) ||
        (article.goal ?? "").toLowerCase().includes(q);

      const matchesGoal =
        selectedGoal === "ALL" || (article.goal ?? "").includes(selectedGoal);

      return matchesQuery && matchesGoal;
    });
  }, [articles, query, selectedGoal]);

  const featuredIds = new Set(featuredArticles.map((article) => article.id));

  const listedArticles = !hasActiveFilter
    ? filtered.filter((article) => !featuredIds.has(article.id))
    : filtered;

  return (
    <>
      <header className="portal-hero">
        <p className="portal-kicker">FROM EARTH TO HOTEL / KNOWLEDGE ARCHIVE</p>
        <h1 className="portal-title">
          サステナビリティを、
          <br className="hero-title-break" />
          現場の実践へ。
        </h1>
        <p className="portal-desc">
          理想論ではなく、現場の数字と改善の工夫から紐解く
          ホテル・宿のサステナビリティ。
          コスト削減と選ばれる価値を両立するための、
          500の実践事例アーカイブです。
        </p>
        <div className="portal-hero-bottom">
          <span className="hero-index">RESEARCH / INSIGHT / ACTION</span>
          <span className="hero-count">
            {articles.length.toLocaleString("ja-JP")} ARTICLES
          </span>
        </div>
      </header>

      {!hasActiveFilter && featuredArticles.length > 0 && (
        <section className="featured-section" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">EDITOR'S SELECTION</p>
              <h2 id="featured-title" className="section-title">
                注目の実践事例
              </h2>
            </div>
            <span className="section-side-note">SELECTED STORIES</span>
          </div>

          <div className="featured-grid">
            {featuredArticles.map((article, index) => {
              const image = FEATURED_IMAGES[index % FEATURED_IMAGES.length];
              return (
                <Link
                  key={article.id}
                  href={`/sustainable/articles/${article.id}`}
                  className={`featured-card featured-card-${index + 1}`}
                >
                  <div className="featured-image-wrap">
                    <img
                      className="featured-image"
                      src={image.url}
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <span className="featured-image-label">{image.label}</span>
                    <span
                      className="featured-goal-color"
                      style={{
                        backgroundColor: article.goalColor || "#17201d",
                      }}
                    />
                  </div>

                  <div className="featured-content">
                    <div className="featured-meta">
                      <span>CASE {article.id}</span>
                      <span
                        className="featured-goal"
                        style={{
                          color: article.goalColor || "#17201d",
                        }}
                      >
                        {article.goal}
                      </span>
                    </div>

                    <h3 className="featured-title">{article.title}</h3>
                    {article.lead && (
                      <p className="featured-summary">{article.lead}</p>
                    )}

                    <span className="featured-read">
                      事例を読む <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="archive-section" aria-labelledby="archive-title">
        <div className="section-heading archive-heading">
          <div>
            <p className="section-eyebrow">THE KNOWLEDGE LIBRARY</p>
            <h2 id="archive-title" className="section-title">
              すべての実践事例
            </h2>
            <p className="section-intro">
              テーマやSDGsゴールから、必要な知識を探せます。
            </p>
          </div>
          <span className="archive-total">
            {filtered.length.toLocaleString("ja-JP")} /{" "}
            {articles.length.toLocaleString("ja-JP")}
          </span>
        </div>

        <div className="controls-panel">
          <div className="controls-inner">
            <label className="search-label" htmlFor="article-search">
              キーワードで探す
            </label>

            <div className="search-input-box">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                id="article-search"
                type="search"
                placeholder="例：食品ロス、太陽光、水循環、001"
                className="portal-search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="filter-label">SDGsゴールから探す</div>

            <div className="goal-filter-pills">
              {FILTER_GOALS.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setSelectedGoal(goal.value)}
                  className={`goal-filter-btn ${
                    selectedGoal === goal.value ? "active" : ""
                  }`}
                  aria-pressed={selectedGoal === goal.value}
                >
                  <span
                    className="goal-filter-dot"
                    style={{ backgroundColor: goal.color }}
                  />
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-bar" aria-live="polite">
          <span>
            <strong>{filtered.length.toLocaleString("ja-JP")}</strong> 件の事例
          </span>

          {hasActiveFilter && (
            <button
              type="button"
              className="reset-filter"
              onClick={() => {
                setQuery("");
                setSelectedGoal("ALL");
              }}
            >
              条件をリセット ×
            </button>
          )}
        </div>

        {listedArticles.length > 0 ? (
          <div className="articles-stream">
            {listedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/sustainable/articles/${article.id}`}
                className="editorial-card"
                style={
                  {
                    "--card-goal-color": article.goalColor || "#17201d",
                  } as React.CSSProperties
                }
              >
                <div className="card-content">
                  <div className="card-meta-head">
                    <span className="card-num">CASE {article.id}</span>
                    <span
                      className="card-goal-badge"
                      style={{
                        backgroundColor: article.goalColor || "#17201d",
                      }}
                    >
                      {article.goal}
                    </span>
                  </div>

                  <h3 className="card-headline">{article.title}</h3>

                  {article.lead && (
                    <p className="card-summary">{article.lead}</p>
                  )}
                </div>

                <div className="card-meta-foot">
                  <span>{article.length}</span>
                  <span className="card-arrow-link">
                    READ REPORT <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <p className="empty-results-title">
              該当する事例が見つかりませんでした。
            </p>
            <p>キーワードを変更するか、フィルターをリセットしてください。</p>
            <button
              type="button"
              className="empty-reset"
              onClick={() => {
                setQuery("");
                setSelectedGoal("ALL");
              }}
            >
              すべての事例を表示
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default function SustainableArticlesHomePage() {
  return (
    <div className="articles-portal">
      <nav className="floating-sub-nav" aria-label="サイトナビゲーション">
        <Link href="/sustainable" className="brand-tag">
          HOTEL <span>×</span> SDGs 2030
        </Link>
        <Link href="/sustainable" className="nav-back-link">
          ← 特設LPトップへ戻る
        </Link>
      </nav>

      <Suspense fallback={<div className="portal-hero">Loading...</div>}>
        <ArticlesContent />
      </Suspense>

      <footer className="archive-footer">
        <Link href="/sustainable" className="footer-brand">
          HOTEL <span>×</span> SDGs 2030
        </Link>
        <p>Knowledge for a more sustainable hospitality industry.</p>
        <span className="footer-copyright">RESEARCH · INSIGHT · ACTION</span>
      </footer>
    </div>
  );
}