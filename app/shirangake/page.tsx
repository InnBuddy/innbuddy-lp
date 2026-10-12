"use client";

import Script from "next/script";
import dialects from "@/data/dialects.json";

// ==========================================
// 1. CSSデザイン（デザインを完全に再現）
// ==========================================
const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap');

#shirangake-root {
  --paper:#ffffff; --paper-deep:#fbf6e8; --ink:#171717; --ink-soft:rgba(23,23,23,.55);
  --ink-faint:rgba(23,23,23,.35); --line:rgba(23,23,23,.12); --accent:#f0b429; --accent-ink:#7a5b06;
  --sans:'Inter',sans-serif; --serif:'Fraunces',serif;
  background:var(--paper); color:var(--ink); font-family:var(--sans);
}
#shirangake-root * { box-sizing:border-box; }
#shirangake-root .wrap { max-width:1160px; margin:0 auto; padding:0 24px; }
#shirangake-root .banner { background:var(--accent); color:var(--ink); font-size:11px; letter-spacing:.04em; padding:9px 24px; text-align:center; line-height:1.5; font-weight:600; }
#shirangake-root header { position:sticky; top:0; z-index:20; background:rgba(247,244,239,.9); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); }
#shirangake-root .nav { display:flex; align-items:center; justify-content:space-between; padding:18px 0; }
#shirangake-root .brand { font-family:var(--serif); font-size:19px; font-weight:600; letter-spacing:.06em; display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; }
#shirangake-root .brand-sub { font-family:var(--sans,inherit); font-size:11px; font-weight:400; letter-spacing:.04em; color:var(--ink-faint); }
#shirangake-root .nav a { color:var(--ink-soft); text-decoration:none; font-size:13px; margin-left:26px; }
#shirangake-root .nav a:hover { color:var(--ink); }

#shirangake-root .hero { padding:76px 0 56px; }
#shirangake-root .hero p.eyebrow { margin:0 0 18px; font-size:13px; color:var(--ink-soft); display:flex; gap:10px; align-items:center; }
#shirangake-root .eyebrow .rule { width:28px; height:1px; background:var(--ink-faint); }
#shirangake-root .hero h1 { font-family:var(--serif); font-weight:400; font-size:min(4.6rem,calc((100vw - 48px) / 11.4)); line-height:1.12; margin:0 0 22px; white-space:nowrap; }
#shirangake-root .hero h1 em { font-style:italic; color:var(--accent); }
#shirangake-root .hero p.lead { max-width:480px; font-size:16px; line-height:1.6; color:var(--ink-soft); margin:0; }

#shirangake-root section { padding:64px 0; }
#shirangake-root .section-head { display:flex; justify-content:space-between; align-items:flex-end; gap:20px; margin-bottom:34px; flex-wrap:wrap; }
#shirangake-root .section-head h2 { font-family:var(--serif); font-weight:400; font-size:clamp(1.8rem,3.6vw,2.6rem); margin:0; }
#shirangake-root .section-head p { max-width:320px; font-size:14px; line-height:1.55; color:var(--ink-soft); margin:0; }

