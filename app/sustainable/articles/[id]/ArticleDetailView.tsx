"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export interface ArticleItem {
  id: string;
  anchor: string;
  title: string;
  length: string;
  goal: string;
  goalColor: string;
  group: string;
  meta: string;
  lead: string;
  chkHtml: string | null;
  sameHtml: string | null;
  warnHtml: string | null;
  articleHtml: string;
}

const FILTER_GOALS = [
  { label: "すべて", value: "ALL", color: "#17201d" },
  { label: "GOAL 5", value: "GOAL 5", color: "#FF3A21" },
  { label: "GOAL 6", value: "GOAL 6", color: "#26BDE2" },
  { label: "GOAL 7", value: "GOAL 7", color: "#FCC30B" },
  { label: "GOAL 8", value: "GOAL 8", color: "#A21942" },
  { label: "GOAL 10", value: "GOAL 10", color: "#DD1367" },
  { label: "GOAL 12", value: "GOAL 12", color: "#BF8B2E" },
  { label: "GOAL 14", value: "GOAL 14", color: "#0A9709" },
  { label: "GOAL 15", value: "GOAL 15", color: "#56C02B" },
];

export default function ArticleDetailView({
  initialArticle,
  allArticles,
}: {
  initialArticle: ArticleItem;
  allArticles: ArticleItem[];
}) {
  const current = initialArticle;

  // 検索パネルの状態
  const [query, setQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("ALL");

  // 前後の記事を特定
  const currentIndex = useMemo(() => {
    return allArticles.findIndex((a) => String(a.id) === String(current.id));
  }, [allArticles, current.id]);

  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next = currentIndex !== -1 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // 検索パネルの絞り込み
  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allArticles.filter((article) => {
      const matchesQuery =
        String(article.id ?? "").toLowerCase().includes(q) ||
        (article.title ?? "").toLowerCase().includes(q) ||
        (article.lead ?? "").toLowerCase().includes(q) ||
        (article.goal ?? "").toLowerCase().includes(q);
      const matchesGoal =
        selectedGoal === "ALL" || (article.goal ?? "").includes(selectedGoal);
      return matchesQuery && matchesGoal;
    });
  }, [allArticles, query, selectedGoal]);

  return (
    <div
      className="articles-portal"
      style={{
        "--article-goal-color": current.goalColor || "#17201d",
      } as React.CSSProperties}
    >
      {/* 外部CSSからのスタイル汚染を完全に遮断するスタイル指定 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .detail-sheet h1.detail-h1 {
          font-size: 26px !important;
          line-height: 1.4 !important;
          margin: 12px 0 16px 0 !important;
          font-weight: 700 !important;
          color: #1a1a1a !important;
          letter-spacing: -0.01em !important;
          word-break: break-word !important;
        }
        .detail-sheet {
          position: relative;
          z-index: 1;
        }
      `}} />

      {/* フローティングナビ */}
      <nav className="floating-sub-nav">
        <Link href="/sustainable" className="brand-tag">
          HOTEL <span>x</span> SDGs 2030
        </Link>
        <Link href="/sustainable/articles" className="nav-back-link">
          ← レポート目次一覧へ
        </Link>
      </nav>

      {/* 2カラムレイアウト */}
      <div className="detail-layout-container">
        {/* 左側: 記事本文シート */}
        <main className="detail-main-content">
          <article className="detail-sheet">
            <header>
              <div className="detail-kicker-row">
                <span
                  className="card-goal-badge"
                  style={{
                    backgroundColor: current.goalColor || "#17201d",
                    fontSize: "11px",
                    padding: "4px 12px",
                  }}
                >
                  {current.goal}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    letterSpacing: "0.06em",
                  }}
                >
                  #{current.id} {current.length}
                </span>
              </div>
              <h1 className="detail-h1">{current.title}</h1>
              {current.lead && (
                <div className="detail-lead-box">{current.lead}</div>
              )}
            </header>

            {current.warnHtml && (
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "13px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "rgba(185, 134, 99, 0.1)",
                  borderLeft: "3px solid #b98663",
                }}
                dangerouslySetInnerHTML={{ __html: current.warnHtml }}
              />
            )}

            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: current.articleHtml || "" }}
            />
          </article>

          {/* 前後の事例ナビカード */}
          <nav className="pager-grid" aria-label="前後の事例">
            {prev ? (
              <Link
                href={`/sustainable/articles/${prev.id}`}
                className="pager-card text-left"
              >
                <span className="pager-eyebrow">← 前の事例(#{prev.id})</span>
                <span className="pager-title">{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                href={`/sustainable/articles/${next.id}`}
                className="pager-card text-right"
              >
                <span className="pager-eyebrow">次の事例(#{next.id}) →</span>
                <span className="pager-title">{next.title}</span>
              </Link>
            )}
          </nav>
        </main>

        {/* 右側: 事例を探す & 一覧パネル */}
        <aside className="detail-sidebar-wrap" aria-label="事例検索サイドバー">
          <div className="sidebar-search-card">
            <h3 className="sidebar-search-heading">🔍 事例を探す</h3>

            {/* キーワード入力 */}
            <div className="sidebar-input-group">
              <label className="sidebar-label" htmlFor="sidebar-keyword">
                キーワードで探す
              </label>
              <div className="sidebar-input-wrapper">
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
                  id="sidebar-keyword"
                  type="search"
                  placeholder="例: 食品ロス、001"
                  className="sidebar-search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* SDGsゴール選択 */}
            <div className="sidebar-filter-group">
              <span className="sidebar-label">SDGsゴールから探す</span>
              <div className="sidebar-goal-pills">
                {FILTER_GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => setSelectedGoal(goal.value)}
                    className={`sidebar-goal-btn ${
                      selectedGoal === goal.value ? "active" : ""
                    }`}
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

            {/* パネル下部: 選択した項目の記事一覧 */}
            <div className="sidebar-matched-section">
              <div className="sidebar-matched-head">
                <span className="sidebar-matched-title">
                  {selectedGoal !== "ALL"
                    ? `${selectedGoal} の事例`
                    : query.trim()
                    ? `"${query.trim()}"の結果`
                    : "すべての事例"}
                </span>
                <span className="sidebar-matched-count">
                  {filteredList.length} 件
                </span>
              </div>

              <div className="sidebar-matched-scroll-box">
                {filteredList.length > 0 ? (
                  filteredList.map((item) => {
                    const isSelected = String(item.id) === String(current.id);
                    return (
                      <Link
                        key={item.id}
                        href={`/sustainable/articles/${item.id}`}
                        className={`sidebar-article-item ${
                          isSelected ? "is-active" : ""
                        }`}
                      >
                        <div className="sidebar-item-meta">
                          <span className="sidebar-item-case">#{item.id}</span>
                          <span
                            className="sidebar-item-badge"
                            style={{
                              backgroundColor: item.goalColor || "#17201d",
                            }}
                          >
                            {item.goal}
                          </span>
                        </div>
                        <span className="sidebar-item-title">{item.title}</span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="sidebar-no-results">
                    該当する事例がありません
                  </div>
                )}
              </div>
            </div>

            {/* 目次一覧へのリンク */}
            <div className="sidebar-footer-link">
              <Link
                href="/sustainable/articles"
                className="sidebar-back-to-index"
              >
                ← レポート目次一覧へ戻る
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <footer className="archive-footer">
        <Link href="/sustainable" className="footer-brand">
          HOTEL <span>x</span> SDGs 2030
        </Link>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 24px", margin: "16px 0", fontSize: "13px" }}>
          <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>InnBuddyとは</a>
          <a href="https://innbuddy-japan.com/team/" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>運営組織</a>
          <a href="https://innbuddy-japan.com/library/" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>メディア一覧</a>
          <a href="https://innbuddy-japan.com/contact/" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>お問い合わせ</a>
        </div>
        <p>Knowledge for a more sustainable hospitality industry.</p>
        <span className="footer-copyright">
          RESEARCH · INSIGHT · ACTION
        </span>
      </footer>
    </div>
  );
}