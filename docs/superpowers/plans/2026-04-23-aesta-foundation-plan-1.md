# AESTA Foundation — SEO/AEO-Ready Scaffold Implementation Plan (Plan 1 of 7)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

---

## AMENDMENT (2026-04-23, after initial plan write) — READ FIRST

After this plan was written, the user chose **hosted Supabase (project ref `rcbhsakwfdwjheorxmzk`) with the Supabase MCP server** instead of local Docker + Supabase CLI. The following overrides apply. When an original task conflicts with an amendment, the **amendment wins**.

### A1. Prerequisites — Docker Desktop and Supabase CLI are NOT required
Replace the prerequisites list with:
- Node.js 20+ (existing: v24 works)
- pnpm 9+ (existing: v10 works; corepack will pin if needed)
- git (existing)
- gh CLI (for repo creation; existing)
- Supabase MCP server configured (already done — see [.mcp.json](../../../.mcp.json))
- Hosted Supabase project at `https://rcbhsakwfdwjheorxmzk.supabase.co` (already provisioned)

### A2. Supabase paths — use quickstart convention
Use **`utils/supabase/`** (not `lib/supabase/`) per the Supabase Next.js quickstart the user pasted. Files:
- `utils/supabase/client.ts` — browser (`createBrowserClient`)
- `utils/supabase/server.ts` — server (`createServerClient`, `getAll`/`setAll` cookie pattern)
- `utils/supabase/middleware.ts` — session refresh helper
- `utils/supabase/admin.ts` — service-role client (server-only) for admin panel writes
- `utils/supabase/types.ts` — generated types

Keep `lib/constants/nap.ts` in `lib/constants/` — unrelated to Supabase.

