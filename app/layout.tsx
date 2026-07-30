import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnBuddy | 日本の宿を世界ブランドに",
  description: "OTA運用、Webサイト制作、ブランディング、インバウンド戦略まで。地方の宿の価値を最大限に引き出す、クリエイティブパートナーです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* ページが完全に読み込まれた後に、壊れた画像を全て非表示にする */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                document.querySelectorAll('img').forEach(function(img) {
                  img.addEventListener('error', function() {
                    this.style.display = 'none';
                  });
                  // キャッシュなどですでにエラー状態の画像にも対応
                  if (img.complete && img.naturalWidth === 0) {
                    img.style.display = 'none';
                  }
                });
              });
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}