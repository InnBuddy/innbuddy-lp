"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getArticles } from "@/lib/journal/articles";
import { categoryCards, featuredSets, heroTiles } from "@/lib/journal/home-data";
import "./style.css";

const getVal = (obj: any, lang: 'ja' | 'en' | 'zh') => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.ja || "";
};

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

// 記事の全データと照合して翻訳を適用する仕組みに変更
function FeaturedCard({ item, lang, allArticles }: { item: any, lang: 'ja'|'en'|'zh', allArticles: any[] }) {
  const [slug, image, meta, title, excerpt] = item;
  const matched = allArticles.find(a => a.slug === slug);
  const displayTitle = matched ? getVal(matched.title, lang) : getVal(title, lang);
  const displayExcerpt = matched ? getVal(matched.meta?.excerpt || matched.excerpt, lang) : getVal(excerpt, lang);
  
  return (
    <Link className="f-card" href={`/journal/articles/${slug}?lang=${lang}`}>
      <div className="thumb">
        <img src={img(image)} alt={displayTitle} />
      </div>
      <div>
        <div className="meta">{meta}</div>
        <h3>{displayTitle}</h3>
        <p>{displayExcerpt}</p>
      </div>
    </Link>
  );
}

// 記事の全データと照合して翻訳を適用する仕組みに変更
function NewsCard({ item, lang, allArticles }: { item: any, lang: 'ja'|'en'|'zh', allArticles: any[] }) {
  const [slug, image, date, title] = item;
  const matched = allArticles.find(a => a.slug === slug);
  const displayTitle = matched ? getVal(matched.title, lang) : getVal(title, lang);
  
  return (
    <Link className="n-card" href={`/journal/articles/${slug}?lang=${lang}`}>
      <div className="thumb">
        <img src={img(image)} alt={displayTitle} />
      </div>
      <div className="date">{date}</div>
      <h4>{displayTitle}</h4>
    </Link>
  );
}

function CategorySection({ id, title, items, href, lang, allArticles }: { id: string; title: string; items: any[]; href: string; lang: 'ja'|'en'|'zh'; allArticles: any[] }) {
  return (
    <div id={id} className="category-block">
      <div className="cat-head">
        <h3 className="serif">{title}</h3>
      </div>
      <div className="news-grid">
        {items?.map((item: any) => (
          <NewsCard key={item[0]} item={item} lang={lang} allArticles={allArticles} />
        ))}
        <ViewMore href={`${href}?lang=${lang}`} />
      </div>
    </div>
  );
}

