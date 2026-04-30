import { Link } from '@/i18n/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/projects',
    title: 'Projects — AESTA Architects & Builders',
    description:
      '100+ homes designed and built across Tamil Nadu since 2010. Residential, commercial, renovation, and turnkey projects.',
  });
}

export default async function ProjectsGallery({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: projects } = await supabase
    .from('projects')
    .select('id, slug, name, location, type, tier, built_up_sqft, floors, completion_date, status')
    .eq('status', 'completed')
    .order('display_order', { ascending: true })
    .order('completion_date', { ascending: false });

  const items = projects ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">Projects</h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          100+ homes designed and built across Tamil Nadu since 2010. We&apos;re photographing and
          documenting recent completions for the site — full case studies coming through 2026.
        </p>
      </header>

      {items.length === 0 ? (
        <section className="my-12 rounded-lg border border-dashed border-neutral-300 bg-limestone-50 p-12 text-center">
          <h2 className="text-xl font-semibold text-charcoal-900">Case studies coming soon</h2>
          <p className="mt-3 text-neutral-700">
            We&apos;re photographing and writing up recent completions. In the meantime, ask us
            during your consultation — we&apos;ll show you projects in your area and arrange site
            visits.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
          >
            Ask about projects in your area
          </Link>
        </section>
      ) : (
        <section className="my-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article key={p.id} className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold text-charcoal-900">
                <Link href={`/projects/${p.slug}`} className="hover:text-terracotta-600">
                  {p.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                {p.location} · {p.type} · {p.floors} · {p.built_up_sqft} sqft
              </p>
              {p.tier ? (
                <p className="mt-2 inline-block rounded bg-limestone-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide">
                  {p.tier}
                </p>
              ) : null}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
