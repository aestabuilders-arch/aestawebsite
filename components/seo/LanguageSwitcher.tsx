'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

const LOCALE_LABEL: Record<Locale, string> = {
  'en-IN': 'English',
  'ta-IN': 'தமிழ்',
};

function buildAlternateHref(pathname: string, currentLocale: Locale, alternate: Locale): string {
  // Strip the current locale prefix (if it appears in the URL — only non-default locales do).
  const prefixRegex = new RegExp(`^/${currentLocale}(/|$)`);
  const stripped = pathname.replace(prefixRegex, '/');
  const normalized = stripped.startsWith('/') ? stripped : `/${stripped}`;

  // localePrefix is 'as-needed': default locale has NO prefix; others get /<locale>.
  if (alternate === defaultLocale) {
    return normalized;
  }
  return `/${alternate}${normalized === '/' ? '' : normalized}`;
}

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const alternate = locales.find((l) => l !== currentLocale) as Locale;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span aria-current="true" className="font-medium">
        {LOCALE_LABEL[currentLocale]}
      </span>
      <span aria-hidden className="text-neutral-400">
        ·
      </span>
      <Link
        href={buildAlternateHref(pathname, currentLocale, alternate)}
        className="text-terracotta-600 underline-offset-4 hover:underline"
        hrefLang={alternate}
      >
        {LOCALE_LABEL[alternate]}
      </Link>
    </div>
  );
}
