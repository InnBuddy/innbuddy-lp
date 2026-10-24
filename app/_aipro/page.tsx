'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, Torus } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'
import { ArrowDown, ArrowUpRight, Menu } from 'lucide-react'

function BrainMatter() {
  const lobes = [
    [-1.15, 0.35, 0.08, 0.78, 0.8, 0.72],
    [-0.62, 0.7, 0.12, 0.72, 0.86, 0.7],
    [0, 0.78, 0.08, 0.78, 0.88, 0.7],
    [0.65, 0.66, 0.1, 0.78, 0.82, 0.7],
    [1.12, 0.3, 0.08, 0.68, 0.78, 0.66],
    [-1.3, -0.25, 0.12, 0.82, 0.7, 0.72],
    [-0.72, -0.1, 0.16, 0.74, 0.76, 0.7],
    [-0.12, -0.08, 0.18, 0.82, 0.78, 0.74],
    [0.52, -0.08, 0.16, 0.8, 0.76, 0.72],
    [1.08, -0.18, 0.12, 0.62, 0.7, 0.64],
    [-0.95, -0.72, 0.08, 0.7, 0.56, 0.62],
    [-0.38, -0.62, 0.12, 0.74, 0.62, 0.66],
    [0.25, -0.62, 0.14, 0.7, 0.62, 0.64],
    [0.76, -0.58, 0.1, 0.58, 0.58, 0.58],
  ]
  const colors = ['#d4ff00', '#8a2be2', '#ffd700', '#d9d9df']

  return (
    <group rotation={[0.05, -0.18, 0]}>
      {lobes.map(([x, y, z, sx, sy, sz], i) => (
        <mesh key={i} position={[x, y, z]} scale={[sx, sy, sz]}>
          <sphereGeometry args={[0.78, 32, 24]} />
          <MeshDistortMaterial
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={1.1}
            metalness={0.82}
            roughness={0.2}
            distort={0.28}
            speed={1.8 + i * 0.04}
          />
        </mesh>
      ))}
      {[
        [-0.95, 0.25, 0.86],
        [-0.35, 0.5, 0.9],
        [0.32, 0.4, 0.92],
        [0.82, 0.12, 0.88],
        [-0.6, -0.35, 0.94],
        [0.1, -0.28, 0.96],
        [0.65, -0.3, 0.9],
      ].map(([x, y, z], i) => (
        <Torus
          key={`groove-${i}`}
          args={[0.34 + (i % 2) * 0.08, 0.035, 10, 40]}
          position={[x, y, z]}
          rotation={[Math.PI / 2, i * 0.25, i * 0.4]}
        >
          <meshStandardMaterial
            color={colors[(i + 1) % colors.length]}
            emissive={colors[(i + 1) % colors.length]}
            emissiveIntensity={2.4}
            metalness={0.95}
            roughness={0.16}
          />
        </Torus>
      ))}
      <mesh position={[0, -1.28, 0.05]} rotation={[0, 0, 0.05]} scale={[0.25, 0.95, 0.22]}>
        <cylinderGeometry args={[0.72, 0.48, 1.8, 24]} />
        <meshStandardMaterial
          color="#d9d9df"
          emissive="#77778a"
          emissiveIntensity={1.5}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}

function SpaceObjects() {
  const brain = useRef<Group>(null)
  useFrame((state, delta) => {
    const object = brain.current
    if (!object) return
    object.rotation.y += delta * 0.2
    object.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.08
    object.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.12
    object.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.055)
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={24} color="#d4ff00" />
      <pointLight position={[-4, -2, 4]} intensity={18} color="#8a2be2" />
      <pointLight position={[0, 4, 1]} intensity={12} color="#ffd700" />
      <Float speed={1.35} rotationIntensity={0.25} floatIntensity={0.6}>
        <group ref={brain}>
          <BrainMatter />
          <Torus args={[1.85, 0.018, 8, 96]} rotation={[0.4, 0.15, 0]}>
            <meshStandardMaterial
              color="#d4ff00"
              emissive="#d4ff00"
              emissiveIntensity={4}
              transparent
              opacity={0.72}
            />
          </Torus>
          <Torus args={[2.18, 0.012, 8, 96]} rotation={[-0.5, 0.4, 0.2]}>
            <meshStandardMaterial
              color="#8a2be2"
              emissive="#8a2be2"
              emissiveIntensity={4}
              transparent
              opacity={0.65}
            />
          </Torus>
          <Torus args={[2.5, 0.009, 8, 96]} rotation={[0.15, -0.6, -0.35]}>
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={4}
              transparent
              opacity={0.5}
            />
          </Torus>
        </group>
      </Float>
      <Sparkles count={620} scale={[15, 11, 13]} size={2.2} speed={0.55} color="#d9d9df" />
    </>
  )
}

function DeepSpace() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 34 }} dpr={[1, 1.6]}>
      <color attach="background" args={['#090a0a']} />
      <SpaceObjects />
    </Canvas>
  )
}