### A3. Env-var naming — use the new Supabase key names
The project is on Supabase's new API key format. Use:
- `NEXT_PUBLIC_SUPABASE_URL` (unchanged)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (replaces `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `SUPABASE_SERVICE_ROLE_KEY` (unchanged — for the admin client)

`.env.local` has already been written with the URL and publishable key. Still need the service-role key (fetched from Supabase dashboard) before Plan 5 (admin panel).

### A4. Cookie pattern — use quickstart's `getAll`/`setAll`
The `utils/supabase/server.ts` and `utils/supabase/middleware.ts` must use the modern `getAll` + `setAll` cookie pattern from the Supabase quickstart, not the older `get`/`set`/`remove` pattern shown in this plan's Task 9.

### A5. Task 5 — DELETE this task
No local Supabase boot. No `supabase init`. No `supabase/config.toml`. The MCP server handles schema operations directly against the hosted DB.

### A6. Tasks 7 & 8 — apply migrations via Supabase MCP, not `pnpm db:reset`
Instead of the migration flow in Tasks 7 and 8:
- Still write migration SQL files to `supabase/migrations/` (source of truth for git history)
- Apply each migration using the MCP tool `mcp__supabase__apply_migration` with the migration name (snake_case) and SQL body
- For the cities seed, use `mcp__supabase__execute_sql` (seeds aren't DDL, so not a migration)
- Verify with `mcp__supabase__list_tables` after each migration

No `supabase/config.toml`, no `supabase/seed.sql` auto-run. The `supabase/migrations/` directory becomes a records-only convention aligned with the MCP-applied migrations.

### A7. Task 9 — types via MCP, clients via utils/supabase
- Regenerate `utils/supabase/types.ts` using the MCP tool `mcp__supabase__generate_typescript_types` (writes to stdout; pipe/save into the file)
- Write the clients at `utils/supabase/` per A2 + A4
- Keep `utils/supabase/admin.ts` (service-role) — gated with `'server-only'` import

### A8. package.json — remove local-dev scripts
Remove the following scripts from Task 2:
- `supabase:start`, `supabase:stop`, `supabase:status` (no local daemon)
- `db:reset`, `db:push` (no local migration apply)

Keep `db:types` but change to: `"db:types": "echo 'Use mcp__supabase__generate_typescript_types and write to utils/supabase/types.ts'"` (or drop the script and document in README).

Also remove `supabase` from devDependencies (the CLI isn't needed; MCP server is npx-loaded on demand).

### A9. What's already done
Before any subagent starts, the controller has already created:
- [.mcp.json](../../../.mcp.json) — Supabase MCP registered
- [.env.local](../../../.env.local) — URL + publishable key populated
- [.claude/settings.local.json](../../../.claude/settings.local.json) — `SUPABASE_ACCESS_TOKEN` (gitignored)
- Updates to `~/.claude/settings.json` — MCP enabled

Subagents executing Tasks 1 and 6 must preserve these files — do not overwrite.

### A11. `.gitignore` — additional entry
Task 1 Step 3's `.gitignore` content must include this line in the `# env` section to prevent `.claude/settings.local.json` (which holds `SUPABASE_ACCESS_TOKEN`) from being committed:

```gitignore
.claude/settings.local.json
```

Add under the existing `# supabase` section or as a new `# claude` section — placement flexible, presence mandatory.

### A10. Completion criteria — revised
1. `pnpm dev` serves `http://localhost:3000` (English) and `http://localhost:3000/ta-IN` (Tamil).
2. All migrations listed in `mcp__supabase__list_migrations` include `base_schema` and `seo_schema`.
3. `mcp__supabase__list_tables` returns 13 tables (7 base + 6 SEO); `cities` row count = 17.
4. `utils/supabase/types.ts` regenerates without errors using the MCP tool.
5. `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build` all exit 0.
6. Push to `main` on GitHub triggers the `CI / verify` workflow, passes green.
7. NAP test suite has 5 passing tests at `lib/constants/nap.test.ts`.
8. Repo tagged `plan-1-foundation`.

---

**Goal:** Scaffold a Next.js 14 + Supabase + next-intl foundation with both the AESTA master-plan schema and the SEO/AEO additive schema baked in, ready for page-building and component work.

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind. Supabase Postgres for data (base tables from `AESTA_WEBSITE_PLAN.md` §7.2 + SEO additions from the design spec §6). next-intl for `en-IN` / `ta-IN` bilingual routing. Vercel for hosting. Vitest for unit tests. GitHub Actions for CI.

**Tech Stack:** Next.js 14.2+, TypeScript 5.4+, Tailwind 3.4+, Supabase (PostgreSQL + Auth + Storage), next-intl 3.x, Vitest 1.x, GitHub Actions, Vercel, pnpm 9+, Node 20 LTS.

**Out of scope (deferred to later plans in the series):**
- Homepage + marketing pages (Plan 3)
- Schema-emitting components like `<FAQSection>`, `<ProcessSteps>`, `<AggregateRating>` (Plan 2)
- Content system (blog, entities, authors, MDX pipeline) (Plan 4)
- Admin panel CRUDs (Plan 5)
- Programmatic landing pages + dynamic routes (Plan 6)
- Operational integrations (WhatsApp, GBP sync) (Plan 7)
- Content writing, GBP setup, citations, backlink outreach, Tamil translation — operational, not code

**Companion documents:**
- Strategy: [docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md](../specs/2026-04-23-aesta-seo-aeo-strategy-design.md)
- Master plan: [AESTA_WEBSITE_PLAN.md](../../../AESTA_WEBSITE_PLAN.md)

---

## Prerequisites

Before starting, the engineer must have:

- Node.js 20 LTS installed (`node --version` → `v20.x.x`)
- pnpm 9+ installed (`pnpm --version` → `9.x.x`; install with `npm install -g pnpm`)
- git installed (`git --version`)
- Supabase CLI installed (`supabase --version`; install from https://supabase.com/docs/guides/cli/getting-started)
- Docker Desktop installed and running (for local Supabase)
- GitHub account and repo-create permission
- Supabase account (use `findhari93@gmail.com`)
- Vercel account (link to GitHub)
- Working directory: `c:/Users/Haribabu/Documents/AppsCopilot/2026/AestaWebsite` (already exists, contains `AESTA_WEBSITE_PLAN.md` and `docs/`)

Verify prerequisites before Task 1:

```bash
node --version && pnpm --version && git --version && supabase --version && docker ps
```

Expected: all five commands succeed; `docker ps` returns a table (even if empty).

---

## File Structure (created by this plan)

```
AestaWebsite/
├── .github/
│   └── workflows/
│       └── ci.yml                       # Lint + typecheck + test on PRs
├── .vscode/
│   └── settings.json                    # ESLint + Prettier integration
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                   # Root layout (locale-aware)
│   │   └── page.tsx                     # Placeholder home (replaced in Plan 3)
│   ├── globals.css                      # Tailwind directives + font imports
│   └── not-found.tsx
├── i18n/
│   ├── config.ts                        # Locale list, default, pathname strategy
│   ├── request.ts                       # next-intl getRequestConfig
│   └── messages/
│       ├── en-IN.json                   # English base messages
│       └── ta-IN.json                   # Tamil base messages
├── lib/
│   ├── constants/
│   │   ├── nap.ts                       # NAP single source of truth
│   │   └── nap.test.ts
│   └── supabase/
│       ├── client.ts                    # Browser client
│       ├── server.ts                    # Server client
│       ├── admin.ts                     # Service-role client (server-only)
│       └── types.ts                     # Generated types (regenerated by script)
├── supabase/
│   ├── config.toml                      # Supabase local dev config
│   ├── migrations/
│   │   ├── 20260423000000_base_schema.sql     # Master plan tables
│   │   └── 20260423000001_seo_schema.sql      # SEO additions
│   └── seed.sql                         # 17 cities seeded
├── public/
│   └── (placeholder)
├── types/
│   └── global.d.ts
├── .env.example                         # Committed template
├── .env.local                           # Gitignored, real values
├── .eslintrc.json
├── .gitignore
├── .nvmrc
├── .prettierrc
├── middleware.ts                        # next-intl routing middleware
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml                       # committed
├── postcss.config.mjs
├── README.md                            # Project readme
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── vitest.setup.ts
```

---

## Conventions used in this plan

- Working directory for all commands: `c:/Users/Haribabu/Documents/AppsCopilot/2026/AestaWebsite`
- Commands use bash syntax (the env has bash available). Use forward slashes in paths. Avoid `cd` — run from the working dir.
- All commits use Conventional Commits (`feat:`, `chore:`, `fix:`, `test:`, `docs:`, `refactor:`, `ci:`).
- Commits are frequent and small (one per task at minimum).
- Tests are TDD where the task produces runtime logic. Scaffold/config tasks verify via a sanity command instead of a unit test.

---

## Task 1: Git init + .gitignore + README stub + .nvmrc + node pinning

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: `.nvmrc`

- [ ] **Step 1: Initialize git repo**

```bash
git init
git branch -m main
```

Expected: `Initialized empty Git repository in …/AestaWebsite/.git/` and branch renamed.

- [ ] **Step 2: Create `.nvmrc`**

Write file `.nvmrc` with exact content:

```
20.11.1
```

- [ ] **Step 3: Create `.gitignore`**

Write file `.gitignore` with exact content:

```gitignore
# dependencies
node_modules/
.pnp
.pnp.js

# testing
coverage/
*.tsbuildinfo

# next.js
.next/
out/
build/
dist/

# misc
.DS_Store
*.pem
Thumbs.db

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env
.env
.env*.local
.env.development
.env.production

# vercel
.vercel

# supabase
supabase/.branches
supabase/.temp
supabase/.env

# turbo
.turbo

# editor
.idea/
*.swp
```

Note: keep `AESTA_WEBSITE_PLAN.md` and `docs/` tracked. They are intentionally version-controlled.

- [ ] **Step 4: Create `README.md`**

Write file `README.md` with exact content:

```markdown
# AESTA Website

Marketing website and web app for AESTA — Architects & Builders.

See:
- Master plan: [AESTA_WEBSITE_PLAN.md](./AESTA_WEBSITE_PLAN.md)
- SEO/AEO strategy: [docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md](./docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md)
- Implementation plans: [docs/superpowers/plans/](./docs/superpowers/plans/)

## Stack

Next.js 14 · TypeScript · Tailwind · Supabase · next-intl · Vercel · GitHub Actions · Vitest

## Local development

Requires Node 20 LTS, pnpm 9+, Docker Desktop.

```bash
pnpm install
pnpm supabase:start    # boots local Postgres + Auth in Docker
pnpm db:push           # applies migrations
pnpm dev               # http://localhost:3000
```

See `docs/superpowers/plans/` for implementation plans.
```

- [ ] **Step 5: Verify and commit**

```bash
ls -la .gitignore README.md .nvmrc AESTA_WEBSITE_PLAN.md
git add .gitignore README.md .nvmrc AESTA_WEBSITE_PLAN.md docs/
git commit -m "chore: init repo with .gitignore, readme, and existing planning docs"
```

Expected: 4 files + docs tree committed. If the existing `AESTA_WEBSITE_PLAN.md` or `docs/` were not committed on init, they are now.

---

## Task 2: Create Next.js 14 project with TypeScript, App Router, Tailwind

**Files:**
- Create (many): `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `.eslintrc.json`
- Delete: the default `app/page.tsx` content (replaced in a later task)

- [ ] **Step 1: Run create-next-app into the current directory**

```bash
pnpm create next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-pnpm
```

When prompted "Would you like to customize the default import alias?" press enter for No (already set via flag).

When prompted about overwriting any existing files (there shouldn't be any conflicting ones except possibly `README.md`), answer **No** for `README.md` and Yes for any Next-owned files.

Expected: new files include `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `app/*`, `public/*`.

- [ ] **Step 2: Pin exact versions and add required deps**

Edit `package.json`. Replace the `dependencies` and `devDependencies` blocks so they match exactly:

```json
  "dependencies": {
    "@supabase/ssr": "0.3.0",
    "@supabase/supabase-js": "2.43.4",
    "next": "14.2.3",
    "next-intl": "3.14.1",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.4.5",
    "@testing-library/react": "15.0.7",
    "@types/node": "20.12.11",
    "@types/react": "18.3.2",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.2.1",
    "autoprefixer": "10.4.19",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.3",
    "jsdom": "24.0.0",
    "postcss": "8.4.38",
    "prettier": "3.2.5",
    "prettier-plugin-tailwindcss": "0.5.14",
    "supabase": "1.167.4",
    "tailwindcss": "3.4.3",
    "typescript": "5.4.5",
    "vitest": "1.6.0"
  }
```

Replace the `scripts` block with exactly:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop",
    "supabase:status": "supabase status",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset",
    "db:types": "supabase gen types typescript --local > lib/supabase/types.ts"
  }
```

Add a `packageManager` field to the top level:

```json
  "packageManager": "pnpm@9.1.0"
```

- [ ] **Step 3: Install exact versions**

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

Expected: install completes without errors. `pnpm-lock.yaml` regenerated.

- [ ] **Step 4: Verify dev server boots**

```bash
pnpm dev
```

Expected: server starts on `http://localhost:3000`. Open in browser to confirm the default Next.js landing page. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: scaffold next.js 14 with typescript, tailwind, eslint"
```

---

## Task 3: Prettier configuration

**Files:**
- Create: `.prettierrc`
- Create: `.prettierignore`

- [ ] **Step 1: Create `.prettierrc`**

Write file `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Create `.prettierignore`**

Write file `.prettierignore`:

```
node_modules
.next
out
build
dist
coverage
pnpm-lock.yaml
.vercel
supabase/.branches
supabase/.temp
lib/supabase/types.ts
```

- [ ] **Step 3: Run format across the repo and verify idempotent**

```bash
pnpm format
pnpm format:check
```

Expected: first run formats files, second run shows `All matched files use Prettier code style!`.

- [ ] **Step 4: Commit**

```bash
git add .prettierrc .prettierignore
git commit -m "chore: add prettier config with tailwind plugin"
```

If `pnpm format` modified any scaffolded files, stage those too and amend:

```bash
git add -u
git commit --amend --no-edit
```

---

## Task 4: Vitest setup

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/__smoke__/smoke.test.ts` (removed later — proves Vitest works)

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'dist'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['**/*.config.*', '**/types.ts', 'lib/supabase/types.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

- [ ] **Step 2: Write `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Write smoke test**

Create `lib/__smoke__/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('vitest runs', () => {
    expect(1 + 1).toBe(2);
  });

  it('jsdom provides document', () => {
    expect(typeof document).toBe('object');
    expect(document.createElement('div')).toBeDefined();
  });
});
```

- [ ] **Step 4: Run tests**

```bash
pnpm test
```

Expected: 2 passing tests. No errors.

- [ ] **Step 5: Update tsconfig to include vitest globals**

Edit `tsconfig.json`. Replace the `"compilerOptions"` block completely with:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Run typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts vitest.setup.ts lib/__smoke__/smoke.test.ts tsconfig.json
git commit -m "test: add vitest with jsdom and testing-library setup"
```

---

## Task 5: Supabase CLI init + local dev boot + config

**Files:**
- Create: `supabase/config.toml` (created by `supabase init`)
- Create: `supabase/seed.sql` (placeholder, populated in Task 8)

- [ ] **Step 1: Initialize Supabase project directory**

```bash
supabase init
```

When prompted about VS Code settings and Deno, answer **No** to both.

Expected: `supabase/config.toml` and `supabase/.gitignore` created.

- [ ] **Step 2: Edit `supabase/config.toml`**

Open `supabase/config.toml` and set the top `project_id`:

```toml
project_id = "aesta"
```

Leave other defaults. Supabase local default ports: API 54321, DB 54322, Studio 54323.

- [ ] **Step 3: Start local Supabase**

```bash
pnpm supabase:start
```

Expected: Docker boots Postgres, GoTrue, PostgREST, Storage, Studio. Output ends with:

```
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
anon key: eyJ...
service_role key: eyJ...
```

Copy the `anon key` and `service_role key` — used in Task 6.

- [ ] **Step 4: Verify status**

```bash
pnpm supabase:status
```

Expected: all services running.

- [ ] **Step 5: Commit**

```bash
git add supabase/config.toml supabase/.gitignore
git commit -m "chore: init supabase local dev config"
```

---

## Task 6: Environment variable management

**Files:**
- Create: `.env.example`
- Create: `.env.local` (gitignored)

- [ ] **Step 1: Create `.env.example`**

Write file `.env.example`:

```bash
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (local dev defaults; override in .env.local for remote)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Business identity (NAP — consumed by lib/constants/nap.ts at build if needed)
NEXT_PUBLIC_BUSINESS_NAME="AESTA — Architects & Builders"
NEXT_PUBLIC_BUSINESS_PHONE=
NEXT_PUBLIC_BUSINESS_EMAIL=
NEXT_PUBLIC_BUSINESS_WHATSAPP=
```

- [ ] **Step 2: Create `.env.local`** (not committed)

Write `.env.local` (replace the two `eyJ...` values with the actual keys from Task 5 step 3):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...PASTE_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=eyJ...PASTE_SERVICE_ROLE_KEY_HERE
NEXT_PUBLIC_BUSINESS_NAME=AESTA — Architects & Builders
NEXT_PUBLIC_BUSINESS_PHONE=+91-0000000000
NEXT_PUBLIC_BUSINESS_EMAIL=hello@aesta.co.in
NEXT_PUBLIC_BUSINESS_WHATSAPP=+91-0000000000
```

The phone/email/WhatsApp values use zero-placeholder numbers so they parse as valid digits (the NAP test checks `^\+\d{1,3}-?\d+`). Replace with real values from Master Plan §12 #9 before rendering NAP on public pages (Plan 2+).

- [ ] **Step 3: Verify .env.local is gitignored**

```bash
git check-ignore .env.local
```

Expected: outputs `.env.local`. If not, `.gitignore` is misconfigured; fix Task 1 step 3 first.

- [ ] **Step 4: Commit `.env.example`**

```bash
git add .env.example
git commit -m "chore: add .env.example with supabase local + NAP placeholders"
```

---

## Task 7: Base schema migration (AESTA master plan §7.2 tables)

**Files:**
- Create: `supabase/migrations/20260423000000_base_schema.sql`

- [ ] **Step 1: Write the base schema migration**

Create file `supabase/migrations/20260423000000_base_schema.sql`:

```sql
-- Base schema for AESTA website
-- Source: AESTA_WEBSITE_PLAN.md §7.2

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Cities (ordered before projects for FK)
create table public.cities (
  slug text primary key,
  name text not null,
  name_ta text,
  tier integer not null default 2 check (tier between 1 and 2),
  district text,
  population_rough integer,
  intro_en text,
  intro_ta text,
  nearby_cities text[] not null default '{}',
  created_at timestamptz not null default now()
);
comment on table public.cities is 'City landing-page content and metadata';

-- Projects
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  name_ta text,
  location text,
  city_slug text references public.cities(slug) on delete set null,
  type text check (type in ('residential','commercial','renovation','apartment')),
  tier text check (tier in ('economy','standard','premium','luxury')),
  built_up_sqft integer,
  plot_sqft integer,
  floors text check (floors in ('G','G+1','G+2','G+3')),
  start_date date,
  completion_date date,
  status text not null default 'completed' check (status in ('completed','ongoing','upcoming')),
  story text,
  story_ta text,
  testimonial text,
  testimonial_client_name text,
  featured boolean not null default false,
  display_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index projects_city_slug_idx on public.projects(city_slug);
create index projects_featured_idx on public.projects(featured) where featured = true;
create index projects_status_idx on public.projects(status);

-- Project photos
create table public.project_photos (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  caption text,
  caption_ta text,
  is_cover boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index project_photos_project_id_idx on public.project_photos(project_id);

-- Leads (quote form + contact form + whatsapp clicks)
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  source text not null check (source in ('quote_form','contact_form','whatsapp_click','phone_click')),
  name text,
  phone text,
  email text,
  city text,
  plot_sqft integer,
  built_up_sqft integer,
  floors text,
  tier_interest text,
  timeline text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','qualified','quoted','won','lost')),
  assigned_to text,
  notes text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_status_idx on public.leads(status);
create index leads_created_at_idx on public.leads(created_at desc);

-- Blog posts
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  title_ta text,
  excerpt text,
  excerpt_ta text,
  body_md text,
  body_ta_md text,
  cover_url text,
  author text,
  tags text[] not null default '{}',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
create index blog_posts_published_idx on public.blog_posts(published, published_at desc);

-- Testimonials
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_location text,
  project_type text,
  quote_en text not null,
  quote_ta text,
  rating integer check (rating between 1 and 5),
  featured boolean not null default false,
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Site settings (homepage counters, etc.)
create table public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (key, value) values
  ('projects_completed', '100'),
  ('years_of_service', '16'),
  ('cities_served', '17');

-- updated_at auto-trigger
create or replace function public.tg_set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_set_updated_at before update on public.projects
  for each row execute function public.tg_set_updated_at();
create trigger leads_set_updated_at before update on public.leads
  for each row execute function public.tg_set_updated_at();
```

- [ ] **Step 2: Apply migration to local DB**

```bash
pnpm db:reset
```

Expected: local DB is dropped and recreated, migrations apply in order, seed runs (empty for now). Output ends with `Finished supabase db reset`.

- [ ] **Step 3: Verify tables exist**

```bash
supabase db lint --level=warning
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" -c "\dt public.*"
```

Expected: lint passes, `\dt` lists `blog_posts`, `cities`, `leads`, `project_photos`, `projects`, `site_settings`, `testimonials`.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260423000000_base_schema.sql
git commit -m "feat(db): add base schema migration — projects, cities, leads, blog, testimonials, settings"
```

---

## Task 8: SEO/AEO additive schema migration + cities seed

**Files:**
- Create: `supabase/migrations/20260423000001_seo_schema.sql`
- Create: `supabase/seed.sql`

- [ ] **Step 1: Write the SEO additive migration**

Create `supabase/migrations/20260423000001_seo_schema.sql`:

```sql
-- SEO/AEO additive schema
-- Source: docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md §6

-- Authors (E-E-A-T)
create table public.authors (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  display_name text not null,
  credentials text,
  bio_md text,
  bio_ta_md text,
  photo_url text,
  email text,
  linkedin_url text,
  created_at timestamptz not null default now()
);

-- Entity pages (Wikipedia-style answer-first pages)
create table public.entities (
  slug text primary key,
  title text not null,
  title_ta text,
  question text not null,
  question_ta text,
  answer_short text not null,
  answer_short_ta text,
  body_md text not null,
  body_ta_md text,
  schema_type text not null default 'Article' check (schema_type in ('FAQPage','HowTo','Article')),
  related_entities text[] not null default '{}',
  related_services text[] not null default '{}',
  related_cities text[] not null default '{}',
  author_id uuid references public.authors(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index entities_published_idx on public.entities(published, published_at desc);

-- Reviews (cross-platform aggregation)
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  source text not null check (source in ('gbp','facebook','justdial','sulekha','houzz','indiamart','trustpilot','direct')),
  external_id text,
  client_name text not null,
  client_location text,
  rating integer not null check (rating between 1 and 5),
  quote text,
  quote_ta text,
  project_id uuid references public.projects(id) on delete set null,
  response_text text,
  responded_at timestamptz,
  source_url text,
  is_video boolean not null default false,
  video_url text,
  featured boolean not null default false,
  display_order integer,
  created_at timestamptz not null default now(),
  unique (source, external_id)
);
create index reviews_source_idx on public.reviews(source);
create index reviews_project_id_idx on public.reviews(project_id);
create index reviews_featured_idx on public.reviews(featured) where featured = true;

-- Review outreach tracking
create table public.review_outreach (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  phone text,
  project_id uuid references public.projects(id) on delete set null,
  invited_at timestamptz,
  status text not null default 'pending' check (status in ('pending','invited','posted_gbp','posted_fb','posted_jd','posted_multiple','declined','bounced')),
  platforms_posted text[] not null default '{}',
  incentive_sent boolean not null default false,
  incentive_sent_at timestamptz,
  notes text,
  updated_at timestamptz not null default now()
);
create trigger review_outreach_set_updated_at before update on public.review_outreach
  for each row execute function public.tg_set_updated_at();

-- Programmatic landing pages
create table public.landing_pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  page_type text not null check (page_type in ('city_service','size_cost','tier_spec','style_city','comparison')),
  city_slug text references public.cities(slug) on delete set null,
  service_slug text,
  tier text,
  modifier_json jsonb not null default '{}'::jsonb,
  title text not null,
  title_ta text,
  meta_description text,
  meta_description_ta text,
  hero_image_id uuid,
  unique_intro_md text not null,
  unique_intro_ta_md text,
  unique_example_md text not null,
  unique_example_ta_md text,
  featured_project_ids uuid[] not null default '{}',
  author_id uuid references public.authors(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index landing_pages_city_idx on public.landing_pages(city_slug);
create index landing_pages_page_type_idx on public.landing_pages(page_type);
create trigger landing_pages_set_updated_at before update on public.landing_pages
  for each row execute function public.tg_set_updated_at();

-- Local suppliers (location page content + potential backlinks)
create table public.suppliers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null check (category in ('cement','tiles','steel','plumbing','electrical','paint','other')),
  city_slug text references public.cities(slug) on delete set null,
  website_url text,
  phone text,
  is_partner boolean not null default false,
  created_at timestamptz not null default now()
);

-- Column additions to existing tables
alter table public.projects add column locale text not null default 'en-IN';
alter table public.projects add column author_id uuid references public.authors(id) on delete set null;

alter table public.blog_posts add column author_id uuid references public.authors(id) on delete set null;
alter table public.blog_posts add column last_reviewed_at timestamptz;
alter table public.blog_posts add column reading_time_minutes integer;
alter table public.blog_posts add column locale text not null default 'en-IN';

alter table public.cities add column geo_lat numeric(9,6);
alter table public.cities add column geo_lng numeric(9,6);
alter table public.cities add column soil_type text;
alter table public.cities add column governing_authority text;
alter table public.cities add column climate_notes text;
alter table public.cities add column climate_notes_ta text;
```

- [ ] **Step 2: Write cities seed**

Create `supabase/seed.sql`:

```sql
-- Seed: 17 cities from AESTA master plan §3.2

insert into public.cities (slug, name, name_ta, tier, district, nearby_cities, geo_lat, geo_lng) values
  ('pudukkottai',      'Pudukkottai',      'புதுக்கோட்டை',    1, 'Pudukkottai',  array['keeranur','thirumayam','alangudi','viralimalai','gandarvakottai'], 10.3833, 78.8001),
  ('karaikudi',        'Karaikudi',        'காரைக்குடி',      1, 'Sivaganga',    array['devakottai','sivaganga'],                                          10.0667, 78.7833),
  ('aranthangi',       'Aranthangi',       'அறந்தாங்கி',      1, 'Pudukkottai',  array['avudaiyarkoil','ponnamaravathy','thirumayam'],                      10.1667, 78.9833),
  ('trichy',           'Tiruchirappalli',  'திருச்சிராப்பள்ளி', 1, 'Tiruchirappalli', array['thanjavur','viralimalai'],                                     10.7905, 78.7047),
  ('thanjavur',        'Thanjavur',        'தஞ்சாவூர்',        1, 'Thanjavur',    array['trichy'],                                                           10.7870, 79.1378),
  ('keeranur',         'Keeranur',         'கீரனூர்',          2, 'Pudukkottai',  array['pudukkottai','alangudi'],                                           10.4500, 78.8167),
  ('thirumayam',       'Thirumayam',       'திருமயம்',         2, 'Pudukkottai',  array['pudukkottai','aranthangi','ponnamaravathy'],                        10.2333, 78.7667),
  ('thirupathur',      'Thirupathur',      'திருப்பத்தூர்',    2, 'Sivaganga',    array['karaikudi','sivaganga'],                                            10.2000, 78.5667),
  ('ponnamaravathy',   'Ponnamaravathy',   'பொன்னமராவதி',    2, 'Pudukkottai',  array['thirumayam','aranthangi'],                                          10.2833, 78.9167),
  ('viralimalai',      'Viralimalai',      'விராலிமலை',        2, 'Pudukkottai',  array['pudukkottai','trichy'],                                             10.6000, 78.5500),
  ('alangudi',         'Alangudi',         'ஆலங்குடி',         2, 'Pudukkottai',  array['pudukkottai','keeranur'],                                           10.3667, 78.9833),
  ('illuppur',         'Illuppur',         'இலுப்பூர்',        2, 'Pudukkottai',  array['pudukkottai','viralimalai'],                                        10.5167, 78.6167),
  ('gandarvakottai',   'Gandarvakottai',   'கந்தர்வக்கோட்டை', 2, 'Pudukkottai',  array['pudukkottai'],                                                      10.5500, 78.8833),
  ('avudaiyarkoil',    'Avudaiyarkoil',    'அவுடையார்கோவில்', 2, 'Pudukkottai',  array['aranthangi'],                                                       10.0333, 79.0000),
  ('sivaganga',        'Sivaganga',        'சிவகங்கை',         2, 'Sivaganga',    array['karaikudi','thirupathur'],                                          9.8433,  78.4809),
  ('devakottai',       'Devakottai',       'தேவகோட்டை',        2, 'Sivaganga',    array['karaikudi'],                                                        9.9500,  78.8167),
  ('chennai',          'Chennai',          'சென்னை',            2, 'Chennai',      array[]::text[],                                                           13.0827, 80.2707);
```

- [ ] **Step 3: Apply migrations + seed**

```bash
pnpm db:reset
```

Expected: both migrations apply, seed runs, output: `Finished supabase db reset`.

- [ ] **Step 4: Verify tables + row counts**

```bash
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" -c "\dt public.*"
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" -c "select count(*) from public.cities;"
```

Expected: tables include `authors`, `entities`, `landing_pages`, `review_outreach`, `reviews`, `suppliers` in addition to base tables. Cities count returns `17`.

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/20260423000001_seo_schema.sql supabase/seed.sql
git commit -m "feat(db): add seo schema (entities, authors, reviews, review_outreach, landing_pages, suppliers) + 17 city seed"
```

---

## Task 9: Supabase type generation + client helpers

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Create (generated): `lib/supabase/types.ts`

- [ ] **Step 1: Generate types from local DB**

```bash
mkdir -p lib/supabase
pnpm db:types
```

Expected: `lib/supabase/types.ts` created with a `Database` interface listing every table.

- [ ] **Step 2: Write browser client**

Create `lib/supabase/client.ts`:

```ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

- [ ] **Step 3: Write server client (cookie-based, for server components)**

Create `lib/supabase/server.ts`:

```ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component — ignored; middleware handles refresh.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // Same as above.
          }
        },
      },
    },
  );
}
```

- [ ] **Step 4: Write service-role admin client (server-only, never imported into client components)**

Create `lib/supabase/admin.ts`:

```ts
import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase URL or service role key');
  }
  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
