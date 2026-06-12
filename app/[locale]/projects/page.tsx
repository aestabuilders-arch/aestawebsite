import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectsListJsonLd } from '@/components/projects/ProjectsListJsonLd';
import { PROJECTS } from '@/lib/content/projects';
import { NAP } from '@/lib/constants/nap';

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
      'Selected case studies of homes and apartments designed and built by AESTA across Tamil Nadu — drawings, renders, and as-built photography.',
  });
}

export default function ProjectsGallery({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const completed = PROJECTS.filter((p) => p.status !== 'coming-soon');
  const upcoming = PROJECTS.filter((p) => p.status === 'coming-soon');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
        ]}
      />

      <header className="my-10 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
          Selected work
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">
          Projects we&apos;ve drawn, built, and lived with.
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          A small set of case studies from 100+ homes designed and built across Tamil Nadu since
          2010. Each one is documented from elevation drawing through render to the building that
          stands today.
        </p>
      </header>

      {completed.length > 0 ? (
        <section aria-labelledby="completed-heading" className="mt-8">
          <h2 id="completed-heading" className="sr-only">
            Completed projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completed.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {upcoming.length > 0 ? (
        <section aria-labelledby="upcoming-heading" className="mt-14">
          <header className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
                In documentation
              </p>
              <h2
                id="upcoming-heading"
                className="mt-1 font-serif text-2xl font-bold text-charcoal-900 md:text-3xl"
              >
                Case studies publishing soon
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-neutral-600 md:block">
              We&apos;re photographing recent completions and writing the design narratives.
              Subscribe to be notified when these go live.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16 rounded-2xl bg-charcoal-900 p-8 text-center text-white md:p-12">
        <h2 className="font-serif text-2xl font-bold md:text-3xl">
          Looking for projects in your area?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Tell us where you&apos;re building. We&apos;ll show you projects nearby and arrange a site
          visit if you want to walk one before deciding.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-terracotta-700"
          >
            Ask about projects in your area
          </Link>
          <Link
            href="/quote"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Get a free quote
          </Link>
        </div>
      </section>

      <ProjectsListJsonLd projects={PROJECTS} pageUrl={`${NAP.siteUrl}/projects`} />
    </div>
  );
}
