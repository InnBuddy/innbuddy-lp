'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Calendar,
  DollarSign,
  Layers,
  Megaphone,
  Image as ImageIcon,
  Star,
  MessageSquare,
  TrendingUp,
  Search,
  Users,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Sparkles,
  ShieldCheck,
  Globe,
  BookOpen
} from 'lucide-react'

// 11の業務データ
const scopeItems = [
  {
    id: 1,
    icon: Building2,
    title: 'アカウント・掲載情報',
    tag: '基盤構築',
    desc: 'OTA各社（楽天、じゃらん、一休、Booking.com、Expedia等）の管理画面設定、施設基本情報、客室情報、設備・サービス情報の最適化・最新化を行います。',
    details: [
      '施設概要・アピールポイントのブラッシュアップ',
      '客室タイプ・アメニティ情報の正確な掲載',
      'キャンセルポリシー・注意事項の明記',
      'チェックイン・アウト等オペレーション情報の整備'
    ]
  },
  {
    id: 2,
    icon: Calendar,
    title: '宿泊プラン',
    tag: '販売戦略',
    desc: 'ターゲット層や季節に合わせた魅力的なプランの企画・作成・販売停止・期間設定まで一貫して行います。',
    details: [
      '季節限定プラン・早期予約特典プランの設計',
      'ファミリー・カップル・ビジネス等セグメント別プラン',
      '食事条件（朝食付・2食付・素泊まり）のバリエーション構築',
      'プランタイトルのSEO・キーワード最適化'
    ]
  },
  {
    id: 3,
    icon: DollarSign,
    title: '料金設定',
    tag: '収益最大化',
    desc: '日々の需要動向、競合価格、自施設の稼働状況を分析し、最適な宿泊料金への調整（レベニューマネジメント）を行います。',
    details: [
      '平日・休前日・ハイシーズンのダイナミックプライシング',
      '直前割引・直前料金のコントロール',
      '競合施設の価格動向モニタリング',
      '最低宿泊料金・会員限定価格の設定'
    ]
  },
  {
    id: 4,
    icon: Layers,
    title: '客室・在庫管理',
    tag: '稼働率向上',
    desc: 'サイトコントローラー（Beds24、TL-リンカーン、手間いらず等）を活用し、売り越しや在庫の滞留を防ぎながら稼働率を最大化します。',
    details: [
      '各OTAへの客室在庫の最適配分',
      '連泊制限・最低宿泊日数（ミニマムステイ）の調整',
      '直前キャンセルの即時再販設定',
      'オーバーブッキング防止策の徹底'
    ]
  },
  {
    id: 5,
    icon: Megaphone,
    title: 'キャンペーン・特集',
    tag: '露出強化',
    desc: '楽天スーパーSALE、じゃらんのお得な10日間、Booking.com Geniusプログラムなど、各OTAのセール・特集への参画を管理します。',
    details: [
      '各OTAのセールスケジュールの把握と参画エントリー',
      '特集ページへの露出枠の確保',
      '割引原資と利益率のバランス調整',
      'セール終了後の効果測定と検証'
    ]
  },
  {
    id: 6,
    icon: ImageIcon,
    title: '画像・ビジュアル',
    tag: '成約率UP',
    desc: '写真の選定、並び替え、キャプション設定を行い、旅行者の離脱を防ぎ「泊まりたい」と思わせるビジュアルを構築します。',
    details: [
      'メイン画像・客室画像の優先順位最適化',
      '料理・風呂・施設周辺の魅力的な写真構成',
      '多言語対応を意識した写真選定',
      '画像ごとの説明文（キャプション）の充実'
    ]
  },
  {
    id: 7,
    icon: Star,
    title: '口コミ・レビュー',
    tag: '信頼性向上',
    desc: '全OTAに届く口コミの返信代行・返信文テンプレート作成、低評価レビューへの迅速な対応と現場への改善フィードバックを行います。',
    details: [
      '高評価への感謝と再訪を促す丁寧な返信',
      'クレーム・低評価への誠実かつ的確な対応文作成',
      '18言語対応によるインバウンド客への母国語返信',
      '口コミから見える現場の課題レポート共有'
    ]
  },
  {
    id: 8,
    icon: MessageSquare,
    title: 'メッセージ・問い合わせ',
    tag: '顧客体験',
    desc: '宿泊前・宿泊後のゲストからの問い合わせ対応、自動送信メッセージ（ウェルカムメール・サンクスメール）の設定を行います。',
    details: [
      'チェックイン手順・アクセス案内の自動配信',
      '多言語での定型メッセージテンプレート構築',
      '特別リクエスト（アレルギー、記念日等）の確認連携',
      '忘れ物やチェックアウト後のフォロー対応'
    ]
  },
  {
    id: 9,
    icon: TrendingUp,
    title: '販売状況分析',
    tag: 'データ経営',
    desc: '予約実績、客室単価（ADR）、RevPAR、キャンセル率などのデータを分析し、改善ポイントを可視化します。',
    details: [
      '週次・月次の売上・稼働率・単価レポート作成',
      'リードタイム（予約から宿泊までの期間）の分析',
      '販売チャネル（OTA別）のシェア・費用対効果検証',
      '翌月・翌々月の予約ペース（オンハンド）の把握'
    ]
  },
  {
    id: 10,
    icon: Search,
    title: '競合・市場調査',
    tag: '差別化',
    desc: 'エリア内の競合施設の販売動向、地域イベント、季節要因を定点観測し、自施設が埋もれないポジショニングを保ちます。',
    details: [
      '競合施設のプラン・価格・打ち出し方の定期調査',
      '地域イベント・コンサート・学会等の日程・需要把握',
      'OTA内での自施設の検索順位モニタリング',
      '競合との差別化ポイントの再定義'
    ]
  },
  {
    id: 11,
    icon: Users,
    title: '報告・ミーティング',
    tag: '伴走体制',
    desc: '月1回の定例ミーティングとチャットツール（LINE、Slack等）での日常的な連絡により、現場と一体となった運用体制を築きます。',
    details: [
      '月次報告書に基づく実績の振り返りと次月方針の共有',
      '現場スタッフ様とのチャットによる迅速な質疑応答',
      '急な空室対策やトラブル時の緊急対応相談',
      '中長期的な改装・設備投資に関する相談'
    ]
  }
]

