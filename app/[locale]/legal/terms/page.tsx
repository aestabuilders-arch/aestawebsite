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
    pathname: '/legal/terms',
    title: 'Terms of use — AESTA Architects & Builders',
    description: 'Terms of using the AESTA website and submitting contact or quote forms.',
  });
}

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Terms', href: '/legal/terms' },
        ]}
      />

      <article className="prose prose-neutral my-8 max-w-none">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Terms of use
        </h1>
        <p className="text-sm text-neutral-500">Last updated: 2026-04-30</p>

        <h2>Website content</h2>
        <p>
          The AESTA website provides general information about our services, pricing tiers, and
          coverage areas. Pricing on the site is indicative — every project gets a specific written
          quote based on site conditions, design complexity, and material choices. Final terms are
          governed by the signed contract for each engagement, not by website content.
        </p>

        <h2>Accuracy of pricing</h2>
        <p>
          Per-sqft rates published on this site are valid for projects signed in the calendar year
          shown on the pricing page. Rates may be revised; the contract you sign is the binding rate
          for your project.
        </p>

        <h2>Form submissions</h2>
        <p>
          Submitting a contact or quote form is a request for a follow-up conversation, not a
          contract. AESTA is not obligated to take on every inquiry; we&apos;ll let you know within
          24 hours if we cannot serve your project (capacity, location, scope mismatch).
        </p>

        <h2>Intellectual property</h2>
        <p>
          Photographs, drawings, and written content on this site are owned by AESTA or used with
          permission. Please don&apos;t reproduce them without asking. The AESTA name and wordmark
          are trademarks of the AESTA practice.
        </p>

        <h2>Third-party content</h2>
        <p>
          We embed maps from OpenStreetMap and videos from YouTube. Those services have their own
          terms; this policy doesn&apos;t override them.
        </p>

        <h2>Liability</h2>
        <p>
          Information on this site is provided in good faith but as-is. For decisions about your
          project, rely on the formal proposal and signed contract — not on the website. AESTA is
          not liable for losses arising solely from website content.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Disputes are subject to the jurisdiction of
          courts in Pudukkottai, Tamil Nadu, unless otherwise agreed in a specific project contract.
        </p>

        <h2>Updates</h2>
        <p>
          We may update these terms as our services evolve. Material changes will be highlighted
          here with a new &ldquo;Last updated&rdquo; date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={getMailtoLink()}>{NAP.email}</a>
        </p>
      </article>
    </div>
  );
}
