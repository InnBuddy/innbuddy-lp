import JournalClient from '@/components/JournalClient';

export const metadata = {
  title: 'Journal | ホテル運営・ブランディングのデジタル専門誌 | InnBuddy',
  description: 'OTA運用・インバウンド集客・ブランディングに関する実践的な記事を掲載。宿泊施設の経営に役立つ情報が満載です。',
  openGraph: {
    title: 'Journal | InnBuddy',
    description: 'ホテル運営・ブランディングのデジタル専門誌',
    url: 'https://innbuddy-japan.com/library/journal',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

export default function JournalPage() {
  return <JournalClient />;
}