// 宿が直面する課題
const challenges = [
  {
    number: '01',
    title: '人手不足で手が回らない',
    desc: '日々の接客や清掃、仕込みに追われ、プラン作成や料金変更、口コミ返信が後回しになり、販売機会を逃していませんか？'
  },
  {
    number: '02',
    title: 'OTAごとの特性がわからない',
    desc: '楽天、じゃらん、一休、Booking.com…それぞれのユーザー層やアルゴリズムの違いが分からず、同じ内容をただ載せていませんか？'
  },
  {
    number: '03',
    title: 'インバウンドを取り込めない',
    desc: '訪日旅行者が急増する中、英語での情報発信や海外OTAの設定、外国語の口コミ対応にハードルを感じていませんか？'
  },
  {
    number: '04',
    title: '売上はあるのに利益が残らない',
    desc: 'ただ稼働率を上げるために値引きを続け、手数料とコストばかりがかさんで手元に利益が残らない悪循環に陥っていませんか？'
  }
]

// InnBuddyが選ばれる理由
const reasons = [
  {
    title: '300施設以上の支援実績',
    desc: '大手OTA出身者と旅行企画の専門家が、豊富なデータと成功パターンを元に、貴施設に最適な運用プランをご提案します。'
  },
  {
    title: '「利益が残る」運用設計',
    desc: '安売りに頼る稼働アップではなく、施設の独自性を引き出し、適正な単価で選ばれる「高収益構造」への転換を目指します。'
  },
  {
    title: 'インバウンド対応の強み',
    desc: '海外3カ国居住・80カ国渡航経験と18言語対応ツールを駆使し、海外OTAでの露出と評価を飛躍的に向上させます。'
  },
  {
    title: '現場目線の伴走体制',
    desc: 'マニュアル通りの代行ではなく、施設の規模やスタッフ様の体制に合わせて柔軟に対応。日々のチャット相談も無制限です。'
  }
]

