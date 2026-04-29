import type { WithContext, Review } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { NAP } from '@/lib/constants/nap';

export type ReviewSource =
  | 'gbp'
  | 'facebook'
  | 'justdial'
  | 'sulekha'
  | 'houzz'
  | 'indiamart'
  | 'trustpilot'
  | 'direct';

const SOURCE_LABEL: Record<ReviewSource, string> = {
  gbp: 'Google',
  facebook: 'Facebook',
  justdial: 'JustDial',
  sulekha: 'Sulekha',
  houzz: 'Houzz',
  indiamart: 'IndiaMART',
  trustpilot: 'Trustpilot',
  direct: 'Direct',
};

type ReviewCardProps = {
  authorName: string;
  authorLocation?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: ReviewSource;
  date?: string;
  withSchema?: boolean;
};

export function ReviewCard({
  authorName,
  authorLocation,
  rating,
  quote,
  source,
  date,
  withSchema = false,
}: ReviewCardProps) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const data: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: quote,
    datePublished: date,
    itemReviewed: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
  };

  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-6">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{authorName}</p>
          {authorLocation ? <p className="text-sm text-neutral-600">{authorLocation}</p> : null}
        </div>
        <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
          {SOURCE_LABEL[source]}
        </span>
      </header>
      <p className="mt-3 text-terracotta-600" aria-label={`${rating} out of 5 stars`}>
        {stars}
      </p>
      <blockquote className="mt-3 text-neutral-700">{quote}</blockquote>
      {withSchema ? <JsonLd data={data} /> : null}
    </article>
  );
}
