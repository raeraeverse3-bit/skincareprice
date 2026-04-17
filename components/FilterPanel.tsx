'use client';
import { useState } from 'react';
import type { FilterState, Tier } from '@/lib/types';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

type MultiKey = 'skinType' | 'skinConcern' | 'productType' | 'ingredientFocus' | 'philosophy' | 'routineLevel' | 'priceRange' | 'tier';

const FILTER_OPTIONS = {
  skinType: [
    { value: 'dry', label: 'Dry' },
    { value: 'oily', label: 'Oily' },
    { value: 'combination', label: 'Combination' },
    { value: 'sensitive', label: 'Sensitive' },
    { value: 'normal', label: 'Normal' },
    { value: 'mature', label: 'Mature' },
  ],
  skinConcern: [
    { value: 'hydration', label: 'Hydration' },
    { value: 'texture', label: 'Texture' },
    { value: 'firmness', label: 'Firmness' },
    { value: 'dark-spots', label: 'Dark Spots' },
    { value: 'redness', label: 'Redness' },
    { value: 'pores', label: 'Pores' },
    { value: 'dullness', label: 'Dullness' },
    { value: 'fine-lines', label: 'Fine Lines' },
    { value: 'barrier-repair', label: 'Barrier Repair' },
    { value: 'glow', label: 'Glow' },
    { value: 'anti-aging', label: 'Anti-Aging' },
  ],
  productType: [
    { value: 'cleanser', label: 'Cleanser' },
    { value: 'toner', label: 'Toner' },
    { value: 'serum', label: 'Serum' },
    { value: 'moisturizer', label: 'Moisturizer' },
    { value: 'eye-cream', label: 'Eye Cream' },
    { value: 'face-oil', label: 'Face Oil' },
    { value: 'mask', label: 'Mask' },
    { value: 'spf', label: 'SPF' },
    { value: 'exfoliant', label: 'Exfoliant' },
    { value: 'mist', label: 'Mist' },
  ],
  ingredientFocus: [
    { value: 'retinol', label: 'Retinol' },
    { value: 'vitamin-c', label: 'Vitamin C' },
    { value: 'hyaluronic-acid', label: 'Hyaluronic Acid' },
    { value: 'peptides', label: 'Peptides' },
    { value: 'niacinamide', label: 'Niacinamide' },
    { value: 'ceramides', label: 'Ceramides' },
    { value: 'aha-bha', label: 'AHA/BHA' },
    { value: 'bakuchiol', label: 'Bakuchiol' },
    { value: 'sea-actives', label: 'Sea Actives' },
    { value: 'plant-stem-cells', label: 'Plant Stem Cells' },
  ],
  philosophy: [
    { value: 'clean-beauty', label: 'Clean Beauty' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'cruelty-free', label: 'Cruelty-Free' },
    { value: 'sustainable', label: 'Sustainable' },
    { value: 'fragrance-free', label: 'Fragrance-Free' },
    { value: 'reef-safe', label: 'Reef-Safe' },
    { value: 'cultural-heritage', label: 'Cultural Heritage' },
    { value: 'clinical', label: 'Clinical' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'minimalist', label: 'Minimalist' },
  ],
  routineLevel: [
    { value: 'simple', label: 'Simple (1–3 steps)' },
    { value: 'moderate', label: 'Moderate (4–6 steps)' },
    { value: 'advanced', label: 'Advanced (7+ steps)' },
  ],
  priceRange: [
    { value: 'budget', label: 'Budget (under $25)' },
    { value: 'mid', label: 'Mid ($25–$65)' },
    { value: 'premium', label: 'Premium ($65–$120)' },
    { value: 'luxury', label: 'Luxury ($120+)' },
  ],
  tier: [
    { value: 'S', label: 'S — Best of the Best' },
    { value: 'A', label: 'A — Highly Recommended' },
    { value: 'B', label: 'B — Solid Choice' },
    { value: 'C', label: 'C — Mediocre' },
    { value: 'D', label: 'D — Skip It' },
  ],
  ageDecade: [
    { value: '', label: 'All Ages' },
    { value: 'twenties', label: 'In Your 20s' },
    { value: 'thirties', label: 'In Your 30s' },
    { value: 'forties', label: 'In Your 40s' },
    { value: 'fifties', label: 'In Your 50s' },
    { value: 'sixtyPlus', label: 'In Your 60s+' },
  ],
};

interface SectionProps {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterSection({ label, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-blush)] pb-3 mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-label font-semibold text-[var(--color-dark)] py-1"
      >
        {label}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function FilterPanel({ filters, onChange }: Props) {
  function toggle(key: MultiKey, value: string) {
    const arr = filters[key] as string[];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: next });
  }

  function activeCount() {
    const multiKeys: MultiKey[] = ['skinType', 'skinConcern', 'productType', 'ingredientFocus', 'philosophy', 'routineLevel', 'priceRange', 'tier'];
    return multiKeys.reduce((n, k) => n + (filters[k] as string[]).length, 0) + (filters.ageSupport ? 1 : 0) + (filters.ageDecade ? 1 : 0);
  }

  function reset() {
    onChange({
      skinType: [], skinConcern: [], productType: [], ingredientFocus: [],
      philosophy: [], routineLevel: [], priceRange: [], tier: [],
      ageSupport: false, ageDecade: '',
    });
  }

  const count = activeCount();

  return (
    <aside className="bg-white rounded-2xl border border-[var(--color-blush)] p-5 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline text-lg text-[var(--color-dark)]">Filters</h2>
        {count > 0 && (
          <button onClick={reset} className="text-xs font-label text-[var(--color-primary)] hover:underline flex items-center gap-1">
            <X size={12} /> Clear {count}
          </button>
        )}
      </div>

      {/* Age-Support toggle */}
      <div className="mb-4 pb-3 border-b border-[var(--color-blush)]">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.ageSupport}
            onChange={(e) => onChange({ ...filters, ageSupport: e.target.checked })}
            className="w-4 h-4 accent-[var(--color-primary)]"
          />
          <span className="text-sm font-label text-[var(--color-dark)] group-hover:text-[var(--color-primary)]">
            Age-Support Only
          </span>
        </label>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 ml-6">
          Products that prioritize skin health over youth-chasing
        </p>
      </div>

      {/* Age Decade */}
      <FilterSection label="Your Decade" defaultOpen>
        <div className="space-y-1.5">
          {FILTER_OPTIONS.ageDecade.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ageDecade"
                value={opt.value}
                checked={filters.ageDecade === opt.value}
                onChange={(e) => onChange({ ...filters, ageDecade: e.target.value })}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm font-label text-[var(--color-text-muted)]">{opt.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {(['skinType', 'skinConcern', 'productType', 'ingredientFocus', 'philosophy', 'routineLevel', 'priceRange', 'tier'] as MultiKey[]).map((key) => (
        <FilterSection
          key={key}
          label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).replace('Skin Type', 'Skin Type').replace('Skin Concern', 'Skin Concern').replace('Product Type', 'Product Type').replace('Ingredient Focus', 'Ingredient Focus')}
        >
          <div className="space-y-1.5">
            {FILTER_OPTIONS[key as keyof typeof FILTER_OPTIONS]?.map((opt) => {
              const selected = (filters[key] as string[]).includes(opt.value);
              return (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggle(key, opt.value)}
                    className="w-4 h-4 accent-[var(--color-primary)]"
                  />
                  <span className={`text-sm font-label ${selected ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-muted)]'} group-hover:text-[var(--color-primary)]`}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </FilterSection>
      ))}
    </aside>
  );
}
