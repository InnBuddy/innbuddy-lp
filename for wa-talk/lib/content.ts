export type Lang = 'ja' | 'en' | 'zh'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'ja', label: 'JA' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: 'ZH' },
]

type Dict = {
  nav: { stories: string; about: string; contact: string }
  hero: {
    kicker: string
    title: string
    body: string
    cta: string
  }
  categories: { id: string; title: string; caption: string }[]
  articles: Record<
    string,
    { title: string; tag: string }
  >
  readMore: string
}

// 記事の画像（デフォルト / ホバー時に切り替わる別写真）
export const ARTICLE_IMAGES: Record<string, { front: string; back: string }> = {
  a1: { front: '/c1-1a.png', back: '/c1-1b.png' },
  a2: { front: '/c1-2a.png', back: '/c1-2b.png' },
  a3: { front: '/c1-3a.png', back: '/c1-3b.png' },
  b1: { front: '/c2-1a.png', back: '/c2-1b.png' },
  b2: { front: '/c2-2a.png', back: '/c2-2b.png' },
  b3: { front: '/c2-3a.png', back: '/c2-3b.png' },
  c1: { front: '/c3-1a.png', back: '/c3-1b.png' },
  c2: { front: '/c3-2a.png', back: '/c3-2b.png' },
  c3: { front: '/c3-3a.png', back: '/c3-3b.png' },
}

export const CATEGORY_ARTICLES: Record<string, string[]> = {
  cat1: ['a1', 'a2', 'a3', 'b1', 'c1'],
  cat2: ['b1', 'b2', 'b3', 'c2', 'a2'],
  cat3: ['c1', 'c2', 'c3', 'a3', 'b3'],
}

export const DICT: Record<Lang, Dict> = {
  ja: {
    nav: { stories: 'ストーリー', about: 'について', contact: 'お問い合わせ' },
    hero: {
      kicker: '世界から届く、日本のはなし',
      title: '日本を、\nもっと深く味わう。',
      body: '食、文化、風景。名もなき日常のなかにある物語を、世界中の視点で掬い上げるブログマガジン。',
      cta: '最新のストーリーを読む',
    },
    categories: [
      { id: 'cat1', title: '食と、茶と。', caption: 'Food & Tea' },
      { id: 'cat2', title: '伝統と、文化。', caption: 'Tradition & Culture' },
      { id: 'cat3', title: '風景と、旅。', caption: 'Landscape & Travel' },
    ],
    articles: {
      a1: { title: '一杯の抹茶に宿る、静けさの作法', tag: '茶' },
      a2: { title: '職人が握る、江戸前という哲学', tag: '食' },
      a3: { title: '四季を映す、和菓子の色彩', tag: '甘味' },
      b1: { title: '着物を纏い、街を歩くという体験', tag: '装い' },
      b2: { title: '筆先に宿る、書道のこころ', tag: '書' },
      b3: { title: '太鼓が響く、祭りの夜の熱量', tag: '祭' },
      c1: { title: '富士を望む、夜明けの静寂', tag: '山' },
      c2: { title: '京都の路地に残る、時間の層', tag: '街' },
      c3: { title: '雪深き里に灯る、あたたかな窓', tag: '里' },
    },
    readMore: '読む',
  },
  en: {
    nav: { stories: 'Stories', about: 'About', contact: 'Contact' },
    hero: {
      kicker: 'Japan Story from the World',
      title: 'Taste Japan,\ndeeper than ever.',
      body: 'Food, culture and landscape. A blog magazine that scoops up the stories hidden in ordinary days, seen through eyes from all over the world.',
      cta: 'Read the latest stories',
    },
    categories: [
      { id: 'cat1', title: 'Food & Tea', caption: '食と茶' },
      { id: 'cat2', title: 'Tradition & Culture', caption: '伝統と文化' },
      { id: 'cat3', title: 'Landscape & Travel', caption: '風景と旅' },
    ],
    articles: {
      a1: { title: 'The quiet ritual within a single bowl of matcha', tag: 'Tea' },
      a2: { title: 'Edomae: the philosophy in a master’s hands', tag: 'Food' },
      a3: { title: 'Wagashi colors that mirror the four seasons', tag: 'Sweets' },
      b1: { title: 'Walking the town wrapped in a kimono', tag: 'Attire' },
      b2: { title: 'The heart of shodo at the tip of a brush', tag: 'Ink' },
      b3: { title: 'The heat of a festival night, drums echoing', tag: 'Festival' },
      c1: { title: 'Facing Mt. Fuji in the silence of dawn', tag: 'Mountain' },
      c2: { title: 'Layers of time left in the alleys of Kyoto', tag: 'City' },
      c3: { title: 'Warm windows glowing in a snowbound village', tag: 'Village' },
    },
    readMore: 'Read',
  },
  zh: {
    nav: { stories: '故事', about: '关于', contact: '联系' },
    hero: {
      kicker: '来自世界的日本故事',
      title: '更深地，\n品味日本。',
      body: '美食、文化与风景。一本以世界各地的视角，拾起藏于平凡日常中故事的博客杂志。',
      cta: '阅读最新故事',
    },
    categories: [
      { id: 'cat1', title: '美食与茶', caption: 'Food & Tea' },
      { id: 'cat2', title: '传统与文化', caption: 'Tradition & Culture' },
      { id: 'cat3', title: '风景与旅行', caption: 'Landscape & Travel' },
    ],
    articles: {
      a1: { title: '一碗抹茶中栖息的宁静之礼', tag: '茶' },
      a2: { title: '匠人手中的江户前哲学', tag: '食' },
      a3: { title: '映照四季的和果子色彩', tag: '甜点' },
      b1: { title: '身着和服，漫步街巷的体验', tag: '装' },
      b2: { title: '笔尖之上的书道之心', tag: '书' },
      b3: { title: '太鼓回响，祭典之夜的热度', tag: '祭' },
      c1: { title: '眺望富士，黎明的静谧', tag: '山' },
      c2: { title: '京都巷弄中残留的时间层理', tag: '街' },
      c3: { title: '雪乡里点亮的温暖窗光', tag: '乡' },
    },
    readMore: '阅读',
  },
}

