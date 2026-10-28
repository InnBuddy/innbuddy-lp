"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getArticles } from "@/lib/journal/articles";
import { categoryCards, featuredSets, heroTiles } from "@/lib/journal/home-data";
import "./style.css";

const img = (name: string) => {
  if (!name) return "";
  const filename = name.split("/").pop() || name;
  return `/library/journal/${filename}`;
};

const categoryCount = (articles: any[], cat: string) =>
  articles.filter(
    (a: any) =>
      a.meta?.cat === cat ||
      a.cat === cat ||
      a.category === cat
  ).length;

function ViewMore({ href }: { href: string }) {
  return (
    <div className="view-more">
      <Link href={href} aria-label="View More">
        <svg viewBox="0 0 130 110" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="65" cy="28" fill="#F0E4C0" rx="10.5" ry="8.2" stroke="#1A1A1A" strokeWidth="1.25" />
          <ellipse cx="84.5" cy="31.5" fill="#EDE0BA" rx="9.2" ry="7.5" transform="rotate(12 84.5 31.5)" />
          <ellipse cx="45" cy="31.5" fill="#EDE0BA" rx="9.2" ry="7.5" transform="rotate(-12 45 31.5)" />
          <ellipse cx="65" cy="64" fill="#FFF8D6" rx="40" ry="29" stroke="#1A1A1A" strokeWidth="1.5" />
          <g stroke="#1A1A1A" strokeLinejoin="round" strokeWidth="1.35">
            <ellipse cx="109" cy="73.5" fill="#EFE5C8" rx="9.8" ry="8.5" transform="rotate(80 109 73.5)" />
            <ellipse cx="99" cy="88.5" fill="#F0E4C0" rx="10.5" ry="9" transform="rotate(105 99 88.5)" />
            <ellipse cx="83" cy="99.5" fill="#EDE0BA" rx="11.2" ry="9.5" transform="rotate(128 83 99.5)" />
            <ellipse cx="65" cy="104" fill="#F2E6C5" rx="12.5" ry="9.8" />
            <ellipse cx="46.5" cy="99.5" fill="#F0E4C0" rx="11.2" ry="9.5" transform="rotate(-128 46.5 99.5)" />
            <ellipse cx="30" cy="88.5" fill="#EFE5C8" rx="10.5" ry="9" transform="rotate(-105 30 88.5)" />
            <ellipse cx="20" cy="73.5" fill="#EDE0BA" rx="9.8" ry="8.5" transform="rotate(-80 20 73.5)" />
          </g>
          <g fill="none" stroke="#1A1A1A" strokeLinecap="round" strokeWidth="1.25">
            <path d="M51 30 C53.5 24, 49.5 18, 52 12" />
            <path d="M65 29 C67.5 23, 62 17, 65.5 11" />
            <path d="M79 30 C81.5 24, 77.5 18, 80 12" />
          </g>
          <g fontFamily="Cormorant Garamond, serif" fontWeight="800" textAnchor="middle">
            <text fill="#1A1A1A" fontSize="9.5" letterSpacing="2" x="65" y="61">View</text>
            <text fill="#1A1A1A" fontSize="9.5" letterSpacing="2" x="65" y="73">More</text>
          </g>
        </svg>
      </Link>
    </div>
  );
}

function FeaturedCard({ item }: { item: any }) {
  const [slug, image, meta, title, excerpt] = item;
  return (
    <Link className="f-card" href={`/journal/articles/${slug}`}>
      <div className="thumb">
        <img src={img(image)} alt={title || ""} />
      </div>
      <div>
        <div className="meta">{meta}</div>
        <h3>{title}</h3>
        <p>{excerpt}</p>
      </div>
    </Link>
  );
}

function NewsCard({ item }: { item: any }) {
  const [slug, image, date, title] = item;
  return (
    <Link className="n-card" href={`/journal/articles/${slug}`}>
      <div className="thumb">
        <img src={img(image)} alt={title || ""} />
      </div>
      <div className="date">{date}</div>
      <h4>{title}</h4>
    </Link>
  );
}

function CategorySection({
  id,
  title,
  items,
  href,
}: {
  id: string;
  title: string;
  items: any[];
  href: string;
}) {
  return (
    <div id={id} className="category-block">
      <div className="cat-head">
        <h3 className="serif">{title}</h3>
      </div>
      <div className="news-grid">
        {items?.map((item: any) => (
          <NewsCard key={item[0]} item={item} />
        ))}
        <ViewMore href={href} />
      </div>
    </div>
  );
}

