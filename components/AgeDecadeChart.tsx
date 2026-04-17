'use client';
import type { AgeDecadeScores } from '@/lib/types';

interface Props {
  scores: AgeDecadeScores;
}

const DECADE_LABELS: Record<keyof AgeDecadeScores, string> = {
  twenties: '20s',
  thirties: '30s',
  forties: '40s',
  fifties: '50s',
  sixtyPlus: '60s+',
};

export default function AgeDecadeChart({ scores }: Props) {
  const keys = Object.keys(scores) as (keyof AgeDecadeScores)[];
  const max = Math.max(...keys.map((k) => scores[k]));

  return (
    <div>
      <h3 className="font-headline text-base text-[var(--color-dark)] mb-3">Score by Decade</h3>
      <div className="flex items-end gap-2 h-24">
        {keys.map((key) => {
          const score = scores[key];
          const heightPct = (score / 10) * 100;
          const isTop = score === max;
          return (
            <div key={key} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-xs font-label font-bold text-[var(--color-primary)]">{score}</span>
              <div className="w-full flex items-end" style={{ height: '64px' }}>
                <div
                  className={`w-full rounded-t-sm transition-all ${
                    isTop
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-[var(--color-blush)]'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-xs font-label text-[var(--color-text-muted)]">{DECADE_LABELS[key]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
