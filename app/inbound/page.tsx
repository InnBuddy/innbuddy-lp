'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowDown, Download, X, CheckSquare, FileText, Table, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

const papers = [
  { 
    title: 'インバウンド攻略マニュアル', 
    catchcopyNode: (
      <span className="text-[#111111] font-bold text-sm md:text-base">
        これ一冊でインバウンドの今を<br />
        <strong className="text-base md:text-lg font-black text-[#111111]">数字</strong>で把握
      </span>
    ),
    text: 'インバウンド市場の動向から実践的な受け入れノウハウまでを網羅', 
    filename: 'InnBuddy_インバウンドガイドブック2026.pdf',
  },
  { 
    title: 'フロント接客翻訳', 
    catchcopyNode: (
      <span className="text-[#111111] font-bold text-sm md:text-base">
        <strong className="text-lg md:text-2xl font-black text-[#111111]">200</strong>パターン×重要<strong className="text-lg md:text-2xl font-black text-[#111111]">19</strong>言語
      </span>
    ),
    text: 'チェックインから周辺案内まで、フロント業務で必須の多言語対応シート', 
    filename: 'フロント接客翻訳_19言語対応版.xlsx',
  },
  { 
    title: '多言語接客フレーズ集', 
    catchcopyNode: (
      <span className="text-[#111111] font-bold text-sm md:text-base">
        <strong className="text-lg md:text-2xl font-black text-[#111111]">1000</strong>パターン×重要<strong className="text-lg md:text-2xl font-black text-[#111111]">19</strong>言語
      </span>
    ),
    text: '現場のあらゆるシーンで役立つ、やさしい多言語フレーズ集', 
    filename: '多言語接客フレーズ集_19言語対応版.xlsx',
  },
  { 
    title: 'コメント返信翻訳', 
    catchcopyNode: (
      <span className="text-[#111111] font-bold text-sm md:text-base">
        <strong className="text-lg md:text-2xl font-black text-[#111111]">300</strong>パターン×重要<strong className="text-lg md:text-2xl font-black text-[#111111]">19</strong>言語
      </span>
    ),
    text: '感謝と誠意を届ける、多言語レビュー返信テンプレート', 
    filename: 'コメント返信翻訳_19言語対応版.xlsx',
  },
]

const useCases = [
  {
    title: '1. インバウンド攻略マニュアル',
    tag: '戦略・経営',
    howToUse: '支配人・経営陣で共有し、自施設が狙うべき国籍や滞在・単価戦略の軸を決める際にご活用ください。',
    result: '数値根拠に基づいた受入体制が整い、無駄な投資を防ぎながら売上・客単価を確実に引き上げられます。',
  },
  {
    title: '2. フロント接客翻訳',
    tag: 'フロント・受付',
    howToUse: 'フロントカウンターに印刷して常備。チェックイン・館内説明・周辺案内時に指差しで案内します。',
    result: '言葉の壁による説明漏れや手続きの滞りがゼロになり、到着時の不安を「安心」へ変えます。',
  },
  {
    title: '3. 多言語接客フレーズ集',
    tag: 'レストラン・客室・現場',
    howToUse: '食事の案内、アレルギー確認、部屋の使い方、トラブル対応など、現場スタッフ全員で日常的に活用。',
    result: '「話せない恐怖」が消え、AIには真似できない温かいコミュニケーションと笑顔が生まれます。',
  },
  {
    title: '4. コメント返信翻訳',
    tag: 'マーケティング・WEB',
    howToUse: 'Booking.comやTrip.com等の海外OTAに寄せられたレビューに対し、状況に応じたフレーズを選んで返信。',
    result: '迅速で誠意ある多言語返信により高評価（★）を獲得。海外客からの信頼が高まり、次の予約を呼び込みます。',
  },
]

const nationalitiesList = [
  '中国', '台湾', '韓国', '香港', 'アメリカ', 'オーストラリア', 'ロシア', '東南アジア', 'ヨーロッパ', '中東地域', '中南米', 'その他',
]
const ratioOptions = Array.from({ length: 11 }, (_, i) => (i * 10).toString())

