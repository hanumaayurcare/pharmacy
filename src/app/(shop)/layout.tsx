"use client";

import React from "react";
import Link from "next/link";
import { CartProvider, useCart } from "@/context/cart-context";

function CartIcon() {
  const { cartCount } = useCart();
  return (
    <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-xl transition-all group">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-[#d42c2c] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">{cartCount}</span>
      )}
    </Link>
  );
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="shop-layout min-h-screen bg-[#f3f7f3]">
        {/* Sticky Header - 3 Tiers */}
        <header className="sticky top-0 z-50 bg-white shadow-md">
          {/* Tier 1: Utility Bar */}
          <div className="border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between gap-4 md:gap-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d5a27] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">H</div>
                <span className="font-black text-xl md:text-2xl text-[#2d5a27] tracking-tighter hidden sm:block uppercase">Hanuma</span>
              </Link>
              
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer hover:bg-white hover:shadow-sm transition-all shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div className="flex flex-col text-[10px] leading-tight">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Deliver at</span>
                  <span className="text-[#2d5a27] font-black">Hyderabad 500001</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className="flex-1 max-w-2xl relative group">
              <input
                type="text"
                placeholder="Search medicines, wellness, brands..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-12 focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] transition-all outline-none font-medium text-sm"
              />
              <svg className="absolute left-4 top-[0.75rem] text-gray-400 group-focus-within:text-[#2d5a27] transition-colors" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <button className="absolute right-3 top-1.5 bg-[#2d5a27] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider hidden sm:block">Search</button>
            </div>

            <div className="flex items-center gap-2 md:gap-5 shrink-0">
              <CartIcon />
              <Link href="/auth/login" className="hidden lg:flex items-center gap-3 bg-[#2d5a27] text-white px-5 py-2 rounded-xl hover:bg-[#1f3f1b] transition-all shadow-md group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="text-xs font-black uppercase tracking-widest">Login / Sign Up</span>
              </Link>
              <Link href="/auth/login" className="lg:hidden p-2 hover:bg-gray-50 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </Link>
            </div>
          </div>

          {/* Tier 2: Navigation Bar (Desktop Only) */}
          <div className="hidden lg:block border-b border-gray-50 px-8 py-2 max-w-7xl mx-auto">
            <nav className="flex items-center gap-10">
              {['Pharmacy', 'Consult Doctors', 'Book Lab Tests', 'Ayurveda', 'Circle Help', 'Health Blogs'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-[#2d5a27] transition-all">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tier 3: Category Scroller - Now on all devices */}
          <div className="border-b border-gray-50 px-4 md:px-8 py-2.5 bg-white">
            <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
              {['Vitamins', 'Baby Care', 'Personal Care', 'Health Devices', 'Sexual Wellness', 'Immunity', 'Ayurveda', 'Homeopathy'].map((chip) => (
                <Link 
                  key={chip} 
                  href={`/categories/${chip.toLowerCase().replace(' ', '-')}`} 
                  className="px-4 py-1.5 rounded-full border border-gray-100 bg-gray-50 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-[#2d5a27] hover:text-white hover:border-[#2d5a27] transition-all whitespace-nowrap"
                >
                  {chip}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto overflow-x-hidden">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around md:hidden z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          {[
            { label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22 9 12 15 12 15 22', href: '/', active: true },
            { label: 'Medicines', icon: 'M2 12h20 M12 2v20', href: '/medicines' },
            { label: 'Lab Tests', icon: 'M22 12h-4l-3 9L9 3l-3 9H2', href: '/health-services' },
            { label: 'Account', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', href: '/profile' }
          ].map((item) => (
            <Link key={item.label} href={item.href} className={`flex flex-col items-center justify-center gap-1 transition-all ${item.active ? 'text-[#2d5a27]' : 'text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}></path></svg>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          ))}
        </nav>

        <footer className="bg-white border-t border-gray-200 pt-16 pb-12 hidden md:block mt-12">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-sm text-gray-500 font-medium">
            <div className="lg:col-span-2 space-y-6 pr-12">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#2d5a27] rounded-xl flex items-center justify-center text-white font-black text-xl">H</div>
                <span className="font-black text-2xl text-[#2d5a27] tracking-tighter">HANUMA</span>
              </Link>
              <p className="leading-relaxed">
                India&apos;s most trusted Ayurvedic destination. We bring you authentic herbal remedies, expert consultations, and seamless diagnostic services at your fingertips.
              </p>
              <div className="flex gap-4">
                {['FB', 'IG', 'LI', 'YT'].map(s => <div key={s} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black border border-gray-100 hover:bg-[#2d5a27] hover:text-white transition-all cursor-pointer">{s}</div>)}
              </div>
            </div>
            
            <div>
              <h4 className="text-[#2d5a27] font-black text-xs uppercase tracking-[0.2em] mb-8">Services</h4>
              <ul className="space-y-4 text-xs">
                <li>Order Medicines</li>
                <li>Book Lab Tests</li>
                <li>Doctor Consultation</li>
                <li>Ayurveda Consult</li>
                <li>Personal Care</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#2d5a27] font-black text-xs uppercase tracking-[0.2em] mb-8">About</h4>
              <ul className="space-y-4 text-xs">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Health Blog</li>
                <li>Careers</li>
                <li>Sitemap</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#2d5a27] font-black text-xs uppercase tracking-[0.2em] mb-8">Support</h4>
              <ul className="space-y-4 text-xs">
                <li>Track Order</li>
                <li>Policies</li>
                <li>Refunds</li>
                <li>FAQs</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>&copy; 2024 Hanuma Ayurveda Ltd. All rights reserved.</span>
            <div className="flex gap-10">
              <span>Genuine Quality</span>
              <span>Secure Data</span>
              <span>Fast Shipping</span>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
