import type { WithContext, LocalBusiness } from 'schema-dts';
import { NAP } from '@/lib/constants/nap';

export type LocalBusinessInput = {
  cityName: string;
  cityNameTa?: string;
  lat: number;
  lng: number;
  citySlug?: string;
};

export function buildLocalBusiness(input: LocalBusinessInput): WithContext<LocalBusiness> {
  const idSuffix = input.citySlug ? `#localbusiness-${input.citySlug}` : '#localbusiness';
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
  };
}