const localPhotos = [
  { src: '/library/inbound/inbound-box-collage.png', alt: 'Inbound Box コラージュ' },
  { src: '/library/inbound/sdg-reuse.png', alt: '竹製カトラリーと風呂敷のリユース素材' },
  { src: '/library/inbound/sdg-local-food.png', alt: '地域の旬の野菜を使った食材' },
  { src: '/library/inbound/sdg-refill.png', alt: 'マイボトルに給水する旅行者' },
  { src: '/library/inbound/sdg-community.png', alt: '地域の人々が植樹する様子' },
  { src: '/library/inbound/sdg-paper-signs.png', alt: '再生紙の多言語案内カード' },
  { src: '/library/inbound/sdg-craft.png', alt: '再生紙を使ったものづくり' },
  { src: '/library/inbound/hasamiyaki-hero.png', alt: '波佐見焼ヒーロー' },
]

function TileImage({ index = 0, className = '' }: { index?: number; className?: string }) {
  const photo = localPhotos[index % localPhotos.length]
  return (
    <div className={`relative min-h-[120px] md:min-h-[160px] overflow-hidden bg-[#c9c7c0] ${className}`}>
      <img src={photo.src} alt={photo.alt} className="photo-depth absolute inset-0 h-full w-full object-cover grayscale-[.05] transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-0 bg-[#ed6a2b]/10" />
    </div>
  )
}

