import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from '@/i18n/navigation';
import { ReviewCard, type ReviewSource } from './ReviewCard';
import { AggregateRating } from './AggregateRating';

// Below this, the homepage shows no rating at all — a thin average looks
// manufactured and risks Google penalties. Mirrors the /reviews threshold.
const MIN_REVIEWS = 3;

type ReviewRow = {
  id: string;
  source: string;
  client_name: string;
  client_location: string | null;
  rating: number | null;
  quote: string | null;
  created_at: string;
};

type ReviewStats = {
  items: ReviewRow[];
  count: number;
  average: number;
};

// Deduped across the hero pill and the reviews section within one render pass,
// so both surfaces share a single Supabase query. Resilient: any error (e.g.
// missing env) returns an empty result and the surfaces simply hide.
const getReviewStats = cache(async (): Promise<ReviewStats> => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return { items: [], count: 0, average: 0 };

    // Public, cookie-less client: reviews are public data, so the homepage can
    // stay static (ISR) instead of being forced dynamic by a session client.
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await supabase
      .from('reviews')
      .select('id, source, client_name, client_location, rating, quote, created_at')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });
    const items = (data ?? []) as ReviewRow[];
    const count = items.length;
    const average = count === 0 ? 0 : items.reduce((s, r) => s + (r.rating ?? 0), 0) / count;
    return { items, count, average };
  } catch {
    return { items: [], count: 0, average: 0 };
  }
});

/** Compact rating pill for the hero. Renders nothing until real reviews exist. */
export async function HomeRatingPill() {
  const { count, average } = await getReviewStats();
  if (count < MIN_REVIEWS) return null;

  const rounded = Math.round(average * 10) / 10;
  const filled = Math.round(rounded);
  const stars = '★'.repeat(filled) + '☆'.repeat(5 - filled);

  return (
    <div className="mt-8 flex justify-center">
      <Link
        href="/reviews"
        className="inline-flex items-center gap-2 rounded-full border border-limestone-200 bg-white px-4 py-2 text-sm shadow-sm transition hover:border-terracotta-600"
      >
        <span className="text-terracotta-600" aria-hidden>
          {stars}
        </span>
        <span className="font-semibold text-charcoal-900">{rounded.toFixed(1)}</span>
        <span className="text-neutral-600">· {count} reviews</span>
      </Link>
    </div>
  );
}

/** "What clients say" section — placed just before the final CTA. */
export async function HomeReviews() {
  const { items, count, average } = await getReviewStats();
  if (count < MIN_REVIEWS) return null;

  const featured = items.slice(0, 3);

  return (
    <section className="bg-limestone-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 md:text-4xl">
              What clients say
            </h2>
            <p className="mt-2 text-neutral-700">
              Aggregated from Google, JustDial, Houzz and direct submissions.
            </p>
          </div>
          <AggregateRating average={average} count={count} withSchema={false} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((r) => (
            <ReviewCard
              key={r.id}
              authorName={r.client_name}
              authorLocation={r.client_location ?? undefined}
              rating={r.rating as 1 | 2 | 3 | 4 | 5}
              quote={r.quote ?? ''}
              source={r.source as ReviewSource}
              date={r.created_at}
            />
          ))}
        </div>

        <Link
          href="/reviews"
          className="mt-6 inline-block text-sm font-medium text-terracotta-600 hover:underline"
        >
          Read all reviews →
        </Link>
      </div>
    </section>
  );
}
