'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowRight, Menu, X, Globe, MessageSquare, Download,
  CheckCircle2, FileText, CheckSquare, Sparkles, BookOpen, Users, Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const slides = [
  { src: '/library/inbound/hero-fushimi.png', alt: '伏見稲荷の千本鳥居を歩く外国人旅行者' },
  { src: '/library/inbound/hero-dining.png', alt: '伝統的な日本料理を楽しむ外国人旅行者' },
  { src: '/library/inbound/hero-onsen.png', alt: '日本の温泉宿でくつろぐ外国人客' },
  { src: '/library/inbound/hero-market.png', alt: '日本の朝市を散策する家族' },
  { src: '/library/inbound/hero-tea.png', alt: '茶道体験を楽しむ外国人女性' },
  { src: '/library/inbound/hero-shibuya.png', alt: '渋谷のスクランブル交差点を歩く旅行者' },
  { src: '/library/inbound/hero-ryokan.png', alt: '旅館の和室で庭を眺める外国人カップル' },
]

const inboundBoxItems = [
  {
    title: '口コミ翻訳マニュアル (18言語対応)',
    shortTitle: '① 口コミ翻訳',
    icon: Globe,
    description: '英語・中国語（簡体・繁体）・韓国語はもちろん、タイ語・ベトナム語・フランス語・スペイン語など全18言語に対応。OTAやGoogleマップに届く外国語の口コミに対し、ネイティブに伝わる好印象な返信テンプレートと、評価を下げないクレーム対応の翻訳フレーズを網羅。現場スタッフが迷わずすぐ返信できます。'
  },
  {
    title: '接客指差しシート (イラスト付き)',
    shortTitle: '② 指差しシート',
    icon: MessageSquare,
    description: 'チェックイン、館内案内、大浴場のマナー、食事の希望確認、アレルギーの有無、緊急時の避難誘導など、宿の現場で最も頻出するシチュエーションを視覚的なイラストと多言語で整理。語学に自信がないスタッフでも、シートを指差すだけでスムーズかつ確実にお客様と意思疎通が図れます。'
  },
  {
    title: '文化・宗教別 おもてなしハンドブック',
    shortTitle: '③ おもてなし',
    icon: Sparkles,
    description: '国や地域、宗教による生活習慣・マナー・タブーの違いを分かりやすく解説。靴の脱ぎ履き、タトゥー対応、チップ文化への配慮、食材の制限など、「知らずにトラブルになる」リスクを事前に回避。スタッフ全員が自信を持っておもてなしできる実践的な知識集です。'
  },
  {
    title: 'OTA集客・外国人レビュー向上ガイド',
    shortTitle: '④ レビュー向上',
    icon: FileText,
    description: 'Booking.comやExpedia、Agodaなどの海外OTAで高評価を獲得し、成約率を最大化するための施設情報・写真の掲載ポイントを解説。外国人旅行者が宿を選ぶ際に重視する基準と、口コミ平均スコアを4.5以上に引き上げる現場改善のノウハウをまとめた戦略書です。'
  }
]

const nationalitiesList = [
  '中国', '台湾', '韓国', '香港', 'アメリカ', 'オーストラリア', 'ロシア', '東南アジア', 'ヨーロッパ', '中東地域', '中南米', 'その他',
]

const ratioOptions = Array.from({ length: 11 }, (_, i) => (i * 10).toString())

