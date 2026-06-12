import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { ProjectContent } from '@/lib/content/projects';

type ProjectCardProps = {
  project: ProjectContent;
};

const STATUS_LABEL: Record<ProjectContent['status'], string> = {
  completed: 'Completed',
  ongoing: 'In progress',
  'coming-soon': 'Coming soon',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isComingSoon = project.status === 'coming-soon';
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300',
        isComingSoon
          ? 'border-limestone-200'
          : 'border-limestone-200 hover:-translate-y-0.5 hover:border-terracotta-600 hover:shadow-md',
      ].join(' ')}
    >
      <Link
        href={href}
        aria-label={`Open ${project.name} case study`}
        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
      >
        <span className="sr-only">Open {project.name} case study</span>
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-limestone-100">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectCoverPlaceholder type={project.type} />
        )}
        <span
          className={[
            'absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur',
            isComingSoon
              ? 'bg-charcoal-900/70 text-white'
              : 'bg-white/85 text-charcoal-900',
          ].join(' ')}
        >
          {STATUS_LABEL[project.status]}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-charcoal-900 backdrop-blur">
          {project.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-xl font-bold text-charcoal-900 md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          <span aria-hidden>📍 </span>
          {project.location}
        </p>
        <p className="mt-3 text-neutral-700">{project.tagline}</p>

        <div className="mt-auto pt-5">
          <span
            className={[
              'inline-flex items-center gap-1 text-sm font-medium',
              isComingSoon ? 'text-neutral-500' : 'text-terracotta-600 group-hover:gap-2',
            ].join(' ')}
          >
            {isComingSoon ? 'Preview the project →' : 'View case study →'}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectCoverPlaceholder({ type }: { type: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-limestone-100 via-limestone-200 to-terracotta-50">
      <div className="flex flex-col items-center gap-2 text-charcoal-800/60">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
          <path
            d="M8 44V20l20-12 20 12v24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M20 44V30h16v14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 44h40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-xs font-medium uppercase tracking-wider">{type}</p>
        <p className="text-[11px] text-charcoal-800/50">Photos coming soon</p>
      </div>
    </div>
  );
}