function CosmicPlanet() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const colors = ['#D4FF00', '#FFD700', '#8A2BE2']
    const particles = Array.from({ length: 780 }, (_, index) => ({
      seed: Math.random() * Math.PI * 2,
      color: colors[index % colors.length],
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      vx: 0,
      vy: 0,
    }))
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const leave = () => {
      pointer.current = { x: -9999, y: -9999 }
    }

    const draw = () => {
      frame += 0.006
      ctx.clearRect(0, 0, width, height)
      const cx = width * 0.58
      const cy = height * 0.5
      const radius = Math.min(width, height) * 0.28
      const rect = sectionRef.current?.getBoundingClientRect()
      const progress = rect
        ? Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - height)))
        : 0
      const explosion = Math.max(0, (progress - 0.66) / 0.34)

      const sorted = particles
        .map((particle) => {
          const theta = particle.seed + frame * 0.55
          const lat = (particle.x - 0.5) * Math.PI
          const targetX = cx + Math.cos(lat) * Math.cos(theta) * radius
          const targetY = cy + Math.sin(lat) * radius
          const depth = (Math.sin(theta) * Math.cos(lat) + 1) / 2
          const burst = 1 + explosion * 5.5
          const px = cx + (targetX - cx) * burst + Math.sin(frame * 3 + particle.seed) * 8
          const py = cy + (targetY - cy) * burst + Math.cos(frame * 2 + particle.seed) * 8
          const dx = px - pointer.current.x
          const dy = py - pointer.current.y
          const distance = Math.hypot(dx, dy)
          if (distance < 120) {
            const force = (120 - distance) / 120
            particle.vx += (dx / (distance || 1)) * force * 1.8
            particle.vy += (dy / (distance || 1)) * force * 1.8
          }
          particle.vx *= 0.91
          particle.vy *= 0.91
          return {
            particle,
            x: px + particle.vx,
            y: py + particle.vy,
            size: 0.5 + depth * 2.4,
            alpha: 0.16 + depth * 0.84,
          }
        })
        .sort((a, b) => a.size - b.size)

      sorted.forEach(({ particle, x, y, size, alpha }) => {
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.shadowBlur = size > 1.6 ? 12 : 3
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    const animation = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <section ref={sectionRef} className="cosmic-section cosmic-page-two" id="cosmos">
      <canvas
        ref={canvasRef}
        aria-label="ライム、ゴールド、パープルの星が惑星を形成するインタラクティブアニメーション"
      />
      <div className="cosmic-copy">
        <p className="kicker">
          <span>05 / COSMIC FIELD</span>
        </p>
        <h2>
          星が集まり、
          <br />
          <em>惑星になる。</em>
        </h2>
        <p>カーソルを動かして、無数の記憶が形を得る瞬間を探索する。</p>
        <a href="#contact">
          EXPLORE THE ORBIT <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="cosmic-meta">
        PARTICLE SWARM / 780 STARS
        <br />
        INTERACTION: POINTER FIELD
      </div>
    </section>
  )
}

function MotionDirector() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.depth-panel').forEach((panel, index) => {
        const content = panel.querySelector('.panel-content')
        const visual = panel.querySelector('.panel-visual')
        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top top',
              end: '+=150%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          })
          .fromTo(
            panel,
            { backgroundColor: '#090a0a' },
            { backgroundColor: index === 1 ? '#11152a' : '#12170d', duration: 0.35 },
            0,
          )
          .fromTo(
            content,
            { z: -900, opacity: 0, y: 100, rotateX: 16 },
            { z: 0, opacity: 1, y: 0, rotateX: 0, ease: 'power3.out', duration: 0.45 },
            0,
          )
          .fromTo(
            visual,
            { z: -1200, scale: 0.18, opacity: 0, rotate: -24 },
            { z: 0, scale: 1, opacity: 1, rotate: 0, ease: 'expo.out', duration: 0.62 },
            0.12,
          )
          .to(
            content,
            { z: 500, opacity: 0, y: -90, rotateX: -12, ease: 'power2.in', duration: 0.42 },
            0.62,
          )
          .to(
            visual,
            { z: 900, scale: 2.4, opacity: 0, rotate: 18, ease: 'power3.in', duration: 0.38 },
            0.62,
          )
      })

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      heroTimeline
        .fromTo(
          '.hero-title',
          { scale: 1, y: 0, z: 0 },
          { scale: 1.18, y: -90, z: 260, ease: 'none', duration: 1 },
          0,
        )
        .fromTo(
          '.hero-space',
          { scale: 1, rotate: 0, opacity: 1 },
          { scale: 1.65, rotate: 16, opacity: 0.25, ease: 'none', duration: 1 },
          0,
        )
        .fromTo(
          '.hero-copy, .scroll-cue',
          { opacity: 1, y: 0 },
          { opacity: 0, y: -80, ease: 'power2.in', duration: 0.35 },
          0.18,
        )
        .fromTo('.hero-overlay', { z: 0 }, { z: -500, ease: 'none', duration: 1 }, 0)

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((item) =>
        gsap.fromTo(
          item,
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: item, start: 'top 85%', scrub: 1 },
          },
        ),
      )
    })
    return () => context.revert()
  }, [])
  return null
}

