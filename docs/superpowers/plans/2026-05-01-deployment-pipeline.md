# Deployment Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a two-layer deployment pipeline — GitHub Actions for the automated path (CI + manual `migrate.yml` + post-deploy smoke), plus an MCP-driven runbook Claude follows when Hari says *"deploy all changes"*.

**Architecture:** Vercel's existing Git integration stays untouched and remains the actual code-deploy mechanism. Two new GitHub Actions workflows wrap it: `migrate.yml` for `workflow_dispatch`-triggered Supabase migrations, and `deploy-check.yml` for post-push smoke testing. A Markdown runbook + `CLAUDE.md` hook teach Claude to orchestrate the same flow with observation via the Supabase, GitHub, and Vercel MCPs.

**Tech Stack:** GitHub Actions (YAML), Supabase CLI (in workflow), Markdown (runbook + CLAUDE.md), MCPs (Supabase, GitHub, Vercel, Cloudflare-future).

**Spec:** `docs/superpowers/specs/2026-05-01-deployment-pipeline-design.md`

**Files to create or modify:**
- Create: `.github/workflows/migrate.yml`
- Create: `.github/workflows/deploy-check.yml`
- Create: `docs/superpowers/runbooks/deploy-all-changes.md`
- Create: `CLAUDE.md`
- Create: `supabase/migrations/20260501000000_validation_noop.sql` (kept in repo as validation marker)
- Modify (Task 6): `CLAUDE.md` — append validation marker line
- Hari does manually: GitHub repo Settings → Secrets → add `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`

---

## Task 1: Create the Supabase migration workflow

**Files:**
- Create: `.github/workflows/migrate.yml`

- [ ] **Step 1: Write the workflow file**

Create `.github/workflows/migrate.yml` with this exact content:

```yaml
name: Apply Supabase Migrations

on:
  workflow_dispatch:
    inputs:
      dry_run:
        description: "If true, only list pending migrations without applying them"
        required: false
        default: "false"
        type: choice
        options:
          - "false"
          - "true"

jobs:
  migrate:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    env:
      SUPABASE_PROJECT_REF: rcbhsakwfdwjheorxmzk

    steps:
      - uses: actions/checkout@v4

      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Link project and list pending migrations
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
        run: |
          supabase link --project-ref "$SUPABASE_PROJECT_REF"
          echo "::group::Pending migrations"
          supabase migration list
          echo "::endgroup::"

      - name: Apply migrations
        if: ${{ github.event.inputs.dry_run != 'true' }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
        run: |
          supabase db push --password "$SUPABASE_DB_PASSWORD"

      - name: Skipped (dry run)
        if: ${{ github.event.inputs.dry_run == 'true' }}
        run: echo "Dry run complete. No migrations applied."
```

- [ ] **Step 2: Validate YAML syntax**

Run: `python -c "import yaml; yaml.safe_load(open('.github/workflows/migrate.yml'))"`
Expected: no output (success). If it errors, the YAML is malformed — re-check indentation and the heredoc.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/migrate.yml
git commit -m "ci: add manual Supabase migration workflow

Triggered via workflow_dispatch. Lists pending migrations always,
applies them only when dry_run=false. Requires SUPABASE_ACCESS_TOKEN
and SUPABASE_DB_PASSWORD secrets."
```

---

## Task 2: Create the post-deploy smoke check workflow

**Files:**
- Create: `.github/workflows/deploy-check.yml`

- [ ] **Step 1: Write the workflow file**

Create `.github/workflows/deploy-check.yml` with this exact content:

```yaml
name: Post-Deploy Smoke Check

on:
  push:
    branches: [main]

jobs:
  smoke:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Wait for Vercel deploy
        # Vercel auto-deploys on the same push. Give it a head start before polling.
        run: sleep 90

      - name: Smoke test homepage
        run: |
          attempts=0
          max=10
          until curl -fsSL https://aesta.co.in/ | grep -qi 'AESTA'; do
            attempts=$((attempts + 1))
            if [ "$attempts" -ge "$max" ]; then
              echo "::error::Homepage smoke failed after $max attempts"
              exit 1
            fi
            echo "Attempt $attempts: not ready, retrying in 30s"
            sleep 30
          done
          echo "Homepage OK"

      - name: Smoke test about page
        run: |
          if ! curl -fsSL https://aesta.co.in/about | grep -qi 'AESTA'; then
            echo "::error::About page smoke failed"
            exit 1
          fi
          echo "About page OK"
