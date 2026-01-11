
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique,
  dosage_form text not null, -- e.g., 'Asava & Arishta'
  therapeutic_categories text[] not null, -- e.g., ['Digestion & Gut']
  description text,
  image_url text,
  benefits text[],
  ingredients text[],
  usage_instructions text,
  is_active boolean default true
);

-- Enable RLS
alter table public.products enable row level security;

-- Allow public read access
create policy "Public products are viewable by everyone."
  on public.products for select
  using ( is_active = true );

-- Allow authenticated (admin) write access (optional, for future admin panel)
create policy "Admins can insert products"
  on public.products for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update products"
  on public.products for update
  using ( auth.role() = 'authenticated' );
