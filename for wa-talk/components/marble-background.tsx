'use client'

import { motion } from 'framer-motion'

/**
 * 赤と白のマーブル背景。
 * - 複数のぼかした円形（blur）が画面全体をゆっくり渦を巻くように動き続ける。
 * - 赤のグループと白のグループが「交互に強弱」になるよう、
 *   opacity / scale を逆位相（antiphase）でアニメーションさせる。
 */

// 逆位相のパルス。位相 phase=0 なら強→弱→強、phase=1 なら弱→強→弱。
const PULSE = 7 // 1 サイクルの秒数（かなりゆっくり）

type Blob = {
  color: string
  size: number // vmax 単位
  top: string
  left: string
  drift: { x: number[]; y: number[] }
  duration: number
  delay: number
}

const RED_BLOBS: Blob[] = [
  {
    color: 'var(--brand-red)',
    size: 70,
    top: '-10%',
    left: '-5%',
    drift: { x: [0, 120, -40, 0], y: [0, 80, 160, 0] },
    duration: 26,
    delay: 0,
  },
  {
    color: '#e23b46',
    size: 55,
    top: '30%',
    left: '55%',
    drift: { x: [0, -140, 60, 0], y: [0, 100, -60, 0] },
    duration: 32,
    delay: 2,
  },
  {
    color: '#b31722',
    size: 60,
    top: '60%',
    left: '10%',
    drift: { x: [0, 90, -110, 0], y: [0, -120, 40, 0] },
    duration: 30,
    delay: 1,
  },
]

const WHITE_BLOBS: Blob[] = [
  {
    color: '#ffffff',
    size: 65,
    top: '10%',
    left: '35%',
    drift: { x: [0, -100, 80, 0], y: [0, 120, -40, 0] },
    duration: 28,
    delay: 0,
  },
  {
    color: '#fff2f2',
    size: 58,
    top: '55%',
    left: '60%',
    drift: { x: [0, 130, -70, 0], y: [0, -90, 110, 0] },
    duration: 34,
    delay: 3,
  },
  {
    color: '#fde7e7',
    size: 52,
    top: '75%',
    left: '30%',
    drift: { x: [0, -80, 120, 0], y: [0, 60, -130, 0] },
    duration: 24,
    delay: 1.5,
  },
]

function BlobField({ blobs, phase }: { blobs: Blob[]; phase: 0 | 1 }) {
  // phase 0（赤）: 強 → 弱 → 強  /  phase 1（白）: 弱 → 強 → 弱
  const opacity = phase === 0 ? [0.9, 0.35, 0.9] : [0.35, 0.9, 0.35]
  const scale = phase === 0 ? [1.15, 0.85, 1.15] : [0.85, 1.15, 0.85]

  return (
    <>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}vmax`,
            height: `${b.size}vmax`,
            backgroundColor: b.color,
            filter: 'blur(70px)',
            mixBlendMode: 'normal',
          }}
          animate={{
            x: b.drift.x,
            y: b.drift.y,
            // 交互の強弱（逆位相のパルス）
            opacity,
            scale,
          }}
          transition={{
            x: { duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
            y: { duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
            opacity: { duration: PULSE, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: PULSE, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </>
  )
}

export function MarbleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white"
    >
      {/* ゆっくり全体を回転させて渦を巻く動きを強める */}
      <motion.div
        className="absolute inset-[-20%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <BlobField blobs={RED_BLOBS} phase={0} />
        <BlobField blobs={WHITE_BLOBS} phase={1} />
      </motion.div>

      {/* 白のベールで彩度を抑え、マーブルらしい柔らかさを出す（赤が透けて見える程度に） */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  )
}