export default function JournalHome() {
  const [phase, setPhase] = useState<"ring" | "logo" | "done">("done");
  const [progress, setProgress] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [lang, setLang] = useState<'ja' | 'en' | 'zh'>('ja');

  useEffect(() => {
    let current = new URLSearchParams(window.location.search).get('lang');
    if (!current) {
      current = localStorage.getItem('journal_lang') || 'ja';
    } else {
      localStorage.setItem('journal_lang', current);
    }
    setLang(current as 'ja' | 'en' | 'zh');

    // リングアニメーション制御（同じタブでは1回のみ）
    const hasShown = sessionStorage.getItem('journal_has_shown_opening');
    if (hasShown) {
      setPhase("done");
    } else {
      setPhase("ring");
      let currProg = 0;
      const interval = setInterval(() => {
        currProg += 2;
        if (currProg >= 100) {
          currProg = 100;
          setProgress(100);
          clearInterval(interval);
          setIsBursting(true);
          setTimeout(() => {
            setPhase("logo");
            setTimeout(() => {
              setPhase("done");
              sessionStorage.setItem('journal_has_shown_opening', 'true');
            }, 1200);
          }, 350);
        } else {
          setProgress(currProg);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, []);

  const changeLang = (newLang: 'ja' | 'en' | 'zh') => {
    localStorage.setItem('journal_lang', newLang);
    window.location.href = `?lang=${newLang}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = typeof getArticles === "function" ? await Promise.resolve(getArticles()) : [];
        setArticles(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {phase !== "done" && (
        <div className="loader-container">
          {phase === "ring" && (
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
              <div className="progress-text">{progress}</div>
            </div>
          )}
          {phase === "logo" && (
            <div className="splash-logo serif">
              InnBuddy
            </div>
          )}
        </div>
      )}

      <div id="ipView" style={{ display: phase === "done" ? "block" : "none" }}>
        <header className="container">
          <div className="logo serif">
            InnBuddy <span className="logo-pill">WEB × BRANDING × OPERATION</span>
          </div>
          <div className="home-head-right">
            <div aria-label="Language" className="lang home-lang">
              <button type="button" className={lang === 'ja' ? 'on' : ''} onClick={() => changeLang('ja')}>日本語</button>
              <button type="button" className={lang === 'en' ? 'on' : ''} onClick={() => changeLang('en')}>EN</button>
              <button type="button" className={lang === 'zh' ? 'on' : ''} onClick={() => changeLang('zh')}>中文</button>
            </div>
          </div>
        </header>
        
        <main className="container">
          <section style={{ marginTop: 18 }}>
            <div className="hero-grid">
              <div className="left-3">
                <Link className="wide" href={`/journal/category/web?lang=${lang}`}>
                  <img src={img("ai_guest-data-river.jpg")} alt="WEB集客" />
                  <div className="overlay">
                    <div className="cat-label">CATEGORY 01</div>
                    <div className="cat-title serif">
                      {lang === 'ja' && <>Booking / Agodaで<br />選ばれる宿になる</>}
                      {lang === 'en' && <>Becoming the preferred choice<br />on Booking / Agoda</>}
                      {lang === 'zh' && <>成为 Booking / Agoda 上的<br />首选住宿</>}
                    </div>
                    <div className="cat-sub">
                      WEB | {categoryCount(articles, "WEB集客")} ARTICLES
                    </div>
                  </div>
                  <div className="play" />
                </Link>
                <Link className="wide" href={`/journal/category/operation?lang=${lang}`}>
                  <img src={img("ai_upselling-front.jpg")} alt="ホテル運営" />
                  <div className="overlay">
                    <div className="cat-label">CATEGORY 02 - {lang === 'en' ? 'Hotel Operations' : lang === 'zh' ? '酒店运营' : 'ホテル運営'}</div>
                    <div className="cat-title serif">
                      {lang === 'ja' && <>Making<br />a profitable stay</>}
                      {lang === 'en' && <>Making<br />a profitable stay</>}
                      {lang === 'zh' && <>打造<br />高收益住宿</>}
                    </div>
                    <div className="cat-sub">
                      {categoryCount(articles, "ホテル運営")} ARTICLES
                    </div>
                  </div>
                  <div className="play" />
                </Link>
                <Link className="wide" href={`/journal/category/branding?lang=${lang}`}>
                  <img src={img("ai_branding-infinity-pool.jpg")} alt="ブランディング" />
                  <div className="overlay">
                    <div className="cat-label">CATEGORY 03 - {lang === 'en' ? 'Branding' : lang === 'zh' ? '品牌塑造' : 'ブランディング'}</div>
                    <div className="cat-title serif">
                      {lang === 'ja' && <>世界観で選ばれる<br />ホテルへ</>}
                      {lang === 'en' && <>Chosen for its<br />unique worldview</>}
                      {lang === 'zh' && <>以独特世界观<br />脱颖而出</>}
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
                  const matched = articles.find(a => a.slug === slug);
                  const displayTitle = matched ? getVal(matched.title, lang) : getVal(title, lang);
                  return (
                    <Link className="cell" key={slug} href={`/journal/articles/${slug}?lang=${lang}`}>
                      <img loading="lazy" src={img(image)} alt={displayTitle} />
                      <span className="cell-overlay">
                        <span className="cell-date">{date}</span>
                        <span className="cell-title">{displayTitle}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
          
          <section className="featured">
            <div className="section-label">FEATURED - {lang === 'en' ? '9 Featured Articles' : lang === 'zh' ? '9篇精选文章' : '注目の9記事'}</div>
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
                    <FeaturedCard key={item[0]} item={item} lang={lang} allArticles={articles} />
                  ))}
                </div>
                {i < featuredSets.length - 1 && <div className="divider" />}
              </div>
            ))}
          </section>
          
          <section style={{ borderTop: "1px solid var(--line)", marginTop: 36, paddingTop: 26 }}>
            <div className="section-label">CATEGORY ARCHIVE - {lang === 'en' ? 'By Category' : lang === 'zh' ? '分类存档' : 'カテゴリ別'}</div>
            <CategorySection
              id="cat-web"
              title={lang === 'en' ? 'WEB Acquisition' : lang === 'zh' ? '网络获客' : 'WEB'}
              items={categoryCards?.web as any}
              href="/journal/category/web"
              lang={lang}
              allArticles={articles}
            />
            <CategorySection
              id="cat-operation"
              title={lang === 'en' ? 'Hotel Operations' : lang === 'zh' ? '酒店运营' : 'ホテル運営'}
              items={categoryCards?.operation as any}
              href="/journal/category/operation"
              lang={lang}
              allArticles={articles}
            />
            <CategorySection
              id="cat-branding"
              title={lang === 'en' ? 'Branding' : lang === 'zh' ? '品牌塑造' : 'ブランディング'}
              items={categoryCards?.branding as any}
              href="/journal/category/branding"
              lang={lang}
              allArticles={articles}
            />
          </section>
        </main>
      </div>
    </>
  );
}