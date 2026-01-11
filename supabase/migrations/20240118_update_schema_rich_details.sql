-- Add new fields for rich product details
ALTER TABLE shop.products
ADD COLUMN IF NOT EXISTS composition JSONB DEFAULT '[]'::jsonb, -- Array of ingredients with amounts
ADD COLUMN IF NOT EXISTS indications TEXT[] DEFAULT '{}', -- Array of indications
ADD COLUMN IF NOT EXISTS benefits TEXT[] DEFAULT '{}', -- Array of benefits (merging with existing if needed, or replacing)
ADD COLUMN IF NOT EXISTS pack_size TEXT,
ADD COLUMN IF NOT EXISTS shelf_life TEXT,
ADD COLUMN IF NOT EXISTS key_differentiators TEXT[] DEFAULT '{}', -- e.g. ["Standardized Extracts", "Heavy Metal Tested"]
ADD COLUMN IF NOT EXISTS regulatory_status TEXT, -- e.g. "Ayurvedic Proprietary Medicine"
ADD COLUMN IF NOT EXISTS b2b_availability BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS b2b_note TEXT;

-- Update existing products with some default dummy data for these new fields
UPDATE shop.products
SET 
  composition = '[{"name": "Ashwagandha", "amount": "500mg"}, {"name": "Excipients", "amount": "Q.S."}]'::jsonb,
  indications = ARRAY['Stress', 'Anxiety', 'General Weakness'],
  pack_size = '60 Tablets',
  shelf_life = '3 Years',
  key_differentiators = ARRAY['GMP Certified', 'Heavy Metal Tested', '100% Herbal'],
  regulatory_status = 'Ayurvedic Proprietary Medicine',
  b2b_availability = TRUE,
  b2b_note = 'Available for third-party / private label'
WHERE composition = '[]'::jsonb;
