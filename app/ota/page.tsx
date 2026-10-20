'use client'

import { useState } from 'react'
import './ota.css'

const services = [
  ['アカウント・掲載情報', 'OTAアカウント管理|施設情報更新|客室情報更新|設備・アメニティ更新|アクセス情報更新|チェックイン・アウト情報|キャンセルポリシー|注意事項|OTAからの通知確認|OTA仕様変更への対応'],
  ['宿泊プラン', '新規プラン作成|プラン内容変更|プラン名改善|プラン説明文改善|食事条件変更|特典設定|早割・直前割プラン|連泊プラン|季節・ターゲット別|販売期間設定'],
  ['料金設定', '基本料金設定|曜日別料金|繁忙期・閑散期対応|季節・連休料金|客室タイプ別料金|プラン別料金|早割・直前料金|料金変更・調整'],
  ['客室・在庫管理', '客室在庫管理|OTA別在庫確認|販売開始・停止|客室タイプ別在庫|日付別在庫|最低/最大宿泊日数|連泊制限|販売可能期間|キャンセル時の在庫確認'],
  ['キャンペーン・特集', 'OTAキャンペーン確認|セール情報確認|特集掲載確認|クーポン・ポイント施策|季節特集|インバウンド向け施策|キャンペーン参加設定|効果確認'],
  ['写真・コンテンツ', '写真更新|客室・食事・館内写真|周辺情報|写真掲載順|施設・客室紹介文|OTA別仕様対応'],
  ['口コミ・レビュー', '新着レビュー確認|口コミ返信|低評価レビュー確認|評価内容の整理|頻出コメント確認|口コミ傾向の把握|OTA別状況確認'],
  ['海外OTA', 'Booking.com / Agoda|Expedia / Trip.com 等|英語等の掲載情報|海外向けプラン|海外ユーザー向け情報|海外キャンペーン|国・地域別の販売状況'],
  ['販売状況分析', 'OTA別売上・予約数|ADR・稼働率|キャンセル率|リードタイム・滞在日数|客室・プラン別販売|OTA別比較|前月・前年との比較'],
  ['改善', 'プラン・料金調整|在庫調整|掲載内容・写真改善|キャンペーン見直し|OTA別運用改善|状況に応じた施策提案'],
  ['報告・ミーティング', '運用状況・販売実績共有|課題整理|改善施策共有|今後の対応方針|定期ミーティング'],
]

const painPoints = [
  'OTAの更新や在庫管理に時間を取られている',
  '宿泊プランを作りたいが、手が回らない',
  '料金をどう設定・変更すればいいかわからない',
  '複数OTAを管理するのが大変（海外OTAまで運用する余裕がない）',
  'OTAを運用しているが、何を改善すればいいかわからない',
  '担当者が退職してOTA運用を任せられる人がいない',
]

const otas = ['楽天トラベル', 'じゃらんnet', '一休.com', 'Yahoo!トラベル / るるぶ 等']
const overseas = ['Booking.com', 'Agoda', 'Expedia', 'Trip.com / その他']

const faqs = [
  ['まだ契約するか決めていませんが、相談だけでもいいですか？', 'もちろんです。「自社の運用に問題があるか見てほしい」「どこまで任せられるのか知りたい」というご相談からでも構いません。'],
  ['1つのOTAだけでも依頼できますか？', 'はい、可能です。海外OTAのみ、特定の国内OTAのみなど、施設様の状況に合わせて柔軟に対応いたします。'],
  ['まだ登録していないOTAの新規開設からお願いできますか？', 'はい、新規アカウントの登録申請から、初期のページ作成・プラン設定までサポートいたします。'],
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">＞</span>
}

