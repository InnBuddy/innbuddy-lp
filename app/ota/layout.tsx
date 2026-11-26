import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'ホテル・旅館のOTA運用代行ならInnBuddy｜インバウンド、ハラル対応、ウェブ集客、収益改善を支援',
  description:
    'ホテル・旅館の相棒。OTA運用をまるごとサポート。楽天トラベル、じゃらん、Booking.com、アゴダなどの掲載・料金設定・販売分析・改善まで、あなたの施設の状況に合わせて支援します。',
  openGraph: {
    title: 'ホテル・旅館のOTA相棒｜InnBuddy',
    description: '宿泊施設のOTA運用と販売戦略を支援',
    url: 'https://innbuddy-japan.com/ota/',
    siteName: 'InnBuddy',
    images: [
      {
        // ※ブランド画像の実際のファイルパスに合わせて変更してください
        url: 'https://innbuddy-japan.com/library/ota/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ホテル・旅館のOTA相棒｜InnBuddy',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ホテル・旅館のOTA相棒｜InnBuddy',
    description: '宿泊施設のOTA運用と販売戦略を支援',
    images: ['https://innbuddy-japan.com/library/ota/og-image.jpg'],
  },
}

export default function OtaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}