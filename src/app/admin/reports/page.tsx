import React from "react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Analytics & Reports</h1>
        <button className="bg-[#2d5a27]/10 text-[#2d5a27] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#2d5a27] hover:text-white transition-all">
          Generate Monthly Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Customer Retention</h3>
              <span className="text-xs font-black text-green-600">↑ 14.5%</span>
           </div>
           <div className="h-40 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 font-black text-[10px] uppercase tracking-widest italic">
              [ Retention Cohort Chart ]
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Conversion Funnel</h3>
              <span className="text-xs font-black text-[#2d5a27]">3.2% AVG</span>
           </div>
           <div className="space-y-4">
              {[
                 { label: 'Visits', val: '124,500', w: 'w-full' },
                 { label: 'Add to Cart', val: '4,800', w: 'w-[40%]' },
                 { label: 'Purchased', val: '1,500', w: 'w-[15%]' }
              ].map(stat => (
                 <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                       <span>{stat.label}</span>
                       <span className="text-gray-800">{stat.val}</span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                       <div className={`h-full bg-[#2d5a27] ${stat.w}`}></div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