```

Install `server-only`:

```bash
pnpm add server-only@0.0.1
```

- [ ] **Step 5: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/supabase/ package.json pnpm-lock.yaml
git commit -m "feat(supabase): add typed clients (browser, server, admin) + generated types"
```

---

## Task 10: NAP constants module (TDD)

**Files:**
- Create: `lib/constants/nap.ts`
- Create: `lib/constants/nap.test.ts`

The NAP (Name / Address / Phone) module is the single source of truth consumed by schema components, footer, contact page, GBP export, and any structured data. Design spec §2 Pillar 2 requires this to be centralized.

- [ ] **Step 1: Write the failing test**

Create `lib/constants/nap.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { NAP, getPhoneLink, getWhatsAppLink, getMailtoLink } from './nap';

describe('NAP', () => {
  it('has required business identity fields', () => {
    expect(NAP.name).toBeTruthy();
    expect(NAP.phone).toMatch(/^\+\d{1,3}-?\d+/);
    expect(NAP.whatsapp).toMatch(/^\+\d{1,3}-?\d+/);
    expect(NAP.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    expect(NAP.foundedYear).toBe(2010);
    expect(NAP.areaServed.length).toBeGreaterThanOrEqual(17);
  });

  it('provides a telephone URI', () => {
    expect(getPhoneLink()).toMatch(/^tel:\+\d+/);
    expect(getPhoneLink()).not.toContain(' ');
    expect(getPhoneLink()).not.toContain('-');
  });

  it('provides a wa.me URL with no leading +', () => {
    expect(getWhatsAppLink()).toMatch(/^https:\/\/wa\.me\/\d+/);
  });

  it('provides a wa.me URL with an optional prefilled message', () => {
    const url = getWhatsAppLink('Hello from website');
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(url.split('?text=')[1])).toBe('Hello from website');
  });

  it('provides a mailto URL', () => {
    expect(getMailtoLink()).toMatch(/^mailto:[^@]+@[^@]+\.[^@]+$/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test -- nap
```

