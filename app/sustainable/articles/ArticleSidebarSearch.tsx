"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import articlesData from "@/data/sustainablearticles.json";

interface ArticleMeta {
  id: string;
  title: string;
  goal: string;
  goalColor: string;
  lead?: string;
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

export default function ArticleSidebarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const articles = useMemo(() => {
    return (articlesData as unknown as ArticleMeta[]) || [];
  }, []);

  // キーワード入力に連動したリアルタイム検索結果（最大5件）
  const liveResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles
      .filter((a) => {
        return (
          String(a.id ?? "").toLowerCase().includes(q) ||
          (a.title ?? "").toLowerCase().includes(q) ||
          (a.lead ?? "").toLowerCase().includes(q) ||
          (a.goal ?? "").toLowerCase().includes(q)
        );
      })
      .slice(0, 5);
  }, [articles, query]);

  // 全件ヒット数
  const totalMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    return articles.filter((a) => {
      return (
        String(a.id ?? "").toLowerCase().includes(q) ||
        (a.title ?? "").toLowerCase().includes(q) ||
        (a.lead ?? "").toLowerCase().includes(q) ||
        (a.goal ?? "").toLowerCase().includes(q)
      );
    }).length;
  }, [articles, query]);

  // Enter押下時に一覧ページへ遷移
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/sustainable/articles?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="sidebar-search-container">
      <div className="sidebar-search-card">
        <h3 className="sidebar-search-heading">事例を探す</h3>

        {/* キーワード入力 */}
        <div className="sidebar-input-group">
          <label className="sidebar-label" htmlFor="sidebar-search-input">
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
              id="sidebar-search-input"
              type="search"
              placeholder="例：食品ロス、001"
              className="sidebar-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* キーワード入力時のリアルタイム候補ジャンプリスト */}
          {query.trim().length > 0 && (
            <div className="sidebar-live-dropdown">
              {liveResults.length > 0 ? (
                <>
                  <div className="sidebar-live-list">
                    {liveResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/sustainable/articles/${item.id}`}
                        className="sidebar-live-item"
                      >
                        <div className="sidebar-live-meta">
                          <span className="sidebar-live-case">CASE {item.id}</span>
                          <span
                            className="sidebar-live-badge"
                            style={{ backgroundColor: item.goalColor || "#17201d" }}
                          >
                            {item.goal}
                          </span>
                        </div>
                        <span className="sidebar-live-title">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                  {totalMatches > liveResults.length && (
                    <Link
                      href={`/sustainable/articles?q=${encodeURIComponent(query.trim())}`}
                      className="sidebar-view-all-link"
                    >
                      該当する全 {totalMatches} 件を一覧で見る ↗
                    </Link>
                  )}
                </>
              ) : (
                <div className="sidebar-live-empty">
                  該当する事例がありません
                </div>
              )}
            </div>
          )}
        </div>

        {/* SDGsゴールから探す */}
        <div className="sidebar-filter-group">
          <span className="sidebar-label">SDGsゴールから探す</span>
          <div className="sidebar-goal-pills">
            {FILTER_GOALS.map((goal) => (
              <Link
                key={goal.value}
                href={
                  goal.value === "ALL"
                    ? "/sustainable/articles"
                    : `/sustainable/articles?goal=${encodeURIComponent(goal.value)}`
                }
                className="sidebar-goal-btn"
              >
                <span
                  className="goal-filter-dot"
                  style={{ backgroundColor: goal.color }}
                />
                {goal.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 目次一覧へのリンクボタン */}
        <div className="sidebar-footer-link">
          <Link href="/sustainable/articles" className="sidebar-back-to-index">
            ← レポート目次一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}