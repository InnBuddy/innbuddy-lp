'use client'

import { useEffect, useRef } from 'react'

export default function OtaHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // ドット球体メッシュの生成（緯度・経度の幾何学配列）
    const dots: { x: number; y: number; z: number }[] = []
    const latCount = 42 // 緯線数
    const lonCount = 56 // 経線数
    const radius = 380  // 球体の半径

    for (let i = 0; i <= latCount; i++) {
      const theta = (i * Math.PI) / latCount // 0 to PI
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      for (let j = 0; j < lonCount; j++) {
        const phi = (j * 2 * Math.PI) / lonCount // 0 to 2PI
        const x = radius * sinTheta * Math.cos(phi)
        const y = radius * cosTheta
        const z = radius * sinTheta * Math.sin(phi)
        dots.push({ x, y, z })
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 球体の配置中心（画面中央よりやや下）
      const cx = canvas.width * 0.5
      const cy = canvas.height * 0.62

      // チルト角（手前に少し傾けてドーム形状を見せる）
      const tilt = 0.55
      const cosTilt = Math.cos(tilt)
      const sinTilt = Math.sin(tilt)

      // ゆったりとした微速自転
      angle += 0.0018
      const cosAngle = Math.cos(angle)
      const sinAngle = Math.sin(angle)

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i]

        // Y軸回転
        const x1 = p.x * cosAngle - p.z * sinAngle
        const z1 = p.x * sinAngle + p.z * cosAngle

        // X軸傾き
        const y2 = p.y * cosTilt - z1 * sinTilt
        const z2 = p.y * sinTilt + z1 * cosTilt

        // 手前側・上部の半球をメインに描画
        if (z2 > -120) {
          const fov = 650
          const scale = fov / (fov + z2)
          const px = cx + x1 * scale
          const py = cy + y2 * scale

          // 奥行きに応じた透明度とサイズ
          const alpha = Math.max(0.08, Math.min(0.9, (z2 + 250) / 450))
          const size = Math.max(0.6, 1.4 * scale)

          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}