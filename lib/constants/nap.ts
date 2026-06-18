export type NAPAreaServed = { name: string; slug: string; tier: 1 | 2 };

// Env vars set via dashboards often pick up a trailing newline/whitespace.
// For siteUrl that newline silently corrupts every raw string interpolation
// (sitemap <loc>, JSON-LD @id, llms.txt, robots.txt) even though Next.js
// normalises canonical/og URLs through a URL object. Trim defensively so a
// polluted env var can never break those again. Empty → fall back to default.
const fromEnv = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const NAP = {
  name: fromEnv(process.env.NEXT_PUBLIC_BUSINESS_NAME) ?? 'AESTA — Architects & Builders',
  legalName: 'AESTA',
  foundedYear: 2010,
  phone: fromEnv(process.env.NEXT_PUBLIC_BUSINESS_PHONE) ?? '+91-9176137043',
  whatsapp: fromEnv(process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP) ?? '+91-9176137043',
  email: fromEnv(process.env.NEXT_PUBLIC_BUSINESS_EMAIL) ?? 'aestabuilders@gmail.com',
  address: {
    streetAddress: 'Padmavathy Apartments, 1595 North Second Street',
    addressLocality: 'Pudukkottai',
    addressRegion: 'Tamil Nadu',
    postalCode: '622001',
    addressCountry: 'IN',
  },
  // Head-office coordinates (Pudukkottai). Used for sitewide LocalBusiness geo
  // where no city-specific page context applies (e.g. the reviews page).
  geo: { lat: 10.3833, lng: 78.8001 },
  siteUrl: fromEnv(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://aesta.co.in',
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
