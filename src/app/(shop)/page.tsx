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

  // Fetch Categories: Therapeutic (Shop by Concern)
  const { data: therapeuticCategories } = await supabase
    .from('categories')
    .select('*')
    .eq('type', 'therapeutic')
    .order('name');

  // Fetch Categories: Dosage (Shop by Medicine Type)
  const { data: dosageCategories } = await supabase
    .from('categories')
    .select('*')
    .eq('type', 'dosage')
    .order('name');

  // Fetch New Arrivals (Verified Genuine)
  const { data: newArrivals } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true)
    .limit(8);

  // Fetch Top Sellers (assuming is_bestseller exists, or fallback to any popular ones)
  const { data: topSellers } = await supabase
    .from('products')
    .select('*')
    .eq('is_bestseller', true) // Check if this field exists, otherwise we might need fallback
    .limit(8);
  
  // If no top sellers flagged, just grab some products
  const productsToShowAsTopSellers = (topSellers && topSellers.length > 0) ? topSellers : (await supabase.from('products').select('*').range(0, 3)).data;


  // Fetch Combo Packs (Category slug 'combo-packs' or similar)
  const { data: comboPacks } = await supabase
    .from('products') // Ideally query by category relation
    .select('*, categories!inner(*)')
    .eq('categories.slug', 'combo-packs')
    .limit(4);

  // Fallback for combos if category query is complex or empty
  const combosToDisplay = comboPacks || [];

  return (
    <div className="bg-white min-h-screen pb-10">
      <HeroSection />
      
      {/* Featured / Top Sellers */}
      {productsToShowAsTopSellers && productsToShowAsTopSellers.length > 0 && (
        <ProductRail 
          title="Top Sellers" 
          products={productsToShowAsTopSellers} 
          link="/products?sort=popularity"
        />
      )}

      {/* Shop Sections: Shop by Concern (Therapeutic) */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
           <h2 className="text-3xl font-serif font-medium text-[#1a3c1e] text-center">Shop by Health Concern</h2>
        </div>
        <CategoryGrid categories={therapeuticCategories || []} />
      </div>

       {/* Shop Sections: Shop by Medicine Type (Dosage) */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
           <h2 className="text-3xl font-serif font-medium text-[#1a3c1e] text-center">Shop by Medicine Type</h2>
        </div>
        <CategoryGrid categories={dosageCategories || []} />
      </div>


      {newArrivals && newArrivals.length > 0 && (
        <ProductRail 
          title="New Arrivals" 
          products={newArrivals} 
          link="/products?sort=new"
        />
      )}

      {/* Replaced InfoSection with something else or kept? Keeping for layout */}
      <InfoSection />

      {/* Combo Packs & Subscriptions */}
       {combosToDisplay && combosToDisplay.length > 0 && (
        <ProductRail 
          title="Combo Packs & Subscriptions" 
          products={combosToDisplay} 
          link="/category/combo-packs"
        />
      )}

      <TrustSection />

      {/* B2B Hybrid Note */}
      <section className="bg-[#f0f7f0] py-8 border-t border-[#e5e7eb] mt-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-[#1a3c1e] rounded-full flex items-center justify-center text-2xl">🏥</div>
                 <div>
                     <h4 className="font-bold text-[#1a3c1e] text-lg">Are you a Pharmacy or Distributor?</h4>
                     <p className="text-[#4b5563] text-sm">Get access to bulk pricing, GST invoices, and priority support.</p>
                 </div>
              </div>
              <a href="/b2b-enquiry" className="bg-[#1a3c1e] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#2d5a27] transition-all shadow-lg shadow-[#1a3c1e]/20">
                  Request Bulk Quote
              </a>
          </div>
      </section>
    </div>
  );
}
