# AESTA SEO Components + AI-Crawler Infrastructure Implementation Plan (Plan 2 of 7)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the schema-emitting React components and AI-crawler infrastructure that every Plan 3+ page will inherit, so JSON-LD, sitemaps, robots, and `llms.txt` are correct by construction rather than retrofit.

**Architecture:** A small `<JsonLd>` primitive emits `<script type="application/ld+json">` from typed payloads. Eight focused components consume that primitive (`<FAQSection>`, `<ProcessSteps>`, `<AggregateRating>`, `<ReviewCard>`, `<AuthorByline>`, `<LanguageSwitcher>`, `<YouTubeEmbed>`, `<LocationHero>`). Shared builders for `Organization` and `LocalBusiness` schemas live in `lib/schema/` and are typed by `schema-dts`. Next.js's built-in metadata routes (`app/robots.ts`, `app/sitemap.ts`) handle robots and sitemap; `app/llms.txt/route.ts` returns a curated text/plain manifest for AI crawlers.

**Tech Stack:** Next.js 14 App Router, TypeScript, `schema-dts` (typed schema.org), Vitest + Testing Library, next-intl (already wired in Plan 1).

**Out of scope (deferred to later plans):**

- Pages that USE these components — homepage, services, pricing, projects, locations, about, contact, quote (Plan 3)
- Entity / blog page templates (Plan 4)
- Admin panel CRUDs (Plan 5)
- Programmatic landing pages (Plan 6)
- Operational integrations (Plan 7)
- Lighthouse CI thresholds — requires real pages to score against; deferred to Plan 3
- `hreflang` cross-locale validator — needs real per-locale pages to validate; deferred to Plan 3
- Real content writing (Tamil translations, project case studies, blog posts) — operational, not code

**Companion documents:**

- Strategy: [docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md](../specs/2026-04-23-aesta-seo-aeo-strategy-design.md)
- Plan 1 (foundation, complete): [docs/superpowers/plans/2026-04-23-aesta-foundation-plan-1.md](./2026-04-23-aesta-foundation-plan-1.md)

---

## Prerequisites

- Plan 1 complete (foundation tagged `plan-1-foundation`, repo at `aestabuilders-arch/aestawebsite`, CI green)
- Plan 1.5 complete (RLS migrations applied)
- Working directory: `c:/Users/Haribabu/Documents/AppsCopilot/2026/AestaWebsite`
- Node 20+, pnpm 9+ (10 also fine), git, gh CLI authenticated for `findhari93-sketch` (collaborator on the repo)
- Active `main` branch, `pnpm install` already done

Verify before Task 1:

```bash
git status
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: clean working tree, all five gates exit 0, `Test Files 1 passed (1)` and `Tests 5 passed (5)`.

---

## File Structure (created or modified by this plan)

```
AestaWebsite/
├── app/
│   ├── [locale]/
│   │   └── layout.tsx                    # MODIFIED: emit Organization JSON-LD globally
│   ├── llms.txt/
│   │   └── route.ts                      # NEW: GET handler returning text/plain manifest
│   ├── robots.ts                         # NEW: Next.js metadata route
│   └── sitemap.ts                        # NEW: Next.js metadata route (single sitemap, year-1-sized)
├── components/
│   └── seo/
│       ├── JsonLd.tsx                    # NEW: <script type="application/ld+json"> primitive
│       ├── JsonLd.test.tsx
│       ├── FAQSection.tsx                # NEW: emits FAQPage
│       ├── FAQSection.test.tsx
│       ├── ProcessSteps.tsx              # NEW: emits HowTo
│       ├── ProcessSteps.test.tsx
│       ├── AggregateRating.tsx           # NEW: emits AggregateRating (gated by min-count)
│       ├── AggregateRating.test.tsx
│       ├── ReviewCard.tsx                # NEW: emits Review per card (optional)
│       ├── ReviewCard.test.tsx
│       ├── AuthorByline.tsx              # NEW: emits Person
│       ├── AuthorByline.test.tsx
│       ├── LanguageSwitcher.tsx          # NEW: hreflang-aware locale toggle
│       ├── LanguageSwitcher.test.tsx
│       ├── YouTubeEmbed.tsx              # NEW: emits VideoObject + lazy iframe
│       ├── YouTubeEmbed.test.tsx
│       ├── LocationHero.tsx              # NEW: emits Place + static OSM map
│       └── LocationHero.test.tsx
├── lib/
│   └── schema/
│       ├── organization.ts               # NEW: builds Organization schema from NAP
│       ├── organization.test.ts
│       ├── localBusiness.ts              # NEW: builds LocalBusiness schema from NAP + cities
│       └── localBusiness.test.ts
├── package.json                          # MODIFIED: add schema-dts dep
└── pnpm-lock.yaml                        # MODIFIED
```

Notes:

- All components live under `components/seo/` to keep the SEO surface in one place.
- `lib/schema/` holds non-component schema builders that are imported by components and pages.
- The `app/[locale]/layout.tsx` modification adds the global `Organization` JSON-LD; locale-aware metadata is already wired from Plan 1.
- We deliberately do NOT split sitemap into an index in this plan — single `app/sitemap.ts` is sufficient for the year-1 ceiling of ~170 pages (Next.js sitemap limit is 50,000 URLs per file). Sitemap-index split is documented as a future task in Plan 6 if/when programmatic pages multiply beyond the limit.

---

## Conventions used in this plan

- Working directory for all commands: `c:/Users/Haribabu/Documents/AppsCopilot/2026/AestaWebsite`
- Bash subprocess; forward slashes; Linux/macOS-style commands.
- Commits: Conventional Commits (`feat:`, `chore:`, `fix:`, `test:`, `refactor:`, `docs:`, `ci:`).
- One commit per task minimum. After every Edit, run `pnpm format` once before staging.
- Never use `git add .` or `git add -A` without first running `git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json"` to confirm no secret leak. The `safe`/`LEAK` pattern from Plan 1 stays.
- TDD: write the failing test, run, see fail with the expected error, implement, run, see pass.

---

## Task 1: Install `schema-dts` and add `lib/schema/` builders

**Files:**

- Modify: `package.json`, `pnpm-lock.yaml`
- Create: `lib/schema/organization.ts`
- Create: `lib/schema/organization.test.ts`
- Create: `lib/schema/localBusiness.ts`
- Create: `lib/schema/localBusiness.test.ts`

