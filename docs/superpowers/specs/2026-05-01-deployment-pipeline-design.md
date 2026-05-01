# AESTA Deployment Pipeline Design

**Date:** 2026-05-01
**Status:** Approved — ready for implementation plan
**Owner:** Hari Babu (findhari93@gmail.com)

## Goal

A repeatable, low-touch deployment pipeline for the AESTA website that lets Hari say *"deploy all changes"* and have code, database migrations, hosting, and (eventually) DNS update through the correct sequence with verification at each step.

## Non-goals

- Replacing Vercel's existing Git integration (it stays — it's the actual deploy mechanism).
- Migrating DNS to Cloudflare today (designed-in but deferred until Hari triggers it).
- Blue/green or canary deploys — Vercel's instant rollback is sufficient for this site's traffic profile.
- Automated rollback of failed migrations — out of scope; manual reverse-migration is the documented recovery.

## Architecture

Two cooperating layers sitting on top of the existing Vercel Git integration.

### Layer 1 — Automated pipeline (GitHub Actions)

Workflows in `.github/workflows/`:

| File | Trigger | Purpose |
|---|---|---|
| `ci.yml` (exists) | PR + push to `main` | format, lint, typecheck, test, build |
| `migrate.yml` (NEW) | `workflow_dispatch` only | List pending Supabase migrations, then apply via `supabase db push` |
| `deploy-check.yml` (NEW) | Push to `main` | Wait for Vercel deploy to finish, smoke-test live URL, report pass/fail |

Vercel Git integration is unchanged: push to `main` → Vercel builds and ships to `https://aesta.co.in`. CI runs in parallel and does not gate the deploy. Trade-off accepted: a broken build can reach Vercel, but Vercel's own build catches the same failures and the previous deploy stays live; net risk is low and matches today's behavior.

### Layer 2 — MCP runbook ("deploy all changes")

A documented runbook at `docs/superpowers/runbooks/deploy-all-changes.md`, referenced from `CLAUDE.md` so Claude auto-loads it when Hari says any of: *"deploy all changes"*, *"deploy"*, *"ship it"*, *"push to prod"*.

Claude orchestrates via MCPs:
- **Supabase MCP** — `list_migrations`, `apply_migration` for DB changes
- **GitHub MCP** — to trigger `migrate.yml` if Hari prefers the workflow path
- **Vercel MCP** — `get_deployment`, `get_deployment_build_logs` for post-push polling
- **Cloudflare MCP** (later) — DNS edits when on Cloudflare

## Runbook flow ("deploy all changes")

```
1. Pre-flight
   - git status (list uncommitted files)
   - Supabase MCP list_migrations vs local supabase/migrations/ (find pending)
   - Run locally: pnpm format:check, lint, typecheck, test, build (fail fast)
2. Confirm with Hari
   - Show summary: "X files changed, Y migrations pending. Proceed?"
   - Abort if anything looks wrong
3. Apply migrations (if any)
   - Default: Supabase MCP apply_migration, one file at a time, in filename order
   - Alt: trigger migrate.yml via GitHub MCP if Hari prefers
4. Commit + push
   - git add, commit with message, push origin main
   - Vercel Git integration auto-builds
5. Watch the deploy
   - Vercel MCP get_deployment, poll until state ∈ {READY, ERROR, CANCELED}
   - On ERROR: fetch get_deployment_build_logs, report to Hari, stop
6. Smoke test (post-deploy)
   - Fetch https://aesta.co.in/ — expect 200 + "AESTA" in body
   - Fetch https://aesta.co.in/about — expect 200 + "AESTA" in body
7. Report
   - Deploy URL, migrations applied, smoke status, total elapsed time
```

Every step has an abort point — Claude stops and asks if anything looks unexpected.

## DNS (deferred)

Today: GoDaddy A record → `76.76.21.21` (Vercel). The runbook contains a stubbed step *"TODO: when on Cloudflare, update DNS via mcp\_\_cloudflare\_\_execute"*. No code change today; only documentation so the runbook is structurally complete.

When Hari triggers the migration:
1. Generate Cloudflare API token with Zone:DNS:Edit
2. Add zone for `aesta.co.in` in Cloudflare
3. Switch nameservers at GoDaddy → Cloudflare's NS pair
4. Re-create A record (apex → 76.76.21.21) and CNAME (`www` → `cname.vercel-dns.com`)
5. Wait for propagation, verify SSL re-issues on Vercel side

This will be a separate one-shot, not part of the recurring deploy runbook.

## Error handling

| Failure | Behavior |
|---|---|
| Local CI fails in pre-flight | Runbook stops before any push or migration. Hari fixes locally, retries. |
| Migration MCP call fails | Runbook stops. Reports which migration broke. Hari/Claude write a reverse migration manually. No auto-rollback. |
| `git push` rejected (non-FF) | Runbook stops. Reports remote state. Hari decides: rebase, force, or abort. |
| Vercel build fails | Previous deploy stays live. Runbook reports build log URL. |
| Smoke test fails post-deploy | Runbook reports red. Hari rolls back via Vercel dashboard (one-click) — runbook documents this step inline. |
| `migrate.yml` workflow fails | Logs in GitHub Actions tab. Same recovery as above (manual reverse migration). |

## Secrets

Added to GitHub repo settings → Secrets and variables → Actions:

- `SUPABASE_ACCESS_TOKEN` — from `supabase.com/dashboard/account/tokens` (used by `supabase login` in `migrate.yml`)
- `SUPABASE_DB_PASSWORD` — from project settings → database (used by `supabase db push`)

Vercel env vars stay in Vercel project settings (Hari already manages these).

## Files to create or modify

**New files:**
- `.github/workflows/migrate.yml`
- `.github/workflows/deploy-check.yml`
- `docs/superpowers/runbooks/deploy-all-changes.md`

**Modified files:**
- `CLAUDE.md` — add a "Deploy commands" section pointing at the runbook with trigger phrases listed
- `MEMORY.md` (Hari's auto-memory) — update the AESTA stack memory with new deploy paths after the workflows ship

## Smoke test scope

Initial: `/` and `/about` (homepage + most-visited content page). Both expect HTTP 200 and the literal string "AESTA" in the response body.

Future expansion (out of scope for first ship): all 8 service pages, all 5 location pages, and the contact form GET.

## Validation / how we know it works

- `migrate.yml` validated by adding a no-op migration (e.g. a comment-only SQL file) and triggering the workflow once
- `deploy-check.yml` validated by intentionally pushing a small content tweak and confirming the workflow runs after Vercel's deploy completes
- Runbook validated by walking through one real "deploy all changes" with Hari narrating each step the first time

## Open questions / decisions deferred

None at design time. Implementation may surface tactical choices (e.g. exact polling interval for Vercel deploy state, smoke-test timeout) — those are plan-level details, not design-level.
