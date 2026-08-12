'use client';

import { useState, useEffect, useRef } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string };
  category?: string;
  publishedAt?: string;
}

interface WaTalkClientProps {
  initialArticles: Article[];
}

const HAIKU = ['四季をゆく', '旅で深める', '和の文化'];

const WORDS = [
  '桜', '紅葉', '温泉', '抹茶', '着物', '神社', '富士山', '新幹線',
  'おもてなし', '侘び寂び', '花見', '浴衣', '茶道', '書道', '華道',
  '能楽', '歌舞伎', '浮世絵', '和菓子', '日本酒', '寿司', '拉麺',
  '四季', '自然', '敬語', '武士', '忍者', '侍', '城', '庭園',
];

const COLORS = ['#005133', '#D3E173', '#7A903E', '#63822D', '#5AFF19', '#616B07', '#E0EBAF', '#007B49', '#84C98B', '#82AE46', '#91BA58', '#006C4F'];

const CATEGORY_LABELS: Record<string, string> = {
  food: '食文化',
  culture: '伝統文化',
  travel: '風景・旅',
};

const CATEGORY_COLORS: Record<string, string> = {
  food: '#E8B93C',
  culture: '#8A9A7B',
  travel: '#6B7F5E',
};

const SEASONS = [
  { name: '春', icon: '🌸', bg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)' },
  { name: '夏', icon: '☀️', bg: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #4dd0e1 100%)' },
  { name: '秋', icon: '🍂', bg: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 50%, #ffb74d 100%)' },
  { name: '冬', icon: '❄️', bg: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 50%, #64b5f6 100%)' },
];

export default function WaTalkClient({ initialArticles }: WaTalkClientProps) {
  const [articles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const danmakuRef = useRef<HTMLDivElement>(null);

  const handleSeasonClick = () => {
    const next = clickCount + 1;
    if (next >= 3) {
      setSeasonIdx((prev) => (prev + 1) % 4);
      setClickCount(0);
    } else {
      setClickCount(next);
    }
  };

  useEffect(() => {
    const container = danmakuRef.current;
    if (!container) return;

    container.innerHTML = '';
    const laneHeight = 54;
    const height = 560;
    const laneCount = Math.floor(height / laneHeight);

    for (let i = 0; i < laneCount; i++) {
      const lane = document.createElement('div');
      lane.className = 'absolute left-0 w-full overflow-hidden';
      lane.style.top = `${i * laneHeight}px`;
      lane.style.height = `${laneHeight}px`;

      const track = document.createElement('div');
      track.className = 'flex whitespace-nowrap';
      const duration = 20 + Math.random() * 40;
      track.style.animation = `danmaku-scroll ${duration}s linear infinite`;

      const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
      const doubled = [...shuffled, ...shuffled];

      doubled.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'mx-4 inline-block select-none';
        span.style.fontSize = `${0.72 + Math.random() * 0.88}rem`;
        span.style.fontWeight = Math.random() < 0.35 ? '800' : '500';
        span.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        span.style.opacity = `${(0.55 + Math.random() * 0.4).toFixed(2)}`;
        track.appendChild(span);
      });

      lane.appendChild(track);
      container.appendChild(lane);
    }
  }, []);

  const heroImage = articles[0]?.eyecatch?.url || '/images/fog_forest.png';

  return (
    <main className="min-h-screen" style={{ background: 'var(--warm-white)' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedArticle(null)}>
            <span className="font-black text-xl tracking-wide" style={{ color: 'var(--moss)' }}>Wa Talk</span>
            <span className="text-xs tracking-widest font-bold" style={{ color: 'var(--sage)' }}>BY INNBUDDY</span>
          </div>
          <nav className="flex items-center gap-2">
            <button
              onClick={handleSeasonClick}
              className="text-2xl hover:scale-110 transition-transform"
              title={`${SEASONS[seasonIdx].name}（あと${3 - clickCount}クリックで切替）`}
            >
              {SEASONS[seasonIdx].icon}
            </button>
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-sm px-3 py-2 rounded-full hover:bg-black/5 transition-colors"
            >
              記事一覧
            </button>
          </nav>
        </div>
      </header>

      {/* ヒーロー */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '88vh', minHeight: '560px', background: SEASONS[seasonIdx].bg }}
      >
        <div
          className="relative z-10"
          style={{
            width: 'min(880px, 94vw)',
            aspectRatio: '1000/700',
            WebkitMaskImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Cpath d='M 100 50 Q 50 50 50 100 Q 30 350 60 600 Q 60 650 110 650 L 890 650 Q 940 650 940 600 Q 970 350 950 100 Q 950 50 900 50 Z' fill='white'/%3E%3C/svg%3E")`,
            maskImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Cpath d='M 100 50 Q 50 50 50 100 Q 30 350 60 600 Q 60 650 110 650 L 890 650 Q 940 650 940 600 Q 970 350 950 100 Q 950 50 900 50 Z' fill='white'/%3E%3C/svg%3E")`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            filter: 'drop-shadow(0 20px 40px rgba(60,30,40,0.25))',
          }}
        >
          <img src={heroImage} alt="Wa Talk" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-row-reverse items-center justify-center gap-8 pointer-events-none">
            {HAIKU.map((line, i) => (
              <span
                key={i}
                className="font-bold text-white"
                style={{
                  writingMode: 'vertical-rl',
                  fontSize: 'clamp(19px, 2.9vw, 32px)',
                  letterSpacing: '0.42em',
                  textShadow: '0 2px 14px rgba(50,10,20,0.55), 0 0 3px rgba(0,0,0,0.35)',
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 弾幕 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs tracking-widest font-bold text-center mb-4" style={{ color: 'var(--accent)' }}>和の言葉</p>
          <div className="relative h-[560px] overflow-hidden border-t border-b border-gray-200 bg-white/60 rounded-lg">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            />
            <div ref={danmakuRef} className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* 記事一覧 */}
      {!selectedArticle && (
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-xs tracking-widest font-bold text-center mb-2" style={{ color: 'var(--accent)' }}>WA TALK</p>
            <h2 className="text-center text-3xl md:text-4xl font-black mb-12" style={{ color: 'var(--ink)' }}>和の物語</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => {
                const catColor = CATEGORY_COLORS[article.category || 'culture'] || '#8A9A7B';
                return (
                  <article
                    key={article.id}
                    className="wa-card bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {article.eyecatch?.url ? (
                        <img src={article.eyecatch.url} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                      )}
                      <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: `${catColor}18`, color: catColor }}>
                        {CATEGORY_LABELS[article.category || 'culture'] || article.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-xs opacity-50">{article.publishedAt?.slice(0, 10)}</div>
                      <h3 className="mt-2 text-base font-bold leading-relaxed" style={{ color: 'var(--ink)' }}>{article.title}</h3>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 記事詳細 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <button onClick={() => setSelectedArticle(null)} className="fixed top-20 left-4 z-60 bg-white/90 border border-gray-200 px-4 py-2 rounded-full text-sm cursor-pointer backdrop-blur-sm hover:bg-gray-50 transition-colors shadow-lg">
            ← 記事一覧に戻る
          </button>
          <div className="relative h-[50vh] min-h-[300px] overflow-hidden">
            {selectedArticle.eyecatch?.url ? (
              <img src={selectedArticle.eyecatch.url} alt={selectedArticle.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </div>
          <div className="max-w-[720px] mx-auto px-5 py-12 pb-20">
            <h2 className="text-2xl md:text-3xl font-bold leading-relaxed" style={{ color: 'var(--ink)' }}>{selectedArticle.title}</h2>
            <div className="mt-3 text-sm opacity-50">{selectedArticle.publishedAt?.slice(0, 10)}</div>
            <div className="w-16 h-0.5 mt-6 mb-8" style={{ background: 'var(--accent)' }} />
            <div className="prose" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm opacity-50">© {new Date().getFullYear()} Wa Talk by InnBuddy</div>
      </footer>
    </main>
  );
}
