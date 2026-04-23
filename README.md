# AESTA Website

Marketing website and web app for AESTA — Architects & Builders.

See:
- Master plan: [AESTA_WEBSITE_PLAN.md](./AESTA_WEBSITE_PLAN.md)
- SEO/AEO strategy: [docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md](./docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md)
- Implementation plans: [docs/superpowers/plans/](./docs/superpowers/plans/)

## Stack

Next.js 14 · TypeScript · Tailwind · Supabase (hosted) · next-intl · Vercel · GitHub Actions · Vitest

## Local development

Requires Node 20 LTS, pnpm 9+. Database is hosted Supabase (no local Docker); schema operations run via the Supabase MCP server or the Supabase CLI against the hosted project.

```bash
pnpm install
pnpm dev               # http://localhost:3000
```

See `docs/superpowers/plans/` for implementation plans.
