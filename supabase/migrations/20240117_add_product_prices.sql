-- Add visual and pricing fields to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS old_price numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT false;

-- Update existing products with some dummy data for development
UPDATE public.products 
SET 
  price = floor(random() * 500 + 100),
  old_price = floor(random() * 200 + 600),
  is_new = (CASE WHEN random() < 0.2 THEN true ELSE false END)
WHERE price = 0;
