-- Migration: 001_initialize_public_schema.sql
-- Description: Sets up the public schema with profiles, contextual RBAC types, and membership tracking.

-- 1. Create Identity Types
DO $$ BEGIN
    CREATE TYPE public.context_type AS ENUM ('store', 'hospital', 'global');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM (
        'guest', 
        'user', 
        'sales_manager', 
        'content_admin', 
        'admin', 
        'super_admin', 
        'doctor', 
        'patient', 
        'customer'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name text,
    email text,
    avatar_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 3. Create Context Memberships Table (The Switchboard)
CREATE TABLE IF NOT EXISTS public.context_memberships (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    role public.user_role NOT NULL,
    context_type public.context_type NOT NULL,
    context_id text DEFAULT 'all', -- Specific store/hospital ID if multi-tenant
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, context_type, context_id, role)
);

-- Enable RLS on Context Memberships
ALTER TABLE public.context_memberships ENABLE ROW LEVEL SECURITY;

-- Only Admins or the user themself can view their memberships
CREATE POLICY "Users can view own memberships" ON public.context_memberships
    FOR SELECT USING (auth.uid() = user_id);

-- 4. Identity Sync Trigger
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default 'user' role in 'global' context
  INSERT INTO public.context_memberships (user_id, role, context_type)
  VALUES (new.id, 'user', 'global');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
