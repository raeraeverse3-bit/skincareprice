'use client';
import { SCORE_LABELS } from '@/lib/scoring';
import type { ProductScores } from '@/lib/types';

interface Props {
  scores: ProductScores;
  overallScore: number;
}

export default function ScoreBar({ scores, overallScore }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-headline text-lg text-[var(--color-dark)]">Overall Score</span>
        <span className="font-bold text-2xl text-[var(--color-primary)] font-headline">{overallScore}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--color-blush)] overflow-hidden mb-4">
        <div
          className="score-bar-fill"
          style={{ width: `${(overallScore / 10) * 100}%` }}
        />
      </div>
      {(Object.keys(scores) as (keyof ProductScores)[]).map((key) => (
        <div key={key} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-label text-[var(--color-text-muted)]">{SCORE_LABELS[key]}</span>
            <span className="text-xs font-label font-semibold text-[var(--color-dark)]">{scores[key]}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--color-blush)] overflow-hidden">
            <div
              className="score-bar-fill"
              style={{ width: `${(scores[key] / 10) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