export default function Page() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleItem = (i: number) => {
    setOpenItems(prev =>
      prev.includes(i) ? prev.filter(item => item !== i) : [...prev, i]
    )
  }

  const leftServices = services.filter((_, i) => i % 2 === 0)
  const rightServices = services.filter((_, i) => i % 2 !== 0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const GAS_URL = '★ここにGASのURLを貼り付けてください★'

      if (GAS_URL.startsWith('http')) {
        await fetch(GAS_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        })
      }
      setSubmitted(true)
    } catch (error) {
      console.error('送信エラー', error)
      alert('送信時にエラーが発生しました。時間をおいて再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="ota-page-root">
      {/* HEADER */}
      <header className="site-header">
        <a href="#top" className="logo">
          InnBuddy<span>.</span><small>OTA</small>
        </a>
        <nav>
          <a href="#services">対応業務</a>
          <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer">
            InnBuddyについて
          </a>
          <a className="header-cta" href="#contact">
            相談する <Arrow />
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <p className="eyebrow hero-script">ホテル・旅館のOTA運用代行</p>
          <h1>
            ホテル・旅館のOTA運用を、<br />
            <em>まるごと任せる。</em>
          </h1>
          <p className="hero-copy hero-script">
            宿泊プラン、料金、在庫、掲載情報、キャンペーン、口コミ、海外OTAまで。<br />
            日々のOTA業務を、InnBuddyがまとめてサポートします。
          </p>
          <a href="#contact" className="button">
            OTA運用について相談する <Arrow />
          </a>
        </div>
        <div className="hero-index">
          SCROLL<br />
          <span>↓</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="dark section problem">
        <div className="wrap">
          <h2>
            こんなお悩みは<br />
            <span>ありませんか？</span>
          </h2>
          <div className="problem-list">
            {painPoints.map((p, i) => (
              <div className="problem-row" key={p}>
                <span>0{i + 1}</span>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE OF WORK */}
      <section id="services" className="light section services">
        <div className="wrap">
          <h2>
            InnBuddy OTAが<br />
            <span>対応する11の業務</span>
          </h2>
          {/* 黒文字に変更されたリード文 */}
          <p className="intro services-intro">
            施設ごとに異なる客室構成・ターゲットを踏まえ、日々の細かな実務を引き受けます。<br />
            各項目をクリックして、私たちの対応範囲をご確認ください。
          </p>

          <div className="service-grid">
            <div className="service-column">
              {leftServices.map(([title, items], idx) => {
                const originalIndex = idx * 2
                const isOpen = openItems.includes(originalIndex)
                return (
                  <div className={`service ${isOpen ? 'is-open' : ''}`} key={title}>
                    <button onClick={() => toggleItem(originalIndex)} aria-expanded={isOpen}>
                      <span className="service-num">{String(originalIndex + 1).padStart(2, '0')}</span>
                      <span>{title}</span>
                      <span className="plus">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="service-content">
                        <ul>
                          {items.split('|').map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="service-column">
              {rightServices.map(([title, items], idx) => {
                const originalIndex = idx * 2 + 1
                const isOpen = openItems.includes(originalIndex)
                return (
                  <div className={`service ${isOpen ? 'is-open' : ''}`} key={title}>
                    <button onClick={() => toggleItem(originalIndex)} aria-expanded={isOpen}>
                      <span className="service-num">{String(originalIndex + 1).padStart(2, '0')}</span>
                      <span>{title}</span>
                      <span className="plus">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="service-content">
                        <ul>
                          {items.split('|').map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DISTRIBUTION (高さ統一 & 文字範囲のみのぼかし適用) */}
      <section className="dark section ota">
        <div className="wrap">
          <h2>
            対応可能な<span>OTA</span>
          </h2>
          <p className="intro">
            複数の国内・海外OTAに対応。<br />
            現在ご利用中のOTAが対応可能か分からない場合も、お気軽にご相談ください。
          </p>
          <div className="ota-columns">
            <div>
              <h3 className="orange-heading">
                DOMESTIC OTA <small>国内OTA</small>
              </h3>
              {otas.map((x, i) => (
                <div className="ota-item" key={x}>
                  <span>0{i + 1}</span>
                  <span className="ota-item-text">{x}</span>
                  {i === 0 && <b>特に注力</b>}
                </div>
              ))}
            </div>
            <div>
              <h3 className="orange-heading">
                OVERSEAS OTA <small>海外OTA（インバウンド）</small>
              </h3>
              {overseas.map((x, i) => (
                <div className="ota-item" key={x}>
                  <span>0{i + 1}</span>
                  <span className="ota-item-text">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="dark framework section">
        <div className="wrap">
          <h2>
            InnBuddyが<br />
            <span>大切にしていること</span>
          </h2>
          <p className="intro">
            OTAは、一度設定して終わりではありません。<br />
            決まった作業を繰り返すだけの代行ではなく、季節、キャンペーン、OTA側の仕様変更などを確認しながら、必要な運用を見直していきます。
          </p>
          <div className="flow">
            <div>運用</div>
            <i>→</i>
            <div>分析</div>
            <i>→</i>
            <div className="active">改善</div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="light section workflow">
        <div className="wrap">
          <h2>ご利用開始まで</h2>
          <div className="timeline">
            {[
              ['まずはご相談', '「どこまで任せられるのか知りたい」「複数OTAの管理を整理したい」といった段階でも構いません。'],
              ['現状確認', '施設ごとに異なる販売状況・客室構成を踏まえ、現在のOTA運用状況を無料で確認いたします。'],
              ['ご提案・ご契約', 'お任せいただく業務範囲を確認したうえで、最適なプラン・契約条件（初期無料期間など）をご提案します。'],
              ['運用開始', '面倒なOTA実務をInnBuddyに引き継ぎ、本来の業務に集中できる環境がスタートします。'],
            ].map(([t, d], i) => (
              <div className="timeline-item" key={t}>
                <b>0{i + 1}</b>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="dark section pricing">
        <div className="wrap">
          <h2>料金・契約条件</h2>
          <p>
            各施設様の規模や現状の課題に応じて、<strong>月額固定</strong> もしくは <strong>成果報酬</strong> にて最適なプランをご提案します。
          </p>
          <div className="offer">
            <span className="label">LIMITED OFFER</span>
            <p>
              現在、限定３社様に<br />
              <strong>「初月無料＆1ヶ月契約」</strong>から<br />
              使用できる特別プランもご提案しております。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="light section faq">
        <div className="wrap narrow">
          <h2>よくあるご質問</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                <span>Q.</span>
                {q}
              </summary>
              <p>
                <b>A.</b>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="dark section contact">
        <div className="wrap contact-grid">
          <div>
            <h2>
              「今のOTA運用、<br />
              どこまで任せられる？」<br />
              <span>からでも構いません。</span>
            </h2>
            <p>
              現在の運用状況をお聞きし、InnBuddyで対応できる業務範囲をご説明します。<br />
              まずは以下のフォームより、お気軽にご相談ください。
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {submitted ? (
              <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 'bold', padding: '20px 0' }}>
                ご相談を受け付けました。ご入力ありがとうございます。<br />
                担当者よりメール（innbuddy.esg@gmail.com）にてご連絡いたします。
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label>
                    施設名・会社名 *
                    <input required type="text" name="facilityName" />
                  </label>
                  <label>
                    ご担当者名 *
                    <input required type="text" name="representativeName" />
                  </label>
                </div>
                <label>
                  メールアドレス *
                  <input required type="email" name="email" />
                </label>
                <fieldset>
                  <legend>現在利用しているOTA（複数選択可）</legend>
                  {[...otas.slice(0, 3), ...overseas, 'その他'].map((x) => (
                    <label className="check" key={x}>
                      <input type="checkbox" name="otaOptions" value={x} /> {x}
                    </label>
                  ))}
                </fieldset>
                <fieldset>
                  <legend>現在のお悩み（複数選択可）</legend>
                  {[
                    'OTA管理に時間がかかる',
                    'プラン・料金設定がわからない',
                    '在庫管理・調整が大変',
                    '海外OTAまで手が回らない',
                    '口コミ対応ができていない',
                    '売上・販売状況の分析ができない',
                    'その他',
                  ].map((x) => (
                    <label className="check" key={x}>
                      <input type="checkbox" name="issueOptions" value={x} /> {x}
                    </label>
                  ))}
                </fieldset>
                <label>
                  ご相談内容（任意）
                  <textarea name="content" placeholder="担当者が退職して困っている、などお気軽にご記入ください。" />
                </label>
                <button className="button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '送信中...' : 'OTA運用について相談する'} <Arrow />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="ota-footer-new">
        <div className="wrap ota-footer-wrap">
          <div className="ota-footer-brand-row">
            <div className="ota-footer-logo">
              InnBuddy<span>.</span>
            </div>
            <span className="ota-footer-tag">ABOUT INNBUDDY</span>
          </div>

          <p className="ota-footer-desc">
            InnBuddyは、ホテル・旅館のオンライン販売を支援するサービスです。<br />
            OTA運用を中心に、施設ごとの課題や販売状況を理解しながら、必要なサポートを行っています。
          </p>

          <div className="ota-footer-links-row">
            <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer">
              InnBuddyブランドサイトへ ↗
            </a>
            <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer">
              私たちについて ↗
            </a>
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer">
              お問い合わせ ↗
            </a>
          </div>

          <div className="ota-footer-copy">
            © InnBuddy All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}