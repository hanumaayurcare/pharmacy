import React from "react";
import { createClient } from "@/lib/supabase-server";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch product with category and health solution data if possible
  // For now just fetching raw product data
  const { data: product } = await supabase
    .from('products')
    .select('*, category:category_id(name), health_solution:health_solution_id(name)')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  // Parse composition if it's a string (though it should be jsonb from DB)
  let composition = [];
  try {
      if (typeof product.composition === 'string') {
          composition = JSON.parse(product.composition);
      } else {
          composition = product.composition || [];
      }
  } catch (e) {
      console.error("Error parsing composition", e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 bg-white">
      <div className="flex flex-col lg:flex-row gap-12 md:gap-20">
        {/* Product Image Section */}
        <div className="flex-1">
          <div className="bg-[#f9fafb] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 relative aspect-square flex items-center justify-center group overflow-hidden">
            {product.image_url ? (
               <Image 
                src={product.image_url} 
                alt={product.name} 
                fill 
                className="object-contain p-10 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
              />
            ) : (
                <div className="text-gray-300 text-6xl">🌿</div>
            )}
             {product.is_new && (
                 <span className="absolute top-6 left-6 bg-[#d4a373] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                     New Arrival
                 </span>
             )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {product.category?.name && (
                    <span className="bg-[#f0f7f0] text-[#2d5a27] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    {product.category.name}
                    </span>
                )}
                 {product.health_solution?.name && (
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    {product.health_solution.name}
                    </span>
                )}
            </div>
           
            <h1 className="text-3xl md:text-5xl font-serif font-medium text-[#1a3c1e] leading-[1.1]">
              {product.name}
            </h1>
            {product.description && (
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
                {product.description}
                </p>
            )}
          </div>

          <div className="flex items-end gap-4 border-b border-gray-100 pb-8">
            <div className="space-y-1">
                 <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Price</span>
                <div className="flex items-center gap-3">
                    <span className="text-3xl md:text-4xl font-bold text-[#1a3c1e]">₹{product.price}</span>
                    {product.old_price > product.price && (
                        <span className="text-xl text-gray-400 line-through">₹{product.old_price}</span>
                    )}
                </div>
            </div>
             {product.pack_size && (
                <div className="ml-auto space-y-1 text-right">
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pack Size</span>
                     <p className="text-sm font-bold text-[#1a3c1e]">{product.pack_size}</p>
                </div>
             )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             {/* Add to Cart Logic would go here */}
            <button 
              className="flex-1 bg-[#1a3c1e] text-white py-4 md:py-5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#2d5a27] hover:-translate-y-1 transition-all active:scale-95"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-white text-[#1a3c1e] border border-[#1a3c1e] py-4 md:py-5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#f9fafb] transition-all active:scale-95">
              Buy Now
            </button>
          </div>
          
          {product.key_differentiators && product.key_differentiators.length > 0 && (
             <div className="grid grid-cols-2 gap-4 pt-4">
                 {product.key_differentiators.map((diff: string, i: number) => (
                     <div key={i} className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#f0f7f0] flex items-center justify-center text-[#2d5a27]">✓</div>
                         <span className="text-xs font-bold text-gray-600">{diff}</span>
                     </div>
                 ))}
             </div>
          )}
          
           {product.b2b_availability && (
               <div className="bg-[#fefce8] border border-yellow-100 p-4 rounded-xl flex items-start gap-3">
                   <div className="text-yellow-600 text-lg">⚠️</div>
                   <div>
                       <h5 className="text-xs font-black text-yellow-700 uppercase tracking-wide">Business Enquiry</h5>
                       <p className="text-xs text-yellow-600 mt-0.5">{product.b2b_note || "Available for bulk orders & private labeling."}</p>
                   </div>
               </div>
           )}

        </div>
      </div>

      {/* Details Tabs Section - Expanded */}
      <div className="mt-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             {/* Column 1: Ingredients & Composition */}
             <div className="space-y-8">
                 <h3 className="text-2xl font-serif font-medium text-[#1a3c1e]">Composition</h3>
                 {composition && composition.length > 0 ? (
                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#f9fafb] text-gray-500 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Ingredient</th>
                                    <th className="px-6 py-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {composition.map((item: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-medium text-gray-700">{item.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 ) : (
                     <p className="text-gray-500 italic">Ingredient details available on product packaging.</p>
                 )}
                 
                 {product.shelf_life && (
                     <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                         <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Shelf Life</span>
                         <span className="text-[#1a3c1e] font-bold">{product.shelf_life}</span>
                     </div>
                 )}
             </div>
             
             {/* Column 2: Benefits & Indications */}
             <div className="space-y-8">
                 <h3 className="text-2xl font-serif font-medium text-[#1a3c1e]">Indications & Benefits</h3>
                 
                 {product.indications && product.indications.length > 0 && (
                     <div className="space-y-4">
                        <h4 className="text-xs font-black text-[#d4a373] uppercase tracking-widest">Indications</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.indications.map((ind: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
                                    {ind}
                                </span>
                            ))}
                        </div>
                     </div>
                 )}
                 
                 <div className="space-y-4">
                     <h4 className="text-xs font-black text-[#d4a373] uppercase tracking-widest">Key Benefits</h4>
                     <ul className="space-y-3">
                         {(product.benefits || []).map((benefit: string, i: number) => (
                             <li key={i} className="flex items-start gap-3">
                                 <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#1a3c1e] shrink-0"></span>
                                 <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                             </li>
                         ))}
                         {(!product.benefits || product.benefits.length === 0) && (
                             <li className="text-gray-500 italic text-sm">See packaging for full list of benefits.</li>
                         )}
                     </ul>
                 </div>
                 
                 {product.regulatory_status && (
                     <div className="pt-8 border-t border-gray-100">
                         <span className="inline-block px-3 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                             {product.regulatory_status}
                         </span>
                     </div>
                 )}
             </div>
         </div>
      </div>
    </div>
  );
}
