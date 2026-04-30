# AESTA Layout Shell + Global UI Implementation Plan (Plan 3a of marketing-pages series)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the global layout chrome (`<Header>`, `<Footer>`, `<Nav>`, mobile menu, breadcrumbs, friendly 404, accessibility primitives) and the per-page metadata helper, so every page built in Plans 3b–3h slots into a consistent, bilingual, accessible shell.

**Architecture:** Server-rendered `<Header>` and `<Footer>` for SEO and CSS performance, with two small client islands: `<MobileMenu>` (state toggle) and the existing `<LanguageSwitcher>` from Plan 2. Per-page metadata flows through `lib/metadata/page-metadata.ts` so every page emits canonical URL + hreflang alternates without duplicated logic. Breadcrumbs render visually AND emit `BreadcrumbList` JSON-LD via the `<JsonLd>` primitive from Plan 2.

**Tech Stack:** Next.js 14 App Router (server + client components), TypeScript, Tailwind CSS, next-intl (already wired), Vitest + Testing Library, schema-dts.

**Out of scope (deferred to later plans):**

- Homepage content (Plan 3b)
- Service pages, pricing, projects, locations, about, contact, quote, reviews, press, legal pages (Plans 3c–3h)
- Logo design (Master Plan §1.6 — wordmark stub used until designed)
- Analytics scripts (deferred to Plan 7 with operational integrations)
- Cookie banner / GDPR — out of scope for India-first launch

**Companion documents:**

- Strategy spec: [docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md](../specs/2026-04-23-aesta-seo-aeo-strategy-design.md)
- Master plan §4: [AESTA_WEBSITE_PLAN.md](../../../AESTA_WEBSITE_PLAN.md)
- Plan 1 (foundation, complete, tagged `plan-1-foundation`)
- Plan 1.5 (RLS hardening, complete, applied)
- Plan 2 (SEO components, complete, tagged `plan-2-seo-components`)

---

## Decisions taken (from controller, before this plan was written)

