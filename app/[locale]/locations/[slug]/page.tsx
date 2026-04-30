import Link from 'next/link';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LocationHero } from '@/components/seo/LocationHero';
import { FAQSection } from '@/components/seo/FAQSection';
import { createClient } from '@/utils/supabase/server';
import { SERVICES } from '@/lib/content/services';

const TIER1_SLUGS = ['pudukkottai', 'karaikudi', 'aranthangi', 'trichy', 'thanjavur'] as const;

export function generateStaticParams() {
  return TIER1_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: city } = await supabase
    .from('cities')
    .select('slug, name')
    .eq('slug', slug)
    .maybeSingle();

  if (!city) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/locations/${slug}`,
    title: `Construction in ${city.name} — AESTA Architects & Builders`,
    description: `Design-build construction in ${city.name}. NIT Trichy architects, transparent pricing, single-point accountability. Local soil, climate, and regulatory expertise.`,
  });
}

const CITY_BLURBS: Record<
  string,
  { intro: string; soilNote: string; faqs: { question: string; answer: string }[] }
> = {
  pudukkottai: {
    intro:
      'Pudukkottai is our home district. We have built more homes here than anywhere else — soil, climate, regulations, and material supply chains are second nature to us.',
    soilNote:
      'Pudukkottai soil is largely lateritic with red-soil pockets. Foundations typically need stepped footing on slopes; soil-test recommended for plots over 2400 sqft.',
    faqs: [
      {
        question: 'How long does construction take in Pudukkottai?',
        answer:
          'A 1500 sqft G+1 home typically takes 7–10 months. Monsoon (October–December) can add 2–4 weeks if foundation work overlaps.',
      },
      {
        question: 'Do you handle DTCP approvals in Pudukkottai?',
        answer:
          'Yes. We have the panchayat / DTCP relationships in Pudukkottai town and surrounding panchayats — typical approval cycle is 4–8 weeks.',
      },
    ],
  },
  karaikudi: {
    intro:
      'Karaikudi clients often want Chettinad-style proportions with modern services. We balance heritage influences (large halls, courtyards, period-correct details) with contemporary structural and electrical standards.',
    soilNote:
      'Karaikudi has predominantly sandy loam soils. Foundations are straightforward; deep raft is rarely needed below 2 storeys.',
    faqs: [
      {
        question: 'Can you build a modern Chettinad-style house in Karaikudi?',
        answer:
          'Yes — this is one of our specialties. We work with you to balance heritage proportions and details with modern services and earthquake-resistant structure.',
      },
      {
        question: 'How is Karaikudi different from Pudukkottai construction?',
        answer:
          'Plots tend to be larger (3000+ sqft is common), expectations on craft are higher, and clients often have NRI links — so we often coordinate by video on key decisions.',
      },
    ],
  },
  aranthangi: {
    intro:
      'Aranthangi covers a coastal–interior mix. We work in town and across surrounding villages. Material supply runs from Pudukkottai/Trichy; we factor lead times into the schedule.',
    soilNote:
      'Aranthangi soil is variable — sandy near the coast, clay-rich inland. Soil test is strongly recommended for plots over 1500 sqft.',
    faqs: [
      {
        question: 'Do you build in coastal Aranthangi villages?',
        answer:
          'Yes. We pay extra attention to corrosion-resistant fittings and waterproofing on coastal sites; this is included in our Premium and Luxury tiers.',
      },
    ],
  },
  trichy: {
    intro:
      'Trichy is the regional centre. Many of our clients are professionals working in Trichy who want to build family homes here or in nearby districts. Approvals through TCP (Town Country Planning) are well-understood.',
    soilNote:
      'Trichy has rocky / hard-stratum sites in some pockets. Excavation cost can vary by location; we survey before quoting.',
    faqs: [
      {
        question: 'Can you build in central Trichy and the suburbs?',
        answer:
          'Yes. We build across Trichy city and the surrounding panchayats including Srirangam, Thiruverumbur, Lalgudi.',
      },
    ],
  },
  thanjavur: {
    intro:
      'Thanjavur is rich with traditional building knowledge. Many sites carry heritage considerations or proximity-to-temple rules. We respect those and integrate them with modern engineering.',
    soilNote:
      'Thanjavur sits in alluvial plains. Bearing capacity is generally fine; flood-risk awareness is important on low-lying plots near the Cauvery.',
    faqs: [
      {
        question: 'Are there special rules near temples in Thanjavur?',
        answer:
          'Some plots fall under archaeological / heritage proximity rules. We check before scoping; in restricted zones we adjust massing and finishes accordingly.',
      },
    ],
  },
};

export default async function LocationPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: city } = await supabase.from('cities').select('*').eq('slug', slug).maybeSingle();
  if (!city) notFound();

  const blurb = CITY_BLURBS[slug];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Locations', href: '/locations' },
          { name: city.name, href: `/locations/${city.slug}` },
        ]}
      />

      {city.geo_lat && city.geo_lng ? (
        <LocationHero
          cityName={city.name}
          cityNameTa={city.name_ta ?? undefined}
          citySlug={city.slug}
          lat={Number(city.geo_lat)}
          lng={Number(city.geo_lng)}
        />
      ) : (
        <header className="my-8">
          <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
            AESTA — Building in {city.name}
          </h1>
          <p className="mt-3 text-lg text-neutral-700">since 2010</p>
        </header>
      )}

      {blurb ? (
        <section className="my-12">
          <p className="text-lg leading-relaxed text-neutral-700">{blurb.intro}</p>
        </section>
      ) : null}

      <section className="my-12">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">Local context</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h3 className="font-semibold text-charcoal-900">Soil & foundation</h3>
            <p className="mt-2 text-sm text-neutral-700">
              {blurb?.soilNote ?? 'Soil context for this city: ask us during your consultation.'}
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h3 className="font-semibold text-charcoal-900">Approvals</h3>
            <p className="mt-2 text-sm text-neutral-700">
              We handle DTCP / panchayat approval coordination in {city.name} as part of turnkey
              packages, and as an add-on for other engagements.
            </p>
          </div>
        </div>
      </section>

      <section className="my-12">
        <h2 className="mb-4 text-2xl font-bold text-charcoal-900">
          Services available in {city.name}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-md border border-neutral-200 bg-white p-4 hover:border-terracotta-600"
            >
              <p className="font-medium text-charcoal-900">{s.name}</p>
              <p className="mt-1 text-xs text-neutral-600">{s.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      {blurb?.faqs ? <FAQSection items={blurb.faqs} heading={`FAQs — ${city.name}`} /> : null}

      <section className="my-16 rounded-lg bg-charcoal-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Building in {city.name}?</h2>
        <p className="mt-2 text-neutral-300">
          Free site visit. Local materials sourced, local approvals handled.
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
    </div>
  );
}
