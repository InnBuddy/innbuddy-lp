export type Article = {
  id: string
  category: string
  title: string
  image: string
  author: string
  date: string
}

export const categories = [
  'BUSINESS',
  'CULTURE',
  'GEAR',
  'SCIENCE',
  'SECURITY',
  'WEB3',
]

export const heroArticles: Article[] = [
  {
    id: 'h-main',
    category: 'SCIENCE',
    title: '汎用人工知能はいつ来るのか——研究者たちが描く「知能」の臨界点',
    image: '/images/hero-main.png',
    author: 'MIKA TANAKA',
    date: '2026.08.05',
  },
  {
    id: 'h-1',
    category: 'GEAR',
    title: '次世代EVが変える移動体験、ソフトウェアが主役になる時代へ',
    image: '/images/hero-1.png',
    author: 'KENJI SATO',
    date: '2026.08.04',
  },
  {
    id: 'h-2',
    category: 'SCIENCE',
    title: '深宇宙望遠鏡が捉えた、最も遠い銀河の光が語る宇宙の起源',
    image: '/images/hero-2.png',
    author: 'YUI NAKAMURA',
    date: '2026.08.04',
  },
  {
    id: 'h-3',
    category: 'SECURITY',
    title: '量子時代の暗号——いま企業が備えるべきセキュリティの新常識',
    image: '/images/hero-3.png',
    author: 'REI KOBAYASHI',
    date: '2026.08.03',
  },
  {
    id: 'h-4',
    category: 'WEB3',
    title: 'トークンエコノミーの再設計、分散型金融は次の局面へ',
    image: '/images/hero-4.png',
    author: 'DAIKI ITO',
    date: '2026.08.03',
  },
]

export const latestArticles: Article[] = [
  {
    id: 'l-1',
    category: 'BUSINESS',
    title: '最新のAI技術がもたらす未来の働き方とは、生産性を再定義する現場',
    image: '/images/latest-1.png',
    author: 'AYA MATSUMOTO',
    date: '2026.08.05',
  },
  {
    id: 'l-2',
    category: 'CULTURE',
    title: '空間コンピューティングが変えるエンタメ、没入体験の最前線',
    image: '/images/latest-2.png',
    author: 'SHO YAMADA',
    date: '2026.08.05',
  },
  {
    id: 'l-3',
    category: 'GEAR',
    title: '2026年注目のスマートデバイス、日常に溶け込むテクノロジー',
    image: '/images/latest-3.png',
    author: 'NANA SUZUKI',
    date: '2026.08.04',
  },
  {
    id: 'l-4',
    category: 'SCIENCE',
    title: '再生可能エネルギーの転換点、送電網のデジタル化が加速する',
    image: '/images/latest-4.png',
    author: 'TAKUMI ABE',
    date: '2026.08.04',
  },
  {
    id: 'l-5',
    category: 'SCIENCE',
    title: 'ゲノム編集がひらく医療の可能性と、私たちが向き合う倫理',
    image: '/images/latest-5.png',
    author: 'HARUKA MORI',
    date: '2026.08.03',
  },
  {
    id: 'l-6',
    category: 'BUSINESS',
    title: 'スマートシティ構想の現実、データが動かす都市のインフラ',
    image: '/images/latest-6.png',
    author: 'KOTA HASHIMOTO',
    date: '2026.08.03',
  },
]

export const popularArticles = [
  { id: 'p-1', category: 'CULTURE', title: '生成AIはクリエイティブの敵か味方か、アーティストたちの本音' },
  { id: 'p-2', category: 'BUSINESS', title: '週4日勤務は定着するのか、先行企業が明かした数字の裏側' },
  { id: 'p-3', category: 'GEAR', title: 'レビュー：話題の折りたたみスマホは「買い」なのか' },
  { id: 'p-4', category: 'SECURITY', title: 'パスワードのない世界へ、パスキーが変える認証の未来' },
  { id: 'p-5', category: 'SCIENCE', title: '火星移住計画の現在地、私たちは本当に赤い惑星に住めるのか' },
]
