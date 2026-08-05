import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Zen_Kaku_Gothic_New, Anton } from 'next/font/google'
import './globals.css'

const zen = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-zen',
  display: 'swap',
})

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wa Talk 和とーく — Japan Story from the World',
  description:
    '世界から届く日本のストーリー。食、文化、風景を巡る Wa Talk 和とーく のブログマガジン。',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${zen.variable} ${anton.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
