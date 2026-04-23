-- SEO/AEO additive schema
-- Source: docs/superpowers/specs/2026-04-23-aesta-seo-aeo-strategy-design.md §6
-- Applied to hosted project rcbhsakwfdwjheorxmzk via Supabase MCP (mcp__supabase__apply_migration)

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

-- Local suppliers
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