1. **Decomposition confirmed.** Marketing pages split into 8 sub-plans (3a–3h). This is 3a.
2. **NAP placeholders OK for v0.** Header and Footer will render the current zero-placeholder values from `.env.local`. User updates `.env.local` later (Master Plan §12 #9) and the values flow through automatically.
3. **Full primary nav from day one.** All 6 nav items (Services, Projects, Pricing, Locations, About, Contact) are clickable. Routes that don't yet exist render the friendly 404 built in this plan with "Coming soon" copy and links back to working pages.

---

## Prerequisites

- Plan 2 complete (tagged `plan-2-seo-components`, 53 tests passing, `<LanguageSwitcher>`, `<JsonLd>`, `<AggregateRating>`, etc. live)
- Working directory: `c:/Users/Haribabu/Documents/AppsCopilot/2026/AestaWebsite`
- On `main` branch with all gates green

Verify before Task 1:

```bash
git status
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: clean tree, all five gates exit 0, **53 tests pass** across 13 test files.

---

## File Structure (created or modified by this plan)

```
AestaWebsite/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                # MODIFIED: wrap children with <SkipToContent>, <Header>, <main id="main">, <Footer>
│   │   ├── page.tsx                  # MODIFIED: placeholder content with proper landmarks (h1 inside main)
│   │   └── not-found.tsx             # NEW: locale-aware friendly 404
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # NEW: server component
│   │   ├── Header.test.tsx
│   │   ├── Footer.tsx                # NEW: server component
│   │   ├── Footer.test.tsx
│   │   ├── MobileMenu.tsx            # NEW: 'use client' island
│   │   ├── MobileMenu.test.tsx
│   │   ├── Breadcrumbs.tsx           # NEW: server component, emits BreadcrumbList JSON-LD
│   │   ├── Breadcrumbs.test.tsx
│   │   ├── SkipToContent.tsx         # NEW: a11y skip link
│   │   └── SkipToContent.test.tsx
│   └── seo/                          # (existing from Plan 2 — unchanged)
├── lib/
│   ├── nav/
│   │   ├── primary-nav.ts            # NEW: nav items config (translation keys)
│   │   └── primary-nav.test.ts
│   └── metadata/
│       ├── page-metadata.ts          # NEW: builds Metadata with canonical + hreflang
│       └── page-metadata.test.ts
└── i18n/
    └── messages/
        ├── en-IN.json                # MODIFIED: add nav, footer, notFound, layout strings
        └── ta-IN.json                # MODIFIED: matching Tamil strings
```

---

## Conventions (same as Plans 1, 1.5, 2)

- Working dir: `c:/Users/Haribabu/Documents/AppsCopilot/2026/AestaWebsite`. Bash; forward slashes.
- Conventional Commits. One commit per task.
- Pre-commit secret check (`grep -E "\.env\.local|settings\.local\.json"` → must print `safe`).
- Strict TDD: failing test first, run to confirm fail with the right error, implement, run to confirm pass.
- After each task: `pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test`.
- Tamil translations: every Tamil string is provided literally in the relevant task. Use exactly what's specified. A native-speaker review pass before launch is tracked as an operational task in the SEO/AEO spec §2 Pillar 6 — not in this plan.

---

## Task 1: Primary nav configuration

**Files:**

- Create: `lib/nav/primary-nav.ts`
- Create: `lib/nav/primary-nav.test.ts`
- Modify: `i18n/messages/en-IN.json` (already has `nav` block from Plan 1; verify keys match)
- Modify: `i18n/messages/ta-IN.json` (verify keys match)

The existing `nav` block in both message files already has `services`, `projects`, `pricing`, `locations`, `about`, `contact`. We're going to make a typed config that maps href → translation key.

- [ ] **Step 1: Write the failing test**

Create `lib/nav/primary-nav.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { PRIMARY_NAV, type NavItem } from './primary-nav';

describe('PRIMARY_NAV', () => {
  it('exposes all six top-level nav items in stable order', () => {
    expect(PRIMARY_NAV.map((i: NavItem) => i.href)).toEqual([
      '/services',
      '/projects',
      '/pricing',
      '/locations',
      '/about',
      '/contact',
    ]);
  });

  it('every item has a translation key under the nav namespace', () => {
    const keys = PRIMARY_NAV.map((i) => i.labelKey);
    expect(keys).toEqual(['services', 'projects', 'pricing', 'locations', 'about', 'contact']);
  });

  it('every href starts with /', () => {
    for (const item of PRIMARY_NAV) {
      expect(item.href.startsWith('/')).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
pnpm test -- primary-nav
```

Expected: FAIL with "Cannot find module './primary-nav'".

- [ ] **Step 3: Implement**

Create `lib/nav/primary-nav.ts`:

```ts
export type NavItem = {
  href: string;
  labelKey: 'services' | 'projects' | 'pricing' | 'locations' | 'about' | 'contact';
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: '/services', labelKey: 'services' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/pricing', labelKey: 'pricing' },
  { href: '/locations', labelKey: 'locations' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
] as const;
```

- [ ] **Step 4: Run, confirm 3 pass**

```bash
pnpm test -- primary-nav
```

- [ ] **Step 5: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **56 tests** (53 + 3).

- [ ] **Step 6: Commit**

```bash
git add lib/nav/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(nav): add typed primary-nav config keyed by translation labels"
```

---

## Task 2: Page metadata helper

**Files:**

- Create: `lib/metadata/page-metadata.ts`
- Create: `lib/metadata/page-metadata.test.ts`

A pure function that any per-page `generateMetadata` calls to get `Metadata` with title, description, canonical URL, and hreflang alternates. Centralizes the locale-prefix logic (`as-needed` strategy from Plan 1) so no page reimplements it.

- [ ] **Step 1: Write the failing test**

Create `lib/metadata/page-metadata.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildPageMetadata } from './page-metadata';

describe('buildPageMetadata', () => {
  it('produces title and description from inputs', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/services',
      title: 'Our Services',
      description: 'Eight construction services across Tamil Nadu.',
    });
    expect(m.title).toBe('Our Services');
    expect(m.description).toContain('Tamil Nadu');
  });

  it('canonical URL omits prefix for default locale (en-IN)', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/services',
      title: 'X',
    });
    expect(m.alternates?.canonical).toMatch(/\/services$/);
    expect(m.alternates?.canonical).not.toContain('/en-IN/');
  });

  it('canonical URL prefixes /ta-IN for non-default locale', () => {
    const m = buildPageMetadata({
      locale: 'ta-IN',
      pathname: '/services',
      title: 'X',
    });
    expect(m.alternates?.canonical).toMatch(/\/ta-IN\/services$/);
  });

  it('emits hreflang alternates for both locales', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/services',
      title: 'X',
    });
    expect(m.alternates?.languages).toMatchObject({
      'en-IN': expect.stringMatching(/\/services$/),
      'ta-IN': expect.stringMatching(/\/ta-IN\/services$/),
    });
  });

  it('homepage canonical is bare site URL for en-IN', () => {
    const m = buildPageMetadata({ locale: 'en-IN', pathname: '/', title: 'Home' });
    expect(m.alternates?.canonical).not.toContain('/services');
    expect(m.alternates?.canonical).toMatch(/^https?:\/\/[^/]+\/?$/);
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
pnpm test -- page-metadata
```

- [ ] **Step 3: Implement**

Create `lib/metadata/page-metadata.ts`:

```ts
import type { Metadata } from 'next';
import { NAP } from '@/lib/constants/nap';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export type PageMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description?: string;
};

function buildLocaleUrl(locale: Locale, pathname: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const path = pathname === '/' ? '' : pathname;
  return `${NAP.siteUrl}${prefix}${path}`;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: PageMetadataInput): Metadata {
  const canonical = buildLocaleUrl(locale, pathname);
  const languages = Object.fromEntries(
    locales.map((l) => [l, buildLocaleUrl(l, pathname)]),
  ) as Record<Locale, string>;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
  };
}
```

- [ ] **Step 4: Run, confirm 5 pass**

```bash
pnpm test -- page-metadata
```

- [ ] **Step 5: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **61 tests** (56 + 5).

- [ ] **Step 6: Commit**

```bash
git add lib/metadata/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(metadata): add buildPageMetadata helper with canonical + hreflang alternates"
```

---

## Task 3: SkipToContent accessibility primitive

**Files:**

- Create: `components/layout/SkipToContent.tsx`
- Create: `components/layout/SkipToContent.test.tsx`
- Modify: `i18n/messages/en-IN.json`, `i18n/messages/ta-IN.json` (add `layout.skipToContent` key)

A keyboard-accessible skip link that appears on focus and jumps to `<main id="main">`. WCAG 2.1 AA requirement.

- [ ] **Step 1: Add translation strings**

Read current `i18n/messages/en-IN.json`. Add a top-level `layout` block:

```json
  "layout": {
    "skipToContent": "Skip to main content"
  }
