'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock3, Coffee, Download, MessageCircle, X } from 'lucide-react'
// app/ai/page.tsx から app/data.ts を正確に参照
import { articles, cases } from '../data'

export default function AiTopPage() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const featuredArticles = (articles || []).filter((a: any) => [1, 5, 11].includes(a.no))

  return (
    <div style={{ backgroundColor: '#FBF7EF', color: '#3B332B', minHeight: '100vh', fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif' }}>
      
      {/* ヘッダー */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(251,247,239,0.92)', borderBottom: '1px solid #E7DAC2', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/ai" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#3B332B' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#5E7A6A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee size={18} />
            </span>
            <div>
              <span style={{ display: 'block', fontSize: '15px', fontWeight: '800', lineHeight: '1.2' }}>AIと宿</span>
              <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', letterSpacing: '0.2em', color: '#9A8B7C' }}>YADO no AI LAB</span>
            </div>
          </Link>
          <button 
            onClick={() => { setSubmitted(false); setIsDownloadOpen(true) }} 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', backgroundColor: '#C0602B', color: '#fff', fontWeight: '800', fontSize: '13px', padding: '9px 18px', border: 'none', cursor: 'pointer' }}
          >
             資料ダウンロード
          </button>
        </div>
      </header>

      {/* メインビジュアル */}
      <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '80px 20px 60px 20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.15em', color: '#9A8B7C', textTransform: 'uppercase' }}>WELCOME TO THE AI LAB</span>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', margin: '16px 0 24px 0', lineHeight: '1.3' }}>
          「これ、AIに<br />聞いてみようかな。」
        </h1>
        <p style={{ color: '#6B5F52', fontSize: '15px', lineHeight: '1.8', maxWidth: '600px' }}>
          宿の仕事には、毎日ちいさな「どうしよう」があります。この研究所は、そんな時にふと試してみるための場所です。答えを急がず、コーヒー一杯分の時間から。
        </p>
      </section>

      {/* こんな時、どうする？ ケース24選 */}
      <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#C0602B', letterSpacing: '0.1em' }}>START HERE</span>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '4px 0 0 0' }}>こんな時、どうする？</h2>
          </div>
          <Link href="/articles" style={{ fontSize: '13px', color: '#6B5F52', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            便利ノート一覧を見る（全60記事） <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {(cases || []).slice(0, 6).map((c: any) => (
            <div key={c.slug} style={{ backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#5E7A6A', fontWeight: 'bold' }}>{c.group}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '8px 0 12px 0', lineHeight: '1.4' }}>{c.title}</h3>
                <p style={{ fontSize: '12.5px', color: '#6B5F52', lineHeight: '1.6', margin: 0 }}>{c.desc}</p>
              </div>
              <Link href={`/articles/${c.first?.art || c.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#C0602B', textDecoration: 'none', marginTop: '16px' }}>
                まず、この記事から <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 代表3本の実践 */}
      <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>AIに相談してみる。代表3本の実践</h2>
        <p style={{ color: '#6B5F52', fontSize: '14px', marginBottom: '32px' }}>まずはこの3つの記事から読んでみてください。AIの始め方と、最初の質問のやり方がわかります。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {featuredArticles.map((note: any) => (
            <Link 
              href={`/articles/${note.slug}`} 
              key={note.slug} 
              style={{ 
                backgroundColor: '#FFFDF7', 
                border: '1px solid #E7DAC2', 
                borderRadius: '16px', 
                padding: '24px', 
                textDecoration: 'none', 
                color: '#3B332B', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(59, 51, 43, 0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', color: '#9A8B7C', fontWeight: 'bold' }}>
                <span>NOTE No.{String(note.no || 1).padStart(2, '0')}</span>
                <BookOpen size={16} />
              </div>
              <span style={{ fontSize: '11px', color: '#49604F', fontWeight: 'bold', marginBottom: '8px' }}>{note.cat}</span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.4' }}>{note.title}</h3>
              <p style={{ fontSize: '12.5px', color: '#6B5F52', lineHeight: '1.6', margin: '0 0 16px 0', flex: 1 }}>{note.desc}</p>
              <div style={{ fontSize: '12px', color: '#C0602B', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock3 size={14} /> 約{note.mins}分で読める
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 写真セクション */}
      <section style={{ backgroundColor: '#FFFDF7', borderTop: '1px solid #E7DAC2', borderBottom: '1px solid #E7DAC2', padding: '64px 20px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.15em', color: '#C0602B' }}>A PHOTO IS ENOUGH</span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '12px 0 16px 0', lineHeight: '1.4' }}>
              文章が思いつかない日は、写真を1枚。
            </h2>
            <p style={{ color: '#6B5F52', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
              スマートフォンで撮った写真で大丈夫。客室、料理、温泉、館内。AIに見せるところから始められます。
            </p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#C0602B' }}>
              📸 今日の写真を送ってみよう！
            </p>
          </div>

          <div style={{ backgroundColor: '#FBF7EF', border: '1px solid #E7DAC2', borderRadius: '16px', padding: '24px' }}>
            <span style={{ fontSize: '11px', color: '#9A8B7C', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>まずはこれを準備してください</span>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>客室を1枚</h3>
            <p style={{ fontSize: '13px', color: '#6B5F52', lineHeight: '1.7', marginBottom: '16px' }}>
              写真から分かる魅力を3つ教えてください。写真だけでは分からないことは想像しないでください。
            </p>
            <div style={{ backgroundColor: '#FFF', border: '1px solid #E7DAC2', borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#5E7A6A', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={16} /> この文章をコピー
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 01 - 03 (3枚の独立写真) */}
      <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80" alt="AIを知る・触れる" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#C0602B', display: 'block', marginBottom: '4px' }}>01</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9A8B7C', letterSpacing: '0.1em' }}>LEVEL 01</span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '8px 0 12px 0' }}>AIを知る・触れる</h3>
                <p style={{ fontSize: '13px', color: '#6B5F52', lineHeight: '1.7', margin: 0 }}>
                  「AIって何？」から“まず使ってみよう”まで。ChatGPT・Gemini・Claudeの始め方、はじめの質問、失敗しないコツまで約束します。
                </p>
              </div>
              <Link href="/articles/ai-tte-nani" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#3B332B', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '12px', borderRadius: '8px', textDecoration: 'none', marginTop: '24px' }}>
                AIを知る・触れるをはじめから <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80" alt="AIを宿の仕事で使う" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#C0602B', display: 'block', marginBottom: '4px' }}>02</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9A8B7C', letterSpacing: '0.1em' }}>LEVEL 02</span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '8px 0 12px 0' }}>AIを宿の仕事で使う</h3>
                <p style={{ fontSize: '13px', color: '#6B5F52', lineHeight: '1.7', margin: 0 }}>
                  「これ、AIに手伝ってもらえるかも」を増やす。接客・OTA・口コミ・求人・会議など、宿の実務に特化した活用法をひとつずつ解説します。
                </p>
              </div>
              <Link href="/articles/customer-mail-ai" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#3B332B', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '12px', borderRadius: '8px', textDecoration: 'none', marginTop: '24px' }}>
                AIを宿の仕事で使うをはじめから <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" alt="AIを日常的に使う" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#C0602B', display: 'block', marginBottom: '4px' }}>03</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9A8B7C', letterSpacing: '0.1em' }}>LEVEL 03</span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '8px 0 12px 0' }}>AIを日常的に使う</h3>
                <p style={{ fontSize: '13px', color: '#6B5F52', lineHeight: '1.7', margin: 0 }}>
                  「とりあえずAIに聞いてみよう」が習慣になる。高度な指示ではなく、AIを職場の相棒として使うための整理術・思考法を身につけます。
                </p>
              </div>
              <Link href="/articles/doushitara-soudan" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#3B332B', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '12px', borderRadius: '8px', textDecoration: 'none', marginTop: '24px' }}>
                AIを日常的に使うをはじめから <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 資料ダウンロードセクション */}
      <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.15em', color: '#C0602B' }}>DOWNLOADABLE RESOURCES</span>
        <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '12px 0 16px 0' }}>帳場で使える資料・テンプレート</h2>
        <p style={{ color: '#6B5F52', fontSize: '14px', marginBottom: '40px' }}>印刷して置いておける「PDFガイドブック」と、コピペで使える「Excelお願い文集」の2点セットです。</p>
        
        <button 
          onClick={() => { setSubmitted(false); setIsDownloadOpen(true) }} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#111', color: '#a3ff12', border: '1px solid #a3ff12', borderRadius: '999px', padding: '16px 40px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <span>資料無料ダウンロード</span>
          <Download size={20} color="#a3ff12" />
        </button>
      </section>

      {/* 無料ダウンロードモーダル */}
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