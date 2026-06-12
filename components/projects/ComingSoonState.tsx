import { Link } from '@/i18n/navigation';
import type { ProjectContent } from '@/lib/content/projects';

type ComingSoonStateProps = {
  project: ProjectContent;
};

export function ComingSoonState({ project }: ComingSoonStateProps) {
  return (
    <section
      aria-labelledby="coming-soon-heading"
      className="my-12 rounded-2xl border border-dashed border-limestone-200 bg-limestone-50 p-8 text-center md:p-12"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-50 text-terracotta-600">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M4 22V10l10-6 10 6v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M10 22V14h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="14" cy="17" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <h2
        id="coming-soon-heading"
        className="mt-5 font-serif text-2xl font-bold text-charcoal-900 md:text-3xl"
      >
        We&apos;re preparing this case study
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-neutral-700 md:text-lg">
        {project.name} is documented in our archive — we&apos;re photographing the building, writing
        the design narrative, and preparing the drawings for publication. Until then, ask us during
        your consultation; we&apos;ll show you the project and arrange a site visit if you&apos;re
        nearby.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-terracotta-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
        >
          Talk to us about a similar project
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-limestone-200 bg-white px-6 py-3 text-sm font-medium text-charcoal-900 transition hover:border-terracotta-600 hover:text-terracotta-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
        >
          See other projects
        </Link>
      </div>
    </section>
  );
}
