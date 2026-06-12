import type { ProjectContent } from '@/lib/content/projects';

type CaseStudyBodyProps = {
  project: ProjectContent;
};

export function CaseStudyBody({ project }: CaseStudyBodyProps) {
  return (
    <div className="space-y-12 md:space-y-16">
      {project.brief ? (
        <section aria-labelledby="brief-heading">
          <p
            className="text-xs font-semibold uppercase tracking-wider text-terracotta-600"
            id="brief-heading"
          >
            Project brief
          </p>
          <p className="mt-3 text-lg leading-relaxed text-charcoal-800 md:text-xl">
            {project.brief}
          </p>
        </section>
      ) : null}

      {project.siteContext && project.siteContext.length > 0 ? (
        <section aria-labelledby="context-heading">
          <header className="max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-wider text-terracotta-600"
              id="context-heading"
            >
              Site context & challenges
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-charcoal-900 md:text-3xl">
              The constraints that shaped the building
            </h2>
          </header>
          <ul className="mt-6 space-y-4">
            {project.siteContext.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-charcoal-800">
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta-500"
                />
                <span className="md:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.approach && project.approach.length > 0 ? (
        <section
          aria-labelledby="approach-heading"
          className="rounded-2xl bg-limestone-50 p-6 md:p-10"
        >
          <header className="max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-wider text-sage-600"
              id="approach-heading"
            >
              Approach & considerations
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-charcoal-900 md:text-3xl">
              How we thought about the problem
            </h2>
          </header>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {project.approach.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-xl bg-white p-4 text-charcoal-800 shadow-sm"
              >
                <span
                  aria-hidden
                  className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage-500/15 text-sm font-bold text-sage-600"
                >
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.solutions && project.solutions.length > 0 ? (
        <section aria-labelledby="solutions-heading">
          <header className="max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-wider text-terracotta-600"
              id="solutions-heading"
            >
              What we did
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-charcoal-900 md:text-3xl">
              Solutions, in order
            </h2>
          </header>
          <ol className="mt-6 grid gap-5 md:grid-cols-3">
            {project.solutions.map((s, idx) => (
              <li
                key={idx}
                className="relative rounded-2xl border border-limestone-200 bg-white p-6 shadow-sm transition hover:border-terracotta-600 hover:shadow-md"
              >
                <span className="font-serif text-3xl font-bold text-terracotta-600/60">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-semibold text-charcoal-900">{s.title}</h3>
                <p className="mt-2 text-neutral-700">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.outcome ? (
        <section
          aria-labelledby="outcome-heading"
          className="border-l-4 border-terracotta-600 bg-limestone-50 p-6 md:p-8"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider text-terracotta-600"
            id="outcome-heading"
          >
            Outcome
          </p>
          <p className="mt-2 text-lg leading-relaxed text-charcoal-800 md:text-xl">
            {project.outcome}
          </p>
        </section>
      ) : null}

      {project.testimonial ? (
        <section
          aria-labelledby="testimonial-heading"
          className="rounded-2xl bg-charcoal-900 p-6 text-white md:p-10"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider text-terracotta-50"
            id="testimonial-heading"
          >
            From the client
          </p>
          <blockquote className="mt-3 font-serif text-2xl leading-snug text-white md:text-3xl">
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>
          <footer className="mt-4 text-sm text-white/80">
            — {project.testimonial.author}
            {project.testimonial.authorRole ? (
              <span className="text-white/60">, {project.testimonial.authorRole}</span>
            ) : null}
          </footer>
        </section>
      ) : null}
    </div>
  );
}
