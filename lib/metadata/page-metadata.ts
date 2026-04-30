import type { Metadata } from 'next';
import { NAP } from '@/lib/constants/nap';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export type PageMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description?: string;
};

function buildLocaleUrl(locale: Locale, pathname: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const path = pathname === '/' ? '' : pathname;
  return `${NAP.siteUrl}${prefix}${path}`;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: PageMetadataInput): Metadata {
  const canonical = buildLocaleUrl(locale, pathname);
  const languages = Object.fromEntries(
    locales.map((l) => [l, buildLocaleUrl(l, pathname)]),
  ) as Record<Locale, string>;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
  };
}
