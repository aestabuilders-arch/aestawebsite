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

## Vercel deployment

1. Push this repo to GitHub.
2. Go to https://vercel.com/new → import the repo.
3. Framework: Next.js (auto-detected). Build command: `pnpm build`. Install command: `pnpm install --frozen-lockfile`.
4. Environment variables — set every key from `.env.example` with real values. Scope: Production + Preview.
5. Region: Mumbai (`bom1`) — already set in `vercel.json`.
6. Deploy. Confirm both `https://<project>.vercel.app/` and `https://<project>.vercel.app/ta-IN` render.

Domain (aesta.co.in) wiring happens in a later plan once DNS is ready.
