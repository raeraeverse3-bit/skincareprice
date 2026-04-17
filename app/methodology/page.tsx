import type { Metadata } from 'next';
import { SCORE_LABELS, TIER_LABELS, TIER_DESCRIPTIONS } from '@/lib/scoring';
import type { ProductScores, Tier } from '@/lib/types';
import TierBadge from '@/components/TierBadge';

export const metadata: Metadata = {
  title: 'How We Score Skincare Products — Our Methodology',
  description:
    'Learn how SkinCarePrice independently scores skincare products using an 8-dimension rubric, age-decade ratings, and the 🌱 Age-Support flag. Full editorial independence disclosed.',
  alternates: { canonical: 'https://skincareprice.com/methodology' },
};

const SCORE_WEIGHTS: Record<keyof ProductScores, number> = {
  results: 25,
  ingredientsSafety: 20,
  skinCompatibility: 15,
  feelExperience: 12,
  brandTrust: 10,
  priceValue: 8,
  easeOfUse: 5,
  aestheticPackaging: 5,
};

const SCORE_DESCRIPTIONS: Record<keyof ProductScores, string> = {
  results: 'Visible improvement in the concern the product targets — the most important factor.',
  feelExperience: 'Sensory experience, texture, absorption, and how skin feels immediately and hours later.',
  ingredientsSafety: 'Quality of the ingredient list, safety profile, actives concentration, and formulation integrity.',
  skinCompatibility: 'How broadly the formula works across different skin types without irritation.',
  easeOfUse: 'How simple the product is to incorporate into a routine — application, layering, timing.',
  brandTrust: 'Brand transparency, third-party testing, ethical practices, and consumer track record.',
  priceValue: 'Whether results justify the cost — both absolute price and cost-per-use.',
  aestheticPackaging: 'Packaging functionality, sustainability, and presentation quality.',
};

const TIERS: Tier[] = ['S', 'A', 'B', 'C', 'D'];
const TIER_RANGES: Record<Tier, string> = {
  S: '9.0 – 10.0',
  A: '7.5 – 8.9',
  B: '6.0 – 7.4',
  C: '4.5 – 5.9',
  D: 'Below 4.5',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SkinCarePrice Scoring Methodology',
  url: 'https://skincareprice.com/methodology',
  description: 'Our full editorial methodology for independently scoring skincare products.',
  publisher: { '@type': 'Organization', name: 'SkinCarePrice' },
};

