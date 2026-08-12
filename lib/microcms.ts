import { createClient } from 'microcms-js-sdk';

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!client) {
    client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    });
  }
  return client;
}

export const getStoryArticles = async () => {
  const data = await getClient().get({ endpoint: 'story' });
  return data.contents;
};

export const getStoryArticleById = async (id: string) => {
  const articles = await getStoryArticles();
  return articles.find((article: any) => article.id === id);
};

export const getWaTalkArticles = async () => {
  const data = await getClient().get({
    endpoint: 'story',
    queries: { limit: 50, orders: '-publishedAt' },
  });
  return data.contents;
};
