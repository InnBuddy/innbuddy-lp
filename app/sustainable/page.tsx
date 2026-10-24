'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import './sustainable.css'

// 17 GOALS
const all17Goals = [
  { num: '1', title: '貧困をなくそう', en: 'No Poverty', color: '#E5243B' },
  { num: '2', title: '飢餓をゼロに', en: 'Zero Hunger', color: '#DDA63A' },
  { num: '3', title: 'すべての人に健康と福祉を', en: 'Good Health and Well-being', color: '#4C9F38' },
  { num: '4', title: '質の高い教育をみんなに', en: 'Quality Education', color: '#C5192D' },
  { num: '5', title: 'ジェンダー平等を実現しよう', en: 'Gender Equality', color: '#FF3A21' },
  { num: '6', title: '安全な水とトイレを世界中に', en: 'Clean Water and Sanitation', color: '#26BDE2' },
  { num: '7', title: 'エネルギーをみんなに そしてクリーンに', en: 'Affordable and Clean Energy', color: '#FCC30B' },
  { num: '8', title: '働きがいも経済成長も', en: 'Decent Work and Economic Growth', color: '#A21942' },
  { num: '9', title: '産業と技術革新の基盤をつくろう', en: 'Industry, Innovation and Infrastructure', color: '#FD6925' },
  { num: '10', title: '人や国の不平等をなくそう', en: 'Reduced Inequalities', color: '#DD1367' },
  { num: '11', title: '住み続けられるまちづくりを', en: 'Sustainable Cities and Communities', color: '#FD9D24' },
  { num: '12', title: 'つくる責任 つかう責任', en: 'Responsible Consumption and Production', color: '#BF8B2E' },
  { num: '13', title: '気候変動に具体的な対策を', en: 'Climate Action', color: '#3F7E44' },
  { num: '14', title: '海の豊かさを守ろう', en: 'Life Below Water', color: '#0A97D9' },
  { num: '15', title: '陸の豊かさも守ろう', en: 'Life on Land', color: '#56C02B' },
  { num: '16', title: '平和と公正をすべての人に', en: 'Peace, Justice and Strong Institutions', color: '#00689D' },
  { num: '17', title: 'パートナーシップで目標を達成しよう', en: 'Partnerships for the Goals', color: '#19486A' },
]

