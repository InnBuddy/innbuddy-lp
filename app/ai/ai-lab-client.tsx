'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { 
  ArrowRight, 
  BookOpen, 
  Check, 
  ChevronRight, 
  Clock3, 
  Coffee, 
  Copy, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon, 
  Menu, 
  MessageCircle, 
  Scale, 
  Sparkles, 
  X,
  CheckSquare
} from 'lucide-react'

const worries = [
  'AIって何に使えるの？', 
  '口コミ返信が大変', 
  'OTAの売上が伸びない', 
  'スタッフが足りない', 
  '新しい宿泊プランを考えたい', 
  '頭の中がごちゃごちゃしている'
]

const levels = [
  { no: '01', title: 'AIを知る・触る', copy: 'まずAIを知ってみる。', label: '小さな一歩から', pos: 'center' },
  { no: '02', title: 'AIを宿の仕事で使う', copy: '明日の仕事から使ってみる。', label: '仕事の味方にする', pos: '70% center' },
  { no: '03', title: 'AIを日常的に使う', copy: '「ちょっとAIに聞いてみよう」が習慣になる。', label: 'いつもの帳場に', pos: '30% center' },
]

const countries = [
  '中国', '台湾', '韓国', 
  '香港', 'アメリカ', 'オーストラリア', 
  'ロシア', '東南アジア', 'ヨーロッパ', 
  '中東地域', '中南米', 'その他'
]

const ratioOptions = Array.from({ length: 11 }, (_, i) => (i * 10).toString())

