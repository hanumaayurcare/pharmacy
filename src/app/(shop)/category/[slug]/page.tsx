"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/cart-context";

export default function CategoryDetailedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Filter products by category (case-insensitive match)
  const categoryProducts = PRODUCTS.filter(p => 
    p.category.toLowerCase() === categoryName.toLowerCase() ||
    (categoryName.toLowerCase() === 'ayurveda specials' && p.category.toLowerCase() === 'vitamins') // Mock mapping
  );

  const { addToCart } = useCart();

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
           <select className="bg-white border border-gray-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm focus:ring-2 focus:ring-[#2d5a27]/10 transition-all">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
           </select>
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {categoryProducts.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-50 rounded-[2.5rem] p-6 flex flex-col transition-all hover:shadow-2xl hover:shadow-[#2d5a27]/5 hover:-translate-y-2 relative overflow-hidden">
               {product.isNew && (
                  <div className="absolute top-6 left-6 bg-orange-100 text-orange-600 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">New Launch</div>
               )}
               <Link href={`/product/${product.id}`} className="relative aspect-square mb-6 bg-gray-50/30 rounded-3xl overflow-hidden flex items-center justify-center">
                  <Image src={product.image} alt={product.title} width={200} height={200} className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
               </Link>
               <div className="space-y-2 mb-6">
                  <h3 className="text-xs md:text-sm font-black text-gray-800 line-clamp-2 uppercase tracking-tight group-hover:text-[#2d5a27] transition-colors">{product.title}</h3>
                  <div className="flex items-center gap-3">
                     <span className="text-sm md:text-lg font-black text-gray-900">₹{product.price}</span>
                     <span className="text-[10px] md:text-xs text-gray-400 line-through font-bold">₹{product.oldPrice}</span>
                  </div>
               </div>
               <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#2d5a27] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] transition-all active:scale-95 cursor-pointer mt-auto"
               >
                  Add to Cart
               </button>
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
