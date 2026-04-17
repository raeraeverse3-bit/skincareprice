import type { ProductScores, Tier } from './types';

const SCORE_WEIGHTS: Record<keyof ProductScores, number> = {
  results: 0.25,
  ingredientsSafety: 0.20,
  skinCompatibility: 0.15,
  feelExperience: 0.12,
  brandTrust: 0.10,
  priceValue: 0.08,
  easeOfUse: 0.05,
  aestheticPackaging: 0.05,
};

export function calcOverallScore(scores: ProductScores): number {
  const raw = (Object.keys(SCORE_WEIGHTS) as (keyof ProductScores)[]).reduce(
    (sum, key) => sum + scores[key] * SCORE_WEIGHTS[key],
    0
  );
  return Math.round(raw * 10) / 10;
}

export function scoreToTier(score: number): Tier {
  if (score >= 9.0) return 'S';
  if (score >= 7.5) return 'A';
  if (score >= 6.0) return 'B';
  if (score >= 4.5) return 'C';
  return 'D';
}

export const SCORE_LABELS: Record<keyof ProductScores, string> = {
  results: 'Results',
  feelExperience: 'Feel & Experience',
  ingredientsSafety: 'Ingredients & Safety',
  skinCompatibility: 'Skin Compatibility',
  easeOfUse: 'Ease of Use',
  brandTrust: 'Brand Trust',
  priceValue: 'Price & Value',
  aestheticPackaging: 'Aesthetic & Packaging',
};

export const TIER_LABELS: Record<Tier, string> = {
  S: 'Best of the Best',
  A: 'Highly Recommended',
  B: 'Solid Choice',
  C: 'Mediocre',
  D: 'Skip It',
};

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  S: 'Exceptional products that excel across nearly every category. Worth every penny.',
  A: 'Genuinely great products with strong results and minimal trade-offs.',
  B: 'Good products that do their job well, with some limitations.',
  C: 'Average performance — may work for specific needs but not broadly impressive.',
  D: 'Underperforms, overpriced, or has significant ingredient/safety concerns.',
};
