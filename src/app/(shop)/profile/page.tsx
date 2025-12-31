"use client";

import React from "react";

export default function UserProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Avatar and Info */}
          <div className="w-full md:w-72 flex flex-col items-center text-center space-y-6">
            <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-[#2d5a27] to-emerald-900 flex items-center justify-center text-5xl text-white shadow-2xl relative">
               BS
               <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-2xl shadow-xl flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-all border border-gray-100">📸</div>
            </div>
            <div>
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Budda Seshu</h2>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Prime Member since 2024</p>
            </div>
            <div className="w-full pt-6 border-t border-gray-100 space-y-2">
               {['Account Details', 'Saved Methods', 'Subscriptions', 'Privacy Settings'].map(opt => (
                  <button key={opt} className="w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-[#f0f7f0] hover:text-[#2d5a27] transition-all">
                     {opt}
                  </button>
               ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 bg-white rounded-[3rem] p-8 md:p-12 border border-gray-50 shadow-2xl shadow-gray-100/50 space-y-10">
            <div className="space-y-4">
               <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Personal Information</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                     <input type="text" defaultValue="Budda Seshu" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                     <input type="email" defaultValue="buddaseshu@gmail.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Phone</label>
                     <input type="text" defaultValue="+91 98765 43210" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Delivery Defaults</h3>
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Address</label>
                  <textarea rows={3} defaultValue="12-34/A, Heritage Enclave, Madhapur, Hyderabad - 500081" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" />
               </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
               <button className="px-8 py-4 bg-[#2d5a27] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#2d5a27]/20 hover:-translate-y-1 transition-all">Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
