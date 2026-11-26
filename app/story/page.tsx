import WaTalkFull from '@/components/wa-talk/WaTalkFull';
import { LOCAL_STORIES } from '@/data/localStories';
import './story.css';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Story | 世界から届くジャパントーク | InnBuddy',
  description: '世界の旅行者が語る日本体験ストーリー。',
};

export default function StoryPage() {
  return <WaTalkFull initialArticles={LOCAL_STORIES} />;
}