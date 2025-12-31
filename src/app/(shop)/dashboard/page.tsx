"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CustomerDashboard() {
  const [userName, setUserName] = useState("User");
  const [orders] = useState([
    { id: '#HAN-1021', date: 'Oct 24, 2024', status: 'Delivered', total: '₹499' },
    { id: '#HAN-1019', date: 'Oct 12, 2024', status: 'In Transit', total: '₹1,245' },
  ]);

  useEffect(() => {
    async function getUser() {
       const { data: { user } } = await supabase.auth.getUser();
       if (user) {
          setUserName(user.user_metadata?.full_name || "Valued Customer");
       }
    }
    getUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar / Profile Summary */}
        <aside className="w-full md:w-80 space-y-8">
           <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-2xl shadow-gray-200/50 text-center space-y-4">
              <div className="w-32 h-32 bg-emerald-50 rounded-full mx-auto flex items-center justify-center text-4xl">🧘</div>
              <div>
                 <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{userName}</h2>
                 <p className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest">Premium Member</p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                 <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">450 Points</span>
              </div>
           </div>

           <nav className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-1">
              {['Health Profile', 'Active Orders', 'Medical Records', 'Saved Doctors', 'Settings'].map((item) => (
                 <button key={item} className="w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-emerald-50 hover:text-[#2d5a27] transition-all">
                    {item}
                 </button>
              ))}
           </nav>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 space-y-12">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#2d5a27] to-emerald-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/20">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Next Consultation</p>
                 <h3 className="text-xl font-black mb-4">Tomorrow, 10:30 AM</h3>
                 <button className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Join Room</button>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Prescription Refill</p>
                 <h3 className="text-xl font-black text-gray-900 mb-4">Ashwagandha Gold</h3>
                 <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">Low Stock - Refill Now</span>
              </div>
           </div>

           <section className="space-y-6">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Activity</h3>
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                       <tr>
                          <th className="px-8 py-4">Order ID</th>
                          <th className="px-8 py-4">Status</th>
                          <th className="px-8 py-4">Total</th>
                          <th className="px-8 py-4 text-right">Details</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {orders.map(order => (
                          <tr key={order.id} className="hover:bg-emerald-50/30 transition-all">
                             <td className="px-8 py-6 font-black text-gray-900 text-sm">{order.id}</td>
                             <td className="px-8 py-6">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                   order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>{order.status}</span>
                             </td>
                             <td className="px-8 py-6 font-bold text-gray-900">{order.total}</td>
                             <td className="px-8 py-6 text-right">
                                <button className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest hover:underline">View Receipt</button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </section>
        </main>
      </div>
    </div>
  );
}