export default function JournalHome() {
  const [progress, setProgress] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    try {
      const data = typeof getArticles === "function" ? getArticles() : [];
      setArticles(data || []);
    } catch (e) {
      console.error(e);
    }

    // 初回訪問判定（同じタブを開いている間の再訪問ならアニメーションをスキップ）
    const hasVisited =
      typeof window !== "undefined" &&
      sessionStorage.getItem("innbuddy_journal_visited");

    if (hasVisited) {
      setIsLoaded(true);
      return;
    }

    // 初回のみエナジーリングを開始
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setIsBursting(true);

      // 1. リングが弾けた直後に「InnBuddy」大文字ロゴを表示
      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 300);

      // 2. ロゴをしっかり見せた後、ローダーをフェードアウト開始
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 1300);

      // 3. ローダーを完了してヒーロー画面へ接続 ＆ 訪問済みフラグを保存
      const completeTimer = setTimeout(() => {
        setIsLoaded(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("innbuddy_journal_visited", "true");
        }
      }, 1700);

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [progress]);

  return (
    <>
      {!isLoaded && (
        <div className={`loader-container ${isFading ? "fade-out" : ""}`}>
          {!showLogo ? (
            <div className={`ring-wrapper ${isBursting ? "burst" : ""}`}>
              <svg className="ring-svg" viewBox="0 0 150 150">
                <circle className="ring-circle-bg" cx="75" cy="75" r="65" />
                <circle
                  className="ring-circle"
                  cx="75"
                  cy="75"
                  r="65"
                  style={{
                    strokeDashoffset: Math.max(0, 408 - (408 * progress) / 100),
                  }}
                />
              </svg>
              <div className="progress-text">
                {progress >= 100 ? 100 : progress}
              </div>
            </div>
          ) : (
            <div className="splash-logo serif">
              InnBuddy
            </div>
          )}
        </div>
      )}

      <div id="lpView" style={{ display: isLoaded ? "block" : "none" }}>
        <header className="container">
          <div className="logo serif">
            InnBuddy <span className="logo-pill">WEB X BRANDING OPERATION</span>
          </div>
          <div className="home-head-right">
            <div aria-label="Language" className="lang home-lang">
              <button className="on" type="button">日本語</button>
              <button type="button">EN</button>
              <button type="button">中文</button>
            </div>
          </div>
        </header>

        <main className="container">
          <section style={{ marginTop: 18 }}>
            <div className="hero-grid">
              <div className="left-3">
                <Link className="wide" href="/journal/category/web">
                  <img src={img("ai_guest-data-river.jpg")} alt="WEB集客" />
                  <div className="overlay">
                    <div className="cat-label">CATEGORY 01 - WEB</div>
                    <div className="cat-title serif">
                      Booking / Agodaで<br />選ばれる宿になる
                    </div>
                    <div className="cat-sub">
                      {categoryCount(articles, "WEB集客")} ARTICLES
                    </div>
                  </div>
                  <div className="play" />
                </Link>

                <Link className="wide" href="/journal/category/operation">
                  <img src={img("ai_upselling-front.jpg")} alt="ホテル運営" />
                  <div className="overlay">
                    <div className="cat-label">CATEGORY 02 - ホテル運営</div>
                    <div className="cat-title serif">
                      Making<br />a profitable stay
                    </div>
                    <div className="cat-sub">
                      {categoryCount(articles, "ホテル運営")} ARTICLES
                    </div>
                  </div>
                  <div className="play" />
                </Link>

                <Link className="wide" href="/journal/category/branding">
                  <img src={img("ai_branding-infinity-pool.jpg")} alt="ブランディング" />
                  <div className="overlay">
                    <div className="cat-label">CATEGORY 03 - ブランディング</div>
                    <div className="cat-title serif">
                      世界観で選ばれる<br />ホテルへ
                    </div>
                    <div className="cat-sub">
                      {categoryCount(articles, "ブランディング")} ARTICLES
                    </div>
                  </div>
                  <div className="play" />
                </Link>
              </div>

              <div className="left-9">
                {heroTiles?.map((tile: any) => {
                  const [slug, image, date, title] = tile;
                  return (
                    <Link className="cell" key={slug} href={`/journal/articles/${slug}`}>
                      <img loading="lazy" src={img(image)} alt={title || ""} />
                      <span className="cell-overlay">
                        <span className="cell-date">{date}</span>
                        <span className="cell-title">{title}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="featured">
            <div className="section-label">FEATURED - 注目の9記事</div>
            {featuredSets?.map((set: any, i: number) => (
              <div key={set.label}>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    color: "#BAB454",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {set.label}
                </div>
                <div className="featured-grid">
                  {set.items?.map((item: any) => (
                    <FeaturedCard key={item[0]} item={item} />
                  ))}
                </div>
                {i < featuredSets.length - 1 && <div className="divider" />}
              </div>
            ))}
          </section>

          <section style={{ borderTop: "1px solid var(--line)", marginTop: 36, paddingTop: 26 }}>
            <div className="section-label">CATEGORY ARCHIVE カテゴリ別</div>
            <CategorySection
              id="cat-web"
              title="WEB"
              items={categoryCards?.web as any}
              href="/journal/category/web"
            />
            <CategorySection
              id="cat-operation"
              title="ホテル運営"
              items={categoryCards?.operation as any}
              href="/journal/category/operation"
            />
            <CategorySection
              id="cat-branding"
              title="ブランディング"
              items={categoryCards?.branding as any}
              href="/journal/category/branding"
            />
          </section>
        </main>
      </div>
    </>
  );
}