Expected: FAIL with "Cannot find module './nap'".

- [ ] **Step 3: Implement NAP**

Create `lib/constants/nap.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test -- nap
```

Expected: 5 passing tests.

- [ ] **Step 5: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/constants/
git commit -m "feat(nap): add NAP constants module with phone/whatsapp/mailto helpers"
```

---

## Task 11: next-intl configuration for en-IN + ta-IN

**Files:**
- Create: `i18n/config.ts`
- Create: `i18n/request.ts`
- Create: `i18n/messages/en-IN.json`
- Create: `i18n/messages/ta-IN.json`
- Create: `middleware.ts`
- Modify: `next.config.mjs`

- [ ] **Step 1: Create locale config**

Create `i18n/config.ts`:

```ts
export const locales = ['en-IN', 'ta-IN'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-IN';

export const localePrefix = 'as-needed' as const;

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
```

- [ ] **Step 2: Create request config loader**

Create `i18n/request.ts`:

```ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!isValidLocale(locale)) notFound();
  const messages = (await import(`./messages/${locale}.json`)).default;
  return {
    messages,
    timeZone: 'Asia/Kolkata',
    now: new Date(),
  };
});
```

- [ ] **Step 3: Create message bundles**

Create `i18n/messages/en-IN.json`:

```json
{
  "meta": {
    "siteName": "AESTA — Architects & Builders",
    "tagline": "Divinely beautiful. Built to last."
  },
  "nav": {
    "services": "Services",
    "projects": "Projects",
    "pricing": "Pricing",
    "locations": "Locations",
    "about": "About",
    "contact": "Contact"
  },
  "cta": {
    "getQuote": "Get Free Quote",
    "whatsapp": "WhatsApp Us",
    "callNow": "Call Now"
  }
}
```

Create `i18n/messages/ta-IN.json`:

```json
{
  "meta": {
    "siteName": "AESTA — ஆர்க்கிடெக்ட்ஸ் & பில்டர்ஸ்",
    "tagline": "உங்கள் கனவு வீடு, எங்கள் பொறுப்பு."
  },
  "nav": {
    "services": "சேவைகள்",
    "projects": "திட்டங்கள்",
    "pricing": "விலை",
    "locations": "இடங்கள்",
    "about": "எங்களைப் பற்றி",
    "contact": "தொடர்பு"
  },
  "cta": {
    "getQuote": "இலவச விலைமதிப்பீடு",
    "whatsapp": "வாட்ஸ்அப் செய்யுங்கள்",
    "callNow": "இப்போது அழையுங்கள்"
  }
}
```

- [ ] **Step 4: Create middleware**

Create `middleware.ts`:

```ts
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from './i18n/config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|admin|.*\\..*).*)',
  ],
};
```

- [ ] **Step 5: Update `next.config.mjs`**

Replace `next.config.mjs` with:

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Move + rewrite root layout to locale-aware layout**

Delete `app/layout.tsx` and `app/page.tsx` (the default scaffold versions) and recreate them under `app/[locale]/`:

```bash
rm app/layout.tsx app/page.tsx
mkdir -p app/[locale]
```

Create `app/[locale]/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale, locales } from '@/i18n/config';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('siteName'),
    description: t('tagline'),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale as Locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Create `app/[locale]/page.tsx` (placeholder — real homepage in Plan 3):

```tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('meta');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{t('siteName')}</h1>
      <p className="mt-4 text-lg text-neutral-600">{t('tagline')}</p>
      <p className="mt-8 text-sm text-neutral-400">Scaffold OK · Plan 1 complete</p>
    </main>
  );
}
```

Keep `app/globals.css` in place (scaffolded by `create-next-app`).

- [ ] **Step 7: Run dev and verify both locales route**

```bash
pnpm dev
```

Open in browser:
- `http://localhost:3000` — English (default, no prefix)
- `http://localhost:3000/ta-IN` — Tamil

Expected: both pages render with the correct headline. Stop dev server.

- [ ] **Step 8: Typecheck + build**

```bash
pnpm typecheck && pnpm build
```

Expected: no errors; build succeeds with two locales listed in the route output.

- [ ] **Step 9: Commit**

```bash
git add i18n/ middleware.ts next.config.mjs app/
git commit -m "feat(i18n): configure next-intl for en-IN and ta-IN with locale-aware layout"
```

---

## Task 12: Tamil font loading + Tailwind brand tokens

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Extend Tailwind config with brand tokens and fonts**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: { 50: '#fdf6f3', 500: '#c45a3a', 600: '#a94828', 700: '#8a3a20' },
        limestone: { 50: '#faf7f2', 100: '#f5efe6', 200: '#e9dfcc' },
        sage: { 500: '#6b8e6a', 600: '#577657' },
        charcoal: { 800: '#2b2a28', 900: '#1a1918' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        tamil: ['var(--font-tamil)', 'system-ui', 'sans-serif'],
        'tamil-display': ['var(--font-tamil-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Update root layout to load fonts via `next/font`**

Replace `app/[locale]/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Fraunces, Noto_Sans_Tamil, Hind_Madurai } from 'next/font/google';
import { isValidLocale, type Locale, locales } from '@/i18n/config';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  variable: '--font-tamil',
  display: 'swap',
});

const hindMadurai = Hind_Madurai({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tamil-display',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('siteName'),
    description: t('tagline'),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();
  const messages = await getMessages();

  return (
    <html
      lang={locale as Locale}
      className={`${inter.variable} ${fraunces.variable} ${notoTamil.variable} ${hindMadurai.variable}`}
    >
      <body className="bg-limestone-50 text-charcoal-900 antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Update globals.css with Tamil locale body selector**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: theme('fontFamily.sans');
  }

  html[lang='ta-IN'] {
    font-family: theme('fontFamily.tamil');
  }

  html[lang='ta-IN'] h1,
  html[lang='ta-IN'] h2,
  html[lang='ta-IN'] h3 {
    font-family: theme('fontFamily.tamil-display');
  }

  h1,
  h2,
  h3 {
    font-family: theme('fontFamily.serif');
  }
}
```

- [ ] **Step 4: Build to verify font loading works**

```bash
pnpm build
```

Expected: build succeeds. No font-loading errors.

- [ ] **Step 5: Smoke check in dev**

```bash
pnpm dev
```

Open `http://localhost:3000/ta-IN` in the browser — headline should render in Tamil script with Hind Madurai weight. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts app/[locale]/layout.tsx app/globals.css
git commit -m "feat(styling): add brand tokens + load Inter, Fraunces, Noto Sans Tamil, Hind Madurai"
```

---

## Task 13: GitHub Actions CI — lint, typecheck, test, build

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.1.0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Format check
        run: pnpm format:check

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Test
        run: pnpm test

      - name: Build
        env:
          NEXT_PUBLIC_SITE_URL: http://localhost:3000
          NEXT_PUBLIC_SUPABASE_URL: http://127.0.0.1:54321
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ci-placeholder
          SUPABASE_SERVICE_ROLE_KEY: ci-placeholder
          NEXT_PUBLIC_BUSINESS_NAME: "AESTA — Architects & Builders"
          NEXT_PUBLIC_BUSINESS_PHONE: "+91-0000000000"
          NEXT_PUBLIC_BUSINESS_WHATSAPP: "+91-0000000000"
          NEXT_PUBLIC_BUSINESS_EMAIL: hello@aesta.co.in
        run: pnpm build
```

- [ ] **Step 2: Run all gates locally to confirm they pass**

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: every command exits 0.

If `format:check` fails, run `pnpm format` and re-stage.
If `lint` surfaces warnings, fix them before CI runs.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add github actions workflow (format, lint, typecheck, test, build)"
```

---

## Task 14: Vercel deployment configuration

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Write vercel.json**

Create `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "pnpm install --frozen-lockfile",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "regions": ["bom1"],
  "crons": []
}
```

`bom1` is Vercel's Mumbai region — closest to the TN audience and minimises latency.

- [ ] **Step 2: Document manual Vercel setup steps in README**

Append to `README.md`:

```markdown

## Vercel deployment

1. Push this repo to GitHub.
2. Go to https://vercel.com/new → import the repo.
3. Framework: Next.js (auto-detected). Build command: `pnpm build`. Install command: `pnpm install --frozen-lockfile`.
4. Environment variables — set every key from `.env.example` with real values from the **hosted** Supabase project (not local). Scope: Production + Preview.
5. Region: Mumbai (bom1) — already set in `vercel.json`.
6. Deploy. Confirm both `https://<project>.vercel.app/` and `https://<project>.vercel.app/ta-IN` render.

Domain (aesta.co.in) wiring happens in a later plan once DNS is ready.
```

- [ ] **Step 3: Commit**

```bash
git add vercel.json README.md
git commit -m "chore(deploy): add vercel.json (Mumbai region) + README deploy notes"
```

---

## Task 15: Remove smoke test + final green run

**Files:**
- Delete: `lib/__smoke__/smoke.test.ts`

The smoke test was to prove Vitest wiring. Real tests (NAP) now exist, so the smoke can go.

- [ ] **Step 1: Delete smoke test**

```bash
rm -rf lib/__smoke__
```

- [ ] **Step 2: Run all gates**

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Expected: all pass. Tests show only the NAP test suite running.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test: remove smoke test now that real tests exist"
```

---

## Task 16: Push to GitHub + verify CI

**Files:** none

- [ ] **Step 1: Create GitHub repo**

Option A — via `gh` CLI (if installed):

```bash
gh repo create aesta --private --source=. --remote=origin --push
```

Option B — manual:

1. Go to https://github.com/new → create a private repo named `aesta`.
2. Do NOT initialize with README (we already have one).
3. Copy the repo URL.
4. Run:

```bash
git remote add origin <REPO_URL>
git push -u origin main
```

- [ ] **Step 2: Watch CI run**

Navigate to `https://github.com/<user>/aesta/actions`. Wait for the `CI / verify` run to complete.

Expected: green across format, lint, typecheck, test, build.

If CI fails:
- Read the failing step's log.
- Reproduce locally with the same command.
- Fix, commit, push. Do not `--no-verify` or bypass hooks.

- [ ] **Step 3: Tag the foundation milestone**

```bash
git tag -a plan-1-foundation -m "Foundation scaffold complete"
git push origin plan-1-foundation
```

---

## Completion criteria

Plan 1 is complete when **all** of the following are true:

1. `pnpm dev` serves `http://localhost:3000` (English) and `http://localhost:3000/ta-IN` (Tamil) with the placeholder home rendering in the correct language and font.
2. `pnpm supabase:start && pnpm db:reset` rebuilds local DB with 13 tables (7 base + 6 SEO) and 17 seeded cities.
3. `pnpm db:types` regenerates `lib/supabase/types.ts` without errors.
4. `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build` all exit 0.
5. Push to `main` on GitHub triggers the `CI / verify` workflow, which passes green.
6. The NAP test suite has 5 passing tests in `lib/constants/nap.test.ts`.
7. The repo is tagged `plan-1-foundation`.

After completion, proceed to **Plan 2 — SEO schema-emitting components** to build `<FAQSection>`, `<ProcessSteps>`, `<AggregateRating>`, `<ReviewCard>`, `<AuthorByline>`, `<LanguageSwitcher>`, `<YouTubeEmbed>`, `<LocationHero>` on top of this foundation.

---

## What this plan explicitly doesn't build

These items appear in the spec but live in later plans to keep this foundation focused:

- `<FAQSection>`, `<ProcessSteps>`, `<AggregateRating>`, `<ReviewCard>`, `<AuthorByline>`, `<LanguageSwitcher>`, `<YouTubeEmbed>`, `<LocationHero>` → **Plan 2**
- Homepage, services, pricing, projects, locations, about, contact, quote, reviews, press pages → **Plan 3**
- Entity page MDX pipeline, blog system, author bylines on pages → **Plan 4**
- Admin panel (all CRUDs, leads inbox, review outreach, content calendar, AI-citation checklist) → **Plan 5**
- `/[city]/[service]` and `/services/[service]/[modifier]` dynamic programmatic routes → **Plan 6**
- `llms.txt` generator, `robots.txt` with AI crawler allowlist, sitemap-index → **Plan 2** (grouped with schema components since both emit build-time artifacts)
- CI additions for schema validation, Lighthouse CI, hreflang validator → **Plan 2**
- WhatsApp Business API integration (quote form alert, post-handover review trigger), GBP review sync cron → **Plan 7**

These are tracked here so nothing gets lost between plans.
