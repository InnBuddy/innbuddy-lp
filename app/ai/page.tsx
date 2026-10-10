'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ArrowRight,
  Check,
  Copy,
  Download,
  X,
  Coffee,
  Clock,
} from 'lucide-react'
import { articles, cases } from '../data'

// 資料ダウンロード用ポップアップモーダル
function DownloadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: 'var(--paper)', border: '1px solid var(--line)', padding: '32px', color: 'var(--ink)', borderRadius: '12px' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--coffee)' }}
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--cream)', color: 'var(--wood)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <Download size={28} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--wood)' }}>送信が完了しました</h3>
            <p style={{ color: '#756d64', fontSize: '14px', lineHeight: '1.8', marginBottom: '24px' }}>
              ご入力いただいたメールアドレス宛に資料をお送りいたしました。
            </p>
            <button
              onClick={onClose}
              style={{ backgroundColor: 'var(--wood)', color: 'var(--cream)', padding: '12px 32px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}
            >
              閉じる
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>DOWNLOAD</span>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--wood)', margin: 0, fontFamily: "'Noto Serif JP', Georgia, serif" }}>
                無料ダウンロードフォーム
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--wood)' }}>
                    施設名 <span style={{ color: '#c0602b' }}>*</span>
                  </label>
                  <input required type="text" placeholder="例: ホテル インバディ" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--wood)' }}>
                    ご担当者名 <span style={{ color: '#c0602b' }}>*</span>
                  </label>
                  <input required type="text" placeholder="例: 旅行 太郎" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--wood)' }}>
                    メールアドレス <span style={{ color: '#c0602b' }}>*</span>
                  </label>
                  <input required type="email" placeholder="example@innbuddy.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--wood)' }}>
                    電話番号 <span style={{ color: '#c0602b' }}>*</span>
                  </label>
                  <input required type="tel" placeholder="03-1234-5678" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--wood)' }}>
                  ご住所 <span style={{ color: '#c0602b' }}>*</span>
                </label>
                <input required type="text" placeholder="例: 東京都渋谷区〇〇1-2-3" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--wood)' }}>
                  外国人宿泊比率 <span style={{ color: '#c0602b' }}>*</span>
                </label>
                <select required style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }}>
                  <option value="">選択してください</option>
                  <option value="10%未満">10%未満</option>
                  <option value="10%〜30%">10%〜30%</option>
                  <option value="30%〜50%">30%〜50%</option>
                  <option value="50%以上">50%以上</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--wood)' }}>
                  利用顧客の国籍（複数選択可）
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', padding: '16px', border: '1px solid var(--line)', background: 'var(--cream)', borderRadius: '4px' }}>
                  {['中国', '台湾', '韓国', '香港', 'アメリカ', 'オーストラリア', 'ロシア', '東南アジア', 'ヨーロッパ', '中東地域', '中南米', 'その他'].map((country) => (
                    <label key={country} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                      <input type="checkbox" value={country} style={{ accentColor: 'var(--wood)', width: '16px', height: '16px', cursor: 'pointer', margin: 0 }} />
                      <span style={{ fontSize: '12px', color: 'var(--wood)', fontWeight: '500' }}>{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={{ marginTop: '12px', backgroundColor: 'var(--wood)', color: '#a3ff12', border: 'none', padding: '16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderRadius: '6px' }}
              >
                <Download size={18} />
                <span>資料2点セットをダウンロード</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function AiPage() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const featuredArticles = (articles || []).filter((a: any) => [1, 5, 11].includes(a.no))

  return (
    <div className="ai-lab-wrapper">
      <style>{`
        @keyframes limePulse {
          0%, 100% {
            background-color: #a3ff12;
            box-shadow: 0 0 15px rgba(163, 255, 18, 0.8), 0 0 25px rgba(16, 185, 129, 0.6);
            transform: scale(1.02);
          }
          50% {
            background-color: #bbf836;
            box-shadow: 0 0 25px rgba(163, 255, 18, 1), 0 0 35px rgba(16, 185, 129, 0.8);
            transform: scale(1.04);
          }
        }
        .lime-pulse-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 32px;
          background-color: var(--wood);
          color: #ffffff !important;
          border-radius: 6px;
          text-decoration: none;
          text-align: center;
          border: 2px solid #10b981;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
          font-family: 'Noto Serif JP', 'Hiragino Mincho ProN', Georgia, serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .lime-pulse-btn:hover {
          color: #1d3300 !important;
          border-color: #84cc16;
          animation: limePulse 1.6s infinite ease-in-out;
        }

        .worry-card {
          transition: all 0.25s ease;
        }
        .worry-card:hover,
        .worry-card:hover span,
        .worry-card:hover strong,
        .worry-card:hover p,
        .worry-card:hover svg {
          color: #ffffff !important;
        }
      `}</style>

      <DownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />

      {/* ヘッダー */}
      <header className="site-header">
        <Link href="/ai" className="brand">
          <span className="brand-mark"><Coffee size={16} /></span>
          <span>AIと宿</span>
        </Link>
        <nav className="nav-links">
          <Link href="/articles">記事一覧</Link>
          <button 
            onClick={() => setIsDownloadOpen(true)} 
            style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
          >
            無料AI説明書ダウンロード
          </button>
          <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer">運営元 InnBuddy</a>
          <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
        </nav>
        <button onClick={() => setIsDownloadOpen(true)} className="header-cta" style={{ border: 'none', cursor: 'pointer' }}>
          資料ダウンロード
        </button>
      </header>

      {/* ヒーローセクション */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow light">旅館・ホテルのための AI 入門メディア</p>
          <h1>AIと宿</h1>
          <p className="hero-lead">
            宿の仕事に、AIを。<br />
            AIが初めてでも大丈夫。宿の困りごとを、AIと一緒に整理してみよう。<br />
            難しい言葉はあとでいい。まずは今日の仕事の、一つだけ。
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', fontSize: '13px', color: '#b9aa99', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#d6b88e" /> 全60記事の使用方法解説</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#d6b88e" /> コピペで使える「AIへの質問文」つき</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="#d6b88e" /> パソコンが苦手でも大丈夫</li>
          </ul>
        </div>
        <div className="hero-photo">
          <p className="photo-caption">
            A quiet morning at the front desk.<br />
            <span>宿の帳場から、はじめる。</span>
          </p>
        </div>
      </section>

      {/* WELCOME TO THE AI LAB */}
      <section className="section-pad intro">
        <div className="intro-rule"></div>
        <div>
          <p className="eyebrow">WELCOME TO THE AI LAB</p>
          <h2>「これ、AIに<br />聞いてみようかな。」</h2>
        </div>
        <div className="intro-text">
          <p>
            宿の仕事には、毎日ちいさな「どうしよう」があります。この研究所は、そんな時にふと試してみるための場所です。答えを急がず、コーヒー一杯分の時間から。
          </p>
        </div>
      </section>

      {/* START HERE こんな時、どうする？ (overflow: visible でスタンプのはみ出しを許容) */}
      <section id="cases" className="section-pad worry-section" style={{ position: 'relative', paddingBottom: '40px', overflow: 'visible' }}>
        <p className="eyebrow">START HERE</p>
        <div className="notes-head" style={{ marginBottom: '16px' }}>
          <h2 style={{ font: "400 clamp(32px,4vw,50px)/1.2 'Noto Serif JP', Georgia, serif", color: 'var(--wood)' }}>こんな時、どうする？</h2>
        </div>
        <p style={{ color: '#756d64', fontSize: '13px', marginTop: '8px' }}>AIを学ぶ前に、いま困っていることから読んでみましょう。</p>

        <div className="worry-grid" style={{ marginTop: '32px' }}>
          {(cases || []).slice(0, 6).map((c: any) => (
            <Link href={`/articles/${c.first?.art || c.slug}`} key={c.slug} className="worry-card">
              <div>
                <span>{c.group}</span>
                <strong style={{ display: 'block', marginTop: '8px', fontSize: '16px', color: 'var(--wood)' }}>{c.title}</strong>
                <p style={{ fontSize: '12px', color: '#756d64', marginTop: '8px', lineHeight: '1.6' }}>{c.desc}</p>
              </div>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>

        {/* ボタンおよびスタンプの配置コンテナ */}
        <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '0px', position: 'relative' }}>
          
          {/* 【レイヤー 1】：背景の上、ボタン・テキスト（z-index: 10）の下に挟まれるスタンプ */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -18%)', // ボタン背景〜PRACTICEテキスト上部にかかるベスト位置
              width: 'clamp(380px, 55vw, 640px)',
              height: 'clamp(380px, 55vw, 640px)',
              pointerEvents: 'none',
              zIndex: 1, // 背景の上・ボタンの下（中間層）
              opacity: 0.18,
              mixBlendMode: 'multiply',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/library/ai/インバディ温泉スタンプロゴ.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('/library/ai/')) {
                  target.src = '/images/インバディ温泉スタンプロゴ.png';
                } else if (target.src.includes('/images/')) {
                  target.src = '/インバディ温泉スタンプロゴ.png';
                }
              }}
            />
          </div>

          {/* 【レイヤー 10】：最前面に表示されるボタン */}
          <Link href="/articles" className="lime-pulse-btn" style={{ flexDirection: 'column', padding: '10px 32px', position: 'relative', zIndex: 10 }}>
            <span style={{ fontSize: '15px', fontWeight: '700', display: 'block', lineHeight: '1.3' }}>便利ノート一覧を読む</span>
            <span style={{ fontSize: '12px', fontWeight: 'normal', display: 'block', marginTop: '2px', opacity: 0.9 }}>（全60記事）</span>
          </Link>
        </div>
      </section>

      {/* PRACTICE 代表3本の実践 */}
      <section id="articles" className="section-pad notes-section" style={{ position: 'relative', paddingTop: '60px' }}>
        {/* 【レイヤー 10】：スタンプより全面に表示されるテキスト＆カード群 */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <p className="eyebrow">PRACTICE</p>
          <h2>AIに相談してみる。代表3本の実践</h2>
          <p className="section-lead">まずはこの3つの記事から読んでみてください。AIの始め方と、最初の質問のやり方がわかります。</p>

          <div className="notes-grid">
            {featuredArticles.map((note: any) => (
              <Link href={`/articles/${note.slug}`} key={note.slug} className="note-card">
                <div className="note-top">
                  <span>NOTE No.{String(note.no || 1).padStart(2, '0')}</span>
                  <BookOpen size={16} />
                </div>
                <div className="note-category">{note.cat}</div>
                <h3>{note.title}</h3>
                <p className="note-copy">{note.desc}</p>
                <div className="note-meta">
                  <span><Clock size={14} /> 約{note.mins}分で読める</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S LITTLE EXPERIMENT */}
      <section className="try-section">
        <div className="try-photo"></div>
        <div className="try-content">
          <p className="eyebrow">TODAY'S LITTLE EXPERIMENT</p>
          <h2>まずは、AIにこの文章を送ってみよう。</h2>
          <p>そのままコピーして、ChatGPTなどのAIに貼り付けてみてください。うまく書こうとしなくても大丈夫です。</p>

          <div className="prompt-card">
            <span className="prompt-label">AIに送る文章</span>
            <blockquote>「私は温泉旅館で働いています。平日の予約が少なくて困っています。まず私に質問してください。」</blockquote>
            <button
              onClick={() => handleCopy('私は温泉旅館で働いています。平日の予約が少なくて困っています。まず私に質問してください。', 99)}
              className="copy-button"
            >
              {copiedIndex === 99 ? <><Check size={14} color="var(--moss)" /> コピーしました！</> : <><Copy size={14} /> この文章をコピー</>}
            </button>
          </div>

          <div className="step-row">
            <div><b>01</b><span>コピーする</span></div>
            <div><b>02</b><span>AIを開く</span></div>
            <div><b>03</b><span>貼り付け</span></div>
            <div><b>04</b><span>送信する</span></div>
          </div>
        </div>
      </section>

      {/* DOWNLOADABLE RESOURCES */}
      <section className="section-pad" style={{ background: 'var(--paper)' }}>
        <p className="eyebrow">DOWNLOADABLE RESOURCES</p>
        <h2>帳場で使える資料・テンプレート</h2>
        <p className="section-lead">印刷して置いておける「PDFガイドブック」と、コピペで使える「Excelお願い文集」の2点セットです。</p>

        <div className="download-grid-row">
          <div className="download-card-item">
            <div className="download-icon-box"><BookOpen size={24} /></div>
            <div className="download-card-content">
              <span className="download-tag">PDF GUIDEBOOK</span>
              <h3>AIと宿_初めてのAIガイドブック</h3>
              <p>職場や事務所に常備して、スタッフ全員でAIの基本や操作イメージを確認できる実践マニュアルです。</p>
            </div>
          </div>
          <div className="download-card-item">
            <div className="download-icon-box"><Download size={24} /></div>
            <div className="download-card-content">
              <span className="download-tag">EXCEL TEMPLATE</span>
              <h3>AIと宿_お願い文集</h3>
              <p>口コミ返信、プラン作成、SNS投稿の文面をAIに考えてもらう際にそのまま使えるExcel一覧表です。</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button 
            onClick={() => setIsDownloadOpen(true)} 
            className="lime-pulse-btn"
          >
            <span>資料無料ダウンロード</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* A PHOTO IS ENOUGH */}
      <section className="section-pad photo-section">
        <div className="photo-copy">
          <p className="eyebrow">A PHOTO IS ENOUGH</p>
          <h2>文章が思いつかない日は、<br />写真を1枚。</h2>
          <p>スマートフォンで撮った写真で大丈夫。客室、料理、温泉、館内。AIに見せるところから始められます。</p>
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--paper)', borderLeft: '4px solid var(--coffee)' }}>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '15px', color: 'var(--wood)' }}>
              📸 今日の写真を送ってみよう！
            </p>
          </div>
        </div>

        <div className="photo-card" style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '24px', alignItems: 'stretch' }}>
          <div style={{ overflow: 'hidden', minHeight: '280px', borderRadius: '4px' }}>
            <img
              src="/library/ai/客室を1枚.png"
              alt="客室を1枚"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="photo-label">まずはこれを準備してください</span>
            <h3 style={{ margin: '12px 0 8px' }}>客室を1枚</h3>
            <p style={{ fontSize: '13px', color: '#756d64', lineHeight: '1.7' }}>
              写真から分かる魅力を3つ教えてください。写真だけでは分からないことは想像しないでください。
            </p>
            <button
              onClick={() => handleCopy('写真から分かる魅力を3つ教えてください。写真だけでは分からないことは想像しないでください。', 1)}
              className="copy-button"
              style={{ marginTop: '16px', alignSelf: 'flex-start' }}
            >
              {copiedIndex === 1 ? <><Check size={14} color="var(--moss)" /> コピーしました！</> : <><Copy size={14} /> この文章をコピー</>}
            </button>
          </div>
        </div>
      </section>

      {/* 3つのLEVEL */}
      <section id="levels" className="section-pad levels-section">
        <p className="eyebrow">YOUR OWN PACE</p>
        <h2>3つのLEVEL。宿がAIを使えるようになる、成長の道のり。</h2>

        <div className="level-list">
          <div className="level-card">
            <div style={{ height: '205px', overflow: 'hidden' }}>
              <img
                src="/library/ai/LEVEL 01.png"
                alt="LEVEL 01"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(.85)' }}
              />
            </div>
            <div className="level-body">
              <span className="level-no">LEVEL 01</span>
              <h3>AIを知る・触れる</h3>
              <p>「AIって何？」から“まず使ってみよう”まで。ChatGPT・Gemini・Claudeの始め方、はじめの質問、失敗しないコツまで約束します。</p>
              <Link href="/articles/ai-tte-nani" className="text-link">AIを知る・触れるをはじめから <ArrowRight size={14} /></Link>
            </div>
          </div>

          <div className="level-card">
            <div style={{ height: '205px', overflow: 'hidden' }}>
              <img
                src="/library/ai/LEVEL 02.png"
                alt="LEVEL 02"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(.85)' }}
              />
            </div>
            <div className="level-body">
              <span className="level-no">LEVEL 02</span>
              <h3>AIを宿の仕事で使う</h3>
              <p>「これ、AIに手伝ってもらえるかも」を増やす。接客・OTA・口コミ・求人・会議など、宿の実務に特化した活用法をひとつずつ解説します。</p>
              <Link href="/articles/chatgpt-hajimekata" className="text-link">AIを宿の仕事で使うをはじめから <ArrowRight size={14} /></Link>
            </div>
          </div>

          <div className="level-card">
            <div style={{ height: '205px', overflow: 'hidden' }}>
              <img
                src="/library/ai/LEVEL 03.png"
                alt="LEVEL 03"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(.85)' }}
              />
            </div>
            <div className="level-body">
              <span className="level-no">LEVEL 03</span>
              <h3>AIを日常的に使う</h3>
              <p>「とりあえずAIに聞いてみよう」が習慣になる。高度な指示ではなく、AIを職場の相棒として使うための整理術・思考法を身につけます。</p>
              <Link href="/articles/ai-hajimete-shitsumon" className="text-link">AIを日常的に使うをはじめから <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing-section">
        <div>
          <Coffee size={32} />
          <p className="eyebrow" style={{ marginTop: '16px' }}>TAKE IT EASY</p>
          <h2>今日はここまで。<br />また、明日。</h2>
          <p style={{ marginTop: '24px' }}>AIは、いつでも待っててくれます。<br />少しずつ、宿の毎日に。</p>
        </div>
      </section>

      {/* フッター */}
      <footer className="site-footer">
        <div>
          <div className="brand">
            <span className="brand-mark"><Coffee size={14} /></span>
            AIと宿
          </div>
          <p style={{ marginTop: '8px' }}>宿の人が、コーヒーを飲みながらAIを試してみる場所。</p>
        </div>

        <div style={{ fontSize: '12.5px', color: '#c8b8a7', lineHeight: '1.8' }}>
          <p style={{ margin: '0 0 4px 0', color: 'var(--cream)', fontWeight: 'bold', fontSize: '13.5px' }}>【AI活用・集客のご相談】</p>
          <p style={{ margin: '0 0 2px 0', color: '#e8d8c0' }}>- 施設でのAI活用についてのご相談</p>
          <p style={{ margin: '0 0 6px 0', color: '#e8d8c0' }}>- AIを活用したOTA・WEB集客のご相談</p>
          <p style={{ margin: 0, color: 'var(--cream)', wordBreak: 'keep-all' }}>▶︎ お問い合わせ・ご依頼は<a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" style={{ color: '#a3ff12', fontWeight: 'bold', textDecoration: 'underline', padding: 0, margin: 0 }}>こちら</a>から</p>
        </div>

        <div className="footer-copy">© INNBUDDY / AIと宿</div>
      </footer>
    </div>
  )
}