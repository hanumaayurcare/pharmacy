
-- Create leads table
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text,
  last_name text,
  email text,
  enquiry_type text,
  message text,
  status text default 'new' -- 'new', 'contacted', 'closed'
);

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- Create policies (drop if exist first to avoid errors)
drop policy if exists "Enable insert for everyone" on public.leads;
create policy "Enable insert for everyone" on public.leads for insert with check (true);

drop policy if exists "Enable read access for authenticated users only" on public.leads;
create policy "Enable read access for authenticated users only" on public.leads for select using (auth.role() = 'authenticated');
