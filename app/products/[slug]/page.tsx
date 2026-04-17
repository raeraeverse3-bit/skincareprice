import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, getProductBySlug } from '@/lib/products';
import TierBadge from '@/components/TierBadge';
import AgeSupportBadge from '@/components/AgeSupportBadge';
import ScoreBar from '@/components/ScoreBar';
import AgeDecadeChart from '@/components/AgeDecadeChart';
import FTCDisclosure from '@/components/FTCDisclosure';
import { TIER_LABELS } from '@/lib/scoring';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} by ${product.brand} Review`,
    description: `${product.tagline} Tier: ${product.tier} (${TIER_LABELS[product.tier]}). Score: ${product.overallScore}/10. Read our full independent review.`,
    alternates: { canonical: `https://skincareprice.com/products/${slug}` },
    openGraph: {
      title: `${product.name} — ${TIER_LABELS[product.tier]}`,
      description: product.tagline,
      url: `https://skincareprice.com/products/${slug}`,
      type: 'article',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.description,
    url: `https://skincareprice.com/products/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.affiliateUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.overallScore,
      bestRating: 10,
      worstRating: 0,
      reviewCount: 1,
    },
    review: {
      '@type': 'Review',
      author: { '@type': 'Organization', name: 'SkinCarePrice' },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.overallScore,
        bestRating: 10,
        worstRating: 0,
      },
      reviewBody: product.description,
      datePublished: product.publishedAt,
      dateModified: product.updatedAt,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[var(--color-blush)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-xs font-label text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-primary)]">Reviews</Link>
          {' › '}
          <Link href="/" className="hover:text-[var(--color-primary)]">{product.category[0]}</Link>
          {' › '}
          <span className="text-[var(--color-dark)]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: main review */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <TierBadge tier={product.tier} size="lg" showLabel />
                {product.isAgeSupport && <AgeSupportBadge />}
              </div>
              <p className="text-xs font-label uppercase tracking-wider text-[var(--color-taupe)] mb-1">
                {product.brand}
              </p>
              <h1 className="font-headline text-3xl sm:text-4xl text-[var(--color-dark)] mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] italic font-headline">
                {product.tagline}
              </p>
            </div>

            {/* Score summary */}
            <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-6">
              <ScoreBar scores={product.scores} overallScore={product.overallScore} />
            </div>

            {/* Age decade */}
            <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-6">
              <AgeDecadeChart scores={product.ageDecadeScores} />
            </div>

            {/* Description */}
            <div>
              <h2 className="font-headline text-2xl text-[var(--color-dark)] mb-3">Overview</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{product.description}</p>
              {product.fullReview && (
                <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">{product.fullReview}</p>
              )}
            </div>

            {/* Key Ingredients */}
            <div>
              <h2 className="font-headline text-2xl text-[var(--color-dark)] mb-3">Key Ingredients</h2>
              <ul className="flex flex-wrap gap-2">
                {product.keyIngredients.map((ing) => (
                  <li
                    key={ing}
                    className="px-3 py-1.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-blush)] text-sm font-label text-[var(--color-dark)]"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros / Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                <h3 className="font-headline text-lg text-green-900 mb-3">What We Love</h3>
                <ul className="space-y-2">
                  {product.pros.map((pro) => (
                    <li key={pro} className="flex gap-2 text-sm font-body text-green-800">
                      <span className="mt-0.5 shrink-0">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                <h3 className="font-headline text-lg text-rose-900 mb-3">Worth Knowing</h3>
                <ul className="space-y-2">
                  {product.cons.map((con) => (
                    <li key={con} className="flex gap-2 text-sm font-body text-rose-800">
                      <span className="mt-0.5 shrink-0">◦</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best / Not great for */}
            <div className="bg-[var(--color-bg)] rounded-2xl p-5 border border-[var(--color-blush)]">
              <p className="text-sm font-label text-[var(--color-dark)]">
                <strong>Best for:</strong>{' '}
                <span className="text-[var(--color-text-muted)]">{product.bestFor}</span>
              </p>
              {product.notGreatFor && (
                <p className="text-sm font-label text-[var(--color-dark)] mt-2">
                  <strong>Not great for:</strong>{' '}
                  <span className="text-[var(--color-text-muted)]">{product.notGreatFor}</span>
                </p>
              )}
            </div>

            <FTCDisclosure />
          </div>

          {/* Right: sidebar */}
          <div className="space-y-5">

            {/* Buy card */}
            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary)] p-5 sticky top-4">
              <p className="text-xs font-label uppercase tracking-wider text-[var(--color-taupe)] mb-1">
                {product.brand}
              </p>
              <h2 className="font-headline text-xl text-[var(--color-dark)] mb-1">{product.name}</h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-headline text-3xl text-[var(--color-primary)] font-bold">
                  ${product.price}
                </span>
                <span className="text-xs font-label text-[var(--color-text-muted)]">
                  via {product.affiliatePartner}
                </span>
              </div>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full text-center py-3 bg-[var(--color-primary)] text-white rounded-xl font-label font-semibold hover:bg-[var(--color-dark)] transition-all mb-3"
              >
                Shop Now →
              </a>
              <p className="text-xs font-label text-[var(--color-text-muted)] text-center">
                Affiliate link · We may earn a commission
              </p>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-5">
              <h3 className="font-headline text-base text-[var(--color-dark)] mb-3">Details</h3>
              <div className="space-y-2 text-sm font-label">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Product type</span>
                  <span className="text-[var(--color-dark)] capitalize">{product.category.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Routine level</span>
                  <span className="text-[var(--color-dark)] capitalize">{product.routineLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Price range</span>
                  <span className="text-[var(--color-dark)] capitalize">{product.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Last reviewed</span>
                  <span className="text-[var(--color-dark)]">{product.updatedAt}</span>
                </div>
              </div>
            </div>

            {/* Philosophy tags */}
            <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-5">
              <h3 className="font-headline text-base text-[var(--color-dark)] mb-3">Philosophy</h3>
              <div className="flex flex-wrap gap-2">
                {product.philosophy.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-blush)] text-xs font-label text-[var(--color-text-muted)] capitalize"
                  >
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Compare CTA */}
            <Link
              href={`/compare?ids=${product.id}`}
              className="block w-full text-center py-2.5 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl font-label text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              + Add to Compare
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
