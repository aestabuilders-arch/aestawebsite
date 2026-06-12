import type { WithContext, LocalBusiness } from 'schema-dts';
import { NAP } from '@/lib/constants/nap';

export type LocalBusinessInput = {
  cityName: string;
  cityNameTa?: string;
  lat: number;
  lng: number;
  citySlug?: string;
  /** When provided (and reviewCount > 0), nests an AggregateRating in the entity. */
  aggregateRating?: { ratingValue: number; reviewCount: number };
};

export function buildLocalBusiness(input: LocalBusinessInput): WithContext<LocalBusiness> {
  const idSuffix = input.citySlug ? `#localbusiness-${input.citySlug}` : '#localbusiness';
  const ar = input.aggregateRating;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${NAP.siteUrl}/${idSuffix}`,
    name: NAP.name,
    url: NAP.siteUrl,
    email: NAP.email,
    telephone: NAP.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.address.streetAddress,
      addressLocality: NAP.address.addressLocality,
      addressRegion: NAP.address.addressRegion,
      postalCode: NAP.address.postalCode,
      addressCountry: NAP.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: input.lat,
      longitude: input.lng,
    },
    areaServed: NAP.areaServed.map((c) => ({
      '@type': 'City' as const,
      name: c.name,
    })),
    // Nesting the rating inside the reviewed entity is what Google's
    // review-snippet guidelines expect (vs. a standalone AggregateRating).
    ...(ar && ar.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating' as const,
            ratingValue: ar.ratingValue,
            reviewCount: ar.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}
