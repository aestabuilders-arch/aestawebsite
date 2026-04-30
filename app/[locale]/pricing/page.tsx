import Link from 'next/link';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { TIERS, SPEC_ROWS, PRICING_DISCLAIMERS } from '@/lib/content/pricing';
import { NAP } from '@/lib/constants/nap';
import type { WithContext, Product } from 'schema-dts';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/pricing',
    title: 'Pricing — AESTA Architects & Builders',
    description:
      'Transparent per-sqft construction rates across four tiers (Economy, Standard, Premium, Luxury). Full materials and finishes spec. Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur.',
  });
}

const CATEGORY_ORDER = [
  'Structural',
  'Flooring',
  'Doors & Windows',
  'Electrical',
  'Plumbing',
  'Painting',
  'Kitchen',
  'Services & Guarantees',
] as const;

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const productSchemas: WithContext<Product>[] = TIERS.map((tier) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `AESTA ${tier.name} construction tier`,
    description: tier.positioning,
    brand: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: tier.rateRange.min,
      highPrice: tier.rateRange.max,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Pricing', href: '/pricing' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Transparent pricing
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          Four spec tiers. Published rates. No hidden costs. Pick the tier that fits your budget; we
          tell you exactly what materials and finishes that gets you.
        </p>
      </header>

      <section className="my-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {TIERS.map((tier) => (
          <article
            key={tier.slug}
            className="flex flex-col rounded-lg border border-neutral-200 bg-white p-6"
          >
            <h2 className="text-2xl font-bold text-charcoal-900">{tier.name}</h2>
            <p className="mt-1 text-sm text-neutral-600">{tier.positioning}</p>
            <p className="mt-4 font-serif text-3xl font-bold text-terracotta-600">
              {tier.rateLabel}
            </p>
            <p className="mt-1 text-xs text-neutral-500">Built-up area</p>
            <p className="mt-4 text-sm text-neutral-700">
              <span className="font-medium">Best for: </span>
              {tier.targetClient}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {tier.highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span aria-hidden className="mt-0.5 text-terracotta-600">
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href="/quote"
                className="inline-flex w-full items-center justify-center rounded-md bg-terracotta-600 px-4 py-2 text-sm font-medium text-white hover:bg-terracotta-700"
              >
                Get quote at this tier
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="my-16">
        <h2 className="mb-2 text-3xl font-bold text-charcoal-900">Full specification comparison</h2>
        <p className="mb-8 text-neutral-700">
          Every line item, every tier. This is what you actually get for the price you pay.
        </p>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-limestone-100">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Item
                </th>
                {TIERS.map((tier) => (
                  <th key={tier.slug} scope="col" className="px-4 py-3 font-semibold">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORY_ORDER.map((category) => {
                const rows = SPEC_ROWS.filter((r) => r.category === category);
                if (rows.length === 0) return null;
                return [
                  <tr key={`${category}-h`} className="bg-limestone-50">
                    <th
                      scope="row"
                      colSpan={5}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600"
                    >
                      {category}
                    </th>
                  </tr>,
                  ...rows.map((row, i) => (
                    <tr key={`${category}-${i}`} className="border-t border-neutral-100">
                      <th scope="row" className="px-4 py-3 font-medium text-charcoal-900">
                        {row.item}
                      </th>
                      <td className="px-4 py-3 text-neutral-700">{row.economy}</td>
                      <td className="px-4 py-3 text-neutral-700">{row.standard}</td>
                      <td className="px-4 py-3 text-neutral-700">{row.premium}</td>
                      <td className="px-4 py-3 text-neutral-700">{row.luxury}</td>
                    </tr>
                  )),
                ];
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="my-12 rounded-lg bg-limestone-100 p-6">
        <h2 className="mb-3 text-lg font-semibold text-charcoal-900">Important disclaimers</h2>
        <ul className="space-y-2 text-sm text-neutral-700">
          {PRICING_DISCLAIMERS.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <span aria-hidden className="mt-0.5 text-neutral-500">
                •
              </span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Questions about pricing?</h2>
        <p className="mt-2 text-neutral-300">
          Tell us your plot size and tier preference. We&apos;ll send a detailed estimate within 24
          hours.
        </p>
        <Link
          href="/quote"
          className="mt-6 inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
        >
          Request a detailed quote
        </Link>
      </section>

      {productSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </div>
  );
}
