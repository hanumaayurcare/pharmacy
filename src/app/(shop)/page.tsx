import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ShopHomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar for Mobile */}
      <div className="px-4 mt-4 md:hidden">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search medicines, wellness..." 
            className="w-full bg-white border border-[#e0f0e0] rounded-xl py-3 px-12 shadow-sm focus:ring-2 focus:ring-[#2d5a27] transition-all"
          />
          <svg className="absolute left-4 top-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Quick Services Carousel */}
      <section className="px-4">
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-2">
          {['Doctor Consult', 'Upload Rx', 'Lab Tests', 'Insurance', 'Credits'].map((service, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2 w-20">
              <div className="w-14 h-14 bg-white border border-[#e0f0e0] rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-xl">
                  {i === 0 ? '👨‍⚕️' : i === 1 ? '📄' : i === 2 ? '🧪' : i === 3 ? '🛡️' : '💰'}
                </span>
              </div>
              <span className="text-[10px] font-medium text-center text-gray-700 leading-tight">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Strip */}
      <section className="px-4">
        <div className="bg-[#fff4e5] border border-[#ffe0b2] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-[#e65100]">BOGO!</span>
            <span className="text-[#bf360c]">Buy 1 Get 1 on Immunity Boosters</span>
          </div>
          <button className="text-xs font-bold text-[#bf360c] underline">SEE LIST</button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4">
        <h2 className="text-lg font-bold mb-4 text-[#2d5a27]">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['Immunity', 'Personal Care', 'Baby Care', 'Ayurvedic', 'Health Devices', 'Vitamins', 'Sexual Wellness', 'Heart Care'].map((cat, i) => (
            <Link href={`/category/${cat.toLowerCase().replace(' ', '-')}`} key={i} className="bg-white border border-[#e0f0e0] rounded-2xl p-4 flex flex-col items-center gap-3 transition-transform hover:scale-[1.02] shadow-sm">
              <div className="w-12 h-12 bg-[#f0f7f0] rounded-full flex items-center justify-center">
                <span className="text-lg">📦</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products Carousel */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2d5a27]">Best Sellers</h2>
          <Link href="/categories" className="text-xs font-bold text-[#2d5a27]">VIEW ALL</Link>
        </div>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4">
          {[1, 2, 3, 4].map((p) => (
            <div key={p} className="flex-shrink-0 w-44 bg-white border border-[#e0f0e0] rounded-2xl p-3 shadow-sm">
              <div className="aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                <Image src="/images/product-placeholder.png" alt="Product" width={150} height={150} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xs font-bold text-gray-800 line-clamp-1">Ashwagandha Gold Capsules</h3>
              <p className="text-[10px] text-gray-500 mb-2">Bottle of 60 Capsules</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold">₹499</span>
                  <span className="text-[10px] text-gray-400 line-through ml-1">₹599</span>
                </div>
                <button className="bg-[#2d5a27] text-white p-1.5 rounded-lg shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-4 py-6 bg-white border-y border-[#e0f0e0] grid grid-cols-2 gap-y-6 gap-x-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-[#f0f7f0] rounded-full flex-shrink-0 flex items-center justify-center">🛡️</div>
          <div>
            <h4 className="text-xs font-bold">100% Genuine</h4>
            <p className="text-[10px] text-gray-500">Sourced directly from brands</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-[#f0f7f0] rounded-full flex-shrink-0 flex items-center justify-center">🚚</div>
          <div>
            <h4 className="text-xs font-bold">Fast Delivery</h4>
            <p className="text-[10px] text-gray-500">Same day in select cities</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-[#f0f7f0] rounded-full flex-shrink-0 flex items-center justify-center">👨‍⚕️</div>
          <div>
            <h4 className="text-xs font-bold">Free Consult</h4>
            <p className="text-[10px] text-gray-500">Talk to our experts</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-[#f0f7f0] rounded-full flex-shrink-0 flex items-center justify-center">🔗</div>
          <div>
            <h4 className="text-xs font-bold">Large Network</h4>
            <p className="text-[10px] text-gray-500">Across 100+ locations</p>
          </div>
        </div>
      </section>
    </div>
  );
}
