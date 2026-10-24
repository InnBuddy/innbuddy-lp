'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// ★ iOSの絵文字化を100%防止するシャープな矢印記号コンポーネント ★
const ArrowUpRight = ({ className = "w-3 h-3 inline-block ml-1" }: { className?: string }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: 'inline-block', verticalAlign: '-1px' }}
    aria-hidden="true"
  >
    <path d="M3 9L9 3" />
    <path d="M4 3H9V8" />
  </svg>
)

const projects = [
  { num: '01', title: 'InnBuddy OTA', image: '/images/library/ota.png', museumImage: '/images/library/museum_01.png', description: 'OTA運用代行サービスの紹介とご相談窓口', status: 'active', aspect: '16/9', href: '/ota' },
  { num: '02', title: 'Brand Vision Report', image: '/images/library/report.png', museumImage: '/images/library/museum_02.png', description: 'サステナブル思考のデジタルフォトブランドブック', status: 'coming_soon', aspect: '3/4' },
  { num: '03', title: 'Journal', image: '/images/library/journal.png', museumImage: '/images/library/museum_03.png', description: 'ホテル運営・ブランディング・マーケティング専門メディア', status: 'coming_soon', aspect: '1/1' },
  { num: '04', title: 'ハラルBOX', image: '/images/library/halal.png', museumImage: '/images/library/museum_04.png', description: '役立つハラルガイドとチェックシートが利用可能', status: 'active', aspect: '4/3', width: '42%', href: '/halal' },
  { num: '05', title: 'インバウンドBOX', image: '/images/library/inbound.png', museumImage: '/images/library/museum_05.png', description: '18言語対応の口コミ翻訳や接客指差しシートなど4点セット', status: 'active', aspect: '3/4', width: '35%', href: '/inbound' },
  { num: '06', title: 'SDGs', image: '/images/library/sdgs.png', museumImage: '/images/library/museum_06.png', description: '宿で実践できる世界のサステナブルな取り組み事例', status: 'active', aspect: '1/1', width: '25vw', href: '/sustainable' },
  { num: '07', title: '組織ウェルビーイング', image: '/images/library/wellbeing.png', museumImage: '/images/library/museum_07.png', description: '採用・組織づくり。スタッフが定着する環境づくりのヒント', status: 'coming_soon', aspect: '16/9', width: '36vw' },
  { num: '08', title: '宿とAI', image: '/images/library/ai.png', museumImage: '/images/library/museum_08.png', description: '日常業務で使えるAIサポートの基本', status: 'coming_soon', aspect: '3/4', width: '26vw' },
  { num: '09', title: '宿とAI Pro', image: '/images/library/aipro.png', museumImage: '/images/library/museum_09.png', description: 'プロ向けAI活用術。より高度な運用と業務効率化を実現', status: 'coming_soon', aspect: '4/3', width: '32vw' },
  { num: '10', title: 'STORY', image: '/images/library/story.png', museumImage: '/images/library/museum_10.png', description: '世界の旅行者から届くリアルなインタビューメディア', status: 'active', href: '/story' },
  { num: '11', title: 'Analysis', image: '/images/library/analysis.png', museumImage: '/images/library/museum_11.png', description: '専門的な分析データやマーケットレポートなど', status: 'coming_soon' },
  { num: '12', title: 'WAAI COMICS', image: '/images/library/comics.png', museumImage: '/images/library/museum_12.png', description: '短編漫画で宿の課題に気づき考えるケーススタディ', status: 'coming_soon', aspect: '3/4' },
  { num: '13', title: 'FOOD VISUAL', image: '/images/library/food.png', museumImage: '/images/library/museum_13.png', description: '忙しい料理人の考える時間を減らす、素材別料理アイデア', status: 'coming_soon', aspect: '1/1' },
  { num: '14', title: 'INTERIOR', image: '/images/library/interior.png', museumImage: '/images/library/museum_14.png', description: 'NO改装でおしゃれ宿に、サステナブルなインテリアアイデア', status: 'coming_soon', aspect: '16/9' },
  { num: '15', title: 'SHIRANGAKE', image: '/images/library/shirangake.png', museumImage: '/images/library/museum_15.png', description: '英語で知る日本の方言。インバウンド旅行客を地方へ導く', status: 'active', aspect: '16/9', href: '/shirangake' },
]

const AutumnLeaf = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
    <path d="M12 2C11.5 5 8 7 8 10C8 12.5 9.5 14 12 16C14.5 14 16 12.5 16 10C16 7 12.5 5 12 2Z" />
    <path d="M12 16V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const SakuraPetal = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
    <path d="M12,2 C15,2 18,5 18,9 C18,13 14,18 12,22 C10,18 6,13 6,9 C6,5 9,2 12,2 Z" />
  </svg>
)

const RainDrop = () => (
  <div style={{ width: '1.5px', height: '25px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.7))', borderRadius: '1px' }} />
)