const panels = [
  {
    number: '02 / ARCHIVE',
    title: (
      <>
        古本が、
        <br />
        <em>宇宙になる。</em>
      </>
    ),
    copy: '記憶の断片をスキャンし、まだ見ぬ物語の奥行きへ。',
    kind: 'shelf',
  },
  {
    number: '03 / SYNTHESIS',
    title: (
      <>
        知性を、
        <br />
        <em>触れる形へ。</em>
      </>
    ),
    copy: '言葉・光・音・空間をリアルタイムに編み直す。',
    kind: 'orb',
  },
  {
    number: '04 / FUTURE',
    title: (
      <>
        次の現実を、
        <br />
        <em>生成する。</em>
      </>
    ),
    copy: 'AI PROは、想像と物質の間にある新しい入口です。',
    kind: 'portal',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="ai-shell" data-barba="wrapper">
      <MotionDirector />
      <div className="grain" aria-hidden="true" />
      <header className="nav">
        <a className="logo" href="#top">
          <span className="logo-mark">✳</span>AI<span>.PRO</span>
        </a>
        <nav>
          {['ARCHIVE', 'SYNTHESIS', 'FUTURE'].map((x, i) => (
            <a key={x} href={`#panel-${i}`}>
              {x}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <span className="status">
            <i /> LIVE / 2026
          </span>
          <a className="nav-cta" href="#contact">
            START A PROJECT <ArrowUpRight size={14} />
          </a>
          <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <Menu />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-nav">
          {panels.map((p, i) => (
            <a key={p.number} href={`#panel-${i}`} onClick={() => setMenuOpen(false)}>
              {p.number}
            </a>
          ))}
        </div>
      )}

      <section id="top" className="hero">
        <div className="hero-space">
          <DeepSpace />
        </div>
        <div className="hero-overlay">
          <p className="kicker">
            <span>001</span> INDEPENDENT AI CREATIVE STUDIO
          </p>
          <h1 className="hero-title">
            AI
            <br />
            <em>PRO</em>
          </h1>
          <p className="hero-copy">
            想像力を、立体化する。
            <br />
            スクロールして、奥へ入る。
          </p>
          <a className="scroll-cue" href="#panel-0">
            SCROLL TO ENTER <ArrowDown size={14} />
          </a>
        </div>
        <span className="hero-coords">
          35°41&apos;22.3&quot;N
          <br />
          139°41&apos;30.2&quot;E
        </span>
      </section>

      <CosmicPlanet />

      <section className="depth-stage">
        {panels.map((panel, index) => (
          <section id={`panel-${index}`} className={`depth-panel ${panel.kind}`} key={panel.number}>
            <div className="section-top">
              <span>{panel.number}</span>
              <span>SCROLL / Z-AXIS {String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="panel-content">
              <p className="panel-index">0{index + 2}</p>
              <h2>{panel.title}</h2>
              <p className="panel-copy">{panel.copy}</p>
              <span className="panel-line" />
            </div>
            <div className="panel-visual" aria-hidden="true">
              <div className="visual-core" />
              <div className="visual-ring ring-a" />
              <div className="visual-ring ring-b" />
              {panel.kind === 'shelf' && (
                <div className="book-stack">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <i key={i} />
                  ))}
                </div>
              )}
            </div>
            <span className="depth-label">
              Z — {String(100 - index * 28).padStart(3, '0')} / ENTER
            </span>
          </section>
        ))}
      </section>

      <section className="outro reveal" id="contact">
        <p className="kicker">
          <span>05</span> HUMAN × MACHINE
        </p>
        <h2>
          MAKE THE
          <br />
          <em>UNKNOWN.</em>
        </h2>
        <a className="big-link" href="mailto:hello@ai.pro">
          HELLO@AI.PRO <ArrowUpRight />
        </a>
      </section>

      <footer>
        <span>AI.PRO / TOKYO</span>
        <span>THE FUTURE IS A DEPTH.</span>
      </footer>

      <CosmicPlanet />
    </main>
  )
}