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
    pathname: '/press',
    title: 'Press kit — AESTA Architects & Builders',
    description:
      'Press resources for AESTA: brand assets, founder bio, story angles, contact for journalists.',
  });
}

const STORY_ANGLES = [
  {
    title: 'NIT-credentialed architects in tier-3 cities',
    text: 'AESTA was founded in 2010 by a NIT Trichy-trained architect who chose to practice in Pudukkottai instead of metro centers. Story angle: skilled work returning to non-metro India.',
  },
  {
    title: 'Transparent pricing in an opaque industry',
    text: 'AESTA publishes detailed per-sqft rates and full materials specs across four tiers — rare in residential construction in Tamil Nadu. Story angle: market-disrupting transparency.',
  },
  {
    title: 'Bilingual + AI-citation strategy',
    text: 'AESTA is one of the first TN construction firms to publish substantial Tamil-language content and explicitly invite AI crawlers (GPTBot, ClaudeBot, PerplexityBot). Story angle: SEO/AEO playbook for regional services.',
  },
  {
    title: '100+ homes, single-point accountability',
    text: 'Most TN homeowners coordinate separate architects, contractors, and supervisors. AESTA does all three under one contract. Story angle: design-build vs. fragmented delivery.',
  },
];

export default function PressPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Press', href: '/press' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">Press kit</h1>
        <p className="mt-4 text-lg text-neutral-700">
          Resources for journalists, bloggers, and partners covering AESTA Architects &amp;
          Builders.
        </p>
      </header>

      <section className="my-12">
        <h2 className="mb-3 text-2xl font-bold text-charcoal-900">About AESTA</h2>
        <p className="text-neutral-700">
          AESTA is a design-build firm founded in 2010, operating in the Pudukkottai–Karaikudi belt
          of Tamil Nadu and serving 17 cities total. NIT Trichy-credentialed architects. 100+
          completed residential and commercial projects. Part of the Neram ecosystem — an
          educational and professional initiative building skilled work in tier-2/3 cities.
        </p>
      </section>

      <section className="my-12">
        <h2 className="mb-3 text-2xl font-bold text-charcoal-900">Founder</h2>
        <p className="text-neutral-700">
          Hari Babu, B.Arch (NIT Trichy, 2011–2016). Founded AESTA in 2010 and runs it alongside
          architectural research and Neram Classes (educational initiative).
        </p>
      </section>

      <section className="my-12">
        <h2 className="mb-3 text-2xl font-bold text-charcoal-900">Quick facts</h2>
        <ul className="space-y-2 text-neutral-700">
          <li>Founded: 2010</li>
          <li>Headquarters: Pudukkottai, Tamil Nadu</li>
          <li>Service area: 17 cities across Tamil Nadu</li>
          <li>Projects delivered: 100+</li>
          <li>
            Services: 8 (residential, commercial, architectural, interior, renovation, PM, 3D viz,
            turnkey)
          </li>
          <li>Pricing tiers: 4 (Economy, Standard, Premium, Luxury — ₹1,999 to ₹3,299+/sqft)</li>
        </ul>
      </section>

      <section className="my-12">
        <h2 className="mb-3 text-2xl font-bold text-charcoal-900">Story angles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {STORY_ANGLES.map((angle, i) => (
            <article key={i} className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-charcoal-900">{angle.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{angle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-3 text-2xl font-bold text-charcoal-900">Brand assets</h2>
        <p className="text-neutral-700">
          Wordmark logo, founder photo, and project photographs are available on request. Email us
          with your publication, deadline, and the assets you need.
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          Logo design is in progress; current branding is wordmark-only.
        </p>
      </section>

      <section className="my-12 rounded-lg bg-charcoal-900 p-8 text-white">
        <h2 className="text-xl font-bold">Press contact</h2>
        <p className="mt-2 text-neutral-300">
          For interviews, quotes, or asset requests, please email:
        </p>
        <a
          href={getMailtoLink()}
          className="mt-4 inline-block text-lg font-medium text-terracotta-600 hover:underline"
        >
          {NAP.email}
        </a>
        <p className="mt-3 text-sm text-neutral-400">We typically respond within 1 business day.</p>
      </section>
    </div>
  );
}
