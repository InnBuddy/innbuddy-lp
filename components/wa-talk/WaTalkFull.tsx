'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Article {
  id: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  content: string;
  bodyEn?: string;
  bodyZh?: string;
  coverImage?: { url: string }; // ← ここを image → coverImage に変更
  category?: string;
  publishedAt?: string;
  author?: string;
  slug?: string;
}

interface WaTalkFullProps {
  initialArticles: Article[];
}

type Lang = 'ja' | 'en' | 'zh' | 'yue' | 'ko' | 'vi' | 'th' | 'id' | 'ms' | 'my' | 'hi' | 'bn' | 'ta' | 'ru' | 'es' | 'fr' | 'it' | 'pt' | 'ar';

const LANG_OPTIONS: [Lang, string][] = [
  ['ja', '日本語'], ['en', 'English'], ['zh', '简体中文'],
];

const CATEGORY_COLORS: Record<string, string> = {
  food: '#E8B93C', culture: '#8A9A7B', travel: '#6B7F5E',
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  food: { ja: '食文化', en: 'Food', zh: '食文化' },
  culture: { ja: '伝統文化', en: 'Culture', zh: '传统文化' },
  travel: { ja: '風景・旅', en: 'Travel', zh: '风景・旅行' },
};

const WORDS_JA = [
  '桜', '紅葉', '温泉', '抹茶', '着物', '神社', '富士山', '新幹線',
  'おもてなし', '侘び寂び', '花見', '浴衣', '茶道', '書道', '華道',
  '能楽', '歌舞伎', '浮世絵', '和菓子', '日本酒', '寿司', '拉麺',
  '四季', '自然', '敬語', '武士', '忍者', '侍', '城', '庭園',
  '北海道', '東京', '京都', '大阪', '沖縄', '奈良', '鎌倉', '箱根',
];

const WORDS_EN = [
  'Cherry blossom', 'Autumn leaves', 'Hot spring', 'Matcha', 'Kimono', 'Shrine', 'Mt. Fuji', 'Shinkansen',
  'Omotenashi', 'Wabi-sabi', 'Hanami', 'Yukata', 'Tea ceremony', 'Calligraphy', 'Flower arrangement',
  'Noh', 'Kabuki', 'Ukiyo-e', 'Wagashi', 'Sake', 'Sushi', 'Ramen',
  'Four seasons', 'Nature', 'Keigo', 'Samurai', 'Ninja', 'Warrior', 'Castle', 'Garden',
  'Hokkaido', 'Tokyo', 'Kyoto', 'Osaka', 'Okinawa', 'Nara', 'Kamakura', 'Hakone',
];

const WORDS_ZH = [
  '樱花', '红叶', '温泉', '抹茶', '和服', '神社', '富士山', '新干线',
  '款待之道', '侘寂', '赏花', '浴衣', '茶道', '书法', '花道',
  '能乐', '歌舞伎', '浮世绘', '和果子', '日本酒', '寿司', '拉面',
  '四季', '自然', '敬语', '武士', '忍者', '侍', '城', '庭园',
  '北海道', '东京', '京都', '大阪', '冲绳', '奈良', '镰仓', '箱根',
];

const WORDS_MAP: Record<string, string[]> = {
  ja: WORDS_JA,
  en: WORDS_EN,
  zh: WORDS_ZH,
};

const COLORS = ['#005133', '#D3E173', '#7A903E', '#63822D', '#5AFF19', '#616B07', '#E0EBAF', '#007B49', '#84C98B', '#82AE46', '#91BA58', '#006C4F'];

