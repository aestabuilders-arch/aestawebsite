-- Base schema for AESTA website
-- Source: AESTA_WEBSITE_PLAN.md §7.2
-- Applied to hosted project rcbhsakwfdwjheorxmzk via Supabase MCP (mcp__supabase__apply_migration)

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
