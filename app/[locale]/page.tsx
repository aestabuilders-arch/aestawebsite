import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { ProcessSteps } from '@/components/seo/ProcessSteps';
import { FAQSection } from '@/components/seo/FAQSection';
import { SERVICES } from '@/lib/content/services';
import { TIERS } from '@/lib/content/pricing';
import { NAP, getWhatsAppLink, getPhoneLink } from '@/lib/constants/nap';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/',
    title: 'AESTA — Architects & Builders | Pudukkottai, Karaikudi, Trichy',
    description:
      'Design-build firm by NIT Trichy architects. 100+ homes since 2010. Transparent pricing across 4 tiers. Serving 17 cities in Tamil Nadu.',
  });
}

const HOMEPAGE_PROCESS = [
  { name: 'Consult', text: 'Free site visit. We listen, you brief us.' },
  { name: 'Design', text: 'Architectural plans, 3D walkthrough, structural drawings.' },
  { name: 'Estimate', text: 'Itemized quote against your chosen spec tier.' },
  { name: 'Approve', text: 'DTCP/panchayat approvals — handled by our team.' },
  { name: 'Break ground', text: 'Foundation, structure, brickwork.' },
  { name: 'Build', text: 'Daily site supervision, photo updates, transparent reporting.' },
  { name: 'Quality check', text: 'Senior engineer sign-off before each milestone.' },
  { name: 'Handover', text: 'Walkthrough, snag close-out, warranty papers.' },
];

const WHY_AESTA = [
  {
    title: 'Qualified architects',
    text: 'NIT Trichy alumni. Rare in this market — most builders are unqualified.',
  },
  {
    title: 'Transparent pricing',
    text: 'Four spec tiers, every line item published. No hidden costs.',
  },
  {
    title: 'Single accountability',
    text: 'Design + build under one roof. One number to call. No finger-pointing.',
  },
  {
    title: 'Sustainable materials',
    text: 'Low-carbon, low-maintenance. Better for your home, better for the climate.',
  },
];

