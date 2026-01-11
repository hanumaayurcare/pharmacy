
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique,
  type text not null, -- 'dosage' or 'therapeutic'
  description text, -- Short description
  details text, -- Full markdown content
  icon text
);

-- Enable RLS
alter table public.categories enable row level security;

-- Allow public read access
create policy "Public categories are viewable by everyone."
  on public.categories for select
  using ( true );

-- Allow authenticated (admin) write access
create policy "Admins can insert categories"
  on public.categories for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update categories"
  on public.categories for update
  using ( auth.role() = 'authenticated' );
