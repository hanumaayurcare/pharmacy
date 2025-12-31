"use client";

import React from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-[#f0f7f0]">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[#2d5a27]/10 border border-white relative overflow-hidden text-center">
        <div className="relative z-10 space-y-8">
          <div className="w-20 h-20 bg-[#f0f7f0] rounded-full flex items-center justify-center text-3xl mx-auto border border-[#2d5a27]/10">
            ✉️
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Check your Email</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
              We&apos;ve sent a verification link to your email address. Please click the link to activate your account.
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer">
              Resend Link
            </button>
            <Link 
              href="/auth/login" 
              className="block w-full bg-white text-gray-500 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border border-gray-100 hover:bg-gray-50 transition-all font-medium"
            >
              Back to Login
            </Link>
          </div>

          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
            Can&apos;t find it? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
