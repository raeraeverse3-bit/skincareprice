import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import FTCDisclosure from '@/components/FTCDisclosure';
import TierBadge from '@/components/TierBadge';
import { TIER_DESCRIPTIONS } from '@/lib/scoring';
import type { Tier } from '@/lib/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SkinCarePrice — Honest Skincare Reviews & Comparisons',
  description:
    "Independent skincare product reviews with tier scoring (S/A/B/C/D), age-decade rankings, and honest filters. We support the skin you're in.",
  alternates: { canonical: 'https://www.skincareprice.com' },
};

const TIER_SUMMARY: Tier[] = ['S', 'A', 'B', 'C', 'D'];

export default function HomePage() {
  const sTopProducts = PRODUCTS.filter((p) => p.tier === 'S').slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top-Rated Skincare Products',
    description: 'SkinCarePrice independently ranked skincare products',
    url: 'https://www.skincareprice.com',
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.skincareprice.com/products/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-blush)] to-[var(--color-bg)] border-b border-[var(--color-blush)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <p className="text-xs font-label uppercase tracking-widest text-[var(--color-primary)] mb-4">
            Independent Reviews · Tier-Scored · No Fluff
          </p>
          <h1 className="font-headline text-4xl sm:text-6xl text-[var(--color-dark)] mb-4 leading-tight">
            Your skin has earned this.
          </h1>
          <div className="mb-8 space-y-1">
            <p className="text-lg font-headline text-[var(--color-dark)]">Good skincare shouldn&apos;t cost a mystery.</p>
            <p className="text-lg font-headline text-[var(--color-dark)]">Finally, skincare prices — decoded.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#reviews"
              className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-label font-medium hover:bg-[var(--color-dark)] transition-all"
            >
              Browse Reviews
            </a>
            <Link
              href="/compare"
              className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl font-label font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              Compare Products
            </Link>
            <Link
              href="/methodology"
              className="px-6 py-3 border border-[var(--color-blush)] text-[var(--color-text-muted)] rounded-xl font-label font-medium hover:border-[var(--color-taupe)] transition-all"
            >
              How We Score
            </Link>
          </div>
        </div>
      </section>

      {/* Tier Legend */}
      <section className="bg-white border-b border-[var(--color-blush)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {TIER_SUMMARY.map((tier) => (
              <div key={tier} className="flex items-center gap-2 text-sm font-label">
                <TierBadge tier={tier} size="sm" />
                <span className="text-[var(--color-text-muted)]">{TIER_DESCRIPTIONS[tier]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S-tier spotlight */}
      {sTopProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-baseline gap-3 mb-6">
            <TierBadge tier="S" size="md" />
            <h2 className="font-headline text-2xl text-[var(--color-dark)]">Best of the Best</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {sTopProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[var(--color-blush)] p-5 hover:shadow-md transition-all"
                >
                  <p className="text-xs font-label uppercase tracking-wider text-[var(--color-taupe)] mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-headline text-lg text-[var(--color-dark)] mb-1">{product.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-3">{product.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-xl text-[var(--color-primary)] font-bold">
                      {product.overallScore}/10
                    </span>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-sm font-label px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-dark)] transition-all"
                    >
                      Shop ${product.price}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FTC Disclosure */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <FTCDisclosure />
      </div>

      {/* Main product grid */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-2">All Reviews</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Use filters to find the right products for your skin type, concern, and decade.
        </p>
        <ProductGrid products={PRODUCTS} compareMode />
      </section>
    </>
  );
}
