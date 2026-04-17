'use client';
import type { SortOption } from '@/lib/types';

interface Props {
  value: SortOption;
  onChange: (v: SortOption) => void;
  count: number;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'score-desc', label: 'Highest Rated' },
  { value: 'score-asc', label: 'Lowest Rated' },
  { value: 'tier', label: 'By Tier (S→D)' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest' },
];

export default function SortControls({ value, onChange, count }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-label text-[var(--color-text-muted)]">
        {count} product{count !== 1 ? 's' : ''}
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm font-label text-[var(--color-text-muted)]" htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="text-sm font-label border border-[var(--color-blush)] rounded-lg px-3 py-1.5 bg-white text-[var(--color-dark)] focus:outline-none focus:border-[var(--color-primary)]"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
