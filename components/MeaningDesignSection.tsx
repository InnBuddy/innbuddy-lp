'use client';

import { useState } from 'react';

// 仮のプレースホルダー画像パス（後日実写真に差し替え）
// 6列×3行 = 18枚
const placeholderImages = Array.from({ length: 18 }, (_, i) => `/images/meaning/photo_${i + 1}.jpg`);

// 各行のテキスト（空行を含むことで余白を制御）
const textLines = [
  'これは、あなたの見慣れた日常ですか？',
  '日常は、人によって異なります。',
  '世界は、人によって見え方が違います。',
  '', // 空行
  'ある人にとっての「何もない」は、',
  '別の誰かにとって、まだ見ぬ景色かもしれません。',
  '多様化が進む世界で、',
  '「何もない」は、贅沢になる。',
  '', // 空行
  '私たちは、その“意味”のデザインから始めます。',
  'あなたの宿の日常に、まだ気づかれていない価値を見出すために。',
];

export default function MeaningDesignSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* テキストブロック（グリッドの上部に中央配置） */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="font-serif font-light text-3xl md:text-5xl text-foreground mb-8">
              デスティネーションデザイン
            </h2>
            <div className="max-w-2xl mx-auto text-sm text-foreground/60 leading-relaxed">
              {textLines.map((line, index) => {
                if (line === '') {
                  // 空行は段落間の余白として扱う
                  return <div key={index} className="h-3" />;
                }
                return <p key={index}>{line}</p>;
              })}
            </div>
          </div>

          {/* 6列×3行の写真グリッド */}
          <div className="grid grid-cols-6 gap-1">
            {placeholderImages.map((src, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-300"
                onClick={() => setSelectedImage(src)}
              >
                <img src={src} alt={`日常の断片 ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ライトボックス（拡大表示） */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="拡大表示" className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}