```

Insert this AFTER the existing `cta` block, INSIDE the root JSON object. The full file structure becomes:

```json
{
  "meta": { ... },
  "nav": { ... },
  "cta": { ... },
  "layout": { "skipToContent": "Skip to main content" }
}
```

Do the same for `i18n/messages/ta-IN.json`:

```json
  "layout": {
    "skipToContent": "முதன்மை உள்ளடக்கத்திற்கு செல்லவும்"
  }
```

- [ ] **Step 2: Write the failing test**

Create `components/layout/SkipToContent.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = { skipToContent: 'Skip to main content' };
    return map[key] ?? key;
  },
}));

import { SkipToContent } from './SkipToContent';

describe('SkipToContent', () => {
  it('renders an anchor pointing to #main', () => {
    render(<SkipToContent />);
    const link = screen.getByRole('link', { name: /Skip to main content/ });
    expect(link).toHaveAttribute('href', '#main');
  });

  it('has visually-hidden styles by default but is keyboard-focusable', () => {
    render(<SkipToContent />);
    const link = screen.getByRole('link', { name: /Skip to main content/ });
    expect(link.className).toMatch(/sr-only|absolute|focus/);
  });
});
```

- [ ] **Step 3: Run, confirm fail**

```bash
pnpm test -- SkipToContent
```

- [ ] **Step 4: Implement**

Create `components/layout/SkipToContent.tsx`:

```tsx
import { useTranslations } from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('layout');
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-charcoal-900 focus:px-4 focus:py-2 focus:text-white"
    >
      {t('skipToContent')}
    </a>
  );
}
```

Note: Tailwind's `sr-only` class is built-in via the default screen-reader-only utility. The `focus:not-sr-only` reverses it on keyboard focus.

- [ ] **Step 5: Run, confirm 2 pass**

```bash
pnpm test -- SkipToContent
```

- [ ] **Step 6: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **63 tests** (61 + 2).

- [ ] **Step 7: Commit**

```bash
git add components/layout/SkipToContent.tsx components/layout/SkipToContent.test.tsx i18n/messages/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): add SkipToContent a11y primitive with bilingual labels"
```

---

## Task 4: Breadcrumbs component

**Files:**

- Create: `components/layout/Breadcrumbs.tsx`
- Create: `components/layout/Breadcrumbs.test.tsx`

Renders a breadcrumb trail visually AND emits `BreadcrumbList` JSON-LD. The current page (last item) renders as text (not a link). Returns null for empty arrays.

- [ ] **Step 1: Write the failing test**

Create `components/layout/Breadcrumbs.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

const items = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Residential Construction', href: '/services/residential-construction' },
];

