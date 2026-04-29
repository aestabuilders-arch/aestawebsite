import type { WithContext, AggregateRating as ARSchema } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { NAP } from '@/lib/constants/nap';

const MIN_COUNT_FOR_SCHEMA = 3;

type AggregateRatingProps = {
  average: number;
  count: number;
};

function roundTo1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function AggregateRating({ average, count }: AggregateRatingProps) {
  const rounded = roundTo1(average);
  const filled = Math.round(rounded);
  const stars = '★'.repeat(filled) + '☆'.repeat(5 - filled);

  const data: WithContext<ARSchema> = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rounded,
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-terracotta-600" aria-hidden>
        {stars}
      </span>
      <span className="font-semibold">{rounded.toFixed(1)}</span>
      <span className="text-neutral-600">·</span>
      <span className="text-neutral-600">{count} reviews</span>
      {count >= MIN_COUNT_FOR_SCHEMA ? <JsonLd data={data} /> : null}
    </div>
  );
}
