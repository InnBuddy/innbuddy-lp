import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// 記事一覧を取得（全件）
export const getStoryArticles = async () => {
  const data = await client.get({ endpoint: 'story' });
  return data.contents;
};

// 個別記事を取得（コンテンツID = id で検索）
export const getStoryArticleById = async (id: string) => {
  const articles = await getStoryArticles();
  return articles.find((article: any) => article.id === id);
};
