'use client';
import { useState, useMemo } from 'react';
import type { Product, FilterState, SortOption } from '@/lib/types';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SortControls from './SortControls';

interface Props {
  products: Product[];
  compareMode?: boolean;
}

const DEFAULT_FILTERS: FilterState = {
  skinType: [],
  skinConcern: [],
  productType: [],
  ingredientFocus: [],
  philosophy: [],
  routineLevel: [],
  priceRange: [],
  tier: [],
  ageSupport: false,
  ageDecade: '',
};

type AgeKey = 'twenties' | 'thirties' | 'forties' | 'fifties' | 'sixtyPlus';

function applyFilters(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    if (filters.ageSupport && !p.isAgeSupport) return false;
    if (filters.skinType.length && !filters.skinType.some((s) => p.skinTypes.includes(s as never))) return false;
    if (filters.skinConcern.length && !filters.skinConcern.some((s) => p.skinConcerns.includes(s as never))) return false;
    if (filters.productType.length && !filters.productType.some((s) => p.category.includes(s as never))) return false;
    if (filters.ingredientFocus.length && !filters.ingredientFocus.some((s) => p.ingredientFocus.includes(s as never))) return false;
    if (filters.philosophy.length && !filters.philosophy.some((s) => p.philosophy.includes(s as never))) return false;
    if (filters.routineLevel.length && !filters.routineLevel.includes(p.routineLevel)) return false;
    if (filters.priceRange.length && !filters.priceRange.includes(p.priceRange)) return false;
    if (filters.tier.length && !filters.tier.includes(p.tier)) return false;
    return true;
  });
}

function applySort(products: Product[], sort: SortOption, ageDecade: string): Product[] {
  const sorted = [...products];
  if (ageDecade && sort === 'score-desc') {
    return sorted.sort((a, b) => {
      const aScore = a.ageDecadeScores[ageDecade as AgeKey] ?? a.overallScore;
      const bScore = b.ageDecadeScores[ageDecade as AgeKey] ?? b.overallScore;
      return bScore - aScore;
    });
  }
  switch (sort) {
    case 'score-desc': return sorted.sort((a, b) => b.overallScore - a.overallScore);
    case 'score-asc': return sorted.sort((a, b) => a.overallScore - b.overallScore);
    case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
    case 'tier': {
      const order = { S: 0, A: 1, B: 2, C: 3, D: 4 };
      return sorted.sort((a, b) => order[a.tier] - order[b.tier]);
    }
    case 'newest': return sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    default: return sorted;
  }
}

export default function ProductGrid({ products, compareMode = false }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('score-desc');
  const [selected, setSelected] = useState<string[]>([]);

  function toggleCompare(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }

  const filtered = useMemo(
    () => applySort(applyFilters(products, filters), sort, filters.ageDecade),
    [products, filters, sort]
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters sidebar */}
      <div className="md:w-64 shrink-0">
        <FilterPanel filters={filters} onChange={setFilters} />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="mb-5">
          <SortControls value={sort} onChange={setSort} count={filtered.length} />
        </div>

        {compareMode && selected.length > 0 && (
          <div className="mb-4 p-3 bg-[var(--color-blush)] rounded-xl flex items-center gap-3 text-sm font-label">
            <span className="text-[var(--color-dark)]">{selected.length} selected for comparison</span>
            {selected.length >= 2 && (
              <a
                href={`/compare?ids=${selected.join(',')}`}
                className="ml-auto px-4 py-1.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-dark)] transition-all"
              >
                Compare Now →
              </a>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[var(--color-text-muted)]">
            <p className="font-headline text-2xl mb-2">No products match your filters</p>
            <p className="text-sm">Try adjusting or clearing some filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                compareMode={compareMode}
                isSelected={selected.includes(product.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
