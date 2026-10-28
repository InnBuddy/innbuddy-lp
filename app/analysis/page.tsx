'use client';
import React, { useEffect, useRef, useState } from 'react';
import './analysis.css';

export default function AnalysisPage() {
  const [scrolled, setScrolled] = useState(false);
  const [annOpen, setAnnOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  
  const progRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. スクロール時のヘッダー制御とプログレスバー
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (progRef.current) {
        const h = document.documentElement;
        progRef.current.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // 2. ヒーローのアニメーション発火
    if (heroRef.current) {
      heroRef.current.classList.remove('run');
      void heroRef.current.offsetWidth;
      requestAnimationFrame(() => heroRef.current?.classList.add('run'));
    }

    // 3. .rv 要素のスクロールフェードイン
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('#innbuddy-scope .rv').forEach(el => observer.observe(el));

    // 4. 書架の横スクロールドラッグ対応
    const bs = shelfRef.current;
    let down = false, sx = 0, sl = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      down = true; sx = e.clientX; sl = bs!.scrollLeft; bs!.classList.add('dragging');
    };
    const onMove = (e: PointerEvent) => { if (down) bs!.scrollLeft = sl - (e.clientX - sx); };
    const onUp = () => { down = false; bs?.classList.remove('dragging'); };
    
    if (bs) {
      bs.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      if (bs) {
        bs.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      }
    };
  }, []);

  return (
    // ここでスコープIDを指定
    <div id="innbuddy-scope">
      
      <div id="progress" ref={progRef}></div>

      {annOpen && (
        <div id="announce">
          <div className="wrap">
            <span>2026.08.19 — 『上半期 国内宿泊産業 稼働率レポート』を公開。会員登録で無料ダウンロード</span>
            <a href="#reports">レポートを見る</a>
            <button id="ann-close" aria-label="close" onClick={() => setAnnOpen(false)}>×</button>
          </div>
        </div>
      )}

      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <a className="brand" href="#top" aria-label="InnBuddy">
            <span className="b-serif">Inn</span><span className="b-sans">Buddy</span><span className="b-dot">.</span>
            <small>MARKET INTELLIGENCE</small>
          </a>
          <nav className="gnav" aria-label="Global">
            <a href="#reports"><i>01</i>レポート</a>
            <a href="#series"><i>02</i>ESG書架</a>
            <a href="#data"><i>03</i>業界データ</a>
            <a href="#about"><i>04</i>私たちについて</a>
          </nav>
          <div className="h-actions">
            <div className="lang-sw h-lang" role="group" aria-label="Language">
              <button className="on">日本語</button>
              <button>EN</button>
              <button>中文</button>
            </div>
            <a className="btn" href="#newsletter">無料で会員登録</a>
            <button 
              id="mbtn" 
              className={menuOpen ? 'active' : ''} 
              aria-label="menu" 
              aria-expanded={menuOpen} 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <nav id="mnav" className={menuOpen ? 'open' : ''} aria-label="Mobile" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setMenuOpen(false); }}>
        <a href="#reports">レポート<i>01</i></a>
        <a href="#series">ESG書架<i>02</i></a>
        <a href="#data">業界データ<i>03</i></a>
        <a href="#about">私たちについて<i>04</i></a>
        <a href="#newsletter">無料で会員登録<i>→</i></a>
        <div className="lang-row">
          <div className="lang-sw m-lang" role="group" aria-label="Language">
            <button className="on">日本語</button>
            <button>EN</button>
            <button>中文</button>
          </div>
        </div>
        <p className="mnav-foot">INNBUDDY — MARKET INTELLIGENCE</p>
      </nav>

      <main>
        {/* top / hero */}
        <section id="top" aria-label="InnBuddy">
          <div className="hero-scrim" aria-hidden="true"></div>
          
          <div className="stories-overlay">
            <div className="stories-inner">
              <div className="st-head">
                <span className="label">Stories</span>
                <p>業界トピックスを3分で。<br/>タップして視聴</p>
              </div>
              {['稼働率速報', 'インバウンド', '価格戦略', 'リゾート最前線', 'DX事例', 'データの読み方'].map((label, i) => (
                <button key={i} className="story" aria-label={label} onClick={() => setViewerOpen(true)}>
                  <span className="story-ring">
                    {/* ダミーの丸 */}
                    <div style={{width:'100%', height:'100%', borderRadius:'50%', border:'2.5px solid var(--paper)', background:'var(--paper-2)'}} />
                    <span className="new-dot"></span>
                  </span>
                  <span className="story-label">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <h1 className="focus-copy" id="focusCopy" ref={heroRef}>
            <span className="fl">輪郭のない市場のざわめきに、</span>
            <span className="fl">データでピントを合わせる。</span>
          </h1>
          <div className="scroll-hint" aria-hidden="true"><i></i><b></b></div>
        </section>

        {/* marquee */}
        <section id="ticker" aria-label="latest">
          <div className="wrap ticker-head">
            <span className="label">Latest Reports — 新着順</span>
            <a className="arrow-link" href="#reports">すべてみる <i>→</i></a>
          </div>
          <div className="mq-viewport">
            <div className="mq-track" id="mqTrack">
              <a className="mq-card mq-p" href="#reports">
                <figure><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></figure>
                <div className="mq-cap"><span className="no">No.042</span><span className="t">リゾート・温泉地の季節変動インデックス</span></div>
              </a>
              <a className="mq-card mq-l" href="#reports">
                <figure><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></figure>
                <div className="mq-cap"><span className="no">No.041</span><span className="t">温泉地の再生戦略</span></div>
              </a>
              <a className="mq-card mq-s" href="#reports">
                <figure><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></figure>
                <div className="mq-cap"><span className="no">No.040</span><span className="t">客室改修 ROI シミュレーション</span></div>
              </a>
            </div>
          </div>
        </section>

        {/* reports */}
        <section className="block" id="reports">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="sec-eyebrow">
                  <span className="no">(01)</span>
                  <span className="lb">Latest Reports</span><span className="ln"></span>
                </div>
                <h2>最新の市場分析レポート</h2>
                <p className="sec-lead">需要・価格・地域・DX。経営意思決定に必要な切り口で、一次データを編集して公開しています。</p>
              </div>
              <div className="sec-link"><a className="arrow-link" href="#newsletter">新着通知を受け取る <i>→</i></a></div>
            </div>

            <div className="mrow r1">
              <a className="card card--bare rv" href="#newsletter">
                <div className="frame f-43"><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></div>
                <div className="cap">
                  <div className="cap-top">
                    <span className="cap-no">No.042</span>
                    <span className="cap-cat">需要 / リゾート</span>
                    <span className="pill member">会員限定</span>
                  </div>
                  <h3>リゾート・温泉地の季節変動インデックス 2026 — 平年比で読む「攻め」の四季</h3>
                  <p className="desc">42の温泉地・リゾートエリアについて、月次の需給バランスをインデックス化。閑散期の需要創出に成功した施設の共通要件を抽出した。</p>
                  <div className="cap-meta">2026.08.19 ・ 34 ページ ・ PDF / Excel 付録</div>
                </div>
              </a>
              <a className="card rv" href="#newsletter" style={{ transitionDelay: '.12s' }}>
                <div className="frame f-34"><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></div>
                <div className="cap">
                  <div className="cap-top">
                    <span className="cap-no">No.041</span>
                    <span className="cap-cat">地域戦略</span>
                  </div>
                  <h3>温泉地の再生戦略 — 滞在時間を伸ばす施設構成と回遊動線</h3>
                  <div className="cap-meta">2026.08.05 ・ 22 ページ</div>
                </div>
              </a>
            </div>

            <div className="mrow r2">
              <a className="card rv" href="#newsletter">
                <div className="frame f-11"><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></div>
                <div className="cap">
                  <div className="cap-top">
                    <span className="cap-no">No.040</span>
                    <span className="cap-cat">設備投資</span>
                    <span className="pill free">無料</span>
                  </div>
                  <h3>客室改修 ROI シミュレーション — 単価改善の感度分析</h3>
                  <div className="cap-meta">2026.07.22 ・ 18 ページ</div>
                </div>
              </a>
              <a className="card rv" href="#newsletter" style={{ transitionDelay: '.1s' }}>
                <div className="frame f-11"><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></div>
                <div className="cap">
                  <div className="cap-top">
                    <span className="cap-no">No.039</span>
                    <span className="cap-cat">価格 / 都市</span>
                    <span className="pill member">会員限定</span>
                  </div>
                  <h3>都市ホテルの ADR 上限と需要弾力性</h3>
                  <div className="cap-meta">2026.07.08 ・ 26 ページ</div>
                </div>
              </a>
              <a className="card rv" href="#newsletter" style={{ transitionDelay: '.2s' }}>
                <div className="frame f-11"><div style={{width:'100%',height:'100%',background:'var(--line)'}} /></div>
                <div className="cap">
                  <div className="cap-top">
                    <span className="cap-no">No.038</span>
                    <span className="cap-cat">CX / 料飲</span>
                  </div>
                  <h3>朝食体験はレビュー評価をどこまで動かすか</h3>
                  <div className="cap-meta">2026.06.24 ・ 16 ページ</div>
                </div>
              </a>
            </div>

            <div className="archive-cta rv">
              <a className="btn ghost" href="#newsletter">レポートアーカイブをみる(全 42 本)→</a>
            </div>
          </div>
        </section>

        {/* band */}
        <section className="band" aria-label="editorial policy">
          <div className="band-copy rv">
            <p className="band-en">Data, edited for decisions.</p>
            <p className="band-jp">数字は、編集されてはじめて意思決定になる。</p>
            <p className="band-note">InnBuddy Editorial Policy</p>
          </div>
        </section>

        {/* bookshelf */}
        <section className="block" id="series">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="sec-eyebrow">
                  <span className="no">(02)</span>
                  <span className="lb">Bookshelf</span><span className="ln"></span>
                </div>
                <h2>ESG市場レポート 収蔵シリーズ</h2>
                <p className="sec-lead">国と文化圏ごとに製本した ESG 市場レポート9篇。背表紙を選んで、お書架からお取りください。</p>
              </div>
              <div className="sec-link"><a className="arrow-link" href="#newsletter">全タイトル一覧 <i>→</i></a></div>
            </div>
            
            <div className="bookshelf rv" id="bookshelf" ref={shelfRef}>
              <div className="shelf-row">
                <a className="book" href="#newsletter" style={{'--bc': '#1F3A2C', '--bh': '300px', '--bw': '64px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG ベトナム</span><span className="b-year">2026</span></span>
                </a>
                <a className="book" href="#newsletter" style={{'--bc': '#B4552D', '--bh': '320px', '--bw': '60px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG タイランド</span><span className="b-year">2026</span></span>
                </a>
                <a className="book light" href="#newsletter" style={{'--bc': '#E7DFC8', '--bh': '290px', '--bw': '70px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG マレーシア</span><span className="b-year">2026</span></span>
                </a>
                <a className="book" href="#newsletter" style={{'--bc': '#26221B', '--bh': '308px', '--bw': '58px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG インドネシア</span><span className="b-year">2026</span></span>
                </a>
                <a className="book" href="#newsletter" style={{'--bc': '#A9852F', '--bh': '328px', '--bw': '76px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG 中国＆韓国</span><span className="b-year">2026</span></span>
                </a>
                <a className="book" href="#newsletter" style={{'--bc': '#274A40', '--bh': '298px', '--bw': '62px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG イスラム</span><span className="b-year">2026</span></span>
                </a>
                <a className="book" href="#newsletter" style={{'--bc': '#8A4A2B', '--bh': '322px', '--bw': '60px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG 仏教</span><span className="b-year">2026</span></span>
                </a>
                <a className="book lean" href="#newsletter" style={{'--bc': '#8C8577', '--bh': '278px', '--bw': '56px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG 無宗教</span><span className="b-year">2026</span></span>
                </a>
                <a className="book" href="#newsletter" style={{'--bc': '#2E4B33', '--bh': '306px', '--bw': '68px'} as React.CSSProperties}>
                  <span className="b-spine"><span className="b-title">ESG クリスチャン</span><span className="b-year">2026</span></span>
                </a>
              </div>
              <div className="board"></div>
            </div>
            <p className="shelf-note">※ 書影は装丁イメージです。各タイトルは PDF / 製本版でご提供します。</p>
          </div>
        </section>

        {/* data */}
        <section className="block" id="data">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="sec-eyebrow">
                  <span className="no" style={{color: '#E8B98A'}}>(03)</span>
                  <span className="lb">Industry Snapshot</span><span className="ln"></span>
                </div>
                <h2>業界スナップショット 2026.08</h2>
                <p className="sec-lead">毎月更新の主要指標。会員は地域別・業態別のクロス集計までダウンロードできます。</p>
              </div>
              <div className="sec-link"><a className="arrow-link" href="#databook">データブックを入手 <i>→</i></a></div>
            </div>
            
            <div className="stat-grid">
              <div className="stat rv">
                <p className="v"><span>78.4</span><span className="suf">%</span></p>
                <p className="k">全国平均稼働率</p>
                <p className="d">全国・宿泊業態計。8月速報値(暫定)。</p>
                <span className="delta">前年比 +5.2pt</span>
              </div>
              <div className="stat rv" style={{ transitionDelay: '.1s' }}>
                <p className="v"><span className="pre">¥</span><span>21,350</span></p>
                <p className="k">全国 ADR(平均客室単価)</p>
                <p className="d">デイユース換算。都市部が平均を押し上げ。</p>
                <span className="delta">前年比 +8.1%</span>
              </div>
              <div className="stat rv" style={{ transitionDelay: '.2s' }}>
                <p className="v"><span>96.2</span><span className="suf">%</span></p>
                <p className="k">訪日客数 回復率</p>
                <p className="d">対 2019 年比。東南アジア市場が牽引。</p>
                <span className="delta">単価は 2019 比 +32%</span>
              </div>
              <div className="stat rv" style={{ transitionDelay: '.3s' }}>
                <p className="v"><span>42.7</span><span className="suf">%</span></p>
                <p className="k">宿泊 DX 導入率</p>
                <p className="d">3 施設以上運営の中堅・大手が対象。</p>
                <span className="delta">前年比 +9.8pt</span>
              </div>
            </div>
            <p className="data-note">※ 数値は毎月更新。出典・調査概要の詳細は、各レポート巻末の付録および DATA BOOK をご参照ください。</p>
          </div>
        </section>

        {/* data book */}
        <section id="databook">
          <div className="db-visual rv">
             <div className="db-main" style={{background:'var(--line)'}}></div>
             <div className="db-float" style={{background:'var(--paper)'}}></div>
          </div>
          <div className="db-copy rv" style={{ transitionDelay: '.12s' }}>
            <div className="sec-eyebrow">
              <span className="no">(04)</span><span className="lb">Print Edition</span><span className="ln"></span>
            </div>
            <h2 className="db-h2">印刷版『DATA BOOK 2026』を<br />年間購読でお届けします</h2>
            <p className="db-lead">四半期ごとに製本してお届けする年間プログラム。会議室に置ける「業界の基準書」として、大判チャートと 42 エリアの業界地図を収録しています。</p>
            <ul className="db-list">
              <li><span className="k">刊行</span><span>年 4 冊(1月・4月・7月・10月)/ A4 変形・112〜140 ページ</span></li>
              <li><span className="k">収録</span><span>季節変動インデックス、業界地図、大判グラフ集、四半期総括</span></li>
              <li><span className="k">付録</span><span>Excel 原稿データ付き — 社内分析にそのまま利用できます</span></li>
              <li><span className="k">ライセンス</span><span>法人ライセンス込み・社内共有可能</span></li>
            </ul>
            <p className="db-price"><span className="serif-i">¥48,000</span><small>年間(税込)/ 1冊のみ ¥15,000</small></p>
            <div className="db-ctas">
              <a className="btn terra" href="#newsletter">資料を請求する →</a>
              <a className="btn ghost" href="#reports">第1冊の要約をみる</a>
            </div>
          </div>
        </section>

        {/* about */}
        <section className="block" id="about">
          <div className="wrap about-grid">
            <div className="about-left rv">
              <div className="sec-eyebrow">
                <span className="no">(05)</span><span className="lb">About InnBuddy</span><span className="ln"></span>
              </div>
              <h2>宿泊産業の意思決定に、<br />編集されたデータを。</h2>
            </div>
            <div className="about-right">
              <p className="lead rv">InnBuddy は、宿泊・観光産業の経営者と実務者のための<em>B2Bリサーチメディア</em>です。数値を並べるだけではなく、意味まで編集してお届けします。</p>
              <p className="body rv">宿泊市場は、観光政策・為替・天候・消費トレンドが複雑に絡み合う重要産業です。一方で、意思決定に使える「きれいに編集された業界データ」は依然として少ないのが現状です。私たちは官公庁の公開統計と 4,200 社規模の独自調査網を掛け合わせ、現場で使える形に分析・編集して毎月お届けしています。</p>
              <p className="body rv">すべてのレポートは「要旨→データ→解釈→実務への示唆」の4層構造。経営層は要旨だけで判断でき、実務層は付録データをそのまま企画書に使えます。</p>
              <ul className="trust rv">
                <li><span className="t-k">調査体制</span><span className="t-v">業界パネル <b>4,200 施設</b>・月次アンケートと、専任リサーチャーによる聞き取り調査。</span></li>
                <li><span className="t-k">編集基準</span><span className="t-v">一次データのみ使用。<b>出典と調査概要を全編に明記</b>し、推計は推計と明示します。</span></li>
                <li><span className="t-k">データソース</span><span className="t-v">官公庁統計・宿泊旅行統計調査・OTA 公開データ・<b>独自パネル調査</b>のハイブリッド。</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* newsletter */}
        <section className="block" id="newsletter" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="nl-box rv">
              <div className="nl-copy">
                <span className="label">Monthly Newsletter</span>
                <h2>毎月第1火曜、業界の「いま」を<br />あなたの inbox へ。</h2>
                <p>新着レポート・主要指標の速報・編集部の読みどころをまとめてお届けします。</p>
              </div>
              <form id="nlForm" noValidate onSubmit={(e) => e.preventDefault()}>
                <input id="nlMail" type="email" placeholder="business@company.co.jp" required aria-label="email" />
                <button className="btn terra" type="submit">無料で購読する →</button>
                <small>登録でレポート No.036(宿泊DX調査)の要約版を進呈します。いつでも解除できます。</small>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="top">
            <div>
              <a className="brand" href="#top"><span className="b-serif">Inn</span><span className="b-sans">Buddy</span><span className="b-dot">.</span></a>
              <p className="f-desc">宿泊・観光産業のための B2B マーケット分析レポートメディア。需要・価格・DX・地域戦略を一次データで編集し、意思決定の質を高めることを目的としています。</p>
            </div>
            <div>
              <h4>コンテンツ</h4>
              <ul>
                <li><a href="#reports">市場分析レポート</a></li>
                <li><a href="#series">ESG書架</a></li>
                <li><a href="#data">業界データ</a></li>
                <li><a href="#databook">DATA BOOK</a></li>
              </ul>
            </div>
            <div>
              <h4>InnBuddy</h4>
              <ul>
                <li><a href="#about">私たちについて</a></li>
                <li><a href="#newsletter">ニュースレーター</a></li>
                <li><a href="#about">調査体制</a></li>
                <li><a href="#about">編集基準</a></li>
              </ul>
            </div>
            <div>
              <h4>サポート</h4>
              <ul>
                <li><a href="#newsletter">お問い合わせ</a></li>
                <li><a href="#newsletter">法人導入のご案内</a></li>
                <li><a href="#newsletter">プライバシーポリシー</a></li>
                <li><a href="#newsletter">利用規約</a></li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <span>© 2026 InnBuddy Inc. — All rights reserved.</span>
            <span>Market Intelligence — Tokyo</span>
          </div>
        </div>
      </footer>

      {/* story viewer modal */}
      <div id="viewer" className={viewerOpen ? 'open' : ''} role="dialog" aria-modal="true" aria-label="story viewer">
        <div className="v-col">
          <div className="v-top">
            <div className="v-segs">
              <span className="seg done"></span>
              <span className="seg"></span>
            </div>
            <button className="v-close" aria-label="close" onClick={() => setViewerOpen(false)}>×</button>
          </div>
          <div className="v-head">
            <div style={{width:'34px',height:'34px',borderRadius:'50%',border:'1.5px solid rgba(255,255,255,.5)'}}></div>
            <div><div className="nm">稼働率速報</div><div className="tm">今日 08:00 更新</div></div>
            <span className="sp"></span>
            <span className="idx">1 / 2</span>
          </div>
          <div id="vStage">
            <div className="v-zone l" onClick={() => setViewerOpen(false)}></div>
            <div className="v-zone r" onClick={() => setViewerOpen(false)}></div>
            <div className="v-text">
              <span className="tag">速報</span>
              <h3>8月の全国稼働率は 78.4%。</h3>
              <p>前年比 +5.2pt。観光需要の回復に加え、都市部では MICE 誘致が寄与しました。</p>
              <a className="v-cta" href="#reports" onClick={() => setViewerOpen(false)}>速報レポートを見る →</a>
            </div>
          </div>
          <p className="v-hint">タップ=閉じる</p>
        </div>
      </div>
    </div>
  );
}