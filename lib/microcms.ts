import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'innbuddy';
const apiKey = process.env.MICROCMS_API_KEY || '';

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!client) {
    console.log(`[microCMS Build] Domain: ${serviceDomain}, API Key Length: ${apiKey ? apiKey.length : 0}`);
    client = createClient({
      serviceDomain,
      apiKey: apiKey || 'dummy',
    });
  }
  return client;
}

export const getStoryArticles = async () => {
  try {
    const data = await getClient().get({ endpoint: 'story' });
    console.log(`[microCMS Build] Successfully fetched ${data.contents.length} articles`);
    return data.contents;
  } catch (error: any) {
    console.error('[microCMS Build Error]:', error?.message || error);
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
  } catch (error: any) {
    console.error('[microCMS Build Error]:', error?.message || error);
    return [];
  }
};
