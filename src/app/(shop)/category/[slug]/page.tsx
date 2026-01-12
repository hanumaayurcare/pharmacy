import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";
import { AddToCartButton } from "@/components/product/AddToCartButton";

export const revalidate = 3600;

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  old_price: number;
  image_url: string | null;
  is_new: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'dosage' | 'therapeutic';
  description?: string;
}

export default async function CategoryDetailedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch category details first (without join, as FK might be missing)
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
    
  const category = data as Category | null;

  const categoryName = category ? category.name : slug.replace('-', ' ');
  let categoryProducts: Product[] = [];

  if (category) {
      let query = supabase.from('products').select('*');
      
      if (category.type === 'dosage') {
          // Attempt to match dosage_form. 
          // Handle specific mismatch "Asava and Arishta" vs "Asava & Arishta"
          // We search for the name, or if name has " and ", try "&"
          const namePart = category.name.replace(' and ', ' & ');
          query = query.ilike('dosage_form', `%${namePart}%`); 
          // Note: using ilike with % is broad but handles '&' vs 'and' variants reasonably well for this dataset.
          // Ideally we used exact match or a relation.
      } else if (category.type === 'therapeutic') {
           // Match array: therapeutic_categories contains [category.name]
           // We need to pass it as a postgres array string: {"Name"}
           query = query.contains('therapeutic_categories', [category.name]);
      } else {
         // Fallback or other types?
         // Try generic match on columns if unsure
         query = query.or(`dosage_form.eq.${category.name},therapeutic_categories.cs.{${category.name}}`);
      }

      const { data: products } = await query;
      categoryProducts = (products as Product[]) || [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-[#2d5a27]">{categoryName}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">{categoryName}</h1>
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">Showing {categoryProducts.length} results</p>
        </div>
        
        <div className="flex gap-4">
           {/* Sorting capabilities can be added here with query params re-fetching */}
           <div className="bg-white border border-gray-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm text-gray-400 cursor-not-allowed">
              Sort by: Featured
           </div>
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {categoryProducts.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-50 rounded-[2.5rem] p-6 flex flex-col transition-all hover:shadow-2xl hover:shadow-[#2d5a27]/5 hover:-translate-y-2 relative overflow-hidden">
               {product.is_new && (
                  <div className="absolute top-6 left-6 bg-orange-100 text-orange-600 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">New Launch</div>
               )}
               <Link href={`/products/${product.slug}`} className="relative aspect-square mb-6 bg-gray-50/30 rounded-3xl overflow-hidden flex items-center justify-center">
                  {product.image_url ? (
                     <Image src={product.image_url} alt={product.name} width={200} height={200} className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
                  ) : (
                     <div className="text-4xl">🌿</div>
                  )}
               </Link>
               <div className="space-y-2 mb-6">
                  <h3 className="text-xs md:text-sm font-black text-gray-800 line-clamp-2 uppercase tracking-tight group-hover:text-[#2d5a27] transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-3">
                     <span className="text-sm md:text-lg font-black text-gray-900">₹{product.price}</span>
                     {product.old_price > product.price && (
                        <span className="text-[10px] md:text-xs text-gray-400 line-through font-bold">₹{product.old_price}</span>
                     )}
                  </div>
               </div>
               
               <AddToCartButton product={{
                   id: product.id,
                   name: product.name,
                   price: product.price,
                   image_url: product.image_url || '',
                   category: { name: categoryName }
               }} />

            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-6">
           <div className="text-6xl">🍃</div>
           <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">No products found in this category</h2>
           <Link href="/categories" className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest hover:underline">Explore other categories</Link>
        </div>
      )}
    </div>
  );
}
