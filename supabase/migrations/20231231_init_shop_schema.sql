-- Create the shop schema
CREATE SCHEMA IF NOT EXISTS shop;

-- Grant usage to public and authenticated roles
GRANT USAGE ON SCHEMA shop TO anon, authenticated;

--------------------------------------------------------------------------------
-- 1. Categories
--------------------------------------------------------------------------------
CREATE TABLE shop.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT, -- URL or icon name
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 2. Health & Wellness Solutions
--------------------------------------------------------------------------------
CREATE TABLE shop.health_solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 3. Products
--------------------------------------------------------------------------------
CREATE TABLE shop.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discounted_price DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    image_url TEXT,
    category_id UUID REFERENCES shop.categories(id),
    health_solution_id UUID REFERENCES shop.health_solutions(id),
    is_new BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 4. Quick Services
--------------------------------------------------------------------------------
CREATE TABLE shop.quick_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT,
    service_url TEXT,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 5. Promotions & Deals
--------------------------------------------------------------------------------
CREATE TABLE shop.promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    type TEXT NOT NULL, -- 'banner', 'strip', 'popup'
    image_url TEXT,
    link_url TEXT,
    priority INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 6. Prescriptions
--------------------------------------------------------------------------------
CREATE TABLE shop.prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 7. Orders
--------------------------------------------------------------------------------
CREATE TABLE shop.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status TEXT DEFAULT 'unpaid', -- 'unpaid', 'paid', 'failed', 'refunded'
    payment_method TEXT,
    delivery_address JSONB,
    delivery_estimate TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 8. Order Items
--------------------------------------------------------------------------------
CREATE TABLE shop.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES shop.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES shop.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- Row Level Security (RLS)
--------------------------------------------------------------------------------

-- Enable RLS
ALTER TABLE shop.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.health_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.quick_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop.order_items ENABLE ROW LEVEL SECURITY;

-- Public Access (Read-only)
CREATE POLICY "Allow public read access for categories" ON shop.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access for health_solutions" ON shop.health_solutions FOR SELECT USING (true);
CREATE POLICY "Allow public read access for products" ON shop.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access for quick_services" ON shop.quick_services FOR SELECT USING (true);
CREATE POLICY "Allow public read access for promotions" ON shop.promotions FOR SELECT USING (true);

-- Authenticated User Access (Prescriptions)
CREATE POLICY "Users can view their own prescriptions" ON shop.prescriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can upload their own prescriptions" ON shop.prescriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Authenticated User Access (Orders)
CREATE POLICY "Users can view their own orders" ON shop.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON shop.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own order items" ON shop.order_items FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM shop.orders WHERE id = shop.order_items.order_id AND user_id = auth.uid())
);

--------------------------------------------------------------------------------
-- Helper functions for updated_at
--------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION shop.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER set_updated_at_categories BEFORE UPDATE ON shop.categories FOR EACH ROW EXECUTE FUNCTION shop.handle_updated_at();
CREATE TRIGGER set_updated_at_health_solutions BEFORE UPDATE ON shop.health_solutions FOR EACH ROW EXECUTE FUNCTION shop.handle_updated_at();
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON shop.products FOR EACH ROW EXECUTE FUNCTION shop.handle_updated_at();
CREATE TRIGGER set_updated_at_prescriptions BEFORE UPDATE ON shop.prescriptions FOR EACH ROW EXECUTE FUNCTION shop.handle_updated_at();
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON shop.orders FOR EACH ROW EXECUTE FUNCTION shop.handle_updated_at();