/* map */
#shirangake-root .map-area { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; }
@media (max-width:860px){ #shirangake-root .map-area{ grid-template-columns:1fr; } }
#shirangake-root .map-svg { width:100%; height:auto; }
#shirangake-root .map-svg path { cursor:pointer; transition:opacity .15s; }
#shirangake-root .map-svg path:hover { opacity:.75; }
#shirangake-root .region-panel .tag { display:inline-block; font-size:11px; color:var(--ink-soft); border:1px solid var(--line); border-radius:999px; padding:4px 12px; margin-bottom:16px; }
#shirangake-root .region-panel h3 { font-family:var(--serif); font-weight:400; font-size:2.6rem; margin:0 0 8px; }
#shirangake-root .region-panel p.note { color:var(--ink-soft); font-size:14px; line-height:1.6; max-width:340px; margin:0 0 22px; }
#shirangake-root .chip-row { display:flex; flex-wrap:wrap; gap:8px; }
#shirangake-root .chip { border:1px solid var(--line); background:transparent; border-radius:999px; padding:8px 14px; font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; font-family:var(--sans); color:var(--ink); }
#shirangake-root .chip.active { background:var(--ink); color:var(--paper); border-color:var(--ink); }

/* dialect detail */
#shirangake-root #dialect .head-row { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; flex-wrap:wrap; }
#shirangake-root #dialect h2.word { font-size:clamp(3rem,9vw,6.4rem); font-weight:800; letter-spacing:-.03em; text-transform:uppercase; line-height:.85; margin:14px 0 0; }
#shirangake-root #dialect .jp { font-family:var(--serif); font-style:italic; font-size:1.8rem; margin:0 0 6px; }
#shirangake-root #dialect .en { max-width:280px; font-size:14px; color:var(--ink-soft); line-height:1.5; margin:0; }
#shirangake-root .cols { display:grid; grid-template-columns:1fr 1fr; gap:56px; margin-top:52px; }
@media (max-width:860px){ #shirangake-root .cols{ grid-template-columns:1fr; } }
#shirangake-root .col-title { display:flex; justify-content:space-between; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); border-bottom:1px solid var(--line); padding-bottom:10px; }
#shirangake-root .phrase-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; padding:16px 0; border-bottom:1px solid var(--line); align-items:baseline; }
#shirangake-root .phrase-row .tb { font-size:13px; color:var(--ink-faint); text-decoration:line-through; }
#shirangake-root .phrase-row .rl { font-family:var(--serif); font-style:italic; font-size:1.3rem; text-align:right; }
#shirangake-root .lex-row { display:flex; justify-content:space-between; gap:12px; padding:10px 0; border-bottom:1px solid var(--line); }
#shirangake-root .lex-row .w { font-weight:800; font-size:1rem; }
#shirangake-root .lex-row .m { font-size:12px; color:var(--ink-soft); text-align:right; }
#shirangake-root .lex-grid { display:grid; grid-template-columns:1fr 1fr; gap:0 24px; }
@media (max-width:520px){ #shirangake-root .lex-grid{ grid-template-columns:1fr; } }

#shirangake-root .lex-expand { margin-top:56px; padding-top:30px; border-top:1px solid var(--line); }
#shirangake-root .lex-expand-head { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; }
#shirangake-root .lex-expand-head p { font-size:13px; color:var(--ink-soft); margin:0; max-width:420px; line-height:1.55; }
#shirangake-root .lex-toggle { flex:0 0 auto; border:1px solid var(--ink); border-radius:999px; background:var(--ink); color:var(--paper); padding:12px 22px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; cursor:pointer; font-family:var(--sans); white-space:nowrap; }
#shirangake-root .lex-toggle .n { opacity:.6; font-weight:600; margin-left:4px; }
#shirangake-root .lex-full { display:none; margin-top:26px; columns:3 220px; column-gap:28px; }
#shirangake-root .lex-full.show { display:block; }
#shirangake-root .lex-full .item { break-inside:avoid; display:block; padding:12px 0; border-bottom:1px solid var(--line); font-size:13px; }
#shirangake-root .lex-full .item .row { display:flex; justify-content:space-between; gap:14px; }
#shirangake-root .lex-full .item .w { font-weight:700; }
#shirangake-root .lex-full .item .m { color:var(--ink-soft); text-align:right; }
#shirangake-root .lex-full .item .ex { margin:6px 0 0; font-size:11.5px; color:var(--ink-faint); line-height:1.5; font-style:italic; }

#shirangake-root .phrase-sets { display:grid; grid-template-columns:1fr 1fr; gap:56px; margin-top:56px; padding-top:30px; border-top:1px solid var(--line); }
@media (max-width:860px){ #shirangake-root .phrase-sets{ grid-template-columns:1fr; } }
#shirangake-root .phrase-set-head { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
#shirangake-root .phrase-set-head .emoji { font-size:16px; }
#shirangake-root .phrase-item { padding:13px 0; border-bottom:1px solid var(--line); }
#shirangake-root .phrase-item .ph { font-weight:700; font-size:14px; line-height:1.4; }
#shirangake-root .phrase-item .mn { font-size:12px; color:var(--ink-soft); margin-top:4px; line-height:1.5; }

/* regions carousel */
#shirangake-root #regions { background:var(--paper-deep); border-top:1px solid var(--line); overflow:hidden; }
#shirangake-root .carousel { position:relative; padding:12px 0 8px; }
#shirangake-root .car-track { display:flex; gap:22px; will-change:transform; }
#shirangake-root .region-card { flex:0 0 auto; width:210px; cursor:pointer; padding:30px 22px 22px; text-align:center; background:var(--paper); border:1px solid var(--line); border-top:3px solid var(--card-accent,var(--accent)); border-radius:120px 120px 14px 14px; transition:transform .35s,opacity .35s,box-shadow .35s; }
#shirangake-root .region-card svg { width:46px; height:46px; stroke:var(--card-accent,var(--accent)); fill:none; stroke-width:1.4; margin-bottom:18px; }
#shirangake-root .region-card h3 { font-family:var(--serif); font-weight:400; font-size:1.5rem; margin:0 0 4px; letter-spacing:-.01em; }
#shirangake-root .region-card p { font-size:11px; color:var(--ink-soft); margin:0; }
#shirangake-root .region-card.is-center { transform:scale(1.08); box-shadow:0 18px 40px rgba(23,23,23,.1); }
#shirangake-root .region-card.is-far { opacity:.45; }
#shirangake-root .car-arrow { position:absolute; top:50%; translate:0 -50%; z-index:2; width:40px; height:40px; border-radius:50%; border:1px solid var(--line); background:var(--paper); cursor:pointer; font-size:16px; color:var(--ink); }
#shirangake-root .car-arrow.left { left:-4px; } #shirangake-root .car-arrow.right { right:-4px; }
@media (max-width:640px){ #shirangake-root .car-arrow{ display:none; } }
#shirangake-root .car-dots { display:flex; justify-content:center; gap:7px; margin-top:26px; }
#shirangake-root .car-dots button { width:6px; height:6px; border-radius:50%; border:none; background:var(--line); cursor:pointer; padding:0; }
#shirangake-root .car-dots button.active { background:var(--accent); width:18px; border-radius:4px; transition:width .2s; }
#shirangake-root .region-drawer { max-width:560px; margin:36px auto 0; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:28px 30px; opacity:0; max-height:0; overflow:hidden; transition:opacity .3s,max-height .4s; }
#shirangake-root .region-drawer.show { opacity:1; max-height:400px; }
#shirangake-root .region-drawer .tag { font-size:10px; font-weight:700; letter-spacing:.12em; color:var(--ink-faint); text-transform:uppercase; }
#shirangake-root .region-drawer h4 { font-family:var(--serif); font-weight:400; font-size:1.9rem; margin:8px 0 4px; }
#shirangake-root .region-drawer p.note { font-size:13px; color:var(--ink-soft); margin:0 0 18px; max-width:420px; }
#shirangake-root .region-drawer .chip-row { display:flex; flex-wrap:wrap; gap:8px; }
`;

// ==========================================
// 2. HTML構造
// ==========================================
const BODY_MARKUP: string = "<div class=\"banner\">\u30c7\u30b6\u30a4\u30f3\u30d7\u30ec\u30d3\u30e5\u30fc \u00b7 \u5b9f\u30c7\u30fc\u30bf20\u65b9\u8a00\uff08\u5168\u56fd\u304b\u3089\u53b3\u9078\uff09\u3092\u4f7f\u7528\uff08\u672c\u756a\u306f Next.js / page.tsx \u3067\u52d5\u4f5c\uff09</div>\n\n<header><div class=\"wrap nav\">\n  <div class=\"brand\">SHIRANGAKE<span class=\"brand-sub\">Untranslatable Dialects</span></div>\n  <nav>\n    <a href=\"#map\">\u5730\u56f3</a><a href=\"#dialect\">\u65b9\u8a00</a><a href=\"#adventure\">\u5192\u967a</a>\n  </nav>\n</div></header>\n\n<section class=\"hero\"><div class=\"wrap\">\n  <p class=\"eyebrow\"><span class=\"rule\"></span>REAL vs TEXT BOOK</p>\n  <h1>\u6559\u79d1\u66f8\u306b\u306f\u8f09\u3089\u306a\u3044\u3001<br>\u672c\u5f53\u306e<em>\u65e5\u672c\u8a9e</em>\u3092\u96c6\u3081\u308b\u3002</h1>\n  <p class=\"lead\">\u65e5\u672c\u5404\u5730\u306e\u65b9\u8a00\u306b\u7720\u308b\u3001\u7ffb\u8a33\u3067\u304d\u306a\u3044\u8a00\u8449\u3068\u8a00\u3044\u56de\u3057\u3002\u5730\u56f3\u304b\u3089\u3001\u3042\u308b\u3044\u306f\u5730\u7403\u5100\u304b\u3089\u3001\u305d\u306e\u571f\u5730\u306e\u58f0\u306b\u51fa\u4f1a\u3048\u307e\u3059\u3002</p>\n</div></section>\n\n<section id=\"map\"><div class=\"wrap\">\n  <div class=\"section-head\">\n    <h2>\u5730\u56f3\u304b\u3089\u9078\u3076</h2>\n    <p>\u5730\u57df\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u3001\u305d\u306e\u571f\u5730\u306e\u65b9\u8a00\u304c\u4e26\u3073\u307e\u3059\u3002</p>\n  </div>\n  <div class=\"map-area\">\n    <svg class=\"map-svg\" viewBox=\"0 0 360 400\" xmlns=\"http://www.w3.org/2000/svg\">\n      <g id=\"mapPaths\"></g>\n    </svg>\n    <div class=\"region-panel\">\n      <span class=\"tag\" id=\"regionTag\">HOKKAIDO</span>\n      <h3 id=\"regionName\">The Frontier</h3>\n      <p class=\"note\" id=\"regionNote\"></p>\n      <div class=\"chip-row\" id=\"dialectChips\"></div>\n    </div>\n  </div>\n</div></section>\n\n<section id=\"dialect\"><div class=\"wrap\">\n  <div class=\"head-row\">\n    <div>\n      <p class=\"eyebrow\"><span class=\"rule\"></span><span id=\"dCtx\">HOKKAIDO \u00b7 hokkaido-ben</span></p>\n      <h2 class=\"word\" id=\"dWord\">NAMARA</h2>\n    </div>\n    <div style=\"text-align:right\">\n      <p class=\"jp\" id=\"dJp\">\u306a\u307e\u3089</p>\n      <p class=\"en\" id=\"dEn\"></p>\n    </div>\n  </div>\n  <div class=\"cols\">\n    <div>\n      <div class=\"col-title\"><span>\u6559\u79d1\u66f8\u306e\u8a00\u3044\u65b9 \u00b7 TEXT BOOK</span><span>REAL \u00b7 \u5b9f\u969b\u306e\u8a00\u3044\u65b9</span></div>\n      <div id=\"dPhrases\"></div>\n    </div>\n    <div>\n      <div class=\"col-title\"><span>\u65b9\u8a00\u306e\u8a9e\u5f59</span><span></span></div>\n      <div class=\"lex-grid\" id=\"dLexicon\"></div>\n    </div>\n  </div>\n  <div class=\"lex-expand\">\n    <div class=\"lex-expand-head\">\n      <p>\u3053\u3053\u306b\u8f09\u305b\u3066\u3044\u308b\u306e\u306f\u4ee3\u8868\u7684\u306a\u8a9e\u3060\u3051\u3067\u3059\u3002\u5b9f\u969b\u306b\u66ae\u3089\u3059\u4e2d\u3067\u4f7f\u308f\u308c\u308b\u8a00\u8449\u306f\u3001\u3082\u3063\u3068\u305f\u304f\u3055\u3093\u3042\u308a\u307e\u3059\u3002</p>\n      <button class=\"lex-toggle\" id=\"lexToggle\"><span id=\"lexToggleLabel\">\u3053\u306e\u65b9\u8a00\u306e\u5358\u8a9e\u3092\u3082\u3063\u3068\u898b\u308b</span><span class=\"n\" id=\"lexCount\"></span></button>\n    </div>\n    <div class=\"lex-full\" id=\"lexFull\"></div>\n  </div>\n  <div class=\"phrase-sets\">\n    <div>\n      <div class=\"col-title\"><span class=\"phrase-set-head\"><span class=\"emoji\">\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1</span>\u53cb\u9054\u3068\u4f7f\u3048\u308b\u65b9\u8a00\u30d5\u30ec\u30fc\u30ba</span><span></span></div>\n      <div id=\"dFriendPhrases\"></div>\n    </div>\n    <div>\n      <div class=\"col-title\"><span class=\"phrase-set-head\"><span class=\"emoji\">\ud83d\udcbc</span>\u8077\u5834\u3067\u4f7f\u3048\u308b\u65b9\u8a00\u30d5\u30ec\u30fc\u30ba</span><span></span></div>\n      <div id=\"dWorkPhrases\"></div>\n    </div>\n  </div>\n</div></section>\n\n<section id=\"regions\"><div class=\"wrap\">\n  <div class=\"section-head\">\n    <div>\n      <p class=\"eyebrow\"><span class=\"rule\"></span>NINE REGIONS</p>\n      <h2>\u571f\u5730\u3092<em style=\"font-style:italic;color:var(--accent)\">\u3081\u3050\u308b\u3002</em></h2>\n    </div>\n  </div>\n  <div class=\"carousel\" id=\"carousel\">\n    <button class=\"car-arrow left\" id=\"carPrev\" aria-label=\"\u524d\u3078\">\u2039</button>\n    <div style=\"overflow:hidden\">\n      <div class=\"car-track\" id=\"carTrack\"></div>\n    </div>\n    <button class=\"car-arrow right\" id=\"carNext\" aria-label=\"\u6b21\u3078\">\u203a</button>\n  </div>\n  <div class=\"car-dots\" id=\"carDots\"></div>\n  <div class=\"region-drawer\" id=\"regionDrawer\"></div>\n</div></section>";

// ==========================================
// 3. ページの本体（表示部分）
// ==========================================
export default function Page() {
  return (
    <>
      {/* 
        デザインが親LPに漏れ出さないように、
        全体を <div id="shirangake-root"> で囲んでいます 
      */}
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div id="shirangake-root" dangerouslySetInnerHTML={{ __html: BODY_MARKUP }} />
      
      {/* 動かすためのデータを読み込み */}
      <script
        id="data"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dialects).replace(/</g, "\\u003c"),
        }}
      />
      
      {/* 
        ★ JavaScriptファイル (site-script.js) が
        publicフォルダに入っている前提です 
      */}
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}