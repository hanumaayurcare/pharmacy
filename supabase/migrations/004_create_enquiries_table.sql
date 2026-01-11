-- Create a type for enquiry status if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enquiry_status') THEN
        CREATE TYPE public.enquiry_status AS ENUM ('new', 'read', 'responded');
    END IF;
END $$;

-- Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status public.enquiry_status DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Anyone can insert an enquiry (Anonymous access)
CREATE POLICY "Anyone can submit an enquiry" 
ON public.enquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 2. Only authenticated admins/super_admins can read enquiries
-- Note: We use the context_memberships logic here if needed, 
-- but for now, let's allow all authenticated users with 'admin' roles in 'global' context
CREATE POLICY "Admins can view enquiries" 
ON public.enquiries 
FOR SELECT 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.context_memberships 
        WHERE user_id = auth.uid() 
        AND role IN ('admin', 'super_admin')
    )
);

-- 3. Admins can update enquiries
CREATE POLICY "Admins can update enquiries" 
ON public.enquiries 
FOR UPDATE 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.context_memberships 
        WHERE user_id = auth.uid() 
        AND role IN ('admin', 'super_admin')
    )
);
