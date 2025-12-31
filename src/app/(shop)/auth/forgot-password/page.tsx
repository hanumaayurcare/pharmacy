"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      const errorMsg = (err as Error).message || "Failed to send reset link";
      setError(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-[#f0f7f0]">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl shadow-[#2d5a27]/10 border border-white text-center space-y-6">
          <div className="text-5xl">📩</div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Check your inbox</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
            We&apos;ve sent a password reset link to <span className="text-[#2d5a27]">{email}</span>.
          </p>
          <Link href="/auth/login" className="block w-full bg-[#2d5a27] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-[#f0f7f0]">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[#2d5a27]/10 border border-white relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Recover Password</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">We&apos;ll send a link to your email</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Remembered your password? <Link href="/auth/login" className="text-[#2d5a27] font-black hover:underline px-1">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