// 宿泊業が特に関係の深い8つの目標
const priorityGoals = [
  {
    num: '5',
    title: 'ジェンダー平等を実現しよう',
    en: 'Gender Equality',
    color: '#FF3A21',
    desc: '女性管理職比率の向上、多様なスタッフが働きやすい職場環境づくり。ハラスメント対策の徹底と柔軟な勤務制度の導入。',
    actions: ['女性リーダー育成プログラム', '柔軟なシフト・育休復帰支援', '全スタッフ向けD&I研修'],
  },
  {
    num: '6',
    title: '安全な水とトイレを世界中に',
    en: 'Clean Water and Sanitation',
    color: '#26BDE2',
    desc: '節水器具の導入、客室リネン交換頻度の最適化、排水の適正処理。水資源の保全とコスト削減を両立する水マネジメント。',
    actions: ['節水シャワーヘッド・泡沫水栓導入', '連泊時のリネン・タオル交換選択制', '雨水・中水の再利用システム'],
  },
  {
    num: '7',
    title: 'エネルギーをみんなに そしてクリーンに',
    en: 'Affordable and Clean Energy',
    color: '#FCC30B',
    desc: '館内LED化、スマート空調制御、再生可能エネルギー電力の導入。エネルギー消費の見える化と省エネ投資による光熱費削減。',
    actions: ['LED照明・人感センサーへの全館切替', 'BEMSによる空調自動最適制御', '再エネ電力プランへの切り替え'],
  },
  {
    num: '8',
    title: '働きがいも経済成長も',
    en: 'Decent Work and Economic Growth',
    color: '#A21942',
    desc: '地域雇用創出、業務効率化による長時間労働是正、外国人材活用。宿が地域の持続的な雇用の受け皿となる体制づくり。',
    actions: ['マルチタスク化と適正シフト管理', '特定技能・外国人スタッフの受入体制', '地域住民の積極採用と適正賃金'],
  },
  {
    num: '10',
    title: '人や国の不平等をなくそう',
    en: 'Reduced Inequalities',
    color: '#DD1367',
    desc: 'ユニバーサルデザイン客室、多言語対応、バリアフリー動線の確保。すべての旅行者が快適に過ごせるインクルーシブな空間設計。',
    actions: ['バリアフリールーム・スロープ整備', 'ピクトグラム・多言語サイン表示', '補助犬受入・アレルギー対応マニュアル'],
  },
  {
    num: '12',
    title: 'つくる責任 つかう責任',
    en: 'Responsible Consumption and Production',
    color: '#BF8B2E',
    desc: 'アメニティの脱プラスチック、フードロス削減、地元食材の調達。使い捨てから循環型へ、宿のサプライチェーン全体を見直す。',
    actions: ['アメニティバー導入・脱プラ製品採用', '仕込み量最適化とコンポスト活用', '地元産有機野菜・地場産品の優先調達'],
  },
  {
    num: '14',
    title: '海の豊かさを守ろう',
    en: 'Life Below Water',
    color: '#0A97D9',
    desc: 'プラスチックごみ削減、MSC認証シーフードの使用、海洋環境保全。沿岸部・離島の宿を中心に地域と連携した海を守る取り組み。',
    actions: ['使い捨てプラボトルの廃止・給水機設置', 'MSC/ASC認証水産物の調達', 'ビーチクリーン活動と宿泊客参加ツアー'],
  },
  {
    num: '15',
    title: '陸の豊かさも守ろう',
    en: 'Life on Land',
    color: '#56C02B',
    desc: 'FSC認証紙・木材の使用、敷地内緑化、生物多様性に配慮した施設運営。自然と調和したランドスケープと環境教育プログラム。',
    actions: ['間伐材・地域産木材の内装・家具採用', '敷地内ビオトープ・在来種の植栽', '自然ガイド付きネイチャーツアーの提供'],
  },
]

const stats = [
  {
    value: '81',
    unit: '%',
    label: '「サステナブルな宿に泊まりたい」と回答した旅行者の割合',
    source: 'Booking.com Sustainable Travel Report 2024',
  },
  {
    value: '15-20',
    unit: '%',
    label: '節水・節電の初期施策で削減可能な水道光熱費の目安',
    source: '観光庁 宿泊業省エネ事例調査',
  },
  {
    value: '4.2',
    unit: '倍',
    label: 'サステナビリティ開示宿のOTA経由予約増加率',
    source: '欧州ホテルチェーン 2023年実績',
  },
  {
    value: '67',
    unit: '%',
    label: '「アメニティ持参に賛同できる」と回答した宿泊客の割合',
    source: '国内宿泊客意識調査 2024',
  },
]

const pillars = [
  {
    tag: 'ENVIRONMENT',
    title: '環境負荷の低減',
    desc: 'エネルギー・水・プラスチック・食品ロスの4領域で、コスト削減と環境保護を同時に実現する現実的な施策を設計します。',
    items: [
      '館内LED化・人感センサー導入（投資回収1〜2年）',
      '客室アメニティのバイオマス化・バイリクエスト化',
      '節水シャワーヘッド・泡沫水栓による水道代削減',
      '朝食ビュッフェのポーション管理によるフードロス削減',
    ],
  },
  {
    tag: 'LOCAL COMMUNITY',
    title: '地域社会との共生',
    desc: '地域から仕入れ、地域に還元する循環構造を構築。宿が地域経済のハブとなることで、独自の宿泊体験価値を創出します。',
    items: [
      '半径30km圏内の食材調達率の向上とストーリー発信',
      '伝統工芸・地元作家の作品を客室・ロビーに採用',
      '地域ガイド・体験アクティビティとの提携プログラム',
      '災害時の一時避難所機能・地域防災協定の締結',
    ],
  },
  {
    tag: 'OPERATION & GOVERNANCE',
    title: '持続可能な運営体制',
    desc: '無理のない業務設計と情報開示で、スタッフの定着率向上と対外的な信頼獲得（OTA評価・認証取得）を両立します。',
    items: [
      '業務プロセスの可視化とデジタル化による省力化',
      '多言語対応・ユニバーサルマナー研修の実施',
      'サステナビリティ方針の策定と公式サイトでの公開',
      'エコマーク・サクラクオリティ等の認証取得支援',
    ],
  },
]

