'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight, X, FileText, CheckSquare, MessageSquare, Download } from 'lucide-react'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const lastInteractionRef = useRef<number>(Date.now())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (Date.now() - lastInteractionRef.current > 4000) {
        setActiveIndex((current) => (current + 1) % slides.length)
      }
    }, 3500)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      downloadType: 'halal',
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
      if (!res.ok) throw new Error('送信に失敗しました')
      setIsSubmitted(true)
    } catch (error) {
      console.error('送信エラー', error)
      alert('通信エラーが発生しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
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
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* 背景画像 */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="hidden md:block absolute inset-0">
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
        </div>
        <div className="block md:hidden absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => {
            const yOffset = (index - activeIndex) * 100
            return (
              <div
                key={slide.src + '-sp'}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `translateY(${yOffset}%)`,
                  transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            )
          })}
        </div>
        {/* スマホで文字が読みやすいようにグラデーションを調整 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-black/30" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 pointer-events-auto">
        
        {/* ヘッダー */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16 w-full">
          <a href="/library" className="flex items-center gap-3 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 font-serif text-xl">和</span>
            <span className="text-sm font-medium tracking-[0.28em]">OMOTENASHI<br /><span className="text-[10px] tracking-[0.4em] text-white/65">TRAVEL JAPAN</span></span>
          </a>
          
          <nav className="hidden items-center gap-8 text-xs tracking-[0.2em] text-white/85 md:flex">
            <button onClick={handleDownloadClick} className="transition-colors hover:text-white">資料ダウンロード</button>
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">お問い合わせ</a>
          </nav>

          {/* スマホ用: 画像の手動切り替え (ヘッダー内に移動) */}
          <div className="flex items-center gap-2 md:hidden bg-black/40 rounded-full px-2 py-1 backdrop-blur-md border border-white/20 shrink-0">
            <button type="button" onClick={() => { setActiveIndex((p) => (p - 1 + slides.length) % slides.length); lastInteractionRef.current = Date.now() }} className="p-1 text-white/70 hover:text-white">&lt;</button>
            <span className="text-[10px] font-serif tracking-widest text-white/90 w-10 text-center">
              {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => { setActiveIndex((p) => (p + 1) % slides.length); lastInteractionRef.current = Date.now() }} className="p-1 text-white/70 hover:text-white">&gt;</button>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section className="relative px-6 pt-6 pb-24 sm:px-10 lg:px-16 md:flex md:min-h-[calc(100vh-88px)] md:items-center md:pt-0">
          <div className="w-full max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs tracking-[0.32em] text-white/90 sm:text-sm">
              <span className="h-px w-10 bg-[#e5c58d]" />
              MUSLIM-FRIENDLY JAPAN
            </p>
            <h1 className="text-3xl font-bold leading-[1.4] tracking-wider text-white md:text-5xl lg:text-6xl drop-shadow-md">
              ムスリムフレンドリーな<br className="block md:hidden"/>「日本のおもてなし宿」へ。
            </h1>
            <p className="mt-6 max-w-2xl break-keep text-base text-gray-100 md:text-xl drop-shadow-sm">
              ムスリムの皆さまが心から安心して過ごせる、<br className="block md:hidden" />
              選ばれるハラル対応宿に。
            </p>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={handleDownloadClick} className="group relative z-20 rounded-full bg-[#2D4F36] px-6 py-4 md:px-10 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3d6848] flex flex-col items-center">
                <span className="mb-1 flex items-center justify-center text-[11px] md:text-sm font-medium opacity-90">ハラルBOX 無料配布中</span>
                <span className="flex items-center justify-center text-base md:text-lg font-bold">
                  ダウンロード <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="group relative z-20 rounded-full border border-white/40 px-6 py-4 md:px-10 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="mb-1 flex items-center justify-center text-[11px] md:text-sm font-medium opacity-90">OTA集客に繋げる</span>
                <span className="flex items-center justify-center text-base md:text-lg font-bold">
                  相談 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>

            {/* スマホ用コンテンツセレクター */}
            <div className="mt-16 block lg:hidden w-full relative z-30">
              <p className="mb-3 text-[10px] tracking-[0.3em] text-[#e5c58d] drop-shadow-md">HALAL BOX CONTENTS</p>
              <div className="flex overflow-x-auto gap-2 pb-2 -mx-6 px-6 snap-x hide-scrollbar">
                {halalBoxItems.map((item) => (
                  <button
                    key={item.title + '-sp'}
                    type="button"
                    onClick={() => { setSelectedBoxItem(item); lastInteractionRef.current = Date.now() }}
                    className={`shrink-0 snap-start rounded-full px-5 py-2.5 text-[11px] tracking-wider transition-colors border ${
                      selectedBoxItem.title === item.title
                        ? 'bg-white/30 border-white/70 text-white font-bold'
                        : 'bg-black/50 border-white/20 text-white/80'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="mt-3 min-h-[140px] bg-black/50 p-5 rounded-md border border-white/20 backdrop-blur-md">
                <p className="text-[13px] leading-relaxed text-white/95 whitespace-pre-wrap" key={selectedBoxItem.title}>
                  {selectedBoxItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* PC用右ナビゲーション */}
          <aside className="absolute right-6 top-1/2 hidden -translate-y-1/2 border-l border-white/30 pl-6 lg:block pointer-events-auto">
            <p className="mb-5 text-[10px] tracking-[0.3em] text-[#e5c58d]">HALAL BOX CONTENTS</p>
            <div className="space-y-4">
              {halalBoxItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => { setSelectedBoxItem(item); lastInteractionRef.current = Date.now() }}
                  className={`block text-left text-sm tracking-[0.1em] transition-colors ${selectedBoxItem.title === item.title ? 'text-white font-bold' : 'text-white/60 hover:text-white/90'}`}
                >
                  ・{item.title}
                </button>
              ))}
            </div>
            <div className="mt-6 max-w-[320px] min-h-[120px]">
              <p className="text-xs leading-relaxed text-white/80 whitespace-pre-wrap" key={selectedBoxItem.title}>
                {selectedBoxItem.description}
              </p>
            </div>
          </aside>
        </section>

        {/* セクション1 */}
        <section className="bg-[#17211f] py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#e5c58d] text-xs tracking-[0.2em] font-medium block mb-3">GLOBAL MARKET</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-wider">なぜ今、ハラル対応に取り組むべきか</h2>
              <p className="mt-6 text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                急速に拡大する訪日ムスリム市場。少ない初期投資で大きな売上増加が見込める、最も費用対効果の高いインバウンド戦略です。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                  家族などの大人数での旅行が多く、滞在期間も長い傾向にあります。数万円の初期投資で大幅な客単価アップが期待できます。
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
                <div className="text-4xl font-serif text-[#e5c58d] mb-4">ローリスク</div>
                <h3 className="text-lg font-bold mb-3">トラブルを防ぐ開示型</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  厳格な「ハラル認証」ではなく、施設の現状を誠実に伝える「情報開示型」を採用することで、現場に過度な負担をかけず安全に運用できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* セクション2 */}
        <section className="bg-[#fcfbf9] text-[#111] py-20 md:py-24 px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="w-full md:w-1/2">
                <span className="text-[#2D4F36] text-xs tracking-[0.2em] font-medium block mb-3">WHAT&apos;S INSIDE</span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6">明日からすぐ使える<br/>「ハラルBOX」無料配布中</h2>
                <p className="text-sm md:text-base text-[#666] leading-relaxed mb-8">
                  現場スタッフが迷わず動ける実践マニュアルから、お客様へそのまま提示できる日英併記のチェックシートまで。すべてまとめた「ハラルBOX」を無料でご提供しています。
                </p>
                <button onClick={handleDownloadClick} className="inline-flex items-center justify-center gap-2 bg-[#2D4F36] hover:bg-[#1a3020] text-white px-6 py-4 md:px-8 md:py-5 rounded-none text-sm md:text-base font-medium tracking-widest transition-colors w-full sm:w-auto">
                  <Download className="w-5 h-5" />
                  今すぐ無料でダウンロード
                </button>
              </div>
              
              <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                <div className="bg-white p-5 md:p-6 border border-[#eee] shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f2f7f4] p-3 text-[#2D4F36] shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">① 実践マニュアル</h3>
                    <p className="text-xs md:text-sm text-[#666] leading-relaxed">市場データや売上シミュレーション、OTAでの集客手法まで体系的に網羅した完全ガイド。</p>
                  </div>
                </div>
                
                <div className="bg-white p-5 md:p-6 border border-[#eee] shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f2f7f4] p-3 text-[#2D4F36] shrink-0">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">② ハラルチェックシート (日英併記)</h3>
                    <p className="text-xs md:text-sm text-[#666] leading-relaxed">施設の対応状況を可視化。お客様が宿泊可能か判断でき、スタッフの負担が減ります。</p>
                  </div>
                </div>
                
                <div className="bg-white p-5 md:p-6 border border-[#eee] shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f2f7f4] p-3 text-[#2D4F36] shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">③ カスタマーフィードバック (日英併記)</h3>
                    <p className="text-xs md:text-sm text-[#666] leading-relaxed">施設とお客様の要望のズレがないかを確認し、改善するための専用シート。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-[#24312d] flex flex-col md:flex-row text-white">
          <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-white/10 text-center md:text-left">
            <p className="mb-4 text-[10px] md:text-xs tracking-[0.3em] text-[#e5c58d]">CONSULTATION</p>
            <h2 className="text-2xl md:text-4xl font-serif mb-4 md:mb-6">お気軽にご相談ください</h2>
            <p className="text-white/70 mb-8 text-xs md:text-sm leading-relaxed max-w-sm">
              ムスリム旅行者の集客やOTAの設定、施設に合わせた最適な対応方法など、専門スタッフがサポートいたします。
            </p>
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/50 px-8 py-3 md:px-10 md:py-4 hover:bg-white hover:text-[#24312d] transition-colors tracking-widest text-xs md:text-sm">
              お問い合わせへ
            </a>
          </div>
          
          <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-black/20">
            <p className="mb-4 text-[10px] md:text-xs tracking-[0.3em] text-[#e5c58d]">FREE DOWNLOAD</p>
            <h2 className="text-2xl md:text-4xl font-serif mb-4 md:mb-6">ハラルBOX 無料配布中</h2>
            <p className="text-white/70 mb-8 text-xs md:text-sm leading-relaxed max-w-sm">
              ・ムスリムフレンドリー実践マニュアル<br/>
              ・ハラルチェックシート (日英併記)<br/>
              ・カスタマーフィードバック (日英併記)<br/>
              上記3点がすぐにご活用いただけます。
            </p>
            <button onClick={handleDownloadClick} className="inline-block bg-[#e5c58d] text-[#17211f] font-bold px-8 py-3 md:px-10 md:py-4 hover:bg-[#d4b47c] transition-colors tracking-widest text-xs md:text-sm">
              資料をダウンロード
            </button>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-[#17211f] border-t border-white/10 py-6 px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-white/50 tracking-wider">
          <span>&copy; InnBuddy 2026</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ブランドページ</a>
            <a href="https://innbuddy-japan.com/library" className="hover:text-white transition-colors">メディア一覧</a>
          </div>
        </footer>
      </div>

      {/* フォーム */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#fcfbf9] text-[#111] p-6 md:p-12 shadow-2xl rounded-sm my-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 text-[#999] hover:text-[#111] transition-colors rounded-full hover:bg-black/5"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 md:py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2D4F36] text-white mb-6">
                  <CheckSquare className="w-8 h-8" />
                </div>
                <h2 className="text-xl md:text-3xl font-serif mb-4">ご入力ありがとうございました。</h2>
                <p className="text-sm md:text-base text-[#666] mb-8 leading-relaxed">
                  以下のボタンより、各資料をご自由にダウンロードいただけます。
                </p>
                <div className="flex flex-col gap-3 mb-10 w-full max-w-md mx-auto">
                  <a href="/library/halal/halal-box/ハラル市場レポート＆ムスリムフレンドリー実践マニュアル.pdf" download className="flex items-center justify-between bg-white hover:bg-[#f2f7f4] text-[#2D4F36] p-4 border border-[#2D4F36]/20 transition-colors rounded-sm shadow-sm">
                    <div className="flex items-center gap-3"><FileText className="w-5 h-5 opacity-70" /><span className="text-sm font-bold text-left">① 実践マニュアル</span></div>
                    <Download className="w-5 h-5 shrink-0 opacity-50" />
                  </a>
                  <a href="/library/halal/halal-box/チェックシート_日英併記.pdf" download className="flex items-center justify-between bg-white hover:bg-[#f2f7f4] text-[#2D4F36] p-4 border border-[#2D4F36]/20 transition-colors rounded-sm shadow-sm">
                    <div className="flex items-center gap-3"><CheckSquare className="w-5 h-5 opacity-70" /><span className="text-sm font-bold text-left">② チェックシート</span></div>
                    <Download className="w-5 h-5 shrink-0 opacity-50" />
                  </a>
                  <a href="/library/halal/halal-box/カスタマーフィードバックシート_日英併記.pdf" download className="flex items-center justify-between bg-white hover:bg-[#f2f7f4] text-[#2D4F36] p-4 border border-[#2D4F36]/20 transition-colors rounded-sm shadow-sm">
                    <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5 opacity-70" /><span className="text-sm font-bold text-left">③ フィードバック</span></div>
                    <Download className="w-5 h-5 shrink-0 opacity-50" />
                  </a>
                </div>
                <div className="flex justify-center">
                  <Button onClick={() => setShowForm(false)} variant="outline" className="text-sm tracking-wider uppercase rounded-none border-[#ccc] text-[#333] hover:bg-[#eee] transition-colors px-8 py-4">閉じる</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 md:mb-10 border-b border-[#eee] pb-6 md:pb-8 text-center mt-2">
                  <span className="text-[#e5c58d] text-xs md:text-sm tracking-[0.2em] uppercase mb-2 block font-medium">Download</span>
                  <h2 className="text-xl md:text-3xl font-serif tracking-tight text-[#17211f]">ハラルBOX ダウンロード</h2>
                  <p className="text-xs md:text-sm text-[#666] mt-3 md:mt-4">実践マニュアル・各種シートをまとめてお送りします。</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2"><Label className="text-xs font-semibold text-[#333]">施設名 <span className="text-[#d95338]">*</span></Label><Input name="facilityName" required className="rounded-none border-[#ccc] py-5 md:py-6" /></div>
                    <div className="space-y-2"><Label className="text-xs font-semibold text-[#333]">ご担当者名 <span className="text-[#d95338]">*</span></Label><Input name="representativeName" required className="rounded-none border-[#ccc] py-5 md:py-6" /></div>
                  </div>
                  <div className="space-y-2"><Label className="text-xs font-semibold text-[#333]">ご住所 <span className="text-[#d95338]">*</span></Label><Input name="address" required className="rounded-none border-[#ccc] py-5 md:py-6" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2"><Label className="text-xs font-semibold text-[#333]">メールアドレス <span className="text-[#d95338]">*</span></Label><Input name="email" type="email" required className="rounded-none border-[#ccc] py-5 md:py-6" /></div>
                    <div className="space-y-2"><Label className="text-xs font-semibold text-[#333]">電話番号 <span className="text-[#d95338]">*</span></Label><Input name="phone" type="tel" required className="rounded-none border-[#ccc] py-5 md:py-6" /></div>
                  </div>
                  <hr className="border-[#eee]" />
                  <div className="space-y-6 md:space-y-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-[#333]">外国人宿泊比率 <span className="text-[#d95338]">*</span></Label>
                      <select value={ratio} onChange={(e) => setRatio(e.target.value)} required className="w-full rounded-none border border-[#ccc] bg-white px-3 py-3 md:py-4 text-sm">
                        <option value="" disabled hidden>選択してください</option>
                        {ratioOptions.map((opt) => (<option key={opt} value={opt}>{opt}%</option>))}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-xs font-semibold text-[#333] block">ここ1年で利用されたお客様の国籍（複数選択可）</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 bg-[#f9f9f9] p-4 border border-[#eee]">
                        {nationalitiesList.map((country) => (
                          <div key={country} className="flex items-center space-x-2 md:space-x-3">
                            <Checkbox id={country} className="border-[#999] rounded-[2px] data-[state=checked]:bg-[#2D4F36] data-[state=checked]:text-white w-4 h-4 md:w-5 md:h-5" onCheckedChange={(c) => handleNationalityChange(country, c as boolean)} />
                            <Label htmlFor={country} className="text-xs md:text-sm text-[#444] cursor-pointer">{country}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 md:pt-6">
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#2D4F36] hover:bg-[#1a3020] text-white rounded-none py-6 md:py-8 text-sm md:text-base tracking-[0.1em] font-medium transition-colors flex items-center justify-center gap-2">
                      {isSubmitting ? '送信中...' : <><Download className="w-4 h-4" />ハラルBOXをダウンロード</>}
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