export default function InboundPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedBoxItem, setSelectedBoxItem] = useState(inboundBoxItems[0])
  const [isMounted, setIsMounted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ratio, setRatio] = useState<string>('')
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (showForm || menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [showForm, menuOpen])

  const handleNationalityChange = (nationality: string, checked: boolean) => {
    if (checked) {
      setSelectedNationalities([...selectedNationalities, nationality])
    } else {
      setSelectedNationalities(selectedNationalities.filter((n) => n !== nationality))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      downloadType: 'inbound',
      facilityName: formData.get('facilityName') as string,
      contactName: formData.get('representativeName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      ratio: ratio,
      nationalities: selectedNationalities.join(' / '),
    }

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('送信に失敗しました')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('送信エラー', error)
      alert('通信エラーが発生しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setMenuOpen(false)
    setShowForm(true)
  }

  if (!isMounted) {
    return <main className="min-h-screen bg-[#111]" aria-busy="true" />
  }

  return (
    <main className="relative min-h-screen bg-[#111] text-white overflow-x-hidden pb-20 md:pb-0">
      
      {/* ヒーロー背景画像（固定） */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/50" />
      </div>

      {/* スマホ用ヘッダードロワーメニュー */}
      {menuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden flex flex-col justify-between bg-[#111]/95 backdrop-blur-md p-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/15">
            <span className="text-xs tracking-[0.25em] text-[#d95338]">MENU</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-white/70 hover:text-white" aria-label="メニューを閉じる">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6 py-8">
            <button
              onClick={() => handleDownloadClick()}
              className="text-left text-lg font-bold text-white py-3 border-b border-white/10 flex items-center justify-between"
            >
              <span>資料ダウンロード</span>
              <Download className="w-5 h-5 text-[#d95338]" />
            </button>
            <a
              href="https://innbuddy-japan.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white py-3 border-b border-white/10 flex items-center justify-between"
            >
              <span>お問い合わせ</span>
              <ArrowRight className="w-5 h-5 text-white/60" />
            </a>
            <a
              href="https://innbuddy-japan.com/team"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white py-3 border-b border-white/10 flex items-center justify-between"
            >
              <span>私たちについて</span>
              <ArrowRight className="w-5 h-5 text-white/60" />
            </a>
            <a
              href="https://innbuddy-japan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white py-3 border-b border-white/10 flex items-center justify-between"
            >
              <span>ブランドサイト</span>
              <ArrowRight className="w-5 h-5 text-white/60" />
            </a>
            <a
              href="https://innbuddy-japan.com/library"
              className="text-lg font-bold text-white py-3 border-b border-white/10 flex items-center justify-between"
            >
              <span>ライブラリ</span>
              <ArrowRight className="w-5 h-5 text-white/60" />
            </a>
          </div>
          <div className="text-center text-xs text-white/40 pt-4 border-t border-white/10">
            © InnBuddy 2026
          </div>
        </div>
      )}

      {/* コンテンツレイヤー */}
      <div className="relative z-10">
        <header className="flex items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
          <a href="/library" className="flex items-center gap-3" aria-label="Library ホームへ戻る">
            <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/50 font-serif text-lg sm:text-xl">訪</span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.28em]">OMOTENASHI<br /><span className="text-[9px] sm:text-[10px] tracking-[0.4em] text-white/65">INBOUND JAPAN</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-xs tracking-[0.2em] text-white/85 md:flex" aria-label="メインナビゲーション">
            <button onClick={() => handleDownloadClick()} className="transition-colors hover:text-white cursor-pointer">無料ツールDL</button>
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">お問い合わせ</a>
            <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">私たちについて</a>
            <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">ブランド</a>
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-full border border-white/35 p-2.5 md:hidden text-white"
            aria-label="メニューを開く"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* ヒーローセクション */}
        <section className="relative flex min-h-[calc(100svh-80px)] items-center px-5 pb-16 pt-4 sm:px-10 lg:px-16">
          <div className="w-full max-w-3xl">
            <p className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3 text-[11px] tracking-[0.25em] text-[#d95338] sm:text-sm">
              <span className="h-px w-8 sm:w-10 bg-[#d95338]" />
              INBOUND HOSPITALITY TOOLKIT
            </p>
            
            <h1 className="text-[26px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.25] tracking-tight sm:tracking-wider text-white break-words">
              言葉の壁を越え、<br className="sm:hidden" />世界に選ばれる「日本の宿」へ。
            </h1>
            
            <p className="mt-4 sm:mt-6 max-w-2xl text-xs sm:text-base md:text-xl text-gray-200 leading-relaxed break-words">
              外国人旅行者が心から感動し、高評価の口コミが集まるインバウンド対応の現場づくり。
            </p>

            {/* スマホ用：INBOUND BOX 収録内容プレビュー */}
            <div className="lg:hidden mt-6 p-4 rounded bg-black/60 border border-white/15 backdrop-blur-md">
              <span className="text-[10px] tracking-[0.25em] text-[#d95338] uppercase block mb-2.5 font-bold">
                INBOUND BOX 収録内容（タップで詳細）
              </span>
              <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                {inboundBoxItems.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setSelectedBoxItem(item)}
                    className={`px-2 py-2 rounded text-[10.5px] font-medium leading-tight text-center transition-all ${
                      selectedBoxItem.title === item.title
                        ? 'bg-[#d95338] text-white border border-[#e06b52] shadow-md font-bold'
                        : 'bg-white/10 text-white/70 hover:bg-white/15'
                    }`}
                  >
                    {item.shortTitle}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-black/50 rounded border border-white/10">
                <p className="text-xs font-bold text-white mb-1">{selectedBoxItem.title}</p>
                <p className="text-[11px] text-white/80 leading-relaxed whitespace-pre-wrap">{selectedBoxItem.description}</p>
              </div>
            </div>

            {/* CTAボタン群 */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() => handleDownloadClick()}
                className="group w-full sm:w-auto rounded-full bg-[#d95338] px-8 py-3.5 sm:px-10 sm:py-4 text-white shadow-xl transition-all duration-300 hover:bg-[#b83b23] active:scale-[0.98] flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="mb-0.5 text-xs sm:text-sm font-medium opacity-90">インバウンドBOX 無料配布中</span>
                <span className="flex items-center text-base sm:text-lg font-bold">
                  無料ダウンロード <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <a
                href="https://innbuddy-japan.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto rounded-full border border-white/35 px-8 py-3.5 sm:px-10 sm:py-4 text-white shadow-lg transition-all duration-300 hover:bg-white/15 active:scale-[0.98] flex flex-col items-center justify-center backdrop-blur-sm"
              >
                <span className="mb-0.5 text-xs sm:text-sm font-medium opacity-90">OTA集客・単価改善</span>
                <span className="flex items-center text-base sm:text-lg font-bold">
                  ご相談はこちら <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>

          {/* PC用 右側ナビゲーション */}
          <aside className="absolute right-6 top-1/2 hidden -translate-y-1/2 border-l border-white/30 pl-6 lg:block" aria-label="インバウンドBOX収録内容">
            <p className="mb-5 text-[10px] tracking-[0.3em] text-[#d95338]">INBOUND BOX CONTENTS</p>
            <div className="space-y-4">
              {inboundBoxItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedBoxItem(item)}
                  className={`block text-left text-sm tracking-[0.1em] transition-colors cursor-pointer ${selectedBoxItem.title === item.title ? 'text-white font-bold' : 'text-white/60 hover:text-white/90'}`}
                  aria-pressed={selectedBoxItem.title === item.title}
                >
                  ・{item.title}
                </button>
              ))}
            </div>
            <div className="mt-6 max-w-[320px] min-h-[140px]">
              <p className="text-xs leading-relaxed text-white/80 animate-in fade-in slide-in-from-right-4 duration-500 whitespace-pre-wrap" key={selectedBoxItem.title}>
                {selectedBoxItem.description}
              </p>
            </div>
          </aside>
        </section>

        {/* 追加セクション1：4大ツールの紹介 */}
        <section className="bg-[#181818] py-16 px-5 sm:py-24 sm:px-10 lg:px-16 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#d95338] text-xs tracking-[0.2em] font-medium block mb-2 sm:mb-3">COMPLETE TOOLKIT</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider">現場が本当に必要としている4つの実践ツール</h2>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
                「英語が話せるスタッフがいない」「外国語の口コミにどう返信すればいいか分からない」現場の悩みを即座に解決するパッケージです。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {inboundBoxItems.map((item, idx) => {
                const IconComponent = item.icon
                return (
                  <div key={item.title} className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-sm backdrop-blur-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded bg-[#d95338]/20 text-[#d95338]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-serif text-2xl text-white/40">0{idx + 1}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-3">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 追加セクション2：現場導入のメリット */}
        <section className="bg-[#fcfbf9] text-[#111] py-16 px-5 sm:py-24 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2">
                <span className="text-[#d95338] text-xs tracking-[0.2em] font-medium block mb-2 sm:mb-3">WHY INBOUND BOX</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                  導入したその日から、<br/>スタッフの不安が自信に変わる。
                </h2>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-6 sm:mb-8">
                  語学研修には時間がかかりますが、ツールがあれば今日から誰でも外国人客に丁寧な対応ができます。ミスや誤解によるクレームを防ぎ、高評価レビューを増やすための最短ルートです。
                </p>
                <button
                  onClick={() => handleDownloadClick()}
                  className="inline-flex items-center justify-center gap-2 bg-[#d95338] hover:bg-[#b83b23] text-white px-8 py-4 sm:py-5 font-medium tracking-widest transition-colors w-full sm:w-auto text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  今すぐ無料でダウンロード
                </button>
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <div className="bg-white p-5 sm:p-6 border border-[#eee] rounded-sm shadow-sm flex items-start gap-4">
                  <div className="p-2 rounded bg-red-50 text-[#d95338] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base mb-1">口コミ返信時間を80%削減</h4>
                    <p className="text-xs sm:text-sm text-[#666]">18言語の定型文とアレンジ用文例で、翻訳ツールで迷う時間を大幅にカット。</p>
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 border border-[#eee] rounded-sm shadow-sm flex items-start gap-4">
                  <div className="p-2 rounded bg-red-50 text-[#d95338] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base mb-1">指差しで即座に伝わる安心感</h4>
                    <p className="text-xs sm:text-sm text-[#666]">フロントや客室での複雑な説明も、イラスト付きシートで見せるだけで解決。</p>
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 border border-[#eee] rounded-sm shadow-sm flex items-start gap-4">
                  <div className="p-2 rounded bg-red-50 text-[#d95338] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base mb-1">OTAの成約率と単価アップ</h4>
                    <p className="text-xs sm:text-sm text-[#666]">多言語対応の充実がレビュー評価を引き上げ、インバウンド客の予約率を高めます。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせ＆ダウンロードCTAセクション */}
        <section id="contact" className="bg-[#1c1c1c] flex flex-col md:flex-row text-white">
          <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-20 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-white/10 text-center md:text-left">
            <p className="mb-3 sm:mb-4 text-xs tracking-[0.3em] text-[#d95338]">CONSULTATION</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">お気軽にご相談ください</h2>
            <p className="text-white/70 mb-8 sm:mb-10 text-xs sm:text-sm leading-relaxed max-w-sm">
              海外OTAの運用代行、インバウンド客向けの宿泊プラン設計、単価向上など、宿の専任チームがトータルで支援します。
            </p>
            <a
              href="https://innbuddy-japan.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/50 px-8 py-3.5 sm:px-10 sm:py-4 hover:bg-white hover:text-[#111] transition-colors tracking-widest text-xs sm:text-sm w-full sm:w-auto"
            >
              お問い合わせへ
            </a>
          </div>
          
          <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-20 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-black/30">
            <p className="mb-3 sm:mb-4 text-xs tracking-[0.3em] text-[#d95338]">FREE DOWNLOAD</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">インバウンドBOX 無料配布中</h2>
            <p className="text-white/70 mb-8 sm:mb-10 text-xs sm:text-sm leading-relaxed max-w-sm">
              ・18言語対応 口コミ返信テンプレート<br/>
              ・フロント接客指差しシート (イラスト付き)<br/>
              ・文化・宗教別おもてなしハンドブック<br/>
              ・OTAレビュー評価向上ガイド<br/>
              上記4点セットがすぐにご活用いただけます。
            </p>
            <button
              onClick={() => handleDownloadClick()}
              className="inline-block bg-[#d95338] text-white font-bold px-8 py-3.5 sm:px-10 sm:py-4 hover:bg-[#b83b23] transition-colors tracking-widest text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
            >
              資料をダウンロード
            </button>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-[#111] border-t border-white/10 py-6 px-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-white/50 tracking-wider">
          <span>&copy; InnBuddy 2026</span>
          <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            ブランドサイト
          </a>
        </footer>
      </div>

      {/* =========================================================
          ★ スマホ専用 アプリ風ボトムナビゲーション（5項目） ★
      ========================================================= */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111111]/92 backdrop-blur-md border-t border-white/15 px-1 py-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_20px_rgba(0,0,0,0.5)]"
        aria-label="モバイル下部ナビゲーション"
      >
        <div className="grid grid-cols-5 items-center justify-around gap-0.5 text-center">
          
          {/* 1. ダウンロード（最重要CTA：朱赤 #d95338） */}
          <button
            type="button"
            onClick={() => handleDownloadClick()}
            className="flex flex-col items-center justify-center py-1 text-[#d95338] hover:text-[#e06b52] transition-colors active:scale-95 cursor-pointer"
          >
            <Download className="w-[18px] h-[18px] mb-1" />
            <span className="text-[9.5px] font-bold tracking-tight">DL</span>
          </button>

          {/* 2. 問い合わせ */}
          <a
            href="https://innbuddy-japan.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <Mail className="w-[18px] h-[18px] mb-1 opacity-80" />
            <span className="text-[9.5px] font-medium tracking-tight">問合せ</span>
          </a>

          {/* 3. 私たちについて */}
          <a
            href="https://innbuddy-japan.com/team"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <Users className="w-[18px] h-[18px] mb-1 opacity-80" />
            <span className="text-[9.5px] font-medium tracking-tight whitespace-nowrap">私たち</span>
          </a>

          {/* 4. ブランドサイト */}
          <a
            href="https://innbuddy-japan.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <Globe className="w-[18px] h-[18px] mb-1 opacity-80" />
            <span className="text-[9.5px] font-medium tracking-tight">ブランド</span>
          </a>

          {/* 5. ライブラリ */}
          <a
            href="https://innbuddy-japan.com/library"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-white transition-colors active:scale-95"
          >
            <BookOpen className="w-[18px] h-[18px] mb-1 opacity-80" />
            <span className="text-[9.5px] font-medium tracking-tight">書庫</span>
          </a>
        </div>
      </nav>

      {/* ポップアップ（モーダル）フォーム */}
      {showForm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#fcfbf9] text-[#111] p-5 sm:p-8 md:p-10 shadow-2xl rounded-sm my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 p-2 text-[#999] hover:text-[#111] transition-colors rounded-full hover:bg-black/5"
              aria-label="閉じる"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 sm:py-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#d95338] text-white mb-4 sm:mb-6">
                  <CheckSquare className="w-7 h-7" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-3">ご入力ありがとうございました。</h2>
                
                <p className="text-xs sm:text-sm text-[#666] mb-6 sm:mb-8 leading-relaxed">
                  以下のボタンより、各資料をご自由にダウンロードいただけます。
                </p>

                <div className="flex flex-col gap-2.5 sm:gap-3 mb-8 w-full max-w-md mx-auto">
                  <a
                    href="/library/inbound/inbound-box/インバウンド接客_指差しシート.pdf"
                    download
                    className="flex items-center justify-between bg-white hover:bg-[#fcf8f7] text-[#d95338] p-4 border border-[#d95338]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 opacity-70" />
                      <span className="text-xs sm:text-sm font-bold text-left">① 接客指差しシート (イラスト付き)</span>
                    </div>
                    <Download className="w-4 h-4 shrink-0 opacity-50" />
                  </a>

                  <a
                    href="/library/inbound/inbound-box/18言語対応_口コミ返信マニュアル.pdf"
                    download
                    className="flex items-center justify-between bg-white hover:bg-[#fcf8f7] text-[#d95338] p-4 border border-[#d95338]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 opacity-70" />
                      <span className="text-xs sm:text-sm font-bold text-left">② 口コミ翻訳返信マニュアル (18言語)</span>
                    </div>
                    <Download className="w-4 h-4 shrink-0 opacity-50" />
                  </a>

                  <a
                    href="/library/inbound/inbound-box/文化・宗教別_おもてなしハンドブック.pdf"
                    download
                    className="flex items-center justify-between bg-white hover:bg-[#fcf8f7] text-[#d95338] p-4 border border-[#d95338]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 opacity-70" />
                      <span className="text-xs sm:text-sm font-bold text-left">③ 文化・宗教別おもてなしハンドブック</span>
                    </div>
                    <Download className="w-4 h-4 shrink-0 opacity-50" />
                  </a>

                  <a
                    href="/library/inbound/inbound-box/OTAレビュー評価向上ガイド.pdf"
                    download
                    className="flex items-center justify-between bg-white hover:bg-[#fcf8f7] text-[#d95338] p-4 border border-[#d95338]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 opacity-70" />
                      <span className="text-xs sm:text-sm font-bold text-left">④ OTA集客・レビュー向上ガイド</span>
                    </div>
                    <Download className="w-4 h-4 shrink-0 opacity-50" />
                  </a>
                </div>

                <div className="flex justify-center">
                  <Button onClick={() => setShowForm(false)} variant="outline" className="text-xs sm:text-sm tracking-wider uppercase rounded-none border-[#ccc] text-[#333] hover:bg-[#eee] transition-colors px-8 py-3">
                    閉じる
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 sm:mb-8 border-b border-[#eee] pb-4 sm:pb-6 text-center mt-1">
                  <span className="text-[#d95338] text-xs tracking-[0.2em] uppercase mb-1 block font-medium">Download</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-tight text-[#111]">インバウンドBOX ダウンロード</h2>
                  <p className="text-xs text-[#666] mt-2">18言語対応マニュアルや各種ツール4点を一括でお送りします。</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="facilityName" className="text-xs font-semibold text-[#333]">施設名 <span className="text-[#d95338]">*</span></Label>
                      <Input id="facilityName" name="facilityName" required placeholder="例: ホテル インバディ" className="rounded-none border-[#ccc] focus-visible:ring-[#d95338] h-11 text-base md:text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="representativeName" className="text-xs font-semibold text-[#333]">ご担当者名 <span className="text-[#d95338]">*</span></Label>
                      <Input id="representativeName" name="representativeName" required placeholder="例: 旅行 太郎" className="rounded-none border-[#ccc] focus-visible:ring-[#d95338] h-11 text-base md:text-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-xs font-semibold text-[#333]">ご住所 <span className="text-[#d95338]">*</span></Label>
                    <Input id="address" name="address" required placeholder="例: 東京都渋谷区〇〇1-2-3" className="rounded-none border-[#ccc] focus-visible:ring-[#d95338] h-11 text-base md:text-sm" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold text-[#333]">メールアドレス <span className="text-[#d95338]">*</span></Label>
                      <Input id="email" name="email" type="email" required placeholder="example@innbuddy.com" className="rounded-none border-[#ccc] focus-visible:ring-[#d95338] h-11 text-base md:text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-semibold text-[#333]">電話番号 <span className="text-[#d95338]">*</span></Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="03-1234-5678" className="rounded-none border-[#ccc] focus-visible:ring-[#d95338] h-11 text-base md:text-sm" />
                    </div>
                  </div>

                  <hr className="border-[#eee]" />

                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="ratio" className="text-xs font-semibold text-[#333]">外国人宿泊比率 <span className="text-[#d95338]">*</span></Label>
                      <div className="relative">
                        <select
                          id="ratio"
                          name="ratio"
                          value={ratio}
                          onChange={(e) => setRatio(e.target.value)}
                          required
                          className="flex w-full rounded-none border border-[#ccc] bg-white px-3 h-11 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#d95338] appearance-none cursor-pointer"
                        >
                          <option value="" disabled hidden>選択してください</option>
                          {ratioOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}%</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#666]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-[#333] block">ここ1年で利用されたお客様の国籍（複数選択可）</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-2 bg-[#f9f9f9] p-4 sm:p-5 border border-[#eee]">
                        {nationalitiesList.map((country) => (
                          <div key={country} className="flex items-center space-x-2.5">
                            <Checkbox
                              id={country}
                              className="border-[#999] rounded-[2px] data-[state=checked]:bg-[#d95338] data-[state=checked]:text-white w-4 h-4"
                              onCheckedChange={(checked) => handleNationalityChange(country, checked as boolean)}
                            />
                            <Label
                              htmlFor={country}
                              className="text-xs text-[#444] font-medium leading-none cursor-pointer"
                            >
                              {country}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#d95338] hover:bg-[#b83b23] text-white rounded-none h-14 text-sm sm:text-base tracking-[0.15em] font-medium uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        '送信中...'
                      ) : (
                        <>
                          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                          インバウンドBOXをダウンロード
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}