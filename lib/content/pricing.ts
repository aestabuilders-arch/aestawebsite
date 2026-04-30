export type TierSlug = 'economy' | 'standard' | 'premium' | 'luxury';

export type Tier = {
  slug: TierSlug;
  name: string;
  positioning: string;
  targetClient: string;
  rateRange: { min: number; max: number };
  rateLabel: string;
  highlights: string[];
};

export const TIERS: Tier[] = [
  {
    slug: 'economy',
    name: 'Economy',
    positioning: 'Entry-level, quality basics',
    targetClient: 'First-time builders, rental property owners',
    rateRange: { min: 1999, max: 2199 },
    rateLabel: '₹1,999 – ₹2,199 / sqft',
    highlights: [
      'PPC cement (Ramco / Coromandel)',
      'Fe 500 local steel',
      'Chamber brick walls',
      '2x2 vitrified flooring (₹45/sqft tile allowance)',
      'Country wood frames',
      'UPVC 2-track sliding windows',
      'ISI standard wiring',
      '1 year workmanship warranty',
    ],
  },
  {
    slug: 'standard',
    name: 'Standard',
    positioning: 'Best value — what most clients pick',
    targetClient: 'Middle-class families, 3BHK homes',
    rateRange: { min: 2299, max: 2599 },
    rateLabel: '₹2,299 – ₹2,599 / sqft',
    highlights: [
      'PPC cement (Dalmia / UltraTech)',
      'Fe 500 branded steel (TATA Tiscon, Jindal)',
      'Wire-cut brick walls',
      '2x4 vitrified flooring (₹65/sqft tile allowance)',
      'Burma teak frames',
      'UPVC 3-track sliding windows',
      'Polycab / Havells wiring',
      '3 year workmanship warranty',
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    positioning: 'Design-forward, better materials',
    targetClient: 'Upper-middle, professionals, NRIs',
    rateRange: { min: 2699, max: 2999 },
    rateLabel: '₹2,699 – ₹2,999 / sqft',
    highlights: [
      'OPC + PPC mix (UltraTech / ACC)',
      'Fe 500D premium steel',
      'Wire-cut brick + AAC blocks',
      'Double-charge vitrified flooring (₹120/sqft tile allowance)',
      'Malaysian teak frames',
      'UPVC premium 3-track + grills',
      'Havells / Anchor by Panasonic wiring',
      'Jaquar / Kohler entry-level fittings',
      '5 year workmanship warranty',
    ],
  },
  {
    slug: 'luxury',
    name: 'Luxury',
    positioning: 'Bespoke, architect-led, top finishes',
    targetClient: 'Villa, large bungalow, commercial',
    rateRange: { min: 3299, max: 3999 },
    rateLabel: '₹3,299+ / sqft',
    highlights: [
      'OPC 53 cement (Birla / UltraTech)',
      'Fe 550D premium steel',
      'AAC blocks + premium brickwork',
      'Quartz / Italian marble flooring',
      'Ghana teak frames',
      'Aluminium / UPVC premium with grills',
      'Havells / Legrand wiring',
      'Kohler / Grohe fittings',
      '10 year structural warranty',
      'Daily senior supervision + dedicated architect',
    ],
  },
];

export type SpecCategory =
  | 'Structural'
  | 'Flooring'
  | 'Doors & Windows'
  | 'Electrical'
  | 'Plumbing'
  | 'Painting'
  | 'Kitchen'
  | 'Services & Guarantees';

export type SpecRow = {
  category: SpecCategory;
  item: string;
  economy: string;
  standard: string;
  premium: string;
  luxury: string;
};

// Truncated for v0 — full 25-row table from Master Plan §5.2 can be added incrementally.
export const SPEC_ROWS: SpecRow[] = [
  {
    category: 'Structural',
    item: 'Cement',
    economy: 'Ramco / Coromandel (PPC)',
    standard: 'Dalmia / UltraTech (PPC)',
    premium: 'UltraTech / ACC (PPC + OPC mix)',
    luxury: 'Birla / UltraTech OPC 53',
  },
  {
    category: 'Structural',
    item: 'Steel (TMT)',
    economy: 'Fe 500 local',
    standard: 'Fe 500 (TATA Tiscon / Jindal)',
    premium: 'Fe 500D (TATA Tiscon / Jindal)',
    luxury: 'Fe 550D premium',
  },
  {
    category: 'Structural',
    item: 'Bricks (exterior)',
    economy: 'Chamber brick 9"',
    standard: 'Wire-cut brick 9"',
    premium: 'Wire-cut brick 9"',
    luxury: 'AAC block / Wire-cut 9"',
  },
  {
    category: 'Flooring',
    item: 'Living / Dining',
    economy: '2x2 vitrified, ₹45/sqft',
    standard: '2x4 vitrified, ₹65/sqft',
    premium: 'Double-charge vitrified, ₹120/sqft',
    luxury: 'Quartz / Italian marble, ₹250/sqft',
  },
  {
    category: 'Flooring',
    item: 'Bedrooms',
    economy: '2x2 vitrified, ₹40/sqft',
    standard: 'Same as living',
    premium: 'Engineered wood / wooden-finish vitrified',
    luxury: 'Engineered wood / premium vitrified',
  },
  {
    category: 'Flooring',
    item: 'Bathroom wall tile',
    economy: 'Up to ceiling, ₹40/sqft',
    standard: 'Up to ceiling, ₹55/sqft',
    premium: 'Up to ceiling, ₹85/sqft + designer',
    luxury: 'Up to ceiling, ₹150/sqft + feature wall',
  },
  {
    category: 'Doors & Windows',
    item: 'Main door',
    economy: 'Country wood + panel door',
    standard: 'Burma teak frame + teak door',
    premium: 'Malaysian teak frame + teak door',
    luxury: 'Ghana teak frame + teak door',
  },
  {
    category: 'Doors & Windows',
    item: 'Windows',
    economy: 'UPVC 2-track sliding',
    standard: 'UPVC 3-track sliding',
    premium: 'UPVC premium 3-track + grills',
    luxury: 'Aluminium / UPVC premium + grills',
  },
  {
    category: 'Electrical',
    item: 'Wiring',
    economy: 'ISI (Finolex / Polycab)',
    standard: 'Polycab / Havells',
    premium: 'Havells / Anchor by Panasonic',
    luxury: 'Havells / Legrand',
  },
  {
    category: 'Electrical',
    item: 'Switches',
    economy: 'Anchor Roma',
    standard: 'Anchor Roma / Havells',
    premium: 'Havells / Legrand Myrius',
    luxury: 'Legrand Arteor / Schneider',
  },
  {
    category: 'Plumbing',
    item: 'Bath fittings',
    economy: 'Parryware / Hindware basic',
    standard: 'Parryware / Hindware mid',
    premium: 'Jaquar / Kohler entry',
    luxury: 'Kohler / Grohe',
  },
  {
    category: 'Painting',
    item: 'Interior',
    economy: 'Asian Tractor Emulsion',
    standard: 'Asian Royale / Berger Silk',
    premium: 'Asian Royale Luxury',
    luxury: 'Asian Royale Aspira',
  },
  {
    category: 'Painting',
    item: 'Exterior',
    economy: 'Asian Ace Exterior',
    standard: 'Asian Apex / Berger Weathercoat',
    premium: 'Asian Apex Ultima',
    luxury: 'Asian Apex Ultima Protek',
  },
  {
    category: 'Kitchen',
    item: 'Platform',
    economy: 'Granite slab standard',
    standard: 'Black galaxy granite',
    premium: 'Quartz / premium granite',
    luxury: 'Italian marble / quartz',
  },
  {
    category: 'Services & Guarantees',
    item: 'Architect involvement',
    economy: 'Plan + basic elevation',
    standard: '2D + 3D elevation',
    premium: 'Full design + site visits',
    luxury: 'Dedicated architect throughout',
  },
  {
    category: 'Services & Guarantees',
    item: 'Site visits',
    economy: 'Weekly',
    standard: 'Twice weekly',
    premium: '3× weekly',
    luxury: 'Daily',
  },
  {
    category: 'Services & Guarantees',
    item: 'Warranty',
    economy: '1 year workmanship',
    standard: '3 years workmanship',
    premium: '5 years workmanship',
    luxury: '10 years structural',
  },
];

export const PRICING_DISCLAIMERS = [
  'Rates are for built-up area (not carpet area, not plot area).',
  'Rates exclude: land, DTCP/panchayat approvals, compound wall, sump/borewell, interior furniture, landscaping, solar/inverter.',
  'Final quote depends on site conditions, design complexity, and material choices.',
  'Rates valid for projects signed in 2026; subject to revision.',
];

export function getTier(slug: string): Tier | null {
  return TIERS.find((t) => t.slug === slug) ?? null;
}
