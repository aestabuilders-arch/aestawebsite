import type { Metadata } from 'next';
import { NAP } from '@/lib/constants/nap';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export type PageMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description?: string;
  /**
   * Absolute or root-relative image for OG/Twitter cards. When omitted, the
   * site-wide default from app/opengraph-image.tsx is used automatically.
   */
  ogImage?: string;
  ogType?: 'website' | 'article';
};

function buildLocaleUrl(locale: Locale, pathname: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const path = pathname === '/' ? '' : pathname;
  return `${NAP.siteUrl}${prefix}${path}`;
}

// next-intl locale codes (en-IN) → Open Graph locale codes (en_IN).
function ogLocale(locale: Locale): string {
  return locale.replace('-', '_');
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  ogImage,
  ogType = 'website',
}: PageMetadataInput): Metadata {
  const canonical = buildLocaleUrl(locale, pathname);
  const languages = Object.fromEntries(
    locales.map((l) => [l, buildLocaleUrl(l, pathname)]),
  ) as Record<Locale, string>;
  // x-default points at the canonical (default-locale) URL so search engines
  // know which version to serve when no language preference matches.
  const languagesWithDefault = {
    ...languages,
    'x-default': buildLocaleUrl(defaultLocale, pathname),
  };

  const images = ogImage ? [{ url: ogImage }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languagesWithDefault,
    },
    openGraph: {
      type: ogType,
      title,
      description,
      url: canonical,
      siteName: NAP.name,
      locale: ogLocale(locale),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