const UI_TEXT: Record<string, Record<string, string>> = {
  waveTitle: { ja: 'Wa Wave', en: 'Wa Wave', zh: 'Wa Wave' },
  waveCount: { ja: '流れている日本関連の言葉は 2,547 件', en: '2,547 Japanese words flowing', zh: '2,547个日语词汇在流动' },
  waveHint: { ja: '気になる言葉を検索して、新たな冒険に！', en: 'Search for words and start a new adventure!', zh: '搜索感兴趣的词汇，开启新的冒险！' },
  storiesTitle: { ja: '世界から届くジャパントーク', en: 'Japan Stories from Around the World', zh: '来自世界各地的日本故事' },
  readMin: { ja: '分', en: ' min', zh: '分钟' },
  back: { ja: '← 戻る', en: '← Back', zh: '← 返回' },
  navFood: { ja: '食文化', en: 'Food', zh: '美食' },
  navCulture: { ja: '伝統文化', en: 'Culture', zh: '文化' },
  navTravel: { ja: '風景・旅', en: 'Travel', zh: '旅行' },
};

const HAIKU: Record<string, string[]> = {
  ja: ['四季をゆく', '旅で深める', '和の文化'],
  en: ['Four seasons,', 'one journey —', 'deepening Wa.'],
  zh: ['行四季之旅', '探和文化', '深其之美'],
};

function getTitle(a: Article, l: string): string {
  const k = `title${l.charAt(0).toUpperCase() + l.slice(1)}` as keyof Article;
  return (l !== 'ja' && a[k] as string) || a.title;
}

function getBody(a: Article, l: string): string {
  const k = `body${l.charAt(0).toUpperCase() + l.slice(1)}` as keyof Article;
  return (l !== 'ja' && a[k] as string) || a.content;
}

const S = {
  serif: "'Cormorant Garamond', 'Noto Serif JP', 'Yu Mincho', serif",
  sans: "'Helvetica Neue', Arial, sans-serif",
  dark: '#1a1a1a',
  muted: '#666',
  accent: '#3a5a40',
  accentL: '#d3e173',
  headerBg: 'rgba(255,255,255,0.95)',
};

