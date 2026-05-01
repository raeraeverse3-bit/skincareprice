import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skincare Price Comparison Tool',
  description:
    'Compare skincare products side by side on score, ingredients, tier, and price. The most direct skincare price comparison tool — up to four products at once.',
  alternates: { canonical: 'https://www.skincareprice.com/compare' },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
