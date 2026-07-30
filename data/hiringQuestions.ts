// app/data/hiringQuestions.ts

export interface ScoringQuestion {
  id: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  weight: 1 | 2 | 3;
  maxScore: number;
  reversed?: boolean;
  options: string[];
}

export const hiringScoreQuestions: ScoringQuestion[] = [
  // A. 定着・勤続実績（素点20点）
  { id: 'A1', category: 'A', weight: 3, maxScore: 5,
    text: '新規採用スタッフは平均どのくらい継続しますか？',
    options: ['3ヶ月未満', '3〜6ヶ月', '6ヶ月〜1年', '1年以上'] },
  { id: 'A2', category: 'A', weight: 3, maxScore: 5,
    text: '従業員の平均勤続年数は？',
    options: ['1年未満', '1〜3年', '3〜5年', '5年以上'] },
  { id: 'A3', category: 'A', weight: 2, maxScore: 3,
    text: '現在在籍中で最も長いスタッフの在籍期間は？',
    options: ['1年未満', '1〜3年', '3〜5年', '5年以上'] },
  { id: 'A4', category: 'A', weight: 1, maxScore: 2,
    text: 'スタッフの年齢層の幅は？',
    options: ['かなり偏っている', 'やや偏っている', '幅広い', '非常に幅広い'] },
  { id: 'A5', category: 'A', weight: 3, maxScore: 5,
    text: '直近1年の離職者数は採用人数の何割程度でしたか？',
    options: ['半分以上', '半分程度', '2〜3割', 'ほぼゼロ'] },

  // B. 採用プロセス・体制（素点28点）
  { id: 'B1', category: 'B', weight: 2, maxScore: 3,
    text: '求人媒体は複数を比較検討した上で選んでいる', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'B2', category: 'B', weight: 2, maxScore: 3,
    text: '面接の合否基準が明文化されている', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'B3', category: 'B', weight: 1, maxScore: 2,
    text: '内定承諾率を把握している', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'B4', category: 'B', weight: 2, maxScore: 3,
    text: '採用専任担当がいる（他業務と兼任でない）', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'B5', category: 'B', weight: 2, maxScore: 3,
    text: '過去の採用について振り返り・改善をしたことがある', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'B6', category: 'B', weight: 2, maxScore: 3, reversed: true,
    text: 'いつも同じところに依頼している（比較検討していない）', options: ['はい', 'まあまあ', 'あまり', 'いいえ'] },
  { id: 'B7', category: 'B', weight: 1, maxScore: 2,
    text: '求人の画像を定期的に差し替えている', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'B8', category: 'B', weight: 2, maxScore: 3,
    text: '掲載文章を自分で分析し変更している', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },

  // C. 外国人材対応力（素点27点）
  { id: 'C1', category: 'C', weight: 2, maxScore: 3,
    text: '技人国ビザの要件を理解し対応できる', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'C2', category: 'C', weight: 2, maxScore: 3,
    text: '特定技能制度を理解し対応できる', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'C3', category: 'C', weight: 1, maxScore: 2,
    text: '国籍別の定着傾向を把握している', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'C4', category: 'C', weight: 1, maxScore: 2,
    text: '日本語レベルに応じた採用基準がある', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'C5', category: 'C', weight: 1, maxScore: 2,
    text: '英語が話せるスタッフがいる', options: ['いない', 'ごく一部', '数名いる', '複数名いる'] },
  { id: 'C6', category: 'C', weight: 1, maxScore: 2,
    text: '中国語が話せるスタッフがいる', options: ['いない', 'ごく一部', '数名いる', '複数名いる'] },
  { id: 'C7', category: 'C', weight: 2, maxScore: 3,
    text: 'ハラル（イスラム食文化）を理解しているスタッフがいる', options: ['いない', 'ごく一部', '数名いる', '複数名いる'] },
  { id: 'C8', category: 'C', weight: 1, maxScore: 2,
    text: 'バイリンガル人材がいる', options: ['いない', 'ごく一部', '数名いる', '複数名いる'] },

  // D. 育成・エンゲージメント（素点18点）
  { id: 'D1', category: 'D', weight: 2, maxScore: 3,
    text: '体系立ったオンボーディング（研修・OJT）がある', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'D2', category: 'D', weight: 2, maxScore: 3,
    text: '入社後に定期面談を実施している', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'D3', category: 'D', weight: 1, maxScore: 2,
    text: 'キャリアパス・昇給基準が明示されている', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'D4', category: 'D', weight: 1, maxScore: 2,
    text: '従業員満足度を確認したことがある', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'D5', category: 'D', weight: 3, maxScore: 5, reversed: true,
    text: '従業員同士の対立が毎年発生する', options: ['はい', 'まあまあ', 'あまり', 'いいえ'] },

  // E. データ活用（素点8点）
  { id: 'E1', category: 'E', weight: 2, maxScore: 3,
    text: '採用単価(CPA)や離職率をKPIとして把握している', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
  { id: 'E2', category: 'E', weight: 1, maxScore: 2,
    text: '過去の採用データを記録・蓄積している', options: ['いいえ', 'あまり', 'まあまあ', 'はい'] },
];

export interface CostQuestion {
  id: string;
  text: string;
  options: string[];
}

export const hiringCostQuestions: CostQuestion[] = [
  { id: 'F1', text: 'アルバイト採用時の広告費の目安は？', options: ['無料媒体のみ', '1〜3万円', '3〜5万円', '5〜10万円', '10万円以上'] },
  { id: 'F2', text: '正社員採用時の広告費の目安は？', options: ['無料媒体のみ', '1〜3万円', '3〜5万円', '5〜10万円', '10万円以上'] },
  { id: 'F3', text: '求人を1回掲載すると、応募は何名くらい来ますか？', options: ['0〜1名', '2〜5名', '6〜10名', '10名以上'] },
  { id: 'F4', text: '応募のうち実際に面接まで進む割合は？', options: ['ほぼ全員', '半分程度', '一部のみ', 'かなり絞られる'] },
  { id: 'F5', text: '1回の掲載で採用まで至る成功率は？', options: ['ほぼ毎回', '半分程度', 'たまに', 'ほとんど至らない'] },
  { id: 'F6', text: '人材紹介利用時の手数料は年収の何％程度でしたか？', options: ['利用なし', '〜20%', '20〜30%', '30%以上'] },
  { id: 'F7', text: '応募開始から採用決定までの期間は？', options: ['2週間以内', '1ヶ月程度', '2〜3ヶ月', '3ヶ月以上'] },
  { id: 'F8', text: '「良い人材が来ない」と感じる頻度は？', options: ['ほぼない', 'たまに', '頻繁にある'] },
  { id: 'F9', text: '求人広告の文言や写真を定期的に見直していますか？', options: ['頻繁に見直している', 'たまに', '出しっぱなし'] },
  { id: 'F10', text: '採用業務に社内でかけている時間は週どのくらいですか？', options: ['1時間未満', '1〜3時間', '3〜5時間', '5時間以上'] },
];
