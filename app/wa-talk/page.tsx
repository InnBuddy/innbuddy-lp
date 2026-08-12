// app/wa-talk/page.tsx
import WaTalkFull from '@/components/wa-talk/WaTalkFull';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

async function getArticles() {
  const data = await client.getList({
    endpoint: 'story',
  });
  return data.contents;
}

export default async function WaTalkPage() {
  const articles = await getArticles();

  return <WaTalkFull initialArticles={articles} />;
}