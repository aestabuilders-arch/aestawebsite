import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SERVICES } from '@/lib/content/services';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/services',
    title: 'Services — AESTA Architects & Builders',
    description:
      'Eight construction and design services from AESTA — residential, commercial, architectural design, interior design, renovation, project management, 3D visualization, turnkey homes.',
  });
}

export default function ServicesOverview({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Eight services. One firm.
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          From standalone drawings to land-to-keys turnkey delivery. NIT Trichy-credentialed
          architects. 100+ completed projects since 2010.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((service) => (
          <article
            key={service.slug}
            className="rounded-lg border border-neutral-200 bg-white p-6 transition hover:border-terracotta-600"
          >
            <h2 className="text-xl font-semibold text-charcoal-900">
              <Link href={`/services/${service.slug}`} className="hover:text-terracotta-600">
                {service.name}
              </Link>
            </h2>
            <p className="mt-2 text-neutral-700">{service.shortDescription}</p>
            <p className="mt-3 text-sm text-neutral-500">{service.pricingHint}</p>
            <Link
              href={`/services/${service.slug}`}
              className="mt-4 inline-block text-sm font-medium text-terracotta-600 hover:underline"
            >
              Learn more →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-limestone-100 p-8 text-center">
        <h2 className="text-2xl font-bold">Not sure which service fits?</h2>
        <p className="mt-2 text-neutral-700">
          Tell us about your project. We&apos;ll suggest the right service and tier in 24 hours.
        </p>
        <Link
          href="/quote"
          className="mt-6 inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
        >
          Get a free quote
        </Link>
      </div>
    </div>
  );
}
