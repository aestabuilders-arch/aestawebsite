import type { ProjectContent } from '@/lib/content/projects';

type ProjectFactsProps = {
  project: ProjectContent;
};

const STATUS_LABEL = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  'coming-soon': 'In documentation',
} as const;

export function ProjectFacts({ project }: ProjectFactsProps) {
  const items: { label: string; value: string }[] = [];

  items.push({ label: 'Type', value: project.type });
  if (project.facts.builtUpSqft) {
    items.push({
      label: 'Built-up area',
      value: `${project.facts.builtUpSqft.toLocaleString('en-IN')} sqft`,
    });
  }
  if (project.facts.floors) {
    items.push({ label: 'Floors', value: project.facts.floors });
  }
  if (project.facts.scope) {
    items.push({ label: 'Scope', value: project.facts.scope });
  }
  if (project.facts.completionYear) {
    items.push({ label: 'Completed', value: String(project.facts.completionYear) });
  }
  items.push({ label: 'Status', value: STATUS_LABEL[project.status] });

  return (
    <section
      aria-label="Project facts"
      className="rounded-2xl border border-limestone-200 bg-white p-5 shadow-sm md:p-6"
    >
      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="border-l-2 border-terracotta-600 pl-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              {item.label}
            </dt>
            <dd className="mt-1 font-medium text-charcoal-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
