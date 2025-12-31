"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Your Ayurvedic journey has begun. Order ID: #HAN-99212</p>
        <Link 
          href="/" 
          className="inline-block bg-[#2d5a27] text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:-translate-y-1 transition-all active:scale-95"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Nothing to checkout</h1>
        <Link href="/" className="text-[#2d5a27] font-black uppercase tracking-widest text-[10px]">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none uppercase mb-12">
        Finalize Order
      </h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
        {/* Shipping Form */}
        <div className="flex-[2] space-y-10">
          <section className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-gray-800 flex items-center gap-3">
              <span className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs">1</span>
              Shipping Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Address</label>
                <textarea required rows={3} placeholder="Street Name, Building Number..." className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
                <input required type="text" placeholder="Hyderabad" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pincode</label>
                <input required type="text" placeholder="500001" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-gray-800 flex items-center gap-3">
              <span className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs">2</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-[#2d5a27] bg-[#f0f7f0] p-4 rounded-xl flex items-center gap-4 cursor-pointer">
                <div className="w-5 h-5 rounded-full border-4 border-[#2d5a27] bg-white"></div>
                <div>
                  <h4 className="text-xs font-black text-[#2d5a27] uppercase tracking-tight">Cash on Delivery</h4>
                  <p className="text-[10px] text-[#2d5a27]/60 font-medium">Pay when you receive</p>
                </div>
              </div>
              <div className="border border-gray-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-all opacity-50 grayscale">
                <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>
                <div>
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight">Card / UPI</h4>
                  <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Currently unavailable</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Review Side */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32">
            <h3 className="text-lg font-black uppercase tracking-tighter mb-6">Review Items</h3>
            <div className="max-h-60 overflow-y-auto no-scrollbar space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 shrink-0 relative">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[11px] font-black uppercase leading-tight line-clamp-1">{item.title}</h5>
                    <p className="text-[10px] font-bold text-gray-400">{item.quantity} x ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-50 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span className="text-gray-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
                <span className="text-sm font-black uppercase">Grand Total</span>
                <span className="text-xl font-black text-[#2d5a27]">₹{cartTotal}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
            >
              Place Order Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
