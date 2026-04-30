import type { MetadataRoute } from 'next';
import { NAP } from '@/lib/constants/nap';
import { locales, defaultLocale, type Locale } from '@/i18n/config';
import { SERVICES } from '@/lib/content/services';

const TIER1_CITY_SLUGS = ['pudukkottai', 'karaikudi', 'aranthangi', 'trichy', 'thanjavur'];

const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
}[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/locations', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/quote', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/reviews', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/press', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/legal/privacy', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/legal/terms', priority: 0.3, changeFrequency: 'monthly' },
];

const SERVICE_PATHS = SERVICES.map((s) => ({
  path: `/services/${s.slug}`,
  priority: 0.8,
  changeFrequency: 'monthly' as const,
}));

const LOCATION_PATHS = TIER1_CITY_SLUGS.map((slug) => ({
  path: `/locations/${slug}`,
  priority: 0.8,
  changeFrequency: 'monthly' as const,
}));

const ALL_PATHS = [...STATIC_PATHS, ...SERVICE_PATHS, ...LOCATION_PATHS];

function buildLocaleUrl(locale: Locale, path: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const suffix = path === '/' ? '' : path;
  return `${NAP.siteUrl}${prefix}${suffix}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of ALL_PATHS) {
    const alternates = Object.fromEntries(
      locales.map((l) => [l, buildLocaleUrl(l, path)]),
    ) as Record<Locale, string>;

    for (const locale of locales) {
      entries.push({
        url: buildLocaleUrl(locale, path),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
