'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import './sustainable.css'

const goals = [
  ['01', '貧困をなくそう', '地域の仕事と収入を守る宿へ'],
  ['02', '飢餓をゼロに', '地元の食材を、物語ごと届ける'],
  ['03', 'すべての人に健康と福祉を', '働く人と泊まる人の健やかさ'],
  ['04', '質の高い教育をみんなに', '技術と文化を次の世代へ'],
  ['05', 'ジェンダー平等を実現しよう', '誰もが力を発揮できる現場'],
  ['06', '安全な水とトイレを世界中に', '水の循環を見える化する'],
  ['07', 'エネルギーをみんなに', '光熱費を、未来への投資に'],
  ['08', '働きがいも経済成長も', '宿から始まる地域の雇用'],
  ['09', '産業と技術革新の基盤を', '小さな宿の改善をデータで'],
  ['10', '人や国の不平等をなくそう', '旅を、ひらかれた体験に'],
  ['11', '住み続けられるまちづくりを', '観光と暮らしが共存する場所'],
  ['12', 'つくる責任、つかう責任', '仕入れから廃棄まで測る'],
  ['13', '気候変動に具体的な対策を', '排出量を知り、変えていく'],
  ['14', '海の豊かさを守ろう', '海の恵みを、海へ返す'],
  ['15', '陸の豊かさも守ろう', '森と土を旅の背景にしない'],
  ['16', '平和と公正をすべての人に', '信頼される運営をつくる'],
  ['17', 'パートナーシップで目標を達成', '一軒ではなく、地域全体で'],
]

const valuePhotos = [
  ['山と朝霧', 'photo-1469474968028-56623f02e42e'],
  ['森の小道', 'photo-1511497584788-876760111969'],
  ['湖畔の光', 'photo-1470770841072-f978cf4d019e'],
  ['苔と木漏れ日', 'photo-1441974231531-c6227db76b6e'],
  ['海辺の崖', 'photo-1507525428034-b723cf961d3e'],
  ['棚田の風景', 'photo-1500534623283-312aade485b7'],
  ['川の流れ', 'photo-1433086966358-54859d0ed716'],
  ['野の花', 'photo-1497250681960-ef046c08a56e'],
  ['森の樹冠', 'photo-1448375240586-882707db888b'],
  ['草原の丘', 'photo-1501854140801-50d01698950b'],
  ['海と空', 'photo-1500534623283-312aade485b7'],
  ['木の葉', 'photo-1513836279014-a89f7a76ae86'],
  ['山の稜線', 'photo-1500534314209-a25ddb2bd429'],
  ['水面の反射', 'photo-1501785888041-af3ef285b470'],
  ['森の小屋', 'photo-1523712999610-f77fbcfc3843'],
  ['夕暮れの湖', 'photo-1473445361085-b9a07f55608b'],
  ['大地の道', 'photo-1500534623283-312aade485b7'],
]

const auditItems = [
  '電気・水道・廃棄物の量を把握している',
  '食品廃棄量を計測している',
  '仕入れ先と、生産者の顔が見えている',
  '地元の食材を30％以上使用している',
  'スタッフが誇りを持って働ける環境がある',
  '従業員の労働時間・有給取得率を把握している',
  '地域にお金が循環する仕組みがある',
  '廃棄物の分別・リサイクル率を把握している',
  'CO₂排出量（Scope 1,2）を試算したことがある',
  '取り組みを、お客様に伝えている',
]

