import React from "react";

export default function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Financial Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm space-y-6">
           <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Revenue Growth</h3>
           <div className="h-48 w-full bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 font-black italic">
              [ Revenue Chart Placeholder ]
           </div>
           <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gross Profit</p>
                 <h4 className="text-xl font-black text-[#2d5a27]">₹2,14,500</h4>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Net Revenue</p>
                 <h4 className="text-xl font-black text-gray-900">₹4,25,000</h4>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#2d5a27] text-white p-8 rounded-[2rem] shadow-xl shadow-[#2d5a27]/20">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Available Balance</p>
              <h2 className="text-4xl font-black mb-6 tracking-tight">₹14,50,000</h2>
              <button className="w-full bg-white text-[#2d5a27] py-3 rounded-xl text-xs font-black uppercase tracking-widest">Withdraw Funds</button>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-4">Recent Settlements</h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                       <span className="text-xs font-bold text-gray-600">Settlement #{i+1024}</span>
                       <span className="text-xs font-black text-gray-900">₹45,000</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
