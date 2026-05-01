export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';

export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal' | 'mature';

export type SkinConcern =
  | 'hydration'
  | 'texture'
  | 'firmness'
  | 'dark-spots'
  | 'redness'
  | 'pores'
  | 'dullness'
  | 'fine-lines'
  | 'barrier-repair'
  | 'glow'
  | 'anti-aging'; // kept as SEO filter label only

export type ProductType =
  | 'cleanser'
  | 'toner'
  | 'serum'
  | 'moisturizer'
  | 'eye-cream'
  | 'face-oil'
  | 'mask'
  | 'spf'
  | 'exfoliant'
  | 'mist'
  | 'balm'
  | 'skin-wellness';

export type IngredientFocus =
  | 'retinol'
  | 'vitamin-c'
  | 'hyaluronic-acid'
  | 'peptides'
  | 'niacinamide'
  | 'ceramides'
  | 'aha-bha'
  | 'bakuchiol'
  | 'collagen'
  | 'antioxidants'
  | 'plant-stem-cells'
  | 'sea-actives';

export type Philosophy =
  | 'clean-beauty'
  | 'vegan'
  | 'cruelty-free'
  | 'sustainable'
  | 'fragrance-free'
  | 'reef-safe'
  | 'clinical'
  | 'luxury'
  | 'minimalist'
  | 'cultural-heritage';

export type RoutineLevel = 'simple' | 'moderate' | 'advanced';

export interface ProductScores {
  results: number;
  feelExperience: number;
  ingredientsSafety: number;
  skinCompatibility: number;
  easeOfUse: number;
  brandTrust: number;
  priceValue: number;
  aestheticPackaging: number;
}

export interface AgeDecadeScores {
  twenties: number;
  thirties: number;
  forties: number;
  fifties: number;
  sixtyPlus: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  fullReview?: string;
  category: ProductType[];
  skinTypes: SkinType[];
  skinConcerns: SkinConcern[];
  ingredientFocus: IngredientFocus[];
  philosophy: Philosophy[];
  routineLevel: RoutineLevel;
  price: number;
  priceRange: 'budget' | 'mid' | 'premium' | 'luxury';
  affiliateUrl: string;
  affiliatePartner: string;
  image: string;
  images?: string[];
  tier: Tier;
  overallScore: number;
  isAgeSupport: boolean; // prioritizes skin health over youth-chasing
  scores: ProductScores;
  ageDecadeScores: AgeDecadeScores;
  pros: string[];
  cons: string[];
  bestFor: string;
  notGreatFor?: string;
  keyIngredients: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  displayTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  relatedProducts?: string[];
  byline?: string;
  signature?: string;
  faq?: Array<{ question: string; answer: string }>;
}

export type SortOption =
  | 'score-desc'
  | 'score-asc'
  | 'price-asc'
  | 'price-desc'
  | 'tier'
  | 'newest';

export interface FilterState {
  skinType: SkinType[];
  skinConcern: SkinConcern[];
  productType: ProductType[];
  ingredientFocus: IngredientFocus[];
  philosophy: Philosophy[];
  routineLevel: RoutineLevel[];
  priceRange: string[];
  tier: Tier[];
  ageSupport: boolean;
  ageDecade: string;
}
