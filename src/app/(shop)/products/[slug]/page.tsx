import React from "react";
import { createClient } from "@/lib/supabase-server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ReviewSection } from "@/components/product/ReviewSection";
import { TrustBadges } from "@/components/product/TrustBadges";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { DoctorConsultationCTA } from "@/components/product/DoctorConsultationCTA";
import { StickyMobileCart } from "@/components/product/StickyMobileCart";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DeliveryEstimator } from "@/components/product/DeliveryEstimator";
import { StatutoryInfo } from "@/components/product/StatutoryInfo";

export const revalidate = 3600;

// Product Interface
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  old_price?: number;
  image_url?: string;
  is_new?: boolean;
  dosage_form?: string;
  // Detailed fields
  ingredients?: string[]; 
  benefits?: string[];
  usage_instructions?: string;
  regulatory_status?: string;
  shelf_life?: string;
  pack_size?: string; 
  key_differentiators?: string[];
  therapeutic_categories?: string[];
  b2b_availability?: boolean;
  description?: string; // fallback if needed
  faqs?: { question: string; answer: string; }[];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch product 
  let query = supabase.from('products').select('*');
  
  // Check if slug is a valid UUID
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  
  if (isUuid) {
     query = query.eq('id', slug);
  } else {
     query = query.eq('slug', slug);
  }

  const { data: rawProduct } = await query.single();

  if (!rawProduct) {
    notFound();
  }

  const product = rawProduct as Product;

  // Data normalization
  const ingredients = product.ingredients || [];
  const benefits = product.benefits || [];
  const differentiators = product.key_differentiators || [
     "Standardized Extracts", 
     "Heavy Metal Tested", 
     "GMP Certified Manufacturing"
  ]; // Fallback if empty to show the UI

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 bg-white pb-24">
      
      <Breadcrumbs items={[
          { label: "Products", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` }
      ]} />
      
      {/* 2-Column Grid on Mobile, 12-Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        
        {/* LEFT: IMAGES (lg:col-span-5) */}
        <div className="lg:col-span-5 relative">
           <div className="sticky top-24 space-y-4">
              <div className="bg-gray-50 rounded-3xl border border-gray-100 relative aspect-square flex items-center justify-center overflow-hidden p-8">
                {product.image_url ? (
                   <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-4 mix-blend-multiply hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                    <div className="text-gray-200 text-7xl">🌿</div>
                )}
                 {product.is_new && (
                     <span className="absolute top-4 left-4 bg-[#c2410c] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest z-10 shadow-sm">
                         New Launch
                     </span>
                 )}
              </div>
           </div>
        </div>

        {/* CENTER: DETAILS (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
           <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest bg-[#e6f4e6] px-2 py-1 rounded">
                     {product.dosage_form || "Ayurvedic Medicine"}
                 </span>
                 {product.regulatory_status && (
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 px-2 py-1 rounded">
                        {product.regulatory_status}
                    </span>
                 )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm">
                 <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                 <span className="text-gray-400 font-medium">Verified Quality</span>
              </div>
           </div>

           <div className="space-y-6 border-t border-gray-100 pt-6">
               <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-gray-900 tracking-tight">₹{product.price}</span>
                  {product.old_price && (
                      <span className="text-lg text-gray-400 line-through font-bold mb-1">₹{product.old_price}</span>
                  )}
                  {product.old_price && (
                      <span className="text-sm font-bold text-green-600 mb-2">
                          {Math.round(((product.old_price - product.price) / product.old_price) * 100)}% OFF
                      </span>
                  )}
               </div>
               
               <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                   {product.pack_size && (
                       <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                           <span className="text-gray-400 font-bold uppercase text-[10px]">Pack Size</span>
                           <span className="font-bold text-gray-900">{product.pack_size}</span>
                       </div>
                   )}
                   <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                       <span className="text-gray-400 font-bold uppercase text-[10px]">Shelf Life</span>
                       <span className="font-bold text-gray-900">{product.shelf_life || "3 Years"}</span>
                   </div>
               </div>

               <TrustBadges />
           </div>


           {/* Quick key benefits/differentiators */}
           <div className="pt-2">
               <h3 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-3">Key Differentiators</h3>
               <ul className="grid grid-cols-1 gap-2">
                   {differentiators.map((diff, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a27] flex-shrink-0"></span>
                           {diff}
                       </li>
                   ))}
               </ul>
           </div>
           
           {/* Tags */}
           <div className="flex flex-wrap gap-2">
                {product.therapeutic_categories?.map((cat) => (
                    <span key={cat} className="inline-block border border-gray-100 bg-gray-50 rounded-full px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                        {cat}
                    </span>
                ))}
           </div>


            <StatutoryInfo />
        </div>

        {/* RIGHT: BUY BOX (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-6">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-xl shadow-gray-200/40 bg-white sticky top-24">
                <div className="mb-6">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        In Stock & Ready to Ship
                    </span>
                </div>

                <div className="space-y-3 mb-6">
                    <AddToCartButton product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url || ""
                    }} className="w-full bg-[#2d5a27] hover:bg-[#1f3f1b] text-white rounded-xl py-3.5 text-sm font-bold shadow-lg shadow-[#2d5a27]/20 transition-all active:scale-95" />
                    
                    <button className="w-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-900 rounded-xl py-3.5 text-sm font-bold transition-all">
                        Buy Now
                    </button>
                </div>

                    <div className="flex items-center justify-between">
                        <span>Return Policy</span>
                        <span className="text-gray-900">Non-Returnable</span>
                    </div>


                <DeliveryEstimator />

                 {/* B2B Note */}
               <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                     <div className="flex items-center gap-2 mb-1">
                         <span className="text-lg">🏭</span>
                         <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Business / Bulk Order?</span>
                     </div>
                     <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                        Available for third-party / private label manufacturing.
                     </p>
                     <a href="/b2b-enquiry" className="text-[10px] font-bold text-[#c7511f] hover:underline uppercase tracking-widest">
                         Request Quote →
                     </a>
               </div>
            </div>

            <DoctorConsultationCTA />



        </div>
      </div>
      {/* DETAILED SECTIONS */}
      <div className="max-w-4xl mx-auto border-t border-gray-100 pt-16">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               
               {/* Composition */}
               <div className="space-y-6">
                   <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-6 bg-[#c7511f] rounded-full"></span>
                       Composition
                   </h2>
                   {ingredients.length > 0 ? (
                       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                           <table className="w-full text-left text-sm">
                               <thead className="bg-gray-50 text-gray-500 font-bold text-[10px] uppercase tracking-wider">
                                   <tr>
                                       <th className="px-6 py-3 border-b border-gray-100">Ingredient Name</th>
                                       <th className="px-6 py-3 border-b border-gray-100 text-right">Reference</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-gray-50">
                                   {ingredients.map((item, idx) => (
                                       <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                           <td className="px-6 py-3 font-medium text-gray-900">{item}</td>
                                           <td className="px-6 py-3 text-right text-gray-400 text-xs italic">API / Classical Text</td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                   ) : (
                       <p className="text-gray-500 text-sm italic">Please check product label for detailed composition.</p>
                   )}
               </div>

               {/* Indications & Benefits */}
               <div className="space-y-6">
                   <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-6 bg-[#2d5a27] rounded-full"></span>
                       Indications & Benefits
                   </h2>
                   <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                       <ul className="space-y-3">
                           {benefits.length > 0 ? benefits.map((benefit, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                                   <span className="text-[#2d5a27] text-lg leading-none">•</span>
                                   {benefit}
                               </li>
                           )) : (
                               <li className="text-gray-500 text-sm italic">General wellness support.</li>
                           )}
                       </ul>
                       
                       {product.usage_instructions && (
                           <div className="pt-4 mt-2 border-t border-gray-200">
                               <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Dosage / Usage</h4>
                               <p className="text-sm text-gray-600">{product.usage_instructions}</p>
                           </div>
                       )}
                   </div>
                   
                   <ProductFAQ items={product.faqs} />
               </div>
           </div>
      </div>

      <RelatedProducts 
        currentSlug={product.slug} 
        therapeuticCategories={product.therapeutic_categories} 
        dosageForm={product.dosage_form} 
      />
      
      <ReviewSection />
      
      <StickyMobileCart product={{
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url || '',
          old_price: product.old_price
      }} />

    </div>
  );
}
