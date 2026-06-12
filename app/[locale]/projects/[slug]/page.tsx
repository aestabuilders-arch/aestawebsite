import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectFacts } from '@/components/projects/ProjectFacts';
import { CaseStudyBody } from '@/components/projects/CaseStudyBody';
import { ThreeViewCompare } from '@/components/projects/ThreeViewCompare';
import { ConstructionGallery } from '@/components/projects/ConstructionGallery';
import { ComingSoonState } from '@/components/projects/ComingSoonState';
import { ProjectCTA } from '@/components/projects/ProjectCTA';
import { ProjectJsonLd } from '@/components/projects/ProjectJsonLd';
import { PROJECTS, getProject, getProjectSlugs } from '@/lib/content/projects';
import { NAP } from '@/lib/constants/nap';

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  const project = getProject(slug);
  if (!project) return {};

  const base = buildPageMetadata({
    locale: locale as Locale,
    pathname: `/projects/${slug}`,
    title:
      project.seo?.title ?? `${project.name} — Project case study | AESTA Architects & Builders`,
    description:
      project.seo?.description ??
      project.brief ??
      `${project.name} — designed and built by AESTA Architects & Builders.`,
  });

  const ogImage = project.cover
    ? `${NAP.siteUrl}${project.cover.src.startsWith('/') ? '' : '/'}${project.cover.src}`
    : undefined;

  return {
    ...base,
    openGraph: {
      type: 'article',
      title: base.title as string,
      description: base.description as string,
      url: `${NAP.siteUrl}/projects/${slug}`,
      images: ogImage ? [{ url: ogImage, alt: project.cover?.alt }] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: base.title as string,
      description: base.description as string,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function ProjectDetail({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const isComingSoon = project.status === 'coming-soon';
  const pageUrl = `${NAP.siteUrl}/projects/${slug}`;

  // Suggest 2 related projects (anything other than the current one).
  const related = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
          { name: project.name, href: `/projects/${project.slug}` },
        ]}
      />

      <ProjectHero project={project} />

      <div className="mt-6 md:mt-10">
        <ProjectFacts project={project} />
      </div>

      {isComingSoon ? (
        <ComingSoonState project={project} />
      ) : (
        <>
          <div className="mt-12 md:mt-16">
            <CaseStudyBody project={project} />
          </div>

          {project.threeView ? <ThreeViewCompare views={project.threeView} /> : null}

          {project.gallery && project.gallery.length > 0 ? (
            <ConstructionGallery
              images={project.gallery}
              heading="From design to site"
              description="Process imagery — earlier studies, alternate renders, and on-site photographs that didn't make the headline three-view."
            />
          ) : null}

          {project.faqs && project.faqs.length > 0 ? (
            <FAQSection items={project.faqs} heading="Frequently asked about this project" />
          ) : null}
        </>
      )}

      <ProjectCTA projectName={project.name} projectType={project.type} />

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="my-12">
          <h2
            id="related-heading"
            className="font-serif text-2xl font-bold text-charcoal-900 md:text-3xl"
          >
            More projects
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <li
                key={p.slug}
                className="rounded-xl border border-limestone-200 bg-white p-5 transition hover:border-terracotta-600"
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
                    {p.type}
                  </p>
                  <h3 className="mt-1 font-semibold text-charcoal-900">{p.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{p.tagline}</p>
                  <p className="mt-3 text-sm font-medium text-terracotta-600">View →</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="my-10 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 hover:underline"
        >
          <span aria-hidden>←</span> Back to all projects
        </Link>
      </div>

      <ProjectJsonLd project={project} pageUrl={pageUrl} />
    </div>
  );
}
