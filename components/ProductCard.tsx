'use client';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import TierBadge from './TierBadge';
import AgeSupportBadge from './AgeSupportBadge';

interface Props {
  product: Product;
  compareMode?: boolean;
  isSelected?: boolean;
  onToggleCompare?: (id: string) => void;
}

const PRICE_RANGE_LABELS: Record<string, string> = {
  budget: '$',
  mid: '$$',
  premium: '$$$',
  luxury: '$$$$',
};

export default function ProductCard({
  product,
  compareMode = false,
  isSelected = false,
  onToggleCompare,
}: Props) {
  return (
    <article
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden group ${
        isSelected
          ? 'border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)] ring-opacity-30'
          : 'border-[var(--color-blush)] hover:shadow-md hover:border-[var(--color-taupe)]'
      }`}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Image area */}
      <div className="relative w-full bg-[var(--color-bg)] aspect-square overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.name} by ${product.brand}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-blush)] opacity-40" />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <TierBadge tier={product.tier} size="sm" />
          {product.isAgeSupport && <AgeSupportBadge size="sm" />}
        </div>
        <div className="absolute top-3 right-3 text-xs font-label font-bold text-[var(--color-text-muted)] bg-white bg-opacity-90 px-2 py-0.5 rounded-full">
          {PRICE_RANGE_LABELS[product.priceRange]}
        </div>
        {compareMode && (
          <button
            onClick={() => onToggleCompare?.(product.id)}
            className={`absolute bottom-3 right-3 text-xs font-label px-2.5 py-1 rounded-full border transition-all ${
              isSelected
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'bg-white text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
            }`}
          >
            {isSelected ? '✓ Added' : '+ Compare'}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-label uppercase tracking-wider text-[var(--color-taupe)] mb-1" itemProp="brand">
          {product.brand}
        </p>
        <h3 className="font-headline text-lg text-[var(--color-dark)] leading-tight mb-1" itemProp="name">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] font-body mb-3 line-clamp-2">
          {product.tagline}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TierBadge tier={product.tier} size="sm" showLabel />
          </div>
          <div
            className="flex items-center gap-1"
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <span className="text-sm font-bold text-[var(--color-primary)] font-label">
              <meta itemProp="ratingValue" content={String(product.overallScore)} />
              <meta itemProp="bestRating" content="10" />
              <meta itemProp="worstRating" content="0" />
              <meta itemProp="reviewCount" content="1" />
              {product.overallScore}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-label">/10</span>
          </div>
        </div>

        <div className="h-1.5 rounded-full bg-[var(--color-blush)] overflow-hidden mb-3">
          <div
            className="score-bar-fill"
            style={{ width: `${(product.overallScore / 10) * 100}%` }}
          />
        </div>

        <p className="text-xs font-label text-[var(--color-text-muted)] mb-4">
          Best for: {product.bestFor.split(',')[0]}
        </p>

        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center text-sm font-label font-medium py-2 px-3 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all"
          >
            Read Review
          </Link>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 text-center text-sm font-label font-medium py-2 px-3 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-dark)] transition-all"
            itemProp="url"
          >
            Shop ${product.price}
          </a>
        </div>
        {product.brand === 'The Golden Secrets' && (
          <p className="text-center text-xs font-label text-[var(--color-taupe)] mt-2">
            Use code <span className="font-semibold text-[var(--color-dark)]">XOR10</span> for 10% off
          </p>
        )}
      </div>
    </article>
  );
}
