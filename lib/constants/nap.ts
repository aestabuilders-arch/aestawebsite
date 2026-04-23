export type NAPAreaServed = { name: string; slug: string; tier: 1 | 2 };

export const NAP = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'AESTA — Architects & Builders',
  legalName: 'AESTA',
  foundedYear: 2010,
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '+91-0000000000',
  whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP ?? '+91-0000000000',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? 'hello@aesta.co.in',
  address: {
    streetAddress: 'TBD',
    addressLocality: 'Pudukkottai',
    addressRegion: 'Tamil Nadu',
    postalCode: 'TBD',
    addressCountry: 'IN',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aesta.co.in',
  areaServed: [
    { name: 'Pudukkottai', slug: 'pudukkottai', tier: 1 },
    { name: 'Karaikudi', slug: 'karaikudi', tier: 1 },
    { name: 'Aranthangi', slug: 'aranthangi', tier: 1 },
    { name: 'Tiruchirappalli', slug: 'trichy', tier: 1 },
    { name: 'Thanjavur', slug: 'thanjavur', tier: 1 },
    { name: 'Keeranur', slug: 'keeranur', tier: 2 },
    { name: 'Thirumayam', slug: 'thirumayam', tier: 2 },
    { name: 'Thirupathur', slug: 'thirupathur', tier: 2 },
    { name: 'Ponnamaravathy', slug: 'ponnamaravathy', tier: 2 },
    { name: 'Viralimalai', slug: 'viralimalai', tier: 2 },
    { name: 'Alangudi', slug: 'alangudi', tier: 2 },
    { name: 'Illuppur', slug: 'illuppur', tier: 2 },
    { name: 'Gandarvakottai', slug: 'gandarvakottai', tier: 2 },
    { name: 'Avudaiyarkoil', slug: 'avudaiyarkoil', tier: 2 },
    { name: 'Sivaganga', slug: 'sivaganga', tier: 2 },
    { name: 'Devakottai', slug: 'devakottai', tier: 2 },
    { name: 'Chennai', slug: 'chennai', tier: 2 },
  ] satisfies NAPAreaServed[],
} as const;

function stripFormatting(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function getPhoneLink(): string {
  return `tel:${stripFormatting(NAP.phone)}`;
}

export function getWhatsAppLink(message?: string): string {
  const digits = stripFormatting(NAP.whatsapp).replace(/^\+/, '');
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getMailtoLink(): string {
  return `mailto:${NAP.email}`;
}
