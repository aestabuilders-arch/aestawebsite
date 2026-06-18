import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { NAP } from '@/lib/constants/nap';
import type { WithContext, Service } from 'schema-dts';

// Trade-specific searches (tiling / electrical / plumbing / painting /
// waterproofing in {city}) are captured here and funnelled into the full
// design-build offer, rather than spun up as standalone trade pages.
const TRADES: { heading: string; body: string[] }[] = [
  {
    heading: 'Electrical wiring & fittings',
    body: [
      'Every AESTA home includes complete electrical work — concealed wiring, distribution boards, switches, points and fixtures — designed into the drawings from the start so power and lighting land where your furniture and appliances actually go. We use ISI-marked cable and reputed-brand modular switchgear, size the load for modern usage (ACs, geysers, kitchen appliances, inverter and solar readiness), and earth the installation properly for safety.',
      'Because the wiring layout is planned with the architecture, you avoid the chased walls and surface conduits that come from treating electrical as an afterthought. Electrical execution is part of our residential and commercial builds across Pudukkottai, Trichy, Thanjavur and the wider district.',
    ],
  },
  {
    heading: 'Tiling & flooring',
    body: [
      'Flooring and wall tiling are where a build shows its finish quality, and they are a major driver of the per-sqft rate. We lay vitrified tiles, ceramic, granite, marble and — for Chettinad homes around Karaikudi — athangudi tiles, with correct bedding, levels and joint spacing so floors stay sound and lippage-free.',
      'Bathroom and kitchen wall tiling is waterproofed beneath and finished to clean lines. We quote flooring against named materials and per-sqft rates so you choose the finish deliberately rather than discovering the cost later. Tiling is delivered as part of every AESTA build.',
    ],
  },
  {
    heading: 'Plumbing & sanitary',
    body: [
      'Our builds include the full plumbing system — concealed supply lines, drainage, soil and waste, overhead and underground tanks, and sanitary fixtures — laid out with the architectural and kitchen plans so nothing clashes. We use pressure-rated CPVC and UPVC pipework, slope drainage correctly, and pressure-test lines before concealing them, which is what prevents the leaks and dampness that plague poorly-built homes.',
      'Fixture choice (taps, WCs, wash basins, geysers) is specified by tier, and we plan for sump, borewell and septic tank as separate site-works items. Plumbing is executed in-house on projects across Pudukkottai and Tamil Nadu.',
    ],
  },
  {
    heading: 'Painting & finishing',
    body: [
      'Painting is the final finish that everyone sees, and it lasts only as well as the surface prep beneath it. We prepare walls properly — putty, primer and sanding — before applying interior emulsion and weatherproof exterior paint from reputed brands in your chosen shades. Texture finishes, accent walls and enamel on joinery and grilles are available by specification.',
      'Good paint on poorly-prepared walls fails within a season, so we treat prep as part of the job, not an extra. Painting and final finishing are included in every AESTA residential and commercial build, to the standard of your tier.',
    ],
  },
  {
    heading: 'Waterproofing',
    body: [
      'Waterproofing is the least visible and most under-budgeted trade — and the one that causes the most regret when skipped. We waterproof roofs, terraces, bathrooms, sunken slabs, water tanks and basements using appropriate membrane and chemical systems, and on coastal sites near Aranthangi we add salt-resistant treatment and enhanced cover against corrosion.',
      'Done at the right stage of construction, waterproofing is inexpensive insurance against the leaks, damp and reinforcement corrosion that shorten a building’s life. It is built into our specifications — included from the Premium tier upward, and available on every project — across Pudukkottai, Thanjavur, the delta and the coast.',
    ],
  },
];

const TRADE_FAQS = [
  {
    question: 'Do you take standalone tiling, electrical or plumbing jobs?',
    answer:
      'These trades are delivered as part of our full design-build and renovation projects, executed and warrantied in-house rather than as one-off contracts. If you are building or renovating with us, every trade above is included to your spec tier. For small standalone work, tell us the scope and we will advise.',
  },
  {
    question:
      'Are trades like electrical, plumbing and waterproofing included in the per-sqft rate?',
    answer:
      'Yes — electrical, plumbing, tiling and painting to your chosen tier are part of the construction rate. Waterproofing is included from the Premium tier and specified on coastal or flood-prone sites. Items like sump, borewell and septic tank are separate site works.',
  },
  {
    question: 'Which areas do you cover for trades and finishing?',
    answer:
      'We execute all building trades on our projects across Pudukkottai, Karaikudi, Trichy, Thanjavur, Aranthangi and the surrounding 17 cities in Tamil Nadu.',
  },
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/trades',
    title: 'Tiling, Electrical, Plumbing & Finishing — Pudukkottai & Tamil Nadu | AESTA',
    description:
      'Electrical wiring, tiling & flooring, plumbing, painting and waterproofing — executed in-house and warrantied as part of every AESTA build across Pudukkottai, Trichy, Thanjavur and Tamil Nadu.',
  });
}

export default function TradesPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const serviceSchema: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Building Trades & Finishes',
    serviceType: 'Electrical, tiling, plumbing, painting and waterproofing',
    description:
      'Electrical wiring, tiling and flooring, plumbing and sanitary, painting and waterproofing, executed in-house as part of AESTA design-build and renovation projects.',
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
          { name: 'Trades & Finishes', href: '/trades' },
        ]}
      />

      <header className="my-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-terracotta-600">
          Part of every AESTA build
        </p>
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Building Trades &amp; Finishes in Pudukkottai &amp; Tamil Nadu
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          Electrical wiring, tiling and flooring, plumbing and sanitary, painting and waterproofing
          — the finishing trades that make a house liveable and lasting. We deliver every one of
          them in-house as part of our design-build and renovation projects, planned into the
          drawings and warrantied to your spec tier, rather than sub-let to whoever is cheapest that
          week.
        </p>
      </header>

      {TRADES.map((trade) => (
        <section key={trade.heading} className="my-10">
          <h2 className="mb-3 text-2xl font-bold text-charcoal-900">{trade.heading}</h2>
          {trade.body.map((para, i) => (
            <p key={i} className="mt-3 leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </section>
      ))}

      <section className="my-10 rounded-lg bg-limestone-100 p-6">
        <h2 className="mb-2 text-xl font-bold text-charcoal-900">How these fit into your build</h2>
        <p className="text-neutral-700">
          Every trade above is coordinated under one accountable team, so you are not refereeing
          between an electrician, a plumber and a tiler. See how it comes together in{' '}
          <Link
            href="/services/residential-construction"
            className="font-medium text-terracotta-600 hover:underline"
          >
            residential construction
          </Link>{' '}
          and{' '}
          <Link
            href="/services/renovation"
            className="font-medium text-terracotta-600 hover:underline"
          >
            renovation
          </Link>
          , or see the full{' '}
          <Link href="/pricing" className="font-medium text-terracotta-600 hover:underline">
            per-tier pricing
          </Link>
          .
        </p>
      </section>

      <FAQSection items={TRADE_FAQS} heading="Frequently asked questions" />

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Building or renovating in Tamil Nadu?</h2>
        <p className="mt-2 text-neutral-300">
          Tell us your project — every trade above comes included, executed and warrantied in-house.
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
