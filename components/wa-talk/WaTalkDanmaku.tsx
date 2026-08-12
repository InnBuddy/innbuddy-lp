'use client';

import { useEffect, useRef } from 'react';

const WORDS = [
  '桜', '紅葉', '温泉', '抹茶', '着物', '神社', '富士山', '新幹線',
  'おもてなし', '侘び寂び', '花見', '浴衣', '茶道', '書道', '華道',
  '能楽', '歌舞伎', '浮世絵', '和菓子', '日本酒', '寿司', '拉麺',
  '四季', '自然', '敬語', '武士', '忍者', '侍', '城', '庭園',
];

const COLORS = ['#005133', '#D3E173', '#7A903E', '#63822D', '#5AFF19', '#616B07', '#E0EBAF', '#007B49', '#84C98B', '#82AE46', '#91BA58', '#006C4F'];

interface WaTalkDanmakuProps {
  lang?: string;
}

export default function WaTalkDanmaku({ lang = 'ja' }: WaTalkDanmakuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // レーン数を計算
    const laneHeight = 54;
    const height = container.clientHeight;
    const laneCount = Math.floor(height / laneHeight);

    // 各レーンの単語を生成
    const lanes: Array<{ words: string[]; speed: number }> = [];
    for (let i = 0; i < laneCount; i++) {
      const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
      const speed = 40 + Math.random() * 130;
      lanes.push({ words: shuffled, speed });
    }

    // DOM生成
    const elements: Array<{ el: HTMLDivElement; lane: number }> = [];
    container.innerHTML = '';

    lanes.forEach((lane, laneIdx) => {
      const laneEl = document.createElement('div');
      laneEl.className = 'absolute left-0 w-full overflow-hidden';
      laneEl.style.top = `${laneIdx * laneHeight}px`;
      laneEl.style.height = `${laneHeight}px`;

      const track = document.createElement('div');
      track.className = 'flex whitespace-nowrap';
      track.style.animation = `danmaku-scroll ${30 / (lane.speed / 100)}s linear infinite`;

      // 単語を配置
      const words = [...lane.words, ...lane.words]; // ループ用に2倍
      words.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'mx-4 inline-block select-none';
        span.style.fontSize = `${0.72 + Math.random() * 0.88}rem`;
        span.style.fontWeight = Math.random() < 0.35 ? '800' : '500';
        span.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        span.style.opacity = `${(0.55 + Math.random() * 0.4).toFixed(2)}`;
        track.appendChild(span);
      });

      laneEl.appendChild(track);
      container.appendChild(laneEl);
      elements.push({ el: laneEl, lane: laneIdx });
    });

    return () => {
      container.innerHTML = '';
    };
  }, [lang]);

  return (
    <div className="mt-9 relative h-[560px] overflow-hidden border-t border-b border-[#1a431426] bg-white/60">
      {/* マスクグラデーション */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      />
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
