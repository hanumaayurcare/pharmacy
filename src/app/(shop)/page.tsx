"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// --- Sub-components ---

const SectionHeader = ({ title, link }: { title: string; link?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg md:text-xl font-black text-gray-800 tracking-tight uppercase">{title}</h2>
    {link && (
      <Link href={link} className="text-[10px] font-black text-[#2d5a27] bg-[#f0f7f0] px-3 py-1 rounded-full uppercase tracking-widest hover:bg-[#2d5a27] hover:text-white transition-all">
        View All
      </Link>
    )}
  </div>
);

const ServiceCard = ({ title, sub, icon, bg, textColor, link }: { title: string; sub: string; icon: string; bg: string; textColor: string; link: string }) => (
  <Link href={link} className={`${bg} group p-5 rounded-2xl flex items-center justify-between overflow-hidden relative transition-all hover:shadow-xl hover:-translate-y-1 h-full min-h-[120px]`}>
    <div className="relative z-10 flex-1">
      <h3 className={`text-sm md:text-base font-black ${textColor} mb-1 uppercase tracking-tight leading-tight`}>{title}</h3>
      <p className={`text-[10px] md:text-xs font-bold ${textColor} opacity-70 mb-3 line-clamp-2`}>{sub}</p>
      <div className="flex items-center gap-2">
        <span className={`text-[9px] font-black ${textColor} uppercase tracking-[0.2em]`}>Explore</span>
        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
    <div className="text-5xl md:text-6xl opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500 relative z-10 ml-4 shrink-0">
      {icon}
    </div>
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
  </Link>
);


const HealthConcernIcon = ({ name, image }: { name: string; image: string }) => (
  <Link href={`/solutions/${name.toLowerCase().replace(' ', '-')}`} className="flex flex-col items-center gap-3 group">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-100 rounded-2xl md:rounded-3xl flex items-center justify-center p-3 md:p-4 group-hover:border-[#2d5a27] group-hover:shadow-xl group-hover:shadow-[#2d5a27]/5 transition-all">
      <div className="relative w-full h-full">
        <Image src={image} alt={name} fill className="object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
    </div>
    <span className="text-[10px] md:text-xs font-bold text-gray-500 text-center leading-tight group-hover:text-gray-900 transition-colors uppercase tracking-tight">{name}</span>
  </Link>
);

interface Product {
  title: string;
  price: number;
  oldPrice: number;
  image: string;
  isNew?: boolean;
}

const ApolloProductCard = ({ product }: { product: Product }) => (
  <div className="group bg-white border border-gray-100 rounded-xl p-3 md:p-4 w-40 md:w-56 shrink-0 flex flex-col transition-all hover:shadow-xl hover:shadow-[#2d5a27]/5">
    {product.isNew && (
      <div className="self-start bg-orange-100 text-orange-600 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2">New Launch</div>
    )}
    <div className="relative aspect-square mb-4 bg-gray-50/50 rounded-lg overflow-hidden flex items-center justify-center">
      <Image src={product.image} alt={product.title} width={150} height={150} className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
    </div>
    <h3 className="text-xs font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-[#2d5a27] transition-colors uppercase tracking-tight">{product.title}</h3>
    <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-tighter">60 Tablets per Bottle</p>
    
    <div className="mt-auto">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm md:text-base font-black text-gray-900">₹{product.price}</span>
        <span className="text-[10px] md:text-xs text-gray-400 line-through font-bold">₹{product.oldPrice}</span>
        <span className="text-[8px] md:text-[10px] text-green-600 font-black">20% OFF</span>
      </div>
      <button className="w-full bg-[#2d5a27] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md shadow-[#2d5a27]/10 hover:bg-[#1f3f1b] transition-all active:scale-95">
        Add to Cart
      </button>
    </div>
  </div>
);

// --- Main Page ---

export default function ShopHomePage() {
  const products = [
    { title: 'Ashwagandha Gold', price: 499, oldPrice: 599, image: '/images/product-placeholder.png', isNew: true },
    { title: 'Brahmi Memory', price: 349, oldPrice: 449, image: '/images/product-placeholder.png' },
    { title: 'Tulsi Drops', price: 199, oldPrice: 249, image: '/images/product-placeholder.png' },
    { title: 'Neem Purifier', price: 299, oldPrice: 399, image: '/images/product-placeholder.png' },
    { title: 'Saffron Serum', price: 899, oldPrice: 1299, image: '/images/product-placeholder.png' },
  ];

  const concerns = [
    { name: 'Diabetes', image: '/images/sol-diabetes.png' },
    { name: 'Cold & Cough', image: '/images/sol-cold-cough.png' },
    { name: 'Heart Care', image: '/images/sol-heart-care.png' },
    { name: 'Immunity', image: '/images/cat-immunity.png' },
    { name: 'Personal Care', image: '/images/cat-personal-care.png' },
    { name: 'Baby Care', image: '/images/cat-baby-care.png' },
  ];

  return (
    <div className="flex flex-col gap-10 md:gap-16 pb-20 px-4 md:px-8 mt-6">
      
      {/* Hero Section Container */}
      <section className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[380px]">
        {/* Main Carousel (Mockup) */}
        <div className="flex-1 h-[250px] md:h-full bg-[#e8f5e9] rounded-[2rem] overflow-hidden relative group shadow-2xl shadow-[#2d5a27]/5 border border-white/50">
          <Image src="/images/hero-banner-1.png" alt="Ayurvedic Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a27]/20 via-transparent to-transparent"></div>
          <div className="absolute left-10 md:left-16 top-1/2 -translate-y-1/2 max-w-md space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl font-black text-[#2d5a27] leading-tight filter drop-shadow-md">
              Nature&apos;s Wisdom <br/>at Your Doorstep
            </h1>
            <p className="text-sm md:text-lg font-bold text-[#2d5a27]/80">Up to 30% Off on all Ayurvedic essentials.</p>
            <button className="bg-[#2d5a27] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:-translate-y-1 transition-all active:scale-95">Shop Now</button>
          </div>
          {/* Carousel indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="w-8 h-1 bg-[#2d5a27] rounded-full"></div>
            <div className="w-2 h-1 bg-[#2d5a27]/20 rounded-full"></div>
            <div className="w-2 h-1 bg-[#2d5a27]/20 rounded-full"></div>
          </div>
        </div>

        {/* Side Banner (Desktop Only) */}
        <div className="hidden lg:flex flex-col gap-4 w-[380px]">
          <div className="flex-1 bg-blue-50 rounded-[2rem] overflow-hidden relative group shadow-lg border border-white">
             <Image src="/images/hero-banner-2.png" alt="Lab Test" fill className="object-cover group-hover:scale-110 transition-transform duration-[3s]" />
             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-xl font-black mb-1">FREE Home Sample</h3>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Lab Tests starting @ ₹199</p>
             </div>
          </div>
          <div className="h-[140px] bg-orange-50 rounded-[2rem] overflow-hidden p-6 border border-white shadow-lg flex items-center justify-between group cursor-pointer">
             <div className="space-y-1">
                <h4 className="text-orange-900 text-lg font-black uppercase tracking-tight">Rapid Rx</h4>
                <p className="text-orange-900/60 text-[10px] font-bold">Upload prescription & get medicines in 1 hour.</p>
             </div>
             <div className="text-5xl group-hover:rotate-12 transition-transform">📄</div>
          </div>
        </div>
      </section>

      {/* Quick Services Carousel (Mobile sliding / Desktop Grid) */}
      <section className="overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-full pb-4 md:pb-0">
          <div className="min-w-[280px] md:min-w-0 flex-1">
            <ServiceCard 
              title="Pharmacy Store" sub="Order 100% Genuine Medicines" icon="💊" 
              bg="bg-[#e8f5e9]" textColor="text-[#2d5a27]" link="/medicines" 
            />
          </div>
          <div className="min-w-[280px] md:min-w-0 flex-1">
            <ServiceCard 
              title="Doctor Consult" sub="Professional Health Advice" icon="👨‍⚕️" 
              bg="bg-blue-50" textColor="text-blue-700" link="/doctor-consult" 
            />
          </div>
          <div className="min-w-[280px] md:min-w-0 flex-1">
            <ServiceCard 
              title="Lab Tests" sub="Diagnostics @ Home" icon="🧪" 
              bg="bg-purple-50" textColor="text-purple-700" link="/lab-tests" 
            />
          </div>
          <div className="min-w-[280px] md:min-w-0 flex-1">
            <ServiceCard 
              title="Health Blogs" sub="Learn & Stay Healthy" icon="📰" 
              bg="bg-pink-50" textColor="text-pink-700" link="/blog" 
            />
          </div>
        </div>
      </section>


      {/* Shop by Concern Section */}
      <section>
        <SectionHeader title="Shop by Health Concerns" link="/concerns" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 py-2">
          {concerns.map((concern, i) => (
            <HealthConcernIcon key={i} name={concern.name} image={concern.image} />
          ))}
        </div>
      </section>

      {/* Product Scroller: Best Sellers */}
      <section>
        <SectionHeader title="Best Sellers" link="/categories" />
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-10 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {products.map((p, i) => (
            <ApolloProductCard key={i} product={p} />
          ))}
        </div>
      </section>

      {/* Mid-Page Promo Banner */}
      <section className="bg-gradient-to-r from-teal-900 to-emerald-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 text-center md:text-left space-y-4">
          <span className="bg-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em]">Special Invitation</span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Join Hanuma Circle & <br/>Save Flat 15% Extra</h2>
          <p className="text-white/60 text-sm md:text-lg font-bold">Unlock exclusive benefits, priority delivery & rewards points.</p>
        </div>
        <button className="relative z-10 bg-white text-teal-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all active:scale-95">Become a Member</button>
      </section>

      {/* Product Scroller: Ayurveda Specials */}
      <section>
        <SectionHeader title="Ayurveda Special Selection" link="/ayurveda" />
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-10 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {[...products].reverse().map((p, i) => (
            <ApolloProductCard key={i} product={p} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-10 border-t border-gray-100">
        {[
          { label: 'Verified Genuine', sub: '100% Authentic Products', icon: '✅' },
          { label: 'Secure Payments', sub: 'Safe & Encrypted', icon: '🛡️' },
          { label: 'Express Delivery', sub: 'Within 24-48 Hours', icon: '🚚' },
          { label: 'Expert Help', sub: 'Consult Certified Doctors', icon: '💬' },
        ].map((bad, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm border border-gray-100">
              {bad.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-black text-gray-800 uppercase tracking-tight leading-tight">{bad.label}</span>
              <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{bad.sub}</span>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