// 47 都道府県と県庁所在地（常に英語表記）
export const PREFECTURES: string[] = [
  'Hokkaido / Sapporo',
  'Aomori / Aomori',
  'Iwate / Morioka',
  'Miyagi / Sendai',
  'Akita / Akita',
  'Yamagata / Yamagata',
  'Fukushima / Fukushima',
  'Ibaraki / Mito',
  'Tochigi / Utsunomiya',
  'Gunma / Maebashi',
  'Saitama / Saitama',
  'Chiba / Chiba',
  'Tokyo / Shinjuku',
  'Kanagawa / Yokohama',
  'Niigata / Niigata',
  'Toyama / Toyama',
  'Ishikawa / Kanazawa',
  'Fukui / Fukui',
  'Yamanashi / Kofu',
  'Nagano / Nagano',
  'Gifu / Gifu',
  'Shizuoka / Shizuoka',
  'Aichi / Nagoya',
  'Mie / Tsu',
  'Shiga / Otsu',
  'Kyoto / Kyoto',
  'Osaka / Osaka',
  'Hyogo / Kobe',
  'Nara / Nara',
  'Wakayama / Wakayama',
  'Tottori / Tottori',
  'Shimane / Matsue',
  'Okayama / Okayama',
  'Hiroshima / Hiroshima',
  'Yamaguchi / Yamaguchi',
  'Tokushima / Tokushima',
  'Kagawa / Takamatsu',
  'Ehime / Matsuyama',
  'Kochi / Kochi',
  'Fukuoka / Fukuoka',
  'Saga / Saga',
  'Nagasaki / Nagasaki',
  'Kumamoto / Kumamoto',
  'Oita / Oita',
  'Miyazaki / Miyazaki',
  'Kagoshima / Kagoshima',
  'Okinawa / Naha',
]
