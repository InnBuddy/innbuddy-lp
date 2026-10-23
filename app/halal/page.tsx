'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X, FileText, CheckSquare, MessageSquare, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const slides = [
  { src: '/library/halal/hero-kyoto.png', alt: '伏見稲荷大社を訪れる家族' },
  { src: '/library/halal/hero-sushi.png', alt: '日本料理を楽しむカップル' },
  { src: '/library/halal/hero-onsen.png', alt: '富士山を望む貸切温泉' },
  { src: '/library/halal/hero-shibuya.png', alt: '渋谷で買い物を楽しむ友人たち' },
  { src: '/library/halal/hero-hokkaido.png', alt: '北海道の雪で遊ぶ家族' },
  { src: '/library/halal/hero-matcha.png', alt: '禅庭で抹茶を楽しむ旅行者' },
  { src: '/library/halal/hero-castle.png', alt: '大阪城を背景に記念撮影する旅行者たち' },
]

// ▼ 右側ナビゲーションのテキストをいただいた内容に変更（改行\n入り） ▼
const halalBoxItems = [
  {
    title: 'ムスリムフレンドリー実践マニュアル',
    description: '「知る」から「実践する」までを一冊に。\n\nハラルやムスリム市場の基礎知識から、市場動向、受け入れに必要な考え方、現場での具体的な対応方法までを網羅した完全版マニュアル。\n「ハラルとは何か」を理解するだけでなく、現場で今から実践できる形に落とし込みました。'
  },
  {
    title: 'ハラルチェックシート',
    description: 'あなたの施設の「今」を見える化。\n\nムスリムのお客様を受け入れるために必要な対応項目をチェックし、自施設の対応状況を可視化できるチェックシートです。\nお客様自身がシートを確認することで、「自分はこの施設に安心して宿泊できるか」を判断しやすくなり、スタッフによる個別の説明負担の軽減にもつながります。\nまた、スタッフ間で対応基準を共有することで、施設全体の共通認識づくりにも活用できます。\n5カ国のムスリムの方々への確認を実施済みで、実際の利用者目線を反映しています。'
  },
  {
    title: 'カスタマーフィードバックシート',
    description: '「できているつもり」と「求められていること」のズレをなくす。\n\n施設側の認識と、実際にムスリムのお客様が求めていることには、思わぬズレが生じることがあります。\nカスタマーフィードバックシートを通じて、お客様の声や要望を直接収集し、サービス改善につなげます。\n「何が足りないのか」だけでなく、「何が喜ばれているのか」も見えるようにすることで、継続的な改善と、より選ばれる施設づくりをサポートします。'
  }
]

const nationalitiesList = [
  '中国', '台湾', '韓国', '香港', 'アメリカ', 'オーストラリア', 'ロシア', '東南アジア', 'ヨーロッパ', '中東地域', '中南米', 'その他',
]

const ratioOptions = Array.from({ length: 11 }, (_, i) => (i * 10).toString())

