import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LOCATIONS } from '@/lib/content/locations';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/locations',
    title: 'Construction & Building Locations Across Tamil Nadu | AESTA',
    description:
      'AESTA Architects & Builders serves Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur, and 12 more cities across Tamil Nadu — each with a local soil, approvals and cost guide.',
  });
}

export default function LocationsOverview({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const tier1 = LOCATIONS.filter((c) => c.tier === 1);
  const tier2 = LOCATIONS.filter((c) => c.tier === 2);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Locations', href: '/locations' },
        ]}
      />

      <header className="my-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-terracotta-600">
          Where we build
        </p>
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Construction Company Serving Pudukkottai &amp; Tamil Nadu
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          Primary coverage in the Pudukkottai–Karaikudi belt of Tamil Nadu, with active projects and
          supply chains across 17 cities total. Same standard of work everywhere.
        </p>
      </header>

      <section className="my-12">
        <h2 className="mb-2 text-2xl font-bold text-charcoal-900">Primary cities</h2>
        <p className="mb-6 text-neutral-700">
          Full content pages with local soil, climate, approvals and cost notes.
        </p>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {tier1.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-terracotta-600"
            >
              <h3 className="font-semibold text-charcoal-900">{city.name}</h3>
              <p className="mt-1 text-xs text-neutral-500">{city.district} district</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-2 text-2xl font-bold text-charcoal-900">Also serving</h2>
        <p className="mb-6 text-neutral-700">
          We build across these towns too — each has its own page with local soil, approvals and a
          construction-cost answer.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tier2.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-terracotta-600"
            >
              <h3 className="font-medium text-charcoal-900">{city.name}</h3>
              <p className="mt-1 text-xs text-neutral-500">{city.district} district</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Don&apos;t see your city?</h2>
        <p className="mt-2 text-neutral-300">
          We expand based on demand. Tell us about your project — we may already be working nearby.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
