'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProjectGalleryItem } from '@/lib/content/projects';
import { Lightbox } from './Lightbox';

type ConstructionGalleryProps = {
  images: ProjectGalleryItem[];
  heading?: string;
  description?: string;
};

const CATEGORY_LABEL: Record<NonNullable<ProjectGalleryItem['category']>, string> = {
  design: 'Design',
  render: 'Render',
  construction: 'Construction',
  site: 'Site',
  interior: 'Interior',
};

export function ConstructionGallery({
  images,
  heading = 'Construction & site',
  description,
}: ConstructionGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <section aria-labelledby="gallery-heading" className="my-16">
      <header className="mb-6 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
          Process gallery
        </p>
        <h2
          id="gallery-heading"
          className="mt-2 font-serif text-2xl font-bold text-charcoal-900 md:text-3xl"
        >
          {heading}
        </h2>
        {description ? (
          <p className="mt-3 text-neutral-700">{description}</p>
        ) : (
          <p className="mt-3 text-neutral-700">
            Tap any image to open it. Use arrows or swipe to step through.
          </p>
        )}
      </header>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((img, idx) => (
          <li key={idx}>
            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              aria-label={`Open image: ${img.alt}`}
              className="group relative block w-full overflow-hidden rounded-xl bg-limestone-100 ring-1 ring-limestone-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
            >
              <div className="relative aspect-square">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              {img.category ? (
                <span className="absolute left-2 top-2 rounded-full bg-charcoal-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                  {CATEGORY_LABEL[img.category]}
                </span>
              ) : null}
              <span
                aria-hidden
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-charcoal-900 opacity-0 transition group-hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 3h3M3 3v3M11 3H8M11 3v3M3 11h3M3 11V8M11 11H8M11 11V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      ) : null}
    </section>
  );
}