`schema-dts` provides TypeScript definitions for every schema.org type. Wrapping our JSON-LD payloads in `WithContext<...>` gives us compile-time validation — typos in field names fail typecheck.

- [ ] **Step 1: Install `schema-dts`**

```bash
pnpm add schema-dts@1.1.5
```

Expected: package added to `dependencies`. Lockfile regenerated.

- [ ] **Step 2: Write the failing test for `organization.ts`**

Create `lib/schema/organization.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildOrganization } from './organization';

describe('buildOrganization', () => {
  it('produces a valid Organization schema with NAP fields', () => {
    const org = buildOrganization();
    expect(org['@context']).toBe('https://schema.org');
    expect(org['@type']).toBe('Organization');
    expect(org.name).toContain('AESTA');
    expect(org.url).toMatch(/^https?:\/\//);
    expect(org.foundingDate).toMatch(/^\d{4}/);
  });

  it('includes founder, email, telephone', () => {
    const org = buildOrganization();
    expect(org.email).toMatch(/@/);
    expect(org.telephone).toMatch(/^\+\d/);
  });

  it('@id is the canonical site URL with #organization fragment', () => {
    const org = buildOrganization();
    expect(org['@id']).toMatch(/#organization$/);
  });
});
```

- [ ] **Step 3: Run test, confirm fail**

```bash
pnpm test -- organization
```

Expected: FAIL with "Cannot find module './organization'".

- [ ] **Step 4: Implement `organization.ts`**

Create `lib/schema/organization.ts`:

```ts
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
    foundingDate: `${NAP.foundingYear ?? NAP.foundedYear}`,
    areaServed: NAP.areaServed.map((c) => ({
      '@type': 'City' as const,
      name: c.name,
    })),
  };
}
```

Note: `NAP.foundedYear` from Plan 1 is the canonical field. The `?? NAP.foundingYear` is a defensive shim in case future renames happen — it has no current effect.

- [ ] **Step 5: Run test, confirm pass**

```bash
pnpm test -- organization
```

Expected: 3 passing tests.

- [ ] **Step 6: Write the failing test for `localBusiness.ts`**

Create `lib/schema/localBusiness.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildLocalBusiness } from './localBusiness';

describe('buildLocalBusiness', () => {
  it('produces a valid LocalBusiness schema with geo fields', () => {
    const lb = buildLocalBusiness({
      cityName: 'Pudukkottai',
      cityNameTa: 'புதுக்கோட்டை',
      lat: 10.3833,
      lng: 78.8001,
    });
    expect(lb['@context']).toBe('https://schema.org');
    expect(lb['@type']).toBe('LocalBusiness');
    expect(lb.name).toContain('AESTA');
    expect(lb.address).toBeDefined();
    expect(lb.geo).toMatchObject({
      '@type': 'GeoCoordinates',
      latitude: 10.3833,
      longitude: 78.8001,
    });
  });

  it('areaServed is an array of cities, including the focus city', () => {
    const lb = buildLocalBusiness({
      cityName: 'Karaikudi',
      cityNameTa: 'காரைக்குடி',
      lat: 10.0667,
      lng: 78.7833,
    });
    const areaNames = (lb.areaServed as { name: string }[]).map((a) => a.name);
    expect(areaNames).toContain('Karaikudi');
  });

  it('@id contains the city slug for uniqueness across city pages', () => {
    const lb = buildLocalBusiness({
      cityName: 'Aranthangi',
      cityNameTa: 'அறந்தாங்கி',
      lat: 10.1667,
      lng: 78.9833,
      citySlug: 'aranthangi',
    });
    expect(lb['@id']).toContain('aranthangi');
  });
});
```

- [ ] **Step 7: Run test, confirm fail**

```bash
pnpm test -- localBusiness
```

Expected: FAIL with "Cannot find module './localBusiness'".

- [ ] **Step 8: Implement `localBusiness.ts`**

Create `lib/schema/localBusiness.ts`:

```ts
import type { WithContext, LocalBusiness } from 'schema-dts';
import { NAP } from '@/lib/constants/nap';

export type LocalBusinessInput = {
  cityName: string;
  cityNameTa?: string;
  lat: number;
  lng: number;
  citySlug?: string;
};

export function buildLocalBusiness(input: LocalBusinessInput): WithContext<LocalBusiness> {
  const idSuffix = input.citySlug ? `#localbusiness-${input.citySlug}` : '#localbusiness';
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${NAP.siteUrl}/${idSuffix}`,
    name: NAP.name,
    url: NAP.siteUrl,
    email: NAP.email,
    telephone: NAP.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.address.streetAddress,
      addressLocality: NAP.address.addressLocality,
      addressRegion: NAP.address.addressRegion,
      postalCode: NAP.address.postalCode,
      addressCountry: NAP.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: input.lat,
      longitude: input.lng,
    },
    areaServed: NAP.areaServed.map((c) => ({
      '@type': 'City' as const,
      name: c.name,
    })),
  };
}
```

- [ ] **Step 9: Run test, confirm pass**

```bash
pnpm test -- localBusiness
```

Expected: 3 passing tests.

- [ ] **Step 10: Format + run all gates**

