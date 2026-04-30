import Link from 'next/link';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { ProcessSteps } from '@/components/seo/ProcessSteps';
import { JsonLd } from '@/components/seo/JsonLd';
import { SERVICES, getService } from '@/lib/content/services';
import { NAP } from '@/lib/constants/nap';
import type { WithContext, Service } from 'schema-dts';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  const service = getService(slug);
  if (!service) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/services/${slug}`,
    title: `${service.name} — AESTA`,
    description: service.shortDescription,
  });
}

export default function ServicePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
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
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          {service.name}
        </h1>
        <p className="mt-4 text-xl text-neutral-700">{service.shortDescription}</p>
      </header>

      <section className="prose prose-neutral my-12 max-w-none">
        <p className="text-lg leading-relaxed text-neutral-700">{service.longDescription}</p>
      </section>

      <section className="my-12">
        <h2 className="mb-6 text-2xl font-bold text-charcoal-900">What&apos;s included</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {service.whatsIncluded.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-neutral-700">
              <span aria-hidden className="mt-0.5 text-terracotta-600">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <ProcessSteps name={`How ${service.name.toLowerCase()} works`} steps={service.process} />

      <section className="my-12 rounded-lg bg-limestone-100 p-6">
        <h2 className="mb-2 text-2xl font-bold text-charcoal-900">Pricing</h2>
        <p className="text-neutral-700">{service.pricingHint}</p>
        <Link
          href="/pricing"
          className="mt-3 inline-block text-sm font-medium text-terracotta-600 hover:underline"
        >
          See full pricing breakdown →
        </Link>
      </section>

      <FAQSection items={service.faqs} heading="Frequently asked questions" />

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to discuss {service.name.toLowerCase()}?</h2>
        <p className="mt-2 text-neutral-300">
          Free initial consultation. No obligation. Site visit if needed.
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
