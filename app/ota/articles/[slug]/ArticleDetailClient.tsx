'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { otaArticles, officialReferences, ArticleBlock } from '../../articlesData'
import '../../ota.css'
import '../../ota-mobile-fixes.css'

function RenderBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>

    case 'h3':
      return <h3 className="ib-article-h3">{block.text}</h3>

    case 'ul':
      return (
        <ul className="ib-article-list">
          {block.items.map((item, i) => (
            <li key={i}>
              {item.bold && <strong>{item.bold}：</strong>}
              {item.text}
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="ib-article-list ib-article-list-ol">
          {block.items.map((item, i) => (
            <li key={i}>
              {item.bold && <strong>{item.bold}：</strong>}
              {item.text}
            </li>
          ))}
        </ol>
      )

    case 'box':
      return (
        <div className={`ib-callout ${block.variant === 'criteria' ? 'ib-callout-criteria' : 'ib-callout-steps'}`}>
          <h4>{block.title}</h4>
          {block.text && <p>{block.text}</p>}
          {block.items &&
            (block.ordered ? (
              <ol>
                {block.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ol>
            ) : (
              <ul>
                {block.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            ))}
        </div>
      )

    case 'table':
      return (
        <div className="ib-table-container">
          <div className="ib-table-scroll">
            <table className="ib-table">
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={cIdx === 0 ? 'ib-td-lead' : ''}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="ib-fig-caption">{block.caption}</p>}
        </div>
      )

    case 'hub':
      return (
        <div className="ib-diagram-card">
          <div className="ib-hub-center">{block.center}</div>
          <div className="ib-hub-spokes">
            {block.spokes.map((s, i) => (
              <span key={i} className="ib-hub-pill">
                {s}
              </span>
            ))}
          </div>
          <p className="ib-fig-caption">{block.caption}</p>
        </div>
      )

    case 'matrix':
      return (
        <div className="ib-diagram-card">
          <div className="ib-diagram-title">{block.title}</div>
          <div className="ib-matrix-axis">
            <span>{block.xAxisLeft}</span>
            <span>{block.xAxisRight}</span>
          </div>
          <div className="ib-matrix-grid">
            {block.cells.map((cell, idx) => (
              <div key={idx} className={`ib-matrix-cell ib-tone-${cell.tone}`}>
                <div className="ib-matrix-badge">{cell.badge}</div>
                <ul>
                  {cell.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {block.caption && <p className="ib-fig-caption">{block.caption}</p>}
        </div>
      )

    case 'pyramid':
      return (
        <div className="ib-diagram-card">
          <div className="ib-diagram-title">{block.title}</div>
          <div className="ib-pyramid-wrap">
            {block.layers.map((layer, idx) => {
              const widthPct = Math.min(100, 48 + idx * 17)
              return (
                <div
                  key={idx}
                  className={`ib-pyramid-layer ib-pyramid-lv-${idx + 1}`}
                  style={{ width: `${widthPct}%` }}
                >
                  <strong>{layer.label}</strong>
                  {layer.sub && <span>{layer.sub}</span>}
                </div>
              )
            })}
          </div>
          {block.caption && <p className="ib-fig-caption">{block.caption}</p>}
        </div>
      )

    case 'flow':
      return (
        <div className="ib-diagram-card">
          <div className="ib-diagram-title">{block.title}</div>
          <div className={block.direction === 'horizontal' ? 'ib-flow-horizontal' : 'ib-flow-vertical'}>
            {block.steps.map((st, idx) => (
              <React.Fragment key={idx}>
                <div className="ib-flow-step">
                  <span className="ib-flow-badge">{st.step}</span>
                  <strong>{st.title}</strong>
                  <p>{st.desc}</p>
                </div>
                {idx < block.steps.length - 1 && (
                  <div className="ib-flow-arrow" aria-hidden="true">
                    {block.direction === 'horizontal' ? '→' : '↓'}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {block.caption && <p className="ib-fig-caption">{block.caption}</p>}
        </div>
      )

    case 'revenueBars':
      return (
        <div className="ib-diagram-card">
          <div className="ib-diagram-title">{block.title}</div>
          <div className="ib-rev-bars">
            <div className="ib-rev-col">
              <div className="ib-rev-head">OTA経由（高負担例）</div>
              <div className="ib-rev-stack">
                <div className="ib-rev-seg ib-seg-cost" style={{ height: '20%' }}>
                  変動費 20%
                </div>
                <div className="ib-rev-seg ib-seg-fee" style={{ height: '15%' }}>
                  手数料等 15%
                </div>
                <div className="ib-rev-seg ib-seg-profit" style={{ height: '65%' }}>
                  施設粗利 65%
                </div>
              </div>
            </div>
            <div className="ib-rev-col">
              <div className="ib-rev-head ib-rev-head-direct">自社サイト直販</div>
              <div className="ib-rev-stack">
                <div className="ib-rev-seg ib-seg-cost" style={{ height: '20%' }}>
                  変動費 20%
                </div>
                <div className="ib-rev-seg ib-seg-sys" style={{ height: '5%' }}>
                  決済・システム 5%
                </div>
                <div className="ib-rev-seg ib-seg-profit-direct" style={{ height: '75%' }}>
                  施設粗利 75%
                </div>
              </div>
            </div>
          </div>
          <p className="ib-fig-caption">{block.caption}</p>
        </div>
      )

    default:
      return null
  }
}

export default function ArticleDetailClient() {
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const currentIndex = otaArticles.findIndex((item) => item.slug === slug)
  const article = currentIndex >= 0 ? otaArticles[currentIndex] : otaArticles[0]
  const activeIdx = currentIndex >= 0 ? currentIndex : 0

  const prevArticle = activeIdx > 0 ? otaArticles[activeIdx - 1] : null
  const nextArticle = activeIdx < otaArticles.length - 1 ? otaArticles[activeIdx + 1] : null
  const otherArticles = otaArticles.filter((item) => item.slug !== article.slug).slice(0, 4)

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('innbuddy_ota_checks_v1')
      if (saved) setCheckedMap(JSON.parse(saved))
    } catch {
      // ignore storage error
    }
  }, [])

  const toggleCheck = (key: string) => {
    setCheckedMap((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      try {
        localStorage.setItem('innbuddy_ota_checks_v1', JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

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
              <span>公開日: {article.publishedAt}</span>
              <span>·</span>
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

            {/* 記事内目次 */}
            <nav className="ib-toc-box" aria-label="この記事の目次">
              <div className="ib-toc-title">この記事の内容（全{article.sections.length}章）</div>
              <ol className="ib-toc-list">
                {article.sections.map((sec, idx) => (
                  <li key={sec.heading}>
                    <a href={`#sec-${idx + 1}`}>{sec.heading}</a>
                  </li>
                ))}
                {article.checklists && (
                  <li>
                    <a href="#sec-checklist">実務セルフチェックリスト＆最初の1週間アクションプラン</a>
                  </li>
                )}
              </ol>
            </nav>

            {/* 各セクション本文＆リッチ図表ブロック */}
            {article.sections.map((sec, sIdx) => (
              <section key={sec.heading} id={`sec-${sIdx + 1}`} className="article-body-section ib-section-anchor">
                <h2>{sec.heading}</h2>
                {sec.blocks && sec.blocks.length > 0
                  ? sec.blocks.map((block, bIdx) => <RenderBlock key={bIdx} block={block} />)
                  : sec.body.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
              </section>
            ))}

            {/* インタラクティブ・セルフチェックリスト */}
            {article.checklists && article.checklists.length > 0 && (
              <section id="sec-checklist" className="article-body-section ib-section-anchor">
                <h2>実務セルフチェックリスト</h2>
                <p className="ib-check-note">
                  クリックして自施設の運用状況をチェックできます（チェック状態はブラウザに自動保存されます）。
                </p>
                {article.checklists.map((group, gIdx) => (
                  <div key={group.groupTitle} className="ib-checklist-card">
                    <h3 className="ib-checklist-title">{group.groupTitle}</h3>
                    <ul className="ib-checklist-ul">
                      {group.items.map((item, iIdx) => {
                        const key = `${article.slug}-${gIdx}-${iIdx}`
                        const checked = !!checkedMap[key]
                        return (
                          <li key={key}>
                            <label className={`ib-check-label ${checked ? 'is-checked' : ''}`}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleCheck(key)}
                              />
                              <span>{item}</span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* 最初の1週間のアクションプラン */}
            {article.actionPlan && article.actionPlan.length > 0 && (
              <div className="ib-action-plan">
                <h3>明日から始める「最初の1週間」アクションプラン</h3>
                <div className="ib-action-rows">
                  {article.actionPlan.map((plan) => (
                    <div key={plan.day} className="ib-action-row">
                      <span className="ib-action-day">{plan.day}</span>
                      <span className="ib-action-task">{plan.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 関連する記事への内部リンク */}
            {article.relatedSlugs && article.relatedSlugs.length > 0 && (
              <div className="ib-related-box">
                <div className="ib-related-heading">あわせて読みたい関連テーマ</div>
                <ul>
                  {article.relatedSlugs.map((rel) => (
                    <li key={rel.slug}>
                      <Link href={`/ota/articles/${rel.slug}`}>→ {rel.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 前後の記事ナビゲーション */}
            <div className="ib-prev-next-grid">
              {prevArticle ? (
                <Link href={`/ota/articles/${prevArticle.slug}`} className="ib-prev-next-card">
                  <span className="ib-pn-label">← 前の記事（ARTICLE {prevArticle.number}）</span>
                  <strong className="ib-pn-title">{prevArticle.title}</strong>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <Link href={`/ota/articles/${nextArticle.slug}`} className="ib-prev-next-card ib-pn-right">
                  <span className="ib-pn-label">次の記事（ARTICLE {nextArticle.number}） →</span>
                  <strong className="ib-pn-title">{nextArticle.title}</strong>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* 一次情報・出典・免責事項 */}
            <div className="ib-references-box">
              <div className="ib-references-title">参考文献・一次情報源（シリーズ共通）</div>
              <ul>
                {officialReferences.map((ref) => (
                  <li key={ref.name}>
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer">
                        {ref.name}
                      </a>
                    ) : (
                      <span>{ref.name}</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="ib-disclaimer">
                ※OTA各社の手数料率・掲載順位アルゴリズム・プログラム条件等は契約内容や時期により変更される場合があります。最新情報は各OTAの公式パートナー画面をご確認ください。記事内の「【仮想ケース】【試算例】」は施策理解のためのシミュレーションであり、特定施設での成果を保証するものではありません。
              </p>
            </div>

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
              全12記事の一覧を見る
            </Link>
          </div>

          <div className="articles-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {otherArticles.map((other) => (
              <Link href={`/ota/articles/${other.slug}`} key={other.slug} className="article-card">
                <div className="article-card-thumb">
                  <img src={other.image} alt={other.title} />
                  <span className="article-card-badge">{other.category}</span>
                </div>
                <div className="article-card-body">
                  <div className="article-card-meta">
                    <span>{other.publishedAt}</span>
                    <span>·</span>
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