export default function SustainableClient() {
  const [activeGoal, setActiveGoal] = useState(0)
  const [checked, setChecked] = useState<number[]>([])
  const progress = Math.round((checked.length / 10) * 100)

  useEffect(() => {
    const onScroll = () => {
      const bar = document.documentElement
      const y = window.scrollY / (bar.scrollHeight - window.innerHeight)
      document.documentElement.style.setProperty('--scroll', `${Math.min(100, y * 100)}%`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
    }
  }, [])

  const toggle = (index: number) =>
    setChecked((items) => (items.includes(index) ? items.filter((item) => item !== index) : [...items, index]))

  return (
    <main className="editorial-site">
      <div className="reading-progress" />

      {/* ナビゲーション */}
      <nav className="floating-nav" aria-label="ナビゲーション">
        <a className="brand-mark" href="#earth">
          HOTEL <span>×</span> SDGs
        </a>
        <div className="nav-actions">
          <Link href="/sustainable/articles" className="nav-main-cta">
            <span className="spark-icon">✦</span> 世界の500の事例を見る
          </Link>
          <a
            className="nav-pill-btn"
            href="https://innbuddy-japan.com/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ ↗
          </a>
          <a
            className="nav-pill-btn"
            href="https://timerex.net/s/InnBuddy_ESG/386fd946"
            target="_blank"
            rel="noopener noreferrer"
          >
            相談する ↗
          </a>
        </div>
      </nav>

      {/* ヒーロー */}
      <section id="earth" className="hero chapter-dark">
        <div className="hero-video" role="img" aria-label="森、海、雲、光がタイムラプスのように重なり移ろう、地球環境の背景映像">
          <span className="hero-frame frame-forest" />
          <span className="hero-frame frame-water" />
          <span className="hero-frame frame-cloud" />
          <span className="hero-frame frame-hills" />
          <span className="hero-video-wash" />
        </div>
        <div className="hero-grain" />
        <div className="hero-content wrapper reveal">
          <p className="kicker">HOTEL × SDGs 2030 / A VISUAL JOURNEY</p>
          <h1>
            <span>宿は、地球の上にある。</span>Earth<br />
            <em className="hero-to-word">to</em> Hotel
          </h1>
          <div className="hero-bottom">
            <p>
              満点の星空、川のせせらぎ、野菜の成長、土の香り、炎のゆらぎ。<br />
              すべての営みは、地球から始まる。
            </p>
          </div>
        </div>
      </section>

      {/* A NOTE FOR HOTELS */}
      <section className="intro section-paper reveal compact-intro">
        <div className="wrapper split-intro">
          <div>
            <p className="kicker">A NOTE FOR HOTELS</p>
            <h2 className="wave-text-title">
              <span className="wave-text">環境への配慮は、</span><br />
              <i className="wave-text">これからの「選ばれる理由」になる。</i>
            </h2>
          </div>
          <div className="body-copy">
            <p className="wave-text-p">
              <span className="wave-text">
                これからの宿選びには、価格や立地だけではない「理由」が加わっていくかもしれない。
              </span>
            </p>
            <p className="wave-text-p">
              <span className="wave-text">
                これは、SDGsを学ぶためのサイトではありません。地球から始まり、地域を通り、最後に自分の宿へ戻ってくる旅です。
              </span>
            </p>
            <p className="hand-note">— 地球から始まって、最後に自分の宿に戻ってくる旅 —</p>
          </div>
        </div>
        <div className="wrapper image-ribbon compact-ribbon" aria-label="自然と宿の風景">
          <img src="/library/sustainable/sustainable1.png" alt="自然と宿の風景 1" />
          <img src="/library/sustainable/sustainable2.png" alt="自然と宿の風景 2" />
          <img src="/library/sustainable/sustainable3.png" alt="自然と宿の風景 3" />
        </div>
      </section>

      {/* SDGsの基礎整理 */}
      <section className="basics-section section-blue-concept reveal">
        <div className="wrapper">
          <div className="basics-head">
            <p className="kicker kicker-cyan">SDGSとは何か / MDGSとSDGS / 2030年 / ESG / CSR / CARBON NEUTRAL</p>
            <h2 className="basics-title">
              基礎を3分で整理 <i>SDGs / ESG / CSR / Carbon Neutral</i>
            </h2>
          </div>

          <div className="basics-grid">
            <div className="basics-card">
              <div className="basics-card-head">
                <span className="basics-lead-label">OVERVIEW</span>
                <h3>SDGsとは？ / 2030年</h3>
              </div>
              <p className="basics-card-text">
                2015年国連サミットで採択された2030年までの世界共通目標。17目標・169ターゲット・232指標。MDGs（途上国中心の8目標）から全世界・全セクターへ拡大し「誰一人取り残さない」を掲げる。2030年はゴールではなく、通過点。そこから2035年60%、2040年73%、2050年NET ZEROへ続く。
              </p>
              <div className="basics-tags">
                <span>• 2030 AGENDA</span>
                <span>• 17 GOALS / 169 TARGETS</span>
                <span>• CARBON NEUTRAL 2050</span>
              </div>
            </div>

            <div className="basics-card">
              <div className="basics-card-head">
                <span className="basics-lead-label">FRAMEWORK</span>
                <h3>SDGs / ESG / CSR / Carbon Neutralの違い</h3>
              </div>
              <div className="basics-table">
                <div className="table-row">
                  <div className="table-th">CSR</div>
                  <div className="table-td">企業の社会的責任（貢献活動）</div>
                </div>
                <div className="table-row">
                  <div className="table-th">ESG</div>
                  <div className="table-td">投資家が企業を評価する物差し E/S/G</div>
                </div>
                <div className="table-row">
                  <div className="table-th">SDGS</div>
                  <div className="table-td">世界が2030年までに達成すべき共通目標</div>
                </div>
                <div className="table-row">
                  <div className="table-th">CARBON NEUTRAL</div>
                  <div className="table-td">2050年ネットゼロへ向けた脱炭素の道筋</div>
                </div>
              </div>
              <p className="basics-note">
                宿にとっては <b>ESG経営 → SDGs貢献 → 企業価値 → 選ばれる宿</b>、という順序で理解する。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 17 GOALS */}
      <section id="17-goals" className="goals-section goals-wood-mosaic single-page-goals">
        <div className="wrapper">
          <div className="section-heading light goals-bottom-align-heading">
            <div className="goals-heading-left">
              <p className="kicker kicker-white">THE COMMON LANGUAGE</p>
              <h2 className="goals-h2-wood">
                <strong className="wood-grain-heading">17</strong><br />
                <span className="wood-grain-heading">GOALS</span>
              </h2>
            </div>
            <p className="goals-sub-wood-bottom">
              <span className="wood-grain-heading goals-sub-wood-text">
                世界共通の17の目標。その中に、宿の仕事はいくつあるだろう。
              </span>
            </p>
          </div>
          <div className="goals-explorer compact-goals-explorer">
            <div className="goal-display compact-goal-display">
              <span>{goals[activeGoal][0]}</span>
              <h3>{goals[activeGoal][1]}</h3>
              <p>{goals[activeGoal][2]}</p>
            </div>
            <div className="goal-list compact-goal-list" role="list">
              {goals.map((goal, index) => (
                <button
                  key={goal[0]}
                  className={activeGoal === index ? 'goal-dot active' : 'goal-dot'}
                  onClick={() => setActiveGoal(index)}
                  aria-label={`${goal[0]} ${goal[1]}`}
                >
                  <span>{goal[0]}</span>
                  <b>{goal[1]}</b>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE PLACE WE RETURN TO */}
      <section id="your-hotel" className="hotel-section compact-hotel reveal">
        <div className="leaf-float leaf-one" aria-hidden="true" />
        <div className="leaf-float leaf-two" aria-hidden="true" />
        <div className="wrapper editorial-grid compact-hotel-grid">
          <div>
            <p className="kicker">THE PLACE WE RETURN TO</p>
            <h2 className="compact-hotel-h2">
              宿＝<br />
              <i>文化と経済が息づく</i><br />
              小さな地球
            </h2>
          </div>
          <div className="hotel-copy">
            <img
              src="/library/sustainable/sustainable4.png"
              alt="宿の風景"
              className="photo compact-photo-hotel"
            />
            <p className="compact-hotel-p">
              地域の食材を受け取り、旅人を迎え、働く人の暮らしを支える。ホテルは、環境・経済・文化が交差する場所です。
            </p>
            <div className="flow compact-flow">
              <span>EARTH</span>
              <i>→</i>
              <span>LOCAL</span>
              <i>→</i>
              <span className="highlight">HOTEL</span>
              <i>→</i>
              <span>GUEST</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAKE THE INVISIBLE VISIBLE */}
      <section
        id="measure"
        className="measure-section section-pantone-2347u reveal"
        style={{ backgroundColor: '#E03C31' }}
      >
        <div className="wrapper">
          <div className="measure-top">
            <div>
              <p className="kicker">MAKE THE INVISIBLE VISIBLE</p>
              <h2>測る。</h2>
              <p className="large-copy">
                感覚ではなく、数字で見る。<br />
                数字になれば、改善できる。
              </p>
            </div>

            <div className="sdg-index-cards-wrap">
              <div className="sdg-dashboard-card">
                <div className="sdg-card-top-row">
                  <span className="sdg-card-title">SDG Index Rank</span>
                  <span className="sdg-country-badge">JAPAN</span>
                </div>
                <div className="sdg-rank-num-box">
                  <strong className="sdg-rank-large">20</strong>
                  <span className="sdg-rank-total">/169</span>
                </div>
                <a
                  href="https://dashboards.sdgindex.org/rankings/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sdg-ext-link-cue"
                >
                  （世界ランキングを見る）↗
                </a>
              </div>

              <div className="sdg-dashboard-card">
                <div className="sdg-card-top-row">
                  <span className="sdg-card-title">SDG Index Score</span>
                  <span className="sdg-country-badge">JAPAN</span>
                </div>
                <div className="sdg-score-circle-box">
                  <svg className="sdg-circle-svg" viewBox="0 0 120 120">
                    <circle className="sdg-circle-bg" cx="60" cy="60" r="48" />
                    <circle
                      className="sdg-circle-bar"
                      cx="60"
                      cy="60"
                      r="48"
                      strokeDasharray="301.59"
                      strokeDashoffset={301.59 * (1 - 0.81)}
                    />
                  </svg>
                  <strong className="sdg-score-val">81.0</strong>
                </div>
                <a
                  href="https://dashboards.sdgindex.org/profiles/japan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sdg-ext-link-cue"
                >
                  （日本の達成率詳細を見る）↗
                </a>
              </div>
            </div>
          </div>

          <div className="three-metrics">
            <div>
              <span>01</span>
              <b>SDG INDEX</b>
              <p className="metric-stat-line">世界20位 / スコア81.0</p>
            </div>
            <div>
              <span>02</span>
              <b>PURCHASING POWER</b>
              <p className="metric-stat-line">46位 $55,422</p>
            </div>
            <div>
              <span>03</span>
              <b>INBOUND CONSUMPTION</b>
              <p className="metric-stat-line">
                2025年 9兆4,559億円<br />
                2030年目標値 15兆円
              </p>
            </div>
          </div>

          <div className="measure-narrative-box">
            <p className="measure-narrative-text">
              これからの旅に選ばれる力。<br />
              訪日旅行が潤す地域経済。
            </p>
          </div>
        </div>
      </section>

      {/* FROM SOIL TO STORY */}
      <section className="supply-section compact-supply reveal">
        <div className="supply-ring-bg" aria-hidden="true" />
        <div className="wrapper supply-layout compact-supply-layout">
          <img
            src="/library/sustainable/sustainable5.png"
            alt="食材と植物の循環"
            className="supply-image compact-leaf-img"
          />
          <div className="supply-copy-box">
            <p className="kicker">FROM SOIL TO STORY</p>
            <h2 className="compact-supply-h2">
              食材の旅を、<br />
              <i>宿の物語にする。</i>
            </h2>
            <p className="body-copy compact-supply-body">
              FARM → FISHERY → PRODUCER → SUPPLIER → HOTEL → GUEST。仕入れは単なるコストではない。地域にお金と誇りを残す、最初の接点です。
            </p>
            <div className="local-note">LOCAL MONEY / LOCAL PRIDE</div>
          </div>
        </div>
      </section>

      {/* THE FUTURE TRAVELER */}
      <section id="future" className="future-section">
        <div className="wind-words" aria-hidden="true">
          <span>PRICE</span>
          <span>FOOD</span>
          <span>CULTURE</span>
          <span>NATURE</span>
          <span>PEOPLE</span>
          <span>EXPERIENCE</span>
          <span>LOCAL</span>
        </div>
        <div className="wrapper future-inner">
          <p className="kicker">THE FUTURE TRAVELER</p>
          <h2>
            人によって、<br />
            宿を選ぶ理由は違う。
          </h2>
          <p>価格だけでは説明できない「泊まる理由」がある。</p>
          <a className="text-link" href="#value">
            AND WHAT ABOUT TRAVELERS FROM OVERSEAS? ↘
          </a>
        </div>
      </section>

      {/* COST GENERATES A NEW JOURNEY */}
      <section id="value" className="value-section section-dark">
        <div className="value-album" aria-label="17の自然をめぐる17枚の写真">
          {valuePhotos.map(([alt, id], index) => (
            <img key={`${id}-${index}`} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=88`} alt={alt} />
          ))}
        </div>
        <div className="value-album-wash" />
        <div className="fire-glow" />
        <div className="wrapper value-inner">
          <p className="kicker">COST GENERATES A NEW JOURNEY</p>
          <div className="value-stack">
            <span>COST</span>
            <i>↓</i>
            <span>MANAGEMENT</span>
            <i>↓</i>
            <span className="accent">VALUE</span>
            <i>↓</i>
            <span>STORY</span>
            <i>↓</i>
            <span>BOOKING</span>
          </div>
          <p className="value-copy">
            取り組むだけで、終わらせない。<br />
            その努力を、お客様に伝わる物語にする。
          </p>
        </div>
      </section>

      {/* GREENWASHING */}
      <section className="greenwashing-section section-light-gray reveal">
        <div className="bonsai-ambient-bg" aria-hidden="true" />
        <div className="wrapper greenwashing-inner">
          <header className="greenwashing-head">
            <p className="kicker kicker-gold">GREENWASHING</p>
            <h2 className="greenwashing-title">
              「SDGsをやる＝何でも良い」ではない <i>GREENWASHING</i>
            </h2>
            <p className="greenwashing-sub-title">
              「サステナブルと名乗ること」ではなく<b>「何をして、何が変わったのか」</b>が重要です。
            </p>
          </header>

          <div className="greenwashing-grid">
            <div className="gw-card gw-bad-refined">
              <div className="gw-card-header">
                <span className="gw-badge-navy">NOT RECOMMENDED</span>
                <h4 className="gw-card-headline">表面的なアピール</h4>
              </div>
              <ul className="gw-list">
                <li>「環境にやさしい宿です。」</li>
                <li>「サステナブルなホテルです。」</li>
                <li>「地球にやさしい取り組みをしています。」</li>
              </ul>
              <div className="gw-verdict-navy">
                <span>根拠の欠如</span>
                <p>数字や具体的な対象プロセスの提示がない</p>
              </div>
            </div>

            <div className="gw-card gw-good-refined">
              <div className="gw-card-header">
                <span className="gw-badge-amber">BEST PRACTICE</span>
                <h4 className="gw-card-headline">事実に基づく開示</h4>
              </div>
              <ul className="gw-list">
                <li>数字を出す（kWh、L、kg、%）</li>
                <li>何を測っているか示す</li>
                <li>何を改善したか示す</li>
                <li>第三者基準があれば明示する</li>
                <li>できていないことも隠さない</li>
              </ul>
              <div className="gw-verdict-amber">
                <span>透明性とプロセス</span>
                <p>現状の課題と計測値を誠実に共有する姿勢</p>
              </div>
            </div>

            <div className="gw-card gw-core-refined">
              <div className="gw-card-header">
                <span className="gw-badge-core">THE ESSENCE</span>
                <h4 className="gw-card-headline">信頼につながる本質</h4>
              </div>
              <p className="gw-core-text">
                「サステナブルと名乗ること」ではなく「何をして、何が変わったのか」。継続的な改善プロセスを見せることが信頼につながる。
              </p>
              <div className="gw-example-box">
                <span className="example-tag">EXAMPLE STATEMENT</span>
                <p>前年比で食品廃棄物を28%削減（月間850kg→612kg）。地元の有機契約農家・田中農園からの直接仕入れ比率42%。</p>
                <small>数値と具体的な生産者名を明示した発信事例</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A QUIET CHECK-IN */}
      <section className="check-section section-white reveal">
        <div className="wrapper">
          <div className="quiet-window-grid">
            <div className="window-cell cell-image cell-tl">
              <img
                src="/library/sustainable/光と鯉の水面庭園.png"
                alt="光と鯉の水面庭園"
                className="window-photo"
              />
            </div>

            <div className="window-cell cell-content cell-tr">
              <div className="cell-pad">
                <p className="kicker checkin-theme-text">A QUIET CHECK-IN</p>
                <h2 className="window-h2 checkin-theme-text">
                  あなたの宿の、<br />
                  <i>現在地を見つける。</i>
                </h2>
                <p className="window-sub-copy checkin-theme-text">
                  10の問いに答えて、最初の一歩を可視化する。
                </p>
              </div>
            </div>

            <div className="window-cell cell-content cell-bl">
              <div className="cell-pad audit-wide-pad">
                <div className="compact-audit-box">
                  <div className="check-head">
                    <div>
                      <p className="audit-sub-label checkin-theme-text">
                        10の問いに答えて、最初の一歩を可視化する。
                      </p>
                      <b className="checkin-theme-text">HOTEL / SELF AUDIT</b>
                    </div>
                    <strong className="checkin-percent-text">{progress}%</strong>
                  </div>

                  <div className="compact-check-columns">
                    <div className="check-col">
                      {auditItems.slice(0, 5).map((item, idx) => {
                        const index = idx
                        return (
                          <label key={item} className="compact-check-item">
                            <input
                              type="checkbox"
                              checked={checked.includes(index)}
                              onChange={() => toggle(index)}
                            />
                            <span className="checkin-theme-text">{item}</span>
                            <small className="checkin-theme-text">0{index + 1}</small>
                          </label>
                        )
                      })}
                    </div>

                    <div className="check-col">
                      {auditItems.slice(5, 10).map((item, idx) => {
                        const index = idx + 5
                        return (
                          <label key={item} className="compact-check-item">
                            <input
                              type="checkbox"
                              checked={checked.includes(index)}
                              onChange={() => toggle(index)}
                            />
                            <span className="checkin-theme-text">{item}</span>
                            <small className="checkin-theme-text">
                              {index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
                            </small>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="check-bar">
                    <i style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="window-cell cell-image cell-br">
              <img
                src="/library/sustainable/桜舞う九面水鏡の鯉池.png"
                alt="桜舞う九面水鏡の鯉池"
                className="window-photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* from EARTH to HOTEL */}
      <section className="final-section compact-final reveal">
        <div className="wrapper final-editorial-container">
          <div className="final-top-banner">
            <h3 className="from-earth-title">from EARTH to HOTEL</h3>
          </div>

          <div className="final-split-grid aligned-bottom-grid">
            <div className="final-left-col">
              <h2 className="dest-main-title">
                <span className="wave-text">Destination</span><br />
                <span className="wave-text">Design</span>
              </h2>
              <p className="dest-sub-title">選ばれる 設計</p>
              <div className="dest-lead-wrapper">
                <p className="dest-body-lead">
                  食。人。地域。自然。文化。<br />
                  <span className="dest-sync-target">選ばれる宿には、理由がある。</span>
                </p>
              </div>
            </div>

            <div className="final-right-col sync-bottom-col">
              <div className="three-lines-block">
                <h4 className="flow-step-single-line">
                  <span className="wave-text">MEASURE → VALUE → STORY → BOOKING</span>
                </h4>
                <p className="partner-line-1">
                  <span className="wave-text">InnBuddyは、宿の取り組みを「予約につながる価値」へ変えていくためのパートナーです。</span>
                </p>
                <p className="partner-line-2">
                  <span className="wave-text">宿をつくることは、地域の未来をデザインすることでもある。</span>
                </p>
              </div>
            </div>
          </div>

          <div className="final-actions final-bar-actions">
            <Link className="button button-dark highlight-final-btn" href="/sustainable/articles">
              500の事例を見る →
            </Link>
            <a
              className="button button-line"
              href="https://innbuddy-japan.com/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせ
            </a>
            <a
              className="button button-line"
              href="https://timerex.net/s/InnBuddy_ESG/386fd946"
              target="_blank"
              rel="noopener noreferrer"
            >
              OTA改善を相談する ↗
            </a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer>
        <div className="wrapper footer-flex">
          <b className="footer-brand">InnBuddy</b>
          <span className="footer-slogan">持続的に選ばれる宿を、共に。</span>
          <a
            href="https://innbuddy-japan.com/team"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-about-link"
          >
            InnBuddyについて ↗
          </a>
          <small className="footer-copy">HOTEL × SDGs 2030 / © InnBuddy</small>
        </div>
      </footer>
    </main>
  )
}