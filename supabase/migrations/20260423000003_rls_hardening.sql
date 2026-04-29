-- RLS hardening pass — addresses advisor lints from 20260423000002_rls_policies.sql
--
-- Fixes:
--   1. tg_set_updated_at — set immutable search_path (WARN: function_search_path_mutable)
--   2. leads_public_insert — add length checks (WARN: rls_policy_always_true)
--   3. review_outreach — document intentional locked-down state (INFO: rls_enabled_no_policy)

-- 1. Pin search_path on the trigger function
alter function public.tg_set_updated_at() set search_path = public, pg_catalog;

-- 2. Replace leads INSERT policy with bounded-length checks (abuse prevention)
drop policy if exists leads_public_insert on public.leads;

create policy leads_public_insert on public.leads
  for insert to anon, authenticated
  with check (
    source in ('quote_form','contact_form','whatsapp_click','phone_click')
    and (name is null or length(name) <= 200)
    and (phone is null or length(phone) <= 30)
    and (email is null or length(email) <= 254)
    and (city is null or length(city) <= 200)
    and (timeline is null or length(timeline) <= 200)
    and (tier_interest is null or length(tier_interest) <= 50)
    and (message is null or length(message) <= 5000)
    and (utm_source is null or length(utm_source) <= 200)
    and (utm_medium is null or length(utm_medium) <= 200)
    and (utm_campaign is null or length(utm_campaign) <= 200)
  );

-- 3. Document intentional lockdown on review_outreach
comment on table public.review_outreach is
  'Internal CRM for post-handover review-collection workflow. RLS enabled with no anon/authenticated policies — only service_role (admin panel) can read or write. Intentional default-deny state.';
