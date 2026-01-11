"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

function CartIcon() {
  const { cartCount } = useCart();
  return (
    <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-xl transition-all group">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f3f4f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-[#d4a373] text-[#1a3c1e] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1a3c1e] shadow-xl border-b border-[#2d5a27]">
      {/* Top Utility Bar */}
      <div className="bg-[#142e17] px-4 md:px-8 py-2 border-b border-[#2d5a27]/50 text-xs font-medium text-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <span className="hidden sm:inline">Call us: +91 98765 43210</span>
             <div className="w-1 h-3 bg-gray-600 hidden sm:block"></div>
             <span>Support: care@hanuma.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/store-locator" className="hover:text-[#d4a373] transition-colors">Store Locator</Link>
            <Link href="/track-order" className="hover:text-[#d4a373] transition-colors">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 md:px-8 py-4 max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-[#d4a373] rounded-lg flex items-center justify-center text-[#1a3c1e] font-black text-2xl shadow-lg">H</div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl md:text-2xl text-[#f3f4f6] tracking-wide leading-none uppercase">Hanuma</span>
            <span className="text-[9px] text-[#d4a373] font-bold tracking-[0.3em] uppercase">Ayurveda</span>
          </div>
        </Link>
        
        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-xl relative group">
          <input
            type="text"
            placeholder="Search for medicines, concerns..."
            className="w-full bg-[#2d5a27]/30 border border-[#d4a373]/20 rounded-full py-2.5 px-12 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#d4a373]/50 focus:bg-[#2d5a27]/50 focus:border-[#d4a373] transition-all outline-none font-medium text-sm"
          />
          <svg className="absolute left-4 top-[0.75rem] text-[#d4a373]/70" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-right">
             <div className="flex flex-col">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Welcome</span>
               <Link href="/auth/login" className="text-sm font-bold text-[#d4a373] hover:text-white transition-colors">Login / Sign Up</Link>
             </div>
          </div>
          
          <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>
          
          <CartIcon />
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden lg:block border-t border-[#2d5a27]/50 bg-[#163319]">
        <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between text-sm font-medium text-gray-300 h-12">
          <div className="flex items-center gap-8">
            {['Shop All', 'Consult Vaidya', 'Dosha Quiz', 'Blog'].map((item) => (
               <Link 
                 key={item} 
                 href={`/${item.toLowerCase().replace(' ', '-')}`}
                 className="hover:text-[#d4a373] transition-colors uppercase tracking-wider text-xs font-bold"
               >
                 {item}
               </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
             <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest">Trending:</span>
             <Link href="/category/immunity" className="hover:text-white transition-colors text-xs">Immunity</Link>
             <Link href="/category/hair-care" className="hover:text-white transition-colors text-xs">Hair Care</Link>
             <Link href="/category/diabetes" className="hover:text-white transition-colors text-xs">Diabetes</Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1a3c1e] border-t border-[#2d5a27] p-4 absolute w-full shadow-2xl">
          <div className="mb-4">
             <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#2d5a27]/50 border border-[#d4a373]/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 outline-none"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            {['Shop All', 'Consult Vaidya', 'Dosha Quiz', 'Blog', 'Login'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-200 hover:text-[#d4a373] font-bold border-b border-[#2d5a27] pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
