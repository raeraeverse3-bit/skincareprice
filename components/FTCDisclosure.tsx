interface Props {
  inline?: boolean;
}

export default function FTCDisclosure({ inline = false }: Props) {
  if (inline) {
    return (
      <p className="text-xs text-[var(--color-text-muted)] font-label leading-relaxed">
        <strong>Disclosure:</strong> This page contains affiliate links. If you purchase through them, we may earn a
        commission at no extra cost to you. This never influences our editorial scores or recommendations — we only
        feature products we genuinely believe in. See our{' '}
        <a href="/methodology" className="underline hover:text-[var(--color-primary)]">
          full methodology
        </a>{' '}
        for details.
      </p>
    );
  }

  return (
    <div className="bg-[var(--color-blush)] border border-[var(--color-taupe)] rounded-lg p-4 text-xs font-label text-[var(--color-text-muted)] leading-relaxed">
      <strong className="text-[var(--color-dark)]">Affiliate Disclosure</strong>
      <p className="mt-1">
        SkinCarePrice participates in affiliate programs. Some links on this site are affiliate links — we may earn a
        small commission if you click through and purchase, at no additional cost to you. Affiliate relationships
        never influence our scoring, tier rankings, or editorial copy. All ratings are independently determined using
        our published{' '}
        <a href="/methodology" className="underline hover:text-[var(--color-primary)]">
          scoring methodology
        </a>
        .
      </p>
    </div>
  );
}