```bash
pnpm format
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: 11 tests pass total (5 NAP + 3 organization + 3 localBusiness). Lint clean. Typecheck clean.

- [ ] **Step 11: Commit**

```bash
git add lib/schema/ package.json pnpm-lock.yaml
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(schema): add Organization + LocalBusiness builders typed by schema-dts"
```

Must print `safe` before commit.

---

## Task 2: `<JsonLd>` primitive component

**Files:**

- Create: `components/seo/JsonLd.tsx`
- Create: `components/seo/JsonLd.test.tsx`

The primitive every other SEO component will use. Renders a `<script type="application/ld+json">` tag with safe JSON serialization (escape `</` to prevent script-tag breakout).

- [ ] **Step 1: Write the failing test**

Create `components/seo/JsonLd.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('renders a script tag with type application/ld+json', () => {
    const { container } = render(
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Thing' }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it('serializes the data as JSON inside the script tag', () => {
    const { container } = render(
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Thing', name: 'X' }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain('"name":"X"');
  });

  it('escapes </ to avoid breaking out of the script tag', () => {
    const { container } = render(
      <JsonLd
        data={{ '@context': 'https://schema.org', '@type': 'Thing', name: '</script><b>x' }}
      />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).not.toContain('</script>');
    expect(script?.textContent).toContain('<\\/script>');
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- JsonLd
```

Expected: FAIL with "Cannot find module './JsonLd'".

- [ ] **Step 3: Implement `JsonLd.tsx`**

Create `components/seo/JsonLd.tsx`:

```tsx
import type { Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  data: WithContext<Thing> | Record<string, unknown>;
};

function safeStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStringify(data) }} />
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- JsonLd
```

Expected: 3 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm test
git add components/seo/JsonLd.tsx components/seo/JsonLd.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add JsonLd primitive that safely emits typed schema.org payloads"
```

---

## Task 3: `<FAQSection>` component

**Files:**

- Create: `components/seo/FAQSection.tsx`
- Create: `components/seo/FAQSection.test.tsx`

Renders a list of Q&A pairs visually AND emits `FAQPage` JSON-LD with all questions in the page's structured data.

- [ ] **Step 1: Write the failing test**

Create `components/seo/FAQSection.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FAQSection } from './FAQSection';

const items = [
  { question: 'What does a 1500 sqft G+1 house cost?', answer: 'Approximately ₹31–48 lakh.' },
  { question: 'Do you handle DTCP approvals?', answer: 'Yes, included in turnkey packages.' },
];

describe('FAQSection', () => {
  it('renders each question and answer visually', () => {
    render(<FAQSection items={items} />);
    expect(screen.getByText(/1500 sqft G\+1/)).toBeInTheDocument();
    expect(screen.getByText(/₹31–48 lakh/)).toBeInTheDocument();
    expect(screen.getByText(/DTCP approvals/)).toBeInTheDocument();
  });

  it('emits FAQPage JSON-LD with all questions', () => {
    const { container } = render(<FAQSection items={items} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(2);
    expect(data.mainEntity[0]['@type']).toBe('Question');
    expect(data.mainEntity[0].name).toContain('1500 sqft');
    expect(data.mainEntity[0].acceptedAnswer.text).toContain('₹31');
  });

  it('renders nothing (and emits no schema) when items array is empty', () => {
    const { container } = render(<FAQSection items={[]} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
    expect(container.querySelector('section')).toBeNull();
  });

  it('uses the provided heading when given', () => {
    render(<FAQSection items={items} heading="Frequently asked" />);
    expect(screen.getByRole('heading', { name: /Frequently asked/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- FAQSection
```

Expected: FAIL with "Cannot find module './FAQSection'".

- [ ] **Step 3: Implement `FAQSection.tsx`**

Create `components/seo/FAQSection.tsx`:

```tsx
import type { WithContext, FAQPage } from 'schema-dts';
import { JsonLd } from './JsonLd';

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
  heading?: string;
};

export function FAQSection({ items, heading }: FAQSectionProps) {
  if (items.length === 0) return null;

  const data: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  };

  return (
    <section className="my-12">
      {heading ? <h2 className="mb-6 text-2xl font-bold">{heading}</h2> : null}
      <dl className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx}>
            <dt className="font-semibold">{item.question}</dt>
            <dd className="mt-2 text-neutral-700">{item.answer}</dd>
          </div>
        ))}
      </dl>
      <JsonLd data={data} />
    </section>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- FAQSection
```

Expected: 4 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm test
git add components/seo/FAQSection.tsx components/seo/FAQSection.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add FAQSection component emitting FAQPage JSON-LD"
```

---

## Task 4: `<ProcessSteps>` component

**Files:**

- Create: `components/seo/ProcessSteps.tsx`
- Create: `components/seo/ProcessSteps.test.tsx`

Renders a numbered process visually AND emits `HowTo` JSON-LD.

- [ ] **Step 1: Write the failing test**

Create `components/seo/ProcessSteps.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessSteps } from './ProcessSteps';

const steps = [
  { name: 'Consult', text: 'Free initial consultation at site or office.' },
  { name: 'Design', text: 'Architectural plans, 3D visualizations, structural drawings.' },
  { name: 'Build', text: 'Daily site supervision, quality checks, transparent reporting.' },
];

describe('ProcessSteps', () => {
  it('renders each step name and description', () => {
    render(<ProcessSteps name="How we work" steps={steps} />);
    expect(screen.getByText('Consult')).toBeInTheDocument();
    expect(screen.getByText(/Free initial consultation/)).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
  });

  it('emits HowTo JSON-LD with numbered steps', () => {
    const { container } = render(<ProcessSteps name="How we work" steps={steps} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('HowTo');
    expect(data.name).toBe('How we work');
    expect(data.step).toHaveLength(3);
    expect(data.step[0]['@type']).toBe('HowToStep');
    expect(data.step[0].name).toBe('Consult');
    expect(data.step[0].position).toBe(1);
    expect(data.step[2].position).toBe(3);
  });

  it('renders nothing and emits no schema for empty steps', () => {
    const { container } = render(<ProcessSteps name="empty" steps={[]} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('renders the heading', () => {
    render(<ProcessSteps name="Eight-step journey" steps={steps} />);
    expect(screen.getByRole('heading', { name: /Eight-step journey/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- ProcessSteps
```

Expected: FAIL with "Cannot find module './ProcessSteps'".

- [ ] **Step 3: Implement `ProcessSteps.tsx`**

Create `components/seo/ProcessSteps.tsx`:

```tsx
import type { WithContext, HowTo } from 'schema-dts';
import { JsonLd } from './JsonLd';

export type ProcessStep = {
  name: string;
  text: string;
};

type ProcessStepsProps = {
  name: string;
  steps: ProcessStep[];
};

export function ProcessSteps({ name, steps }: ProcessStepsProps) {
  if (steps.length === 0) return null;

  const data: WithContext<HowTo> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep' as const,
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-bold">{name}</h2>
      <ol className="space-y-4">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-4">
            <span className="font-bold text-terracotta-600" aria-hidden>
              {idx + 1}.
            </span>
            <div>
              <h3 className="font-semibold">{step.name}</h3>
              <p className="mt-1 text-neutral-700">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <JsonLd data={data} />
    </section>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- ProcessSteps
```

Expected: 4 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm test
git add components/seo/ProcessSteps.tsx components/seo/ProcessSteps.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add ProcessSteps component emitting HowTo JSON-LD"
```

---

## Task 5: `<AggregateRating>` component

**Files:**

- Create: `components/seo/AggregateRating.tsx`
- Create: `components/seo/AggregateRating.test.tsx`

Renders a star summary (e.g. "★★★★☆ 4.7 · 32 reviews") AND emits `AggregateRating` JSON-LD. Per the spec §2 Pillar 3, only emits schema when `count >= 3` (avoid manipulation flags).

- [ ] **Step 1: Write the failing test**

Create `components/seo/AggregateRating.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AggregateRating } from './AggregateRating';

describe('AggregateRating', () => {
  it('renders the average and count visually', () => {
    render(<AggregateRating average={4.7} count={32} />);
    expect(screen.getByText(/4\.7/)).toBeInTheDocument();
    expect(screen.getByText(/32 reviews/)).toBeInTheDocument();
  });

  it('emits AggregateRating JSON-LD when count >= 3', () => {
    const { container } = render(<AggregateRating average={4.7} count={32} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('AggregateRating');
    expect(data.ratingValue).toBe(4.7);
    expect(data.reviewCount).toBe(32);
    expect(data.bestRating).toBe(5);
    expect(data.worstRating).toBe(1);
    expect(data.itemReviewed).toBeDefined();
  });

  it('does NOT emit JSON-LD when count < 3 (avoid review-spam flagging)', () => {
    const { container } = render(<AggregateRating average={5} count={2} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('still renders visually even when count < 3', () => {
    render(<AggregateRating average={5} count={2} />);
    expect(screen.getByText(/2 reviews/)).toBeInTheDocument();
  });

  it('clamps average to one decimal place in JSON-LD', () => {
    const { container } = render(<AggregateRating average={4.6789} count={10} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data.ratingValue).toBe(4.7);
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- AggregateRating
```

Expected: FAIL with "Cannot find module './AggregateRating'".

- [ ] **Step 3: Implement `AggregateRating.tsx`**

Create `components/seo/AggregateRating.tsx`:

```tsx
import type { WithContext, AggregateRating as ARSchema } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { NAP } from '@/lib/constants/nap';

const MIN_COUNT_FOR_SCHEMA = 3;

type AggregateRatingProps = {
  average: number;
  count: number;
};

function roundTo1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function AggregateRating({ average, count }: AggregateRatingProps) {
  const rounded = roundTo1(average);
  const stars = '★★★★★☆☆☆☆☆'.slice(5 - Math.round(rounded), 10 - Math.round(rounded));

  const data: WithContext<ARSchema> = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rounded,
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-terracotta-600" aria-hidden>
        {stars}
      </span>
      <span className="font-semibold">{rounded.toFixed(1)}</span>
      <span className="text-neutral-600">·</span>
      <span className="text-neutral-600">{count} reviews</span>
      {count >= MIN_COUNT_FOR_SCHEMA ? <JsonLd data={data} /> : null}
    </div>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- AggregateRating
```

Expected: 5 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm test
git add components/seo/AggregateRating.tsx components/seo/AggregateRating.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add AggregateRating component (gated by min review count of 3)"
```

---

## Task 6: `<ReviewCard>` component

**Files:**

- Create: `components/seo/ReviewCard.tsx`
- Create: `components/seo/ReviewCard.test.tsx`

Renders one review with platform-source badge AND optionally emits `Review` JSON-LD when used standalone (e.g., on a project page). When used inside a list with `AggregateRating` already emitted, the parent decides whether to include per-card schema.

- [ ] **Step 1: Write the failing test**

Create `components/seo/ReviewCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';

const review = {
  authorName: 'Karthik R',
  authorLocation: 'Alangudi',
  rating: 5,
  quote: 'Excellent work, finished on time, transparent throughout.',
  source: 'gbp' as const,
  date: '2025-12-04',
};

describe('ReviewCard', () => {
  it('renders author name, quote, and rating stars', () => {
    render(<ReviewCard {...review} />);
    expect(screen.getByText('Karthik R')).toBeInTheDocument();
    expect(screen.getByText(/Excellent work/)).toBeInTheDocument();
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
  });

  it('shows the platform-source badge label', () => {
    render(<ReviewCard {...review} />);
    expect(screen.getByText(/Google/i)).toBeInTheDocument();
  });

  it('shows author location when provided', () => {
    render(<ReviewCard {...review} />);
    expect(screen.getByText(/Alangudi/)).toBeInTheDocument();
  });

  it('emits Review JSON-LD when withSchema=true', () => {
    const { container } = render(<ReviewCard {...review} withSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('Review');
    expect(data.author.name).toBe('Karthik R');
    expect(data.reviewRating.ratingValue).toBe(5);
    expect(data.reviewBody).toContain('Excellent');
    expect(data.datePublished).toBe('2025-12-04');
  });

  it('does NOT emit JSON-LD by default (parent aggregates)', () => {
    const { container } = render(<ReviewCard {...review} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('maps each known source to a friendly label', () => {
    const { rerender } = render(<ReviewCard {...review} source="justdial" />);
    expect(screen.getByText('JustDial')).toBeInTheDocument();
    rerender(<ReviewCard {...review} source="houzz" />);
    expect(screen.getByText('Houzz')).toBeInTheDocument();
    rerender(<ReviewCard {...review} source="facebook" />);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- ReviewCard
```

Expected: FAIL with "Cannot find module './ReviewCard'".

- [ ] **Step 3: Implement `ReviewCard.tsx`**

Create `components/seo/ReviewCard.tsx`:

```tsx
import type { WithContext, Review } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { NAP } from '@/lib/constants/nap';

export type ReviewSource =
  | 'gbp'
  | 'facebook'
  | 'justdial'
  | 'sulekha'
  | 'houzz'
  | 'indiamart'
  | 'trustpilot'
  | 'direct';

const SOURCE_LABEL: Record<ReviewSource, string> = {
  gbp: 'Google',
  facebook: 'Facebook',
  justdial: 'JustDial',
  sulekha: 'Sulekha',
  houzz: 'Houzz',
  indiamart: 'IndiaMART',
  trustpilot: 'Trustpilot',
  direct: 'Direct',
};

type ReviewCardProps = {
  authorName: string;
  authorLocation?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: ReviewSource;
  date?: string;
  withSchema?: boolean;
};

export function ReviewCard({
  authorName,
  authorLocation,
  rating,
  quote,
  source,
  date,
  withSchema = false,
}: ReviewCardProps) {
  const stars = '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);

  const data: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: quote,
    datePublished: date,
    itemReviewed: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
    },
  };

  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-6">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{authorName}</p>
          {authorLocation ? <p className="text-sm text-neutral-600">{authorLocation}</p> : null}
        </div>
        <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
          {SOURCE_LABEL[source]}
        </span>
      </header>
      <p className="mt-3 text-terracotta-600" aria-label={`${rating} out of 5 stars`}>
        {stars}
      </p>
      <blockquote className="mt-3 text-neutral-700">{quote}</blockquote>
      {withSchema ? <JsonLd data={data} /> : null}
    </article>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- ReviewCard
```

Expected: 6 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm test
git add components/seo/ReviewCard.tsx components/seo/ReviewCard.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add ReviewCard component with platform-source badge and optional Review JSON-LD"
```

---

## Task 7: `<AuthorByline>` component

**Files:**

- Create: `components/seo/AuthorByline.tsx`
- Create: `components/seo/AuthorByline.test.tsx`

Renders an author name + credentials + photo + relative date AND emits `Person` JSON-LD. Used on blog posts, entity pages, and programmatic landing pages for E-E-A-T signal.

- [ ] **Step 1: Write the failing test**

Create `components/seo/AuthorByline.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthorByline } from './AuthorByline';

const author = {
  name: 'Hari Babu',
  credentials: 'B.Arch, NIT Trichy 2016',
  slug: 'hari-babu',
  photoUrl: 'https://aesta.co.in/team/hari.jpg',
};

describe('AuthorByline', () => {
  it('renders the author name and credentials', () => {
    render(<AuthorByline author={author} />);
    expect(screen.getByText('Hari Babu')).toBeInTheDocument();
    expect(screen.getByText(/B\.Arch, NIT Trichy 2016/)).toBeInTheDocument();
  });

  it('shows the photo when provided', () => {
    render(<AuthorByline author={author} />);
    const img = screen.getByRole('img', { name: /Hari Babu/ });
    expect(img).toHaveAttribute('src', author.photoUrl);
  });

  it('renders publishedAt date when provided', () => {
    render(<AuthorByline author={author} publishedAt="2026-04-29" />);
    expect(screen.getByText(/2026-04-29/)).toBeInTheDocument();
  });

  it('emits Person JSON-LD with @id linking to the author page', () => {
    const { container } = render(<AuthorByline author={author} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Hari Babu');
    expect(data.jobTitle).toContain('B.Arch');
    expect(data['@id']).toMatch(/\/about\/team\/hari-babu$/);
    expect(data.image).toBe(author.photoUrl);
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- AuthorByline
```

Expected: FAIL with "Cannot find module './AuthorByline'".

- [ ] **Step 3: Implement `AuthorByline.tsx`**

Create `components/seo/AuthorByline.tsx`:

```tsx
import type { WithContext, Person } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { NAP } from '@/lib/constants/nap';

export type AuthorInfo = {
  name: string;
  credentials?: string;
  slug: string;
  photoUrl?: string;
};

type AuthorBylineProps = {
  author: AuthorInfo;
  publishedAt?: string;
};

export function AuthorByline({ author, publishedAt }: AuthorBylineProps) {
  const data: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${NAP.siteUrl}/about/team/${author.slug}`,
    name: author.name,
    jobTitle: author.credentials,
    image: author.photoUrl,
  };

  return (
    <div className="flex items-center gap-3">
      {author.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={author.photoUrl}
          alt={author.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : null}
      <div className="text-sm">
        <p className="font-semibold">{author.name}</p>
        {author.credentials ? <p className="text-neutral-600">{author.credentials}</p> : null}
        {publishedAt ? (
          <p className="text-neutral-500">
            <time dateTime={publishedAt}>{publishedAt}</time>
          </p>
        ) : null}
      </div>
      <JsonLd data={data} />
    </div>
  );
}
```

Note: The plan deliberately uses `<img>` instead of `next/image` for simplicity in this primitive. Real pages in Plan 3 may swap to `<Image>` if photo URLs are known at build time.

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- AuthorByline
```

Expected: 4 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add components/seo/AuthorByline.tsx components/seo/AuthorByline.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add AuthorByline component emitting Person JSON-LD for E-E-A-T"
```

---

## Task 8: `<LanguageSwitcher>` component

**Files:**

- Create: `components/seo/LanguageSwitcher.tsx`
- Create: `components/seo/LanguageSwitcher.test.tsx`

Renders a locale toggle (English ↔ தமிழ்) with proper `<Link>` URLs for the current path in the alternate locale. No JSON-LD here — `hreflang` tags belong in `<head>` via Next.js metadata, which Plan 3 will wire when each page exists. This component handles the user-facing UI toggle only.

- [ ] **Step 1: Write the failing test**

Create `components/seo/LanguageSwitcher.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

let mockLocale = 'en-IN';
let mockPathname = '/services';

vi.mock('next-intl', () => ({
  useLocale: () => mockLocale,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    cleanup();
  });

  it('on en-IN page: renders alternate link to /ta-IN/<path>', () => {
    mockLocale = 'en-IN';
    mockPathname = '/services';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /தமிழ்/ });
    expect(link).toHaveAttribute('href', '/ta-IN/services');
  });

  it('on en-IN homepage: alternate link is /ta-IN', () => {
    mockLocale = 'en-IN';
    mockPathname = '/';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /தமிழ்/ });
    expect(link).toHaveAttribute('href', '/ta-IN');
  });

  it('on ta-IN page: alternate link strips the /ta-IN prefix (default locale has no prefix)', () => {
    mockLocale = 'ta-IN';
    mockPathname = '/ta-IN/services';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /English/ });
    expect(link).toHaveAttribute('href', '/services');
  });

  it('on ta-IN homepage: alternate link is /', () => {
    mockLocale = 'ta-IN';
    mockPathname = '/ta-IN';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /English/ });
    expect(link).toHaveAttribute('href', '/');
  });

  it('shows the current locale label as static text (not a link)', () => {
    mockLocale = 'en-IN';
    mockPathname = '/';
    render(<LanguageSwitcher />);
    expect(screen.getByText('English')).toBeInTheDocument();
    const englishElements = screen.queryAllByRole('link', { name: /^English$/ });
    expect(englishElements).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- LanguageSwitcher
```

Expected: FAIL with "Cannot find module './LanguageSwitcher'".

- [ ] **Step 3: Implement `LanguageSwitcher.tsx`**

Create `components/seo/LanguageSwitcher.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

const LOCALE_LABEL: Record<Locale, string> = {
  'en-IN': 'English',
  'ta-IN': 'தமிழ்',
};

function buildAlternateHref(pathname: string, currentLocale: Locale, alternate: Locale): string {
  // Strip the current locale prefix (if it appears in the URL — only non-default locales do).
  const prefixRegex = new RegExp(`^/${currentLocale}(/|$)`);
  const stripped = pathname.replace(prefixRegex, '/');
  const normalized = stripped.startsWith('/') ? stripped : `/${stripped}`;

  // localePrefix is 'as-needed' (i18n/config.ts): default locale has NO prefix; others get /<locale>.
  if (alternate === defaultLocale) {
    return normalized;
  }
  return `/${alternate}${normalized === '/' ? '' : normalized}`;
}

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const alternate = locales.find((l) => l !== currentLocale) as Locale;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span aria-current="true" className="font-medium">
        {LOCALE_LABEL[currentLocale]}
      </span>
      <span aria-hidden className="text-neutral-400">
        ·
      </span>
      <Link
        href={buildAlternateHref(pathname, currentLocale, alternate)}
        className="text-terracotta-600 underline-offset-4 hover:underline"
        hrefLang={alternate}
      >
        {LOCALE_LABEL[alternate]}
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- LanguageSwitcher
```

Expected: 3 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add components/seo/LanguageSwitcher.tsx components/seo/LanguageSwitcher.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add LanguageSwitcher component with hreflang-aware locale toggle"
```

---

## Task 9: `<YouTubeEmbed>` component

**Files:**

- Create: `components/seo/YouTubeEmbed.tsx`
- Create: `components/seo/YouTubeEmbed.test.tsx`

Renders a lazy-loaded YouTube `<iframe>` AND emits `VideoObject` JSON-LD. Lazy-loading: `loading="lazy"` on the iframe (good enough; full facade pattern with click-to-load is overkill until we measure real LCP impact in Plan 3).

- [ ] **Step 1: Write the failing test**

Create `components/seo/YouTubeEmbed.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YouTubeEmbed } from './YouTubeEmbed';

const props = {
  videoId: 'dQw4w9WgXcQ',
  title: 'Pushparaj Sustainable House Walkthrough',
  description: 'A 5-minute Tamil walkthrough of our 2400 sqft Onnangudi project.',
  uploadDate: '2026-03-15',
  durationISO8601: 'PT5M30S',
};

describe('YouTubeEmbed', () => {
  it('renders an iframe with the youtube embed URL', () => {
    render(<YouTubeEmbed {...props} />);
    const iframe = screen.getByTitle(props.title) as HTMLIFrameElement;
    expect(iframe.src).toContain('youtube.com/embed/dQw4w9WgXcQ');
  });

  it('lazy-loads the iframe', () => {
    render(<YouTubeEmbed {...props} />);
    const iframe = screen.getByTitle(props.title);
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('emits VideoObject JSON-LD with required fields', () => {
    const { container } = render(<YouTubeEmbed {...props} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('VideoObject');
    expect(data.name).toBe(props.title);
    expect(data.description).toBe(props.description);
    expect(data.uploadDate).toBe(props.uploadDate);
    expect(data.duration).toBe(props.durationISO8601);
    expect(data.contentUrl).toContain(props.videoId);
    expect(data.thumbnailUrl).toContain(props.videoId);
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- YouTubeEmbed
```

Expected: FAIL with "Cannot find module './YouTubeEmbed'".

- [ ] **Step 3: Implement `YouTubeEmbed.tsx`**

Create `components/seo/YouTubeEmbed.tsx`:

```tsx
import type { WithContext, VideoObject } from 'schema-dts';
import { JsonLd } from './JsonLd';

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string; // ISO 8601 date
  durationISO8601: string; // e.g. "PT5M30S"
};

export function YouTubeEmbed({
  videoId,
  title,
  description,
  uploadDate,
  durationISO8601,
}: YouTubeEmbedProps) {
  const data: WithContext<VideoObject> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    uploadDate,
    duration: durationISO8601,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };

  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
      <JsonLd data={data} />
    </div>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- YouTubeEmbed
```

Expected: 3 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add components/seo/YouTubeEmbed.tsx components/seo/YouTubeEmbed.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add YouTubeEmbed component with lazy iframe and VideoObject JSON-LD"
```

---

## Task 10: `<LocationHero>` component

**Files:**

- Create: `components/seo/LocationHero.tsx`
- Create: `components/seo/LocationHero.test.tsx`

Renders a city heading, sub-header, and an OSM-embedded static map AND emits `LocalBusiness` JSON-LD (delegates to `lib/schema/localBusiness.ts`). OSM embed URL: `https://www.openstreetmap.org/export/embed.html?bbox=...&layer=mapnik&marker=lat,lng` — free, no API key, no cookies.

- [ ] **Step 1: Write the failing test**

Create `components/seo/LocationHero.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocationHero } from './LocationHero';

const props = {
  cityName: 'Pudukkottai',
  cityNameTa: 'புதுக்கோட்டை',
  citySlug: 'pudukkottai',
  lat: 10.3833,
  lng: 78.8001,
};

describe('LocationHero', () => {
  it('renders the city name and tagline', () => {
    render(<LocationHero {...props} />);
    expect(screen.getByRole('heading', { name: /Pudukkottai/ })).toBeInTheDocument();
    expect(screen.getByText(/since 2010/i)).toBeInTheDocument();
  });

  it('renders an iframe with OSM embed URL containing the marker', () => {
    render(<LocationHero {...props} />);
    const iframe = screen.getByTitle(/Pudukkottai location/i) as HTMLIFrameElement;
    expect(iframe.src).toContain('openstreetmap.org/export/embed.html');
    expect(iframe.src).toContain('marker=10.3833%2C78.8001');
  });

  it('iframe lazy-loads', () => {
    render(<LocationHero {...props} />);
    const iframe = screen.getByTitle(/Pudukkottai location/i);
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('emits LocalBusiness JSON-LD with correct geo and citySlug-keyed @id', () => {
    const { container } = render(<LocationHero {...props} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.geo.latitude).toBe(10.3833);
    expect(data.geo.longitude).toBe(78.8001);
    expect(data['@id']).toContain('pudukkottai');
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- LocationHero
```

Expected: FAIL with "Cannot find module './LocationHero'".

- [ ] **Step 3: Implement `LocationHero.tsx`**

Create `components/seo/LocationHero.tsx`:

```tsx
import { JsonLd } from './JsonLd';
import { buildLocalBusiness } from '@/lib/schema/localBusiness';

type LocationHeroProps = {
  cityName: string;
  cityNameTa?: string;
  citySlug: string;
  lat: number;
  lng: number;
};

const BBOX_DELTA = 0.05; // ~5km square around the marker

function buildOsmEmbedUrl(lat: number, lng: number): string {
  const minLng = lng - BBOX_DELTA;
  const minLat = lat - BBOX_DELTA;
  const maxLng = lng + BBOX_DELTA;
  const maxLat = lat + BBOX_DELTA;
  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
  const marker = `${lat},${lng}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox,
  )}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export function LocationHero({ cityName, cityNameTa, citySlug, lat, lng }: LocationHeroProps) {
  const schema = buildLocalBusiness({ cityName, cityNameTa, lat, lng, citySlug });

  return (
    <section className="my-8 grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">
          AESTA — Building in {cityName}
          {cityNameTa ? <span className="ml-2 text-neutral-500">/ {cityNameTa}</span> : null}
        </h1>
        <p className="mt-3 text-lg text-neutral-700">since 2010</p>
      </div>
      <div className="aspect-video overflow-hidden rounded-lg border border-neutral-200">
        <iframe
          src={buildOsmEmbedUrl(lat, lng)}
          title={`${cityName} location map`}
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <JsonLd data={schema} />
    </section>
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- LocationHero
```

Expected: 4 passing tests.

- [ ] **Step 5: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add components/seo/LocationHero.tsx components/seo/LocationHero.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add LocationHero component with OSM static-map embed and LocalBusiness JSON-LD"
```

---

## Task 11: Global Organization JSON-LD in root layout

**Files:**

- Modify: `app/[locale]/layout.tsx`

Inject the `Organization` schema into every page via the root layout, so the entire site has a consistent business identity in structured data.

- [ ] **Step 1: Read the current layout**

Run `cat "app/[locale]/layout.tsx"` to confirm the current shape (Plan 1 + Plan 1 Task 12 final version).

- [ ] **Step 2: Modify the layout to render `<JsonLd>` with `buildOrganization()`**

Find the existing `<body>` open in `app/[locale]/layout.tsx`. Add `<JsonLd data={buildOrganization()} />` as a sibling of the `<NextIntlClientProvider>` block — placing it inside `<body>` is valid and recommended for Next.js 14 (App Router accepts schema in body or head).

Add these imports at the top of the file (alongside the existing imports):

```tsx
import { JsonLd } from '@/components/seo/JsonLd';
import { buildOrganization } from '@/lib/schema/organization';
```

Inside the `<body>` block, change:

```tsx
<body className="bg-limestone-50 text-charcoal-900 antialiased">
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
</body>
```

to:

```tsx
<body className="bg-limestone-50 text-charcoal-900 antialiased">
  <JsonLd data={buildOrganization()} />
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
</body>
```

- [ ] **Step 3: Build to verify**

```bash
pnpm build
```

Expected: build succeeds. Output includes both `/en-IN` and `/ta-IN` routes.

Quickly inspect that the JSON-LD is in the rendered HTML:

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 12
curl -s http://localhost:3000/ | grep -o 'application/ld+json' | head -3
kill $DEV_PID 2>/dev/null
```

Expected: at least one `application/ld+json` match.

- [ ] **Step 4: Format + run gates + commit**

```bash
pnpm format
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
git add "app/[locale]/layout.tsx"
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): emit global Organization JSON-LD from root locale layout"
```

---

## Task 12: `app/robots.ts` — robots.txt with AI-crawler allowlist

**Files:**

- Create: `app/robots.ts`

Per spec §2 Pillar 1, AESTA explicitly welcomes AI crawlers. Use Next.js's `MetadataRoute.Robots` to emit `/robots.txt` at the root.

- [ ] **Step 1: Write the file**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { NAP } from '@/lib/constants/nap';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything except admin
      { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/*', '/api/*'] },

      // Explicit AI-crawler allowlist (most sites block these — we welcome them)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
    ],
    sitemap: `${NAP.siteUrl}/sitemap.xml`,
    host: NAP.siteUrl,
  };
}
```

- [ ] **Step 2: Build, verify the route exists**

```bash
pnpm build
```

Expected: build output lists `/robots.txt` as a route.

Verify content in dev:

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 12
curl -s http://localhost:3000/robots.txt | head -25
kill $DEV_PID 2>/dev/null
```

Expected: output starts with `User-Agent: *` and includes `User-Agent: GPTBot` later in the file. Sitemap line points to `/sitemap.xml`.

- [ ] **Step 3: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add app/robots.ts
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add robots.txt with explicit AI-crawler allowlist"
```

---

## Task 13: `app/sitemap.ts` — single sitemap for current routes

**Files:**

- Create: `app/sitemap.ts`

A single sitemap is sufficient for the current page count (only the placeholder homepage exists in two locales). Plan 3 will add real pages and Plan 6 may split into a sitemap-index when programmatic pages multiply.

- [ ] **Step 1: Write the file**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { NAP } from '@/lib/constants/nap';
import { locales, defaultLocale } from '@/i18n/config';

const STATIC_PATHS = ['/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const alternates = Object.fromEntries(
      locales.map((locale) => {
        const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
        return [locale, `${NAP.siteUrl}${localePrefix}${path === '/' ? '' : path}`];
      }),
    );
    for (const locale of locales) {
      const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${NAP.siteUrl}${localePrefix}${path === '/' ? '' : path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: path === '/' ? 1.0 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
```

- [ ] **Step 2: Build, verify**

```bash
pnpm build
```

Expected: build output lists `/sitemap.xml` as a route.

Verify in dev:

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 12
curl -s http://localhost:3000/sitemap.xml | head -25
kill $DEV_PID 2>/dev/null
```

Expected: XML output with `<urlset>` containing entries for `/` and `/ta-IN`, with `<xhtml:link rel="alternate" hreflang="...">` cross-references.

- [ ] **Step 3: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add app/sitemap.ts
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add sitemap.xml metadata route with hreflang alternates"
```

---

## Task 14: `app/llms.txt/route.ts` — manifest for AI ingestion

**Files:**

- Create: `app/llms.txt/route.ts`
- Create: `app/llms.txt/route.test.ts`

`llms.txt` is an emerging convention (similar to `robots.txt` but for LLM crawlers) that lists canonical pages with summaries to make AI ingestion accurate. Per spec §2 Pillar 1, we ship this from day one. The format is a markdown-flavored manifest served as `text/plain`.

- [ ] **Step 1: Write the failing test**

Create `app/llms.txt/route.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /llms.txt', () => {
  it('returns text/plain content', async () => {
    const res = await GET();
    expect(res.headers.get('content-type')).toContain('text/plain');
  });

  it('starts with the AESTA name as the H1', async () => {
    const res = await GET();
    const body = await res.text();
    const firstLine = body.split('\n')[0];
    expect(firstLine).toMatch(/^# AESTA/);
  });

  it('includes a Summary section', async () => {
    const res = await GET();
    const body = await res.text();
    expect(body).toMatch(/^> /m); // standard llms.txt blockquote summary
  });

  it('includes at least one canonical-content section', async () => {
    const res = await GET();
    const body = await res.text();
    expect(body).toMatch(/^## /m);
  });
});
```

- [ ] **Step 2: Run test, confirm fail**

```bash
pnpm test -- llms
```

Expected: FAIL with "Cannot find module './route'".

- [ ] **Step 3: Implement `route.ts`**

Create `app/llms.txt/route.ts`:

```ts
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
```

- [ ] **Step 4: Run test, confirm pass**

```bash
pnpm test -- llms
```

Expected: 4 passing tests.

- [ ] **Step 5: Verify in build + dev**

```bash
pnpm build
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 12
curl -s http://localhost:3000/llms.txt | head -10
kill $DEV_PID 2>/dev/null
```

Expected: output starts with `# AESTA — Architects & Builders` and includes the summary blockquote.

- [ ] **Step 6: Format + commit**

```bash
pnpm format
pnpm format:check && pnpm typecheck && pnpm lint && pnpm test
git add app/llms.txt/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(seo): add llms.txt route with canonical-page manifest for AI ingestion"
```

---

## Task 15: CI step — schema validation via typecheck + tests

**Files:**

- No new files. CI is already running `pnpm typecheck` and `pnpm test`.

The schema-dts library + the per-component tests already validate every JSON-LD payload at compile time and at runtime. There is no additional CI work needed in this plan: typecheck + the tests we wrote in Tasks 1–14 are the validator. This task documents that decision and runs the full gate-suite once more on `main`.

- [ ] **Step 1: Run all gates locally**

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: every command exits 0. Test count should be: 5 (NAP) + 3 (organization) + 3 (localBusiness) + 3 (JsonLd) + 4 (FAQSection) + 4 (ProcessSteps) + 5 (AggregateRating) + 6 (ReviewCard) + 4 (AuthorByline) + 5 (LanguageSwitcher) + 3 (YouTubeEmbed) + 4 (LocationHero) + 4 (llms.txt route) = **53 tests**.

If the count is off, find the missing component and re-run its specific test file.

- [ ] **Step 2: Push to `main` and watch CI**

```bash
git push origin main
gh run list --repo aestabuilders-arch/aestawebsite --limit 1
# Capture the run ID, then:
gh run watch <RUN_ID> --repo aestabuilders-arch/aestawebsite --exit-status
```

Expected: CI green (Format check, Lint, Typecheck, Test, Build all pass).

- [ ] **Step 3: Tag the milestone**

```bash
git tag -a plan-2-seo-components -m "Plan 2: SEO components, AI-crawler infra (robots, sitemap, llms.txt), schema validation"
git push origin plan-2-seo-components
```

---

## Completion criteria

Plan 2 is complete when **all** of the following are true:

1. All 8 SEO components exist under `components/seo/` with passing tests.
2. `lib/schema/organization.ts` and `lib/schema/localBusiness.ts` build typed payloads via `schema-dts`.
3. Root layout (`app/[locale]/layout.tsx`) emits `<JsonLd data={buildOrganization()} />`, visible in `view-source` of `/` and `/ta-IN`.
4. `/robots.txt` returns the AI-crawler allowlist when curled in dev.
5. `/sitemap.xml` returns valid XML with hreflang alternates for the placeholder home page.
6. `/llms.txt` returns a markdown-formatted canonical-page manifest.
7. `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build` all exit 0 locally.
8. **53 tests pass** (count breakdown in Task 15 Step 1).
9. CI green on `main` for the final commit.
10. Tag `plan-2-seo-components` exists on `aestabuilders-arch/aestawebsite`.

---

## What this plan explicitly doesn't build

These items appear in the spec but live in later plans:

- **Pages that consume these components.** Homepage, services, pricing, projects, locations, about, contact, quote — Plan 3.
- **Per-page metadata (`hreflang` tags, canonical URLs, OG images).** Wired in Plan 3 once each page exists with a real URL structure.
- **Lighthouse CI.** Requires real pages with real content to score against. Added in Plan 3.
- **`hreflang` cross-locale validator.** Requires real per-locale pages to validate. Added in Plan 3.
- **Entity / blog pipeline (MDX).** Plan 4.
- **Admin panel CRUDs.** Plan 5.
- **Programmatic landing pages.** Plan 6.
- **Sitemap-index split.** Plan 6 — only when programmatic pages exceed 50K URLs (year 1 ceiling: ~170 pages, well under).
- **Click-to-load YouTube facade pattern.** Defer until LCP measurements in Plan 3 prove it's worth the complexity.
- **WhatsApp / GBP integrations.** Plan 7.

Tracked here so nothing is lost between plans.
