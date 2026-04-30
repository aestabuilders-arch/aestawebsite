'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PRIMARY_NAV } from '@/lib/nav/primary-nav';

export function MobileMenu() {
  const tLayout = useTranslations('layout');
  const tNav = useTranslations('nav');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded text-charcoal-900 hover:bg-limestone-100 md:hidden"
      >
        <span className="sr-only">{open ? tLayout('closeMenu') : tLayout('openMenu')}</span>
        <span aria-hidden className="text-2xl leading-none">
          {open ? '✕' : '☰'}
        </span>
      </button>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="mobile"
          className="fixed inset-0 top-16 z-40 bg-limestone-50 p-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
