-- Row-level security hardening for all 13 tables
-- Source: Plan 1.5 (post-foundation RLS pass)
-- Applied to hosted project rcbhsakwfdwjheorxmzk via Supabase MCP (mcp__supabase__apply_migration)
--
-- Posture:
--   - service_role bypasses RLS (admin panel uses utils/supabase/admin.ts → service-role key)
--   - anon = unauthenticated visitors (publishable key)
--   - authenticated = logged-in users (none yet; included for forward compat)
--
-- Public read tables: filtered by published/status where applicable
-- Public write: only `leads` (INSERT-only — visitors can submit quotes)
-- Locked-down: `review_outreach` (no anon access, internal CRM)

-- ============================================================
-- Enable RLS on every public table
-- ============================================================

alter table public.cities          enable row level security;
alter table public.projects        enable row level security;
alter table public.project_photos  enable row level security;
alter table public.leads           enable row level security;
alter table public.blog_posts      enable row level security;
alter table public.testimonials    enable row level security;
alter table public.site_settings   enable row level security;
alter table public.authors         enable row level security;
alter table public.entities        enable row level security;
alter table public.reviews         enable row level security;
alter table public.review_outreach enable row level security;
alter table public.landing_pages   enable row level security;
alter table public.suppliers       enable row level security;

-- ============================================================
-- Public-read policies (filtered)
-- ============================================================

create policy cities_public_read on public.cities
  for select to anon, authenticated using (true);

create policy projects_public_read on public.projects
  for select to anon, authenticated using (status in ('completed','ongoing'));

create policy project_photos_public_read on public.project_photos
  for select to anon, authenticated using (true);

create policy blog_posts_public_read on public.blog_posts
  for select to anon, authenticated using (published = true);

create policy testimonials_public_read on public.testimonials
  for select to anon, authenticated using (true);

create policy site_settings_public_read on public.site_settings
  for select to anon, authenticated using (true);

create policy authors_public_read on public.authors
  for select to anon, authenticated using (true);

create policy entities_public_read on public.entities
  for select to anon, authenticated using (published = true);

create policy reviews_public_read on public.reviews
  for select to anon, authenticated using (true);

create policy landing_pages_public_read on public.landing_pages
  for select to anon, authenticated using (published = true);

create policy suppliers_public_read on public.suppliers
  for select to anon, authenticated using (true);

-- ============================================================
-- Public-write policy: leads (INSERT only, no read for anon)
-- ============================================================

create policy leads_public_insert on public.leads
  for insert to anon, authenticated with check (true);

-- No SELECT/UPDATE/DELETE policy for `leads` → anon cannot read other people's submissions.
-- Admin panel reads via service_role (bypasses RLS).

-- ============================================================
-- review_outreach: locked down
-- ============================================================

-- No policies created → with RLS enabled and no policy, anon/authenticated cannot
-- access this table at all. Only service_role (admin panel) can read/write.
