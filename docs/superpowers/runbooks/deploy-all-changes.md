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