export default function HalalPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedBoxItem, setSelectedBoxItem] = useState(halalBoxItems[0])
  const [isMounted, setIsMounted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [ratio, setRatio] = useState<string>('')
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [showForm])

  const handleNationalityChange = (nationality: string, checked: boolean) => {
    if (checked) {
      setSelectedNationalities([...selectedNationalities, nationality])
    } else {
      setSelectedNationalities(selectedNationalities.filter((n) => n !== nationality))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('送信データ:', { ratio, selectedNationalities })
    setIsSubmitted(true)
  }

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    setShowForm(true)
  }

  if (!isMounted) {
    return <main className="min-h-screen bg-[#17211f]" aria-busy="true" />
  }

  return (
    <main className="relative min-h-screen bg-[#17211f] text-white overflow-x-hidden">
      
      {/* ヒーロー背景画像（固定） */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17211f] via-transparent to-black/40" />
      </div>

      {/* コンテンツレイヤー */}
      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
          <a href="/library" className="flex items-center gap-3" aria-label="Library ホームへ戻る">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 font-serif text-xl">和</span>
            <span className="text-sm font-medium tracking-[0.28em]">OMOTENASHI<br /><span className="text-[10px] tracking-[0.4em] text-white/65">TRAVEL JAPAN</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-xs tracking-[0.2em] text-white/85 md:flex" aria-label="メインナビゲーション">
            <button onClick={handleDownloadClick} className="transition-colors hover:text-white">資料ダウンロード</button>
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">お問い合わせ</a>
          </nav>
          <button type="button" className="rounded-full border border-white/35 p-3 md:hidden" aria-label="メニューを開く">
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* ヒーローセクション */}
        <section className="relative flex min-h-[calc(100vh-88px)] items-center px-6 pb-24 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs tracking-[0.32em] text-white/75 sm:text-sm">
              <span className="h-px w-10 bg-[#e5c58d]" />
              MUSLIM-FRIENDLY JAPAN
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-wider text-white md:text-5xl lg:text-6xl">
              ムスリムフレンドリーな「日本のおもてなし宿」へ。
            </h1>
            <p className="mt-6 max-w-2xl break-keep text-lg text-gray-100 md:text-xl">
              ムスリムの皆さまが心から安心して過ごせる、選ばれるハラル対応宿に。
            </p>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row">
              <button onClick={handleDownloadClick} className="group rounded-full bg-[#2D4F36] px-10 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3d6848] hover:shadow-xl text-left flex flex-col items-center">
                <span className="mb-1 flex items-center justify-center text-sm font-medium opacity-90">ハラルBOX 無料配布中</span>
                <span className="flex items-center justify-center text-lg font-bold">
                  ダウンロード <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="group rounded-full border border-white/30 px-10 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="mb-1 flex items-center justify-center text-sm font-medium opacity-90">OTA集客に繋げる</span>
                <span className="flex items-center justify-center text-lg font-bold">
                  相談 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>

          {/* 右側ナビゲーション */}
          <aside className="absolute right-6 top-1/2 hidden -translate-y-1/2 border-l border-white/30 pl-6 lg:block" aria-label="ハラルBOX収録内容">
            <p className="mb-5 text-[10px] tracking-[0.3em] text-[#e5c58d]">HALAL BOX CONTENTS</p>
            <div className="space-y-4">
              {halalBoxItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedBoxItem(item)}
                  className={`block text-left text-sm tracking-[0.1em] transition-colors ${selectedBoxItem.title === item.title ? 'text-white font-bold' : 'text-white/60 hover:text-white/90'}`}
                  aria-pressed={selectedBoxItem.title === item.title}
                >
                  ・{item.title}
                </button>
              ))}
            </div>
            {/* ▼ 幅を 320px に広げ、改行（whitespace-pre-wrap）が効くように修正 ▼ */}
            <div className="mt-6 max-w-[320px] min-h-[120px]">
              <p className="text-xs leading-relaxed text-white/80 animate-in fade-in slide-in-from-right-4 duration-500 whitespace-pre-wrap" key={selectedBoxItem.title}>
                {selectedBoxItem.description}
              </p>
            </div>
          </aside>
        </section>

        {/* 追加セクション1：ハラルマーケットとメリット */}
        <section className="bg-[#17211f] py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#e5c58d] text-xs tracking-[0.2em] font-medium block mb-3">GLOBAL MARKET</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wider">なぜ今、ハラル対応に取り組むべきか</h2>
              <p className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed">
                急速に拡大する訪日ムスリム市場。少ない初期投資で大きな売上増加が見込める、最も費用対効果の高いインバウンド戦略です。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
                <div className="text-4xl font-serif text-[#e5c58d] mb-4">22億人</div>
                <h3 className="text-lg font-bold mb-3">圧倒的な市場規模</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  2030年には世界人口の4人に1人（約22億人）がムスリムになると予測されています。国際旅行者数も年間約2.45億人へ拡大を続ける巨大市場です。
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
                <div className="text-4xl font-serif text-[#e5c58d] mb-4">収益性</div>
                <h3 className="text-lg font-bold mb-3">高い投資対効果</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  家族などの大人数での旅行が多く、滞在期間も長い傾向にあります。礼拝マットの用意や調味料の見直しなど数万円の初期投資で、大幅な客単価アップが期待できます。
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
                <div className="text-4xl font-serif text-[#e5c58d] mb-4">ローリスク</div>
                <h3 className="text-lg font-bold mb-3">トラブルを防ぐ開示型</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  厳格な「ハラル認証」ではなく、施設の現状を誠実に伝える「情報開示型（ムスリムフレンドリー）」を採用することで、現場に過度な負担をかけず安全に運用できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 追加セクション2：ハラルBOX収録内容 */}
        <section className="bg-[#fcfbf9] text-[#111] py-24 px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <span className="text-[#2D4F36] text-xs tracking-[0.2em] font-medium block mb-3">WHAT'S INSIDE</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">明日からすぐ使える<br/>「ハラルBOX」無料配布中</h2>
                <p className="text-[#666] leading-relaxed mb-8">
                  現場スタッフが迷わず動ける実践マニュアルから、お客様へそのまま提示できる日英併記のチェックシートまで。ムスリムフレンドリー対応に必要なツールをすべてまとめた「ハラルBOX」を無料でご提供しています。
                </p>
                <button onClick={handleDownloadClick} className="inline-flex items-center justify-center gap-2 bg-[#2D4F36] hover:bg-[#1a3020] text-white px-8 py-5 rounded-none font-medium tracking-widest transition-colors w-full sm:w-auto">
                  <Download className="w-5 h-5" />
                  今すぐ無料でダウンロード
                </button>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div className="bg-white p-6 border border-[#eee] shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f2f7f4] p-3 text-[#2D4F36] shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">① ムスリムフレンドリー実践マニュアル</h3>
                    <p className="text-sm text-[#666] leading-relaxed">マクロな市場データや売上シミュレーション、避けるべきNG食材の判断基準からOTAでの集客手法まで体系的に網羅した完全ガイド。</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 border border-[#eee] shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f2f7f4] p-3 text-[#2D4F36] shrink-0">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">② ハラルチェックシート (日英併記)</h3>
                    <p className="text-sm text-[#666] leading-relaxed">あなたの施設の対応状況を可視化。お客様がシートを見て宿泊可能か判断できるようになるので、難しい説明が減り、スタッフ間での共通理解にもつながります。</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 border border-[#eee] shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f2f7f4] p-3 text-[#2D4F36] shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">③ カスタマーフィードバック (日英併記)</h3>
                    <p className="text-sm text-[#666] leading-relaxed">自社の理解とお客様の要望のズレがないかフィードバックシートを書いてもらうことで、より改善できるようになる専用シート。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせ＆ダウンロードCTAセクション */}
        <section id="contact" className="bg-[#24312d] flex flex-col md:flex-row text-white">
          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-white/10 text-center md:text-left">
            <p className="mb-4 text-xs tracking-[0.3em] text-[#e5c58d]">CONSULTATION</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">お気軽にご相談ください</h2>
            <p className="text-white/70 mb-10 text-sm leading-relaxed max-w-sm">
              ムスリム旅行者の集客やOTAの設定、施設に合わせた最適な対応方法など、専門スタッフがサポートいたします。
            </p>
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/50 px-10 py-4 hover:bg-white hover:text-[#24312d] transition-colors tracking-widest text-sm">
              お問い合わせへ
            </a>
          </div>
          
          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-black/20">
            <p className="mb-4 text-xs tracking-[0.3em] text-[#e5c58d]">FREE DOWNLOAD</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">ハラルBOX 無料配布中</h2>
            <p className="text-white/70 mb-10 text-sm leading-relaxed max-w-sm">
              ・ムスリムフレンドリー実践マニュアル<br/>
              ・ハラルチェックシート (日英併記)<br/>
              ・カスタマーフィードバック (日英併記)<br/>
              上記3点がすぐにご活用いただけます。
            </p>
            <button onClick={handleDownloadClick} className="inline-block bg-[#e5c58d] text-[#17211f] font-bold px-10 py-4 hover:bg-[#d4b47c] transition-colors tracking-widest text-sm">
              資料をダウンロード
            </button>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-[#17211f] border-t border-white/10 py-6 px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-white/50 tracking-wider">
          <span>&copy; InnBuddy 2026</span>
          <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            ブランドページ
          </a>
        </footer>
      </div>

      {/* ポップアップ（モーダル）フォーム */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          
          <div className="relative w-full max-w-3xl bg-[#fcfbf9] text-[#111] p-8 md:p-12 shadow-2xl rounded-sm my-auto animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 text-[#999] hover:text-[#111] transition-colors rounded-full hover:bg-black/5"
              aria-label="閉じる"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2D4F36] text-white mb-6">
                  <CheckSquare className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-4">ご入力ありがとうございました。</h2>
                
                <p className="text-sm md:text-base text-[#666] mb-8 leading-relaxed">
                  以下のボタンより、各資料をご自由にダウンロードいただけます。<br/>
                  <span className="text-xs">（※ご登録いただいたメールアドレス宛にもリンクをお送りいたしました）</span>
                </p>

                {/* 個別ダウンロードボタンのリスト */}
                <div className="flex flex-col gap-3 mb-10 w-full max-w-md mx-auto">
                  <a 
                    href="/library/halal/halal-box/ハラル市場レポート＆ムスリムフレンドリー実践マニュアル.pdf" 
                    download 
                    className="flex items-center justify-between bg-white hover:bg-[#f2f7f4] text-[#2D4F36] p-5 border border-[#2D4F36]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 opacity-70" />
                      <span className="text-sm font-bold text-left">① 実践マニュアル</span>
                    </div>
                    <Download className="w-5 h-5 shrink-0 opacity-50" />
                  </a>

                  <a 
                    href="/library/halal/halal-box/チェックシート_日英併記.pdf" 
                    download 
                    className="flex items-center justify-between bg-white hover:bg-[#f2f7f4] text-[#2D4F36] p-5 border border-[#2D4F36]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 opacity-70" />
                      <span className="text-sm font-bold text-left">② チェックシート (日英併記)</span>
                    </div>
                    <Download className="w-5 h-5 shrink-0 opacity-50" />
                  </a>

                  <a 
                    href="/library/halal/halal-box/カスタマーフィードバックシート_日英併記.pdf" 
                    download 
                    className="flex items-center justify-between bg-white hover:bg-[#f2f7f4] text-[#2D4F36] p-5 border border-[#2D4F36]/20 transition-colors rounded-sm shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 opacity-70" />
                      <span className="text-sm font-bold text-left">③ フィードバック (日英併記)</span>
                    </div>
                    <Download className="w-5 h-5 shrink-0 opacity-50" />
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setShowForm(false)} variant="outline" className="text-sm tracking-wider uppercase rounded-none border-[#ccc] text-[#333] hover:bg-[#eee] transition-colors px-8 py-4">
                    閉じる
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10 border-b border-[#eee] pb-8 text-center mt-2">
                  <span className="text-[#e5c58d] text-sm tracking-[0.2em] uppercase mb-2 block font-medium">Download</span>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-[#17211f]">ハラルBOX ダウンロード</h2>
                  <p className="text-sm text-[#666] mt-4">実践マニュアル・各種シートをまとめてお送りします。</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="facilityName" className="text-xs font-semibold text-[#333]">施設名 <span className="text-[#d95338]">*</span></Label>
                      <Input id="facilityName" required placeholder="例: ホテル インバディ" className="rounded-none border-[#ccc] focus-visible:ring-[#2D4F36] py-6" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="representativeName" className="text-xs font-semibold text-[#333]">ご担当者名 <span className="text-[#d95338]">*</span></Label>
                      <Input id="representativeName" required placeholder="例: 旅行 太郎" className="rounded-none border-[#ccc] focus-visible:ring-[#2D4F36] py-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs font-semibold text-[#333]">ご住所 <span className="text-[#d95338]">*</span></Label>
                    <Input id="address" required placeholder="例: 東京都渋谷区〇〇1-2-3" className="rounded-none border-[#ccc] focus-visible:ring-[#2D4F36] py-6" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold text-[#333]">メールアドレス <span className="text-[#d95338]">*</span></Label>
                      <Input id="email" type="email" required placeholder="example@innbuddy.com" className="rounded-none border-[#ccc] focus-visible:ring-[#2D4F36] py-6" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold text-[#333]">電話番号 <span className="text-[#d95338]">*</span></Label>
                      <Input id="phone" type="tel" required placeholder="03-1234-5678" className="rounded-none border-[#ccc] focus-visible:ring-[#2D4F36] py-6" />
                    </div>
                  </div>

                  <hr className="border-[#eee]" />

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Label htmlFor="ratio" className="text-xs font-semibold text-[#333]">外国人宿泊比率 <span className="text-[#d95338]">*</span></Label>
                      <div className="relative">
                        <select
                          id="ratio"
                          value={ratio}
                          onChange={(e) => setRatio(e.target.value)}
                          required
                          className="flex w-full rounded-none border border-[#ccc] bg-white px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4F36] appearance-none cursor-pointer"
                        >
                          <option value="" disabled hidden>選択してください</option>
                          {ratioOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}%</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#666]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-xs font-semibold text-[#333] block">ここ1年で利用されたお客様の国籍（複数選択可）</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-2 bg-[#f9f9f9] p-6 border border-[#eee]">
                        {nationalitiesList.map((country) => (
                          <div key={country} className="flex items-center space-x-3">
                            <Checkbox 
                              id={country} 
                              className="border-[#999] rounded-[2px] data-[state=checked]:bg-[#2D4F36] data-[state=checked]:text-white w-5 h-5"
                              onCheckedChange={(checked) => handleNationalityChange(country, checked as boolean)}
                            />
                            <Label
                              htmlFor={country}
                              className="text-sm text-[#444] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {country}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button type="submit" className="w-full bg-[#2D4F36] hover:bg-[#1a3020] text-white rounded-none py-8 text-base tracking-[0.2em] font-medium uppercase transition-colors flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      ハラルBOXをダウンロード
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