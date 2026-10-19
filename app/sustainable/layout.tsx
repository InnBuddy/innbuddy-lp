import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'HOTEL × SDGs 2030 — FROM EARTH TO HOTEL',
  description: '地球から始まって、最後に自分の宿へ戻ってくるデジタル・エディトリアル。',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3efe6' },
    { media: '(prefers-color-scheme: dark)', color: '#13221f' },
  ],
}

export default function SustainableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}