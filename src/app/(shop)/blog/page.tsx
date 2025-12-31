"use client";

import React from "react";
import Image from "next/image";

export default function BlogPage() {
  const posts = [
    {
      title: '5 Ayurvedic Herbs to Boost Your Immunity This Winter',
      excerpt: 'Discover the ancient wisdom of Ashwagandha, Tulsi, and more to stay healthy during the cold season.',
      author: 'Dr. Anjali Verma',
      date: 'Oct 24, 2024',
      category: 'Wellness',
      image: '/images/hero-banner-1.png'
    },
    {
      title: 'The Art of Mindful Eating: Ayurvedic Perspectives',
      excerpt: 'How you eat is as important as what you eat. Learn the principles of mindful digestion.',
      author: 'Budda Seshu',
      date: 'Oct 20, 2024',
      category: 'Lifestyle',
      image: '/images/hero-banner-2.png'
    },
    {
      title: 'Natural Remedies for Stress and Anxiety',
      excerpt: 'Simple daily rituals and herbal supplements that can help calm your nervous system.',
      author: 'Dr. Rajesh Kumar',
      date: 'Oct 15, 2024',
      category: 'Mental Health',
      image: '/images/cat-immunity.png'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Hanuma Wellness Blog</h1>
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">Ancient wisdom for the modern world</p>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Wellness', 'Ayurveda', 'Mental Health', 'Nutrition'].map(tag => (
            <button key={tag} className="shrink-0 px-4 py-2 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-[#2d5a27] hover:text-[#2d5a27] transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <article key={i} className="group cursor-pointer">
            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-xl shadow-gray-200/50">
               <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-[#2d5a27] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                     {post.category}
                  </span>
               </div>
            </div>
            <div className="space-y-3">
               <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>By {post.author}</span>
               </div>
               <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#2d5a27] transition-colors line-clamp-2">
                  {post.title}
               </h3>
               <p className="text-gray-500 text-xs font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
               </p>
               <div className="pt-4 flex items-center gap-2">
                  <span className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest">Read Story</span>
                  <svg className="w-3 h-3 text-[#2d5a27] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
               </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
