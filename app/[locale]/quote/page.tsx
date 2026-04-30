import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { QuoteForm } from './QuoteForm';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/quote',
    title: 'Get a free quote — AESTA Architects & Builders',
    description:
      'Tell us about your project — plot size, tier, timeline. Detailed estimate within 24 hours. No obligation.',
  });
}

export default function QuotePage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Get a quote', href: '/quote' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Get a free quote
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          Tell us about your project. We&apos;ll send a detailed written estimate within 24 hours.
          No obligation, no pressure — just transparent pricing for your specific project.
        </p>
      </header>

      <section className="my-8 rounded-lg border border-neutral-200 bg-white p-6 md:p-8">
        <QuoteForm />
      </section>

      <section className="my-8 rounded-lg bg-limestone-100 p-5 text-sm text-neutral-700">
        <p className="font-medium text-charcoal-900">What happens next?</p>
        <ol className="mt-3 list-inside list-decimal space-y-2">
          <li>You submit this form (1 minute).</li>
          <li>We review and respond by WhatsApp or call within 24 hours.</li>
          <li>Free site visit if needed (typically within a week for nearby cities).</li>
          <li>Detailed written estimate against your chosen spec tier.</li>
          <li>You decide. No pressure either way.</li>
        </ol>
      </section>
    </div>
  );
}
