import Link from 'next/link';
import type { Product } from '@/lib/types';
import type { BlogPost } from '@/lib/types';
import TierBadge from './TierBadge';

interface Props {
  products: Product[];
  otherPosts: BlogPost[];
}

export default function BlogCTA({ products, otherPosts }: Props) {
  return (
    <div className="mt-12 border-t-2 border-[var(--color-blush)] pt-12 space-y-12">

      {/* Section 1: Products Worth Considering */}
      {products.length > 0 && (
        <section>
          <h2 className="font-headline text-2xl text-[var(--color-dark)] mb-1">
            Products worth considering
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] font-body mb-6">
            Selected from our independently scored review database.
          </p>
          <div className={`grid gap-4 ${products.length === 1 ? 'grid-cols-1 max-w-xs' : products.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[var(--color-blush)] overflow-hidden hover:shadow-sm transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-[var(--color-bg)] overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={`${product.name} by ${product.brand}`}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full bg-[var(--color-blush)] opacity-40" />
                  )}
                  <div className="absolute top-2 left-2">
                    <TierBadge tier={product.tier} size="sm" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-xs font-label uppercase tracking-wider text-[var(--color-taupe)] mb-0.5">
                    {product.brand}
                  </p>
                  <p className="font-headline text-sm text-[var(--color-dark)] leading-snug mb-1.5">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs font-bold text-[var(--color-primary)] font-label">
                      {product.overallScore}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-label">/10</span>
                  </div>
                  <div className="flex gap-1.5 mt-auto">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 text-center text-xs font-label font-medium py-1.5 px-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all"
                    >
                      Read Review
                    </Link>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-1 text-center text-xs font-label font-medium py-1.5 px-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-dark)] transition-all"
                    >
                      Shop ${product.price}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: More from the Skincare Dossier */}
      {otherPosts.length > 0 && (
        <section>
          <h2 className="font-headline text-2xl text-[var(--color-dark)] mb-5">
            More from the Skincare Dossier
          </h2>
          <div className="space-y-3">
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-4 items-start p-4 rounded-xl border border-[var(--color-blush)] bg-white hover:border-[var(--color-taupe)] hover:shadow-sm transition-all group"
              >
                <div className="shrink-0 mt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-blush)] text-xs font-label text-[var(--color-taupe)]">
                    {post.category}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline text-base text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-1">
                    {post.displayTitle ?? post.title}
                  </p>
                  <p className="text-xs font-body text-[var(--color-text-muted)] line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <span className="shrink-0 text-[var(--color-primary)] text-sm mt-0.5">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Closing CTA */}
      <section className="text-center py-8 bg-[var(--color-blush)] rounded-2xl">
        <p className="font-headline text-xl text-[var(--color-dark)] mb-1">
          Find your full routine at SkinCarePrice.
        </p>
        <p className="text-sm text-[var(--color-text-muted)] font-body mb-5">
          Every product independently scored. No fluff.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-xl font-label font-medium text-sm hover:bg-[var(--color-dark)] transition-all"
        >
          Browse All Reviews
        </Link>
      </section>

    </div>
  );
}