describe('Breadcrumbs', () => {
  it('renders all items as text', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Residential Construction')).toBeInTheDocument();
  });

  it('renders all but the last item as links', () => {
    render(<Breadcrumbs items={items} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/services');
  });

  it('the current (last) item has aria-current="page"', () => {
    render(<Breadcrumbs items={items} />);
    const current = screen.getByText('Residential Construction');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('emits BreadcrumbList JSON-LD with positions', () => {
    const { container } = render(<Breadcrumbs items={items} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement).toHaveLength(3);
    expect(data.itemListElement[0]).toMatchObject({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
    });
    expect(data.itemListElement[2].position).toBe(3);
  });

  it('returns null for empty items', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
pnpm test -- Breadcrumbs
```

- [ ] **Step 3: Implement**

Create `components/layout/Breadcrumbs.tsx`:

```tsx
import Link from 'next/link';
import type { WithContext, BreadcrumbList } from 'schema-dts';
import { JsonLd } from '@/components/seo/JsonLd';
import { NAP } from '@/lib/constants/nap';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const data: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem' as const,
      position: idx + 1,
      name: item.name,
      item: `${NAP.siteUrl}${item.href === '/' ? '' : item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="my-4 text-sm text-neutral-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-charcoal-900">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-neutral-400">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
```

- [ ] **Step 4: Run, confirm 5 pass**

```bash
pnpm test -- Breadcrumbs
```

- [ ] **Step 5: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **68 tests** (63 + 5).

- [ ] **Step 6: Commit**

```bash
git add components/layout/Breadcrumbs.tsx components/layout/Breadcrumbs.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): add Breadcrumbs component with BreadcrumbList JSON-LD"
```

---

## Task 5: MobileMenu client island

**Files:**

- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/MobileMenu.test.tsx`
- Modify: `i18n/messages/en-IN.json` (add `layout.openMenu`, `layout.closeMenu`)
- Modify: `i18n/messages/ta-IN.json` (matching strings)

A 'use client' component that toggles a mobile drawer. Renders a hamburger button; on click, opens an overlay containing the same nav links + LanguageSwitcher. Escape key closes. Focus traps inside drawer when open (basic — focus first link on open).

- [ ] **Step 1: Add translation strings**

In `i18n/messages/en-IN.json`, extend the `layout` block:

```json
  "layout": {
    "skipToContent": "Skip to main content",
    "openMenu": "Open menu",
    "closeMenu": "Close menu"
  }
```

In `i18n/messages/ta-IN.json`:

```json
  "layout": {
    "skipToContent": "முதன்மை உள்ளடக்கத்திற்கு செல்லவும்",
    "openMenu": "மெனு திற",
    "closeMenu": "மெனு மூடு"
  }
```

- [ ] **Step 2: Write the failing test**

Create `components/layout/MobileMenu.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      locations: 'Locations',
      about: 'About',
      contact: 'Contact',
    };
    return map[key] ?? key;
  },
}));

import { MobileMenu } from './MobileMenu';

afterEach(() => cleanup());

describe('MobileMenu', () => {
  it('renders the hamburger button collapsed by default', () => {
    render(<MobileMenu />);
    const button = screen.getByRole('button', { name: /Open menu/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: /mobile/i })).toBeNull();
  });

  it('opens the drawer when the hamburger is clicked', () => {
    render(<MobileMenu />);
    const button = screen.getByRole('button', { name: /Open menu/ });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Close menu/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
  });

  it('renders all six nav links inside the open drawer', () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByRole('button', { name: /Open menu/ }));
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Locations' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('closes the drawer on Escape key', () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByRole('button', { name: /Open menu/ }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('navigation', { name: /mobile/i })).toBeNull();
  });
});
```

(Note: missing `import { afterEach } from 'vitest';` — vitest exposes it as a global because Plan 1's vitest.config.ts has `globals: true`. Confirm in your config; if not global, add the import explicitly.)

- [ ] **Step 3: Run, confirm fail**

```bash
pnpm test -- MobileMenu
```

- [ ] **Step 4: Implement**

Create `components/layout/MobileMenu.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PRIMARY_NAV } from '@/lib/nav/primary-nav';