export default function MethodologyPage() {
  const keys = Object.keys(SCORE_WEIGHTS) as (keyof ProductScores)[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-label uppercase tracking-widest text-[var(--color-primary)] mb-3">
            Transparency First
          </p>
          <h1 className="font-headline text-5xl text-[var(--color-dark)] mb-4">
            How We Score
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Our scoring is built on one conviction: you deserve honest information, not marketing.
            Every score is independent, reproducible, and explained.
          </p>
        </div>

        {/* Philosophy */}
        <section className="bg-[var(--color-blush)] rounded-2xl p-8 mb-10">
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-4">Our Philosophy</h2>
          <div className="prose prose-stone max-w-none text-[var(--color-text-muted)] space-y-3 font-body text-base text-justify">
            <p className="text-center not-prose">Smile lines and the memories that birthed them are a blessing.</p>
            <p className="text-center not-prose">We just think you deserve good products while you&apos;re at it.</p>
            <p>
              Our editorial language reflects this. You won&apos;t find the phrase &quot;anti-aging&quot; in our
              review copy — only in filter labels for SEO. Instead, we talk about skin support,
              nourishment, vitality, and barrier health. Products that prioritize skin health over
              youth-signaling receive the Age-Support flag.
            </p>
            <p>
              Affiliate relationships are disclosed on every page and never influence scores.
              If anything, we hold our affiliate partners to a higher standard of transparency in our
              reviews — because trust is the only thing we have.
            </p>
          </div>
        </section>

        {/* Scoring dimensions */}
        <section className="mb-10">
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-6">
            The 8-Dimension Rubric
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Each product is scored on a 1–10 scale across eight dimensions. Dimensions are weighted
            by their real-world impact on your skin:
          </p>
          <div className="space-y-4">
            {keys.map((key) => (
              <div
                key={key}
                className="bg-white rounded-xl border border-[var(--color-blush)] p-5 flex gap-5 items-start"
              >
                <div className="shrink-0 w-12 text-center">
                  <span className="font-headline text-2xl font-bold text-[var(--color-primary)]">
                    {SCORE_WEIGHTS[key]}%
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-lg text-[var(--color-dark)] mb-1">
                    {SCORE_LABELS[key]}
                  </h3>
                  <p className="text-sm font-body text-[var(--color-text-muted)]">
                    {SCORE_DESCRIPTIONS[key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tier system */}
        <section className="mb-10">
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-6">Tier System</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Once a weighted composite score is calculated, the product receives a tier:
          </p>
          <div className="space-y-3">
            {TIERS.map((tier) => (
              <div
                key={tier}
                className="bg-white rounded-xl border border-[var(--color-blush)] p-5 flex items-start gap-4"
              >
                <TierBadge tier={tier} size="lg" />
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-headline text-lg text-[var(--color-dark)]">
                      {TIER_LABELS[tier]}
                    </h3>
                    <span className="text-xs font-label text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-blush)]">
                      Score: {TIER_RANGES[tier]}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">{TIER_DESCRIPTIONS[tier]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Age-decade scoring */}
        <section className="mb-10">
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-4">Age-Decade Scoring</h2>
          <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-6">
            <p className="text-[var(--color-text-muted)] mb-4">
              Beyond overall score, each product is rated specifically for five life decades: 20s,
              30s, 40s, 50s, and 60s+. This accounts for shifts in skin physiology, changing
              priorities (hydration, barrier support, texture), and formulation complexity that suits
              each phase.
            </p>
            <p className="text-[var(--color-text-muted)]">
              These decade scores are displayed on product pages as bar charts and are used when
              filtering with the &quot;Your Decade&quot; filter — sorting products by their performance for
              your skin at your stage of life.
            </p>
          </div>
        </section>

        {/* Age-Support flag */}
        <section className="mb-10">
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-4">
            The Age-Support Flag
          </h2>
          <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
            <p className="text-[var(--color-text-muted)] mb-4">
              Products that earn the Age-Support flag are those we&apos;ve determined prioritize
              <strong className="text-[var(--color-dark)]"> skin health, nourishment, and vitality</strong> over
              youth-signaling or youth-chasing claims.
            </p>
            <p className="text-[var(--color-text-muted)] mb-4">
              To earn this flag, a product must:
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li className="flex gap-2"><span>✓</span> Support barrier function, hydration, or long-term skin health</li>
              <li className="flex gap-2"><span>✓</span> Avoid language that frames aging as a problem or deficiency</li>
              <li className="flex gap-2"><span>✓</span> Have an ingredient profile consistent with nourishment over correction</li>
              <li className="flex gap-2"><span>✓</span> Be broadly appropriate across multiple skin decades</li>
            </ul>
          </div>
        </section>

        {/* Editorial independence */}
        <section className="mb-10">
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-4">Editorial Independence</h2>
          <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-6 space-y-3 text-[var(--color-text-muted)] text-sm font-body">
            <p>
              SkinCarePrice participates in affiliate programs. We may earn a commission when you
              purchase through links on this site. These commissions help keep the site running.
            </p>
            <p>
              <strong className="text-[var(--color-dark)]">Affiliate relationships never influence scores.</strong>{' '}
              Products are selected for review based on research and reader interest, not commission
              rates. Our scoring methodology is applied equally to all products regardless of
              partnership status.
            </p>
            <p>
              All affiliate links are marked with <code className="bg-[var(--color-bg)] px-1 rounded">rel=&quot;sponsored&quot;</code> per FTC
              guidelines. Every page containing affiliate links carries a disclosure at the top or
              bottom of the page.
            </p>
            <p>
              We also use Amazon Associates (tag: <code className="bg-[var(--color-bg)] px-1 rounded">skincareprice-20</code>) for
              Amazon product links.
            </p>
          </div>
        </section>

        {/* Updating reviews */}
        <section>
          <h2 className="font-headline text-3xl text-[var(--color-dark)] mb-4">Keeping Reviews Current</h2>
          <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-6 text-[var(--color-text-muted)] text-sm font-body">
            <p>
              Each product page shows its &quot;Last Reviewed&quot; date. We re-evaluate formulas when brands
              announce ingredient changes, when substantial new user data emerges, or on an annual
              review cycle. Scores can go up or down. When they change significantly, we note it in
              the review.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
