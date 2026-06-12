import Image from 'next/image';
import type { ProjectContent } from '@/lib/content/projects';

type ProjectHeroProps = {
  project: ProjectContent;
};

const STATUS_LABEL = {
  completed: 'Completed',
  ongoing: 'In progress',
  'coming-soon': 'Case study in preparation',
} as const;

export function ProjectHero({ project }: ProjectHeroProps) {
  const hasCover = !!project.cover;

  return (
    <section
      aria-labelledby={`project-${project.slug}-title`}
      className="relative isolate overflow-hidden rounded-2xl bg-charcoal-900"
    >
      <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
        {hasCover && project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-terracotta-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/70 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-10 md:px-10 md:pb-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-terracotta-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {project.type}
          </span>
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {STATUS_LABEL[project.status]}
          </span>
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <span aria-hidden>📍 </span>
            {project.location}
          </span>
        </div>

        <h1
          id={`project-${project.slug}-title`}
          className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-6xl"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          {project.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{project.tagline}</p>
      </div>
    </section>
  );
}
