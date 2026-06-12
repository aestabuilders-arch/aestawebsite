'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import type { ProjectGalleryItem } from '@/lib/content/projects';

type LightboxProps = {
  images: ProjectGalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
};

const SWIPE_THRESHOLD = 40;

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;
  const current = images[index];

  const goPrev = useCallback(() => {
    if (total === 0) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, onIndexChange, total]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    onIndexChange((index + 1) % total);
  }, [index, onIndexChange, total]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext, onClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!current) return null;

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) goPrev();
    else goNext();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${total}: ${current.alt}`}
      className="fixed inset-0 z-50 flex flex-col bg-charcoal-900/95 text-white backdrop-blur"
      onClick={onClose}
    >
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <span className="text-sm text-white/80">
          {index + 1} / {total}
          {current.category ? (
            <span className="ml-3 uppercase tracking-wider">{current.category}</span>
          ) : null}
        </span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close image"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div
        className="relative flex flex-1 items-center justify-center px-2 pb-2 md:px-8"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:flex"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M12 4l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative h-full w-full max-w-5xl">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain"
            priority
          />
        </div>

        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:flex"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M8 4l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {current.caption ? (
        <footer
          className="border-t border-white/10 px-4 py-3 text-sm text-white/85 md:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          {current.caption}
        </footer>
      ) : null}
    </div>
  );
}
