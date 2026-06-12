'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ProjectThreeView } from '@/lib/content/projects';

type ThreeViewCompareProps = {
  views: ProjectThreeView;
  heading?: string;
};

type ViewKey = 'design' | 'render' | 'site';

const ORDER: ViewKey[] = ['design', 'render', 'site'];

const TAB_LABELS: Record<ViewKey, string> = {
  design: 'Design',
  render: 'Render',
  site: 'As Built',
};

const TAB_DESCRIPTIONS: Record<ViewKey, string> = {
  design: 'Design intent — elevation drawing',
  render: 'Rendered visualisation — design approval stage',
  site: 'As-built — finished construction on site',
};

const SWIPE_THRESHOLD = 40;

export function ThreeViewCompare({ views, heading }: ThreeViewCompareProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);

  const activeKey = ORDER[activeIndex];
  const activeView = views[activeKey];

  function go(delta: number) {
    setActiveIndex((i) => (i + delta + ORDER.length) % ORDER.length);
  }

  function handleTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % ORDER.length;
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + ORDER.length) % ORDER.length;
      setActiveIndex(prev);
      tabRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = ORDER.length - 1;
      setActiveIndex(last);
      tabRefs.current[last]?.focus();
    }
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    go(delta > 0 ? -1 : 1);
  }

  return (
    <section className="my-16">
      <header className="mb-6">
        <p className="text-sm font-medium uppercase tracking-wider text-terracotta-600">
          Concept → Render → Reality
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">
          {heading ?? 'See the building from drawing to door'}
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-700">
          Architecture is a conversation between intent and reality. Tap a tab — or swipe the image
          — to see the elevation we drew, the visualisation we approved with the client, and the
          building that stands today.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Compare design, render, and as-built views"
        className="flex flex-wrap gap-2 rounded-full bg-limestone-100 p-1.5 md:w-fit"
      >
        {ORDER.map((key, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={key}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              type="button"
              id={`compare-tab-${key}`}
              aria-selected={isActive}
              aria-controls={`compare-panel-${key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={[
                'min-h-[44px] flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 md:flex-none md:px-6',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2',
                isActive
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'text-charcoal-800 hover:bg-white/70',
              ].join(' ')}
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-[11px] font-semibold">
                {idx + 1}
              </span>
              {TAB_LABELS[key]}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`compare-panel-${activeKey}`}
        aria-labelledby={`compare-tab-${activeKey}`}
        className="mt-5"
      >
        <figure
          className="group relative touch-pan-y select-none overflow-hidden rounded-2xl bg-limestone-100 shadow-sm ring-1 ring-limestone-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[4/3] md:aspect-[16/10]">
            {ORDER.map((key, idx) => {
              const v = views[key];
              const isActive = idx === activeIndex;
              return (
                <Image
                  key={key}
                  src={v.src}
                  alt={v.alt}
                  fill
                  sizes="(min-width: 1024px) 1024px, (min-width: 768px) 90vw, 100vw"
                  priority={idx === 0}
                  className={[
                    'object-cover transition-opacity duration-500 ease-out',
                    isActive ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              );
            })}
            <span
              className="pointer-events-none absolute left-3 top-3 rounded-full bg-charcoal-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur"
              aria-hidden
            >
              {activeIndex + 1} of {ORDER.length} · {TAB_LABELS[activeKey]}
            </span>
          </div>

          <figcaption
            aria-live="polite"
            className="border-t border-limestone-200 bg-white px-4 py-4 md:px-6"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-terracotta-600">
              {TAB_DESCRIPTIONS[activeKey]}
            </p>
            {activeView.caption ? (
              <p className="mt-1 text-charcoal-800 md:text-lg">{activeView.caption}</p>
            ) : null}
          </figcaption>
        </figure>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" role="presentation" aria-hidden>
            {ORDER.map((_, idx) => (
              <span
                key={idx}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  idx === activeIndex ? 'w-6 bg-terracotta-600' : 'w-1.5 bg-limestone-200',
                ].join(' ')}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous view"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-limestone-200 bg-white text-charcoal-800 transition hover:border-terracotta-600 hover:text-terracotta-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next view"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-limestone-200 bg-white text-charcoal-800 transition hover:border-terracotta-600 hover:text-terracotta-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <ol className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
          {ORDER.map((key, idx) => {
            const v = views[key];
            const isActive = idx === activeIndex;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show ${TAB_LABELS[key]} view`}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'group relative block w-full overflow-hidden rounded-lg border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2',
                    isActive
                      ? 'border-terracotta-600'
                      : 'border-transparent opacity-70 hover:opacity-100',
                  ].join(' ')}
                >
                  <div className="relative aspect-[4/3] bg-limestone-100">
                    <Image
                      src={v.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 240px, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute bottom-1 left-1 rounded bg-charcoal-900/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                    {TAB_LABELS[key]}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
