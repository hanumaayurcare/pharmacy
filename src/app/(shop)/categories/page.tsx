import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export const revalidate = 3600;

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  products?: { id: string }[];
}

export default async function CategoriesPage() {
  const supabase = await createClient();

  // Fetch categories with product ids to count
  const { data: categories } = await supabase
    .from('categories')
    .select('*, products(id)');

  // Define some colors to cycle through for visual variety
  const colorSchemes = [
    { bg: 'bg-blue-50', text: 'text-blue-700' },
    { bg: 'bg-green-50', text: 'text-green-700' },
    { bg: 'bg-pink-50', text: 'text-pink-700' },
    { bg: 'bg-orange-50', text: 'text-orange-700' },
    { bg: 'bg-purple-50', text: 'text-purple-700' },
    { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Shop by Category</h1>
        <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">Find everything you need for your Ayurvedic lifestyle</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {((categories as unknown as Category[]) || []).map((cat: Category, index: number) => {
           const scheme = colorSchemes[index % colorSchemes.length];
           
           return (
            <Link 
              key={cat.id} 
              href={`/category/${cat.slug}`}
              className={`${scheme.bg} group p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-2 border border-white`}
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                {cat.icon || (
                   <span className="text-4xl font-black text-gray-300 uppercase">{cat.name.slice(0,2)}</span>
                )}
              </div>
              <h3 className={`text-xl font-black ${scheme.text} uppercase tracking-tight mb-2`}>{cat.name}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {cat.products ? `${cat.products.length} Products` : '0 Products'}
              </p>
              
              <div className="mt-8 flex items-center gap-2">
                <span className={`text-[10px] font-black ${scheme.text} uppercase tracking-widest`}>Explore All</span>
                <svg className={`w-4 h-4 ${scheme.text} group-hover:translate-x-1 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