// 料金プラン
const plans = [
  {
    name: 'ライトプラン',
    target: '客室数 1〜5室 / 民泊・一棟貸し',
    price: '30,000',
    unit: '円 / 月〜',
    features: [
      '主要OTA（2〜3社）の運用代行',
      '在庫・料金の定期調整',
      '基本口コミ返信代行',
      'チャットによる日常相談'
    ],
    highlight: false
  },
  {
    name: 'スタンダードプラン',
    target: '客室数 6〜20室 / 旅館・小規模ホテル',
    price: '70,000',
    unit: '円 / 月〜',
    features: [
      '国内・海外主要OTA全対応',
      'プラン企画・作成・販売管理',
      'ダイナミックプライシング・競合調査',
      '18言語対応口コミ返信',
      '月次報告レポート＆オンライン定例会'
    ],
    highlight: true
  },
  {
    name: 'プレミアムプラン',
    target: '客室数 21室以上 / ホテル・リゾート',
    price: '150,000',
    unit: '円 / 月〜',
    features: [
      'OTA運用全般の完全代行',
      '高度なレベニューマネジメント',
      'サイトコントローラー完全連携',
      'インバウンド戦略・多言語ビジュアル設計',
      '月次定例会＋現場オペレーション改善支援'
    ],
    highlight: false
  }
]

// よくある質問
const faqItems = [
  {
    q: '現在使っているサイトコントローラーはそのまま使えますか？',
    a: 'はい、Beds24、TL-リンカーン、手間いらず、ねっぱん！など、現在ご利用中のシステムをそのまま活用して代行業務を行います。'
  },
  {
    q: '契約期間の縛りはありますか？',
    a: '最短3ヶ月からのご契約となります。成果を実感していただいた上で、中長期的なパートナーとして継続される施設様がほとんどです。'
  },
  {
    q: '小規模な宿や民泊でも依頼できますか？',
    a: 'もちろん可能です。1室の一棟貸しから100室超のホテルまで、規模に応じたプランをご用意しております。'
  },
  {
    q: '依頼してから運用開始までどのくらいかかりますか？',
    a: 'ヒアリングとお打ち合わせ後、最短1〜2週間程度で運用を開始できます。現在の設定状況に応じてスムーズに引き継ぎます。'
  },
  {
    q: '自社ホームページの予約システム（直販）も相談できますか？',
    a: 'はい、OTA運用だけでなく、OTAからの流入を活かした自社予約（直販）比率の向上についてもアドバイスや施策のご提案が可能です。'
  }
]

// 診断質問
const diagnosisQuestions = [
  {
    id: 1,
    question: '現在、自施設のOTA販売について、どれくらい時間を割けていますか？',
    options: [
      { text: '毎日1時間以上、しっかりデータを分析して調整している', score: 3 },
      { text: '週に数回、予約や料金を少し確認する程度', score: 2 },
      { text: 'ほとんど触れていない（放置状態）', score: 1 }
    ]
  },
  {
    id: 2,
    question: '競合施設の料金やプランの動向を定期的に把握していますか？',
    options: [
      { text: '毎週チェックし、自社の料金に反映させている', score: 3 },
      { text: 'たまに見るが、自社の料金はあまり変えていない', score: 2 },
      { text: '競合がいくらで売っているかほとんど知らない', score: 1 }
    ]
  },
  {
    id: 3,
    question: '外国人旅行者（インバウンド）の集客設定はどうしていますか？',
    options: [
      { text: '海外OTAに登録し、英語や写真も充実させている', score: 3 },
      { text: '一応登録はしているが、日本語を自動翻訳した程度', score: 2 },
      { text: '海外OTAは使っていない／やり方がわからない', score: 1 }
    ]
  },
  {
    id: 4,
    question: 'OTAに届く口コミへの返信はどのように行っていますか？',
    options: [
      { text: '全件に対して、個別の状況に合わせた丁寧な返信をしている', score: 3 },
      { text: '定型文をコピペして返信している／たまに返信する', score: 2 },
      { text: 'ほとんど返信していない', score: 1 }
    ]
  },
  {
    id: 5,
    question: '現在の宿泊単価（ADR）や売上について、どう感じていますか？',
    options: [
      { text: '目標通りに推移しており、満足している', score: 3 },
      { text: '稼働はしているが、もっと単価を上げられる気がする', score: 2 },
      { text: '稼働も単価も低く、改善の糸口が見えない', score: 1 }
    ]
  }
]

