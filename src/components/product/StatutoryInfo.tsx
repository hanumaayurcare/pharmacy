"use client";

import React, { useState } from "react";
import { ChevronDown, Scale } from "lucide-react";

export function StatutoryInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden mt-8">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
       >
          <div className="flex items-center gap-2">
             <Scale className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Statutory & Manufacturer Info</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
       </button>
       
       <div 
         className={`transition-all duration-300 ease-in-out overflow-hidden ${
           isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
         }`}
       >
          <div className="p-5 border-t border-gray-100 space-y-4 text-[11px] text-gray-500 leading-relaxed bg-white">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <h5 className="font-bold text-gray-900 mb-1">Manufactured By:</h5>
                    <p>Hanuma Ayurcare Pvt Ltd.<br/>Plot No. 42, Green Pharma Zone,<br/>Hyderabad, Telangana - 500037</p>
                 </div>
                 <div>
                    <h5 className="font-bold text-gray-900 mb-1">Country of Origin:</h5>
                    <p>India 🇮🇳</p>
                 </div>
                 <div>
                    <h5 className="font-bold text-gray-900 mb-1">Customer Care:</h5>
                    <p>contact@hanumaayurcare.com<br/>+91 98765 43210</p>
                 </div>
             </div>
             
             <div className="pt-3 border-t border-gray-50 mt-2">
                <h5 className="font-bold text-gray-900 mb-1">Disclaimer:</h5>
                <p className="italic text-gray-400">
                    The information provided here is not intended to be a substitute for professional medical advice. 
                    Please do not use this information to self-diagnose or treat your problem without consulting a doctor.
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
