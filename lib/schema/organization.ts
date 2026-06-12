import type { WithContext, Organization } from 'schema-dts';
import { NAP } from '@/lib/constants/nap';

const DESCRIPTION =
  'AESTA is a design-build firm of NIT Trichy-credentialed architects and civil engineers, delivering homes and commercial buildings across Pudukkottai, Karaikudi, Trichy, Thanjavur and 17 cities in Tamil Nadu since 2010. Transparent per-sqft pricing, single-point accountability from design to handover.';

// Social / external profile URLs for Organization.sameAs — populated from a
// comma-separated env var so the Google Business Profile, Instagram, Facebook,
// etc. can be added (and strengthen entity recognition) without a code change.
function getSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_SOCIAL_PROFILES;
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function buildOrganization(): WithContext<Organization> {
  const sameAs = getSameAs();
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${NAP.siteUrl}/#organization`,
    name: NAP.name,
    legalName: NAP.legalName,
    url: NAP.siteUrl,
    email: NAP.email,
    telephone: NAP.phone,
    description: DESCRIPTION,
    foundingDate: `${NAP.foundedYear}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.address.streetAddress,
      addressLocality: NAP.address.addressLocality,
      addressRegion: NAP.address.addressRegion,
      postalCode: NAP.address.postalCode,
      addressCountry: NAP.address.addressCountry,
    },
    areaServed: NAP.areaServed.map((c) => ({
      '@type': 'City' as const,
      name: c.name,
    })),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
