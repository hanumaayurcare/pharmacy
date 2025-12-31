import React from "react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">System Settings</h1>

      <div className="space-y-8">
        <section className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm space-y-6">
           <h3 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2d5a27] rounded-full"></span> Store Profile
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Store Name</label>
                 <input type="text" defaultValue="Hanuma Ayurveda Official" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Support Email</label>
                 <input type="email" defaultValue="care@hanuma.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none" />
              </div>
           </div>
        </section>

        <section className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm space-y-6">
           <h3 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span> Notification Settings
           </h3>
           <div className="space-y-4">
              {[
                 'Email on customer order',
                 'Low stock alerts',
                 'New user registration alert',
                 'Financial settlement reports'
              ].map(opt => (
                 <div key={opt} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="text-xs font-bold text-gray-700">{opt}</span>
                    <div className="w-10 h-5 bg-[#2d5a27] rounded-full relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        <div className="flex justify-end gap-4">
           <button className="px-6 py-3 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-gray-100 transition-all">Discard Changes</button>
           <button className="px-8 py-3 bg-[#2d5a27] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#2d5a27]/20 hover:-translate-y-1 transition-all">Save Configuration</button>
        </div>
      </div>
    </div>
  );
}
