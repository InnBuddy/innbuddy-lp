import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI.PRO — Intelligence with feeling',
  description: 'AIで、まだ名前のない体験をつくる。AI PRO Creative Studio.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function AiProLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="aipro-layout-container antialiased">
      {children}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </div>
  )
}