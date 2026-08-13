import './globals.css';

export const metadata = {
  title: 'InnBuddy | OTA運用代行・インバウンド集客',
  description: '楽天トラベル・じゃらん・Booking.com・Agoda・Trip.com・Travelokaなど、国内・海外OTAをまとめて運用。販売戦略・価格調整・サイトコントローラーまで。1ヶ月無料トライアル実施中。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Zen+Old+Mincho:wght@400;500;600;700&family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
