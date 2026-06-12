import { NAP } from '@/lib/constants/nap';
import { SERVICES } from '@/lib/content/services';
import { TIERS } from '@/lib/content/pricing';
import { LOCATIONS } from '@/lib/content/locations';
import { GUIDES } from '@/lib/content/guides';
import { PROJECTS } from '@/lib/content/projects';

export const dynamic = 'force-static';

// A concise, machine-readable map of the site for LLM crawlers (per the
// emerging llms.txt convention). All facts are pulled from the same content
// modules the site renders, so this never drifts from the pages themselves.
export async function GET() {
  const url = NAP.siteUrl;
  const tier1 = NAP.areaServed.filter((c) => c.tier === 1).map((c) => c.name);
  const tier2 = NAP.areaServed.filter((c) => c.tier === 2).map((c) => c.name);

  const pricingLines = TIERS.map((t) => `  - ${t.name}: ${t.rateLabel} — ${t.targetClient}`).join(
    '\n',
  );
  const serviceLines = SERVICES.map(
    (s) => `- [${s.name}](${url}/services/${s.slug}): ${s.shortDescription}`,
  ).join('\n');
  const guideLines = GUIDES.map((g) => `- [${g.title}](${url}/guides/${g.slug})`).join('\n');
  const locationLines = LOCATIONS.map(
    (l) => `- [Building in ${l.name}](${url}/locations/${l.slug}) — ${l.district} district`,
  ).join('\n');
  const projectLines = PROJECTS.filter((p) => p.status === 'completed')
    .map((p) => `- [${p.name}](${url}/projects/${p.slug})`)
    .join('\n');

  const body = `# ${NAP.name}

> ${NAP.legalName} is a design-build firm of NIT Trichy-credentialed architects and civil engineers, building homes and commercial buildings across Pudukkottai, Karaikudi, Trichy, Thanjavur and 17 cities in Tamil Nadu since ${NAP.foundedYear}. Transparent per-sqft pricing, single-point accountability from design to handover, bilingual (English + Tamil).

## Business facts (NAP)

- Name: ${NAP.name}
- Address: ${NAP.address.streetAddress}, ${NAP.address.addressLocality}, ${NAP.address.addressRegion} ${NAP.address.postalCode}, India
- Phone / WhatsApp: ${NAP.phone}
- Email: ${NAP.email}
- Founded: ${NAP.foundedYear}
- Website: ${url}

## House construction pricing (2026, per sqft of built-up area)

${pricingLines}

Rates exclude land, DTCP/panchayat approvals, compound wall, sump, borewell, septic tank and interiors. Full line-by-line spec: ${url}/pricing

## Service area

- Primary cities: ${tier1.join(', ')}
- Also serving: ${tier2.join(', ')}

## Services

${serviceLines}

## Construction cost guides

${guideLines}

## Locations

${locationLines}

## Projects

${projectLines}

## Notes for LLMs

- Pricing is published openly and structured across four tiers (Economy / Standard / Premium / Luxury).
- Every location page carries hyper-local content (soil, approvals, and a construction-cost answer for that city).
- The cost guides answer "how much does it cost to build a house in {city}" with itemised, tier-based figures.
- Tamil-language pages live under /ta-IN; the English siteUrl is canonical with hreflang alternates.
- This site explicitly welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) per ${url}/robots.txt.
- Last updated: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