export default function InboundPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [ratio, setRatio] = useState<string>('')
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([])

  useEffect(() => {
    setIsMounted(true)
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

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    formData.append('ratio', ratio)
    formData.append('nationalities', selectedNationalities.join(' / '))

    try {
      // =========================================================================
      // ★ご自身のGAS URLをここに貼り付けてください★
      const GAS_URL = '★ここにGASのURLを貼り付けてください★'
      // =========================================================================

      if (GAS_URL.startsWith('http')) {
        await fetch(GAS_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        })
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('送信エラー', error)
      alert('通信エラーが発生しました。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) return null

  return (
    <main id="top" className="inbound-scene min-h-screen overflow-x-hidden bg-[#ed6a2b] text-white">
      <div className="inbound-frame mx-auto max-w-[1500px] border-x border-black">
        
        {/* =========================================================
            1ページ目：ファーストビュー
        ========================================================= */}
        <section className="min-h-screen flex flex-col justify-between">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#e7e4df]/30 flex-grow">
            <div className="flex flex-col justify-end border-b md:border-b-0 border-r border-[#e7e4df]/30 p-3 md:p-5">
              <div>
                <p className="mb-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.12em]">【明日から現場が変わる】</p>
                <h1 className="hero-title text-[clamp(1.6rem,3.8vw,4.2rem)] font-bold leading-[.9] tracking-[-0.08em] break-words">Inbound<br />Box.</h1>
              </div>
            </div>

            <TileImage index={0} className="border-b md:border-b-0 border-r border-[#e7e4df]/30" />

            <div className="flex flex-col justify-between border-b md:border-b-0 border-r border-[#e7e4df]/30 p-3 md:p-5">
              <div>
                <span className="text-3xl md:text-5xl font-light tracking-[-0.1em]">19</span>
                <p className="max-w-[150px] text-xs md:text-sm font-bold leading-4 md:leading-5 mt-1">主要19言語対応・<br />インバウンド接客ツール</p>
              </div>
              <p className="text-[10px] md:text-[11px] leading-4 opacity-90 mt-2 border-t border-white/20 pt-2 font-medium">
                世界約80カ国旅で100カ国以上の人々とコミュニケーションした旅のプロが直々に監修。
              </p>
            </div>

            <div className="flex flex-col justify-between border-b md:border-b-0 border-[#e7e4df]/30 p-3 md:p-5">
              <span className="text-[10px] font-bold tracking-[0.2em]">SDGs / ACTION</span>
              <p className="text-base md:text-lg font-bold leading-5 tracking-[-0.05em]">人と地域に<br />やさしい接客を。</p>
              <p className="text-[10px] leading-4 opacity-75">印刷して現場に置くだけ・すぐ使える</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#e7e4df]/30 flex-grow">
            <div className="col-span-2 border-b md:border-b-0 border-r border-[#e7e4df]/30 p-3 md:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="mb-1 text-[10px] font-bold tracking-[0.2em]">COMPLETE PACK / 1160+ ITEMS</p>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.07em] md:text-3xl">ガイド＆テンプレートを<br />一括で無料ダウンロード</h2>
                  </div>
                  <span className="hidden text-4xl font-light md:block">04</span>
                </div>
                
                {/* 6行メッセージ（枠なし・白文字・右詰め） */}
                <div className="mt-3 text-[11px] md:text-xs leading-relaxed text-white text-right space-y-1 font-medium drop-shadow-sm">
                  <p>言葉の壁を、人の温かさで超える。</p>
                  <p>AIじゃできない「人の接客」を取り戻す。</p>
                  <p>19言語のガイドが、あなたの「おもてなし」を助ける。</p>
                  <p>効率化の先にあるのは、お客様の笑顔。</p>
                  <p>ツールは箱の中、心はあなたの手の中。</p>
                  <p>一緒に見て、話して、そして笑顔に。</p>
                </div>
              </div>
              
              {/* 黒のネオンBOXボタン */}
              <button 
                onClick={handleDownloadClick} 
                className="mt-3 inline-flex items-center gap-2.5 bg-[#0a0a0a] text-white border border-[#ff6a00] px-6 py-3 text-xs font-bold tracking-[0.15em] shadow-[0_0_20px_rgba(255,106,0,0.5)] hover:shadow-[0_0_30px_rgba(255,106,0,0.85)] hover:border-[#ff8800] hover:scale-[1.02] transition-all duration-300 cursor-pointer w-fit"
              >
                <span className="drop-shadow-[0_0_8px_rgba(255,106,0,0.9)]">30秒で一括ダウンロード</span>
                <ArrowDown className="h-4 w-4 text-[#ff8800] animate-bounce filter drop-shadow-[0_0_8px_#ff5500]" />
              </button>
            </div>

            <TileImage index={1} className="border-b md:border-b-0 border-r border-[#e7e4df]/30" />
            <TileImage index={2} className="border-b md:border-b-0 border-[#e7e4df]/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="col-span-2 flex items-center border-b md:border-b-0 border-r border-[#e7e4df]/30 p-3 md:p-5 bg-[#ed6a2b]">
              <p className="text-lg font-bold leading-tight tracking-[-0.05em] md:text-2xl">現場に置くだけ。<br />今日から。すぐ使える。</p>
            </div>
            <div className="col-span-2 flex items-center p-3 md:p-5 bg-[#ed6a2b]">
              <p className="text-xs leading-5 opacity-90">観光・宿泊・飲食の現場で、言葉や文化の違いを負担にしない。現場で役立つ4つの資料を、ひとつの箱に。</p>
            </div>
          </div>
        </section>

        {/* =========================================================
            2ページ目
        ========================================================= */}
        <section className="bg-white text-[#111] border-b border-black/20">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="col-span-2 border-b md:border-b-0 border-r border-black/15 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.07em] md:text-5xl text-[#111]">
                  過去最高、<br /><span className="text-[#ed6a2b]">9.5兆円</span>の巨大市場へ。
                </h2>
              </div>
              <p className="mt-6 text-xs md:text-sm leading-7 text-[#444] max-w-md">
                訪日客数・消費額ともに過去最高を更新。政府目標である2030年「消費額15兆円」に向け、インバウンド対応は宿泊・観光業の成長に直結する必須戦略です。
              </p>
            </div>
            
            <div className="border-b md:border-b-0 border-r border-black/15 p-6 md:p-10 flex flex-col justify-between bg-[#faf8f5]">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#666]">CONSUMPTION</span>
              <div>
                <span className="text-4xl md:text-5xl font-bold tracking-[-0.05em] text-[#ed6a2b]">9.5兆円</span>
                <p className="mt-2 text-xs font-bold text-[#333]">訪日外国人消費額の実績</p>
              </div>
              <p className="text-[10px] text-[#888]">※観光庁最新データより</p>
            </div>

            <div className="p-6 md:p-10 flex flex-col justify-between bg-[#faf8f5]">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#666]">TARGET 2030</span>
              <div>
                <span className="text-4xl md:text-5xl font-bold tracking-[-0.05em] text-[#111]">15兆円</span>
                <p className="mt-2 text-xs font-bold text-[#333]">2030年 政府インバウンド目標</p>
              </div>
              <p className="text-[10px] text-[#888]">※経済波及効果19兆円規模</p>
            </div>
          </div>
        </section>

        {/* =========================================================
            3ページ目
        ========================================================= */}
        <section className="bg-[#fcfbf9] text-[#111] border-b border-black/20">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="col-span-2 border-b md:border-b-0 border-r border-black/15 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.07em] md:text-5xl text-[#111]">
                  「泊まるだけ」から<br /><span className="text-[#ed6a2b]">「体験を売る」</span>宿へ。
                </h2>
              </div>
              <p className="mt-6 text-xs md:text-sm leading-7 text-[#444] max-w-md">
                単なる宿泊の枠を超えた「体験価値」の提供が単価と満足度を引き上げます。円滑な多言語接客がその第一歩となります。
              </p>
            </div>

            <div className="border-b md:border-b-0 border-r border-black/15 p-6 md:p-10 flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#666]">HIGH-SPENDERS</span>
              <div>
                <span className="text-4xl md:text-5xl font-bold tracking-[-0.05em] text-[#ed6a2b]">+63%</span>
                <p className="mt-2 text-xs font-bold text-[#333]">高所得層の消費単価比率</p>
              </div>
              <p className="text-[10px] text-[#888]">※世帯年収20万ドル以上</p>
            </div>

            <div className="p-6 md:p-10 flex flex-col justify-between bg-white">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#666]">OPPORTUNITY</span>
              <div>
                <span className="text-4xl md:text-5xl font-bold tracking-[-0.05em] text-[#111]">44%</span>
                <p className="mt-2 text-xs font-bold text-[#333]">体験・娯楽費の未購入率</p>
              </div>
              <p className="text-[10px] text-[#888]">※大きな開拓ポテンシャル</p>
            </div>
          </div>
        </section>

        {/* =========================================================
            4ページ目：ボックスの中身
        ========================================================= */}
        <section id="contents" className="border-b border-[#e7e4df]/30 px-5 py-8 md:px-8 md:py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.08em] md:text-5xl">ボックスの中身</h2>
            </div>
            <p className="hidden text-right text-xs leading-5 opacity-75 md:block">一括ダウンロードで<br />すべてのツールが揃います。</p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-[#e7e4df]/30 bg-[#e7e4df]/30 md:grid-cols-4">
            {papers.map((paper, index) => (
              <article key={paper.title} className="relative flex min-h-[250px] md:min-h-[290px] flex-col justify-end overflow-hidden bg-[#ed6a2b] p-5 md:p-6 group text-right">
                <img src={localPhotos[index + 3].src} alt={paper.title} className="photo-depth absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-105" />
                
                <div className="relative z-10 flex flex-col items-end justify-end mt-auto text-right w-full">
                  <h3 className="text-xl font-bold tracking-[-0.06em] md:text-2xl text-white drop-shadow-sm text-right">{paper.title}</h3>
                  
                  <div className="mt-2 text-right">
                    {paper.catchcopyNode}
                  </div>

                  <p className="mt-3 text-xs leading-5 opacity-90 text-right text-white drop-shadow-sm">{paper.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================================================
            5ページ目：4つの武器の活用方法
        ========================================================= */}
        <section className="bg-[#faf8f5] text-[#111111] border-b border-black/20 px-5 py-10 md:px-12 md:py-16">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.06em] text-[#111111]">
              現場で使える、<br /><span className="text-[#ed6a2b]">4つの武器</span>の活用方法
            </h2>
            <p className="mt-4 text-xs md:text-sm text-[#555555] leading-relaxed">
              資料を手に入れたその日から、現場がどう変わり、どのように成果へ繋がるのかをご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {useCases.map((item) => (
              <div key={item.title} className="bg-white p-6 md:p-8 border border-black/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <span className="text-xs font-bold tracking-wider text-[#ed6a2b] bg-[#ed6a2b]/10 px-2.5 py-1 rounded-sm">
                      {item.tag}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#ed6a2b]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-3">{item.title}</h3>
                  
                  <div className="space-y-3 text-xs md:text-sm text-[#444444] leading-relaxed">
                    <div className="bg-[#faf8f5] p-3 border-l-2 border-[#ed6a2b]">
                      <p className="font-bold text-[#111111] mb-1 flex items-center gap-1.5 text-xs">
                        <ArrowRight className="w-3.5 h-3.5 text-[#ed6a2b]" /> どうやって使うか？
                      </p>
                      <p className="text-xs text-[#555555]">{item.howToUse}</p>
                    </div>

                    <div className="bg-white p-3 border border-gray-200">
                      <p className="font-bold text-[#ed6a2b] mb-1 flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ed6a2b]" /> 導入するとどうなる？
                      </p>
                      <p className="text-xs text-[#222222] font-medium">{item.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={handleDownloadClick} 
              className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white border border-[#ff6a00] px-8 py-4 text-xs md:text-sm font-bold tracking-[0.15em] shadow-[0_0_20px_rgba(255,106,0,0.5)] hover:shadow-[0_0_30px_rgba(255,106,0,0.85)] hover:border-[#ff8800] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <span className="drop-shadow-[0_0_8px_rgba(255,106,0,0.9)]">今すぐ4つの武器を無料ダウンロード</span>
              <ArrowDown className="h-4 w-4 text-[#ff8800] animate-bounce filter drop-shadow-[0_0_8px_#ff5500]" />
            </button>
          </div>
        </section>

        {/* =========================================================
            6ページ目：時空の歪みポータルデザイン
        ========================================================= */}
        <section 
          id="download" 
          className="grid border-b border-black/40 md:grid-cols-[1fr_1fr] relative overflow-hidden text-white"
          style={{
            background: 'radial-gradient(circle at 75% 50%, #f47735 0%, #b84417 22%, #4a1509 45%, #180803 70%, #050505 100%)',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute -inset-[100%] opacity-20 pointer-events-none animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_300deg,#ed6a2b_360deg)]" />

          <div className="p-6 md:p-12 relative z-10 flex flex-col justify-between">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#ed6a2b] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> READY FOR TOMORROW
            </span>
            <h2 className="mt-12 text-4xl font-bold leading-[.95] tracking-[-0.09em] md:text-7xl text-white drop-shadow-md">
              伝わることは、<br />やさしさの<br />インフラ。
            </h2>
          </div>

          <div className="flex flex-col justify-end border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-12 relative z-10 backdrop-blur-[2px]">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">次のアクション。</h3>
            <p className="max-w-md text-xs md:text-sm leading-7 text-gray-200 mb-8 font-medium">
              明日からの接客を変える、さらなるステップへ。
            </p>

            {/* 枠なし・純白文字×オレンジネオングロー効果 */}
            <div className="flex flex-col gap-6 w-full pt-2">
              <a 
                href="https://timerex.net/s/InnBuddy_ESG/386fd946/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[#ff6a00]/40 pb-3.5 transition-all duration-300 hover:border-[#ff6a00] cursor-pointer"
              >
                <span 
                  className="text-sm md:text-lg font-black tracking-[0.15em] text-white transition-all duration-300 group-hover:scale-[1.01]"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 8px #ff6a00, 0 0 18px #ff5500, 0 0 28px #ff3300',
                    filter: 'drop-shadow(0 0 6px rgba(255, 102, 0, 0.9))'
                  }}
                >
                  海外からの集客を強化したい方はこちら
                </span>
                <ExternalLink 
                  className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" 
                  style={{ filter: 'drop-shadow(0 0 8px #ff5500)' }}
                />
              </a>

              <a 
                href="https://innbuddy-japan.com/halal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[#ff6a00]/40 pb-3.5 transition-all duration-300 hover:border-[#ff6a00] cursor-pointer"
              >
                <span 
                  className="text-sm md:text-lg font-black tracking-[0.15em] text-white transition-all duration-300 group-hover:scale-[1.01]"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 8px #ff6a00, 0 0 18px #ff5500, 0 0 28px #ff3300',
                    filter: 'drop-shadow(0 0 6px rgba(255, 102, 0, 0.9))'
                  }}
                >
                  ハラル理解を深めたい方はこちら
                </span>
                <ExternalLink 
                  className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" 
                  style={{ filter: 'drop-shadow(0 0 8px #ff5500)' }}
                />
              </a>
            </div>
          </div>
        </section>
        
        {/* FOOTER */}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-6 text-xs font-bold tracking-[0.12em] text-white bg-black">
          <div>
            <span>© InnBuddy 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://innbuddy-japan.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#ed6a2b] transition-colors flex items-center gap-1"
            >
              ブランドページ <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://innbuddy-japan.com/contact" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#ed6a2b] transition-colors flex items-center gap-1"
            >
              お問い合わせ <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </footer>
      </div>

      {/* =========================================================
          ダウンロードポップアップ（モーダル）
      ========================================================= */}
      {showForm && typeof window !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          overflowY: 'auto'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            color: '#111111',
            maxWidth: '520px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            borderRadius: '4px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            margin: 'auto'
          }}>
            <button 
              type="button"
              onClick={() => setShowForm(false)} 
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#666666'
              }}
              aria-label="閉じる"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0', color: '#111111' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#ed6a2b',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}>
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111111', marginBottom: '8px' }}>
                  ご入力ありがとうございました。
                </h2>
                <p style={{ fontSize: '12px', color: '#666666', marginBottom: '20px' }}>
                  以下のボタンより、各資料をご自由にダウンロードいただけます。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {papers.map((paper) => (
                    <a 
                      key={paper.title}
                      href={`/library/inbound/inbound-box/${paper.filename}`}
                      download 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#f9f9f9',
                        padding: '12px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        textDecoration: 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText className="w-4 h-4" style={{ color: '#ed6a2b' }} />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#111111' }}>{paper.title}</span>
                      </div>
                      <Download className="w-4 h-4" style={{ color: '#ed6a2b' }} />
                    </a>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={() => setShowForm(false)} 
                  style={{
                    backgroundColor: '#e5e5e5',
                    color: '#333333',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  閉じる
                </button>
              </div>
            ) : (
              <div style={{ color: '#111111' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #eeeeee', paddingBottom: '12px', marginBottom: '16px' }}>
                  <span style={{ color: '#ed6a2b', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 'bold', textTransform: 'uppercase' }}>Download</span>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111111', marginTop: '4px' }}>Inbound Box 一括ダウンロード</h2>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>施設名 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="facilityName" 
                        required 
                        placeholder="例: ホテル インバディ" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>ご担当者名 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="representativeName" 
                        required 
                        placeholder="例: 旅行 太郎" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>メールアドレス <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="example@innbuddy.com" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>電話番号 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="phone" 
                        type="tel" 
                        required 
                        placeholder="03-1234-5678" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>ご住所 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="address" 
                        required 
                        placeholder="例: 東京都渋谷区〇〇1-2-3" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>外国人宿泊比率 <span style={{ color: 'red' }}>*</span></label>
                      <select 
                        name="ratio" 
                        value={ratio} 
                        onChange={(e) => setRatio(e.target.value)} 
                        required 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box', cursor: 'pointer' }}
                      >
                        <option value="" disabled>選択してください</option>
                        {ratioOptions.map(opt => <option key={opt} value={opt}>{opt}%</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '6px' }}>ここ1年で利用されたお客様の国籍（複数選択可）</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 4px', backgroundColor: '#f9f9f9', padding: '10px', border: '1px solid #eee' }}>
                      {nationalitiesList.map((country) => (
                        <label key={country} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '10px', color: '#333' }}>
                          <input 
                            type="checkbox"
                            value={country}
                            onChange={(e) => handleNationalityChange(country, e.target.checked)}
                            style={{ accentColor: '#ed6a2b', width: '14px', height: '14px', cursor: 'pointer' }}
                          />
                          <span>{country}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: '8px' }}>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      style={{
                        width: '100%',
                        height: '42px',
                        backgroundColor: isSubmitting ? '#999' : '#ed6a2b',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {isSubmitting ? '送信中...' : <><Download className="w-4 h-4" /> Inbound Boxをダウンロード</>}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </main>
  )
}