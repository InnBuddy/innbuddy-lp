import React from 'react'
import { otaArticles } from '../../articlesData'
import ArticleDetailClient from './ArticleDetailClient'

export function generateStaticParams() {
  return otaArticles.map((article) => ({
    slug: article.slug,
  }))
}

export default function OtaArticleDetailPage() {
  return <ArticleDetailClient />
}