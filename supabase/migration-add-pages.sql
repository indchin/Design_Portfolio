-- Migration: add pages + page_blocks tables and the publish_page RPC.
-- Safe to run on a Supabase project that already has the original schema.sql tables.
-- Idempotent: every statement uses IF NOT EXISTS or DO blocks.

-- New enum types (guarded — Postgres has no CREATE TYPE IF NOT EXISTS)
do $$ begin
  create type page_kind as enum ('home', 'case_study');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type page_status as enum ('draft', 'published');
exception when duplicate_object then null;
end $$;

-- pages table
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

-- Only one home page allowed
create unique index if not exists pages_single_home on pages ((kind)) where kind = 'home';

-- page_blocks table
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

-- RLS
alter table pages enable row level security;
alter table page_blocks enable row level security;

-- Drop old policies if re-running (idempotent)
drop policy if exists "Public can read published pages" on pages;
drop policy if exists "Public can read published page blocks" on page_blocks;
drop policy if exists "Authenticated admins manage pages" on pages;
drop policy if exists "Authenticated admins manage page blocks" on page_blocks;

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

-- Atomic publish RPC: copy draft blocks → published, remapping parent_id correctly.
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
