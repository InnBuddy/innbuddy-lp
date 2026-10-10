'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, CheckSquare, Clock3, Coffee, Download, MessageCircle, X } from 'lucide-react'
import { articles } from '../../data'

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const foundArticle = articles.find((a: any) => a.slug === slug)

  const article = foundArticle || {
    slug,
    title: `便利ノート (${slug})`,
    desc: "この記事の本文データは準備中です。",
    cat: "AI活用",
    mins: 5,
    basics: ["AIを宿の現場で活用するための基本ガイドです。"],
    steps: [{ t: "ステップ1", d: "質問文をコピーしてAIに送信してみましょう。" }],
    prompts: [{ label: "コピーして使える質問文", body: "私は旅館で働いています。業務効率化のアイデアを教えてください。" }],
    checks: ["ページが正常に表示されていれば完了です。"]
  }

  return (
    <div style={{ backgroundColor: '#FBF7EF', color: '#3B332B', minHeight: '100vh', fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(251,247,239,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E7DAC2' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/ai" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#3B332B' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#5E7A6A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee size={18} />
            </span>
            <span>
              <span style={{ display: 'block', fontSize: '15px', fontWeight: '800', lineHeight: '1.2' }}>AIと宿</span>
              <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', letterSpacing: '0.2em', color: '#9A8B7C' }}>YADO no AI LAB</span>
            </span>
          </Link>
          <button 
            onClick={() => { setSubmitted(false); setIsDownloadOpen(true) }} 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', backgroundColor: '#C0602B', color: '#fff', fontWeight: '800', fontSize: '13px', padding: '9px 18px', border: 'none', cursor: 'pointer' }}
          >
             資料ダウンロード
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 20px' }}>
        <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', color: '#6B5F52', textDecoration: 'none', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> 便利ノート一覧へ戻る
        </Link>

        <article style={{ backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '16px', padding: '40px', boxShadow: '0 2px 8px rgba(59,51,43,.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
             <span style={{ backgroundColor: '#E5ECE6', color: '#49604F', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 'bold' }}>
               {article.cat}
             </span>
             <span style={{ fontSize: '12px', color: '#9A8B7C', display: 'flex', alignItems: 'center', gap: '4px' }}>
               <Clock3 size={14} /> 約{article.mins}分で読める
             </span>
          </div>

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', lineHeight: '1.4', marginBottom: '24px' }}>
            {article.title}
          </h1>

          <p style={{ fontSize: '15px', color: '#6B5F52', lineHeight: '1.9', paddingBottom: '32px', borderBottom: '1px dashed rgba(192,96,43,.4)', marginBottom: '40px' }}>
            {article.desc}
          </p>

          <div style={{ backgroundColor: '#F5EFE6', borderLeft: '4px solid #C0602B', borderRadius: '0 8px 8px 0', padding: '16px 20px', marginBottom: '40px' }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#3B332B' }}>
              📸 今日の写真を送ってみよう！
            </p>
          </div>

          {article.basics && article.basics.length > 0 && (
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', color: '#3B332B', borderLeft: '4px solid #5E7A6A', paddingLeft: '12px' }}>
                基本の考え方
              </h2>
              {article.basics.map((text: string, i: number) => (
                <p key={i} style={{ fontSize: '15px', lineHeight: '1.9', marginBottom: '16px' }}>{text}</p>
              ))}
            </section>
          )}

          {article.steps && article.steps.length > 0 && (
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', color: '#3B332B', borderLeft: '4px solid #C0602B', paddingLeft: '12px' }}>
                やってみよう（手順）
              </h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {article.steps.map((step: any, i: number) => (
                  <div key={i} style={{ backgroundColor: '#FBF7EF', border: '1px solid #E7DAC2', borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', backgroundColor: '#C0602B', color: '#fff', borderRadius: '50%', fontSize: '12px' }}>{i + 1}</span>
                      {step.t}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#6B5F52', marginLeft: '32px', margin: 0 }}>{step.d}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {article.prompts && article.prompts.length > 0 && (
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', color: '#3B332B', borderLeft: '4px solid #A8822F', paddingLeft: '12px' }}>
                AIに送る質問文
              </h2>
              {article.prompts.map((prompt: any, i: number) => (
                <div key={i} style={{ backgroundColor: '#F8EEE4', border: '1px solid #E7DAC2', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: 'rgba(192,96,43,.1)', padding: '16px 20px', borderBottom: '1px dashed rgba(192,96,43,.3)', fontSize: '13px', fontWeight: 'bold', color: '#A04E20', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageCircle size={16} /> {prompt.label}
                  </div>
                  <pre style={{ padding: '24px 20px', fontSize: '14px', lineHeight: '1.8', color: '#3B332B', whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                    {prompt.body}
                  </pre>
                </div>
              ))}
            </section>
          )}

          {article.checks && (
            <section style={{ backgroundColor: '#E5ECE6', padding: '32px', borderRadius: '16px', marginTop: '48px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#49604F', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare size={18} /> 今日のゴール確認
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                {article.checks.map((chk: string, i: number) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', lineHeight: '1.6' }}>
                    <Check size={16} color="#5E7A6A" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* 記事下部CTA：その場でモーダルが開く */}
        <div style={{ marginTop: '64px', textAlign: 'center', backgroundColor: '#111', padding: '48px 24px', borderRadius: '24px' }}>
           <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>AIの活用をもっとスムーズに。</h3>
           <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '32px' }}>資料やテンプレートを無料配布しています。</p>
           <button 
             onClick={() => { setSubmitted(false); setIsDownloadOpen(true) }} 
             style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, #222 0%, #000 100%)', border: '1px solid rgba(163, 255, 18, 0.4)', borderRadius: '9999px', padding: '16px 40px', cursor: 'pointer' }}
           >
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>資料無料ダウンロード</span>
              <Download size={20} color="#a3ff12" />
           </button>
        </div>
      </main>

      {/* 無料ダウンロードフォーム モーダルポップアップ */}
      {isDownloadOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '16px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '36px 28px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            
            <button 
              onClick={() => setIsDownloadOpen(false)} 
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E5ECE6', color: '#5E7A6A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <Download size={28} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: '#3B332B' }}>送信が完了しました</h3>
                <p style={{ color: '#6B5F52', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                  ご入力いただいたメールアドレス宛に資料をお送りいたしました。
                </p>
                <button onClick={() => setIsDownloadOpen(false)} style={{ backgroundColor: '#5E7A6A', color: '#fff', padding: '10px 24px', borderRadius: '999px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                  閉じる
                </button>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span style={{ color: '#84cc16', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>
                    DOWNLOAD
                  </span>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111', margin: 0 }}>
                    無料ダウンロードフォーム
                  </h2>
                </div>

                <form onSubmit={handleDownloadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#3B332B' }}>
                        施設名 <span style={{ color: '#e11d48' }}>*</span>
                      </label>
                      <input required type="text" placeholder="例: ホテル インバディ" style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#3B332B' }}>
                        ご担当者名 <span style={{ color: '#e11d48' }}>*</span>
                      </label>
                      <input required type="text" placeholder="例: 旅行 太郎" style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#3B332B' }}>
                        メールアドレス <span style={{ color: '#e11d48' }}>*</span>
                      </label>
                      <input required type="email" placeholder="example@innbuddy.com" style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#3B332B' }}>
                        電話番号 <span style={{ color: '#e11d48' }}>*</span>
                      </label>
                      <input required type="tel" placeholder="03-1234-5678" style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#3B332B' }}>
                      ご住所 <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input required type="text" placeholder="例: 東京都渋谷区〇〇1-2-3" style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#3B332B' }}>
                      外国人宿泊比率 <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <select required style={{ width: '100%', padding: '9px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff', boxSizing: 'border-box' }}>
                      <option value="">選択してください</option>
                      <option value="10%未満">10%未満</option>
                      <option value="10%〜30%">10%〜30%</option>
                      <option value="30%〜50%">30%〜50%</option>
                      <option value="50%以上">50%以上</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#3B332B' }}>
                      ここ1年で利用されたお客様の国籍（複数選択可）
                    </label>
                    <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                      {['中国', '台湾', '韓国', '香港', 'アメリカ', 'オーストラリア', 'ロシア', '東南アジア', 'ヨーロッパ', '中東地域', '中南米', 'その他'].map((country) => (
                        <label key={country} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#3B332B', cursor: 'pointer' }}>
                          <input type="checkbox" value={country} style={{ width: '14px', height: '14px' }} />
                          <span>{country}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" style={{ marginTop: '6px', backgroundColor: '#111', color: '#a3ff12', border: '1px solid #a3ff12', borderRadius: '8px', padding: '14px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Download size={18} />
                    <span>資料2点セットをダウンロード</span>
                  </button>

                  <p style={{ margin: 0, fontSize: '10.5px', color: '#6B7280', textAlign: 'center', lineHeight: '1.4' }}>
                    ※ご入力いただいたメールアドレス宛に、OTA運用やAI活用に関するご案内をお送りする場合がございます。
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}