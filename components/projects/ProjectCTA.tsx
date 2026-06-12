import { Link } from '@/i18n/navigation';

type ProjectCTAProps = {
  projectName: string;
  projectType: string;
};

export function ProjectCTA({ projectName, projectType }: ProjectCTAProps) {
  return (
    <section
      aria-labelledby="project-cta-heading"
      className="my-16 overflow-hidden rounded-2xl bg-charcoal-900 p-8 text-white md:p-12"
    >
      <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-50">
            Plan your project with AESTA
          </p>
          <h2
            id="project-cta-heading"
            className="mt-2 font-serif text-3xl font-bold leading-tight md:text-4xl"
          >
            Building something like {projectName}?
          </h2>
          <p className="mt-3 max-w-lg text-white/80 md:text-lg">
            Tell us what you&apos;re planning. We&apos;ll come back with a clear scope, timeline, and
            tier-priced estimate — usually within 24 hours.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/quote"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-terracotta-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
          >
            Get a free quote →
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
          >
            Talk to an architect
          </Link>
          <p className="text-center text-xs text-white/60">
            Specialists in {projectType.toLowerCase()} projects across Tamil Nadu.
          </p>
        </div>
      </div>
    </section>
  );
}
