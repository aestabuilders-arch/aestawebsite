'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/config';

const LOCALE_LABEL: Record<Locale, string> = {
  'en-IN': 'English',
  'ta-IN': 'தமிழ்',
};

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
        href={pathname}
        locale={alternate}
        className="text-terracotta-600 underline-offset-4 hover:underline"
        hrefLang={alternate}
      >
        {LOCALE_LABEL[alternate]}
      </Link>
    </div>
  );
}
