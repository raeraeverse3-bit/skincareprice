import type { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'what-does-skin-support-actually-mean',
    title: "What Does 'Skin Support' Actually Mean?",
    excerpt:
      'We talk a lot about supporting your skin rather than fighting it. Here\'s what that looks like in practice — and why the language we use about our skin matters.',
    content: `Your skin is doing extraordinary work every single day. It shields you from environmental assault, regulates your temperature, communicates sensation, and carries the map of everywhere you've been. It changes with every decade — not because it's failing, but because you're living.

So when we talk about "skin support," we mean something specific: giving your skin the raw materials it needs to do its job well. Barrier lipids. Hydration. Antioxidants to buffer oxidative stress. Proteins that support structure without forcing correction.

"Anti-aging" — a phrase you won't find in our editorial copy — frames aging as an adversary. But dehydration? Barrier disruption? Inflammation? Those are worth addressing, not because they mark time passing, but because they affect how your skin feels today.

This is the lens we bring to every product we review. Does this formula nourish and support the skin's own processes? Or does it wage war on normal biology in pursuit of a face that looks like it hasn't been anywhere?

The second kind of formula often causes more damage than it prevents. We score accordingly.`,
    category: 'Philosophy',
    tags: ['skin support', 'philosophy', 'clean beauty', 'wellness'],
    image: '/images/blog/skin-support.jpg',
    author: 'SkinCarePrice Editorial',
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    readTime: 4,
    relatedProducts: ['2', '7'],
  },
  {
    id: '2',
    slug: 'your-skin-in-your-40s-what-actually-changes',
    title: 'Your Skin in Your 40s: What Actually Changes',
    excerpt:
      'The 40s bring real physiological shifts. Knowing what\'s happening helps you choose products that genuinely respond to your skin — not marketing copy.',
    content: `The shift in skin physiology through your 40s is real, measurable, and worth understanding — not as a countdown, but as useful information.

**Estrogen fluctuations begin to affect water retention.** Your skin may feel dryer in ways it never did before, even if you're drinking plenty of water. This isn't a character flaw — it's biology. The fix: humectants, occlusives, and ceramide support. Not "firming serums."

**Cell turnover slows.** The average epidermal turnover that took ~28 days in your 20s begins to stretch toward 40–60 days. This means dead skin accumulates more noticeably, glow fades faster, and products may absorb differently. A gentle exfoliant — lactic acid, not harsh scrubs — can support this process.

**Barrier function needs more backup.** As you produce less sebum, your barrier's lipid matrix becomes less robust. This makes it easier for irritants to get in and moisture to get out. Ceramide-rich and barrier-supporting formulas earn their keep here.

**What to look for:** Hyaluronic acid at multiple molecular weights. Ceramides. Peptides that support structural proteins (not "stimulate collagen" — that's marketing). Antioxidants for oxidative defense. Gentle exfoliation.

**What to skip:** Products banking on confusion between dryness and "aging." Harsh actives that compromise your barrier in exchange for a short-term glow.

Your skin in your 40s is capable, resilient, and entirely worth caring for thoughtfully.`,
    category: 'Skin Science',
    tags: ['40s skincare', 'skin changes', 'hydration', 'barrier function'],
    image: '/images/blog/skin-40s.jpg',
    author: 'SkinCarePrice Editorial',
    publishedAt: '2025-02-10',
    updatedAt: '2025-02-10',
    readTime: 6,
    relatedProducts: ['4', '7', '8'],
  },
  {
    id: '3',
    slug: 'clean-beauty-what-it-actually-means',
    title: "Clean Beauty: What It Actually Means (and What It Doesn't)",
    excerpt:
      '"Clean" has become one of the most meaningless words in skincare marketing. Here\'s how to cut through the noise.',
    content: `The word "clean" in skincare has been stretched until it means almost nothing. Brands use it to signal safety, naturalism, sustainability, minimalism — often all at once, with no shared definition behind any of it.

Here's what we actually assess when we score a product's Ingredients & Safety category:

**Real clean markers:**
- No evidence of endocrine disruption at normal use levels
- No known sensitizers in concentrations that cause common reactions
- Formulated without synthetic fragrance where alternatives exist
- Ingredient sourcing that's traceable
- Third-party safety certifications (MADE SAFE, EWG Verified) where available

**Things that don't make something "clean":**
- Being "natural." Many potent allergens are natural. Many safe synthetics are derived from petrochemicals.
- Having a short ingredient list. Minimalism is sometimes a clean-beauty value — but brevity can also mean a product just doesn't do much.
- Not containing one or two currently-feared ingredients. Marketing often turns one villainized ingredient into a "clean" halo without changing anything else.

We don't score products on whether they claim to be clean. We score them on whether their ingredient profile demonstrates respect for skin health, safety, and where possible, transparency about sourcing.

That's what clean means to us.`,
    category: 'Ingredient Education',
    tags: ['clean beauty', 'ingredients', 'safety', 'MADE SAFE'],
    image: '/images/blog/clean-beauty.jpg',
    author: 'SkinCarePrice Editorial',
    publishedAt: '2025-03-05',
    updatedAt: '2025-03-05',
    readTime: 5,
    relatedProducts: ['2', '4', '8'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
