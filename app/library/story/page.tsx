// app/library/story/page.tsx
import WaTalkFull from '@/components/wa-talk/WaTalkFull';
import { getStoryArticles } from '@/lib/microcms';

export const metadata = {
  title: 'Story | 世界から届くジャパントーク | InnBuddy',
  description: '世界の旅行者が語る日本体験ストーリー。',
};

export default async function StoryPage() {
  const articles = await getStoryArticles();

  return <WaTalkFull initialArticles={articles} />;
}
