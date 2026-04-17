import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Journal — Skin Science, Philosophy & Honest Guidance',
  description:
    'The SkinCarePrice journal. Skin science, product philosophy, ingredient education, and honest guidance for every decade.',
  alternates: { canonical: 'https://skincareprice.com/blog' },
};

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SkinCarePrice Journal',
    url: 'https://skincareprice.com/blog',
    description: 'Skin science, philosophy, and honest skincare guidance.',
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `https://skincareprice.com/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: { '@type': 'Organization', name: p.author },
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <p className="text-xs font-label uppercase tracking-widest text-[var(--color-primary)] mb-3">
            The Skincare Dossier
          </p>
          <h1 className="font-headline text-5xl text-[var(--color-dark)] mb-4">
            Skin Science & Honest Guidance
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            Deep-dives on what your skin actually needs, what the ingredients actually do, and what
            the marketing is actually saying.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-[var(--color-blush)] overflow-hidden hover:shadow-md transition-all group"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-blush)] text-xs font-label text-[var(--color-taupe)]">
                    {post.category}
                  </span>
                  <span className="text-xs font-label text-[var(--color-text-muted)]">
                    {post.readTime} min read
                  </span>
                  <time
                    className="text-xs font-label text-[var(--color-text-muted)]"
                    dateTime={post.publishedAt}
                    itemProp="datePublished"
                  >
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="font-headline text-2xl sm:text-3xl text-[var(--color-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors" itemProp="headline">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-[var(--color-text-muted)] mb-4 font-body" itemProp="description">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-label text-[var(--color-text-muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-label text-[var(--color-primary)] hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
