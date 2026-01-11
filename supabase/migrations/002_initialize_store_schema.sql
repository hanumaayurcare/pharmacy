-- Migration: 002_initialize_store_schema.sql
-- Description: Sets up the store schema for the Online Pharmacy domain.

-- 1. Create Schema
CREATE SCHEMA IF NOT EXISTS store;

-- 2. Products (Store specific extensions)
CREATE TABLE IF NOT EXISTS store.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    price decimal(12,2) NOT NULL,
    sku text UNIQUE,
    category text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Inventory
CREATE TABLE IF NOT EXISTS store.inventory (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id uuid REFERENCES store.products(id) ON DELETE CASCADE,
    quantity integer DEFAULT 0,
    low_stock_threshold integer DEFAULT 10,
    updated_at timestamptz DEFAULT now()
);

-- 4. Orders
CREATE TABLE IF NOT EXISTS store.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    total_amount decimal(12,2) NOT NULL,
    status text DEFAULT 'pending',
    shipping_address jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Order Items
CREATE TABLE IF NOT EXISTS store.order_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES store.orders(id) ON DELETE CASCADE,
    product_id uuid REFERENCES store.products(id),
    quantity integer NOT NULL,
    unit_price decimal(12,2) NOT NULL
);

-- --- RLS POLICIES ---

-- Products: Everyone can view active products
ALTER TABLE store.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active products" ON store.products
    FOR SELECT USING (is_active = true);

-- Orders: Users can only see their own orders
ALTER TABLE store.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON store.orders
    FOR SELECT USING (auth.uid() = user_id);

-- Order Items: Users can only see items from their own orders
ALTER TABLE store.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON store.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM store.orders 
            WHERE store.orders.id = store.order_items.order_id 
            AND store.orders.user_id = auth.uid()
        )
    );