```

- [ ] **Step 2: Validate YAML syntax**

Run: `python -c "import yaml; yaml.safe_load(open('.github/workflows/deploy-check.yml'))"`
Expected: no output (success).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy-check.yml
git commit -m "ci: add post-deploy smoke check workflow

Runs on push to main, waits ~90s for Vercel deploy, then polls
https://aesta.co.in/ and /about with retry until both return 200
and contain 'AESTA' in the body."
```

---

## Task 3: Write the deploy-all-changes runbook

**Files:**
- Create: `docs/superpowers/runbooks/deploy-all-changes.md`

- [ ] **Step 1: Create the runbooks directory and runbook file**

Create `docs/superpowers/runbooks/deploy-all-changes.md` with this exact content:

````markdown
# Runbook: Deploy All Changes

**Trigger phrases:** "deploy all changes", "deploy", "ship it", "push to prod", "deploy to production"

When Hari says any of the above, follow this runbook end-to-end. Stop and ask if anything looks unexpected at any abort point.

---

## Step 1 — Pre-flight (read-only)

Run all of these in parallel — none of them change state.

1. `git status` — list any uncommitted or untracked files
2. `git log --oneline origin/main..HEAD` — list commits not yet pushed
3. List local migrations: read filenames in `supabase/migrations/`
4. Query applied migrations on prod via Supabase MCP `mcp__claude_ai_Supabase__list_migrations`
5. Compute the set difference: local migrations not in the applied list = **pending migrations**

## Step 2 — Local verification

Run locally before pushing anything:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If any fail: stop. Report failure to Hari. Do not push.

## Step 3 — Confirm with Hari

Report a summary in this format:

```
Ready to deploy:
- Files changed: <count> (or "none")
- Commits to push: <count> (or "none")
- Pending migrations: <list of filenames, or "none">
- Local CI: PASS

Proceed? [y/N]
```

Wait for explicit "yes" / "y" / "proceed". Anything else = abort.

## Step 4 — Apply migrations (if any)

For each pending migration in filename order:

1. Read the SQL file content
2. Apply via Supabase MCP `mcp__claude_ai_Supabase__apply_migration` with `name` = filename without extension and `query` = file content
3. If apply returns an error: stop, report which migration failed and the error, do not continue. Hari will write a reverse migration manually.

If Hari prefers the workflow path instead, trigger `migrate.yml`:
- GitHub MCP — dispatch `migrate.yml` on branch `main` with `dry_run=false`
- Poll the workflow run until `conclusion` = `success` or `failure`

## Step 5 — Commit and push

If there are uncommitted changes:

```bash
git add <specific-files>   # never use -A; list files explicitly
git commit -m "<conventional-commit-message>"
```

Push:

```bash
git push origin main
```

If push is rejected (non-fast-forward): stop. Report state, ask Hari whether to rebase or abort.

## Step 6 — Watch the Vercel deploy

Vercel auto-builds on push. Poll Vercel MCP `mcp__vercel__get_deployment` (project = `aesta-website`, team = `aesta-management`) every 15 seconds.

- If `state` = `READY`: continue to Step 7
- If `state` = `ERROR` or `CANCELED`: fetch `mcp__vercel__get_deployment_build_logs`, report the error, stop
- Timeout after 8 minutes — report timeout, stop

## Step 7 — Smoke test the live site

Fetch each URL and assert:

| URL | Expected status | Expected body contains |
|---|---|---|
| `https://aesta.co.in/` | 200 | `AESTA` |
| `https://aesta.co.in/about` | 200 | `AESTA` |

If either fails: report failure. Tell Hari how to roll back: *"Open https://vercel.com/aesta-management/aesta-website/deployments → click the last green deploy → 'Promote to Production'."*

## Step 8 — Report

Final report format:

```
Deploy complete.
- Commit: <sha> "<message>"
- Vercel URL: <deployment-url>
- Migrations applied: <list or "none">
- Smoke: PASS
- Elapsed: <minutes>
```

