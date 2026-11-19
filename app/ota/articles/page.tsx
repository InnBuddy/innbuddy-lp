'use client'
import React from 'react'
import Link from 'next/link'
import { otaArticles } from '../articlesData'
import '../ota.css'
import '../ota-mobile-fixes.css'

export default function OtaArticlesListPage() {
  return (
    <main className="ota-page-root">
      {/* HEADER */}
      <header className="site-header">
        <Link href="/ota" className="logo">
          InnBuddy<small>OTA</small>
        </Link>
        <nav>
          <Link href="/ota#services">対応業務</Link>
          <Link href="/ota">OTA運用代行トップへ</Link>
          <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer">
            無料相談
          </a>
        </nav>
      </header>

      {/* PAGE HEADER */}
      <section className="article-subpage-hero">
        <div className="wrap">
          <nav className="breadcrumb-nav" aria-label="パンくずリスト">
            <Link href="/ota">OTA運用代行トップ</Link>
            <span>/</span>
            <span>OTAコラム・記事一覧</span>
          </nav>
          <p className="services-kicker">OTA KNOWLEDGE / ARTICLES</p>
          <h1>OTA運用コラム・記事一覧</h1>
          <p className="intro" style={{ marginBottom: 0 }}>
            宿泊施設の予約率向上や業務効率化につながる、実践的なOTA運用ノウハウをまとめています。
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="light section">
        <div className="wrap">
          <div className="articles-cards-grid">
            {otaArticles.map((article) => (
              <Link
                href={`/ota/articles/${article.slug}`}
                key={article.slug}
                className="article-card"
              >
                <div className="article-card-thumb">
                  <img src={article.image} alt={article.title} />
                  <span className="article-card-badge">{article.category}</span>
                </div>
                <div className="article-card-body">
                  <div className="article-card-meta">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2
                    className="article-card-title"
                    style={{ fontSize: '17px', marginBottom: '12px' }}
                  >
                    {article.title}
                  </h2>
                  <p className="article-card-excerpt">{article.excerpt}</p>
                  <span className="article-card-readmore">記事を読む →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="articles-bottom-cta" style={{ marginTop: '48px' }}>
            <Link href="/ota" className="btn-back-list">
              ← OTA運用代行トップページへ戻る
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ota-footer-new">
        <div className="ota-footer-wrap">
          <div className="ota-footer-brand-row">
            <div className="ota-footer-logo">InnBuddy</div>
            <span className="ota-footer-tag">ABOUT INNBUDDY</span>
          </div>
          <p className="ota-footer-desc">
            InnBuddyは、ホテル・旅館のオンライン販売を支援するサービスです。<br />
            OTA運用を中心に、施設ごとの課題や販売状況を理解しながら、必要なサポートを行っています。
          </p>
          <div className="ota-footer-links-row">
            <div className="ota-footer-links-group">
              <Link href="/ota">OTA運用代行トップ</Link>
              <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer">
                InnBuddyブランドサイトへ
              </a>
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer">
                お問い合わせ
              </a>
            </div>
            <span className="ota-footer-copy">InnBuddy All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}