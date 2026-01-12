"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AddToCartButton } from "@/components/product/AddToCartButton";

interface StickyMobileCartProps {
    product: {
        id: string;
        name: string;
        price: number;
        image_url: string;
        old_price?: number;
    }
}

export function StickyMobileCart({ product }: StickyMobileCartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom duration-300">
       <div className="flex items-center gap-4">
           {/* Tiny Image & Info */}
           <div className="flex items-center gap-3 flex-1 overflow-hidden">
               <div className="w-10 h-10 relative shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    <Image src={product.image_url} alt={product.name} fill className="object-contain p-1" />
               </div>
               <div className="flex flex-col">
                   <h4 className="text-xs font-black text-gray-900 line-clamp-1">{product.name}</h4>
                   <div className="flex items-center gap-2">
                       <span className="text-sm font-bold text-[#2d5a27]">₹{product.price}</span>
                       {product.old_price && (
                           <span className="text-[10px] text-gray-400 line-through">₹{product.old_price}</span>
                       )}
                   </div>
               </div>
           </div>

           {/* Button */}
           <div className="w-1/2">
               <AddToCartButton 
                  product={product} 
                  className="w-full bg-[#2d5a27] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-[#2d5a27]/20"
               />
           </div>
       </div>
    </div>
  );
}
