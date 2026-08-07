import AnalysisClient from '@/components/AnalysisClient';

export const metadata = {
  title: 'Analysis | マーケット分析レポート | InnBuddy',
  description: 'インバウンド市場・ASEAN・ESG関連の最新分析レポート。宿泊施設の経営戦略に役立つデータを提供します。',
  openGraph: {
    title: 'Analysis | InnBuddy',
    description: 'マーケット分析レポート',
    url: 'https://innbuddy-japan.com/library/analysis',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

export default function AnalysisPage() {
  return <AnalysisClient />;
}
