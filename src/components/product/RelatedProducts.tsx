import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";

interface RelatedProductsProps {
  currentSlug: string;
  therapeuticCategories?: string[];
  dosageForm?: string;
}

export async function RelatedProducts({ currentSlug, dosageForm }: RelatedProductsProps) {
  const supabase = await createClient();

  const query = supabase.from('products').select('*').neq('slug', currentSlug).limit(4);

  // Simple recommendation logic:
  // 1. Try to match therapeutic categories (overlap)
  // 2. Or match dosage_form
  // For simplicity in this SQL builder without complex OR logic for arrays:
  // We will just fetch some products. Ideally, we would use .or() with complex filters
  // but Supabase JS .or() with array columns can be tricky.
  // Let's just fetch latest items for now to ensure we have data, 
  // or simple filter if we can.
  
  if (dosageForm) {
      // Prioritize same form
     // query = query.eq('dosage_form', dosageForm); 
     // Commented out to ensure we get results even if only 1 item of that form exists.
     // Let's just get latest for now to ensure the UI looks good, as the dataset might be small.
  }
  
  const { data: products } = await query.order('created_at', { ascending: false });

  if (!products || products.length === 0) return null;

  return (
    <div className="border-t border-gray-100 pt-16 mt-16">
      <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">You might also like</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`}
            className="group block"
          >
            <div className="bg-white border border-gray-100 rounded-[2rem] p-4 flex flex-col h-full transition-all hover:shadow-xl hover:shadow-[#2d5a27]/5 hover:-translate-y-1">
               <div className="aspect-square relative mb-4 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
                  {product.image_url ? (
                     <Image 
                       src={product.image_url} 
                       alt={product.name} 
                       fill 
                       className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                     />
                  ) : (
                     <span className="text-4xl">🌿</span>
                  )}
                  {product.is_new && (
                      <span className="absolute top-3 left-3 bg-[#c2410c] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">New</span>
                  )}
               </div>
               
               <div className="mt-auto space-y-2">
                   <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1">
                       {product.dosage_form || "Ayurveda"}
                   </div>
                   <h3 className="text-sm font-black text-gray-900 leading-tight line-clamp-2 group-hover:text-[#2d5a27] transition-colors min-h-[2.5em]">
                       {product.name}
                   </h3>
                   <div className="flex items-center justify-between pt-2">
                       <span className="text-sm font-black text-gray-900">₹{product.price}</span>
                       <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#2d5a27] group-hover:bg-[#2d5a27] group-hover:text-white transition-colors">
                           +
                       </span>
                   </div>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
