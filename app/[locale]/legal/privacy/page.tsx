import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NAP, getMailtoLink } from '@/lib/constants/nap';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/legal/privacy',
    title: 'Privacy policy — AESTA Architects & Builders',
    description: 'How AESTA collects, uses, and protects your information.',
  });
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Privacy', href: '/legal/privacy' },
        ]}
      />

      <article className="prose prose-neutral my-8 max-w-none">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Privacy policy
        </h1>
        <p className="text-sm text-neutral-500">Last updated: 2026-04-30</p>

        <h2>What information we collect</h2>
        <p>
          When you submit our contact or quote forms, we collect the information you provide: name,
          phone number, email (optional), city, and any project details you share. We also log basic
          technical data (IP address, user agent, referring page) for security and analytics.
        </p>

        <h2>Why we collect it</h2>
        <ul>
          <li>To respond to your inquiry and provide a quote</li>
          <li>To follow up on active project conversations</li>
          <li>To send updates about your project (with your consent)</li>
          <li>To improve our services based on aggregate analytics</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>We do not sell your data. We share information only with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> we use to operate the site (Supabase for data
            storage, Vercel for hosting). These vendors are bound by contractual confidentiality.
          </li>
          <li>
            <strong>WhatsApp / phone networks</strong> if you contact us through those channels —
            standard telecom flow, no special data sharing on our part.
          </li>
          <li>
            <strong>Authorities</strong> if required by Indian law.
          </li>
        </ul>

        <h2>How long we keep it</h2>
        <p>
          Lead and project data is retained for the duration of the engagement plus 5 years for
          warranty and tax compliance. After that, we anonymize or delete personal identifiers.
        </p>

        <h2>Your rights</h2>
        <p>You can ask us to:</p>
        <ul>
          <li>See what information we hold about you</li>
          <li>Correct inaccuracies</li>
          <li>Delete your information (subject to legal retention requirements)</li>
          <li>Opt out of marketing follow-ups</li>
        </ul>
        <p>
          Email <a href={getMailtoLink()}>{NAP.email}</a> with your request and we&apos;ll respond
          within 30 days.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          Our site uses minimal cookies for session management. We may add privacy-respecting
          analytics in the future; we&apos;ll update this policy when we do.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as our services evolve. Material changes will be highlighted
          here with a new &ldquo;Last updated&rdquo; date.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions: <a href={getMailtoLink()}>{NAP.email}</a>
        </p>
      </article>
    </div>
  );
}
