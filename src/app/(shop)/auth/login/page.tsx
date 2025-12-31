"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      router.push("/");
    } catch (err) {
      const errorMsg = (err as Error).message || "Failed to login";
      setError(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-[#f0f7f0]">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[#2d5a27]/10 border border-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2d5a27]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2d5a27]/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#2d5a27] rounded-xl flex items-center justify-center text-white font-black text-xl">H</div>
              <span className="font-black text-2xl text-[#2d5a27] tracking-tighter uppercase">Hanuma</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Welcome Back</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Login to your Ayurvedic portal</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
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
            
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <Link href="/auth/forgot-password" className="text-[9px] font-black text-[#2d5a27] uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Authenticating..." : "Login Now"}
            </button>
          </form>

          <div className="relative pt-4 text-center">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-4 bg-white relative z-10">Or continue with</span>
            <div className="absolute top-1/2 left-0 right-0 border-t border-gray-100 -translate-y-1/2"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl hover:bg-gray-50 transition-all group">
              <span className="text-lg group-hover:scale-110 transition-transform">G</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl hover:bg-gray-50 transition-all group">
              <span className="text-lg group-hover:scale-110 transition-transform">📱</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Phone</span>
            </button>
          </div>

          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Don&apos;t have an account? <Link href="/auth/register" className="text-[#2d5a27] font-black hover:underline px-1">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
