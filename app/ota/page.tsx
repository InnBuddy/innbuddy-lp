'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { submitDiagnostic, LeadFormData } from '@/lib/submitToSheet'
import { otaArticles } from './articlesData'
import { CaseStudy, caseStudiesData } from './caseStudiesData'
import './ota.css'
import './ota-mobile-fixes.css'

/* スマホ専用ボトムナビゲーション */
function MobileBottomNav({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  const iconProps = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  return (
    <div className="ota-mobile-bottom-nav md:hidden fixed bottom-2 left-2 right-2 z-[100] pb-[env(safe-area-inset-bottom)]">
      <style>{`
        @media (max-width: 767px) {
          .ota-mobile-bottom-nav .ota-nav-inner {
            display: flex !important;
            align-items: center !important;
            justify-content: space-evenly !important;
            padding: 0 4px !important;
          }
          .ota-mobile-bottom-nav .ota-nav-item {
            box-sizing: border-box !important;
            flex: 0 0 48px !important;
            width: 48px !important;
            min-width: 48px !important;
            height: 48px !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 2px !important;
            border-radius: 9999px !important;
            border: 2px solid #FCAF17 !important;
            background: rgba(255, 255, 255, 0.85) !important;
            color: #183654 !important;
            text-decoration: none !important;
            font-family: inherit !important;
            -webkit-appearance: none !important;
            appearance: none !important;
          }
          .ota-mobile-bottom-nav .ota-nav-item:active {
            color: #d97724 !important;
          }
          .ota-mobile-bottom-nav .ota-nav-item svg {
            width: 17px !important;
            height: 17px !important;
          }
          .ota-mobile-bottom-nav .ota-nav-item span {
            font-size: 8.5px !important;
            line-height: 1 !important;
            font-weight: 700 !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
      <div className="ota-nav-inner w-full bg-[#E0F2FE]/95 border border-white/80 shadow-[0_6px_24px_rgba(24,54,84,0.16)] rounded-[2rem] h-[60px]">
        <a href="https://innbuddy-japan.com/contact/" className="ota-nav-item">
          <svg {...iconProps}>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 6 10 7 10-7" />
          </svg>
          <span>問合せ</span>
        </a>
        <a href="https://innbuddy-japan.com/team" className="ota-nav-item">
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>私たち</span>
        </a>
        <a href="https://innbuddy-japan.com/" className="ota-nav-item">
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>ブランド</span>
        </a>
        <Link href="/ota/articles" className="ota-nav-item">
          <svg {...iconProps}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>記事一覧</span>
        </Link>
        <button
          type="button"
          onClick={onOpenDiagnostic}
          aria-haspopup="dialog"
          aria-label="無料診断"
          className="ota-nav-item"
        >
          <svg {...iconProps}>
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
          <span>無料診断</span>
        </button>
      </div>
    </div>
  )
}

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 10h1M9 14h1M9 18h1M16 13h1M16 17h1" /></svg>,
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" /><circle cx="6" cy="11" r="1.5" /><path d="m17 4 1 2 2.3.3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L14 6.3l2-.3z" /></svg>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9h6M9 15h6" /></svg>,
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="12" r="4" /><path d="m12 12 8-8M17 4l3 3M15 6l2 2" /></svg>,
    <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 11 18-5v12L3 13v-2zM11.6 16.8a3 3 0 1 1-5.8-1.6M21 9v6" /></svg>,
    <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>,
    <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="m12 7 1.2 2.2 2.3.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" /></svg>,
    <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" /></svg>,
    <svg key="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18M18 9l-5 5-4-4-3 3" /><circle cx="18" cy="9" r="1.5" /></svg>,
    <svg key="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    <svg key="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  ]
  return <span className="service-icon-wrap">{icons[index]}</span>
}

function ProblemIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" /></svg>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /></svg>,
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20" /></svg>,
    <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><path d="M11 8v6M8 11h6" /></svg>,
    <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="18" y1="8" x2="23" y2="13" /><line x1="23" y1="8" x2="18" y2="13" /></svg>,
    <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  ]
  return <span className="problem-icon-wrap">{icons[index]}</span>
}

function WorkflowIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="m9 14 2 2 4-4" /></svg>,
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.66l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.65z" /></svg>,
  ]
  return <span className="workflow-icon-wrap">{icons[index]}</span>
}

const services = [
  ['アカウント・掲載情報', 'OTAアカウント管理|施設情報更新|客室情報更新|設備・アメニティ更新|アクセス情報更新|チェックイン・アウト情報|キャンセルポリシー|注意事項|OTAからの通知確認|OTA仕様変更への対応'],
  ['宿泊プラン', '新規プラン作成|プラン内容変更|プラン名改善|プラン説明文改善|食事条件変更|特典設定|早割・直前割プラン|連泊プラン|季節・ターゲット別|販売期間設定'],
  ['料金設定', '基本料金設定|曜日別料金|繁忙期・閑散期対応|季節・連休料金|客室タイプ別料金|プラン別料金|早割・直前料金|料金変更・調整'],
  ['客室・在庫管理', '客室在庫管理|OTA別在庫確認|販売開始・停止|客室タイプ別在庫|日付別在庫|最低/最大宿泊日数|連泊制限|販売可能期間|キャンセル時の在庫確認'],
  ['キャンペーン・特集', 'OTAキャンペーン確認|セール情報確認|特集掲載確認|クーポン・ポイント施策|季節特集|インバウンド向け施策|キャンペーン参加設定|効果確認'],
  ['写真・コンテンツ', '写真更新|客室・食事・館内写真|周辺情報|写真掲載順|施設・客室紹介文|OTA別仕様対応'],
  ['クチコミ・レビュー', '新着レビュー確認|クチコミ返信|低評価レビュー確認|評価内容の整理|頻出コメント確認|クチコミ傾向の把握|OTA別状況確認'],
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
  '今の代行業者が全然提案/改善してくれない',
  '事業拡大をしたいが相談できる専門家がいない',
]

const scalePlans = [
  {
    code: 'SMALL SCALE',
    title: '小規模施設様',
    tagline: 'まるごと任せて、「おもてなし」に集中。',
    body: '限られた人員で日々の宿泊業務を担う施設様には、OTA運用を幅広く代行。煩雑な管理業務を私たちに任せていただき、スタッフの皆様がお客様へのおもてなしに集中できる環境をつくります。',
    points: [
      '日々の更新・在庫・料金・プラン管理を代行',
      '海外OTAの新規開設から日常運用まで一括対応',
      '少人数運営における業務負担を軽減',
    ],
  },
  {
    code: 'MEDIUM SCALE',
    title: '中規模施設様',
    tagline: '一緒に動いて、収益を最大化。',
    body: '施設スタッフ様と役割を分担しながら、日々のOTA運用と収益改善を推進。データ分析や販売戦略の提案を通じて、施設全体のパフォーマンス向上を目指します。',
    points: [
      '施設スタッフ様との最適な役割分担',
      'ADR・稼働率の改善につながる料金・プラン提案',
      '定例ミーティングによる継続的なPDCA',
    ],
  },
  {
    code: 'LARGE SCALE',
    title: '大規模施設様',
    tagline: '戦略と人材の両面から、選ばれる宿へ。',
    body: 'OTAアドバイザーとして、施設様の中期的な目標達成に向けた販売戦略や改善施策を支援。既存の運営体制や課題に応じて役割を柔軟に設計し、人材確保も含めた総合的な支援を行います。',
    points: [
      'OTAアドバイザーとして中期目標の達成に伴走',
      '組織・運営体制に合わせた柔軟な役割設計',
      '人材確保・採用支援も含めた戦略的サポート',
    ],
  },
]

const frameworkCategories = [
  {
    category: 'STRATEGY | 戦略',
    catClass: 'tag-strategy cat-1',
    steps: [
      { num: '01', title: '現状把握', desc: '売上・予約数・\n稼働率などを\n確認', stepClass: 'step-1' },
      { num: '02', title: '市場分析', desc: '競合施設や\n市場の動向を\n把握', stepClass: 'step-2' },
      { num: '03', title: '課題発見', desc: '改善点と\n売上向上の機会を\n特定', stepClass: 'step-3' },
      { num: '04', title: '目標設定', desc: '売上・稼働率などの\n数値目標を\n設定', stepClass: 'step-4' },
    ],
  },
  {
    category: 'EXECUTION | 実行',
    catClass: 'tag-execution cat-2',
    steps: [
      { num: '05', title: '運用計画', desc: '料金・プラン・\n販売方法を\n策定', stepClass: 'step-5' },
      { num: '06', title: 'OTA運用', desc: '計画に基づき\n掲載内容を\n管理', stepClass: 'step-6' },
    ],
  },
  {
    category: 'OPTIMIZATION | 分析・改善',
    catClass: 'tag-optimization cat-3',
    steps: [
      { num: '07', title: '効果検証', desc: '施策の結果を\n数値で確認', stepClass: 'step-7' },
      { num: '08', title: '改善提案', desc: '検証結果をもとに\n改善策を\n提案', stepClass: 'step-8' },
      { num: '09', title: '再戦略化', desc: '結果を踏まえ、\n次の運用方針を\n決定', stepClass: 'step-9' },
      { num: '10', title: '運用の定着', desc: '改善サイクルを継続し、\n安定した運用体制を構築', stepClass: 'step-10' },
    ],
  },
]

const otas = ['楽天トラベル', 'じゃらんnet', '一休.com', 'Yahoo!トラベル / るるぶ等']
const overseas = ['Booking.com', 'Agoda', 'Expedia', 'Trip.com / その他']

const faqs = [
  ['まだ契約するか決めていませんが、相談だけでもいいですか?', 'もちろんです。「自社の運用に問題があるか見てほしい」「どこまで任せられるのか知りたい」というご相談からでも構いません。'],
  ['1つのOTAだけでも依頼できますか?', 'はい、可能です。海外OTAのみ、特定の国内OTAのみなど、施設様の状況に合わせて柔軟に対応いたします。'],
  ['まだ登録していないOTAの新規開設からお願いできますか?', 'はい、新規アカウントの登録申請から、初期のページ作成・プラン設定までサポートいたします。'],
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">→</span>
}

export default function Page() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)
  const [isInboundMenuOpen, setIsInboundMenuOpen] = useState(false)
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
  const [openServices, setOpenServices] = useState<number[]>([0, 1])

  // 支援事例モーダル用 state & ref
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const caseTriggerRef = useRef<HTMLButtonElement | null>(null)
  const caseCloseBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!selectedCase) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    caseCloseBtnRef.current?.focus({ preventScroll: true })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCase(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      requestAnimationFrame(() => {
        caseTriggerRef.current?.focus({ preventScroll: true })
      })
    }
  }, [selectedCase])

  const toggleService = (index: number) => {
    setOpenServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const toggleAllServices = () => {
    if (openServices.length === services.length) {
      setOpenServices([])
    } else {
      setOpenServices(services.map((_, idx) => idx))
    }
  }

  return (
    <main className="ota-page-root">
      {/* HEADER */}
      <header className="site-header" style={{ position: 'fixed', zIndex: 100020, pointerEvents: 'auto' }}>
        <a href="#top" className="logo">
          InnBuddy<small>OTA</small>
        </a>
        <nav style={{ pointerEvents: 'auto' }}>
          <button
            type="button"
            className="ota-shared-diagnostic-cta"
            aria-haspopup="dialog"
            aria-label="無料診断を開く"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              setIsDiagnosticOpen(true)
            }}
          >
            無料診断 <span aria-hidden="true">→</span>
          </button>
          <a href="#services">対応業務</a>
          <a href="#comparison">他社との違い</a>
          <a href="#cases">支援事例</a>
          <a href="#articles">OTAコラム</a>
          <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer">
            InnBuddyについて
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="hero max-md:!h-auto max-md:!py-12">
        <div className="hero-right-bg-media max-md:!hidden" aria-hidden="true">
          <img
            src="/library/ota/hero-main.jpg"
            alt="ホテル・旅館の上質な空間とOTA運用サポート"
            className="hero-right-bg-img"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-right-bg-tint" />
        </div>
        <div className="wrap hero-2col-wrap">
          <div className="hero-left-content max-md:!w-full max-md:!pt-0 max-md:!flex max-md:!flex-col max-md:!items-center max-md:!text-center">
            <p className="eyebrow hero-script max-md:!self-center max-md:!mx-auto max-md:!w-fit max-md:!text-center max-md:!px-3 max-md:!py-1.5 max-md:!mt-0 max-md:!mb-4 max-md:!text-[12px] max-md:!leading-tight">
              ホテル・旅館のOTA運用代行
            </p>
            <h1>
              ホテル・旅館の<br />
              OTA運用を、<br />
              まるごと任せる。
            </h1>
            {/* スマホ用 信頼要素バッジ */}
            <div className="md:hidden hero-trust-mobile">
              <span className="hero-trust-kicker">PROVEN TRACK RECORD</span>
              <p className="hero-trust-main">
                <strong>大手企業流</strong>&amp;<strong>300社以上</strong>の<br />
                施設OTA改善に関わった知見
              </p>
            </div>
            <p className="hero-copy hero-script">
              宿泊プラン、料金、在庫、<br />
              掲載情報、キャンペーン、<br />
              クチコミ、海外OTAまで。<br />
              日々のOTA業務を、<br />
              InnBuddyがまとめてサポートします。
            </p>
            <div className="max-md:!hidden md:block hero-cta-box">
              <a
                href="https://innbuddy-japan.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="button chic-cta-btn"
              >
                OTA運用について相談する <Arrow />
              </a>
            </div>
          </div>

          {/* 右側:信頼要素カード(上部強調) + 01~03すりガラスパネル (下部3列横並び) */}
          <div className="max-md:!hidden md:flex hero-right-stack">
            <div className="hero-trust-card">
              <div className="hero-trust-badge-row">
                <span className="hero-trust-pill">TRUST &amp; EXPERTISE</span>
                <span className="hero-trust-dot" aria-hidden="true" />
              </div>
              <p className="hero-trust-headline">
                <span className="trust-accent">大手企業流</span>&amp;<span className="trust-accent">300社以上</span>の<br />
                施設OTA改善に関わった知見
              </p>
              <p className="hero-trust-sub">
                国内最大手OTAの現場知見と体系的なメソッドで、成果につながる運用を実現します。
              </p>
            </div>

            <div className="hero-panel-grid-3">
              <a
                href="https://innbuddy-japan.com/team"
                target="_blank"
                rel="noopener noreferrer"
                className="square-glass-panel-v2 panel-about"
              >
                <div className="panel-inner-v2">
                  <div className="panel-meta-row">
                    <span className="panel-num">01</span>
                    <span className="panel-label">ABOUT US</span>
                  </div>
                  <div className="panel-title-row">
                    <h3 className="panel-heading">InnBuddyとは?</h3>
                    <span className="panel-nav-symbol">→</span>
                  </div>
                </div>
              </a>

              <button
                type="button"
                onClick={() => setIsDiagnosticOpen(true)}
                className="square-glass-panel-v2 panel-check"
              >
                <div className="panel-inner-v2">
                  <div className="panel-meta-row">
                    <span className="panel-num">02</span>
                    <span className="panel-label">ONLINE CHECK</span>
                    <span className="panel-pill-tag">RECOMMENDED</span>
                  </div>
                  <div className="panel-title-row">
                    <h3 className="panel-heading">
                      無料診断で<br />現状を把握しよう
                    </h3>
                    <span className="panel-nav-symbol">→</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsInboundMenuOpen(true)}
                className="square-glass-panel-v2 panel-inbound"
              >
                <div className="panel-inner-v2">
                  <div className="panel-meta-row">
                    <span className="panel-num">03</span>
                    <span className="panel-label">INBOUND</span>
                  </div>
                  <div className="panel-title-row">
                    <h3 className="panel-heading">インバウンドをもっと取り込みたい</h3>
                    <span className="panel-nav-symbol">→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* スマホ版メイン写真カード */}
        <div className="md:hidden w-full mt-6 px-1">
          <div className="mobile-hero-photo-frame">
            <img
              src="/library/ota/hero-main.jpg"
              alt="ホテル・旅館のOTA運用イメージ"
              decoding="async"
            />
          </div>
        </div>

        <div className="hero-index max-md:!hidden md:block">
          SCROLL<br />
          <span></span>
        </div>
      </section>

      {/* 中央ポップアップ: インバウンド&ハラル選択 */}
      {isInboundMenuOpen && (
        <div className="modal-overlay" onClick={() => setIsInboundMenuOpen(false)}>
          <div className="inbound-square-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsInboundMenuOpen(false)}
              aria-label="閉じる"
            >
              ×
            </button>
            <div className="inbound-square-cards">
              <a
                href="https://innbuddy-japan.com/inbound/"
                target="_blank"
                rel="noopener noreferrer"
                className="inbound-square-item img-card-1"
              >
                <div className="img-card-overlay"></div>
                <span className="square-num">1</span>
                <span className="square-title">インバウンド特設ページをみる</span>
              </a>
              <a
                href="https://innbuddy-japan.com/halal/"
                target="_blank"
                rel="noopener noreferrer"
                className="inbound-square-item img-card-2"
              >
                <div className="img-card-overlay"></div>
                <span className="square-num">2</span>
                <span className="square-title">ハラル特設ページをみる</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 売上期待値測定モーダル */}
      <RevenueDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />

      {/* InnBuddy価格表ダウンロードモーダル */}
      <PriceListDownloadModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
      />

      {/* 支援事例 詳細モーダル（画面中央フィット・2カラムコンパクト表示） */}
      {selectedCase && (
        <div
          className="cs-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="cs-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cs-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cs-modal-header">
              <div className="cs-modal-header-meta">
                <span className="cs-modal-num">{selectedCase.num}</span>
                <span className="case-badge-pref">{selectedCase.prefecture}</span>
                <span className="case-badge-rooms">{selectedCase.rooms}</span>
              </div>
              <button
                ref={caseCloseBtnRef}
                type="button"
                className="cs-modal-close"
                onClick={() => setSelectedCase(null)}
                aria-label="事例の詳細を閉じる"
              >
                ×
              </button>
            </div>

            <div className="cs-modal-body">
              <h2 id="cs-modal-title" className="cs-modal-feature">
                {selectedCase.feature}
              </h2>

              <ul className="case-theme-list cs-modal-themes" aria-label="支援テーマ">
                {selectedCase.themes.map((theme) => (
                  <li key={theme} className="case-theme-tag">
                    {theme}
                  </li>
                ))}
              </ul>

              <div className="cs-detail-grid">
                <div className="cs-detail-col">
                  <div className="cs-detail-block">
                    <h3 className="cs-detail-heading">
                      <span className="cs-detail-step">01</span>
                      課題
                    </h3>
                    <p className="cs-detail-text">{selectedCase.challenge}</p>
                  </div>

                  <div className="cs-detail-block cs-detail-block-result">
                    <h3 className="cs-detail-heading">
                      <span className="cs-detail-step">03</span>
                      結果
                    </h3>
                    <ul className="cs-detail-list cs-detail-result-list">
                      {selectedCase.results.map((res) => (
                        <li key={res}>{res}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="cs-detail-col">
                  <div className="cs-detail-block">
                    <h3 className="cs-detail-heading">
                      <span className="cs-detail-step">02</span>
                      InnBuddyの取り組み
                    </h3>
                    <ul className="cs-detail-list">
                      {selectedCase.initiatives.map((act) => (
                        <li key={act}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cs-perspective-box">
                <div className="cs-perspective-label">
                  <span className="cs-detail-step">04</span>
                  InnBuddyの視点
                </div>
                <p className="cs-perspective-text">{selectedCase.perspective}</p>
              </div>
            </div>

            <div className="cs-modal-footer">
              <button
                type="button"
                className="cs-modal-close-bottom"
                onClick={() => setSelectedCase(null)}
              >
                一覧へ戻る（閉じる）
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROBLEM */}
      <section className="dark section problem">
        <div className="wrap">
          <div className="section-editorial-header">
            <div>
              <p className="section-kicker">CHALLENGES</p>
              <h2>
                こんなお悩みは<br />
                <span>ありませんか?</span>
              </h2>
            </div>
            <figure className="section-side-photo">
              <img
                src="/library/ota/problem-hospitality.jpg"
                alt="丁寧なおもてなしと空間づくりに集中できる環境"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="photo-caption-tag">HOSPITALITY FIRST</figcaption>
            </figure>
          </div>
          <div className="problem-cards-grid">
            {painPoints.map((p, i) => (
              <div className="problem-card" key={p}>
                <div className="problem-card-head">
                  <span className="problem-card-num">0{i + 1}</span>
                  <ProblemIcon index={i} />
                </div>
                <p className="problem-card-text">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE OF WORK */}
      <section id="services" className="light section services">
        <div className="wrap">
          <div className="services-heading-row">
            <div>
              <p className="services-kicker">OUR SERVICES / 01-11</p>
              <h2>
                InnBuddy OTAが<br />
                <span>対応する11の業務</span>
              </h2>
            </div>
            <p className="intro services-intro">
              施設ごとに異なる客室構成・ターゲットを踏まえ、OTA運用の準備から日々の実務、分析・改善まで一貫して支援します。
            </p>
          </div>

          <figure className="services-panorama-banner">
            <img
              src="/library/ota/services-support.jpg"
              alt="ホテル・旅館のOTA運用実務サポート"
              loading="lazy"
              decoding="async"
            />
            <div className="panorama-overlay-label">
              <span>COMPREHENSIVE OTA OPERATIONS</span>
              <strong>日々の更新から分析・改善提案まで一貫伴走</strong>
            </div>
          </figure>

          <div className="services-accordion-toolbar">
            <span className="services-guide-pill">
              項目をクリックすると詳細が開閉します
            </span>
            <button
              type="button"
              onClick={toggleAllServices}
              className="services-toggle-all-btn"
            >
              {openServices.length === services.length ? 'すべて閉じる' : 'すべて開く'}
            </button>
          </div>

          <div className="service-grid">
            {services.map(([title, items], idx) => {
              const isOpen = openServices.includes(idx)
              return (
                <div
                  className={`service ${isOpen ? 'is-open' : ''}`}
                  key={`service-accordion-${idx}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleService(idx)}
                  >
                    <span className="service-num">{String(idx + 1).padStart(2, '0')}</span>
                    <ServiceIcon index={idx} />
                    <span className="service-title-text">{title}</span>
                    <span className="plus" aria-hidden="true">
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  <div className={`service-content ${isOpen ? 'is-expanded' : ''}`}>
                    <ul>
                      {items.split('|').map((item, itemIndex) => (
                        <li key={`${idx}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="services-footnote">
            ※ 対応範囲は施設の状況・ご契約内容に応じて調整します。
          </p>

          {/* 単発・スポット相談導線 */}
          <div className="spot-consult-card">
            <div className="spot-consult-text">
              <span className="spot-consult-badge">SPOT / FLEXIBLE SUPPORT</span>
              <h3>フルサポート以外のご相談も大歓迎です</h3>
              <p>
                「何か一部だけ対応してほしい」「担当者が入社するまでの短期間の作業代行をしてほしい」「これから代行を検討していきたい、まずは相談だけ」などもお気軽にご連絡ください。<br />
                InnBuddy流の知見を込めてより良くなる手段を一緒に考えて対応いたします。
              </p>
            </div>
            <div className="spot-consult-action">
              <a
                href="https://innbuddy-japan.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="button chic-cta-btn"
              >
                スポット・一部代行を相談する <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DISTRIBUTION */}
      <section className="dark section ota">
        <div className="wrap">
          <div className="ota-top-layout">
            <div>
              <p className="section-kicker">CHANNELS</p>
              <h2>
                対応可能な<span>OTA</span>
              </h2>
              <p className="intro">
                複数の国内・海外OTAに対応。<br />
                現在ご利用中のOTAが対応可能か分からない場合も、お気軽にご相談ください。
              </p>
            </div>
            <figure className="ota-feature-photo">
              <img
                src="/library/ota/ota-inbound.jpg"
                alt="国内・海外OTAを通じた集客支援"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="photo-caption-tag">DOMESTIC &amp; GLOBAL</figcaption>
            </figure>
          </div>

          <div className="ota-columns">
            <div className="ota-panel-box">
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
            <div className="ota-panel-box">
              <h3 className="orange-heading">
                OVERSEAS OTA <small>海外OTA (インバウンド)</small>
              </h3>
              {overseas.map((x, i) => (
                <div className="ota-item" key={x}>
                  <span>0{i + 1}</span>
                  <span className="ota-item-text">{x}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 料金表ダウンロード導線 */}
          <div className="pricelist-download-banner">
            <div className="pricelist-banner-copy">
              <span className="pricelist-kicker">PRICE LIST DOWNLOAD</span>
              <h3>InnBuddy価格表ダウンロード</h3>
              <p>
                サービス詳細・料金目安をまとめた資料を無料でご覧いただけます。フォーム入力後、すぐにご確認いただけます。
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPriceModalOpen(true)}
              className="pricelist-dl-trigger-btn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              価格表を無料ダウンロード
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES: InnBuddyの特徴 */}
      <section id="strengths" className="light section features-bento-section">
        <div className="wrap">
          <div className="features-bento-header">
            <p className="features-bento-kicker">WHY INNBUDDY</p>
            <div className="features-bento-title-row">
              <span className="features-title-line" aria-hidden="true" />
              <h2>
                InnBuddyの<span>特徴</span>
              </h2>
              <span className="features-title-line" aria-hidden="true" />
            </div>
            <p className="features-bento-lead">
              宿の可能性を広げる、私たちの原点と目指す未来。
            </p>
          </div>

          <div className="features-bento-grid">
            {/* 左側 01 */}
            <article className="fbento-card fbento-card-01">
              <div className="fbento-bg-photo" aria-hidden="true">
                <img src="/library/ota/feature-01.jpg" alt="" loading="lazy" decoding="async" />
              </div>
              <div className="fbento-scrim fbento-scrim-navy" aria-hidden="true" />
              <div className="fbento-content">
                <div className="fbento-num-block">
                  <span className="fbento-num">01</span>
                  <span className="fbento-num-bar" aria-hidden="true" />
                </div>
                <h3>
                  宿の課題は一つのサービス<br />
                  だけでは解決できない。
                </h3>
                <p>
                  最大手OTAのコンサルタントとして多くの宿泊施設様を支援させていただく中で、最ももどかしく感じていたのがこの現実でした。
                </p>
                <p>
                  他社OTAに関する相談、インバウンドの集客や受け入れ体制の構築、そしてニューツーリズムへの新たな取り組みなど、特定のサービスの枠組みだけでは対応しきれない領域が数多く存在します。こうした単一支援の限界を越え、施設様ごとに異なる課題へ本質的に寄り添う総合サポートを実現するために、私たちはこのブランドを立ち上げました。
                </p>
              </div>
            </article>

            {/* 右側カラム (02と03) */}
            <div className="features-bento-right-col">
              <article className="fbento-card fbento-card-02">
                <div className="fbento-bg-photo" aria-hidden="true">
                  <img src="/library/ota/feature-02.jpg" alt="" loading="lazy" decoding="async" />
                </div>
                <div className="fbento-scrim fbento-scrim-navy-side" aria-hidden="true" />
                <div className="fbento-content">
                  <div className="fbento-num-block">
                    <span className="fbento-num">02</span>
                    <span className="fbento-num-bar" aria-hidden="true" />
                  </div>
                  <h3>
                    OTAを起点に、<br />
                    最善の一手を。
                  </h3>
                  <p>
                    まずはOTA運用から宿を深く理解し、状況や目標に応じて、OTA以外の施策も含めて最適な方法を一緒に考えます。
                  </p>
                </div>
              </article>

              <article className="fbento-card fbento-card-03">
                <div className="fbento-bg-photo" aria-hidden="true">
                  <img src="/library/ota/feature-03.jpg" alt="" loading="lazy" decoding="async" />
                </div>
                <div className="fbento-scrim fbento-scrim-gold" aria-hidden="true" />
                <div className="fbento-content">
                  <div className="fbento-inline-head">
                    <div className="fbento-num-block">
                      <span className="fbento-num fbento-num-white">03</span>
                      <span className="fbento-num-bar fbento-num-bar-white" aria-hidden="true" />
                    </div>
                    <h3>
                      デスティネーション<br />
                      デザイン
                    </h3>
                  </div>
                  <p>
                    総合的なブランディングによって、施設様が本来届けたい「ターゲットとするお客様」から「選ばれる宿」をつくること。これが、私たちが最も意識しているアプローチです。
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON: 他社との違い */}
      <section id="comparison" className="dark section comparison-section">
        <div className="comparison-half-bg" aria-hidden="true">
          <img
            src="/library/ota/comparison-bg.jpg"
            alt=""
            className="comparison-half-bg-img"
            loading="lazy"
            decoding="async"
          />
          <div className="comparison-half-bg-scrim" />
        </div>

        <div className="wrap comparison-inner">
          <p className="section-kicker">DIFFERENCE</p>
          <h2>
            他社との<span>違い</span>
          </h2>
          <p className="intro">
            「作業だけ」「過去経験だけ」では成果が伸びにくい時代。<br />
            InnBuddyは、大手OTAの専門知見と世界中のリアルなネットワークで次のトレンドを先読みします。
          </p>

          <div className="comparison-grid comparison-grid-weighted">
            <div className="comparison-card comparison-card-compact">
              <div className="comp-header">
                <span className="comp-tag">他社A</span>
                <h3>ホテル業界のプロフェッショナル</h3>
              </div>
              <div className="comp-block comp-good">
                <span className="comp-badge">強み</span>
                <p>
                  OTAや施設に関する深い専門知識と実務経験。業界慣習や現場オペレーションを熟知しており、従来の販売管理を安心して任せられます。
                </p>
              </div>
              <div className="comp-block comp-weak">
                <span className="comp-badge">課題</span>
                <p>
                  従来の国内市場や宿泊業界の枠組みが中心となりやすく、刻々と変化する市場のリアルな動向や組織づくりまで踏み込んだ提案には限界があります。
                </p>
              </div>
            </div>

            <div className="comparison-card comparison-card-compact">
              <div className="comp-header">
                <span className="comp-tag">他社B</span>
                <h3>丁寧な作業代行が得意</h3>
              </div>
              <div className="comp-block comp-good">
                <span className="comp-badge">強み</span>
                <p>
                  料金変更やプラン登録、在庫調整など、施設側から依頼された日々のルーティン業務を着実に遂行する対応力と安心感。
                </p>
              </div>
              <div className="comp-block comp-weak">
                <span className="comp-badge">課題</span>
                <p>
                  「指示された作業の代行」が中心となるため、課題発見や能動的な改善提案、海外OTA・インバウンド対策などの新たな取り組みまでは手が回りにくい傾向があります。
                </p>
              </div>
            </div>

            <div className="comparison-card comparison-card-innbuddy comparison-card-large">
              <div className="comp-header">
                <span className="comp-tag comp-tag-primary">InnBuddy</span>
                <h3>専門知見 × 世界のネットワーク × 仮説検証</h3>
              </div>
              <p className="comp-innbuddy-lead">
                経験だけに頼らない。情報を集め、考え、次の一手を。
              </p>
              <div className="comp-innbuddy-body">
                <p>
                  <strong>5年以上のOTAコンサルティング経験</strong>を持ち、<strong>国内最大手OTAで300社以上の宿泊施設</strong>を支援してきたメンバーが中心となり、全国で培った専門知見を活用します。
                </p>
                <p>
                  また、<strong>大手企業での事業推進や海外法人運営の経験</strong>を活かし、WEB売上UPの裏側にある組織づくり・管理運営面も考慮した<strong>“経営目線”</strong>でサポートします。
                </p>
                <p>
                  さらに、<strong>世界各地に広がるネットワーク</strong>から海外のリアルな情報や新トレンドを収集。インバウンド需要とグローバルのリアル需要の両面から仮説検証を重ね、宿泊施設の可能性を広げる具体的な施策をご提案します。
                </p>
              </div>
            </div>
          </div>

          {/* 他社との違い直下: インバウンド対応サポート強み横長枠 */}
          <div className="inbound-strength-banner">
            <div className="inbound-strength-header">
              <span className="inbound-strength-badge">他社にはない明確な強み</span>
              <span className="inbound-strength-subtag">INBOUND &amp; CROSS-CULTURAL SUPPORT</span>
            </div>
            <h3 className="inbound-strength-title">
              インバウンド対応サポートもお任せください
            </h3>
            <p className="inbound-strength-text">
              <strong>海外経験豊富なスタッフが英語で対応。</strong>単なる機械的な翻訳や定型文の返信ではなく、各お客様の<strong>文化や制度背景を深く考慮</strong>し、誤解やトラブルを防ぎながら満足度向上につながる適切な解決サポートを行います。
            </p>
          </div>
        </div>
      </section>

      {/* SCALE PLANS: 施設規模別支援提案 */}
      <section id="scale-plans" className="light section scale-section">
        <div className="wrap">
          <p className="services-kicker">SUPPORT BY SCALE</p>
          <h2>
            施設規模別<span>支援提案</span>
          </h2>
          <p className="intro">
            客室数やスタッフ体制に合わせて、最適な関わり方をご提案します。
          </p>

          <div className="scale-grid">
            {scalePlans.map((plan, idx) => (
              <div className="scale-card" key={plan.code}>
                <div className="scale-card-head">
                  <span className="scale-code">{plan.code}</span>
                  <span className="scale-num">0{idx + 1}</span>
                </div>
                <h3>{plan.title}</h3>
                <p className="scale-tagline">{plan.tagline}</p>
                <p className="scale-body">{plan.body}</p>
                <ul className="scale-points">
                  {plan.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="scale-note-cta-box">
            <div className="scale-note-text">
              <h3>施設規模は、あくまで目安です。</h3>
              <p>
                客室数だけでなく、現在の運営体制や課題、ご希望に応じて支援内容を柔軟に設計します。部分的な業務代行から中長期的な経営支援まで、お気軽にご相談ください。
              </p>
            </div>
            <div className="scale-note-action">
              <p className="scale-diag-label">効果を無料診断する</p>
              <button
                type="button"
                className="ota-shared-diagnostic-cta scale-diag-btn"
                aria-haspopup="dialog"
                aria-label="無料診断を開く"
                onClick={() => setIsDiagnosticOpen(true)}
              >
                無料診断 <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES: これまでの主な支援紹介 (6件カード) */}
      <section id="cases" className="dark section cases-section">
        <div className="wrap">
          <p className="section-kicker">CASE STUDIES</p>
          <h2>
            これまでの<span>主な支援紹介</span>
          </h2>
          <p className="intro">
            宿ごとに異なる魅力に、宿ごとの答えを。<br />
            宿泊施設の個性や運営状況、販売チャネルに合わせてOTA運営を最適化した支援事例をご紹介します。
          </p>

          <div className="cases-grid">
            {caseStudiesData.map((item) => (
              <button
                key={item.id}
                type="button"
                className="case-card-btn"
                aria-haspopup="dialog"
                onClick={(e) => {
                  caseTriggerRef.current = e.currentTarget
                  setSelectedCase(item)
                }}
              >
                <div className="case-card-top">
                  <span className="case-num">{item.num}</span>
                  <div className="case-meta-badges">
                    <span className="case-badge-pref">{item.prefecture}</span>
                    <span className="case-badge-rooms">{item.rooms}</span>
                  </div>
                </div>

                <h3 className="case-feature-title">{item.feature}</h3>

                <ul className="case-theme-list" aria-label="支援テーマ">
                  {item.themes.map((theme) => (
                    <li key={theme} className="case-theme-tag">
                      {theme}
                    </li>
                  ))}
                </ul>

                <p className="case-summary">{item.summary}</p>

                <div className="case-card-footer">
                  <span className="case-card-cta">
                    事例の詳細を見る <span className="case-card-arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section id="articles" className="light section articles-section">
        <div className="wrap">
          <div className="articles-heading-row">
            <div>
              <p className="services-kicker">OTA KNOWLEDGE / ARTICLES</p>
              <h2>
                OTA運用に役立つ<span>実践コラム</span>
              </h2>
              <p className="intro articles-intro">
                宿泊施設の現場で活かせる写真設計、料金調整、海外OTA攻略のポイントをまとめました。
              </p>
            </div>
            <Link href="/ota/articles" className="articles-all-link">
              記事一覧を見る <Arrow />
            </Link>
          </div>

          <div className="articles-cards-grid">
            {otaArticles.slice(0, 3).map((article) => (
              <Link
                href={`/ota/articles/${article.slug}`}
                key={article.slug}
                className="article-card"
              >
                <div className="article-card-thumb">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="article-card-badge">{article.category}</span>
                </div>
                <div className="article-card-body">
                  <div className="article-card-meta">
                    <span>{article.publishedAt}</span>
                    <span>・</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-card-excerpt">{article.excerpt}</p>
                  <span className="article-card-readmore">
                    記事を読む <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="articles-bottom-cta">
            <Link href="/ota/articles" className="articles-list-button">
              OTA記事一覧ページへ <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="dark framework section framework-pink-lime">
        <div className="framework-pink-lime-bg" aria-hidden="true" />
        <div className="framework-pink-lime-grid" aria-hidden="true" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="section-kicker">OUR APPROACH</p>
          <h2>
            InnBuddyが<br />
            <span>大切にしていること</span>
          </h2>
          <p className="intro">
            OTAは、一度設定して終わりではありません。<br />
            決まった作業を繰り返すだけの代行ではなく、現状把握から運用の定着まで、改善サイクルを回し続けます。
          </p>

          <div className="framework-flow-wrapper">
            {frameworkCategories.map((cat) => (
              <div className={`framework-cat-group ${cat.catClass}`} key={cat.category}>
                <div className="framework-cat-header">
                  <span>{cat.category}</span>
                </div>
                <div className="framework-cat-steps">
                  {cat.steps.map((step) => (
                    <div className={`framework-step-card ${step.stepClass}`} key={step.num}>
                      <div className="fstep-top">
                        <span className="fstep-badge">{step.num}</span>
                        <h3 className="fstep-title">{step.title}</h3>
                      </div>
                      <div className="fstep-bottom">
                        <p className="fstep-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="light section workflow">
        <div className="workflow-watermarks" aria-hidden="true">
          <span className="wm wm-1">客室平均単価 (ADR)</span>
          <span className="wm wm-2">客室稼働率 (OCC)</span>
          <span className="wm wm-3">販売可能客室売上 (RevPAR)</span>
          <span className="wm wm-4">予約リードタイム</span>
          <span className="wm wm-5">キャンセル率</span>
          <span className="wm wm-6">平均滞在日数 (LOS)</span>
          <span className="wm wm-7">成約率 (CVR)</span>
          <span className="wm wm-8">直販比率</span>
          <span className="wm wm-9">広告費用対効果 (ROAS)</span>
          <span className="wm wm-10">クチコミ評価スコア</span>
          <span className="wm wm-11">予約ペース (Pacing)</span>
          <span className="wm wm-12">営業利益率 (GOPPAR)</span>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="services-kicker">FLOW</p>
          <h2>ご利用開始まで</h2>
          <div className="timeline">
            {[
              ['まずはご相談', '「どこまで任せられるのか知りたい」「複数OTAの管理を整理したい」といった段階でも構いません。'],
              ['現状確認', '施設ごとに異なる販売状況・客室構成を踏まえ、現在のOTA運用状況を無料で確認いたします。'],
              ['ご提案・ご契約', 'お任せいただく業務範囲を確認したうえで、最適なプラン・契約条件（初期無料期間など）をご提案します。'],
              ['運用開始', '面倒なOTA実務をInnBuddyに引き継ぎ、本来の業務に集中できる環境がスタートします。'],
            ].map(([t, d], i) => (
              <div className="timeline-item" key={t}>
                <div className="timeline-left">
                  <WorkflowIcon index={i} />
                  <b>0{i + 1}</b>
                </div>
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
        <div className="pricing-bg-left" aria-hidden="true">
          <img src="/library/ota/pricing-left.jpg" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="pricing-bg-right" aria-hidden="true">
          <img src="/library/ota/pricing-right.jpg" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="wrap pricing-center-wrap">
          <p className="section-kicker">PLANS &amp; TERMS</p>
          <h2>料金・契約条件</h2>
          <p className="pricing-lead-text">
            各施設様の規模や現状の課題に応じて、<br />
            <strong>月額固定</strong> もしくは <strong>成果報酬</strong> にて最適なプランをご提案します。
          </p>
          <div className="offer">
            <div className="offer-inner-border">
              <div className="offer-badge-wrap">
                <span className="label">LIMITED OFFER</span>
              </div>
              <p>
                現在、限定3社様に<br />
                <strong>「初月無料&amp;1ヶ月契約」</strong>から<br />
                使用できる特別プランもご提案しております。
              </p>
            </div>
          </div>
          <div className="offer-cta-wrap">
            <a
              href="https://innbuddy-japan.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="offer-campaign-btn"
            >
              特別キャンペーン希望の方はこちらからご連絡ください <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="light section faq">
        <div className="wrap narrow">
          <p className="services-kicker">FAQ</p>
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
        <div className="wrap">
          <div className="contact-grid-split">
            <div className="contact-split-left">
              <p className="section-kicker">CONTACT</p>
              <h2>
                「今のOTA運用、<br />
                どこまで任せられる?」<br />
                <span>からでも構いません。</span>
              </h2>
              <p>
                現在の運用状況をお聞きし、InnBuddyで対応できる業務範囲や改善の方向性をご説明します。<br />
                右のボタンからお気軽にご相談ください。
              </p>
            </div>
            <div className="contact-split-right">
              <a
                href="https://innbuddy-japan.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="huge-contact-cta-v2"
              >
                <div className="contact-lounge-bg-img" aria-hidden="true" />
                <div className="contact-lounge-scrim" aria-hidden="true" />
                <div className="huge-cta-v2-inner">
                  <span className="huge-cta-v2-badge">FREE OTA CHECK</span>
                  <h3 className="huge-cta-v2-title">
                    あなたの宿のOTA運用、<br />
                    無料チェックします。
                  </h3>
                  <div className="huge-cta-v2-checklist">
                    <p className="huge-cta-v2-checklist-head">無料相談・面談でお伝えすること</p>
                    <ul>
                      <li>現在の掲載状況</li>
                      <li>料金・プラン設定</li>
                      <li>海外OTAの活用余地</li>
                      <li>改善できるポイント</li>
                    </ul>
                  </div>
                  <span className="huge-cta-v2-action">
                    無料チェック・お問い合わせへ <Arrow />
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* 関連特設ページリンク */}
          <div className="contact-special-pills">
            <a
              href="https://innbuddy-japan.com/inbound/"
              target="_blank"
              rel="noopener noreferrer"
              className="special-pill-btn special-pill-inbound"
            >
              <div className="special-pill-text">
                <span className="special-pill-kicker">INBOUND SUPPORT</span>
                <strong>インバウンド集客・受入対策ページ</strong>
                <small>訪日外国人客の集客から現場オペレーションをサポート</small>
              </div>
              <span className="special-pill-arrow" aria-hidden="true">→</span>
            </a>
            <a
              href="https://innbuddy-japan.com/halal/"
              target="_blank"
              rel="noopener noreferrer"
              className="special-pill-btn special-pill-halal"
            >
              <div className="special-pill-text">
                <span className="special-pill-kicker">HALAL / MUSLIM FRIENDLY</span>
                <strong>ハラル・ムスリム対応特設ページ</strong>
                <small>成長するムスリム旅行者市場の受入体制づくりをサポート</small>
              </div>
              <span className="special-pill-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="ota-footer-new">
        <div className="ota-footer-wrap">
          <div className="ota-footer-brand-row">
            <div className="ota-footer-logo">InnBuddy</div>
            <span className="ota-footer-tag">ABOUT INNBUDDY</span>
          </div>
          <p className="ota-footer-desc">
            InnBuddyは、ホテル・旅館のオンライン販売を支援するサービスです。<br />
            OTA運用を中心に、施設ごとの課題や販売状況を理解しながら、必要なサポートを行っています。
          </p>
          <p className="ota-footer-vision">
            目指すのは、<strong>「越境三方よし」</strong>の支援。<br />
            宿も、地域も、お客様も大満足する未来のために、<br />
            私たちにしかできない唯一のサービス価値を追求します。
          </p>
          <div className="ota-footer-links-row">
            <div className="ota-footer-links-group">
              <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer">
                InnBuddyブランドサイトへ
              </a>
              <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer">
                私たちについて
              </a>
              <a href="https://innbuddy-japan.com/inbound/" target="_blank" rel="noopener noreferrer">
                インバウンド対応
              </a>
              <a href="https://innbuddy-japan.com/halal/" target="_blank" rel="noopener noreferrer">
                ハラル対応
              </a>
              <Link href="/ota/articles">OTA記事一覧</Link>
              <a href="https://innbuddy-japan.com/contact/" target="_blank" rel="noopener noreferrer">
                お問い合わせ
              </a>
            </div>
            <span className="ota-footer-copy">InnBuddy All rights reserved.</span>
          </div>
        </div>
      </footer>

      <div className="h-[92px] md:hidden"></div>
      <MobileBottomNav onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />
    </main>
  )
}

/* =========================================================
   InnBuddy価格表ダウンロードモーダル
========================================================= */
const INBOUND_RATIO_OPTIONS = [
  'ほぼいない (0~5%)',
  '10%前後',
  '20~30%',
  '40~50%',
  '50%以上',
  '把握していない',
]

const NATIONALITY_OPTIONS = [
  '中国',
  '台湾',
  '韓国',
  '香港',
  'アメリカ',
  'オーストラリア',
  'ロシア',
  '東南アジア',
  'ヨーロッパ',
  '中東地域',
  '中南米',
  'その他',
]

function PriceListDownloadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [facilityName, setFacilityName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [inboundRatio, setInboundRatio] = useState('')
  const [nationalities, setNationalities] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const PRICE_LIST_PDF_URL = '/library/ota/innbuddy-price-list.pdf'

  const toggleNationality = (country: string) => {
    setNationalities((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    )
  }

  const triggerDownload = () => {
    const link = document.createElement('a')
    link.href = PRICE_LIST_PDF_URL
    link.download = 'InnBuddy_PriceList.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setErrorMessage('')
    try {
      await submitDiagnostic({
        diagnosticType: 'download',
        downloadType: 'ota',
        facilityName,
        contactName,
        email,
        phone,
        address,
        ratio: inboundRatio,
        nationalities: nationalities.join(', '),
      } as unknown as LeadFormData)
      setDone(true)
      triggerDownload()
    } catch (error) {
      console.error('価格表ダウンロードの送信に失敗しました:', error)
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setSending(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200000] flex items-center justify-center bg-[#183654]/65 backdrop-blur-sm p-3 sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="price-dl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="price-dl-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="price-dl-close"
          onClick={onClose}
          aria-label="閉じる"
        >
          ×
        </button>

        <div className="price-dl-header">
          <p className="price-dl-kicker">DOWNLOAD</p>
          <h2 id="price-dl-title" className="price-dl-title">
            InnBuddy価格表ダウンロード
          </h2>
        </div>

        {done ? (
          <div className="price-dl-done" role="status" aria-live="polite">
            <h3>ダウンロードありがとうございます</h3>
            <p>
              入力いただいたメールアドレス宛にもご案内をお送りしております。<br />
              自動でダウンロードが開始されない場合は、下のボタンから取得してください。
            </p>
            <div className="price-dl-done-actions">
              <a
                href={PRICE_LIST_PDF_URL}
                download="InnBuddy_PriceList.pdf"
                className="price-dl-submit-btn"
              >
                価格表PDFをもう一度ダウンロード
              </a>
              <button
                type="button"
                onClick={onClose}
                className="price-dl-close-text-btn"
              >
                閉じる
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="price-dl-form">
            <div className="price-dl-grid-2">
              <div className="price-dl-field">
                <label htmlFor="dl-facility">
                  施設名 <span>*</span>
                </label>
                <input
                  id="dl-facility"
                  type="text"
                  required
                  placeholder="例: ホテル インバディ"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                />
              </div>
              <div className="price-dl-field">
                <label htmlFor="dl-contact">
                  ご担当者名 <span>*</span>
                </label>
                <input
                  id="dl-contact"
                  type="text"
                  required
                  placeholder="例: 旅行 太郎"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
            </div>

            <div className="price-dl-grid-2">
              <div className="price-dl-field">
                <label htmlFor="dl-email">
                  メールアドレス <span>*</span>
                </label>
                <input
                  id="dl-email"
                  type="email"
                  required
                  placeholder="example@innbuddy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="price-dl-field">
                <label htmlFor="dl-phone">
                  電話番号 <span>*</span>
                </label>
                <input
                  id="dl-phone"
                  type="tel"
                  required
                  placeholder="03-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="price-dl-grid-2">
              <div className="price-dl-field">
                <label htmlFor="dl-address">
                  ご住所 <span>*</span>
                </label>
                <input
                  id="dl-address"
                  type="text"
                  required
                  placeholder="例: 東京都渋谷区○○1-2-3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="price-dl-field">
                <label htmlFor="dl-ratio">
                  外国人宿泊比率 <span>*</span>
                </label>
                <select
                  id="dl-ratio"
                  required
                  value={inboundRatio}
                  onChange={(e) => setInboundRatio(e.target.value)}
                >
                  <option value="">選択してください</option>
                  {INBOUND_RATIO_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="price-dl-field">
              <label>ここ1年で利用されたお客様の国籍（複数選択可）</label>
              <div className="price-dl-checkbox-box">
                {NATIONALITY_OPTIONS.map((country) => (
                  <label key={country} className="price-dl-check-item">
                    <input
                      type="checkbox"
                      checked={nationalities.includes(country)}
                      onChange={() => toggleNationality(country)}
                    />
                    <span>{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {errorMessage && (
              <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-md p-3">
                {errorMessage}
              </p>
            )}

            <button type="submit" disabled={sending} className="price-dl-submit-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {sending ? '送信中...' : 'InnBuddy価格表をダウンロード'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* =========================================================
   無料診断モーダル + LeadCaptureForm
========================================================= */
const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

type LeadCaptureFormProps = {
  diagnosticType: 'revenue' | 'hiring' | 'contact'
  payload: Record<string, any>
  onClose: () => void
}

function LeadCaptureForm({ diagnosticType, payload, onClose }: LeadCaptureFormProps) {
  const [form, setForm] = useState({
    facilityName: '',
    prefecture: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setErrorMessage('')
    try {
      await submitDiagnostic({
        ...form,
        diagnosticType,
        payload,
      } as LeadFormData)
      setDone(true)
    } catch (error) {
      console.error('無料診断の送信に失敗しました:', error)
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <p className="font-serif text-2xl text-[#183654] mb-4">送信完了</p>
        <p className="text-sm text-[#183654]/70 mb-8">担当者よりご連絡いたします。</p>
        <button
          type="button"
          onClick={onClose}
          className="text-sm underline text-[#183654] min-h-11 px-4"
        >
          閉じる
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="border-t border-[#dce3ea] pt-6 mt-6">
        <p className="text-xs tracking-[0.18em] text-[#d97724] font-bold mb-2">NEXT STEP</p>
        <h3 className="font-serif text-xl text-center mb-2 font-bold text-[#183654]">
          診断結果を担当者に共有する
        </h3>
        <p className="text-sm text-center leading-6 text-[#183654]/70 mb-5">
          入力内容とシミュレーション結果を送信すると、担当者からご連絡いたします。
        </p>
      </div>
      <div>
        <label htmlFor="lead-facility-name" className="block text-xs text-[#183654]/75 mb-1">
          施設名 *
        </label>
        <input
          id="lead-facility-name"
          type="text"
          required
          value={form.facilityName}
          onChange={(e) => setForm({ ...form, facilityName: e.target.value })}
          className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
          autoComplete="organization"
        />
      </div>
      <div>
        <label htmlFor="lead-prefecture" className="block text-xs text-[#183654]/75 mb-1">
          都道府県 *
        </label>
        <select
          id="lead-prefecture"
          required
          value={form.prefecture}
          onChange={(e) => setForm({ ...form, prefecture: e.target.value })}
          className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="lead-contact-name" className="block text-xs text-[#183654]/75 mb-1">
          担当者名 *
        </label>
        <input
          id="lead-contact-name"
          type="text"
          required
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="lead-email" className="block text-xs text-[#183654]/75 mb-1">
          メールアドレス *
        </label>
        <input
          id="lead-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="block text-xs text-[#183654]/75 mb-1">
          電話番号(任意)
        </label>
        <input
          id="lead-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
          autoComplete="tel"
        />
      </div>
      {errorMessage && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-md p-3">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="w-full min-h-12 bg-[#183654] text-white font-medium py-3 px-4 text-sm tracking-widest hover:bg-[#244c73] transition-colors disabled:opacity-50 disabled:cursor-wait rounded-md"
      >
        {sending ? '送信中...' : '診断結果を送信する'}
      </button>
      <p className="text-xs text-center leading-5 text-[#183654]/55">
        送信すると、入力内容と診断結果が送信先に共有されます。
      </p>
    </form>
  )
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

const otaOptions = [
  '自社WEB', '楽天トラベル', 'じゃらん', '一休', 'Yahoo!トラベル', 'るるぶトラベル',
  'Booking.com', 'Expedia', 'Agoda', 'Airbnb', 'Hotels.com', 'Trip.com',
  'Meituan', 'Fliggy', 'Qunar', 'Klook', 'KKday', 'Traveloka', 'MakeMyTrip', 'その他',
]

function RevenueDiagnosticModal({ isOpen, onClose }: Props) {
  const [totalRooms, setTotalRooms] = useState('')
  const [adr, setAdr] = useState('')
  const [occ, setOcc] = useState(50)
  const [selectedOta, setSelectedOta] = useState<string[]>([])
  const [primaryOta, setPrimaryOta] = useState('')
  const [primaryOtaShare, setPrimaryOtaShare] = useState('')
  const [adrUp, setAdrUp] = useState(500)
  const [occUp, setOccUp] = useState(5)
  const [showResult, setShowResult] = useState(false)

  const toggleOta = (ota: string) => {
    setSelectedOta((prev) =>
      prev.includes(ota) ? prev.filter((o) => o !== ota) : prev.length < 3 ? [...prev, ota] : prev
    )
  }

  const handleSubmit = () => {
    if (!totalRooms || !adr || !primaryOta) return
    setShowResult(true)
  }

  const currentADR = adr ? parseInt(adr, 10) : 0
  const currentOCC = occ
  const newOCC = Math.min(100, currentOCC + occUp)
  const newADR = currentADR + adrUp
  const currentAnnualRevenue = totalRooms
    ? parseInt(totalRooms, 10) * 365 * (currentOCC / 100) * currentADR
    : 0
  const newAnnualRevenue = totalRooms
    ? parseInt(totalRooms, 10) * 365 * (newOCC / 100) * newADR
    : 0
  const annualUpAmount = newAnnualRevenue - currentAnnualRevenue
  const formattedUpAmount = Math.round(annualUpAmount).toLocaleString('ja-JP')

  const handleBack = () => {
    if (showResult) setShowResult(false)
    else onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200000] flex items-center justify-center bg-[#183654]/60 backdrop-blur-sm p-3 sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative bg-[#f9f8f6] text-left w-full max-w-2xl max-h-[92dvh] overflow-y-auto p-5 sm:p-8 md:p-12 rounded-xl shadow-2xl border border-[#dce3ea]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ota-diagnostic-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-[#183654]/70 hover:text-[#183654] transition-colors min-h-11"
            >
              {showResult ? '← 入力画面に戻る' : '← 前のページに戻る'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="診断を閉じる"
              className="text-2xl leading-none text-[#183654]/60 hover:text-[#183654] w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#183654]/5"
            >
              ×
            </button>
          </div>

          {!showResult ? (
            <div className="space-y-7">
              <div className="border-b border-[#dce3ea] pb-5">
                <p className="text-xs tracking-[0.2em] uppercase text-[#d97724] font-bold mb-2">
                  Free Revenue Diagnosis
                </p>
                <h2
                  id="ota-diagnostic-title"
                  className="font-serif font-light text-2xl md:text-3xl text-[#183654]"
                >
                  売上期待値測定
                </h2>
                <p className="text-sm text-[#183654]/70 mt-2">
                  現在の施設情報を入力して、売上改善の可能性をシミュレーションします。
                </p>
              </div>

              <div>
                <label htmlFor="diag-total-rooms" className="block text-sm text-[#183654]/80 mb-1">
                  総客室数
                </label>
                <input
                  id="diag-total-rooms"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={totalRooms}
                  onChange={(e) => setTotalRooms(e.target.value)}
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
                  placeholder="例: 15"
                />
              </div>

              <div>
                <label htmlFor="diag-adr" className="block text-sm text-[#183654]/80 mb-1">
                  現在のADR (客室単価・円)
                </label>
                <input
                  id="diag-adr"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={adr}
                  onChange={(e) => setAdr(e.target.value)}
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
                  placeholder="例: 18000"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="diag-occ" className="block text-sm text-[#183654]/80">
                    現在の稼働率
                  </label>
                  <span className="text-sm font-semibold text-[#183654]">{occ}%</span>
                </div>
                <input
                  id="diag-occ"
                  type="range"
                  min="0"
                  max="100"
                  value={occ}
                  onChange={(e) => setOcc(parseInt(e.target.value, 10))}
                  className="w-full accent-[#183654]"
                />
                <div className="flex justify-between text-xs text-[#183654]/50">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#183654]/80 mb-3">
                  メイン利用OTA (最大3つ)
                </label>
                <div className="flex flex-wrap gap-2">
                  {otaOptions.map((ota) => (
                    <button
                      type="button"
                      key={ota}
                      aria-pressed={selectedOta.includes(ota)}
                      onClick={() => toggleOta(ota)}
                      className={`min-h-9 px-3 py-2 text-xs border rounded-full transition-all ${
                        selectedOta.includes(ota)
                          ? 'border-[#183654] bg-[#183654] text-white font-semibold'
                          : 'border-[#cbd5e1] bg-white/80 text-[#183654]/75 hover:border-[#183654]/60'
                      }`}
                    >
                      {ota}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#183654]/55 mt-2">選択中: {selectedOta.length}/3</p>
              </div>

              <div>
                <label htmlFor="diag-primary-ota" className="block text-sm text-[#183654]/80 mb-1">
                  一番予約数の多いOTA
                </label>
                <select
                  id="diag-primary-ota"
                  value={primaryOta}
                  onChange={(e) => setPrimaryOta(e.target.value)}
                  className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
                >
                  <option value="">選択してください</option>
                  {otaOptions.map((ota) => (
                    <option key={ota} value={ota}>
                      {ota}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="diag-ota-share" className="block text-sm text-[#183654]/80 mb-1">
                  そのOTAの売上構成比(%)
                </label>
                <input
                  id="diag-ota-share"
                  type="number"
                  min="0"
                  max="100"
                  inputMode="numeric"
                  value={primaryOtaShare}
                  onChange={(e) => setPrimaryOtaShare(e.target.value)}
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="w-full border-b border-[#cbd5e1] bg-transparent py-3 text-[#183654] focus:outline-none focus:border-[#183654]"
                  placeholder="例: 45"
                />
              </div>

              <div className="pt-6 border-t border-[#dce3ea]">
                <p className="text-sm text-[#183654]/80 mb-4 font-semibold">改善シミュレーション</p>
                <div className="mb-5">
                  <label htmlFor="diag-adr-up" className="block text-xs mb-2 text-[#183654]/75">
                    ADR上昇額: <strong>+{adrUp.toLocaleString()}円</strong>
                  </label>
                  <input
                    id="diag-adr-up"
                    type="range"
                    min="0"
                    max="30000"
                    step="100"
                    value={adrUp}
                    onChange={(e) => setAdrUp(parseInt(e.target.value, 10))}
                    className="w-full accent-[#d97724]"
                  />
                </div>
                <div>
                  <label htmlFor="diag-occ-up" className="block text-xs mb-2 text-[#183654]/75">
                    稼働率上昇: <strong>+{occUp}%</strong>
                  </label>
                  <input
                    id="diag-occ-up"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={occUp}
                    onChange={(e) => setOccUp(parseInt(e.target.value, 10))}
                    className="w-full accent-[#d97724]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  !totalRooms || Number(totalRooms) <= 0 || !adr || Number(adr) < 0 || !primaryOta
                }
                className="w-full min-h-12 bg-[#183654] text-white font-medium rounded-md py-3 px-4 text-sm tracking-widest hover:bg-[#244c73] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                シミュレーション結果を見る
              </button>
            </div>
          ) : (
            <div className="text-center pt-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#d97724] font-bold mb-3">
                Your Revenue Potential
              </p>
              <div className="py-8 sm:py-10 space-y-4">
                <p className="text-4xl sm:text-5xl font-light text-[#183654] break-words">
                  +{formattedUpAmount}円
                </p>
                <p className="text-lg text-[#183654] font-semibold">年間売上UP(試算)</p>
                <p className="text-sm text-[#183654]/65">
                  稼働率+{occUp}% / ADR +{adrUp.toLocaleString()}円
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto pt-2">
                  <div className="rounded-lg border border-[#dce3ea] bg-white p-4">
                    <p className="text-xs text-[#183654]/60 mb-1">現在の年間売上 (概算)</p>
                    <p className="text-lg font-semibold text-[#183654]">
                      {Math.round(currentAnnualRevenue).toLocaleString('ja-JP')}円
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#d97724]/40 bg-white p-4">
                    <p className="text-xs text-[#183654]/60 mb-1">改善後の年間売上 (概算)</p>
                    <p className="text-lg font-semibold text-[#d97724]">
                      {Math.round(newAnnualRevenue).toLocaleString('ja-JP')}円
                    </p>
                  </div>
                </div>
                <p className="text-xs leading-6 text-[#183654]/55">
                  ※入力値をもとにした簡易試算です。実際の売上を保証するものではありません。
                </p>
              </div>
              <LeadCaptureForm
                diagnosticType="revenue"
                payload={{
                  totalRooms,
                  adr,
                  occ,
                  selectedOta,
                  primaryOta,
                  primaryOtaShare,
                  adrUp,
                  occUp,
                  result: {
                    annualUpAmount,
                    formattedUpAmount,
                    currentAnnualRevenue,
                    newAnnualRevenue,
                  },
                }}
                onClose={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}