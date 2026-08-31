create extension if not exists "uuid-ossp";

create type case_study_status as enum ('draft', 'published');
create type page_kind as enum ('home', 'case_study');
create type page_status as enum ('draft', 'published');

create table if not exists portfolio_settings (
  id uuid primary key default uuid_generate_v4(),
  owner_name text not null,
  title text not null,
  statement text not null,
  resume_url text,
  calendly_url text,
  social_links jsonb not null default '[]'::jsonb,
  theme jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists case_studies (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  category text not null,
  tags text[] not null default '{}',
  role text,
  client text,
  year text,
  duration text,
  status case_study_status not null default 'draft',
  featured boolean not null default false,
  cover_url text,
  accent text not null default '#67e8f9',
  metrics jsonb not null default '[]'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists case_study_sections (
  id uuid primary key default uuid_generate_v4(),
  case_study_id uuid not null references case_studies(id) on delete cascade,
  section_type text not null,
  title text not null,
  body text not null,
  bullets jsonb not null default '[]'::jsonb,
  media jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pages (
  id uuid primary key default uuid_generate_v4(),
  kind page_kind not null,
  slug text unique,
  case_study_id uuid references case_studies(id) on delete cascade,
  title text not null,
  status page_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One home page only; case studies are keyed by slug.
create unique index if not exists pages_single_home on pages ((kind)) where kind = 'home';

create table if not exists page_blocks (
  id uuid primary key default uuid_generate_v4(),
  page_id uuid not null references pages(id) on delete cascade,
  parent_id uuid references page_blocks(id) on delete cascade,
  type text not null,
  props jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  version page_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists page_blocks_lookup on page_blocks (page_id, version, sort_order);

create table if not exists assets (
  id uuid primary key default uuid_generate_v4(),
  public_id text not null,
  secure_url text not null,
  resource_type text not null,
  alt text,
  width integer,
  height integer,
  bytes integer,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table portfolio_settings enable row level security;
alter table case_studies enable row level security;
alter table case_study_sections enable row level security;
alter table pages enable row level security;
alter table page_blocks enable row level security;
alter table assets enable row level security;
alter table contact_messages enable row level security;

create policy "Public can read published case studies"
on case_studies for select
using (status = 'published');

create policy "Public can read published sections"
on case_study_sections for select
using (
  exists (
    select 1 from case_studies
    where case_studies.id = case_study_sections.case_study_id
    and case_studies.status = 'published'
  )
);

create policy "Authenticated admins manage content"
on case_studies for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admins manage sections"
on case_study_sections for all
to authenticated
using (true)
with check (true);

create policy "Public can read published pages"
on pages for select
using (status = 'published');

create policy "Public can read published page blocks"
on page_blocks for select
using (
  version = 'published'
  and exists (
    select 1 from pages
    where pages.id = page_blocks.page_id
    and pages.status = 'published'
  )
);

create policy "Authenticated admins manage pages"
on pages for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admins manage page blocks"
on page_blocks for all
to authenticated
using (true)
with check (true);

create policy "Authenticated admins manage assets"
on assets for all
to authenticated
using (true)
with check (true);

-- Atomic publish: replace published blocks with a copy of the current draft set.
-- Handles one level of parent/child nesting by carrying the original draft id and
-- remapping children to their newly-inserted published parents.
create or replace function publish_page(target_page_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  rec record;
begin
  delete from page_blocks
  where page_id = target_page_id and version = 'published';

  create temporary table _publish_map (draft_id uuid, published_id uuid) on commit drop;

  -- Insert top-level (parentless) blocks first, recording the draft->published id mapping.
  for rec in
    select id, page_id, type, props, sort_order
    from page_blocks
    where page_id = target_page_id and version = 'draft' and parent_id is null
    order by sort_order
  loop
    with ins as (
      insert into page_blocks (page_id, parent_id, type, props, sort_order, version)
      values (rec.page_id, null, rec.type, rec.props, rec.sort_order, 'published')
      returning id
    )
    insert into _publish_map (draft_id, published_id)
    select rec.id, id from ins;
  end loop;

  -- Insert child blocks, remapping parent_id to the freshly published parent.
  insert into page_blocks (page_id, parent_id, type, props, sort_order, version)
  select c.page_id, m.published_id, c.type, c.props, c.sort_order, 'published'
  from page_blocks c
  join _publish_map m on m.draft_id = c.parent_id
  where c.page_id = target_page_id and c.version = 'draft' and c.parent_id is not null;

  update pages
  set status = 'published', published_at = now(), updated_at = now()
  where id = target_page_id;
end;
$$;

create policy "Anyone can submit contact messages"
on contact_messages for insert
with check (true);
