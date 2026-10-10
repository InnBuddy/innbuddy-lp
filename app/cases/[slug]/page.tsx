import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Coffee, Download, MessageCircle } from 'lucide-react'
import { cases, articles } from '../../data'

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = cases.find((c: any) => c.slug === slug)

  if (!item) {
    notFound()
  }

  const firstArticle = item.first?.art
    ? articles.find((a: any) => a.slug === item.first.art)
    : null

  return (
    <div style={{ backgroundColor: '#FBF7EF', color: '#3B332B', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(251,247,239,0.92)', borderBottom: '1px solid #E7DAC2' }}>
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
          <Link href="/ai#downloads" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', backgroundColor: '#C0602B', color: '#fff', fontWeight: '800', fontSize: '13px', padding: '9px 18px', textDecoration: 'none' }}>
             資料ダウンロード
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 20px' }}>
        <Link href="/ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', color: '#6B5F52', textDecoration: 'none', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> トップページへ戻る
        </Link>

        <article style={{ backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '16px', padding: '40px', boxShadow: '0 1px 2px rgba(59,51,43,.06)' }}>
          <span style={{ backgroundColor: '#F8EEE4', color: '#C0602B', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginBottom: '16px' }}>
            {item.group}
          </span>

          <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: '800', lineHeight: '1.4', marginBottom: '20px' }}>
            「{item.title}」
          </h1>

          <p style={{ fontSize: '15px', color: '#6B5F52', lineHeight: '1.9', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px dashed rgba(192,96,43,.4)' }}>
            {item.desc}
          </p>

          {firstArticle && (
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: '#3B332B' }}>
                まず最初に読むべき記事
              </h2>
              <div style={{ backgroundColor: '#FBF7EF', border: '1px solid #E7DAC2', borderRadius: '16px', padding: '24px' }}>
                <p style={{ fontSize: '13px', color: '#A04E20', fontWeight: 'bold', marginBottom: '8px' }}>
                  💡 なぜこの記事から読むのか？
                </p>
                <p style={{ fontSize: '14px', color: '#6B5F52', lineHeight: '1.7', marginBottom: '20px' }}>
                  {item.first.why}
                </p>

                <Link href={`/articles/${firstArticle.slug}`} style={{ display: 'block', backgroundColor: '#FFFDF7', border: '1px solid #E7DAC2', borderRadius: '12px', padding: '20px', textDecoration: 'none', color: '#3B332B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#49604F', fontWeight: 'bold', marginBottom: '6px' }}>
                    <BookOpen size={14} /> NOTE No.{String(firstArticle.no).padStart(2, '0')} - {firstArticle.cat}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#3B332B' }}>
                    {firstArticle.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B5F52', margin: 0 }}>
                    {firstArticle.desc}
                  </p>
                </Link>
              </div>
            </section>
          )}

          {item.prompt && (
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: '#3B332B' }}>
                この相談で使えるAI質問文
              </h2>
              <p style={{ fontSize: '13px', color: '#6B5F52', marginBottom: '12px' }}>
                {item.promptIntro}
              </p>
              <div style={{ backgroundColor: '#F8EEE4', border: '1px solid #E7DAC2', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'rgba(192,96,43,.1)', padding: '14px 20px', borderBottom: '1px dashed rgba(192,96,43,.3)', fontSize: '12px', fontWeight: 'bold', color: '#A04E20', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={16} /> コピーして使える質問文
                </div>
                <pre style={{ padding: '20px', fontSize: '14px', lineHeight: '1.8', color: '#3B332B', whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                  {item.prompt}
                </pre>
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  )
}