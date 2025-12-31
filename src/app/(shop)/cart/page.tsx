"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Your cart is empty</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Add some Ayurvedic wisdom to your life!</p>
        <Link 
          href="/" 
          className="inline-block bg-[#2d5a27] text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:-translate-y-1 transition-all active:scale-95"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none uppercase mb-12">
        Shopping Cart ({cartCount})
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-[2] space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 md:gap-8 bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm items-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-50 rounded-2xl p-2 relative shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
              </div>
              
              <div className="flex-1 space-y-1 md:space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xs md:text-lg font-black text-gray-900 uppercase tracking-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                  </button>
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">
                  {item.category}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#2d5a27] font-black"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-black text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#2d5a27] font-black"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm md:text-xl font-black text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="flex-1">
          <div className="bg-[#2d5a27] text-white p-8 rounded-[2.5rem] shadow-2xl shadow-[#2d5a27]/20 sticky top-32">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-white/10">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                <span>Shipping</span>
                <span className="text-yellow-400">FREE</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60 pt-4 border-t border-white/10">
                <span className="text-white">Estimated Total</span>
                <span className="text-xl font-black">₹{cartTotal}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="block w-full bg-white text-[#2d5a27] py-5 rounded-2xl text-center text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all active:scale-95"
            >
              Checkout Now
            </Link>
            
            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                <span className="text-lg">🛡️</span>
                Secure Checkout with 128-bit Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
