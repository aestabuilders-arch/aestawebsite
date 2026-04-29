import type { WithContext, Organization } from 'schema-dts';
import { NAP } from '@/lib/constants/nap';

export function buildOrganization(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${NAP.siteUrl}/#organization`,
    name: NAP.name,
    legalName: NAP.legalName,
    url: NAP.siteUrl,
    email: NAP.email,
    telephone: NAP.phone,
    foundingDate: `${NAP.foundedYear}`,
    areaServed: NAP.areaServed.map((c) => ({
      '@type': 'City' as const,
      name: c.name,
    })),
  };
}
