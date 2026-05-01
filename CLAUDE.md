# AESTA Website — Claude Code Instructions

This file is auto-loaded into every Claude Code session in this repo. Keep it short — context is precious.

## Project at a glance

- **What:** Marketing site for AESTA Architects & Builders (`aesta.co.in`)
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + next-intl + Supabase
- **Hosting:** Vercel team `aesta-management`, project `aesta-website`, region `bom1`
- **Database:** Supabase project `rcbhsakwfdwjheorxmzk` (Tokyo region)
- **DNS:** GoDaddy → Vercel A record `76.76.21.21` (Cloudflare migration deferred)
- **Deploy pipeline validated:** 2026-05-01

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