export function MobileMenu() {
  const tLayout = useTranslations('layout');
  const tNav = useTranslations('nav');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded text-charcoal-900 hover:bg-limestone-100 md:hidden"
      >
        <span className="sr-only">{open ? tLayout('closeMenu') : tLayout('openMenu')}</span>
        <span aria-hidden className="text-2xl leading-none">
          {open ? '✕' : '☰'}
        </span>
      </button>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="mobile"
          className="fixed inset-0 top-16 z-40 bg-limestone-50 p-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
```

- [ ] **Step 5: Run, confirm 4 pass**

```bash
pnpm test -- MobileMenu
```

If the test fails on "Cannot find name 'afterEach'", add `import { afterEach } from 'vitest';` to the test file's imports.

- [ ] **Step 6: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **72 tests** (68 + 4).

- [ ] **Step 7: Commit**

```bash
git add components/layout/MobileMenu.tsx components/layout/MobileMenu.test.tsx i18n/messages/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): add MobileMenu client island with Escape-to-close and bilingual labels"
```

---

## Task 6: Header (server component)

**Files:**

- Create: `components/layout/Header.tsx`
- Create: `components/layout/Header.test.tsx`

Composes: wordmark logo (text-only "AESTA"), desktop nav (`PRIMARY_NAV`), mobile menu, language switcher, primary CTA ("Get Quote"). Renders as a server component; the only client islands are `<MobileMenu>` and `<LanguageSwitcher>`.

- [ ] **Step 1: Write the failing test**

Create `components/layout/Header.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      siteName: 'AESTA — Architects & Builders',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      locations: 'Locations',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Get Free Quote',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    };
    return map[key] ?? key;
  },
  useLocale: () => 'en-IN',
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import { Header } from './Header';

describe('Header', () => {
  it('renders the AESTA wordmark linked to /', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /AESTA/ });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all six nav items in desktop nav', () => {
    render(<Header />);
    const desktopNav = screen.getByRole('navigation', { name: /primary/i });
    expect(desktopNav).toBeInTheDocument();
    for (const label of ['Services', 'Projects', 'Pricing', 'Locations', 'About', 'Contact']) {
      const links = screen.getAllByRole('link', { name: label });
      expect(links.length).toBeGreaterThan(0);
    }
  });

  it('renders a Get Quote CTA linked to /quote', () => {
    render(<Header />);
    const cta = screen.getByRole('link', { name: /Get Free Quote/ });
    expect(cta).toHaveAttribute('href', '/quote');
  });

  it('includes the language switcher (alternate locale link visible)', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /தமிழ்/ })).toBeInTheDocument();
  });

  it('renders as a banner landmark', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
pnpm test -- Header
```

- [ ] **Step 3: Implement**

Create `components/layout/Header.tsx`:

```tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PRIMARY_NAV } from '@/lib/nav/primary-nav';
import { LanguageSwitcher } from '@/components/seo/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const tMeta = useTranslations('meta');
  const tNav = useTranslations('nav');
  const tCta = useTranslations('cta');

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-limestone-50/95 backdrop-blur supports-[backdrop-filter]:bg-limestone-50/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          aria-label={tMeta('siteName')}
          className="font-serif text-2xl font-bold tracking-tight text-charcoal-900"
        >
          AESTA
        </Link>
        <nav aria-label="primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-charcoal-900 hover:text-terracotta-600"
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/quote"
            className="hidden items-center rounded-md bg-terracotta-600 px-4 py-2 text-sm font-medium text-white hover:bg-terracotta-700 md:inline-flex"
          >
            {tCta('getQuote')}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run, confirm 5 pass**

```bash
pnpm test -- Header
```

- [ ] **Step 5: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **77 tests** (72 + 5).

- [ ] **Step 6: Commit**

```bash
git add components/layout/Header.tsx components/layout/Header.test.tsx
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): add Header server component with desktop nav, language switcher, mobile menu, CTA"
```

---

## Task 7: Footer (server component)

**Files:**

- Create: `components/layout/Footer.tsx`
- Create: `components/layout/Footer.test.tsx`
- Modify: `i18n/messages/en-IN.json`, `i18n/messages/ta-IN.json` (add `footer.*` keys)

Renders 4 columns (Services, Locations, Resources, Contact) + NAP block + language switcher + copyright + legal links.

- [ ] **Step 1: Add translation strings**

Append to `i18n/messages/en-IN.json` (add a sibling `footer` block):

```json
  "footer": {
    "services": "Services",
    "locations": "Locations",
    "resources": "Resources",
    "contact": "Contact",
    "address": "Address",
    "phone": "Phone",
    "email": "Email",
    "whatsapp": "WhatsApp",
    "privacy": "Privacy",
    "terms": "Terms",
    "rights": "All rights reserved.",
    "blog": "Blog",
    "press": "Press",
    "reviews": "Reviews"
  }
```

Append to `i18n/messages/ta-IN.json`:

