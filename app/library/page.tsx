'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const projects = [
  { num: '01', title: 'InnBuddy OTA', image: '/images/library/ota.png', museumImage: '/images/library/museum_01.png', description: '弊社のOTA運用代行サービスの紹介とご相談窓口', status: 'active', aspect: '16/9', href: '/ota' },
  { num: '02', title: 'Brand Vision Report', image: '/images/library/report.png', museumImage: '/images/library/museum_02.png', description: '弊社の考え方をまとめたサステナブルなデジタルフォトブック', status: 'coming_soon', aspect: '3/4' },
  { num: '03', title: 'Journal', image: '/images/library/journal.png', museumImage: '/images/library/museum_03.png', description: 'ホテル運営・ブランディング・マーケティング専門メディア', status: 'coming_soon', aspect: '1/1' },
  { num: '04', title: 'ハラルBOX', image: '/images/library/halal.png', museumImage: '/images/library/museum_04.png', description: 'ハラルガイドとセルフチェックシート、フィードバックシート', status: 'active', aspect: '4/3', width: '42%', href: '/halal' },
  { num: '05', title: 'インバウンドBOX', image: '/images/library/inbound.png', museumImage: '/images/library/museum_05.png', description: '18言語対応の口コミ翻訳や接客指差しシートなど4点セット', status: 'active', aspect: '3/4', width: '35%', href: '/inbound' },
  { num: '06', title: 'SDGs', image: '/images/library/sdgs.png', museumImage: '/images/library/museum_06.png', description: '宿が自分たちで実践できるサステナブルな取り組み事例', status: 'active', aspect: '1/1', width: '25vw', href: '/sustainable' },
  { num: '07', title: '組織ウェルビーイング', image: '/images/library/wellbeing.png', museumImage: '/images/library/museum_07.png', description: '採用・組織づくり。スタッフが定着する環境づくりのヒント', status: 'coming_soon', aspect: '16/9', width: '36vw' },
  { num: '08', title: '宿とAI', image: '/images/library/ai.png', museumImage: '/images/library/museum_08.png', description: '完全初心者向け。日常業務で使えるAIサポートの基本', status: 'coming_soon', aspect: '3/4', width: '26vw' },
  { num: '09', title: '宿とAI Pro', image: '/images/library/aipro.png', museumImage: '/images/library/museum_09.png', description: 'プロ向けAI活用術。より高度な運用と業務効率化をサポート', status: 'coming_soon', aspect: '4/3', width: '32vw' },
  { num: '10', title: 'STORY', image: '/images/library/story.png', museumImage: '/images/library/museum_10.png', description: '世界の旅行者から届くリアルなインタビューメディア', status: 'active', href: '/story' },
  { num: '11', title: 'Analysis', image: '/images/library/analysis.png', museumImage: '/images/library/museum_11.png', description: '専門性の高い分析データ。OTA攻略ブックとマーケットレポート', status: 'coming_soon' },
  { num: '12', title: 'WAAI COMICS', image: '/images/library/comics.png', museumImage: '/images/library/museum_12.png', description: '短編漫画で宿の課題に気づき考えるケーススタディ', status: 'coming_soon', aspect: '3/4' },
  { num: '13', title: 'FOOD VISUAL', image: '/images/library/food.png', museumImage: '/images/library/museum_13.png', description: '忙しい人の考える時間を減らす、画像と素材別料理アイデア', status: 'coming_soon', aspect: '1/1' },
  { num: '14', title: 'INTERIOR', image: '/images/library/interior.png', museumImage: '/images/library/museum_14.png', description: 'NO改装でおしゃれ宿に、サステナブルなインテリアアイデア', status: 'coming_soon', aspect: '16/9' },
  { num: '15', title: 'SHIRANGAKE', image: '/images/library/shirangake.png', museumImage: '/images/library/museum_15.png', description: '英語で日本の方言を紹介。インバウンド旅行客を地方へ導く', status: 'active', aspect: '16/9', href: '/shirangake' },
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
  const startX = useRef(0)

  useEffect(() => {
    setIsClient(true)
    
    setSakuraParticles(
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: Math.random() > 0.4 ? '#ffb7c5' : '#a8d8b9',
        size: 14 + Math.random() * 16,
      }))
    )

    setRainParticles(
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        opacity: 0.4 + Math.random() * 0.6,
      }))
    )

    setLeafParticles(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: (i * 7) + 3,
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
              duration: 18,
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
    startX.current = e.clientX
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
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
      className="portfolio-shell"
      ref={mainRef}
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'clip',
      }}
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
                  <Link href={p.href!} onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', textDecoration: 'none', color: '#f2f0e9' }}>
                    {p.num}. {p.title} ↗
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

      {/* トップヒーロー (65 : 35) */}
      <section
        className="portfolio-hero"
        id="top"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          overflow: 'hidden',
          padding: 0,
          margin: 0,
          background: 'none',
        }}
      >
        {/* ヘッダー */}
        <header
          className="portfolio-header"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 36px',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
            border: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link className="mini-mark" href="/" aria-label="InnBuddy ホーム" style={{ display: 'flex', alignItems: 'center', color: '#ffffff', textDecoration: 'none', fontWeight: 700 }}>i<span>。</span></Link>
            <span style={{ fontSize: '12px', letterSpacing: '0.12em', fontWeight: 500, color: '#f2f0e9', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>InnBuddy Library</span>
          </div>
          <nav className="portfolio-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: '#f2f0e9', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              Projects
            </button>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(true)}><span /><span /></button>
        </header>

        {/* 左側プレビューエリア */}
        <div style={{ position: 'relative', width: '65%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '90px 40px 40px 40px' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image src="/images/library/hero-forest.png" alt="Hero Background" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.15)' }} />
          </div>

          <div style={{
            position: 'relative',
            zIndex: 2,
            width: 'min(400px, 80%)',
            backgroundColor: '#ffffff',
            borderRadius: '0',
            padding: '32px 28px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>InnBuddy Library</span>
              <span style={{ fontSize: '11px', fontFamily: 'Georgia, serif', color: '#666', fontWeight: 500 }}>{activeProject.num} / 15</span>
            </div>

            {activeProject.href ? (
              <Link href={activeProject.href} style={{ position: 'relative', width: '100%', aspectRatio: '1/1', flexShrink: 0, display: 'block', backgroundColor: '#f5f5f5', overflow: 'hidden', cursor: 'pointer' }}>
                <Image
                  key={activeProject.num}
                  src={activeProject.museumImage || activeProject.image}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'opacity 0.35s ease' }}
                  priority
                />
              </Link>
            ) : (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', flexShrink: 0, display: 'block', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                <Image
                  key={activeProject.num}
                  src={activeProject.museumImage || activeProject.image}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'opacity 0.35s ease' }}
                  priority
                />
              </div>
            )}

            <div style={{ height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                {activeProject.href ? (
                  <Link href={activeProject.href} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {activeProject.title} <span style={{ fontSize: '13px', color: '#777' }}>↗</span>
                    </h3>
                  </Link>
                ) : (
                  <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeProject.title}
                  </h3>
                )}
                {activeProject.status === 'coming_soon' && (
                  <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', border: '1px solid #ddd', padding: '2px 6px', borderRadius: '2px', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>
                    Coming Soon
                  </span>
                )}
              </div>
              <p style={{ fontSize: '11px', color: '#666', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{activeProject.description}</p>
            </div>
          </div>
        </div>

        {/* 右側ラインナップエリア */}
        <div style={{ position: 'relative', width: '35%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '90px 20px 30px 20px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image src="/images/library/photo-forest-bbq.png" alt="Sidebar Background" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500, width: '100%', maxWidth: '220px' }}>
              LINEUP (01—15)
            </span>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              width: '100%',
              maxWidth: '220px'
            }}>
              {projects.map((item, idx) => {
                const isActive = activeHeroIndex === idx
                const isComingSoon = item.status === 'coming_soon'
                const hasLink = !!item.href

                const commonStyle: React.CSSProperties = {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                  borderLeft: isActive ? '2px solid #ffffff' : '2px solid transparent',
                  transition: 'all 0.18s ease',
                  cursor: hasLink ? 'pointer' : 'default',
                }

                const content = (
                  <>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)', transition: 'color 0.18s ease', width: '20px', flexShrink: 0 }}>{item.num}</span>
                    <span style={{ fontSize: '11.5px', color: isActive ? '#ffffff' : (isComingSoon ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)'), fontWeight: isActive ? 500 : 400, transition: 'color 0.18s ease', letterSpacing: '0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                      {item.title}
                    </span>
                    {isComingSoon && (
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', flexShrink: 0 }}>[Soon]</span>
                    )}
                    <span style={{ fontSize: '9px', color: '#ffffff', opacity: (isActive && hasLink) ? 1 : 0, transition: 'opacity 0.18s ease', width: '10px', textAlign: 'right', flexShrink: 0 }}>↗</span>
                  </>
                )

                return hasLink ? (
                  <Link
                    key={item.num + item.title}
                    href={item.href!}
                    onMouseEnter={() => setActiveHeroIndex(idx)}
                    style={commonStyle}
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={item.num + item.title}
                    onMouseEnter={() => setActiveHeroIndex(idx)}
                    style={commonStyle}
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <p
          className="scroll-cue"
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '28px',
            zIndex: 10,
            margin: 0,
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
          }}
        >
          Scroll Down
        </p>
      </section>

      {/* 2ページ目（01〜03） */}
      <section id="projects" style={{ 
        position: 'relative', 
        padding: '100px 7vw 80px 7vw',
        backgroundImage: `url(${gridBg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.6s ease-in-out',
        color: '#10201a'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(242, 240, 233, 0.85)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '15px', marginBottom: '50px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.12em' }}>
            <p style={{ margin: 0 }}>Stories 01—03</p>
            <span style={{ color: '#555' }}>EDITORIAL HORIZON</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px 50px', alignItems: 'start' }}>
            {group1to3.map((project, idx) => (
              <article 
                key={project.title} 
                id={project.title} 
                className="reveal-item" 
                style={{ display: 'flex', flexDirection: 'column' }}
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
                <div style={{ position: 'relative', width: '100%', aspectRatio: project.aspect || '16/9', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.12)', marginBottom: '18px' }}>
                  <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 30vw" />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 400, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>{project.title}</h2>
                <p style={{ fontSize: '12px', color: '#555', marginBottom: '14px', lineHeight: 1.6 }}>{project.description}</p>
                {project.status === 'coming_soon' ? (
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#888', letterSpacing: '0.05em' }}>[ Coming Soon ]</span>
                ) : (
                  <Link href={project.href || '#contact'} style={{ fontSize: '11px', fontWeight: 600, color: '#10201a', textDecoration: 'underline' }}>View story ↗</Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4: 独立コンテンツ（ハラルBOX） */}
      <section id={item4.title} style={{ 
        minHeight: '100vh', 
        display: 'flex', alignItems: 'center', padding: '80px 7vw', position: 'relative',
        backgroundImage: 'url(/images/library/photo-forest-bbq.png)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#10201a'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(232, 228, 220, 0.88)', pointerEvents: 'none' }} />
        
        <div className="reveal-item" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6vw', zIndex: 1 }}>
          <div style={{ position: 'relative', width: item4.width || '50%', aspectRatio: item4.aspect || '1/1', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <Image src={item4.image} alt={item4.title} fill style={{ objectFit: 'cover' }} sizes="45vw" />
          </div>
          <div style={{ maxWidth: '420px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '48px', color: '#777', display: 'block', lineHeight: 1 }}>{item4.num}</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', margin: '10px 0 8px 0', display: 'block' }}>FEATURED MEDIA</span>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, margin: '0 0 15px 0', letterSpacing: '-0.03em' }}>{item4.title}</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#444', marginBottom: '25px' }}>{item4.description}</p>
            <Link href={item4.href || '#contact'} style={{ fontSize: '11px', fontWeight: 600, color: '#10201a', textDecoration: 'underline', letterSpacing: '0.1em' }}>View story <b>↗</b></Link>
          </div>
        </div>
      </section>

      {/* 5: 独立コンテンツ（インバウンドBOX） */}
      <section id={item5.title} style={{ 
        minHeight: '100vh', 
        display: 'flex', alignItems: 'center', padding: '80px 7vw', position: 'relative',
        backgroundImage: 'url(/images/library/photo-river-sauna.png)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#10201a'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(242, 240, 233, 0.88)', pointerEvents: 'none' }} />

        <div className="reveal-item" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6vw', zIndex: 1 }}>
          <div style={{ maxWidth: '420px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '48px', color: '#777', display: 'block', lineHeight: 1 }}>{item5.num}</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', margin: '10px 0 8px 0', display: 'block' }}>FEATURED MEDIA</span>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, margin: '0 0 15px 0', letterSpacing: '-0.03em' }}>{item5.title}</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#444', marginBottom: '25px' }}>{item5.description}</p>
            <Link href={item5.href || '#contact'} style={{ fontSize: '11px', fontWeight: 600, color: '#10201a', textDecoration: 'underline', letterSpacing: '0.1em' }}>View story <b>↗</b></Link>
          </div>
          <div style={{ position: 'relative', width: item5.width || '50%', aspectRatio: item5.aspect || '1/1', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <Image src={item5.image} alt={item5.title} fill style={{ objectFit: 'cover' }} sizes="35vw" />
          </div>
        </div>
      </section>

      {/* 6〜9: 3D回転ループ */}
      <section style={{ 
        position: 'relative', width: '100%', height: '100vh', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        backgroundImage: 'url(/images/library/photo-wild-camp.png)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#10201a', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(248, 248, 246, 0.85)', pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', top: '40px', left: '7vw', right: '7vw', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '15px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.12em', zIndex: 10 }}>
          <p style={{ margin: 0 }}>Stories 06—09</p>
          <span style={{ color: '#666' }}>3D CAROUSEL GALLERY</span>
        </div>

        <div style={{ perspective: '1200px', width: '100%', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
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
              return (
                <div
                  key={project.title}
                  id={project.title}
                  style={{
                    position: 'absolute',
                    width: '300px',
                    height: '360px',
                    left: '10px',
                    top: '10px',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    padding: '16px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backfaceVisibility: 'visible',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden' }}>
                    <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="300px" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#888' }}>{project.num}</span>
                      {project.href ? (
                        <Link href={project.href} style={{ fontSize: '10px', color: '#10201a', fontWeight: 600, textDecoration: 'underline' }}>
                          View story ↗
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
      <section id={item10.title} style={{ minHeight: '100vh', backgroundColor: '#f2f0e9', color: '#10201a', display: 'flex', alignItems: 'center', padding: '100px 7vw', position: 'relative', overflow: 'hidden' }}>
        {isClient && sakuraParticles.length > 0 && (
          <div ref={sakuraRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {sakuraParticles.map((p) => (
              <div key={p.id} className="sakura-particle" style={{ position: 'absolute', top: '-10%', left: `${p.left}%`, opacity: 0.85 }}>
                <SakuraPetal color={p.color!} size={p.size!} />
              </div>
            ))}
          </div>
        )}

        <div className="reveal-item" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'center', zIndex: 1 }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <Image src={item10.image} alt="STORYメイン" fill style={{ objectFit: 'cover' }} sizes="45vw" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '48px', color: '#999', display: 'block', lineHeight: 1 }}>{item10.num}</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#777', textTransform: 'uppercase', margin: '10px 0 8px 0', display: 'block' }}>INTERVIEW MEDIA</span>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, margin: '0 0 10px 0', letterSpacing: '-0.03em' }}>{item10.title}</h2>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#444', marginBottom: '15px', fontWeight: 500 }}>{item10.description}</p>
              <Link href={item10.href || '#contact'} style={{ fontSize: '11px', fontWeight: 600, color: '#10201a', textDecoration: 'underline', letterSpacing: '0.1em' }}>View story <b>↗</b></Link>
            </div>

            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
              <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}>
                <Image src="/images/library/story_sub1.png" alt="STORYサブ1" fill style={{ objectFit: 'cover' }} sizes="30vw" />
              </div>
              <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}>
                <Image src="/images/library/story_sub2.png" alt="STORYサブ2" fill style={{ objectFit: 'cover' }} sizes="30vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11: Analysis */}
      <section id={item11.title} style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#eaeaea', display: 'flex', alignItems: 'center', padding: '100px 7vw', position: 'relative', overflow: 'hidden' }}>
        {isClient && rainParticles.length > 0 && (
          <div ref={rainRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {rainParticles.map((p) => (
              <div key={p.id} className="rain-particle" style={{ position: 'absolute', top: '-10%', left: `${p.left}%`, opacity: p.opacity }}>
                <RainDrop />
              </div>
            ))}
          </div>
        )}

        <div className="reveal-item" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '48px', color: '#555', display: 'block', lineHeight: 1 }}>{item11.num}</span>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: 600, letterSpacing: '0.08em' }}>[ Coming Soon ]</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, margin: '5px 0 10px 0', color: '#ffffff' }}>{item11.title}</h2>
            <p style={{ fontSize: '13px', color: '#aaa' }}>{item11.description}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '20px', alignItems: 'stretch' }}>
            <div style={{ position: 'relative', width: '100%', minHeight: '380px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #222' }}>
              <Image src={item11.image} alt="Analysisメイン" fill style={{ objectFit: 'cover' }} sizes="65vw" />
            </div>
            <div style={{ position: 'relative', width: '100%', minHeight: '380px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #222' }}>
              <Image src="/images/library/analysis_sub.png" alt="Analysisサブ" fill style={{ objectFit: 'cover' }} sizes="25vw" />
            </div>
          </div>
        </div>
      </section>

      {/* 12〜15: ARCHIVE GRID */}
      <section style={{ backgroundColor: '#ffffff', color: '#10201a', padding: '120px 7vw', position: 'relative', overflow: 'hidden' }}>
        {isClient && leafParticles.length > 0 && (
          <div ref={leavesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, perspective: '1000px' }}>
            {leafParticles.map((p) => (
              <div
                key={p.id}
                className="leaf-particle"
                style={{
                  position: 'absolute',
                  top: '-50px',
                  left: `${p.left}%`,
                  opacity: 0.7,
                  transformStyle: 'preserve-3d',
                }}
              >
                <AutumnLeaf 
                  color={p.type === 0 ? '#d95338' : p.type === 1 ? '#e08a2e' : '#b83b23'} 
                  size={p.size!} 
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ borderBottom: '1px solid #bbb', paddingBottom: '15px', marginBottom: '60px', display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.12em' }}>
            <span>Stories 12—15</span>
            <span style={{ color: '#777' }}>ARCHIVE GRID</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '50px 60px', alignItems: 'start' }}>
            <div>
              <article id={item12.title} className="reveal-item">
                <div style={{ position: 'relative', width: '100%', aspectRatio: item12.aspect || '3/4', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.06)', marginBottom: '18px' }}>
                  <Image src={item12.image} alt={item12.title} fill style={{ objectFit: 'cover' }} sizes="30vw" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item12.num}</span>
                  <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>[ Coming Soon ]</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item12.title}</h3>
                <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item12.description}</p>
              </article>
            </div>

            <div>
              <article id={item13.title} className="reveal-item">
                <div style={{ position: 'relative', width: '100%', aspectRatio: item13.aspect || '1/1', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.06)', marginBottom: '18px' }}>
                  <Image src={item13.image} alt={item13.title} fill style={{ objectFit: 'cover' }} sizes="30vw" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item13.num}</span>
                  <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>[ Coming Soon ]</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item13.title}</h3>
                <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item13.description}</p>
              </article>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <article id={item14.title} className="reveal-item">
                <div style={{ position: 'relative', width: '100%', aspectRatio: item14.aspect || '16/9', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.06)', marginBottom: '18px' }}>
                  <Image src={item14.image} alt={item14.title} fill style={{ objectFit: 'cover' }} sizes="30vw" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item14.num}</span>
                  <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>[ Coming Soon ]</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 400, margin: '8px 0 6px 0' }}>{item14.title}</h3>
                <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#666' }}>{item14.description}</p>
              </article>

              {/* 15: SHIRANGAKE（元の通常スタイル・左揃え・元文言に復帰） */}
              <article id={item15.title} className="reveal-item">
                <div style={{ position: 'relative', width: '100%', aspectRatio: item15.aspect || '16/9', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.06)', marginBottom: '18px' }}>
                  <Image src={item15.image} alt={item15.title} fill style={{ objectFit: 'cover' }} sizes="30vw" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#aaa' }}>{item15.num}</span>
                  <Link href={item15.href || '#contact'} style={{ fontSize: '11px', fontWeight: 600, color: '#10201a', textDecoration: 'underline' }}>View story ↗</Link>
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
        className="about-section" 
        id="about" 
        style={{ 
          position: 'relative', 
          overflow: 'hidden',
          backgroundColor: '#e3e6de',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 7vw'
        }}
      >
        <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <Image src="/images/forest_stream.png" alt="" fill style={{ objectFit: 'cover' }} />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, #e3e6de 20%, rgba(227,230,222,0.85) 50%, rgba(227,230,222,0.2) 80%, transparent 100%)' 
          }} />
        </div>

        <div className="about-content" style={{ position: 'relative', zIndex: 1, maxWidth: '52%', margin: 0 }}>
          <p className="section-label reveal-item" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', marginBottom: '30px' }}>
            ABOUT INNBUDDY / RESPONSIBLE TRAVEL
          </p>

          <h2 className="reveal-item" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px 0', letterSpacing: '-0.03em' }}>
            クリエイティブに、<br />唯一の目的地に。
          </h2>

          <p
            className="reveal-item"
            style={{
              fontFamily: '"Yuji Boku", "Klee One", "Zen Old Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif',
              fontSize: 'clamp(18px, 2.2vw, 24px)',
              fontWeight: 700,
              color: '#9ACA47',
              margin: '0 0 28px 0',
              letterSpacing: '0.04em',
              lineHeight: 1.4,
            }}
          >
            激しく変わる時代に、残すもの。
          </p>

          <p className="about-copy reveal-item" style={{ fontSize: '13px', lineHeight: 2, color: '#444', maxWidth: '440px', marginBottom: '50px' }}>
            InnBuddy は、旅の意味からデザインします。地域の文化、宿の思想、旅人の記憶を編集し、この時代に残すものを選びながらまだ見ぬ滞在のかたちを共に。
          </p>

          <div className="about-meta reveal-item" style={{ display: 'flex', gap: '40px', borderTop: '1px solid #c5c8c0', paddingTop: '20px', fontSize: '11px', color: '#666' }}>
            <span>Based in Japan</span>
          </div>
        </div>
      </section>

      {/* ▼ MoMA仕様 3Dシリンダー ▼ */}
      <section 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ 
          position: 'relative', width: '100%', minHeight: '85vh', backgroundColor: '#ffffff', color: '#111111', 
          overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          cursor: 'grab', touchAction: 'none', userSelect: 'none'
        }}
      >
        <div style={{ position: 'absolute', top: '40px', left: '7vw', right: '7vw', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e5e5', paddingBottom: '15px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em', fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif', zIndex: 10, pointerEvents: 'none' }}>
          <p style={{ margin: 0, fontWeight: 500 }}>All Media 01—15</p>
          <span style={{ color: '#888888', fontWeight: 400 }}>MUSEUM 360° CYLINDER</span>
        </div>

        <div style={{ perspective: '500px', width: '100%', height: '520px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: '40px' }}>
          <div
            ref={museumContainerRef}
            style={{
              width: '240px',
              height: '320px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none' 
            }}
          >
            {projects.map((project, index) => {
              const angle = (360 / projects.length) * index
              const radius = 450 

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
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#f5f5f5', borderRadius: '0', pointerEvents: 'none' }}>
                    <Image src={project.museumImage || project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="220px" draggable={false} />
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
      <footer id="contact" style={{ backgroundColor: '#111', color: '#f2f0e9', padding: '60px 7vw 60px 7vw', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 'max-content', maxWidth: '100%' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 42px)', fontWeight: 300, margin: '0 0 16px 0', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            A Stay Starts a <i style={{ fontFamily: 'Georgia, serif', fontWeight: 300 }}>Story</i>
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #333', fontSize: '11px', color: '#888', gap: '40px' }}>
            <span>© InnBuddy 2026</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/" style={{ color: '#ccc', textDecoration: 'none', letterSpacing: '0.05em' }}>
                メインページに戻る <b>↗</b>
              </Link>
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none', letterSpacing: '0.05em' }}>
                お問い合わせ <b>↗</b>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}