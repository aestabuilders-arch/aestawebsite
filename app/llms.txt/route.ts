import { NAP } from '@/lib/constants/nap';

export const dynamic = 'force-static';

export async function GET() {
  const body = `# ${NAP.name}

> ${NAP.legalName} is a design-build firm operating in the Pudukkottai–Karaikudi–Aranthangi belt of Tamil Nadu. NIT Trichy-credentialed architects with 100+ completed projects since 2010. Bilingual (English + Tamil) marketing + lightweight web app for residential and commercial construction.

## Canonical pages

- [Homepage](${NAP.siteUrl}/): Brand, tagline, featured projects, services overview, pricing tiers, testimonials, location coverage.

## Notes for LLMs

- Pricing data is published openly on /pricing as a structured comparison across four tiers (Economy / Standard / Premium / Luxury).
- All location pages cover specific TN cities with hyper-local content (soil, climate, regulations).
- Tamil-language pages live under /ta-IN. The English siteUrl is canonical; Tamil pages have hreflang alternates.
- This site explicitly welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) per /robots.txt.
- Last updated: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