function CopyButton({ children = 'この文章をコピー' }: { children?: string }) {
  const [copied, setCopied] = useState(false)
  const prompt = '私は温泉旅館で働いています。平日の予約が少なくて困っています。まず私に質問してください。一度に3つまで質問してください。'
  return (
    <button
      className="copy-button"
      onClick={() => {
        navigator.clipboard?.writeText(prompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'コピーしました' : children}
    </button>
  )
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  )
}

export default function AiLabClient({ articles = [] }: { articles: any[] }) {
  const [openMenu, setOpenMenu] = useState(false)
  
  // モーダル用ステート
  const [isMounted, setIsMounted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ratio, setRatio] = useState<string>('')
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [showForm])

  const handleNationalityChange = (nationality: string, checked: boolean) => {
    if (checked) {
      setSelectedNationalities([...selectedNationalities, nationality])
    } else {
      setSelectedNationalities(selectedNationalities.filter((n) => n !== nationality))
    }
  }

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    setShowForm(true)
  }

  const handleDownloadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    formData.append('ratio', ratio)
    formData.append('nationalities', selectedNationalities.join(' / '))

    try {
      const GAS_URL = '★ここにGASのURLを貼り付けてください★'
      if (GAS_URL.startsWith('http')) {
        await fetch(GAS_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        })
      }
      setIsSubmitted(true)
    } catch (error) {
      console.error('送信エラー', error)
      alert('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayArticles = articles.length > 0 ? articles : [
    { slug: 'ai-tte-nani', cat: 'AIを知る', title: 'AIってそもそも何？宿の仕事のことだけ、やさしく説明', desc: '「AI」という言葉は知っていても、何ができるのかはよくわからない。そんな方のために説明します。', mins: 5, no: 1 },
    { slug: 'chatgpt-gemini-claude-chigai', cat: 'AIを知る', title: 'ChatGPT・Gemini・Claudeって何が違う？', desc: '名前だけよく聞く3つのAIサービス。違いを宿の仕事の目線でやさしく比較します。', mins: 6, no: 2 },
    { slug: 'ai-dekiru-dekinai', cat: 'AIを知る', title: 'AIにできること・できないこと。まず知っておきたい境界線', desc: 'AIは何でも屋さんではありません。得意なこと・苦手なこと・任せてはいけないことを整理します。', mins: 6, no: 3 },
  ]

  return (
    <main className="ai-lab-wrapper">
      {/* 確実で高品質なボタンアニメーションCSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-smooth {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .smooth-neon-btn {
          position: relative;
          display: inline-flex;
          border-radius: 9999px;
          padding: 1.5px; /* 美しい細いラインの確保 */
          overflow: hidden;
          background: #111;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(163, 255, 18, 0.1);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          text-decoration: none;
        }
        .smooth-neon-btn:hover {
          box-shadow: 0 0 25px rgba(163, 255, 18, 0.4);
          transform: translateY(-2px);
        }
        .smooth-neon-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          /* シルバーの細い光が回る美しいグラデーション */
          background: conic-gradient(from 90deg, transparent 0%, transparent 70%, rgba(255, 255, 255, 0.8) 100%);
          animation: spin-smooth 3s linear infinite;
        }
        .smooth-neon-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          background: #111; /* 内側を黒で塗りつぶす */
          border-radius: 9999px;
          padding: 16px 40px;
          width: 100%;
          height: 100%;
          z-index: 1;
          transition: background 0.3s ease;
        }
        .smooth-neon-btn:hover .smooth-neon-inner {
          background: #050505;
        }
        .smooth-neon-text {
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          letter-spacing: 0.1em;
          line-height: 1.4;
          text-align: left;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .smooth-neon-icon {
          color: #fff;
          transition: color 0.3s ease, filter 0.3s ease;
        }
        .smooth-neon-btn:hover .smooth-neon-text {
          color: #a3ff12;
          text-shadow: 0 0 8px rgba(163, 255, 18, 0.6);
        }
        .smooth-neon-btn:hover .smooth-neon-icon {
          color: #a3ff12;
          filter: drop-shadow(0 0 5px rgba(163, 255, 18, 0.6));
        }
      `}} />

      {/* HEADER */}
      <header className="site-header">
        <a href="#top" className="brand">
          <span className="brand-mark"><Coffee size={16} /></span>
          <span>宿のAI研究所</span>
        </a>
        <nav className={openMenu ? 'nav-links open' : 'nav-links'} aria-label="メインナビゲーション">
          <a href="#worries" onClick={() => setOpenMenu(false)}>こんな時、どうする？</a>
          <a href="#downloads" onClick={() => setOpenMenu(false)}>資料ダウンロード</a>
          <a href="#levels" onClick={() => setOpenMenu(false)}>3つのLEVEL</a>
          <a href="#notes" onClick={() => setOpenMenu(false)}>研究ノート</a>
        </nav>
        <button className="menu-toggle" aria-label="メニューを開く" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X /> : <Menu />}
        </button>
        <a href="#try" className="header-cta">
          AIを一杯、試してみる <ArrowRight size={15} />
        </a>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow light">AIが初めてでも、大丈夫。</p>
          <h1><span>宿のAI</span><em>研究所</em></h1>
          <p className="hero-lead">コーヒーを飲みながら、<br />宿の仕事を少し楽にする方法を。</p>
          <p className="hero-note">AIは、むずかしいものではありません。<br />まずは「ちょっと聞いてみる」ことから。</p>
          <a className="button button-light" href="#worries">
            研究ノートをひらく <ArrowRight size={17} />
          </a>
        </div>
        <div className="hero-photo" style={{ backgroundImage: "linear-gradient(90deg, rgba(58,42,32,.18), transparent 30%), url('/library/ai/forest-cafe.png')" }}>
          <div className="photo-caption">A quiet morning at the front desk<br /><span>宿の帳場から、はじめる。</span></div>
        </div>
        <div className="hero-stamp">AI<br /><small>LABORATORY</small></div>
      </section>

      {/* INTRO */}
      <section className="intro section-pad">
        <div className="intro-rule" />
        <div>
          <p className="eyebrow">WELCOME TO THE AI LAB</p>
          <h2>「これ、AIに<br className="mobile-only" />聞いてみようかな。」</h2>
        </div>
        <p className="intro-text">
          宿の仕事には、毎日ちいさな「どうしよう」があります。<br />
          この研究所は、そんな時にAIと話してみるための場所です。<br />
          答えを急がず、コーヒー一杯分の時間から。
        </p>
      </section>

      {/* WORRIES */}
      <section className="worry-section section-pad" id="worries">
        <SectionHeading eyebrow="START HERE" title="こんな時、どうする？" text="AIを学ぶ前に、いま困っていることから読んでみましょう。" />
        <div className="worry-grid">
          {worries.map((worry, i) => (
            <a href="#try" className="worry-card" key={worry}>
              <span>0{i + 1}</span>
              <strong>{worry}</strong>
              <ChevronRight size={18} />
            </a>
          ))}
        </div>
      </section>

      {/* TRY */}
      <section className="try-section section-pad" id="try">
        <div className="try-photo" style={{ backgroundImage: "url('/library/ai/forest-cafe.png')" }} />
        <div className="try-content">
          <p className="eyebrow">TODAY'S LITTLE EXPERIMENT</p>
          <h2>まずは、AIに<br />この文章を送ってみよう。</h2>
          <p>そのままコピーして、ChatGPTなどのAIに貼り付けてみてください。うまく書こうとしなくても大丈夫です。</p>
          <div className="prompt-card">
            <div className="prompt-label"><MessageCircle size={16} /> AIに送る文章</div>
            <blockquote>「私は温泉旅館で働いています。平日の予約が少なくて困っています。まず私に質問してください。」</blockquote>
            <CopyButton />
          </div>
          <div className="step-row">
            {['コピーする', 'AIを開く', '貼り付ける', '送信する'].map((step, i) => (
              <div key={step}>
                <b>0{i + 1}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section className="download-section section-pad" id="downloads">
        <SectionHeading 
          eyebrow="DOWNLOADABLE RESOURCES" 
          title="帳場で使える資料・テンプレート" 
          text="印刷して置いておける「PDFガイドブック」と、コピペで使える「Excelお願い文集」の2点セットです。" 
        />

        <div className="download-grid-row">
          <div className="download-card-item" style={{ paddingBottom: '32px' }}>
            <div className="download-icon-box">
              <FileText size={28} />
            </div>
            <div className="download-card-content">
              <span className="download-tag">PDF GUIDEBOOK</span>
              <h3>AIと宿_初めてのAIガイドブック</h3>
              <p style={{ marginBottom: 0 }}>帳場や事務所に常備して、スタッフ全員でAIの基本や操作イメージを確認できる実践マニュアルです。</p>
            </div>
          </div>

          <div className="download-card-item" style={{ paddingBottom: '32px' }}>
            <div className="download-icon-box excel">
              <FileSpreadsheet size={28} />
            </div>
            <div className="download-card-content">
              <span className="download-tag excel">EXCEL TEMPLATE</span>
              <h3>AIと宿_お願い文集</h3>
              <p style={{ marginBottom: 0 }}>口コミ返信、プラン作成、SNS投稿の文面をAIに考えてもらう際にそのまま使えるExcel一覧表です。</p>
            </div>
          </div>
        </div>
        
        {/* 高品質アニメーション付き ライムイエローネオンボタン */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button onClick={handleDownloadClick} className="smooth-neon-btn">
            <span className="smooth-neon-inner">
              <span className="smooth-neon-text">
                資料無料<br/>ダウンロード
              </span>
              <ArrowRight size={22} className="smooth-neon-icon" />
            </span>
          </button>
        </div>
      </section>

      {/* RULES */}
      <section className="rules-section section-pad">
        <SectionHeading eyebrow="THREE SIMPLE RULES" title="AI研究所の3つのルール" text="AIを使うとき、忘れないでほしいこと。" />
        <div className="rules-grid">
          <article>
            <b>01</b>
            <h3>まずAIに聞いてみる</h3>
            <p>完璧な質問を作らなくても大丈夫。うまく言葉にできないことも、そのまま伝えてみましょう。</p>
          </article>
          <article>
            <b>02</b>
            <h3>反対意見も聞いてみる</h3>
            <p>「悪い点は？」「見落としは？」と聞くと、考える材料が増えていきます。</p>
          </article>
          <article>
            <b>03</b>
            <h3>最後は自分で決める</h3>
            <p>AIには分からない、あなたの宿の現場があります。経験と照らし合わせて判断します。</p>
          </article>
        </div>
      </section>

      {/* PHOTO SECTION */}
      <section className="photo-section section-pad">
        <div className="photo-copy">
          <p className="eyebrow">A PHOTO IS ENOUGH</p>
          <h2>文章が思いつかない日は、<br />写真を1枚。</h2>
          <p>スマートフォンで撮った写真でも大丈夫。客室、料理、温泉、館内。AIに見せるところから始められます。</p>
          <a className="button button-dark" href="#ai-dialogue">
            <ImageIcon size={17} /> 写真を送ってみる <ArrowRight size={17} />
          </a>
        </div>
        <div className="photo-card">
          <div className="photo-card-image" style={{ backgroundImage: "url('/library/ai/forest-cafe.png')" }} />
          <div>
            <span className="photo-label">まずこれを用意してください</span>
            <h3>客室を1枚</h3>
            <p>写真から分かる魅力を3つ教えてください。写真だけでは分からないことは想像しないでください。</p>
            <CopyButton />
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section className="levels-section section-pad" id="levels">
        <SectionHeading eyebrow="YOUR OWN PACE" title="3つのLEVEL" text="知ることから、いつもの仕事へ。自分のペースで進めます。" />
        <div className="level-list">
          {levels.map((level) => (
            <article className="level-card" key={level.no}>
              <div 
                className="level-image" 
                style={{ backgroundImage: "url('/library/ai/inn-lab-hero.png')", backgroundPosition: level.pos }} 
              />
              <div className="level-body">
                <p className="level-no">LEVEL {level.no}</p>
                <h3>{level.title}</h3>
                <p>{level.copy}</p>
                <span>{level.label} <ArrowRight size={15} /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DIALOGUE */}
      <section className="dialogue-section section-pad" id="ai-dialogue">
        <SectionHeading eyebrow="RESEARCH NOTE 04" title="AI①・AI②・あなた" text="違う視点を並べて、自分が考える材料を増やします。AI同士に正解を決めさせるためではありません。" />
        <div className="dialogue-flow">
          <div>
            <span>AI①</span>
            <strong>アイデアを出す</strong>
            <p>まず相談して、質問してもらう。</p>
          </div>
          <ArrowRight />
          <div>
            <span>AI②</span>
            <strong>別の視点から考える</strong>
            <p>良い点、注意点、見落としを聞く。</p>
          </div>
          <ArrowRight />
          <div className="you">
            <span>あなた</span>
            <strong>現場から判断する</strong>
            <p>経験、お客様、地域と照らし合わせる。</p>
          </div>
        </div>
        <div className="counter-card">
          <Scale size={20} />
          <div>
            <strong>「反対意見も聞いてみる」</strong>
            <p>この案の注意点を3つ教えてください。<br />私が見落としている可能性があることはありますか？</p>
          </div>
          <CopyButton />
        </div>
      </section>

      {/* NOTES */}
      <section className="notes-section section-pad" id="notes">
        <div className="notes-head">
          <SectionHeading eyebrow="SMALL RESEARCH NOTES" title="小さな研究ノート" text="ひとつの記事を、ひとつの実験に。" />
          {/* 正しい記事一覧への導線リンク（全記事が見られるページ） */}
          <a href="/articles" className="text-link">すべての研究ノートを見る <ArrowRight size={16} /></a>
        </div>
        <div className="notes-grid">
          {/* 個別記事への正しいリンク（ダウンロードフォームが開くバグを修正） */}
          {displayArticles.slice(0, 6).map((note: any) => (
            <a href={`/articles/${note.slug}`} className="note-card hover:no-underline" key={note.slug}>
              <div className="note-top">
                <span>NOTE No.{String(note.no || 1).padStart(2, '0')}</span>
                <BookOpen size={19} />
              </div>
              <p className="note-category">{note.cat || note.category}</p>
              <h3>{note.title}</h3>
              <p className="note-copy">{note.desc || note.description}</p>
              <div className="note-meta">
                <span><Clock3 size={14} /> 約{note.mins || 5}分</span>
                <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
        {/* さらに読み込むための導線追加 */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a 
            href="/articles" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#76543d',
              border: '1px solid #76543d',
              padding: '12px 24px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#76543d'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#76543d'; }}
          >
            全60記事の研究ノートを見る <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* HUMAN */}
      <section className="human-section section-pad">
        <div>
          <p className="eyebrow">BACK TO THE FRONT DESK</p>
          <h2>☕ あなたは<br />どう思いましたか？</h2>
          <p>AIの意見と、自分の経験が違うところはありませんか？<br />AIが知らない情報はありませんか？</p>
        </div>
        <div className="human-note">
          <p>AIの答えを、そのまま信じなくて大丈夫です。</p>
          <strong>AIの回答は、<br />「考えるための材料」です。</strong>
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing-section" style={{ backgroundImage: "linear-gradient(rgba(58,42,32,.56),rgba(58,42,32,.72)), url('/library/ai/forest-cafe.png')" }}>
        <div>
          <Sparkles size={20} />
          <p className="eyebrow light">TAKE IT EASY</p>
          <h2>今日はここまで。<br /><em>また、明日。</em></h2>
          <p>AIは、いつでも待ってくれます。<br />少しずつ、宿の毎日に。</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="brand">
          <span className="brand-mark"><Coffee size={16} /></span>
          <span>宿のAI研究所</span>
        </div>
        <p>宿の人が、コーヒーを飲みながら<br />AIを試してみる場所。</p>
        <span className="footer-copy">© INNBUDDY / 宿のAI研究所</span>
      </footer>

      {/* =========================================================
          ダウンロードポップアップ（モーダル）
      ========================================================= */}
      {isMounted && showForm && typeof window !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          overflowY: 'auto'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            color: '#111111',
            maxWidth: '520px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            borderRadius: '4px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            margin: 'auto'
          }}>
            <button 
              type="button"
              onClick={() => setShowForm(false)} 
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#666666'
              }}
              aria-label="閉じる"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0', color: '#111111' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#a3ff12', /* ライムグリーン */
                  color: '#111111',
                  marginBottom: '12px'
                }}>
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111111', marginBottom: '8px' }}>
                  ご入力ありがとうございました。
                </h2>
                <p style={{ fontSize: '12px', color: '#666666', marginBottom: '20px' }}>
                  以下のボタンより、各資料をご自由にダウンロードいただけます。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <a 
                    href="/library/ai/AIと宿_初めてのAIガイドブック.pdf"
                    download="AIと宿_初めてのAIガイドブック.pdf"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#f9f9f9',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText className="w-4 h-4" style={{ color: '#a3ff12' }} />
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#111111' }}>AIと宿_初めてのAIガイドブック.pdf</span>
                    </div>
                    <Download className="w-4 h-4" style={{ color: '#a3ff12' }} />
                  </a>
                  <a 
                    href="/library/ai/AIと宿_お願い文集.xlsx"
                    download="AIと宿_お願い文集.xlsx"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#f9f9f9',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileSpreadsheet className="w-4 h-4" style={{ color: '#a3ff12' }} />
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#111111' }}>AIと宿_お願い文集.xlsx</span>
                    </div>
                    <Download className="w-4 h-4" style={{ color: '#a3ff12' }} />
                  </a>
                </div>

                <button 
                  type="button"
                  onClick={() => setShowForm(false)} 
                  style={{
                    backgroundColor: '#e5e5e5',
                    color: '#333333',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  閉じる
                </button>
              </div>
            ) : (
              <div style={{ color: '#111111' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #eeeeee', paddingBottom: '12px', marginBottom: '16px' }}>
                  <span style={{ color: '#a3ff12', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 'bold', textTransform: 'uppercase' }}>Download</span>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111111', marginTop: '4px' }}>無料ダウンロードフォーム</h2>
                </div>

                <form onSubmit={handleDownloadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>施設名 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="facilityName" 
                        required 
                        placeholder="例: ホテル インバディ" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>ご担当者名 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="representativeName" 
                        required 
                        placeholder="例: 旅行 太郎" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>メールアドレス <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="example@innbuddy.com" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>電話番号 <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        name="phone" 
                        type="tel" 
                        required 
                        placeholder="03-1234-5678" 
                        style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>ご住所 <span style={{ color: 'red' }}>*</span></label>
                    <input 
                      name="address" 
                      required 
                      placeholder="例: 東京都渋谷区〇〇1-2-3" 
                      style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '4px' }}>外国人宿泊比率 <span style={{ color: 'red' }}>*</span></label>
                    <select 
                      name="ratio" 
                      value={ratio} 
                      onChange={(e) => setRatio(e.target.value)} 
                      required 
                      style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid #ccc', padding: '0 8px', color: '#111', backgroundColor: '#fff', boxSizing: 'border-box', cursor: 'pointer' }}
                    >
                      <option value="" disabled>選択してください</option>
                      {ratioOptions.map(opt => <option key={opt} value={opt}>{opt}%</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#333333', display: 'block', marginBottom: '6px' }}>ここ1年で利用されたお客様の国籍（複数選択可）</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 4px', backgroundColor: '#f9f9f9', padding: '10px', border: '1px solid #eee' }}>
                      {countries.map((country) => (
                        <label key={country} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '10px', color: '#333' }}>
                          <input 
                            type="checkbox"
                            value={country}
                            onChange={(e) => handleNationalityChange(country, e.target.checked)}
                            style={{ accentColor: '#a3ff12', width: '14px', height: '14px', cursor: 'pointer' }}
                          />
                          <span>{country}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: '8px' }}>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      style={{
                        width: '100%',
                        height: '42px',
                        backgroundColor: isSubmitting ? '#999' : '#111111',
                        color: '#a3ff12',
                        border: '1px solid #a3ff12',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#a3ff12';
                          e.currentTarget.style.color = '#111111';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#111111';
                          e.currentTarget.style.color = '#a3ff12';
                        }
                      }}
                    >
                      {isSubmitting ? '送信中...' : <><Download className="w-4 h-4" /> 資料2点セットをダウンロード</>}
                    </button>
                    <p style={{ fontSize: '10px', color: '#888', marginTop: '8px', textAlign: 'center' }}>
                      ※ご入力いただいたメールアドレス宛に、OTA運用やAI活用に関するご案内をお送りする場合がございます。
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </main>
  )
}