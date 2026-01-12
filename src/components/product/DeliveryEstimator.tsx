"use client";

import React, { useState } from "react";
import { Truck, MapPin, CheckCircle2, XCircle } from "lucide-react";

export function DeliveryEstimator() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [deliveryDate, setDeliveryDate] = useState("");

  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      if (pincode.startsWith("5") || pincode.startsWith("1")) {
         // Valid Zones (Mock)
         const date = new Date();
         date.setDate(date.getDate() + 3);
         setDeliveryDate(date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
         setStatus("success");
      } else {
         setStatus("error");
      }
    }, 1500);
  };

  return (
    <div className="pt-4 mt-6 border-t border-gray-100">
       <div className="flex items-center gap-2 mb-3">
          <Truck className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Delivery Check</span>
       </div>
       
       <form onSubmit={checkDelivery} className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
             <MapPin className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="Enter Pincode" 
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-20 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2d5a27] focus:border-transparent outline-none transition-all"
          />
          <button 
             type="submit"
             disabled={pincode.length !== 6 || status === "loading"}
             className="absolute right-1 top-1 bottom-1 bg-white text-[#2d5a27] px-3 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-[#f0f7f0] disabled:opacity-50 disabled:hover:bg-white transition-colors"
          >
             {status === "loading" ? "..." : "Check"}
          </button>
       </form>

       {/* Status Messages */}
       <div className="mt-3 min-h-[20px]">
          {status === "success" && (
             <div className="flex items-center gap-2 text-xs font-bold text-green-700 animate-in slide-in-from-top-1 duration-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Get it by <span className="text-gray-900 border-b-2 border-green-200">{deliveryDate}</span></span>
             </div>
          )}
          {status === "error" && (
             <div className="flex items-center gap-2 text-xs font-bold text-red-600 animate-in slide-in-from-top-1 duration-200">
                <XCircle className="w-3.5 h-3.5" />
                <span>Sorry, we don&apos;t deliver to this pincode yet.</span>
             </div>
          )}
       </div>
    </div>
  );
}
