"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (authError) throw authError;
      
      router.push("/auth/verify-email");
    } catch (err) {
      const errorMsg = (err as Error).message || "Registration failed";
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
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Create Account</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Join the Ayurvedic circle</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                required 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
              />
            </div>

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
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
              />
            </div>

            <div className="flex items-start gap-3 px-1 py-2">
               <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-200 text-[#2d5a27] focus:ring-[#2d5a27]" />
               <p className="text-[9px] font-bold text-gray-400 leading-normal uppercase tracking-widest">
                  I agree to the <Link href="/terms" className="text-[#2d5a27] font-black hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#2d5a27] font-black hover:underline">Privacy Policy</Link>.
               </p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register Now"}
            </button>
          </form>

          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Already have an account? <Link href="/auth/login" className="text-[#2d5a27] font-black hover:underline px-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