---

## Cloudflare DNS (deferred — do not run today)

When Hari migrates DNS to Cloudflare, this runbook gains a Step 0 ("verify DNS propagated correctly") and one-shot DNS edits move to `mcp__cloudflare__execute`. Until then: no DNS changes happen as part of this runbook.
````

- [ ] **Step 2: Verify the file renders**

Run: `head -20 docs/superpowers/runbooks/deploy-all-changes.md`
Expected: title and trigger phrases visible, no rendering glitches.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/runbooks/deploy-all-changes.md
git commit -m "docs: add deploy-all-changes runbook for Claude

Step-by-step procedure Claude follows when Hari says 'deploy
all changes' or similar trigger phrases. Uses Supabase, GitHub,
and Vercel MCPs for orchestration with abort points throughout."
```

---

## Task 4: Create CLAUDE.md with the deploy hook

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Write CLAUDE.md**

Create `CLAUDE.md` at repo root with this exact content:

```markdown
# AESTA Website — Claude Code Instructions

This file is auto-loaded into every Claude Code session in this repo. Keep it short — context is precious.

## Project at a glance

- **What:** Marketing site for AESTA Architects & Builders (`aesta.co.in`)
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + next-intl + Supabase
- **Hosting:** Vercel team `aesta-management`, project `aesta-website`, region `bom1`
- **Database:** Supabase project `rcbhsakwfdwjheorxmzk` (Tokyo region)
- **DNS:** GoDaddy → Vercel A record `76.76.21.21` (Cloudflare migration deferred)

## Deploy commands

When Hari says any of:
- *"deploy all changes"*
- *"deploy"*
- *"ship it"*
- *"push to prod"*
- *"deploy to production"*

Auto-load and follow `docs/superpowers/runbooks/deploy-all-changes.md` end-to-end. Do not improvise. Each step has an abort point.

For ad-hoc database operations (one-off seed data, hotfix migrations) outside a full deploy, use the Supabase MCP directly — do not invoke the runbook.

## Specs and plans

- Specs: `docs/superpowers/specs/`
- Plans: `docs/superpowers/plans/`
- Runbooks: `docs/superpowers/runbooks/`

When picking up new work, check for an existing spec before brainstorming a new one.

## Verification before claiming done

For UI changes: open the page in a browser and verify visually. Type-checks and tests verify code correctness, not feature correctness.

