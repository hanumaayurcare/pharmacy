"use client";

import React from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    { name: 'Vitamins', icon: '💊', count: '124 Products', bg: 'bg-blue-50', text: 'text-blue-700' },
    { name: 'Immunity', icon: '🛡️', count: '85 Products', bg: 'bg-green-50', text: 'text-green-700' },
    { name: 'Personal Care', icon: '🧴', count: '210 Products', bg: 'bg-pink-50', text: 'text-pink-700' },
    { name: 'Baby Care', icon: '👶', count: '64 Products', bg: 'bg-orange-50', text: 'text-orange-700' },
    { name: 'Health Devices', icon: '⌚', count: '42 Products', bg: 'bg-purple-50', text: 'text-purple-700' },
    { name: 'Ayurveda Specials', icon: '🌿', count: '156 Products', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Shop by Category</h1>
        <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">Find everything you need for your Ayurvedic lifestyle</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={`/category/${cat.name.toLowerCase().replace(' ', '-')}`}
            className={`${cat.bg} group p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-2 border border-white`}
          >
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
              {cat.icon}
            </div>
            <h3 className={`text-xl font-black ${cat.text} uppercase tracking-tight mb-2`}>{cat.name}</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.count}</p>
            
            <div className="mt-8 flex items-center gap-2">
              <span className={`text-[10px] font-black ${cat.text} uppercase tracking-widest`}>Explore All</span>
              <svg className={`w-4 h-4 ${cat.text} group-hover:translate-x-1 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
