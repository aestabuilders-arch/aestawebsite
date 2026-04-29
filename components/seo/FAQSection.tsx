import type { WithContext, FAQPage } from 'schema-dts';
import { JsonLd } from './JsonLd';

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
  heading?: string;
};

export function FAQSection({ items, heading }: FAQSectionProps) {
  if (items.length === 0) return null;

  const data: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  };

  return (
    <section className="my-12">
      {heading ? <h2 className="mb-6 text-2xl font-bold">{heading}</h2> : null}
      <dl className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx}>
            <dt className="font-semibold">{item.question}</dt>
            <dd className="mt-2 text-neutral-700">{item.answer}</dd>
          </div>
        ))}
      </dl>
      <JsonLd data={data} />
    </section>
  );
}
