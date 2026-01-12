import React from "react";
import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";

export function DoctorConsultationCTA() {
  return (
    <div className="bg-[#f0f7f0] rounded-2xl p-6 border border-[#2d5a27]/10 relative overflow-hidden mt-6">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-[#2d5a27]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

       <div className="relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm text-[#2d5a27]">
             <Stethoscope className="w-5 h-5" />
          </div>
          
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">
             Confused about dosage?
          </h3>
          
          <p className="text-xs text-gray-600 mb-6 leading-relaxed">
             Get personalized advice from our expert Ayurvedic Vaidyas. Pure guidance, 100% free.
          </p>
          
          <Link 
            href="/consultation"
            className="flex items-center justify-center gap-2 w-full bg-[#2d5a27] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] transition-all group"
          >
             Talk to an Expert
             <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-wider mt-3">
             Response within 24 Hours
          </div>
       </div>
    </div>
  );
}
