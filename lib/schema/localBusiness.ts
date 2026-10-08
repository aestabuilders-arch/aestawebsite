import type { WithContext, GeneralContractor } from 'schema-dts';
import { NAP } from '@/lib/constants/nap';
import { getSameAs } from '@/lib/schema/organization';

export type LocalBusinessInput = {
  /** When provided (and reviewCount > 0), nests an AggregateRating in the entity. */
  aggregateRating?: { ratingValue: number; reviewCount: number };
};

export const LOCAL_BUSINESS_ID = `${NAP.siteUrl}/#localbusiness`;

/**
 * The one physical business — the Pudukkottai office. Every page that emits it
 * uses the same @id and the office geo, so Google sees a single entity that
 * matches the Google Business Profile, rather than one "business" per city
 * page. City relevance is expressed through areaServed and per-city Service
 * entities (see LocationHero), not by moving the business's coordinates.
 */
export function buildLocalBusiness(input: LocalBusinessInput = {}): WithContext<GeneralContractor> {
  const ar = input.aggregateRating;
  const sameAs = getSameAs();
  return {
    '@context': 'https://schema.org',
    // GeneralContractor ⊂ HomeAndConstructionBusiness ⊂ LocalBusiness.
    '@type': 'GeneralContractor',
    '@id': LOCAL_BUSINESS_ID,
    name: NAP.name,
    url: NAP.siteUrl,
    email: NAP.email,
    telephone: NAP.phone,
    image: `${NAP.siteUrl}/Assets/Projects/Padmavathy_Apartments/Elevation_Design/Elevation-Design-1.jpg`,
    priceRange: '₹1,999–₹3,299+ per sqft',
    foundingDate: `${NAP.foundedYear}`,
    parentOrganization: { '@id': `${NAP.siteUrl}/#organization` },
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
      latitude: NAP.geo.lat,
      longitude: NAP.geo.lng,
    },
    areaServed: NAP.areaServed.map((c) => ({
      '@type': 'City' as const,
      name: c.name,
    })),
    knowsAbout: [
      'House construction',
      'Architectural design',
      'Civil engineering',
      'Structural engineering',
      'Building renovation',
      'Interior design',
      'DTCP building approval',
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
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
