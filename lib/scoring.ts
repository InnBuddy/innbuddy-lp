// lib/scoring.ts
import { hiringScoreQuestions } from '@/data/hiringQuestions';
import type { ScoringQuestion } from '@/data/hiringQuestions';

export function calcHiringScore(answers: Record<string, number>): number {
  let total = 0;
  for (const q of hiringScoreQuestions) {
    const level = answers[q.id];
    if (level === undefined) {
      total += q.maxScore * 0.5;
      continue;
    }
    const ratio = q.reversed ? (3 - level) / 3 : level / 3;
    total += q.maxScore * ratio;
  }
  const maxTotal = hiringScoreQuestions.reduce(
    (sum: number, q: ScoringQuestion) => sum + q.maxScore,
    0
  );
  return Math.round((total / maxTotal) * 1000) / 10;
}

export function getScoreLevel(score: number): string {
  if (score >= 80) return '採用体制が整っている優良企業';
  if (score >= 60) return '一定の仕組みはあるが改善余地あり';
  if (score >= 40) return '属人的・場当たり的な採用になっている可能性';
  return '採用が構造的な経営リスクになっている可能性';
}
