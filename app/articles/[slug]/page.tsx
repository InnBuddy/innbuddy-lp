import { articles } from '../../data'
import ArticleClient from './ArticleClient'

// 完全静的化と不正パスでのSSR防止
export const dynamic = 'force-static'
export const dynamicParams = false

// ビルド時に全記事を静的HTMLとして事前生成
export async function generateStaticParams() {
  if (!Array.isArray(articles)) return []
  return articles.map((article: any) => ({
    slug: String(article.slug),
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ArticleClient slug={slug} />
}