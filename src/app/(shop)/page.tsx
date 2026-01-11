import React from "react";
import { createClient } from "@/lib/supabase-server";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductRail } from "@/components/home/ProductRail";
import { InfoSection } from "@/components/home/InfoSection";
import { TrustSection } from "@/components/home/TrustSection";

export const revalidate = 3600; // revalidate every hour

export default async function ShopHomePage() {
  const supabase = await createClient();

  // Fetch Categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  // Fetch New Arrivals
  const { data: newArrivals } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true)
    .limit(8);

  // Fetch Ayurveda Specials (just another mix for now)
  const { data: specials } = await supabase
    .from('products')
    .select('*')
    .limit(8);

  return (
    <div className="bg-white min-h-screen pb-10">
      <HeroSection />
      
      <CategoryGrid categories={categories || []} />
      
      {newArrivals && newArrivals.length > 0 && (
        <ProductRail 
          title="New Arrivals" 
          products={newArrivals} 
          link="/products?sort=new"
        />
      )}

      <InfoSection />

      {specials && specials.length > 0 && (
        <ProductRail 
          title="Ayurveda Specials" 
          products={specials} 
          link="/products"
        />
      )}

      <TrustSection />
    </div>
  );
}