type Particle = { id: number; left: number; type?: number; size?: number; color?: string; delay?: number; opacity?: number }

export default function Page() {
  const [isClient, setIsClient] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lineupOpen, setLineupOpen] = useState(false)
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [gridBg, setGridBg] = useState('/images/library/photo-river-sauna.png')

  const [sakuraParticles, setSakuraParticles] = useState<Particle[]>([])
  const [rainParticles, setRainParticles] = useState<Particle[]>([])
  const [leafParticles, setLeafParticles] = useState<Particle[]>([])

  const mainRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)
  const sakuraRef = useRef<HTMLDivElement>(null)
  const rainRef = useRef<HTMLDivElement>(null)
  const carousel3dRef = useRef<HTMLDivElement>(null)
  const museumContainerRef = useRef<HTMLDivElement>(null)
  const rotY = useRef(0)
  const targetRotY = useRef(0)
  const isDragging = useRef(false)
  const hasDragged = useRef(false)
  const startX = useRef(0)

  useEffect(() => {
    setIsClient(true)
    
    const isMobile = window.innerWidth < 768
    const sakuraCount = isMobile ? 12 : 25
    const rainCount = isMobile ? 40 : 150
    const leafCount = isMobile ? 8 : 14

    setSakuraParticles(
      Array.from({ length: sakuraCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: Math.random() > 0.4 ? '#ffb7c5' : '#a8d8b9',
        size: 14 + Math.random() * 16,
      }))
    )

    setRainParticles(
      Array.from({ length: rainCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        opacity: 0.4 + Math.random() * 0.6,
      }))
    )

    setLeafParticles(
      Array.from({ length: leafCount }).map((_, i) => ({
        id: i,
        left: (i * (100 / leafCount)) + 2,
        type: i % 3,
        size: 18 + (i % 4) * 6,
      }))
    )
  }, [])

  useEffect(() => {
    let isMounted = true
    let lenis: any = null
    let updateLenis: any = null
    let gsapInstance: any = null
    let animationContext: any = null

    const initAnimations = async () => {
      if (typeof window === 'undefined') return

      try {
        const Lenis = (await import('lenis')).default
        const gsapModule = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        if (!isMounted) return

        gsapInstance = gsapModule
        gsapInstance.registerPlugin(ScrollTrigger)

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })

        lenis.on('scroll', ScrollTrigger.update)
        updateLenis = (time: number) => lenis?.raf(time * 1000)
        gsapInstance.ticker.add(updateLenis)
        gsapInstance.ticker.lagSmoothing(0)

        if (!isMounted) return

        animationContext = gsapInstance.context(() => {
          if (carousel3dRef.current) {
            gsapInstance.to(carousel3dRef.current, {
              rotationY: 360,
              duration: 22,
              repeat: -1,
              ease: 'none',
            })
          }

          const leafElements = leavesRef.current?.querySelectorAll('.leaf-particle')
          if (leafElements && leafElements.length > 0) {
            leafElements.forEach((leaf, idx) => {
              gsapInstance.to(leaf, {
                y: '100vh',
                x: `+=${(idx % 2 === 0 ? 1 : -1) * (60 + Math.random() * 80)}`,
                rotationX: Math.random() * 720,
                rotationY: Math.random() * 720,
                rotationZ: Math.random() * 360,
                duration: 8 + Math.random() * 7,
                repeat: -1,
                ease: 'none',
                delay: idx * 0.5,
              })
            })
          }

          const sakuraElements = sakuraRef.current?.querySelectorAll('.sakura-particle')
          if (sakuraElements && sakuraElements.length > 0) {
            sakuraElements.forEach((petal, idx) => {
              gsapInstance.to(petal, {
                y: '120vh',
                x: `+=${(idx % 2 === 0 ? 1 : -1) * (40 + Math.random() * 60)}`,
                rotationX: Math.random() * 360,
                rotationY: Math.random() * 360,
                rotationZ: Math.random() * 360,
                duration: 6 + Math.random() * 5,
                repeat: -1,
                ease: 'none',
                delay: Math.random() * 5,
              })
            })
          }

          const rainElements = rainRef.current?.querySelectorAll('.rain-particle')
          if (rainElements && rainElements.length > 0) {
            rainElements.forEach((drop) => {
              gsapInstance.to(drop, {
                y: '120vh',
                duration: 0.25 + Math.random() * 0.35,
                repeat: -1,
                ease: 'none',
                delay: Math.random() * 1.5,
              })
            })
          }

          const reveals = gsapInstance.utils.toArray('.reveal-item')
          reveals.forEach((el: any) => {
            gsapInstance.fromTo(
              el,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 82%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          })
        }, mainRef)
      } catch (e) {
        console.error('Failed to initialize animations:', e)
      }
    }

    if (sakuraParticles.length > 0) {
      initAnimations()
    }

    let animationFrameId: number
    const renderLoop = () => {
      if (!isDragging.current) {
        targetRotY.current -= 0.12
      }
      rotY.current += (targetRotY.current - rotY.current) * 0.08
      if (museumContainerRef.current) {
        museumContainerRef.current.style.transform = `rotateY(${rotY.current}deg)`
      }
      animationFrameId = requestAnimationFrame(renderLoop)
    }
    renderLoop()

    return () => {
      isMounted = false
      if (animationContext) {
        animationContext.revert()
      }
      if (gsapInstance && updateLenis) {
        gsapInstance.ticker.remove(updateLenis)
      }
      if (lenis) {
        lenis.destroy()
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [sakuraParticles])

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    hasDragged.current = false
    startX.current = e.clientX
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 6) {
      hasDragged.current = true
    }
    targetRotY.current += dx * 0.25
    startX.current = e.clientX
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  const activeProject = projects[activeHeroIndex]
  const group1to3 = projects.slice(0, 3)
  const item4 = projects[3]
  const item5 = projects[4]
  const group6to9 = projects.slice(5, 9)
  const item10 = projects[9]
  const item11 = projects[10]
  const item12 = projects[11]
  const item13 = projects[12]
  const item14 = projects[13]
  const item15 = projects[14]

  return (
    <main
      className="portfolio-shell w-full max-w-full m-0 p-0 overflow-x-clip"
      ref={mainRef}
    >
      {/* ドロワーメニュー */}
      <div style={{
        position: 'fixed', top: 0, right: menuOpen ? 0 : '-100%',
        width: 'min(400px, 100vw)', height: '100svh',
        backgroundColor: '#111', color: '#f2f0e9',
        zIndex: 999, padding: '80px 40px', overflowY: 'auto',
        transition: 'right 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '25px', right: '35px', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        <h3 style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#777', marginBottom: '40px' }}>MEDIA LIST</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <li><a href="#top" onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', textDecoration: 'none', color: '#f2f0e9' }}>Library (Top)</a></li>
          {projects.map((p) => {
            const hasLink = !!p.href
            return (
              <li key={p.title}>
                {hasLink ? (
                  <Link href={p.href!} onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', textDecoration: 'none', color: '#f2f0e9' }} className="flex items-center gap-1">
                    <span>{p.num}. {p.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </Link>
                ) : (
                  <span style={{ fontSize: '18px', color: '#666' }}>
                    {p.num}. {p.title} <span style={{ fontSize: '11px', color: '#888' }}>[Soon]</span>
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 998, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity 0.6s ease' }} />

      {/* スマホ用 LINEUP ボトムシート */}
      {lineupOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setLineupOpen(false)}
          />
          <div className="relative z-10 bg-[#181c19] text-[#f2f0e9] rounded-t-2xl max-h-[80vh] flex flex-col p-6 shadow-2xl border-t border-white/20 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center pb-3 border-b border-white/15 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9ACA47]"></span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase">LINEUP (01—15)</span>
              </div>
              <button
                onClick={() => setLineupOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                aria-label="閉じる"
              >
                ✕
              </button>
            </div>
            
            <p className="text-[10px] text-white/60 mb-3">タップすると画面中央のプレビューが切り替わります</p>

            <div className="overflow-y-auto space-y-1 pr-1" style={{ WebkitOverflowScrolling: 'touch' }}>
              {projects.map((item, idx) => {
                const isActive = activeHeroIndex === idx
                const isComingSoon = item.status === 'coming_soon'
                const hasLink = !!item.href

                return (
                  <div
                    key={'sheet_' + item.num + item.title}
                    onClick={() => {
                      setActiveHeroIndex(idx)
                      setLineupOpen(false)
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/20 border-white/40 shadow-sm'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <span className="font-serif text-sm text-white/60 w-6 flex-shrink-0">{item.num}</span>
                    <span className="text-sm font-medium text-white flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </span>
                    {isComingSoon && (
                      <span className="text-[9px] text-white/40 border border-white/20 px-1.5 py-0.5 rounded flex-shrink-0">
                        Soon
                      </span>
                    )}
                    {hasLink && <ArrowUpRight className="w-3.5 h-3.5 text-white/80 shrink-0" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* トップヒーロー */}
      <section
        className="portfolio-hero relative w-full h-[100svh] min-h-[640px] flex overflow-hidden p-0 m-0 bg-none"
        id="top"
      >
        <header className="portfolio-header absolute top-0 left-0 w-full z-30 flex items-center justify-between px-5 py-4 md:px-9 md:py-6 box-border bg-transparent bg-gradient-to-b from-black/65 to-transparent border-none">
          {/* ★ 「i。」マークを削除し、タイトルのみを配置 ★ */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.12em', fontWeight: 500, color: '#f2f0e9', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>InnBuddy Library</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLineupOpen(true)}
              className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white text-[10px] tracking-[0.15em] uppercase shadow-lg active:scale-95 transition-transform"
            >
              <span className="flex flex-col gap-[3px] w-3.5">
                <span className="w-full h-[1.5px] bg-white rounded-full"></span>
                <span className="w-full h-[1.5px] bg-white rounded-full"></span>
                <span className="w-full h-[1.5px] bg-white rounded-full"></span>
              </span>
              <span>Lineup</span>
            </button>

            <nav className="portfolio-nav hidden md:flex items-center">
              <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: '#f2f0e9', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                Projects
              </button>
            </nav>
            <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="メニュー"><span /><span /></button>
          </div>
        </header>

        <div className="relative w-full md:w-[65%] h-full flex items-center justify-center pt-20 pb-8 px-4 md:p-[90px_40px_40px_40px]">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image src="/images/library/hero-forest.png" alt="Hero Background" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.18)' }} />
          </div>

          <div className="relative z-10 w-[92%] max-w-[360px] md:max-w-[400px] bg-white p-5 md:p-8 shadow-2xl flex flex-col gap-3 md:gap-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>InnBuddy Library</span>
              <span style={{ fontSize: '11px', fontFamily: 'Georgia, serif', color: '#666', fontWeight: 500 }}>{activeProject.num} / 15</span>
            </div>

            {activeProject.href ? (
              <Link href={activeProject.href} className="group relative w-full aspect-square flex-shrink-0 block bg-[#f5f5f5] overflow-hidden cursor-pointer">
                <Image
                  key={activeProject.num}
                  src={activeProject.museumImage || activeProject.image}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-[11px] tracking-[0.2em] uppercase border border-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                    View <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ) : (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', flexShrink: 0, display: 'block', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                <Image src={activeProject.museumImage || activeProject.image} alt={activeProject.title} fill style={{ objectFit: 'cover' }} priority />
              </div>
            )}

            <div style={{ minHeight: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                {activeProject.href ? (
                  <Link href={activeProject.href} style={{ textDecoration: 'none' }} className="flex items-center">
                    <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {activeProject.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 ml-1 text-gray-500 shrink-0" />
                  </Link>
                ) : (
                  <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeProject.title}
                  </h3>
                )}
                {activeProject.status === 'coming_soon' && (
                  <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', border: '1px solid #ddd', padding: '2px 6px', borderRadius: '2px', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>
                    Coming Soon
                  </span>
                )}
              </div>
              <p style={{ fontSize: '11px', color: '#666', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{activeProject.description}</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex relative w-[35%] h-full flex-col justify-center p-[90px_20px_30px_20px] border-l border-white/10">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image src="/images/library/photo-forest-bbq.png" alt="Sidebar Background" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500, width: '100%', maxWidth: '220px' }}>
              LINEUP (01—15)
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%', maxWidth: '220px' }}>
              {projects.map((item, idx) => {
                const isActive = activeHeroIndex === idx
                const isComingSoon = item.status === 'coming_soon'
                const hasLink = !!item.href

                const commonStyle: React.CSSProperties = {
                  display: 'flex', alignItems: 'center', gap: '8px', width: '100%', boxSizing: 'border-box',
                  padding: '3px 8px', borderRadius: '3px', textDecoration: 'none',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                  borderLeft: isActive ? '2px solid #ffffff' : '2px solid transparent',
                  transition: 'all 0.18s ease', cursor: hasLink ? 'pointer' : 'default',
                }

                const content = (
                  <>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)', transition: 'color 0.18s ease', width: '20px', flexShrink: 0 }}>{item.num}</span>
                    <span style={{ fontSize: '11.5px', color: isActive ? '#ffffff' : (isComingSoon ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)'), fontWeight: isActive ? 500 : 400, transition: 'color 0.18s ease', letterSpacing: '0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                      {item.title}
                    </span>
                    {isComingSoon && <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', flexShrink: 0 }}>[Soon]</span>}
                    <span style={{ width: '12px', textAlign: 'right', flexShrink: 0 }}>
                      <ArrowUpRight className={`w-2.5 h-2.5 text-white transition-opacity ${isActive && hasLink ? 'opacity-100' : 'opacity-0'}`} />
                    </span>
                  </>
                )

                return hasLink ? (
                  <Link key={item.num + item.title} href={item.href!} onMouseEnter={() => setActiveHeroIndex(idx)} style={commonStyle}>
                    {content}
                  </Link>
                ) : (
                  <div key={item.num + item.title} onMouseEnter={() => setActiveHeroIndex(idx)} style={commonStyle}>
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stories 01—03 */}
      <section id="projects" className="relative py-20 px-6 md:py-24 md:px-[7vw] transition-all duration-700 text-[#10201a]" style={{
        backgroundImage: `url(${gridBg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(242, 240, 233, 0.88)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '15px', marginBottom: '40px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.12em' }}>
            <p style={{ margin: 0 }}>Stories 01—03</p>
            <span style={{ color: '#555' }}>EDITORIAL HORIZON</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 items-start">
            {group1to3.map((project, idx) => {
              const hasLink = !!project.href
              return (
                <article
                  key={project.title}
                  className="reveal-item flex flex-col w-full max-w-[360px] mx-auto md:max-w-none"
                  onMouseEnter={() => {
                    if(idx === 0) setGridBg('/images/library/photo-forest-bbq.png')
                    if(idx === 1) setGridBg('/images/library/photo-river-sauna.png')
                    if(idx === 2) setGridBg('/images/library/photo-wild-camp.png')
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#777', fontWeight: 300 }}>{project.num}</span>
                    <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase' }}>Media</span>
                  </div>

                  {hasLink ? (
                    <Link
                      href={project.href!}
                      className="group relative block w-full rounded-[2px] overflow-hidden shadow-md mb-4 bg-black/5 cursor-pointer"
                      style={{
                        aspectRatio: project.aspect || '16/9',
                        maxWidth: project.aspect === '3/4' ? '280px' : '100%',
                        margin: project.aspect === '3/4' ? '0 auto 16px auto' : '0 0 16px 0'
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-[11px] tracking-[0.2em] uppercase border border-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                          View <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="relative w-full rounded-[2px] overflow-hidden shadow-md mb-4 bg-black/5"
                      style={{
                        aspectRatio: project.aspect || '16/9',
                        maxWidth: project.aspect === '3/4' ? '280px' : '100%',
                        margin: project.aspect === '3/4' ? '0 auto 16px auto' : '0 0 16px 0'
                      }}
                    >
                      <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 30vw" />
                    </div>
                  )}

                  <h2 style={{ fontSize: '20px', fontWeight: 400, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>{project.title}</h2>
                  <p style={{ fontSize: '12px', color: '#555', marginBottom: '14px', lineHeight: 1.6 }}>{project.description}</p>
                  {project.status === 'coming_soon' ? (
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#888', letterSpacing: '0.05em' }}>[ Coming Soon ]</span>
                  ) : (
                    <Link href={project.href || '#contact'} className="inline-flex items-center p-2 -m-2 text-[11px] font-semibold text-[#10201a] underline">
                      <span>View story</span>
                      <ArrowUpRight className="w-3 h-3 ml-0.5" />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 04: ハラルBOX */}
      <section id={item4.title} className="relative min-h-[85vh] md:min-h-screen flex items-center py-16 px-6 md:py-20 md:px-[7vw] text-[#10201a]" style={{
        backgroundImage: 'url(/images/library/photo-forest-bbq.png)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(232, 228, 220, 0.9)', pointerEvents: 'none' }} />
        
        <div className="reveal-item w-full max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-[6vw] z-10">
          <Link
            href={item4.href || '/halal'}
            className="group relative w-full max-w-[420px] md:max-w-none md:w-[45%] rounded-[3px] overflow-hidden shadow-xl block cursor-pointer"
            style={{ aspectRatio: item4.aspect || '4/3' }}
          >
            <Image
              src={item4.image}
              alt={item4.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-[11px] tracking-[0.2em] uppercase border border-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          <div className="w-full max-w-[420px]">
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#777', display: 'block', lineHeight: 1 }}>{item4.num}</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', margin: '10px 0 8px 0', display: 'block' }}>FEATURED MEDIA</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, margin: '0 0 15px 0', letterSpacing: '-0.03em' }}>{item4.title}</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#444', marginBottom: '25px' }}>{item4.description}</p>
            <Link href={item4.href || '#contact'} className="inline-flex items-center p-2 -m-2 text-[11px] font-semibold text-[#10201a] underline tracking-[0.1em]">
              <span>View story</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 stroke-[2]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05: インバウンドBOX */}
      <section id={item5.title} className="relative min-h-[85vh] md:min-h-screen flex items-center py-16 px-6 md:py-20 md:px-[7vw] text-[#10201a]" style={{
        backgroundImage: 'url(/images/library/photo-river-sauna.png)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(242, 240, 233, 0.9)', pointerEvents: 'none' }} />

        <div className="reveal-item w-full max-w-[1100px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-[6vw] z-10">
          <div className="w-full max-w-[420px]">
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#777', display: 'block', lineHeight: 1 }}>{item5.num}</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', margin: '10px 0 8px 0', display: 'block' }}>FEATURED MEDIA</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, margin: '0 0 15px 0', letterSpacing: '-0.03em' }}>{item5.title}</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#444', marginBottom: '25px' }}>{item5.description}</p>
            <Link href={item5.href || '#contact'} className="inline-flex items-center p-2 -m-2 text-[11px] font-semibold text-[#10201a] underline tracking-[0.1em]">
              <span>View story</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 stroke-[2]" />
            </Link>
          </div>

          <Link
            href={item5.href || '/inbound'}
            className="group relative w-full max-w-[320px] md:max-w-none md:w-[35%] rounded-[3px] overflow-hidden shadow-xl block cursor-pointer"
            style={{ aspectRatio: item5.aspect || '3/4' }}
          >
            <Image
              src={item5.image}
              alt={item5.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-[11px] tracking-[0.2em] uppercase border border-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 06〜09: 3D回転ループ */}
      <section className="relative w-full min-h-[90vh] md:h-screen flex flex-col justify-center items-center py-20 px-4 text-[#10201a] overflow-hidden" style={{
        backgroundImage: 'url(/images/library/photo-wild-camp.png)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(248, 248, 246, 0.88)', pointerEvents: 'none' }} />

        <div className="absolute top-8 left-[7vw] right-[7vw] flex justify-between border-b border-black/15 pb-3 uppercase text-[10px] tracking-[0.12em] z-10">
          <p style={{ margin: 0 }}>Stories 06—09</p>
          <span style={{ color: '#666' }}>3D CAROUSEL GALLERY</span>
        </div>

        <div className="scale-75 sm:scale-90 md:scale-100 flex justify-center items-center relative z-10 w-full" style={{ perspective: '1200px', height: '420px' }}>
          <div
            ref={carousel3dRef}
            style={{
              width: '320px',
              height: '380px',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {group6to9.map((project, index) => {
              const angle = (360 / group6to9.length) * index
              const radius = 380
              const isComingSoon = project.status === 'coming_soon'
              const hasLink = !!project.href

              return (
                <div
                  key={project.title}
                  style={{
                    position: 'absolute', width: '300px', height: '360px', left: '10px', top: '10px',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`, backgroundColor: '#ffffff',
                    borderRadius: '24px', padding: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backfaceVisibility: 'visible',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden' }}>
                    {hasLink ? (
                      <Link href={project.href!} className="group relative block w-full h-full cursor-pointer">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="300px"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-[10px] tracking-[0.2em] uppercase border border-white/80 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                            View <ArrowUpRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="300px" />
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#888' }}>{project.num}</span>
                      {hasLink ? (
                        <Link href={project.href!} className="inline-flex items-center p-2 -m-2 text-[10px] font-semibold text-[#10201a] underline">
                          <span>View story</span>
                          <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                        </Link>
                      ) : (
                        <span style={{ fontSize: '9px', color: isComingSoon ? '#888' : '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: isComingSoon ? 600 : 400 }}>
                          {isComingSoon ? '[ Coming Soon ]' : 'Media'}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#111' }}>{project.title}</h3>
                    <p style={{ fontSize: '11px', color: '#666', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10: STORY */}
      <section id={item10.title} className="relative min-h-screen bg-[#f2f0e9] text-[#10201a] flex items-center py-20 px-6 md:py-24 md:px-[7vw] overflow-hidden">
        {isClient && sakuraParticles.length > 0 && (
          <div ref={sakuraRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {sakuraParticles.map((p) => (
              <div key={p.id} className="sakura-particle" style={{ position: 'absolute', top: '-10%', left: `${p.left}%`, opacity: 0.85 }}>
                <SakuraPetal color={p.color!} size={p.size!} />
              </div>
            ))}
          </div>
        )}

        <div className="reveal-item w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[5vw] items-center z-10">
          <Link
            href={item10.href || '/story'}
            className="group relative w-full max-w-[340px] md:max-w-none mx-auto rounded-[4px] overflow-hidden shadow-xl block cursor-pointer"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={item10.image}
              alt="STORYメイン"
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-[11px] tracking-[0.2em] uppercase border border-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-6 text-left">
            <div>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#999', display: 'block', lineHeight: 1 }}>{item10.num}</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#777', textTransform: 'uppercase', margin: '10px 0 8px 0', display: 'block' }}>INTERVIEW MEDIA</span>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, margin: '0 0 10px 0', letterSpacing: '-0.03em' }}>{item10.title}</h2>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#444', marginBottom: '15px', fontWeight: 500 }}>{item10.description}</p>
              <Link href={item10.href || '#contact'} className="inline-flex items-center p-2 -m-2 text-[11px] font-semibold text-[#10201a] underline tracking-[0.1em]">
                <span>View story</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 stroke-[2]" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-[420px]">
              <Link href={item10.href || '/story'} className="group relative w-full rounded-[3px] overflow-hidden shadow-md block cursor-pointer" style={{ aspectRatio: '16/9' }}>
                <Image src="/images/library/story_sub1.png" alt="STORYサブ1" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 768px) 50vw, 30vw" />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-[9px] tracking-[0.15em] uppercase border border-white/70 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-0.5 font-medium">
                    View <ArrowUpRight className="w-2 h-2" />
                  </span>
                </div>
              </Link>
              <Link href={item10.href || '/story'} className="group relative w-full rounded-[3px] overflow-hidden shadow-md block cursor-pointer" style={{ aspectRatio: '16/9' }}>
                <Image src="/images/library/story_sub2.png" alt="STORYサブ2" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 768px) 50vw, 30vw" />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-[9px] tracking-[0.15em] uppercase border border-white/70 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-0.5 font-medium">
                    View <ArrowUpRight className="w-2 h-2" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11: Analysis */}
      <section id={item11.title} className="relative min-h-screen bg-[#0a0a0a] text-[#eaeaea] flex items-center py-20 px-6 md:py-24 md:px-[7vw] overflow-hidden">
        {isClient && rainParticles.length > 0 && (
          <div ref={rainRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {rainParticles.map((p) => (
              <div key={p.id} className="rain-particle" style={{ position: 'absolute', top: '-10%', left: `${p.left}%`, opacity: p.opacity }}>
                <RainDrop />
              </div>
            ))}
          </div>
        )}

        <div className="reveal-item w-full max-w-[1200px] mx-auto flex flex-col gap-8 z-10">
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#555', display: 'block', lineHeight: 1 }}>{item11.num}</span>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: 600, letterSpacing: '0.08em' }}>[ Coming Soon ]</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, margin: '5px 0 10px 0', color: '#ffffff' }}>{item11.title}</h2>
            <p style={{ fontSize: '13px', color: '#aaa' }}>{item11.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-5 items-stretch">
            <div className="relative w-full rounded-[4px] overflow-hidden shadow-2xl border border-[#222]" style={{ aspectRatio: '16/9' }}>
              <Image src={item11.image} alt="Analysisメイン" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 65vw" />
            </div>
            <div className="relative w-full rounded-[4px] overflow-hidden shadow-2xl border border-[#222]" style={{ aspectRatio: '16/9' }}>
              <Image src="/images/library/analysis_sub.png" alt="Analysisサブ" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
            </div>
          </div>
        </div>
      </section>

      {/* 12〜15: ARCHIVE GRID */}
      <section className="relative bg-white text-[#10201a] py-20 px-6 md:py-28 md:px-[7vw] overflow-hidden">
        {isClient && leafParticles.length > 0 && (
          <div ref={leavesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, perspective: '1000px' }}>
            {leafParticles.map((p) => (
              <div
                key={p.id}
                className="leaf-particle"
                style={{ position: 'absolute', top: '-50px', left: `${p.left}%`, opacity: 0.7, transformStyle: 'preserve-3d' }}
              >
                <AutumnLeaf color={p.type === 0 ? '#d95338' : p.type === 1 ? '#e08a2e' : '#b83b23'} size={p.size!} />
              </div>
            ))}
          </div>
        )}

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ borderBottom: '1px solid #bbb', paddingBottom: '15px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.12em' }}>
            <span>Stories 12—15</span>
            <span style={{ color: '#777' }}>ARCHIVE GRID</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-[50px_60px] items-start">
            {/* 12: COMICS */}
            <article className="reveal-item w-full max-w-[340px] mx-auto md:max-w-none">
              <div
                className="relative w-full rounded-[2px] overflow-hidden shadow-md mb-4 bg-black/5"
                style={{ aspectRatio: item12.aspect || '3/4', maxWidth: '300px', margin: '0 auto 16px auto' }}
              >
                <Image src={item12.image} alt={item12.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 30vw" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item12.num}</span>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>[ Coming Soon ]</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item12.title}</h3>
              <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item12.description}</p>
            </article>

            {/* 13: FOOD VISUAL */}
            <article className="reveal-item w-full max-w-[340px] mx-auto md:max-w-none">
              <div
                className="relative w-full rounded-[2px] overflow-hidden shadow-md mb-4 bg-black/5"
                style={{ aspectRatio: item13.aspect || '1/1', maxWidth: '320px', margin: '0 auto 16px auto' }}
              >
                <Image src={item13.image} alt={item13.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 30vw" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item13.num}</span>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>[ Coming Soon ]</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item13.title}</h3>
              <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item13.description}</p>
            </article>

            {/* 14 & 15: INTERIOR & SHIRANGAKE */}
            <div className="flex flex-col gap-12 md:gap-[50px] w-full max-w-[360px] mx-auto md:max-w-none">
              <article className="reveal-item">
                <div
                  className="relative w-full rounded-[2px] overflow-hidden shadow-md mb-4 bg-black/5"
                  style={{ aspectRatio: item14.aspect || '16/9' }}
                >
                  <Image src={item14.image} alt={item14.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 30vw" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item14.num}</span>
                  <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>[ Coming Soon ]</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item14.title}</h3>
                <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item14.description}</p>
              </article>

              {/* 15: SHIRANGAKE（画像リンク化 ＆ 「View ↗」ホバー） */}
              <article className="reveal-item">
                <Link
                  href={item15.href || '/shirangake'}
                  className="group relative block w-full rounded-[2px] overflow-hidden shadow-md mb-4 bg-black/5 cursor-pointer"
                  style={{ aspectRatio: item15.aspect || '16/9' }}
                >
                  <Image
                    src={item15.image}
                    alt={item15.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-[11px] tracking-[0.2em] uppercase border border-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                      View <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item15.num}</span>
                  <Link href={item15.href || '#contact'} className="inline-flex items-center p-2 -m-2 text-[11px] font-semibold text-[#10201a] underline">
                    <span>View story</span>
                    <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item15.title}</h3>
                <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item15.description}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className="about-section relative overflow-hidden bg-[#e3e6de] min-h-[80vh] flex items-center py-20 px-6 md:py-24 md:px-[7vw]"
        id="about"
      >
        <div className="absolute right-0 top-0 w-full md:w-[60%] h-full pointer-events-none z-0">
          <Image src="/images/forest_stream.png" alt="" fill style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#e3e6de] via-[#e3e6de]/80 to-transparent" />
        </div>

        <div className="about-content relative z-10 w-full md:max-w-[52%] m-0">
          <p className="section-label reveal-item text-[10px] tracking-[0.15em] text-[#666] uppercase mb-6 md:mb-8">
            ABOUT INNBUDDY / RESPONSIBLE TRAVEL
          </p>

          <h2 className="reveal-item text-[clamp(28px,4.5vw,64px)] font-normal leading-[1.15] mb-5 tracking-[-0.03em]">
            クリエイティブに、<br />唯一の目的地に。
          </h2>

          <p
            className="reveal-item text-[clamp(16px,2.2vw,24px)] font-bold text-[#9ACA47] mb-6 tracking-[0.04em] leading-[1.4]"
            style={{ fontFamily: '"Yuji Boku", "Klee One", "Zen Old Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif' }}
          >
            激しく変わる時代に、残すもの。
          </p>

          <p className="about-copy reveal-item text-[13px] leading-relaxed md:leading-[2] text-[#444] max-w-[440px] mb-8 md:mb-12">
            InnBuddy は、旅の意味からデザインします。地域の文化、宿の思想、旅人の記憶を編集し、この時代に残すものを選びながらまだ見ぬ滞在のかたちを共に。
          </p>

          <div className="about-meta reveal-item flex gap-8 border-t border-[#c5c8c0] pt-5 text-[11px] text-[#666]">
            <span>Based in Japan</span>
          </div>
        </div>
      </section>

      {/* MoMA仕様 3Dシリンダー（画像クリックで各ページへ遷移 ＆ 「View ↗」ホバー） */}
      <section
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full min-h-[75vh] md:min-h-[85vh] bg-white text-[#111] overflow-hidden flex flex-col justify-center items-center cursor-grab select-none touch-pan-y"
      >
        <div className="absolute top-8 left-[7vw] right-[7vw] flex justify-between border-b border-[#e5e5e5] pb-3 uppercase text-[10px] tracking-[0.2em] z-10 pointer-events-none">
          <p style={{ margin: 0, fontWeight: 500 }}>All Media 01—15</p>
          <span style={{ color: '#888', fontWeight: 400 }}>MUSEUM 360° CYLINDER</span>
        </div>

        <div className="scale-75 sm:scale-90 md:scale-100 flex justify-center items-center relative mt-10" style={{ perspective: '500px', width: '100%', height: '520px' }}>
          <div
            ref={museumContainerRef}
            style={{
              width: '240px',
              height: '320px',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {projects.map((project, index) => {
              const angle = (360 / projects.length) * index
              const radius = 450
              const hasLink = !!project.href

              return (
                <div
                  key={project.title + '_moma_' + index}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '220px',
                    height: '280px',
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(-${radius}px)`,
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* シリンダー画像カード */}
                  <div className="relative w-full aspect-square overflow-hidden bg-[#f5f5f5] rounded-none group">
                    <Image
                      src={project.museumImage || project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="220px"
                      draggable={false}
                      className="transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {hasLink && (
                      <Link
                        href={project.href!}
                        onClick={(e) => {
                          if (hasDragged.current) e.preventDefault()
                        }}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-white text-[10px] tracking-[0.2em] uppercase border border-white/80 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                          View <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </Link>
                    )}
                  </div>

                  <div style={{ marginTop: '12px', fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#111111', letterSpacing: '0.04em' }}>{project.title}</span>
                      <span style={{ fontSize: '10px', fontWeight: 400, color: '#999999' }}>{project.num}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer id="contact" className="bg-[#111] text-[#f2f0e9] py-14 px-6 md:py-16 md:px-[7vw] flex flex-col">
        <div style={{ width: 'max-content', maxWidth: '100%' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.2vw, 42px)', fontWeight: 300, margin: '0 0 16px 0', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            A Stay Starts a <i style={{ fontFamily: 'Georgia, serif', fontWeight: 300 }}>Story</i>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-[#333] text-[11px] text-[#888] gap-4 sm:gap-10">
            <span>© InnBuddy 2026</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/" className="inline-flex items-center p-2 -m-2 text-[#ccc] no-underline tracking-[0.05em] hover:text-white">
                <span>メインページに戻る</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5 text-white/60" />
              </Link>
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="inline-flex items-center p-2 -m-2 text-[#ccc] no-underline tracking-[0.05em] hover:text-white">
                <span>お問い合わせ</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5 text-white/60" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}