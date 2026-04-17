'use client';
import type { Tier } from '@/lib/types';
import { TIER_LABELS } from '@/lib/scoring';
import clsx from 'clsx';

interface Props {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
};

const tierClasses: Record<Tier, string> = {
  S: 'bg-amber-100 text-amber-900 border-amber-300',
  A: 'bg-green-100 text-green-900 border-green-300',
  B: 'bg-sky-100 text-sky-900 border-sky-300',
  C: 'bg-stone-100 text-stone-700 border-stone-300',
  D: 'bg-rose-100 text-rose-900 border-rose-300',
};

export default function TierBadge({ tier, size = 'md', showLabel = false }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={clsx(
          'inline-flex items-center justify-center rounded-full border-2 font-bold font-label',
          sizeClasses[size],
          tierClasses[tier]
        )}
        title={TIER_LABELS[tier]}
      >
        {tier}
      </span>
      {showLabel && (
        <span className="text-sm text-[var(--color-text-muted)] font-label">{TIER_LABELS[tier]}</span>
      )}
    </span>
  );
}