const HOMEPAGE_FAQS = [
  {
    question: 'How much does a 1500 sqft G+1 house cost in 2026?',
    answer:
      'Approximately ₹31–48 lakh in our spec tiers (Economy ₹2,099/sqft to Luxury ₹3,299+/sqft) for built-up area. Excludes land, DTCP fees, compound wall, and interiors.',
  },
  {
    question: 'Where do you build?',
    answer:
      'Primary: Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur. Also: Keeranur, Thirumayam, Alangudi, Viralimalai, Gandarvakottai, Avudaiyarkoil, Sivaganga, Devakottai, and Chennai. 17 cities in total.',
  },
  {
    question: 'How long does construction take?',
    answer: 'A 1500 sqft house typically takes 7–10 months from foundation to handover.',
  },
  {
    question: 'Do you handle DTCP approvals?',
    answer: 'Yes — included in turnkey packages and available as an add-on for other engagements.',
  },
];

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);
  const t = useTranslations('meta');
  const tNav = useTranslations('nav');

  const tier1Cities = NAP.areaServed.filter((c) => c.tier === 1);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-limestone-100 to-limestone-50 py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-terracotta-600">
            Design-build · Since 2010 · NIT Trichy architects
          </p>
          <h1 className="font-serif text-5xl font-bold text-charcoal-900 md:text-7xl">
            {t('tagline')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-700">
            Design-build homes by NIT Trichy architects. 16 years. 100+ projects. Pudukkottai to
            Chennai.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex w-full items-center justify-center rounded-md bg-terracotta-600 px-8 py-4 text-base font-medium text-white hover:bg-terracotta-700 sm:w-auto"
            >
              Get a free quote
            </Link>
            <a
              href={getWhatsAppLink('Hi AESTA, I would like to discuss a project.')}
              className="inline-flex w-full items-center justify-center rounded-md border border-charcoal-900 px-8 py-4 text-base font-medium text-charcoal-900 hover:bg-charcoal-900 hover:text-white sm:w-auto"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="border-y border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <ul className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <li>
              <div className="font-serif text-3xl font-bold text-charcoal-900">2010</div>
              <div className="mt-1 text-sm text-neutral-600">Founded</div>
            </li>
            <li>
              <div className="font-serif text-3xl font-bold text-charcoal-900">100+</div>
              <div className="mt-1 text-sm text-neutral-600">Projects delivered</div>
            </li>
            <li>
              <div className="font-serif text-3xl font-bold text-charcoal-900">NIT</div>
              <div className="mt-1 text-sm text-neutral-600">Trichy alumni</div>
            </li>
            <li>
              <div className="font-serif text-3xl font-bold text-charcoal-900">17</div>
              <div className="mt-1 text-sm text-neutral-600">Cities served</div>
            </li>
          </ul>
        </div>
      </section>

      {/* Featured projects — empty state */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">
              Featured projects
            </h2>
            <p className="mt-2 text-neutral-700">Recent homes we&apos;ve designed and built.</p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-terracotta-600 hover:underline md:block"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 rounded-lg border border-dashed border-neutral-300 bg-limestone-50 p-12 text-center">
          <p className="text-neutral-600">
            Project case studies coming soon. We&apos;re photographing recent completions for the
            site.
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            In the meantime, ask us during your consultation — we&apos;ll show you projects in your
            area.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-limestone-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">
            {tNav('services')}
          </h2>
          <p className="mt-2 text-neutral-700">
            Eight services. One firm. Single-point accountability.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-terracotta-600"
              >
                <h3 className="font-semibold text-charcoal-900">{s.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">
          Transparent pricing
        </h2>
        <p className="mt-2 text-neutral-700">
          Four tiers. Published rates. Pick the spec that fits your budget.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {TIERS.map((tier) => (
            <article key={tier.slug} className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-charcoal-900">{tier.name}</h3>
              <p className="mt-1 text-xs text-neutral-600">{tier.positioning}</p>
              <p className="mt-3 font-serif text-xl font-bold text-terracotta-600">
                {tier.rateLabel}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/pricing"
          className="mt-6 inline-block text-sm font-medium text-terracotta-600 hover:underline"
        >
          See full pricing breakdown →
        </Link>
      </section>

      {/* How we work */}
      <section className="bg-limestone-50 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <ProcessSteps name="How we work" steps={HOMEPAGE_PROCESS} />
        </div>
      </section>

      {/* Why AESTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">Why AESTA</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY_AESTA.map((w, i) => (
            <div key={i}>
              <h3 className="font-semibold text-charcoal-900">{w.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="bg-limestone-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">
            Cities we serve
          </h2>
          <p className="mt-2 text-neutral-700">
            Primary coverage in the Pudukkottai–Karaikudi belt, plus 12 more across Tamil Nadu.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {tier1Cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="rounded-md border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-medium hover:border-terracotta-600"
              >
                {city.name}
              </Link>
            ))}
          </div>
          <Link
            href="/locations"
            className="mt-6 inline-block text-sm font-medium text-terracotta-600 hover:underline"
          >
            See all 17 cities →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <FAQSection items={HOMEPAGE_FAQS} heading="Common questions" />
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal-900 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to build your dream home?
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Free consultation. No obligation. We&apos;ll come to you, listen, and propose options.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex w-full items-center justify-center rounded-md bg-terracotta-600 px-8 py-4 text-base font-medium text-white hover:bg-terracotta-700 sm:w-auto"
            >
              Get a free quote
            </Link>
            <a
              href={getWhatsAppLink('Hi AESTA, I would like to discuss a project.')}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/30 px-8 py-4 text-base font-medium text-white hover:bg-white/10 sm:w-auto"
            >
              WhatsApp us
            </a>
            <a
              href={getPhoneLink()}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/30 px-8 py-4 text-base font-medium text-white hover:bg-white/10 sm:w-auto"
            >
              Call us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
