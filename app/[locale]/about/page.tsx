import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProcessSteps } from '@/components/seo/ProcessSteps';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/about',
    title: 'About AESTA — Architects & Builders since 2010',
    description:
      'NIT Trichy-credentialed architects in Pudukkottai. 100+ projects, 16 years of work, single-point design-build accountability. Part of the Neram ecosystem.',
  });
}

const VALUES = [
  {
    title: 'Sustainability',
    text: 'Low-carbon materials. Climate-responsive design. Buildings that last decades, not seasons.',
  },
  {
    title: 'Craft',
    text: 'NIT Trichy-trained eyes on every drawing. Senior engineers on every site. Quality where it matters.',
  },
  {
    title: 'Transparency',
    text: 'Pricing is published. Specs are detailed. Site updates are weekly. No surprises, by policy.',
  },
  {
    title: 'Accountability',
    text: 'Design and build under one contract. One team, one responsibility, one number to call.',
  },
];

const ENGAGEMENT_PROCESS = [
  { name: 'Initial consultation', text: 'Free site visit. We listen, you ask. No obligation.' },
  { name: 'Design proposal', text: 'Architectural concept + 3D walkthrough.' },
  { name: 'Detailed estimate', text: 'Itemized quote against your chosen tier.' },
  { name: 'Approvals', text: 'DTCP / panchayat clearances handled by us (where in scope).' },
  { name: 'Construction', text: 'Daily supervision, weekly reporting, transparent invoicing.' },
  { name: 'Handover', text: 'Walkthrough, defect close-out, warranty papers.' },
];

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">About AESTA</h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          Design-build architects working in the Pudukkottai–Karaikudi belt of Tamil Nadu since
          2010. NIT Trichy alumni. 100+ completed projects. Single-point accountability for design,
          structure, and construction.
        </p>
      </header>

      <section className="my-12">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">Our story</h2>
        <div className="prose prose-neutral max-w-none space-y-4 text-neutral-700">
          <p>
            AESTA started in 2010 with a simple observation: in our home district, qualified
            architects were rare, contractors were unaccountable, and clients were left to mediate
            between the two. The result was usually disappointing — over budget, over schedule,
            under-specified.
          </p>
          <p>
            We set out to fix this for one project at a time. NIT Trichy-trained architects doing
            the design. Senior civil engineers running the site. Material specs published up front.
            Pricing transparent. Single contract for everything.
          </p>
          <p>
            Sixteen years and 100+ projects later, the pattern has held. Most of our work comes from
            referrals — clients who saw a friend&apos;s home, asked who built it, and called us
            next. The website you&apos;re on is, in some ways, just a faster version of that
            referral conversation.
          </p>
          <p>
            AESTA is part of the Neram ecosystem — an educational and professional initiative
            building skilled work in Tamil Nadu&apos;s tier-2 and tier-3 cities.
          </p>
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-6 text-2xl font-bold text-charcoal-900">Our values</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <div key={i} className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-charcoal-900">{v.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-6 text-2xl font-bold text-charcoal-900">The team</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-charcoal-900">Hari Babu</h3>
            <p className="text-sm text-neutral-600">Founder, lead architect</p>
            <p className="mt-3 text-sm text-neutral-700">
              B.Arch, NIT Trichy 2011–2016. Founded AESTA in 2010 alongside an emerging
              architectural practice. Currently splits time between AESTA project oversight, Neram
              Classes (educational initiative), and architectural research.
            </p>
          </article>
          <article className="rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-charcoal-900">Civil engineer</h3>
            <p className="text-sm text-neutral-600">Site supervisor</p>
            <p className="mt-3 text-sm text-neutral-700">
              Daily site supervisor across active projects. Bio details available on request during
              your consultation.
            </p>
          </article>
        </div>
      </section>

      <ProcessSteps name="How we engage with clients" steps={ENGAGEMENT_PROCESS} />

      <section className="my-12 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Want to talk?</h2>
        <p className="mt-2 text-neutral-300">Free consultation. We come to you. No obligation.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
          >
            Contact us
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </div>
  );
}
