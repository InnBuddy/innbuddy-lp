import { createClient } from 'microcms-js-sdk';

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!client) {
    client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || 'dummy',
      apiKey: process.env.MICROCMS_API_KEY || 'dummy',
    });
  }
  return client;
}

export const getStoryArticles = async () => {
  try {
    const data = await getClient().get({ endpoint: 'story' });
    return data.contents;
  } catch (error) {
    console.warn('microCMS fetch error (build safe fallback):', error);
    return [];
  }
};

export const getStoryArticleById = async (id: string) => {
  const articles = await getStoryArticles();
  return articles.find((article: any) => article.id === id);
};

export const getWaTalkArticles = async () => {
  try {
    const data = await getClient().get({
      endpoint: 'story',
      queries: { limit: 50, orders: '-publishedAt' },
    });
    return data.contents;
  } catch (error) {
    console.warn('microCMS fetch error (build safe fallback):', error);
    return [];
  }
};