```json
  "footer": {
    "services": "சேவைகள்",
    "locations": "இடங்கள்",
    "resources": "வளங்கள்",
    "contact": "தொடர்பு",
    "address": "முகவரி",
    "phone": "தொலைபேசி",
    "email": "மின்னஞ்சல்",
    "whatsapp": "வாட்ஸ்அப்",
    "privacy": "தனியுரிமை",
    "terms": "விதிமுறைகள்",
    "rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "blog": "வலைப்பதிவு",
    "press": "செய்தி",
    "reviews": "மதிப்புரைகள்"
  }
```

- [ ] **Step 2: Write the failing test**

Create `components/layout/Footer.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === 'meta') {
      const map: Record<string, string> = { siteName: 'AESTA — Architects & Builders' };
      return map[key] ?? key;
    }
    if (namespace === 'footer') {
      const map: Record<string, string> = {
        services: 'Services',
        locations: 'Locations',
        resources: 'Resources',
        contact: 'Contact',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        whatsapp: 'WhatsApp',
        privacy: 'Privacy',
        terms: 'Terms',
        rights: 'All rights reserved.',
        blog: 'Blog',
        press: 'Press',
        reviews: 'Reviews',
      };
      return map[key] ?? key;
    }
    return key;
  },
  useLocale: () => 'en-IN',
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders as a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows the four heading columns', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Locations' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders a tel: phone link and a mailto: email link', () => {
    render(<Footer />);
    const tel = screen.getByRole('link', { name: /Phone/ });
    expect(tel.getAttribute('href')).toMatch(/^tel:\+/);
    const email = screen.getByRole('link', { name: /Email/ });
    expect(email.getAttribute('href')).toMatch(/^mailto:/);
  });

  it('renders a wa.me WhatsApp link', () => {
    render(<Footer />);
    const wa = screen.getByRole('link', { name: /WhatsApp/ });
    expect(wa.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);
  });

  it('renders Privacy and Terms links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/legal/privacy');
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/legal/terms');
  });
});
```

- [ ] **Step 3: Run, confirm fail**

```bash
pnpm test -- Footer
```

- [ ] **Step 4: Implement**

Create `components/layout/Footer.tsx`:

```tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { NAP, getPhoneLink, getMailtoLink, getWhatsAppLink } from '@/lib/constants/nap';
import { LanguageSwitcher } from '@/components/seo/LanguageSwitcher';

// English-only labels for v0. Per-service translation keys are added in Plan 3c
// when service pages are built; the Footer will swap to t('services.<slug>') then.
const SERVICE_LINKS = [
  { href: '/services/residential-construction', label: 'Residential Construction' },
  { href: '/services/commercial-construction', label: 'Commercial Construction' },
  { href: '/services/architectural-design', label: 'Architectural Design' },
  { href: '/services/interior-design', label: 'Interior Design' },
  { href: '/services/renovation', label: 'Renovation' },
  { href: '/services/turnkey-homes', label: 'Turnkey Homes' },
] as const;

export function Footer() {
  const tFooter = useTranslations('footer');
  const tMeta = useTranslations('meta');
  const year = new Date().getFullYear();

  const tier1Cities = NAP.areaServed.filter((c) => c.tier === 1);

  return (
    <footer className="border-t border-neutral-200 bg-limestone-100" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold">{tFooter('services')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{tFooter('locations')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              {tier1Cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/locations/${city.slug}`} className="hover:underline">
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="hover:underline">
                  All locations →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{tFooter('resources')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>
                <Link href="/resources" className="hover:underline">
                  {tFooter('blog')}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:underline">
                  {tFooter('reviews')}
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:underline">
                  {tFooter('press')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{tFooter('contact')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>
                <span className="font-medium">{tFooter('address')}: </span>
                {NAP.address.addressLocality}, {NAP.address.addressRegion}
              </li>
              <li>
                <a href={getPhoneLink()} className="hover:underline">
                  <span className="font-medium">{tFooter('phone')}: </span>
                  {NAP.phone}
                </a>
              </li>
              <li>
                <a href={getMailtoLink()} className="hover:underline">
                  <span className="font-medium">{tFooter('email')}: </span>
                  {NAP.email}
                </a>
              </li>
              <li>
                <a href={getWhatsAppLink()} className="hover:underline">
                  <span className="font-medium">{tFooter('whatsapp')}: </span>
                  {NAP.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center">
          <div>
            © {year} {tMeta('siteName')}. {tFooter('rights')}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:underline">
              {tFooter('privacy')}
            </Link>
            <Link href="/legal/terms" className="hover:underline">
              {tFooter('terms')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Run, confirm 5 pass**

```bash
pnpm test -- Footer
```

- [ ] **Step 6: Format + gates**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
```

Expected: total **82 tests** (77 + 5).

- [ ] **Step 7: Commit**

```bash
git add components/layout/Footer.tsx components/layout/Footer.test.tsx i18n/messages/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): add Footer with services, locations, NAP block, language switcher, legal links"
```

---

## Task 8: Locale-aware 404 page

**Files:**

- Create: `app/[locale]/not-found.tsx`
- Modify: `i18n/messages/en-IN.json`, `i18n/messages/ta-IN.json` (add `notFound.*` keys)

A friendly 404 page that says "Page coming soon" (since many routes will 404 until later plans build them) with links back to home, services, and contact.

- [ ] **Step 1: Add translation strings**

Append to `i18n/messages/en-IN.json`:

```json
  "notFound": {
    "title": "Page not found",
    "subtitle": "This page is on our build list — coming soon.",
    "back": "Back to home",
    "popular": "Popular pages",
    "services": "Our services",
    "pricing": "Transparent pricing",
    "contact": "Contact us"
  }
```

Append to `i18n/messages/ta-IN.json`:

```json
  "notFound": {
    "title": "பக்கம் கிடைக்கவில்லை",
    "subtitle": "இந்தப் பக்கம் விரைவில் வரும் — கட்டுமானத்தில் உள்ளது.",
    "back": "முகப்புக்குத் திரும்பு",
    "popular": "பிரபலமான பக்கங்கள்",
    "services": "எங்கள் சேவைகள்",
    "pricing": "வெளிப்படையான விலை",
    "contact": "எங்களைத் தொடர்பு கொள்ளுங்கள்"
  }
```

- [ ] **Step 2: Implement the page (no test needed — visual page)**

Create `app/[locale]/not-found.tsx`:

```tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-terracotta-600">404</p>
      <h1 className="text-4xl font-bold text-charcoal-900 md:text-5xl">{t('title')}</h1>
      <p className="mt-4 text-lg text-neutral-700">{t('subtitle')}</p>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-terracotta-600 px-5 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
        >
          ← {t('back')}
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600">
          {t('popular')}
        </h2>
        <ul className="space-y-2 text-base">
          <li>
            <Link href="/services" className="text-terracotta-600 hover:underline">
              {t('services')}
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-terracotta-600 hover:underline">
              {t('pricing')}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-terracotta-600 hover:underline">
              {t('contact')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build still passes**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: build succeeds. The route table should now include `/_not-found` (Next.js handles this automatically; the locale-aware 404 takes over for `/[locale]/...` routes).

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/not-found.tsx" i18n/messages/
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): add bilingual locale-aware 404 with friendly 'coming soon' copy"
```

---

## Task 9: Integrate Header + Footer + SkipToContent into root layout

**Files:**

- Modify: `app/[locale]/layout.tsx`
- Modify: `app/[locale]/page.tsx`

Wrap the existing locale layout with the new shell.

- [ ] **Step 1: Read current layout**

```bash
cat "app/[locale]/layout.tsx"
```

Confirm current state: imports `JsonLd`, `buildOrganization`, fonts, locale check, `unstable_setRequestLocale`. The `<body>` currently contains `<JsonLd>` + `<NextIntlClientProvider>{children}</NextIntlClientProvider>`.

- [ ] **Step 2: Modify layout**

Replace the imports section to add:

```tsx
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
```

(Add these alongside the existing `import { JsonLd } from '@/components/seo/JsonLd';` and `import { buildOrganization } from '@/lib/schema/organization';` lines.)

Replace the `<body>` block from:

```tsx
<body className="bg-limestone-50 text-charcoal-900 antialiased">
  <JsonLd data={buildOrganization()} />
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
</body>
```

to:

```tsx
<body className="bg-limestone-50 text-charcoal-900 antialiased">
  <JsonLd data={buildOrganization()} />
  <NextIntlClientProvider messages={messages}>
    <SkipToContent />
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 3: Update placeholder homepage to use proper landmarks**

Read current `app/[locale]/page.tsx`. It has a `<main>` with the placeholder content. Replace its `<main>` wrapper with a `<section>` since the layout now provides `<main>`.

Replace `app/[locale]/page.tsx` with:

```tsx
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { isValidLocale } from '@/i18n/config';
import { notFound } from 'next/navigation';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);
  const t = useTranslations('meta');

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-serif text-5xl font-bold text-charcoal-900 md:text-6xl">
        {t('siteName')}
      </h1>
      <p className="mt-4 text-xl text-neutral-700">{t('tagline')}</p>
      <p className="mt-12 text-sm text-neutral-500">
        Plan 3a complete · Header + Footer + 404 live · Plan 3b builds the real homepage next.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Run gates + visually verify**

```bash
pnpm format && pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: all gates green, **82 tests still pass** (no test count change since this task modifies layout integration, not adds new tests).

Visual smoke test in dev:

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 12
echo "=== en-IN homepage ===" && curl -s http://localhost:3000/ | grep -E "AESTA|Get Free Quote|<main|<header|<footer" | head -10
echo "=== ta-IN homepage ===" && curl -s http://localhost:3000/ta-IN | grep -E "ஆர்க்கிடெக்ட்ஸ்|<main|<header|<footer" | head -10
echo "=== 404 ===" && curl -s http://localhost:3000/this-does-not-exist | grep -E "Page not found|coming soon|Back to home" | head -10
kill $DEV_PID 2>/dev/null
```

Expected: each section returns matching strings (the homepage shows AESTA + landmarks; 404 shows "Page not found" copy).

- [ ] **Step 5: Commit**

```bash
git add "app/[locale]/layout.tsx" "app/[locale]/page.tsx"
git diff --cached --name-only | grep -E "\.env\.local|settings\.local\.json" && echo "LEAK" || echo "safe"
git commit -m "feat(layout): integrate Header, Footer, SkipToContent, and main landmark into root layout"
```

---

## Task 10: Final gates + push + tag

- [ ] **Step 1: Run every gate**

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: every command exits 0. Final test count: **82 tests** (53 from Plan 2 + 29 new in Plan 3a).

Test count breakdown:

- Plan 2 baseline: 53
- Task 1 primary-nav: 3 → 56
- Task 2 page-metadata: 5 → 61
- Task 3 SkipToContent: 2 → 63
- Task 4 Breadcrumbs: 5 → 68
- Task 5 MobileMenu: 4 → 72
- Task 6 Header: 5 → 77
- Task 7 Footer: 5 → 82
- Task 8 NotFound: 0 (visual only)
- Task 9 layout integration: 0 (verified by build)

If the count doesn't match, investigate before pushing.

- [ ] **Step 2: Push to main and watch CI**

```bash
git log --oneline -12
git push origin main
sleep 6
gh run list --repo aestabuilders-arch/aestawebsite --limit 1
```

Capture the run ID, then:

```bash
gh run watch <RUN_ID> --repo aestabuilders-arch/aestawebsite --exit-status
```

Expected: green across format, lint, typecheck, test, build.

- [ ] **Step 3: Tag the milestone**

```bash
git tag -a plan-3a-layout-shell -m "Plan 3a: Header, Footer, MobileMenu, Breadcrumbs, SkipToContent, page metadata helper, 404 page; 82 tests passing"
git push origin plan-3a-layout-shell
```

---

## Completion criteria

Plan 3a is complete when **all** of the following are true:

1. All components exist under `components/layout/`: `Header.tsx`, `Footer.tsx`, `MobileMenu.tsx`, `Breadcrumbs.tsx`, `SkipToContent.tsx` — each with passing tests.
2. `lib/nav/primary-nav.ts` exports the typed nav config.
3. `lib/metadata/page-metadata.ts` exports `buildPageMetadata` with canonical + hreflang.
4. `app/[locale]/not-found.tsx` exists and renders the bilingual 404 copy.
5. Root `app/[locale]/layout.tsx` wraps children in `<SkipToContent>`, `<Header>`, `<main id="main">`, `<Footer>`.
6. Curling `http://localhost:3000/` and `http://localhost:3000/ta-IN` shows: header with logo + nav + CTA + language switcher; footer with NAP block + 4 columns + legal links.
7. Curling any non-existent path like `http://localhost:3000/garbage` shows the friendly 404 with `Back to home` link.
8. **82 tests pass** (53 baseline + 29 new).
9. CI green on `main` for the final commit.
10. Tag `plan-3a-layout-shell` exists on `aestabuilders-arch/aestawebsite`.

---

## What this plan explicitly doesn't build

- Real homepage content — Plan 3b
- Service pages, pricing, projects, locations, about, contact, quote, reviews, press, legal — Plans 3c–3h
- Cookie banner / GDPR — out of scope for India-first launch
- Analytics — Plan 7
- Logo design — Master Plan §1.6 (wordmark stub used until designed)
- Real Tamil translation review — operational; ship with functional translations, refine later
- Contact form, quote form, lead-capture — Plan 3g (uses Plan 1.5 RLS lead-insert policy)

Tracked here so nothing is lost between plans.
