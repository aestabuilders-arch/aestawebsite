import type { WithContext, HowTo } from 'schema-dts';
import { JsonLd } from './JsonLd';

export type ProcessStep = {
  name: string;
  text: string;
};

type ProcessStepsProps = {
  name: string;
  steps: ProcessStep[];
};

export function ProcessSteps({ name, steps }: ProcessStepsProps) {
  if (steps.length === 0) return null;

  const data: WithContext<HowTo> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep' as const,
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-bold">{name}</h2>
      <ol className="space-y-4">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-4">
            <span className="font-bold text-terracotta-600" aria-hidden>
              {idx + 1}.
            </span>
            <div>
              <h3 className="font-semibold">{step.name}</h3>
              <p className="mt-1 text-neutral-700">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <JsonLd data={data} />
    </section>
  );
}
