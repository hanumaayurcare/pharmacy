"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Search, ChevronDown, Filter, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price?: number;
  image_url?: string;
  category?: string;
  is_new?: boolean;
  slug: string;
}

interface ProductsClientProps {
  initialProducts: Product[];
  dosageCategories: string[];
  therapeuticCategories: string[];
  searchParams: {
    search?: string;
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export function ProductsClient({ 
  initialProducts, 
  dosageCategories,
  therapeuticCategories,
  searchParams 
}: ProductsClientProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [localSearch, setLocalSearch] = useState(searchParams.search || "");
  const [localSort, setLocalSort] = useState(searchParams.sort || "default");
  
  // Update state when URL params change
  useEffect(() => {
    // Only update if external params are different from local state to avoid loops
    if ((searchParams.search || "") !== localSearch) {
      setLocalSearch(searchParams.search || "");
    }
    if ((searchParams.sort || "default") !== localSort) {
      setLocalSort(searchParams.sort || "default");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateURL = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(params);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    startTransition(() => {
      router.push(`?${newParams.toString()}`, { scroll: false });
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: localSearch });
  };

  const clearFilters = () => {
    setLocalSearch("");
    setLocalSort("default");
    startTransition(() => {
      router.push("/products");
    });
  };

  const isActiveCategory = (cat: string) => searchParams.category === cat;

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative items-start">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden w-full mb-4">
        <button 
           onClick={() => setShowMobileFilters(!showMobileFilters)}
           className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm"
        >
           <span className="flex items-center gap-2">
             <Filter className="w-4 h-4" /> Filters
           </span>
           <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* SIDEBAR FILTERS (Desktop & Mobile) */}
      <aside className={`
          lg:w-64 flex-shrink-0 bg-white lg:bg-transparent
          ${showMobileFilters ? 'block' : 'hidden'} lg:block
      `}>
          <div className="sticky top-24 space-y-8">
             
             {/* Search Widget */}
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Search</h3>
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          value={localSearch}
                          onChange={(e) => setLocalSearch(e.target.value)}
                          className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#2d5a27]"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                    </div>
                </form>
             </div>

             {/* Categories Widget */}
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Filters</h3>
                  {(searchParams.category || searchParams.search) && (
                      <button onClick={clearFilters} className="text-[10px] text-red-500 font-bold hover:underline">RESET</button>
                  )}
                </div>

                <div className="space-y-6">
                    {/* Dosage Categories */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Dosage Form</h4>
                        <div className="space-y-2">
                            {dosageCategories.map(cat => (
                                <button
                                   key={cat}
                                   onClick={() => updateURL({ category: isActiveCategory(cat) ? 'all' : cat })}
                                   className={`w-full flex items-center justify-between text-sm py-1.5 px-2 rounded-md transition-colors ${isActiveCategory(cat) ? 'bg-[#f0fdf4] text-[#166534] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                   <span>{cat}</span>
                                   {isActiveCategory(cat) && <Check className="w-3.5 h-3.5" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    {/* Therapeutic Categories */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Therapeutic Use</h4>
                        <div className="space-y-2">
                            {therapeuticCategories.map(cat => (
                                <button
                                   key={cat}
                                   onClick={() => updateURL({ category: isActiveCategory(cat) ? 'all' : cat })}
                                   className={`w-full flex items-center justify-between text-sm py-1.5 px-2 rounded-md transition-colors ${isActiveCategory(cat) ? 'bg-[#f0fdf4] text-[#166534] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                   <span>{cat}</span>
                                   {isActiveCategory(cat) && <Check className="w-3.5 h-3.5" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
             <div className="text-sm text-gray-500">
                Found <span className="font-bold text-gray-900">{initialProducts.length}</span> items
             </div>
             
             <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                <select
                  value={localSort}
                  onChange={(e) => {
                    setLocalSort(e.target.value);
                    updateURL({ sort: e.target.value });
                  }}
                  className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#2d5a27] cursor-pointer"
                >
                    <option value="default">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                </select>
             </div>
          </div>

          {/* Loading Overlay */}
          {isPending && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-start justify-center pt-20">
                <div className="bg-white p-4 rounded-full shadow-xl">
                    <div className="animate-spin w-6 h-6 border-2 border-gray-200 border-t-[#2d5a27] rounded-full"></div>
                </div>
            </div>
          )}

          {/* Products Grid */}
          {initialProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 dashed">
               <div className="text-4xl mb-4">🔍</div>
               <h3 className="text-lg font-bold text-gray-900">No products match your criteria</h3>
               <button onClick={clearFilters} className="mt-4 text-[#2d5a27] font-medium hover:underline">Clear all filters</button>
            </div>
          ) : (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {initialProducts.map((product) => (
                    <div key={product.id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col relative">
                        {/* Image Area */}
                        <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] bg-gray-50 overflow-hidden">
                            {product.is_new && (
                                <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">NEW</span>
                            )}
                            {product.image_url ? (
                                <Image 
                                  src={product.image_url} 
                                  alt={product.name}
                                  fill
                                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">🌿</div>
                            )}
                            
                            {/* Hover Quick Action - Desktop */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden lg:block bg-gradient-to-t from-white/90 to-transparent pt-10">
                                <AddToCartButton 
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image_url: product.image_url || ""
                                    }} 
                                    className="w-full bg-[#2d5a27] hover:bg-[#234520] text-white rounded-lg py-2 text-sm font-medium shadow-lg"
                                />
                            </div>
                        </Link>

                        {/* Content Area */}
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="mb-auto">
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 line-clamp-1">
                                    {product.category || "Ayurveda"}
                                </div>
                                <Link href={`/products/${product.slug}`}>
                                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#2d5a27] transition-colors min-h-[2.5em]">
                                        {product.name}
                                    </h3>
                                </Link>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 line-through">
                                        {product.old_price ? `₹${product.old_price}` : ''}
                                    </span>
                                    <span className="text-lg font-bold text-gray-900">
                                        ₹{product.price}
                                    </span>
                                </div>
                                {/* Mobile Add Button */}
                                <div className="lg:hidden">
                                     <AddToCartButton 
                                        product={{
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image_url: product.image_url || ""
                                        }}
                                        className="bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-gray-200" 
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          )}
      </div>
    </div>
  );
}