'use client';
import { useState } from 'react';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductImageGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-square bg-[var(--color-bg)] rounded-2xl overflow-hidden border border-[var(--color-blush)]">
        <img
          src={images[active]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain p-6"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                i === active
                  ? 'border-[var(--color-primary)]'
                  : 'border-[var(--color-blush)] hover:border-[var(--color-taupe)]'
              }`}
            >
              <img
                src={src}
                alt={`${alt} option ${i + 1}`}
                className="absolute inset-0 w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
