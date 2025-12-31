"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.updateUser({
        password: password,
      });

      if (resetError) throw resetError;
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err) {
      const errorMsg = (err as Error).message || "Failed to reset password";
      setError(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-[#f0f7f0]">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl shadow-[#2d5a27]/10 border border-white text-center space-y-6">
          <div className="text-5xl">🛡️</div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Password Reset!</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
            Your password has been updated. Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-[#f0f7f0]">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[#2d5a27]/10 border border-white relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Set New Password</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Choose a secure password</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <input 
                required 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
