import Link from 'next/link';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/locations',
    title: 'Locations — AESTA serves 17 cities across Tamil Nadu',
    description:
      'AESTA Architects & Builders serves Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur, and 12 more cities across Tamil Nadu.',
  });
}

export default async function LocationsOverview({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: cities } = await supabase
    .from('cities')
    .select('slug, name, name_ta, tier, district')
    .order('tier', { ascending: true })
    .order('name', { ascending: true });

  const tier1 = (cities ?? []).filter((c) => c.tier === 1);
  const tier2 = (cities ?? []).filter((c) => c.tier === 2);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Locations', href: '/locations' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Where we build
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          Primary coverage in the Pudukkottai–Karaikudi belt of Tamil Nadu, with active projects and
          supply chains across 17 cities total. Same standard of work everywhere.
        </p>
      </header>

      <section className="my-12">
        <h2 className="mb-2 text-2xl font-bold text-charcoal-900">Primary cities</h2>
        <p className="mb-6 text-neutral-700">
          Full content pages with local soil, climate, regulatory notes.
        </p>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {tier1.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-terracotta-600"
            >
              <h3 className="font-semibold text-charcoal-900">{city.name}</h3>
              {city.district ? (
                <p className="mt-1 text-xs text-neutral-500">{city.district} district</p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-2 text-2xl font-bold text-charcoal-900">Also serving</h2>
        <p className="mb-6 text-neutral-700">
          We build in these cities too. Full pages coming soon — for now, ask us during your
          consultation.
        </p>
        <div className="flex flex-wrap gap-2">
          {tier2.map((city) => (
            <span
              key={city.slug}
              className="rounded-full bg-limestone-100 px-4 py-1 text-sm text-neutral-700"
            >
              {city.name}
            </span>
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
