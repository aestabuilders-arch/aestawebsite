import { Link } from '@/i18n/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { isValidLocale, type Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata/page-metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ReviewCard, type ReviewSource } from '@/components/seo/ReviewCard';
import { AggregateRating } from '@/components/seo/AggregateRating';
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: '/reviews',
    title: 'Reviews — AESTA Architects & Builders',
    description:
      'Client reviews of AESTA — design-build construction in Tamil Nadu. Aggregated from Google, JustDial, Houzz, Facebook.',
  });
}

export default async function ReviewsPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: reviews } = await supabase
    .from('reviews')
    .select('id, source, client_name, client_location, rating, quote, created_at')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  const items = reviews ?? [];
  const count = items.length;
  const average = count === 0 ? 0 : items.reduce((sum, r) => sum + (r.rating ?? 0), 0) / count;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Reviews', href: '/reviews' },
        ]}
      />

      <header className="my-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 md:text-5xl">Reviews</h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          What clients say about working with AESTA. Aggregated from Google, JustDial, Houzz,
          Facebook, and direct submissions.
        </p>
      </header>

      {count > 0 ? (
        <section className="my-8">
          <AggregateRating average={average} count={count} />
        </section>
      ) : null}

      {count === 0 ? (
        <section className="my-12 rounded-lg border border-dashed border-neutral-300 bg-limestone-50 p-12 text-center">
          <h2 className="text-xl font-semibold text-charcoal-900">
            Reviews collected from launch onwards
          </h2>
          <p className="mt-3 text-neutral-700">
            We&apos;re a referral-driven business with 100+ delivered projects. Public reviews are
            being collected post-handover starting from the site&apos;s launch — they&apos;ll appear
            here as they come in.
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            For now, ask during your consultation and we&apos;ll connect you with past clients in
            your area.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
          >
            Ask about references
          </Link>
        </section>
      ) : (
        <section className="my-12 grid gap-6 md:grid-cols-2">
          {items.map((r) => (
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
        </section>
      )}
    </div>
  );
}
