'use client'

import { useEffect, useState } from 'react'
import { PREFECTURES } from '@/lib/content'

type Comment = {
  label: string
  top: number
  duration: number
  delay: number
  size: number
  strong: boolean
}

/**
 * ニコニコ動画の弾幕コメント風。
 * - 都道府県 / 県庁所在地は言語設定に関わらず【常に英語表記】。
 * - Y 軸（高さ）をランダムに散りばめ、スピードはかなり遅めで右から左へ流す。
 */
export function DanmakuStrip() {
  // ランダム値は SSR とクライアントで一致しないため、マウント後にのみ生成する
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const pool = [...PREFECTURES, ...PREFECTURES] // 密度を上げる
    setComments(
      pool.map((label) => ({
        label,
        top: Math.round(Math.random() * 88), // 0-88%
        duration: 34 + Math.random() * 34, // 34-68s（かなり遅め）
        delay: -Math.random() * 60, // 開始時点でバラけさせる
        size: 0.85 + Math.random() * 0.7, // rem
        strong: Math.random() > 0.7,
      })),
    )
  }, [])

  return (
    <section
      aria-label="Japan prefectures and capitals"
      className="relative h-64 overflow-hidden border-y border-brand-brown/15 bg-white/30 backdrop-blur-sm md:h-72"
    >
      {comments.map((c, i) => (
        <span
          key={i}
          className="absolute left-0 whitespace-nowrap font-medium tracking-wide will-change-transform"
          style={{
            top: `${c.top}%`,
            fontSize: `${c.size}rem`,
            color: c.strong ? 'var(--brand-green)' : 'var(--brand-brown)',
            animation: `danmaku ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          {c.label}
        </span>
      ))}
    </section>
  )
}
