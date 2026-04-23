import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/blog';
import { PRODUCTS } from '@/lib/products';
import BlogCTA from '@/components/BlogCTA';
import FTCDisclosure from '@/components/FTCDisclosure';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.skincareprice.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedProducts = post.relatedProducts
    ? PRODUCTS.filter((p) => post.relatedProducts?.includes(p.id))
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://www.skincareprice.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'SkinCarePrice',
      url: 'https://www.skincareprice.com',
    },
    keywords: post.tags.join(', '),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skincareprice.com' },
      { '@type': 'ListItem', position: 2, name: 'Skincare Dossier', item: 'https://www.skincareprice.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.skincareprice.com/blog/${post.slug}` },
    ],
  };

  const faqLd = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null;

  const paragraphs = post.content.split('\n\n').filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[var(--color-blush)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 text-xs font-label text-[var(--color-text-muted)]">
          <Link href="/blog" className="hover:text-[var(--color-primary)]">Skincare Dossier</Link>
          {' › '}
          <span className="text-[var(--color-dark)]">{post.displayTitle ?? post.title}</span>
        </div>
      </div>

      <article
        className="max-w-4xl mx-auto px-4 sm:px-6 py-12"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-blush)] text-xs font-label text-[var(--color-taupe)]">
              {post.category}
            </span>
            <span className="text-xs font-label text-[var(--color-text-muted)]">{post.readTime} min read</span>
          </div>
          <h1
            className="font-headline text-4xl sm:text-5xl text-[var(--color-dark)] mb-4 leading-tight"
            itemProp="headline"
          >
            {post.displayTitle ?? post.title}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] font-body mb-4" itemProp="description">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs font-label text-[var(--color-text-muted)]">
            <span>{post.byline ?? 'Dossier Editors'}</span>
            <span>·</span>
            <time dateTime={post.publishedAt} itemProp="datePublished">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* FTC Disclosure */}
        <div className="mb-8">
          <FTCDisclosure inline />
        </div>

        {/* Body */}
        <div className="prose max-w-none space-y-5 text-[var(--color-text-muted)] font-body text-base leading-relaxed text-justify" itemProp="articleBody">
          {paragraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return (
                <h3 key={i} className="font-headline text-xl text-[var(--color-dark)] mt-6">
                  {para.replace(/\*\*/g, '')}
                </h3>
              );
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n').map((l) => l.replace(/^- /, ''));
              return (
                <ul key={i} className="list-none space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="shrink-0 text-[var(--color-primary)]">◦</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-dark)]">$1</strong>'),
                }}
              />
            );
          })}
        </div>

        {/* Signature */}
        {post.signature && (
          <p
            className="mt-8 text-4xl text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-signature)' }}
          >
            {post.signature}
          </p>
        )}

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-10 bg-[var(--color-blush)] rounded-2xl p-6">
            <h2 className="font-headline text-2xl text-[var(--color-dark)] mb-5">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {post.faq.map(({ question, answer }, i) => (
                <div key={i} className="border-b border-[var(--color-taupe)] border-opacity-30 pb-5 last:border-0 last:pb-0">
                  <h3 className="font-headline text-lg text-[var(--color-dark)] mb-1.5">{question}</h3>
                  <p className="text-sm font-body text-[var(--color-text-muted)] leading-relaxed">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-8 pt-6 border-t border-[var(--color-blush)]">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-blush)] text-xs font-label text-[var(--color-text-muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Back to Dossier */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-sm font-label text-[var(--color-primary)] hover:underline"
          >
            ← Back to Skincare Dossier
          </Link>
        </div>

        <BlogCTA
          products={relatedProducts}
          otherPosts={BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2)}
        />
      </article>
    </>
  );
}
