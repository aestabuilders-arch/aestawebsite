import type { MetadataRoute } from 'next';
import { NAP } from '@/lib/constants/nap';
import { locales, defaultLocale } from '@/i18n/config';

const STATIC_PATHS = ['/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const alternates = Object.fromEntries(
      locales.map((locale) => {
        const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
        return [locale, `${NAP.siteUrl}${localePrefix}${path === '/' ? '' : path}`];
      }),
    );
    for (const locale of locales) {
      const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${NAP.siteUrl}${localePrefix}${path === '/' ? '' : path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: path === '/' ? 1.0 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
