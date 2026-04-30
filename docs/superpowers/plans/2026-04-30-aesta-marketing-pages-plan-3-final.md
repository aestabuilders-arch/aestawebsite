# AESTA Marketing Pages — Consolidated Implementation Plan (Plan 3-final)

> **Note:** This consolidates Plans 3b–3h into one execution pass. Scope-driven, not strict TDD per task. Tests focus on logic-bearing components (forms, server actions); static pages are verified by build + visual smoke tests.

**Goal:** Ship a deployable marketing site — homepage, services, pricing, projects (empty state), locations, about, contact, quote, reviews (empty state), press, legal — using the components and infrastructure from Plans 1, 1.5, 2, 3a.

**Architecture:** Server-rendered pages under `app/[locale]/` consuming data from `lib/content/*` (static) and `utils/supabase/server` (dynamic, e.g. cities, projects). Forms use Next.js server actions that insert into the Supabase `leads` table via the anon-RLS policy from Plan 1.5. Per-page metadata via `lib/metadata/page-metadata.ts` helper (Plan 3a).

**What's in scope:**

- Homepage (12 sections per Master Plan §4.2)
- `/services` overview + 8 service pages from one template
- `/pricing` 4-tier comparison (proposed rates from Master Plan §5 — validate before launch)
- `/about` (story + team — civil engineer bio TBD)
- `/contact` (form + WhatsApp/phone CTAs)
- `/quote` (longer form for qualified leads)
- `/locations` overview + 5 Tier-1 city pages (Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur) with hyper-local content
- `/projects` gallery (empty state since `projects` table has 0 rows)
- `/reviews` aggregator (empty state)
- `/press` kit
- `/legal/privacy` + `/legal/terms` (India-compliant templates)
- Vercel deployment configuration

**Explicitly deferred (operational, not page-template work):**

- 12 Tier-2 city pages — Plan 6 (programmatic, after search-volume data)
- Real project case studies — once you select 6 of 100, seed via Supabase MCP
- Real reviews — Plan 7 (post-handover WhatsApp + GBP API integration)
- Tamil translations beyond what's already in i18n messages — ship English-priority
- Blog / resources — Plan 4 (needs first 5 articles)

**Out of scope (won't be addressed this plan):**

- Logo design (wordmark stub continues)
- Cookie banner / GDPR consent
- Analytics scripts
- Real photographs (placeholder image strategy used)

---

## Execution order (logic dependencies)

1. Static content data: `lib/content/services.ts`, `lib/content/pricing.ts`
2. Service pages (overview + dynamic [slug]) — uses services data
3. Pricing page — uses pricing data + emits Product schema per tier
4. Homepage — uses services + pricing + Supabase reads for projects/cities
5. About — static
6. Contact form (simpler, builds confidence in server-action pattern)
7. Quote form (longer, qualified-lead capture)
8. Locations overview + 5 Tier-1 city pages — Supabase reads
9. Projects gallery (empty state) — Supabase reads with empty-array path
10. Reviews aggregator (empty state)
11. Press kit
12. Legal pages
13. Final gates + commit + push + tag `plan-3-final`
14. Vercel deployment

---

## Per-page metadata pattern

Every page implements:

```tsx
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata({
    locale,
    pathname: '/services', // page-specific
    title: 'Our Services — AESTA',
    description: 'Eight construction and design services...',
  });
}
```

## Forms server action pattern

Server action that validates inputs and inserts via the publishable-key client (relies on RLS):

```tsx
'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function submitLead(prev: unknown, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  // validate, insert, return status
}
```

The RLS policy `leads_public_insert` (Plan 1.5) allows anon inserts with length-bounded checks.

---

## Completion criteria

1. Every primary route renders without errors in `pnpm build`
2. Every page emits `buildPageMetadata` output (canonical + hreflang)
3. Forms submit to Supabase `leads` table successfully (verified via MCP query)
4. Existing 82 tests still pass; new tests for forms add ~10 more
5. CI green on `main`
6. Tag `plan-3-final` pushed
7. Vercel deployment succeeds (or deploy steps documented if user prefers manual)
