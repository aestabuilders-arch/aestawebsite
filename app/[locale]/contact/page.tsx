import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NAP, getPhoneLink, getMailtoLink, getWhatsAppLink } from '@/lib/constants/nap';
import { ContactForm } from './ContactForm';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/contact',
    title: 'Contact AESTA — Architects & Builders',
    description:
      'Get in touch with AESTA. Free consultation, no obligation. WhatsApp, phone, email, or contact form.',
  });
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">Contact us</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-700">
          Free consultation. No obligation. We typically respond within 24 hours during business
          days, or sooner via WhatsApp.
        </p>
      </header>

      <div className="my-12 grid gap-12 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xl font-bold text-charcoal-900">Send us a message</h2>
          <ContactForm />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-charcoal-900">Or reach us directly</h2>
          <ul className="space-y-4 text-neutral-700">
            <li>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                WhatsApp
              </p>
              <a
                href={getWhatsAppLink('Hi AESTA, I would like to discuss a project.')}
                className="text-lg text-terracotta-600 hover:underline"
              >
                {NAP.whatsapp}
              </a>
            </li>
            <li>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Phone</p>
              <a href={getPhoneLink()} className="text-lg text-terracotta-600 hover:underline">
                {NAP.phone}
              </a>
            </li>
            <li>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Email</p>
              <a href={getMailtoLink()} className="text-lg text-terracotta-600 hover:underline">
                {NAP.email}
              </a>
            </li>
            <li>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Service area
              </p>
              <p>
                {NAP.address.addressLocality}, {NAP.address.addressRegion}, India — and 16 more
                cities across Tamil Nadu.
              </p>
            </li>
          </ul>

          <div className="mt-8 rounded-lg bg-limestone-100 p-5 text-sm text-neutral-700">
            <p className="font-medium text-charcoal-900">Looking for a detailed quote?</p>
            <p className="mt-2">
              The quote form asks a few more questions and gets you a written estimate within 24
              hours.
            </p>
            <a
              href="/quote"
              className="mt-3 inline-block text-sm font-medium text-terracotta-600 hover:underline"
            >
              Go to quote form →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
