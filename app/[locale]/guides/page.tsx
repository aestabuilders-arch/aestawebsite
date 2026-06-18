import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { GUIDES } from '@/lib/content/guides';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/guides',
    title: 'House Construction Cost Guides — Tamil Nadu 2026 | AESTA',
    description:
      'Honest, itemised house construction cost guides for Pudukkottai, Karaikudi, Trichy, Thanjavur, Aranthangi and Tamil Nadu — per-sqft rates, worked examples and a free calculator.',
  });
}

export default function GuidesIndex({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const costGuides = GUIDES.filter((g) => (g.kind ?? 'cost') === 'cost');
  const topicGuides = GUIDES.filter((g) => g.kind === 'topic');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides' },
        ]}
      />

      <header className="my-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-terracotta-600">
          Construction cost guides
        </p>
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Construction Cost &amp; Planning Guides — Tamil Nadu 2026
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          Straight answers on what it costs to build in Tamil Nadu in 2026 — per-sqft rates by tier,
          worked examples and a calculator — plus plain-English guides to architect fees, the
          step-by-step build process, and choosing a builder. Written by the architects and
          engineers who do the building, not a lead-generation script.
        </p>
      </header>

      <section className="my-10">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">Cost guides</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {costGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block rounded-xl border border-limestone-200 bg-white p-6 transition hover:border-terracotta-600"
            >
              <h3 className="font-serif text-xl font-bold text-charcoal-900">{g.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{g.description}</p>
              <p className="mt-4 text-sm font-medium text-terracotta-600">Read the guide →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-10">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">Planning &amp; advice</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {topicGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block rounded-xl border border-limestone-200 bg-white p-6 transition hover:border-terracotta-600"
            >
              <h3 className="font-serif text-xl font-bold text-charcoal-900">{g.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{g.description}</p>
              <p className="mt-4 text-sm font-medium text-terracotta-600">Read the guide →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-12 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Want a number for your exact plot?</h2>
        <p className="mt-2 text-neutral-300">
          Tell us your plot size, floors and tier — itemised estimate within 24 hours.
        </p>
        <Link
          href="/quote"
          className="mt-6 inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
        >
          Get a free quote
        </Link>
      </section>
    </div>
  );
}
