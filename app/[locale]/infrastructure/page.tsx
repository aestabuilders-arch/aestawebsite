import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { EquipmentShowcase } from '@/components/equipment/EquipmentShowcase';
import {
  EQUIPMENT_CATEGORIES,
  INFRASTRUCTURE_BENEFITS,
  OWNERSHIP_INTRO,
} from '@/lib/content/equipment';
import { NAP } from '@/lib/constants/nap';
import type { WithContext, Service } from 'schema-dts';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/infrastructure',
    title: 'Construction Equipment & Infrastructure We Own | AESTA',
    description:
      'AESTA owns its core construction plant — excavation, concrete, formwork, lifting, finishing tools and site logistics — so builds across Pudukkottai and Tamil Nadu run on schedule, without rental markups.',
  });
}

export default function InfrastructurePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const serviceSchema: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Design-build construction with owned plant & equipment',
    serviceType: 'Construction with in-house plant and machinery',
    description:
      'AESTA owns its core construction equipment — earthwork, concrete, formwork, lifting, finishing tools and site logistics — and operates it with its own crews, rather than renting per job.',
    provider: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
    areaServed: NAP.areaServed.map((c) => ({ '@type': 'City' as const, name: c.name })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Infrastructure', href: '/infrastructure' },
        ]}
      />

      <header className="my-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-terracotta-600">
          What sets our sites apart
        </p>
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Construction equipment &amp; infrastructure we own
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">{OWNERSHIP_INTRO}</p>
      </header>

      <EquipmentShowcase benefits={INFRASTRUCTURE_BENEFITS} categories={EQUIPMENT_CATEGORIES} />

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Building with a self-sufficient team</h2>
        <p className="mt-2 text-neutral-300">
          Owned plant, in-house crews, single-point accountability. Tell us your project and we will
          show you how it comes together.
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

      <JsonLd data={serviceSchema} />
    </div>
  );
}