export default function WaTalkFull({ initialArticles }: WaTalkFullProps) {
  const [articles] = useState<Article[]>(initialArticles);
  const [sel, setSel] = useState<Article | null>(null);
  const [sIdx, setSIdx] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [lang, setLang] = useState<Lang>('ja');
  const bgRef = useRef<HTMLCanvasElement>(null);
  const leafRef = useRef<HTMLCanvasElement>(null);
  const dmRef = useRef<HTMLDivElement>(null);

  const ui = (k: string) => UI_TEXT[k]?.[lang] || UI_TEXT[k]?.ja || k;
  const cat = (c: string) => CATEGORY_LABELS[c]?.[lang] || CATEGORY_LABELS[c]?.ja || c;

  const click = useCallback((a: Article) => {
    setSel(a);
    const n = cnt + 1;
    if (n >= 3) { setSIdx(p => (p + 1) % 4); setCnt(0); } else setCnt(n);
  }, [cnt]);

  const close = useCallback(() => setSel(null), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [close]);

  // WebGL背景（変更なし）
  useEffect(() => {
    const c = bgRef.current; if (!c) return;
    const gl = c.getContext('webgl', { antialias: false, alpha: false }); if (!gl) return;
    const V = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const F = `precision highp float;uniform vec2 R;uniform float T;uniform float S;
      float h(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.55;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.04+vec2(3.1,1.7);a*=.5;}return v;}
      void main(){vec2 uv=gl_FragCoord.xy/R;vec2 p=(uv-.5)*vec2(R.x/R.y,1.)*2.6;vec2 lp=vec2(cos(T),sin(T))*1.35;vec2 q=p+lp;float w=fbm(q+.8*vec2(fbm(q),fbm(q+vec2(4.7,2.9))));float mist=fbm(q*.55+1.7);
      if(S<.5){float v=sin((q.x*.9+q.y*1.1)*2.2+w*7.+T*1.5);float veins=pow(.5+.5*v,12.);vec3 col=mix(vec3(1.,.992,.984),vec3(.969,.894,.882),smoothstep(.25,.85,mist));col=mix(col,vec3(.914,.482,.470),veins*w*.45);col=mix(col,vec3(.824,.122,.169),veins*veins*.34);col=mix(col,vec3(1.,.992,.984),.20+.20*uv.y);gl_FragColor=vec4(col,1.);}
      else if(S<1.5){float v=sin(q.y*3.2+w*4.5+T*2.2);float waves=pow(.5+.5*v,9.);vec3 col=mix(vec3(.949,.914,.835),vec3(.83,.96,.93),smoothstep(.2,.8,mist));col=mix(col,vec3(.35,.80,.78),waves*(.7+.3*sin(T*.8+q.x*.5))*.5);col=mix(col,vec3(.55,.88,.86),waves*waves*w*.35);col=mix(col,vec3(.96,.99,.98),.30+.25*uv.y);gl_FragColor=vec4(col,1.);}
      else if(S<2.5){float v=sin((q.x*.9+q.y*1.1)*2.2+w*7.+T*1.5);float veins=pow(.5+.5*v,10.);vec3 col=mix(vec3(.988,.949,.894),vec3(.92,.72,.32),smoothstep(.28,.72,mist)*.8);col=mix(col,vec3(.78,.24,.16),veins*w*.55);col=mix(col,vec3(.51,.32,.19),pow(veins,2.4)*w*.6);col=mix(col,vec3(.988,.949,.894),.18+.20*uv.y);gl_FragColor=vec4(col,1.);}
      else{float v=sin((q.x*.8+q.y*1.0)*1.6+w*5.+T*1.2);float veins=pow(.5+.5*v,14.);vec3 col=mix(vec3(.985,.995,1.),vec3(.86,.94,.98),smoothstep(.3,.85,mist));col=mix(col,vec3(.70,.88,.94),veins*w*.38);float grid=cos(q.x*55.)*cos(q.y*55.);float tw=h(floor(q*55.)+floor(T*4.));float sparkle=step(.992,tw)*smoothstep(.96,1.,grid);sparkle*=.6+.4*sin(T*6.+tw*30.);col=mix(col,vec3(1.,.98,.88),clamp(sparkle,0.,1.));gl_FragColor=vec4(col,1.);}}`;
    const sh = (t: number, s: string) => { const x = gl.createShader(t)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, V)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, F)); gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const ap = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T'), uS = gl.getUniformLocation(pr, 'S');
    const rs = () => { c.width = innerWidth * .6; c.height = innerHeight * .6; gl.viewport(0, 0, c.width, c.height); };
    addEventListener('resize', rs); rs();
    const L = 18, st = performance.now(); let raf: number;
    const tk = () => { const t = (performance.now() - st) / 1000; gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, (t % L) / L * Math.PI * 2); gl.uniform1f(uS, sIdx); gl.drawArrays(gl.TRIANGLES, 0, 3); raf = requestAnimationFrame(tk); };
    raf = requestAnimationFrame(tk);
    return () => { removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, [sIdx]);

  // 落ち葉（変更なし）
  useEffect(() => {
    const cv = leafRef.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const LC = ['#7a903e', '#91ba58', '#82ae46', '#007b49', '#63822d', '#84c98b', '#5aff19'];
    let W = 0, H = 0; const leaves: any[] = [];
    const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    addEventListener('resize', rs); rs();
    const sp = (i: boolean) => ({ x: Math.random() * W, y: i ? Math.random() * H : -20, size: 6 + Math.random() * 10, color: LC[Math.floor(Math.random() * 7)], angle: Math.random() * Math.PI * 2, speed: .4 + Math.random() * .9, sway: .4 + Math.random() * .9, phase: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .028, opacity: .35 + Math.random() * .45 });
    for (let i = 0; i < 24; i++) leaves.push(sp(true));
    let raf: number;
    const tk = () => {
      ctx.clearRect(0, 0, W, H); const t = performance.now() / 1000;
      for (const l of leaves) {
        l.y += l.speed; l.x += Math.sin(t * l.sway + l.phase) * .5; l.angle += l.spin;
        ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(l.angle); ctx.globalAlpha = l.opacity; ctx.fillStyle = l.color;
        ctx.beginPath(); ctx.moveTo(0, -l.size); ctx.quadraticCurveTo(l.size * .65, -l.size * .15, l.size * .4, l.size * .7); ctx.quadraticCurveTo(0, l.size, -l.size * .4, l.size * .7); ctx.quadraticCurveTo(-l.size * .65, -l.size * .15, 0, -l.size); ctx.fill();
        ctx.globalAlpha = l.opacity * .75; ctx.strokeStyle = l.color; ctx.lineWidth = .6;
        ctx.beginPath(); ctx.moveTo(0, -l.size * .8); ctx.lineTo(0, l.size * .8); ctx.stroke(); ctx.restore();
        if (l.y > H + 24) Object.assign(l, sp(false));
      }
      raf = requestAnimationFrame(tk);
    };
    raf = requestAnimationFrame(tk);
    return () => { removeEventListener('resize', rs); cancelAnimationFrame(raf); };
  }, []);

  // 弾幕（変更なし）
  useEffect(() => {
    const el = dmRef.current; if (!el) return;
    el.innerHTML = '';
    const words = WORDS_MAP[lang] || WORDS_JA;
    const lh = 48, W = el.clientWidth, H = el.clientHeight, n = Math.floor(H / lh);
    const lanes: any[] = [];
    let q = [...words].sort(() => Math.random() - .5), qi = 0;
    const nx = () => { if (qi >= q.length) { q = [...words].sort(() => Math.random() - .5); qi = 0; } return q[qi++]; };
    const mk = (lane: HTMLDivElement) => {
      const s = document.createElement('span'); s.textContent = nx();
      const r = Math.random();
      const rem = r < .08 ? 2.0 + Math.random() * .8 : r < .25 ? 1.3 + Math.random() * .5 : r < .6 ? .85 + Math.random() * .35 : .55 + Math.random() * .2;
      s.style.cssText = `position:absolute;top:50%;left:0;transform:translate3d(0,-50%,0);white-space:nowrap;line-height:1;font-size:${rem.toFixed(2)}rem;font-weight:${Math.random() < .3 ? 900 : Math.random() < .5 ? 700 : 500};color:${COLORS[Math.floor(Math.random() * 12)]};opacity:${(.6 + Math.random() * .35).toFixed(2)};user-select:none;`;
      lane.appendChild(s); return { el: s, x: 0, w: s.getBoundingClientRect().width };
    };
    for (let i = 0; i < n; i++) {
      const lane = document.createElement('div'); lane.style.cssText = `position:absolute;left:0;width:100%;top:${i * lh}px;height:${lh}px;overflow:hidden;`;
      el.appendChild(lane);
      const sp = (30 + Math.random() * 200) * Math.min(Math.max(W / 1280, .6), 1.3);
      const items: any[] = []; let x = -Math.random() * 600 - 100;
      while (x < W + 80) { const it = mk(lane); it.x = x; it.el.style.transform = `translate3d(${x}px,-50%,0)`; items.push(it); x += it.w + 16 + Math.random() * 60; }
      lanes.push({ lane, items, speed: sp });
    }
    let last = performance.now(), raf: number;
    const tk = (now: number) => {
      const dt = Math.min((now - last) / 1000, .1); last = now; const w = el.clientWidth;
      for (const L of lanes) {
        let right = -Infinity; const keep: any[] = [];
        for (const it of L.items) { it.x -= L.speed * dt; if (it.x + it.w > -20) { keep.push(it); it.el.style.transform = `translate3d(${it.x.toFixed(1)}px,-50%,0)`; right = Math.max(right, it.x + it.w); } else it.el.remove(); }
        L.items = keep;
        while (right < w + 40) { const it = mk(L.lane); it.x = Math.max(w + 10, right + 16 + Math.random() * 60); it.el.style.transform = `translate3d(${it.x}px,-50%,0)`; L.items.push(it); right = it.x + it.w; }
      }
      raf = requestAnimationFrame(tk);
    };
    raf = requestAnimationFrame(tk);
    return () => cancelAnimationFrame(raf);
  }, [lang]);

  const haiku = HAIKU[lang] || HAIKU.ja;
  const fmt = (d?: string) => d ? `${new Date(d).getFullYear()}.${String(new Date(d).getMonth() + 1).padStart(2, '0')}.${String(new Date(d).getDate()).padStart(2, '0')}` : '';
  const mins = (c: string) => Math.max(1, Math.ceil((c?.replace(/<[^>]+>/g, '')?.length || 0) / 600));

  return (
    <>
      <canvas ref={bgRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }} aria-hidden="true" />
      <canvas ref={leafRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ヘッダー */}
        <header style={{ position: 'sticky', top: 0, zIndex: 10, background: S.headerBg, backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={close}>
              <img src="/images/wa-talk-logo.png" alt="" style={{ height: 36, width: 'auto', borderRadius: 6, objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 20, color: '#000', letterSpacing: '.06em', fontFamily: "'Train One', 'Helvetica Neue', Arial, sans-serif", lineHeight: 1.1 }}>WAAI DIG</div>
                <div style={{ fontSize: 8, letterSpacing: '.3em', color: S.muted, fontFamily: S.sans, fontWeight: 500, marginTop: 2 }}>BY INNBUDDY</div>
              </div>
            </div>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <a href="#articles" style={{ fontSize: 12, color: S.muted, textDecoration: 'none', letterSpacing: '.1em', fontFamily: S.sans, textTransform: 'uppercase' }}>{ui('navFood')}</a>
              <a href="#articles" style={{ fontSize: 12, color: S.muted, textDecoration: 'none', letterSpacing: '.1em', fontFamily: S.sans, textTransform: 'uppercase' }}>{ui('navCulture')}</a>
              <a href="#articles" style={{ fontSize: 12, color: S.muted, textDecoration: 'none', letterSpacing: '.1em', fontFamily: S.sans, textTransform: 'uppercase' }}>{ui('navTravel')}</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginLeft: 8, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 4 }}>
                {LANG_OPTIONS.map(([code, label], i) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    style={{
                      fontSize: 10,
                      fontFamily: S.sans,
                      letterSpacing: '.06em',
                      padding: '6px 12px',
                      background: lang === code ? '#000' : 'transparent',
                      color: lang === code ? '#fff' : S.muted,
                      border: 'none',
                      borderRight: i < LANG_OPTIONS.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: lang === code ? 600 : 400,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </header>

        {/* ヒーロー */}
        <section style={{ position: 'relative', height: '85vh', minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ width: 'min(860px, 92vw)', aspectRatio: '1000/700', WebkitMaskImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Cpath d='M 100 50 Q 50 50 50 100 Q 30 350 60 600 Q 60 650 110 650 L 890 650 Q 940 650 940 600 Q 970 350 950 100 Q 950 50 900 50 Z' fill='white'/%3E%3C/svg%3E")`, maskImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Cpath d='M 100 50 Q 50 50 50 100 Q 30 350 60 600 Q 60 650 110 650 L 890 650 Q 940 650 940 600 Q 970 350 950 100 Q 950 50 900 50 Z' fill='white'/%3E%3C/svg%3E")`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', filter: 'drop-shadow(0 20px 40px rgba(60,30,40,.25))' }}>
            <img src="/images/wa-talk-hero.jpg" alt="WAAI DIG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 'clamp(1rem, 2.8vw, 2.2rem)', pointerEvents: 'none' }}>
              {haiku.map((line, i) => <span key={i} style={{ writingMode: 'vertical-rl', fontSize: 'clamp(18px, 2.6vw, 28px)', fontWeight: 700, color: '#fff', letterSpacing: '.28em', textShadow: '0 2px 14px rgba(50,10,20,.55), 0 0 3px rgba(0,0,0,.35)' }}>{line}</span>)}
            </div>
          </div>
        </section>

        {/* Wa Wave */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 64px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 300, color: S.dark, letterSpacing: '.2em', fontFamily: S.serif, marginBottom: 24 }}>
            {ui('waveTitle')}
          </h2>
          <div ref={dmRef} style={{ height: 480, position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', WebkitMaskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)', maskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)' }} />
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 13, color: S.muted, fontFamily: S.sans, letterSpacing: '.04em', marginBottom: 8 }}>{ui('waveCount')}</p>
            <p style={{ fontSize: 13, color: S.accent, fontFamily: S.sans, letterSpacing: '.04em', fontWeight: 500 }}>{ui('waveHint')}</p>
          </div>
        </section>

        {/* ★★★ 記事一覧（ここを修正！） ★★★ */}
        <section id="articles" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 300, color: S.dark, letterSpacing: '.15em', fontFamily: S.serif, marginBottom: 48 }}>
            {ui('storiesTitle')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
            {articles.map(a => {
              const cc = CATEGORY_COLORS[a.category || 'culture'] || '#8A9A7B';
              return (
                <article key={a.id} style={{ cursor: 'pointer', transition: 'opacity 0.3s' }} onClick={() => click(a)} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.65'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', marginBottom: 16 }}>
                    {/* ★★★ 修正ポイント：a.image → a.coverImage ★★★ */}
                    {a.coverImage?.url ? (
                      <img 
                        src={a.coverImage.url} 
                        alt={getTitle(a, lang)} 
                        loading="lazy" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#f5f0e8' }} />
                    )}
                    <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 9, fontWeight: 600, padding: '5px 10px', background: 'rgba(255,255,255,0.9)', color: S.accent, fontFamily: S.sans, letterSpacing: '.12em', textTransform: 'uppercase' }}>{cat(a.category || 'culture')}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: S.muted, fontFamily: S.sans, letterSpacing: '.04em', marginBottom: 6 }}>{fmt(a.publishedAt)} · {mins(a.content)}{ui('readMin')}</p>
                    <h3 style={{ fontSize: 16, lineHeight: 1.5, color: S.dark, fontFamily: S.serif, fontWeight: 400, letterSpacing: '.01em' }}>{getTitle(a, lang)}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* フッター */}
        <footer style={{ width: '100%', padding: '80px 40px 50px 40px', background: 'transparent', textAlign: 'center', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontFamily: "'Bernou', 'Helvetica Neue', Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(77px, 13vw, 194px)', color: '#000', lineHeight: 1.2, whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>
            <span>WAAI</span>
            <span style={{ width: 'clamp(20px, 3vw, 50px)', flexShrink: 0 }}></span>
            <span>DIG</span>
            <span style={{ width: 'clamp(20px, 3vw, 50px)', flexShrink: 0 }}></span>
            <span>TRIP</span>
          </div>
          <div style={{ marginTop: 40, fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 'clamp(11px, 1vw, 16px)', color: '#888', letterSpacing: '0.5px' }}>
            <span>©2026 by InnBuddy</span>
          </div>
        </footer>
      </div>

      {/* 記事詳細 */}
      {sel && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#fff', overflowY: 'auto' }}>
          <button onClick={close} style={{ position: 'fixed', top: 20, left: 20, zIndex: 60, background: 'rgba(255,255,255,0.9)', border: 'none', padding: '10px 18px', fontSize: 12, cursor: 'pointer', fontFamily: S.sans, letterSpacing: '.04em', color: S.muted, backdropFilter: 'blur(8px)' }}>{ui('back')}</button>
          <div style={{ position: 'relative', height: '55vh', minHeight: 360, overflow: 'hidden' }}>
            {/* ★★★ 修正ポイント：sel.image → sel.coverImage ★★★ */}
            {sel.coverImage?.url ? (
              <img 
                src={sel.coverImage.url} 
                alt={getTitle(sel, lang)} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#f5f0e8' }} />
            )}
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px' }}>
            <h2 style={{ textAlign: 'left', fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.5, color: S.dark, fontFamily: S.serif, fontWeight: 300, letterSpacing: '.04em', marginBottom: 20 }}>{getTitle(sel, lang)}</h2>
            <div style={{ fontSize: 11, color: S.muted, fontFamily: S.sans, display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
              <span>{fmt(sel.publishedAt)}</span><span>{mins(sel.content)}{ui('readMin')}</span>
              {sel.author && <span>{sel.author}</span>}
            </div>
            <div style={{ width: 36, height: 1, background: S.accent, marginBottom: 32 }} />
            <div className="prose" style={{ lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: getBody(sel, lang) }} />
          </div>
        </div>
      )}
    </>
  );
}
