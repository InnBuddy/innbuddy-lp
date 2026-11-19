'use client'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { otaArticles } from '../../articlesData'
import '../../ota.css'
import '../../ota-mobile-fixes.css'

export default function OtaArticleDetailPage() {
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const article = otaArticles.find((item) => item.slug === slug) || otaArticles[0]
  const otherArticles = otaArticles.filter((item) => item.slug !== article.slug)

  return (
    <main className="ota-page-root">
      {/* HEADER */}
      <header className="site-header">
        <Link href="/ota" className="logo">
          InnBuddy<small>OTA</small>
        </Link>
        <nav>
          <Link href="/ota/articles">記事一覧</Link>
          <Link href="/ota">OTA運用代行トップへ</Link>
          <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer">
            無料相談
          </a>
        </nav>
      </header>

      {/* ARTICLE HEADER */}
      <article>
        <header className="article-detail-header">
          <div className="article-detail-wrap">
            <nav className="breadcrumb-nav" aria-label="パンくずリスト">
              <Link href="/ota">OTA運用代行トップ</Link>
              <span>/</span>
              <Link href="/ota/articles">記事一覧</Link>
              <span>/</span>
              <span>ARTICLE {article.number}</span>
            </nav>

            <span className="services-kicker">{article.category}</span>
            <h1 className="article-detail-title">{article.title}</h1>

            <div className="article-card-meta">
              <span>公開日：{article.publishedAt}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <figure className="article-detail-cover">
              <img src={article.image} alt={article.title} />
            </figure>
          </div>
        </header>

        {/* ARTICLE BODY */}
        <div className="article-detail-body">
          <div className="article-detail-wrap">
            <p className="article-lead-box">{article.lead}</p>

            {article.sections.map((sec) => (
              <section key={sec.heading} className="article-body-section">
                <h2>{sec.heading}</h2>
                {sec.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </section>
            ))}

            {/* 記事一覧へ戻る導線 & トップページ導線 */}
            <div className="article-nav-footer">
              <Link href="/ota/articles" className="btn-back-list">
                ← 記事一覧ページへ戻る
              </Link>
              <Link href="/ota" className="btn-back-ota">
                OTA運用代行サービス詳細を見る →
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* OTHER ARTICLES */}
      <section className="dark section">
        <div className="wrap">
          <div className="articles-heading-row">
            <div>
              <p className="section-kicker">MORE ARTICLES</p>
              <h2 style={{ fontSize: '28px', marginBottom: 0 }}>その他のOTA運用コラム</h2>
            </div>
            <Link href="/ota/articles" className="articles-all-link">
              すべての記事一覧を見る →
            </Link>
          </div>

          <div className="articles-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {otherArticles.map((other) => (
              <Link
                href={`/ota/articles/${other.slug}`}
                key={other.slug}
                className="article-card"
              >
                <div className="article-card-thumb">
                  <img src={other.image} alt={other.title} />
                  <span className="article-card-badge">{other.category}</span>
                </div>
                <div className="article-card-body">
                  <div className="article-card-meta">
                    <span>{other.publishedAt}</span>
                    <span>•</span>
                    <span>{other.readTime}</span>
                  </div>
                  <h3 className="article-card-title">{other.title}</h3>
                  <span className="article-card-readmore">この記事を読む →</span>
                </div>
              </Link>
            ))}
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
              <Link href="/ota/articles">記事一覧</Link>
              <Link href="/ota">OTA運用代行トップ</Link>
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