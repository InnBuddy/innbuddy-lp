'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock3, Coffee, Download, X } from 'lucide-react'
import { articles } from '../data'

export default function ArticlesListPage() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ backgroundColor: '#FBF7EF', color: '#3B332B', minHeight: '100vh', fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(251,247,239,0.92)', borderBottom: '1px solid #E7DAC2', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/ai" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#3B332B' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#5E7A6A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee size={18} />
            </span>
            <span style={{ fontWeight: 'bold' }}>AIと宿</span>
          </Link>
          <button 
            onClick={() => { setSubmitted(false); setIsDownloadOpen(true) }} 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', backgroundColor: '#C0602B', color: '#fff', fontWeight: '800', fontSize: '13px', padding: '9px 18px', border: 'none', cursor: 'pointer' }}
          >
             資料ダウンロード
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '64px 20px' }}>
        <Link href="/ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', color: '#6B5F52', textDecoration: 'none', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> トップページへ戻る
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>便利ノート（全{articles.length}記事一覧）</h1>
        <p style={{ color: '#6B5F52', marginBottom: '40px' }}>宿の仕事で今すぐ使える、AI活用の実践ガイドです。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {articles.map((note: any) => (
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
                boxShadow: '0 2px 6px rgba(59, 51, 43, 0.04)'
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