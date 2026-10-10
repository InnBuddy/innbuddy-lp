'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

const slides = [
  { src: '/hero-kyoto.png', alt: '伏見稲荷大社を訪れる家族', location: 'KYOTO / 京都' },
  { src: '/hero-sushi.png', alt: '日本料理を楽しむカップル', location: 'TOKYO / 東京' },
  { src: '/hero-onsen.png', alt: '富士山を望む貸切温泉', location: 'HAKONE / 箱根' },
  { src: '/hero-shibuya.png', alt: '渋谷で買い物を楽しむ友人たち', location: 'TOKYO / 東京' },
  { src: '/hero-hokkaido.png', alt: '北海道の雪で遊ぶ家族', location: 'HOKKAIDO / 北海道' },
  { src: '/hero-matcha.png', alt: '禅庭で抹茶を楽しむ旅行者', location: 'KYOTO / 京都' },
  { src: '/hero-castle.png', alt: '大阪城を背景に記念撮影する旅行者たち', location: 'OSAKA / 大阪' },
]

const countries = ['インドネシア', 'マレーシア', 'シンガポール', 'UAE', 'サウジアラビア']

const nationalitiesList = [
  '中国', '台湾', '韓国', '香港', 'アメリカ', 'オーストラリア', '東南アジア', 'ヨーロッパ', 'その他',
]

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  if (!isMounted) {
    return <main className="min-h-screen bg-[#17211f]" aria-busy="true" />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#17211f] text-white">
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        {/* ▼ ライブラリトップへのリンク ▼ */}
        <a href="/library" className="flex items-center gap-3" aria-label="Library ホームへ戻る">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 font-serif text-xl">和</span>
          <span className="text-sm font-medium tracking-[0.28em]">OMOTENASHI<br /><span className="text-[10px] tracking-[0.4em] text-white/65">TRAVEL JAPAN</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-xs tracking-[0.2em] text-white/85 md:flex" aria-label="メインナビゲーション">
          <a href="#contact" className="transition-colors hover:text-white">お問い合わせ</a>
        </nav>
        <button type="button" className="rounded-full border border-white/35 p-3 md:hidden" aria-label="メニューを開く">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <section id="top" className="relative z-10 flex min-h-[calc(100vh-88px)] items-center px-6 pb-24 sm:px-10 lg:px-16">
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
            {/* ▼ クリックで下のフォームへスクロール ▼ */}
            <a href="#journeys" className="group rounded-full bg-[#2D4F36] px-10 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3d6848] hover:shadow-xl">
              <span className="mb-1 flex flex-col items-center justify-center text-sm font-medium opacity-90">ハラルチェックリスト</span>
              <span className="flex items-center justify-center text-lg font-bold">
                ダウンロード <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a href="#contact" className="group rounded-full bg-[#2D4F36] px-10 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3d6848] hover:shadow-xl">
              <span className="mb-1 flex flex-col items-center justify-center text-sm font-medium opacity-90">OTA集客に繋げる</span>
              <span className="flex items-center justify-center text-lg font-bold">
                相談 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <aside className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 border-l border-white/30 pl-6 lg:block" aria-label="対応国を選択">
        <p className="mb-4 text-[10px] tracking-[0.3em] text-white/65">COUNTRY STANDARDS</p>
        <div className="space-y-3">
          {countries.map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => setSelectedCountry(country)}
              className={`block text-left text-sm tracking-[0.16em] transition-colors ${selectedCountry === country ? 'text-[#e5c58d]' : 'text-white/70 hover:text-white'}`}
              aria-pressed={selectedCountry === country}
            >
              {country}
            </button>
          ))}
        </div>
        <p className="mt-6 max-w-[150px] text-xs leading-relaxed text-white/70">{selectedCountry}の基準を見る</p>
      </aside>

    </main>
  )
}

export { slides }

// ▼ ここから下がフォームセクション ▼
export function SupportingSections() {
  const [ratio, setRatio] = useState<number[]>([50])
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNationalityChange = (nationality: string, checked: boolean) => {
    if (checked) {
      setSelectedNationalities([...selectedNationalities, nationality])
    } else {
      setSelectedNationalities(selectedNationalities.filter((n) => n !== nationality))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('送信データ:', { ratio: ratio[0], selectedNationalities })
    setIsSubmitted(true)
  }

  return (
    <>
      <section id="journeys" className="min-h-screen bg-[#fcfbf9] text-[#111] py-24 px-6 sm:px-10 lg:px-16 flex justify-center items-center" aria-label="資料ダウンロード">
        <div className="w-full max-w-3xl bg-white p-8 md:p-14 shadow-2xl border border-[#eee] rounded-sm">
          {isSubmitted ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2D4F36] text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">ご入力ありがとうございました。</h2>
              <p className="text-sm md:text-base text-[#666] mb-8 leading-relaxed">
                ご登録いただいたメールアドレス宛に、資料のダウンロードリンクをお送りいたしました。<br/>
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="text-sm tracking-wider uppercase rounded-none border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors px-8 py-6">
                再入力する
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-10 border-b border-[#eee] pb-8 text-center">
                <span className="text-[#e5c58d] text-sm tracking-[0.2em] uppercase mb-2 block font-medium">Download</span>
                <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-[#17211f]">ハラル対応資料 ダウンロード</h2>
                <p className="text-sm text-[#666] mt-4">必要な情報を入力して「資料をダウンロード」ボタンを押してください。</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 基本情報 */}
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

                {/* 施設アンケート */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-semibold text-[#333]">外国人宿泊比率</Label>
                      <span className="text-lg font-serif text-[#2D4F36]">{ratio[0]}%</span>
                    </div>
                    <Slider
                      value={ratio}
                      onValueChange={(value) => setRatio(value as number[])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] text-[#999]">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
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
                  <Button type="submit" className="w-full bg-[#2D4F36] hover:bg-[#1a3020] text-white rounded-none py-8 text-base tracking-[0.2em] font-medium uppercase transition-colors">
                    資料をダウンロードする
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
      
      {/* お問い合わせセクション */}
      <section id="contact" className="h-screen bg-[#24312d] flex items-center justify-center flex-col text-white" aria-label="お問い合わせ">
        <p className="mb-4 text-xs tracking-[0.3em] text-[#e5c58d]">CONTACT</p>
        <h2 className="text-3xl md:text-4xl font-serif mb-8">お気軽にご相談ください</h2>
        <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="border border-white/50 px-10 py-4 hover:bg-white hover:text-[#24312d] transition-colors tracking-widest text-sm">
          お問い合わせへ
        </a>
      </section>
    </>
  )
}

export default HeroSlider