For deploy work: do not say "deployed" until the post-deploy smoke check passes (the `deploy-check.yml` workflow run shows green, AND the runbook's Step 7 returns PASS).
```

- [ ] **Step 2: Verify file exists and has expected sections**

Run: `grep -E '^##' CLAUDE.md`
Expected output:
```
## Project at a glance
## Deploy commands
## Specs and plans
## Verification before claiming done
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with deploy command triggers

Auto-loaded per session. Lists trigger phrases that route Claude
to the deploy-all-changes runbook, plus a quick stack reference
and verification reminders."
```

---

## Task 5: Hari adds GitHub secrets (manual)

**This task is for Hari, not the implementing agent.** The agent should print these instructions and pause for Hari to confirm completion before proceeding to Task 6.

- [ ] **Step 1: Print these instructions for Hari**

```
ACTION REQUIRED — Hari, please add two secrets to the GitHub repo:

1. Generate a Supabase access token:
   - Open https://supabase.com/dashboard/account/tokens
   - Click "Generate new token", name it "github-actions-aesta"
   - Copy the token (starts with sbp_...)

2. Get the Supabase DB password:
   - Open https://supabase.com/dashboard/project/rcbhsakwfdwjheorxmzk/settings/database
   - Under "Database password", click "Reset password" if you don't have it saved
   - Copy the new password

3. Add both as GitHub repo secrets:
   - Open https://github.com/aestabuilders-arch/aestawebsite/settings/secrets/actions
   - "New repository secret" → name: SUPABASE_ACCESS_TOKEN, value: <the sbp_... token>
   - "New repository secret" → name: SUPABASE_DB_PASSWORD, value: <the db password>

Reply "secrets done" when ready to validate end-to-end.
```

- [ ] **Step 2: Wait for Hari's confirmation**

Do not proceed to Task 6 until Hari confirms.

---

## Task 6: End-to-end validation

**Files:**
- Create: `supabase/migrations/20260501000000_validation_noop.sql` (kept in repo — idempotent no-op)

This task validates that all three new pieces (migrate.yml + deploy-check.yml + the runbook flow they support) work end-to-end against real prod.

- [ ] **Step 1: Create a no-op test migration**

Create `supabase/migrations/20260501000000_validation_noop.sql` with this exact content:

```sql
-- Validation no-op migration for deployment pipeline test (2026-05-01).
-- Idempotent: creates and immediately drops a temp table. Safe to re-run.
-- Kept in repo as a marker that pipeline was validated end-to-end.

CREATE TABLE IF NOT EXISTS pipeline_validation_temp (id int);
DROP TABLE IF EXISTS pipeline_validation_temp;
```

- [ ] **Step 2: Edit CLAUDE.md to add a validation marker**

In `CLAUDE.md`, find the "Project at a glance" section (the bulleted list under the heading). Append this exact line as the last bullet in that list:

```
- **Deploy pipeline validated:** 2026-05-01
```

- [ ] **Step 3: Commit and push (triggers deploy-check.yml automatically)**

Note: `migrate.yml` reads migrations from the checked-out `main` branch, so the validation migration must be pushed before triggering the workflow.

```bash
git add CLAUDE.md supabase/migrations/20260501000000_validation_noop.sql
git commit -m "chore: validate deploy pipeline end-to-end"
git push origin main
```

This push triggers `deploy-check.yml` automatically — let it run in the background; we'll check it in Step 7.

- [ ] **Step 4: Trigger migrate.yml in dry-run mode**

Now that the migration is on `main`, dispatch `migrate.yml` with `dry_run=true`:

```bash
gh workflow run migrate.yml -f dry_run=true
gh run watch
```

(Or use GitHub MCP `workflow_dispatch` equivalent.)

Expected: workflow succeeds; the "Pending migrations" group lists `20260501000000_validation_noop`; "Apply migrations" step is skipped; "Skipped (dry run)" step runs.

- [ ] **Step 5: Trigger migrate.yml for real**

```bash
gh workflow run migrate.yml -f dry_run=false
gh run watch
```

Expected: workflow succeeds; "Apply migrations" step runs `supabase db push` and reports the migration applied.

- [ ] **Step 6: Verify the migration was recorded on prod**

Use Supabase MCP `mcp__claude_ai_Supabase__list_migrations`.
Expected: `20260501000000` appears in the applied list.

- [ ] **Step 7: Verify deploy-check.yml succeeded**

Run: `gh run list --workflow=deploy-check.yml --limit=1`
Expected: most recent run for the commit from Step 3 shows `success`. If still in progress, run `gh run watch` and wait.

If the run shows failure: open it (`gh run view --log`), inspect which smoke step failed. Most likely cause: Vercel deploy took longer than the 90s pre-sleep + 10×30s retries = ~6.5 min budget. If that's the case, increase the initial sleep in `deploy-check.yml` and re-push.

- [ ] **Step 8: Report success to Hari**

Report:
```
Deployment pipeline validated end-to-end:
- Validation migration pushed to main and applied via migrate.yml (dry-run + real)
- Migration recorded on prod (verified via Supabase MCP)
- deploy-check.yml triggered on push, both smoke checks PASS
- Pipeline ready for routine use — say "deploy all changes" any time
```

---

## Self-review notes (for the implementing agent)

- All file paths are exact and absolute from repo root.
- Every YAML and Markdown block above is final content — no placeholders, no "fill in".
- Task 5 (Hari's secrets) is a hard gate — do not invent values, do not skip, do not try to use a service-role key as a substitute.
- If `gh workflow run` is unavailable in the executor's environment, dispatch via the GitHub MCP `workflow_dispatch` tool instead — same effect.
- Task 6 keeps the validation migration in the repo permanently. It is idempotent (CREATE IF NOT EXISTS / DROP IF EXISTS) so re-runs against a fresh DB are safe and serve as a marker that the pipeline was validated.
- The `migrate.yml` workflow checks out `main` — migration files must be pushed before dispatching the workflow. Task 6's step ordering enforces this.
