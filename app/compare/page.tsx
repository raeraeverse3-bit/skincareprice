'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { PRODUCTS } from '@/lib/products';
import { SCORE_LABELS, TIER_LABELS } from '@/lib/scoring';
import type { Product, ProductScores } from '@/lib/types';
import TierBadge from '@/components/TierBadge';
import AgeSupportBadge from '@/components/AgeSupportBadge';
import FTCDisclosure from '@/components/FTCDisclosure';

function CompareTable() {
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState<Product[]>([]);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',').filter(Boolean) ?? [];
    setSelectedIds(ids.slice(0, 4));
  }, [searchParams]);

  useEffect(() => {
    setAllSelected(
      selectedIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[]
    );
  }, [selectedIds]);

  function removeProduct(id: string) {
    setSelectedIds((prev) => prev.filter((s) => s !== id));
  }

  function addProduct(id: string) {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
  }

  const available = PRODUCTS.filter((p) => !selectedIds.includes(p.id));
  const scoreKeys = Object.keys(SCORE_LABELS) as (keyof ProductScores)[];

  const DECADE_LABELS: Record<string, string> = {
    twenties: '20s',
    thirties: '30s',
    forties: '40s',
    fifties: '50s',
    sixtyPlus: '60s+',
  };

  function best(values: number[]): number {
    return Math.max(...values);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-headline text-4xl text-[var(--color-dark)] mb-2">Compare Products</h1>
        <p className="text-[var(--color-text-muted)]">
          Select up to 4 products to compare side-by-side across all scoring dimensions.
        </p>
      </div>

      {/* Product selector */}
      {selectedIds.length < 4 && (
        <div className="bg-white rounded-2xl border border-[var(--color-blush)] p-5 mb-8">
          <h2 className="font-headline text-lg text-[var(--color-dark)] mb-3">Add a product</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {available.map((p) => (
              <button
                key={p.id}
                onClick={() => addProduct(p.id)}
                className="text-left px-3 py-2 rounded-lg border border-[var(--color-blush)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg)] transition-all"
              >
                <p className="text-xs font-label text-[var(--color-taupe)]">{p.brand}</p>
                <p className="text-sm font-label text-[var(--color-dark)] line-clamp-2">{p.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {allSelected.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)]">
          <p className="font-headline text-2xl mb-2">No products selected</p>
          <p className="text-sm mb-4">Add products above, or browse reviews and use the Compare button.</p>
          <Link href="/" className="text-[var(--color-primary)] hover:underline font-label text-sm">
            ← Browse Reviews
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-label text-[var(--color-text-muted)] w-40 border-b border-[var(--color-blush)]">
                  Category
                </th>
                {allSelected.map((p) => (
                  <th key={p.id} className="py-3 px-4 text-left border-b border-[var(--color-blush)] min-w-48">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-label text-[var(--color-taupe)]">{p.brand}</p>
                        <p className="font-headline text-base text-[var(--color-dark)] leading-tight">{p.name}</p>
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          <TierBadge tier={p.tier} size="sm" />
                          {p.isAgeSupport && <AgeSupportBadge size="sm" />}
                        </div>
                      </div>
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="text-xs text-[var(--color-taupe)] hover:text-rose-500 shrink-0 mt-1"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Overall score */}
              <tr className="bg-[var(--color-bg)]">
                <td className="py-3 px-4 text-sm font-label font-semibold text-[var(--color-dark)] border-b border-[var(--color-blush)]">
                  Overall Score
                </td>
                {allSelected.map((p) => {
                  const isBest = p.overallScore === best(allSelected.map((x) => x.overallScore));
                  return (
                    <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)]">
                      <span
                        className={`font-headline text-2xl font-bold ${
                          isBest ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
                        }`}
                      >
                        {p.overallScore}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">/10</span>
                    </td>
                  );
                })}
              </tr>

              {/* Tier */}
              <tr>
                <td className="py-3 px-4 text-sm font-label font-semibold text-[var(--color-dark)] border-b border-[var(--color-blush)]">
                  Tier
                </td>
                {allSelected.map((p) => (
                  <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)]">
                    <TierBadge tier={p.tier} size="sm" showLabel />
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="bg-[var(--color-bg)]">
                <td className="py-3 px-4 text-sm font-label font-semibold text-[var(--color-dark)] border-b border-[var(--color-blush)]">
                  Price
                </td>
                {allSelected.map((p) => {
                  const isCheapest = p.price === Math.min(...allSelected.map((x) => x.price));
                  return (
                    <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)]">
                      <span
                        className={`font-label font-semibold ${
                          isCheapest ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
                        }`}
                      >
                        ${p.price}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Age Support */}
              <tr>
                <td className="py-3 px-4 text-sm font-label font-semibold text-[var(--color-dark)] border-b border-[var(--color-blush)]">
                  Age-Support
                </td>
                {allSelected.map((p) => (
                  <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)]">
                    <span className={`text-sm font-label ${p.isAgeSupport ? 'text-green-700' : 'text-[var(--color-text-muted)]'}`}>
                      {p.isAgeSupport ? 'Yes' : 'No'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Individual scores */}
              {scoreKeys.map((key, i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-[var(--color-bg)]' : ''}>
                  <td className="py-3 px-4 text-sm font-label text-[var(--color-text-muted)] border-b border-[var(--color-blush)]">
                    {SCORE_LABELS[key]}
                  </td>
                  {allSelected.map((p) => {
                    const isBest = p.scores[key] === best(allSelected.map((x) => x.scores[key]));
                    return (
                      <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)]">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-label font-semibold ${
                              isBest ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
                            }`}
                          >
                            {p.scores[key]}
                          </span>
                          <div className="flex-1 h-1.5 rounded-full bg-[var(--color-blush)] overflow-hidden min-w-12">
                            <div
                              className="score-bar-fill h-full"
                              style={{ width: `${(p.scores[key] / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Age decade scores */}
              {Object.keys(DECADE_LABELS).map((decade, i) => (
                <tr key={decade} className={i % 2 === 0 ? '' : 'bg-[var(--color-bg)]'}>
                  <td className="py-3 px-4 text-sm font-label text-[var(--color-text-muted)] border-b border-[var(--color-blush)]">
                    Score in {DECADE_LABELS[decade]}
                  </td>
                  {allSelected.map((p) => {
                    const score = p.ageDecadeScores[decade as keyof typeof p.ageDecadeScores];
                    const isBest = score === best(allSelected.map((x) => x.ageDecadeScores[decade as keyof typeof x.ageDecadeScores]));
                    return (
                      <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)]">
                        <span className={`text-sm font-label ${isBest ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-muted)]'}`}>
                          {score}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Best for */}
              <tr>
                <td className="py-3 px-4 text-sm font-label font-semibold text-[var(--color-dark)] border-b border-[var(--color-blush)]">
                  Best For
                </td>
                {allSelected.map((p) => (
                  <td key={p.id} className="py-3 px-4 border-b border-[var(--color-blush)] text-sm font-body text-[var(--color-text-muted)]">
                    {p.bestFor}
                  </td>
                ))}
              </tr>

              {/* Buy buttons */}
              <tr className="bg-[var(--color-bg)]">
                <td className="py-4 px-4 text-sm font-label font-semibold text-[var(--color-dark)]">
                  Shop
                </td>
                {allSelected.map((p) => (
                  <td key={p.id} className="py-4 px-4">
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-label hover:bg-[var(--color-dark)] transition-all"
                    >
                      Shop ${p.price}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10">
        <FTCDisclosure />
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-[var(--color-text-muted)]">Loading comparison...</div>}>
      <CompareTable />
    </Suspense>
  );
}
