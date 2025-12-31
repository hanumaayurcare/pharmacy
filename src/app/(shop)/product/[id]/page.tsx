"use client";

import React, { use } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 md:gap-20">
        {/* Product Image Section */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative aspect-square flex items-center justify-center group overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              className="object-contain p-10 group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <span className="bg-[#f0f7f0] text-[#2d5a27] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none uppercase">
              {product.title}
            </h1>
            <p className="text-gray-400 text-sm md:text-md font-bold uppercase tracking-widest leading-relaxed">
              Premium Ayurvedic health supplement for wellness
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-black text-gray-900">₹{product.price}</span>
            <span className="text-xl text-gray-400 line-through font-bold">₹{product.oldPrice}</span>
            <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-lg uppercase">
              20% Discount
            </span>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#2d5a27] text-white py-4 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
              >
                Add to Cart
              </button>
              <button className="flex-1 bg-white text-[#2d5a27] border-2 border-[#2d5a27] py-4 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:bg-[#f0f7f0] transition-all active:scale-95 cursor-pointer">
                Buy It Now
              </button>
            </div>
          </div>

          <div className="space-y-6 pt-8">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {product.benefits && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Key Benefits</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-700">
                      <span className="w-1.5 h-1.5 bg-[#2d5a27] rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Tabs Section (Simple Mock) */}
      <div className="mt-20 space-y-12">
        <div className="flex gap-10 border-b border-gray-100 pb-4">
          <button className="text-xs font-black uppercase tracking-widest text-[#2d5a27] border-b-2 border-[#2d5a27] pb-4">Usage & Dose</button>
          <button className="text-xs font-black uppercase tracking-widest text-gray-400 pb-4 hover:text-gray-600 transition-colors">Ingredients</button>
          <button className="text-xs font-black uppercase tracking-widest text-gray-400 pb-4 hover:text-gray-600 transition-colors">Reviews</button>
        </div>

        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">How to use</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              {product.usage || "Take 1-2 tablets daily with warm water or as directed by your physician. For best results, use consistently for 3 months."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <span className="text-2xl">🌿</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Purity</span>
                <span className="text-[11px] font-black text-gray-800 uppercase">100% Herbal</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <span className="text-2xl">⚡</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Extract</span>
                <span className="text-[11px] font-black text-gray-800 uppercase">High Potency</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <span className="text-2xl">🛡️</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Quality</span>
                <span className="text-[11px] font-black text-gray-800 uppercase">GMP Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
