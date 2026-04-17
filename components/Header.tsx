'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Reviews' },
  { href: '/compare', label: 'Compare' },
  { href: '/blog', label: 'Skincare Dossier' },
  { href: '/methodology', label: 'Methodology' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-blush)] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-headline font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-dark)] transition-colors">
              SkinCarePrice
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-label text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[var(--color-text-muted)]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[var(--color-blush)] px-4 py-4 space-y-3">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-sm font-label text-[var(--color-text-muted)] hover:text-[var(--color-primary)] py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