export default function OtaPage() {
  const [openItems, setOpenItems] = useState<number[]>([1])
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [diagnosisScore, setDiagnosisScore] = useState<number | null>(null)
  const [isDiagnosed, setIsDiagnosed] = useState(false)
  const [contactForm, setContactForm] = useState({
    facilityName: '',
    contactName: '',
    email: '',
    phone: '',
    roomCount: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
  }

  const calculateScore = () => {
    if (Object.keys(answers).length < diagnosisQuestions.length) {
      alert('すべての質問にお答えください。')
      return
    }
    const total = Object.values(answers).reduce((acc, cur) => acc + cur, 0)
    setDiagnosisScore(total)
    setIsDiagnosed(true)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          type: 'ota_consultation'
        })
      })

      if (res.ok) {
        setIsSubmitted(true)
      } else {
        alert('送信に失敗しました。時間をおいて再度お試しください。')
      }
    } catch (error) {
      console.error(error)
      alert('エラーが発生しました。')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ★ 11の業務の個別アコーディオンカード（共通コンポーネント化） ★
  const renderScopeItem = (item: (typeof scopeItems)[0]) => {
    const isOpen = openItems.includes(item.id)
    const Icon = item.icon
    return (
      <div
        key={item.id}
        className="bg-white rounded-lg border border-[#e8e4dc] overflow-hidden transition-all shadow-sm hover:shadow"
      >
        <button
          onClick={() => toggleItem(item.id)}
          className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors hover:bg-[#faf8f5] cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm font-bold text-[#e89c3a]">
              {String(item.id).padStart(2, '0')}
            </span>
            <Icon className="w-5 h-5 text-[#1b314b]" />
            <span className="font-bold text-[#1b314b] text-sm sm:text-base">
              {item.title}
            </span>
          </div>
          <span className="text-[#e89c3a] font-bold text-lg">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        {isOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-[#f0ece4] bg-[#fdfcf9] animate-in fade-in duration-200">
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-3">
              {item.desc}
            </p>
            <div className="space-y-1.5">
              {item.details.map((d, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#666]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e89c3a]" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#222] font-sans pb-20 md:pb-0">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1b314b]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-serif font-bold text-lg sm:text-xl tracking-wider">
            InnBuddy <span className="text-xs sm:text-sm font-sans font-normal text-[#e89c3a]">OTA</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#scope" className="hidden sm:inline-block text-xs sm:text-sm text-white/80 hover:text-white transition-colors">
            サポート内容
          </a>
          <a href="#plans" className="hidden sm:inline-block text-xs sm:text-sm text-white/80 hover:text-white transition-colors">
            料金プラン
          </a>
          <a
            href="#contact"
            className="bg-[#e89c3a] hover:bg-[#d48b28] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded transition-colors shadow flex items-center gap-1.5"
          >
            <span>相談する</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#1b314b] via-[#2d527c] to-[#e89c3a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <span className="inline-block bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 text-[#ffd499] border border-white/20">
            OTA OPERATION SERVICE
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight sm:leading-tight mb-6">
            売上を伸ばし、利益を残す。
            <br />
            宿のためのOTA運用代行。
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/85 leading-relaxed mb-8">
            プラン作成、日々の料金調整、在庫配分、口コミ返信からインバウンド対策まで。
            大手OTA出身の専門チームが、貴施設のパートナーとして現場に伴走します。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-[#1b314b] hover:bg-[#15273c] text-white px-8 py-3.5 rounded font-bold text-sm sm:text-base shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
            >
              <span>OTA運用について相談する</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#diagnosis"
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-6 py-3.5 rounded font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
            >
              <span>無料現状診断はこちら</span>
            </a>
          </div>

          {/* ★ 3つのカード：スマホでは非表示（hidden）、PC（md以上）でのみ表示 ★ */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto text-left">
            <a
              href="https://innbuddy-japan.com/team"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-lg border border-white/20 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center text-xs text-[#ffd499] mb-1 font-mono">
                <span>01</span>
                <span>ABOUT US</span>
              </div>
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>InnBuddyとは？</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">↗</span>
              </h3>
            </a>

            <a
              href="#diagnosis"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-lg border border-white/20 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center text-xs text-[#ffd499] mb-1 font-mono">
                <span>02</span>
                <span className="bg-[#e89c3a] text-white text-[10px] px-1.5 py-0.2 rounded font-sans">RECOMMENDED</span>
              </div>
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>無料診断で現状を把握しよう</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">↓</span>
              </h3>
            </a>

            <a
              href="https://innbuddy-japan.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-lg border border-white/20 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center text-xs text-[#ffd499] mb-1 font-mono">
                <span>03</span>
                <span>CONTACT</span>
              </div>
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>ご相談・お問い合わせ</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">↗</span>
              </h3>
            </a>
          </div>
        </div>
      </section>

      {/* CHALLENGES SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#e89c3a] uppercase block mb-2 font-mono">
            COMMON PROBLEMS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1b314b]">
            こんなお悩みはありませんか？
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#666] max-w-xl mx-auto">
            多くの宿泊施設様が、現場の忙しさと専門性の高さからOTA運用の課題を抱えています。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {challenges.map((c) => (
            <div key={c.number} className="bg-white p-6 sm:p-8 rounded-xl border border-[#e8e4dc] shadow-sm flex gap-5 items-start">
              <span className="font-serif text-3xl font-bold text-[#e89c3a] shrink-0 leading-none">
                {c.number}
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-[#1b314b] mb-2">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          ★ 11の業務セクション（スマホは01〜11順、PCは2列） ★
      ========================================================= */}
      <section id="scope" className="py-20 px-4 md:px-8 bg-[#fdfbf7] border-y border-[#ede9e1]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-widest text-[#e89c3a] uppercase block mb-2 font-mono">
              SERVICE SCOPE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1b314b]">
              InnBuddyが担当する11の業務
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#666] max-w-xl mx-auto">
              アカウント管理から分析・改善まで、OTA運用に必要なすべての実務を網羅してサポートします。
            </p>
          </div>

          {/* スマホ用：01〜11まで順番に1列で綺麗に並ぶ */}
          <div className="space-y-4 md:hidden">
            {scopeItems.map((item) => renderScopeItem(item))}
          </div>

          {/* PC用：奇数（左）と偶数（右）の2列 */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
            <div className="space-y-4">
              {scopeItems.filter((_, i) => i % 2 === 0).map((item) => renderScopeItem(item))}
            </div>
            <div className="space-y-4">
              {scopeItems.filter((_, i) => i % 2 !== 0).map((item) => renderScopeItem(item))}
            </div>
          </div>
        </div>
      </section>

      {/* REASONS SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#e89c3a] uppercase block mb-2 font-mono">
            OUR STRENGTHS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1b314b]">
            InnBuddyが選ばれる4つの理由
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="p-2.5 rounded-lg bg-[#e89c3a]/10 text-[#e89c3a] shrink-0 mt-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-[#1b314b] mb-2">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSIS SECTION */}
      <section id="diagnosis" className="py-20 px-4 md:px-8 bg-[#1b314b] text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#ffd499] uppercase block mb-2 font-mono">
              SELF CHECK
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
              3分でわかるOTA運用 無料診断
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-lg mx-auto">
              5つの質問に答えるだけで、貴施設の現在の運用課題と改善のポテンシャルを判定します。
            </p>
          </div>

          {!isDiagnosed ? (
            <div className="space-y-8 bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 backdrop-blur-sm">
              {diagnosisQuestions.map((q) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-bold text-sm sm:text-base flex items-start gap-2">
                    <span className="text-[#ffd499]">Q{q.id}.</span>
                    <span>{q.question}</span>
                  </p>
                  <div className="space-y-2 pl-6">
                    {q.options.map((opt, oIdx) => (
                      <label
                        key={oIdx}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          answers[q.id] === opt.score
                            ? 'bg-[#e89c3a] border-[#e89c3a] text-white font-medium'
                            : 'bg-white/10 border-white/15 hover:bg-white/15 text-white/90'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          value={opt.score}
                          checked={answers[q.id] === opt.score}
                          onChange={() => handleAnswer(q.id, opt.score)}
                          className="hidden"
                        />
                        <span className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center shrink-0">
                          {answers[q.id] === opt.score && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span className="text-xs sm:text-sm">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={calculateScore}
                className="w-full bg-[#e89c3a] hover:bg-[#d48b28] text-white font-bold py-4 rounded-lg shadow-lg transition-colors text-sm sm:text-base cursor-pointer mt-6"
              >
                診断結果を見る
              </button>
            </div>
          ) : (
            <div className="bg-white text-[#222] p-8 rounded-xl shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <span className="text-xs font-bold text-[#e89c3a] uppercase font-mono tracking-widest block">
                DIAGNOSIS RESULT
              </span>
              <h3 className="text-2xl font-bold font-serif text-[#1b314b]">
                あなたの宿のOTA運用スコア：{diagnosisScore} / 15 点
              </h3>

              <div className="p-4 bg-[#fdfaf5] rounded-lg border border-[#e89c3a]/20 text-left text-xs sm:text-sm leading-relaxed text-[#555]">
                {diagnosisScore! <= 8 && (
                  <p>
                    <strong>【改善ポテンシャル：大】</strong> 現在、販売機会の損失や安売りによる利益低下が起きている可能性が高い状態です。基本情報の見直しと料金・プランの整理を行うだけで、早期に売上・単価アップが見込めます。
                  </p>
                )}
                {diagnosisScore! > 8 && diagnosisScore! <= 12 && (
                  <p>
                    <strong>【改善ポテンシャル：中】</strong> 基本的な運用はできていますが、細かな需要予測（レベニューマネジメント）やインバウンド対応、口コミ対策を強化することで、さらに収益性を高められる余地があります。
                  </p>
                )}
                {diagnosisScore! > 12 && (
                  <p>
                    <strong>【改善ポテンシャル：洗練段階】</strong> 非常に高い水準で運用されています。今後は直販（自社予約）比率の向上や、リピーター施策、さらに高単価な限定プランの企画など、次のステップへの展開が有効です。
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#contact"
                  className="bg-[#1b314b] text-white font-bold py-3 px-6 rounded hover:bg-[#15273c] transition-colors text-xs sm:text-sm"
                >
                  詳細な分析レポート・改善プランを相談する
                </a>
                <button
                  onClick={() => setIsDiagnosed(false)}
                  className="text-xs text-[#888] underline hover:text-[#222]"
                >
                  もう一度診断する
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PLANS SECTION */}
      <section id="plans" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#e89c3a] uppercase block mb-2 font-mono">
            PRICING PLANS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1b314b]">
            明確で安心の月額固定プラン
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#666] max-w-xl mx-auto">
            成果報酬による手数料の肥大化を防ぎ、定額でしっかり伴走します。施設の規模に合わせてお選びいただけます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                p.highlight
                  ? 'bg-white border-[#e89c3a] shadow-xl ring-2 ring-[#e89c3a] relative'
                  : 'bg-white border-[#e8e4dc] shadow-sm'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e89c3a] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  MOST POPULAR
                </span>
              )}
              <div>
                <h3 className="font-bold text-lg text-[#1b314b] mb-1">{p.name}</h3>
                <p className="text-xs text-[#777] mb-4">{p.target}</p>
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <span className="text-3xl font-serif font-bold text-[#1b314b]">
                    ¥{p.price}
                  </span>
                  <span className="text-xs text-[#888] ml-1">{p.unit}</span>
                </div>
                <ul className="space-y-3 mb-6 text-xs text-[#555]">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e89c3a] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className={`w-full py-3 rounded text-center text-xs sm:text-sm font-bold transition-colors ${
                  p.highlight
                    ? 'bg-[#e89c3a] text-white hover:bg-[#d48b28]'
                    : 'bg-[#f4efe6] text-[#1b314b] hover:bg-[#e8e2d5]'
                }`}
              >
                このプランについて相談する
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 md:px-8 bg-[#fdfbf7] border-t border-[#ede9e1]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-widest text-[#e89c3a] uppercase block mb-2 font-mono">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1b314b]">
              よくあるご質問
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border border-[#e8e4dc]">
                <h3 className="font-bold text-sm sm:text-base text-[#1b314b] mb-2 flex items-start gap-2">
                  <span className="text-[#e89c3a]">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#e89c3a] uppercase block mb-2 font-mono">
            CONTACT US
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1b314b]">
            無料相談・お見積りのご依頼
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#666]">
            貴施設の現在の課題やご状況に合わせて、最適なサポートプランをご提案します。
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white p-8 rounded-xl border border-[#e8e4dc] text-center space-y-4 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-[#e89c3a] mx-auto" />
            <h3 className="text-xl font-bold text-[#1b314b]">送信が完了しました</h3>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
              お問い合わせいただき誠にありがとうございます。<br />
              担当者より24時間以内にご連絡させていただきます。
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-[#e8e4dc] shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#444] mb-1.5">
                  施設名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: ホテル インバディ"
                  value={contactForm.facilityName}
                  onChange={(e) => setContactForm({ ...contactForm, facilityName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#ccc] text-sm focus:outline-none focus:border-[#1b314b]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#444] mb-1.5">
                  ご担当者名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: 山田 太郎"
                  value={contactForm.contactName}
                  onChange={(e) => setContactForm({ ...contactForm, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#ccc] text-sm focus:outline-none focus:border-[#1b314b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#444] mb-1.5">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@innbuddy.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#ccc] text-sm focus:outline-none focus:border-[#1b314b]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#444] mb-1.5">
                  電話番号
                </label>
                <input
                  type="tel"
                  placeholder="03-1234-5678"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#ccc] text-sm focus:outline-none focus:border-[#1b314b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#444] mb-1.5">
                客室数
              </label>
              <input
                type="text"
                placeholder="例: 10室、一棟貸し2棟など"
                value={contactForm.roomCount}
                onChange={(e) => setContactForm({ ...contactForm, roomCount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded border border-[#ccc] text-sm focus:outline-none focus:border-[#1b314b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#444] mb-1.5">
                ご相談内容・現状の課題
              </label>
              <textarea
                rows={4}
                placeholder="例: 料金調整に手が回らない、Booking.comの設定を見直したい、などご自由にご記入ください。"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded border border-[#ccc] text-sm focus:outline-none focus:border-[#1b314b]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1b314b] hover:bg-[#15273c] text-white font-bold py-4 rounded text-sm sm:text-base shadow transition-colors cursor-pointer"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#152438] text-white py-12 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="font-serif font-bold text-xl block mb-1">InnBuddy OTA</span>
            <p className="text-xs text-white/50">宿泊施設の持続的な成長と収益最大化を支えるパートナー</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/70">
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">お問い合わせ</a>
            <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">私たちについて</a>
            <a href="https://innbuddy-japan.com/library" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ライブラリ</a>
            <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ブランドサイト</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © InnBuddy 2026 — All Rights Reserved.
        </div>
      </footer>

      {/* =========================================================
          ★ スマホ専用 アプリ風ボトムナビゲーション（6項目） ★
      ========================================================= */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#152438]/95 backdrop-blur-md border-t border-white/15 px-1 py-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_20px_rgba(0,0,0,0.5)]"
        aria-label="モバイル下部ナビゲーション"
      >
        <div className="grid grid-cols-6 items-center justify-around gap-0.5 text-center">
          
          {/* 1. 無料診断（最重要CTA：オレンジアクセント） */}
          <a
            href="#diagnosis"
            className="flex flex-col items-center justify-center py-1 text-[#f39c12] hover:text-[#f1c40f] transition-colors active:scale-95"
          >
            <Sparkles className="w-[17px] h-[17px] mb-1 shrink-0" />
            <span className="text-[9px] font-bold tracking-tight whitespace-nowrap">無料診断</span>
          </a>

          {/* 2. InnBuddyとは？ */}
          <a
            href="https://innbuddy-japan.com/team"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <Users className="w-[17px] h-[17px] mb-1 opacity-80 shrink-0" />
            <span className="text-[9px] font-medium tracking-tight whitespace-nowrap">チーム</span>
          </a>

          {/* 3. インバウンド */}
          <a
            href="https://innbuddy-japan.com/inbound"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <Globe className="w-[17px] h-[17px] mb-1 opacity-80 shrink-0" />
            <span className="text-[9px] font-medium tracking-tight whitespace-nowrap">インバウンド</span>
          </a>

          {/* 4. ハラル */}
          <a
            href="https://innbuddy-japan.com/halal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <ShieldCheck className="w-[17px] h-[17px] mb-1 opacity-80 shrink-0" />
            <span className="text-[9px] font-medium tracking-tight whitespace-nowrap">ハラル</span>
          </a>

          {/* 5. ライブラリ */}
          <a
            href="https://innbuddy-japan.com/library"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <BookOpen className="w-[17px] h-[17px] mb-1 opacity-80 shrink-0" />
            <span className="text-[9px] font-medium tracking-tight whitespace-nowrap">書庫</span>
          </a>

          {/* 6. 問い合わせ */}
          <a
            href="https://innbuddy-japan.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <Mail className="w-[17px] h-[17px] mb-1 opacity-80 shrink-0" />
            <span className="text-[9px] font-medium tracking-tight whitespace-nowrap">問合せ</span>
          </a>
        </div>
      </nav>

    </main>
  )
}