const steps = [
  {
    step: '01',
    title: '現状診断・課題抽出',
    desc: '電気・水道・廃棄物のデータ分析と現地ヒアリングから、費用対効果の高い着手領域を特定します。',
  },
  {
    step: '02',
    title: 'ロードマップ策定',
    desc: '「投資なしですぐできる施策」「少額投資で回収できる施策」「中長期の設備投資」の3段階で計画化。',
  },
  {
    step: '03',
    title: '現場導入・スタッフ研修',
    desc: 'マニュアル作成、オペレーション落とし込み、現場スタッフ向けの意識浸透研修を実施します。',
  },
  {
    step: '04',
    title: '発信・認証取得・効果検証',
    desc: 'OTAへのサステナビリティ情報登録、公式サイトでの情報開示、第三者認証の取得まで伴走します。',
  },
]

export default function SustainablePage() {
  const [activeGoal, setActiveGoal] = useState(0)
  const [filterGoal, setFilterGoal] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // ★ スマホ用ヘッダーメニュー開閉
  const [, startTransition] = useTransition()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ★ メニュー展開時に背景スクロールを防止
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const handleGoalClick = (index: number) => {
    startTransition(() => {
      setActiveGoal(index)
    })
  }

  return (
    <div className="sdgs-page">
      {/* ── ナビゲーション ── */}
      <nav className={`sdgs-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="sdgs-nav-inner flex items-center justify-between w-full">
          <Link href="/sustainable" className="sdgs-nav-brand no-underline">
            HOTEL <span>×</span> SDGs 2030
          </Link>

          {/* PC用リンク（従来通り） */}
          <div className="sdgs-nav-links hidden md:flex items-center gap-6">
            <a href="#about">SDGsとは</a>
            <a href="#goals">重点目標</a>
            <a href="#initiatives">取り組み事例</a>
            <a href="#framework">3つの領域</a>
            <a href="#steps">導入ステップ</a>
            <Link href="/sustainable/articles" className="sdgs-nav-cta">
              実践事例500選
            </Link>
          </div>

          {/* ★ スマホ用ハンバーガーメニューボタン ★ */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-inherit flex items-center justify-center focus:outline-none"
            aria-label="メニューを開く"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* ★ スマホ用ドロワーメニュー ★ */}
      {menuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden flex flex-col justify-between bg-[#17201d]/95 backdrop-blur-md p-6 text-[#f4efe6] animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-4 border-b border-white/15">
            <span className="text-xs tracking-[0.25em] text-[#a4c2a8] font-mono">HOTEL × SDGs 2030</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="メニューを閉じる"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-5 py-6 overflow-y-auto">
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-white/90 py-2 border-b border-white/10 flex items-center justify-between no-underline"
            >
              <span>SDGsとは</span>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </a>
            <a
              href="#goals"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-white/90 py-2 border-b border-white/10 flex items-center justify-between no-underline"
            >
              <span>重点目標</span>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </a>
            <a
              href="#initiatives"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-white/90 py-2 border-b border-white/10 flex items-center justify-between no-underline"
            >
              <span>取り組み事例</span>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </a>
            <a
              href="#framework"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-white/90 py-2 border-b border-white/10 flex items-center justify-between no-underline"
            >
              <span>3つの領域</span>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </a>
            <a
              href="#steps"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-white/90 py-2 border-b border-white/10 flex items-center justify-between no-underline"
            >
              <span>導入ステップ</span>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </a>
            <Link
              href="/sustainable/articles"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-bold text-[#a4c2a8] py-3 border-b border-white/10 flex items-center justify-between no-underline"
            >
              <span>実践事例500選</span>
              <ArrowRight className="w-5 h-5 text-[#a4c2a8]" />
            </Link>
          </div>

          <div className="text-center text-xs text-white/40 pt-4 border-t border-white/10">
            © InnBuddy 2026
          </div>
        </div>
      )}

      {/* ── ヒーロー ── */}
      <header className="sdgs-hero">
        <div className="sdgs-hero-bg" />
        <div className="sdgs-hero-content animate-on-scroll">
          <p className="sdgs-hero-kicker">SUSTAINABLE HOSPITALITY INITIATIVE</p>
          <h1 className="sdgs-hero-title">
            選ばれる宿の、
            <br />
            サステナブル経営。
          </h1>
          <p className="sdgs-hero-lead">
            コスト削減と環境保護を両立させ、国内外の旅行者から
            選ばれ続けるためのホテル・旅館向けSDGs実践フレームワーク。
            理想論ではなく、数字と現場の運用から変えていく。
          </p>
          <div className="sdgs-hero-actions">
            <Link href="/sustainable/articles" className="btn-primary">
              実践事例500選を見る
            </Link>
            <a href="#goals" className="btn-secondary">
              重点8目標を見る
            </a>
          </div>
        </div>
        <div className="sdgs-hero-scroll">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </header>

      {/* ── 数字で見る重要性 ── */}
      <section className="sdgs-stats-section" id="stats">
        <div className="sdgs-container">
          <div className="section-header animate-on-scroll">
            <span className="section-kicker">MARKET DATA</span>
            <h2 className="section-title">なぜ今、宿泊業にSDGsなのか</h2>
            <p className="section-desc">
              旅行者の意識変化と光熱費高騰。「環境対応」はコストではなく、
              収益改善と集客力強化のための投資へと位置づけが変わっています。
            </p>
          </div>
          <div className="sdgs-stats-grid">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card animate-on-scroll"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="stat-value-wrap">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-unit">{stat.unit}</span>
                </div>
                <p className="stat-label">{stat.label}</p>
                <span className="stat-source">{stat.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDGsとは（17の目標グリッド） ── */}
      <section className="sdgs-all-goals-section" id="about">
        <div className="sdgs-container">
          <div className="section-header animate-on-scroll">
            <span className="section-kicker">OVERVIEW</span>
            <h2 className="section-title">SDGs（持続可能な開発目標）とは</h2>
            <p className="section-desc">
              2015年の国連サミットで採択された2030年までの国際目標。
              17のゴールと169のターゲットから構成され、
              「誰一人取り残さない」持続可能で多様性と包摂性のある社会の実現を目指しています。
            </p>
          </div>
          <div className="all-goals-grid animate-on-scroll">
            {all17Goals.map((g) => {
              const isPriority = priorityGoals.some((p) => p.num === g.num)
              return (
                <div
                  key={g.num}
                  className={`all-goal-card ${isPriority ? 'is-priority' : ''}`}
                  style={{ '--goal-color': g.color } as React.CSSProperties}
                >
                  <span className="all-goal-num">{g.num}</span>
                  <span className="all-goal-title">{g.title}</span>
                  <span className="all-goal-en">{g.en}</span>
                  {isPriority && <span className="priority-tag">宿泊業重点</span>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 宿泊業の重点8目標 ── */}
      <section className="sdgs-goals-section" id="goals">
        <div className="sdgs-container">
          <div className="section-header animate-on-scroll">
            <span className="section-kicker">PRIORITY GOALS</span>
            <h2 className="section-title">宿泊業が直結する8つの重点目標</h2>
            <p className="section-desc">
              17の目標から、ホテル・旅館の現場で実行可能かつ効果の高い8領域を抽出。
              各目標をクリックして取り組み内容を確認できます。
            </p>
          </div>

          <div className="goals-nav animate-on-scroll">
            {priorityGoals.map((g, i) => (
              <button
                key={g.num}
                type="button"
                className={`goal-tab ${activeGoal === i ? 'active' : ''}`}
                style={{
                  '--goal-color': g.color,
                } as React.CSSProperties}
                onClick={() => handleGoalClick(i)}
              >
                <span className="goal-tab-num">{g.num}</span>
                <span className="goal-tab-title">{g.en}</span>
              </button>
            ))}
          </div>

          <div className="goal-detail animate-on-scroll" key={activeGoal}>
            <div
              className="goal-detail-header"
              style={{ borderLeftColor: priorityGoals[activeGoal].color }}
            >
              <div
                className="goal-badge"
                style={{ backgroundColor: priorityGoals[activeGoal].color }}
              >
                GOAL {priorityGoals[activeGoal].num}
              </div>
              <div className="goal-detail-titles">
                <h3 className="goal-detail-title">
                  {priorityGoals[activeGoal].title}
                </h3>
                <span className="goal-detail-en">
                  {priorityGoals[activeGoal].en}
                </span>
              </div>
            </div>
            <p className="goal-detail-desc">{priorityGoals[activeGoal].desc}</p>
            <div className="goal-actions-list">
              <span className="goal-actions-label">具体的な現場アクション：</span>
              <ul>
                {priorityGoals[activeGoal].actions.map((act, idx) => (
                  <li key={idx}>
                    <span
                      className="action-bullet"
                      style={{
                        backgroundColor: priorityGoals[activeGoal].color,
                      }}
                    />
                    {act}
                  </li>
                ))}
              </ul>
            </div>
            <div className="goal-detail-footer">
              <Link
                href={`/sustainable/articles?goal=GOAL+${priorityGoals[activeGoal].num}`}
                className="goal-articles-link"
                style={{ color: priorityGoals[activeGoal].color }}
              >
                この目標の実践事例を見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 取り組み事例（写真付きカード） ── */}
      <section className="sdgs-initiatives-section" id="initiatives">
        <div className="sdgs-container">
          <div className="section-header animate-on-scroll">
            <span className="section-kicker">CASE STUDIES</span>
            <h2 className="section-title">先行ホテルの実践知</h2>
            <p className="section-desc">
              国内外のホテル・旅館が実践するサステナブル経営の具体例。
              500件の記事アーカイブから厳選してご紹介します。
            </p>
          </div>

          <div className="initiatives-grid">
            <article className="initiative-card animate-on-scroll">
              <div className="initiative-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="サステナブルホテルの客室"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="initiative-img"
                />
                <span className="initiative-tag">脱プラスチック</span>
              </div>
              <div className="initiative-body">
                <div className="initiative-meta">
                  <span className="initiative-goal" style={{ color: '#BF8B2E' }}>GOAL 12</span>
                  <span className="initiative-read">5 min read</span>
                </div>
                <h3 className="initiative-title">客室アメニティ完全バイオマス化への移行ロードマップ</h3>
                <p className="initiative-summary">
                  プラスチック資源循環促進法に対応し、顧客満足度を落とさずにアメニティコストを18%削減したシティホテルの導入全プロセス。
                </p>
                <Link href="/sustainable/articles" className="initiative-link">
                  事例を読む ↗
                </Link>
              </div>
            </article>

            <article className="initiative-card animate-on-scroll" style={{ animationDelay: '150ms' }}>
              <div className="initiative-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                  alt="地産地消の料理を提供するレストラン"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="initiative-img"
                />
                <span className="initiative-tag">地産地消・フードロス</span>
              </div>
              <div className="initiative-body">
                <div className="initiative-meta">
                  <span className="initiative-goal" style={{ color: '#DDA63A' }}>GOAL 2 / 12</span>
                  <span className="initiative-read">4 min read</span>
                </div>
                <h3 className="initiative-title">地元農家30軒と直結した朝食ビュッフェの食品ロス削減術</h3>
                <p className="initiative-summary">
                  規格外野菜の積極活用とライブキッチン方式の導入により、生ごみ排出量を40%削減。同時に朝食評価をOTAで4.8点に引き上げた手法。
                </p>
                <Link href="/sustainable/articles" className="initiative-link">
                  事例を読む ↗
                </Link>
              </div>
            </article>

            <article className="initiative-card animate-on-scroll" style={{ animationDelay: '300ms' }}>
              <div className="initiative-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="自然と調和するリゾートホテル外観"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="initiative-img"
                />
                <span className="initiative-tag">再エネ・省エネ</span>
              </div>
              <div className="initiative-body">
                <div className="initiative-meta">
                  <span className="initiative-goal" style={{ color: '#FCC30B' }}>GOAL 7 / 13</span>
                  <span className="initiative-read">6 min read</span>
                </div>
                <h3 className="initiative-title">地熱・太陽光のハイブリッド活用で光熱費年1,200万円削減</h3>
                <p className="initiative-summary">
                  温泉熱の排熱回収と屋根置き太陽光発電を組み合わせ、館内電力の35%を自給。初期投資を補助金活用で3年回収した温泉旅館の事例。
                </p>
                <Link href="/sustainable/articles" className="initiative-link">
                  事例を読む ↗
                </Link>
              </div>
            </article>
          </div>

          <div className="initiatives-cta animate-on-scroll">
            <Link href="/sustainable/articles" className="btn-archive-link">
              500の実践事例アーカイブを検索する →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3つのアプローチ（フレームワーク） ── */}
      <section className="sdgs-pillars-section" id="framework">
        <div className="sdgs-container">
          <div className="section-header animate-on-scroll">
            <span className="section-kicker">FRAMEWORK</span>
            <h2 className="section-title">現場で動かす3つの領域</h2>
            <p className="section-desc">
              環境・地域・運営。3つの軸をバランスよく進めることで、
              一過性のPRではなく持続的な経営基盤へと昇華させます。
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="pillar-card animate-on-scroll"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="pillar-tag">{pillar.tag}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
                <ul className="pillar-list">
                  {pillar.items.map((item, j) => (
                    <li key={j}>
                      <span className="check-icon">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 導入ステップ ── */}
      <section className="sdgs-steps-section" id="steps">
        <div className="sdgs-container">
          <div className="section-header animate-on-scroll">
            <span className="section-kicker">IMPLEMENTATION</span>
            <h2 className="section-title">導入の4ステップ</h2>
            <p className="section-desc">
              何から手をつければいいか分からない宿でも、
              段階的に無理なくサステナブル経営へ移行できるプロセスです。
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <div
                key={i}
                className="step-card animate-on-scroll"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="step-num">{s.step}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / バナー ── */}
      <section className="sdgs-cta-section">
        <div className="sdgs-container">
          <div className="cta-box animate-on-scroll">
            <span className="cta-kicker">KNOWLEDGE ARCHIVE</span>
            <h2 className="cta-title">
              全国・世界の先行事例から学ぶ、
              <br />
              現場のための500の実践知。
            </h2>
            <p className="cta-desc">
              設備投資の回収期間、食材調達の地域連携スキーム、
              OTAのサステナビリティ評価対策など、
              すぐに使える具体的な事例をデータベース化しています。
            </p>
            <div className="cta-actions">
              <Link href="/sustainable/articles" className="btn-primary-large">
                実践事例アーカイブを見る（無料）
              </Link>
              <Link
                href="https://innbuddy-japan.com/contact"
                className="btn-outline-large"
              >
                導入のご相談・お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="sdgs-footer">
        <div className="sdgs-container">
          <div className="footer-inner">
            <div className="footer-brand-wrap">
              <span className="footer-brand">
                HOTEL <span>×</span> SDGs 2030
              </span>
              <p className="footer-brand-desc">
                宿泊業界の持続可能性と収益性の両立を支援する
                イノベーションイニシアチブ。
              </p>
            </div>
            <div className="footer-links-wrap">
              <div className="footer-col">
                <span className="footer-col-title">Navigation</span>
                <a href="#about">SDGsとは</a>
                <a href="#goals">重点目標</a>
                <a href="#initiatives">取り組み事例</a>
                <a href="#framework">3つの領域</a>
                <a href="#steps">導入ステップ</a>
              </div>
              <div className="footer-col">
                <span className="footer-col-title">Archive</span>
                <Link href="/sustainable/articles">実践事例500選</Link>
                <Link href="/sustainable/articles?goal=GOAL+12">目標12：つくる・つかう</Link>
                <Link href="/sustainable/articles?goal=GOAL+7">目標7：エネルギー</Link>
                <Link href="/sustainable/articles?goal=GOAL+6">目標6：水・衛生</Link>
              </div>
              <div className="footer-col">
                <span className="footer-col-title">InnBuddy</span>
                <Link href="/">トップページ</Link>
                <Link href="/library">メディアライブラリ</Link>
                <Link href="https://innbuddy-japan.com/contact">お問い合わせ</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© InnBuddy 2026 — Responsible Travel & Sustainable Hospitality</span>
            <div className="footer-bottom-links">
              <Link href="/sustainable/articles">Articles</Link>
              <Link href="/">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}