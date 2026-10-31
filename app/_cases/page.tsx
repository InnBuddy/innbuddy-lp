import Link from 'next/link'
import { ArrowLeft, Coffee, ArrowRight } from 'lucide-react'
import { cases } from '../data'

export default function CasesListPage() {
  return (
    <div style={{ backgroundColor: '#FBF7EF', color: '#3B332B', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(251,247,239,0.92)', borderBottom: '1px solid #E7DAC2' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/ai" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#3B332B' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#5E7A6A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Coffee size={18} /></span>
            <span style={{ fontWeight: 'bold' }}>AIと宿</span>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '64px 20px' }}>
        <Link href="/ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', color: '#6B5F52', textDecoration: 'none', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> トップページへ戻る
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>こんな時、どうする？（お悩み別ガイド一覧）</h1>
        <p style={{ color: '#6B5F52', marginBottom: '40px' }}>宿の現場で直面する困りごとから、解決のヒントを探せます。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {cases.map((item: any) => (
            <Link href={`/cases/${item.slug}`} key={item.slug} style={{ backgroundColor: '#FBFCEF', border: '1px solid #D6DCB8', borderRadius: '16px', padding: '24px', textDecoration: 'none', color: '#292621', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#C0602B', marginBottom: '12px' }}>{item.group}</span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.4' }}>「{item.title}」</h3>
              <p style={{ fontSize: '12.5px', color: '#6B5F52', lineHeight: '1.6', margin: '0 0 16px 0', flex: 1 }}>{item.desc}</p>
              <div style={{ fontSize: '12px', color: '#A04E20', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                解決策を見る <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
