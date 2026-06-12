import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LocationHero } from '@/components/seo/LocationHero';
import { FAQSection } from '@/components/seo/FAQSection';
import { SERVICES } from '@/lib/content/services';
import { getLocation, getLocationSlugs } from '@/lib/content/locations';

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  const city = getLocation(slug);
  if (!city) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/locations/${slug}`,
    title: `Builders in ${city.name} | Construction Company & Architects — AESTA`,
    description: `Design-build construction in ${city.name}, ${city.district} district. NIT Trichy architects, transparent per-sqft pricing, local soil and approval expertise. Free site visit.`,
  });
}

export default function LocationPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const city = getLocation(slug);
  if (!city) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Locations', href: '/locations' },
          { name: city.name, href: `/locations/${city.slug}` },
        ]}
      />

      <LocationHero
        cityName={city.name}
        cityNameTa={city.nameTa}
        citySlug={city.slug}
        lat={city.geo.lat}
        lng={city.geo.lng}
      />

      <section className="my-12">
        <p className="text-lg leading-relaxed text-neutral-700">{city.intro}</p>
      </section>

      <section className="my-12">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">Local context</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h3 className="font-semibold text-charcoal-900">Soil &amp; foundation</h3>
            <p className="mt-2 text-sm text-neutral-700">{city.soilNote}</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h3 className="font-semibold text-charcoal-900">Approvals</h3>
            <p className="mt-2 text-sm text-neutral-700">{city.approvalNote}</p>
          </div>
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">
          Services available in {city.name}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-md border border-neutral-200 bg-white p-4 hover:border-terracotta-600"
            >
              <p className="font-medium text-charcoal-900">{s.name}</p>
              <p className="mt-1 text-xs text-neutral-600">{s.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection items={city.faqs} heading={`FAQs — building in ${city.name}`} />

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Building in {city.name}?</h2>
        <p className="mt-2 text-neutral-300">
          Free site visit. Local materials sourced, local approvals handled.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
          >
            Get a free quote
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
