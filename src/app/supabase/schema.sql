-- Rota Doc: one row per account holding the whole route.
-- Run this in the Supabase SQL editor of the project whose keys are set in
-- VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.

create table if not exists public.route_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  film jsonb not null default '{}'::jsonb,
  package jsonb not null default '{}'::jsonb,
  rights jsonb not null default '{}'::jsonb,
  submissions jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.route_state enable row level security;

-- Row Level Security is what keeps one filmmaker's route out of another's
-- browser: the anon key can only ever touch rows whose user_id is the caller.
drop policy if exists "route_state_select_own" on public.route_state;
create policy "route_state_select_own"
  on public.route_state for select
  using (auth.uid() = user_id);

drop policy if exists "route_state_insert_own" on public.route_state;
create policy "route_state_insert_own"
  on public.route_state for insert
  with check (auth.uid() = user_id);

drop policy if exists "route_state_update_own" on public.route_state;
create policy "route_state_update_own"
  on public.route_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "route_state_delete_own" on public.route_state;
create policy "route_state_delete_own"
  on public.route_state for delete
  using (auth.uid() = user_id);
