import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { CostCalculator } from '@/components/guides/CostCalculator';
import { GUIDES, getGuide, getGuideSlugs } from '@/lib/content/guides';
import { getLocation } from '@/lib/content/locations';
import { TIERS, PRICING_DISCLAIMERS } from '@/lib/content/pricing';
import { NAP } from '@/lib/constants/nap';
import type { WithContext, Article } from 'schema-dts';

// Built-up sizes used for the worked-cost table on every guide.
const EXAMPLE_SQFT = [800, 1200, 1500, 2400];

function formatLakh(rupees: number): string {
  return `₹${(rupees / 100000).toFixed(1)}L`;
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/guides/${slug}`,
    title: guide.seoTitle,
    description: guide.description,
    ogType: 'article',
  });
}

export default function GuidePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const guide = getGuide(slug);
  if (!guide) notFound();

  const city = guide.citySlug ? getLocation(guide.citySlug) : null;
  const pageUrl = `${NAP.siteUrl}/guides/${slug}`;

  const articleSchema: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: `${guide.updated}-01`,
    dateModified: `${guide.updated}-01`,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides' },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          By AESTA Architects &amp; Builders · last reviewed {guide.updated}
        </p>
        <p className="mt-5 text-lg leading-relaxed text-neutral-700">{guide.intro}</p>
      </header>

      {/* Rate card — single source of truth is lib/content/pricing.ts */}
      <section className="my-10">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">2026 rate by tier</h2>
        <div className="overflow-x-auto rounded-lg border border-limestone-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-limestone-100 text-charcoal-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Tier</th>
                <th className="px-4 py-3 font-semibold">Per sqft</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((t) => (
                <tr key={t.slug} className="border-t border-limestone-200">
                  <td className="px-4 py-3 font-medium text-charcoal-900">{t.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-700">{t.rateLabel}</td>
                  <td className="px-4 py-3 text-neutral-600">{t.targetClient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm">
          <Link href="/pricing" className="font-medium text-terracotta-600 hover:underline">
            See the full line-by-line spec for every tier →
          </Link>
        </p>
      </section>

      {/* Interactive calculator */}
      <section className="my-10">
        <CostCalculator />
      </section>

      {/* Worked examples computed from the tier rates */}
      <section className="my-10">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">Worked cost examples</h2>
        <p className="mb-4 text-sm text-neutral-600">
          Total construction cost (built-up area × tier rate). Excludes land, approvals, compound
          wall, sump, borewell and interiors.
        </p>
        <div className="overflow-x-auto rounded-lg border border-limestone-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-limestone-100 text-charcoal-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Built-up area</th>
                {TIERS.map((t) => (
                  <th key={t.slug} className="px-4 py-3 font-semibold">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_SQFT.map((area) => (
                <tr key={area} className="border-t border-limestone-200">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-charcoal-900">
                    {area.toLocaleString('en-IN')} sqft
                  </td>
                  {TIERS.map((t) => (
                    <td key={t.slug} className="whitespace-nowrap px-4 py-3 text-neutral-700">
                      {formatLakh(area * t.rateRange.min)} – {formatLakh(area * t.rateRange.max)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* City- or topic-specific prose — kept unique per guide */}
      {guide.sections.map((section) => (
        <section key={section.heading} className="my-10">
          <h2 className="mb-4 text-2xl font-bold text-charcoal-900">{section.heading}</h2>
          {section.body.map((para, i) => (
            <p key={i} className="mt-3 leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </section>
      ))}

      {/* What the rate excludes */}
      <section className="my-10 rounded-lg border border-limestone-200 bg-limestone-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-charcoal-900">What the rate excludes</h2>
        <ul className="space-y-2 text-sm text-neutral-700">
          {PRICING_DISCLAIMERS.map((d) => (
            <li key={d} className="flex gap-2">
              <span aria-hidden className="text-terracotta-600">
                •
              </span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <FAQSection items={guide.faqs} heading="Frequently asked questions" />

      {/* CTA + internal links */}
      <section className="my-12 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">
          {city ? `Get a real number for your ${city.name} plot` : 'Get a real number for your plot'}
        </h2>
        <p className="mt-2 text-neutral-300">
          Share your plot size and tier — we return an itemised estimate within 24 hours. Free site
          visit included.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
          >
            Get a free quote
          </Link>
          {city ? (
            <Link
              href={`/locations/${city.slug}`}
              className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Building in {city.name}?
            </Link>
          ) : (
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              See full pricing
            </Link>
          )}
        </div>
      </section>

      {/* Related guides */}
      <section className="my-10">
        <h2 className="mb-4 text-xl font-bold text-charcoal-900">More cost guides</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {GUIDES.filter((g) => g.slug !== slug)
            .slice(0, 4)
            .map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-lg border border-limestone-200 bg-white p-4 transition hover:border-terracotta-600"
                >
                  <span className="font-medium text-charcoal-900">{g.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <JsonLd data={articleSchema} />
    </article>
  );
}
