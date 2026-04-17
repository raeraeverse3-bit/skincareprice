'use client';

interface Props {
  size?: 'sm' | 'md';
}

export default function AgeSupportBadge({ size = 'md' }: Props) {
  return (
    <span
      title="Age-Support: prioritizes skin health and nourishment over youth-chasing"
      className={`inline-flex items-center gap-1 rounded-full bg-[var(--color-sage)] bg-opacity-20 text-[#2d4a2e] border border-[var(--color-sage)] font-label font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      Age-Support
    </span>
  );
}
