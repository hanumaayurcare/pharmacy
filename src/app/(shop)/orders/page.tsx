"use client";

import React from "react";

export default function UserOrdersPage() {
  const orders = [
    { id: '#HAN-99212', date: 'Oct 24, 2024', status: 'Delivered', total: '₹1,450', items: 3 },
    { id: '#HAN-98541', date: 'Sep 12, 2024', status: 'Cancelled', total: '₹899', items: 1 },
    { id: '#HAN-97210', date: 'Aug 30, 2024', status: 'Delivered', total: '₹2,100', items: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none text-center">Your Orders</h1>
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest text-center">Track and manage your Ayurvedic purchases</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-gray-100/50 hover:border-[#2d5a27]/20 transition-all">
               <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="w-16 h-16 bg-[#f0f7f0] rounded-2xl flex items-center justify-center text-2xl">📦</div>
                  <div className="space-y-1">
                     <h3 className="text-lg font-black text-gray-900">{order.id}</h3>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.date} • {order.items} Items</p>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center md:text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                     <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                     }`}>
                        {order.status}
                     </span>
                  </div>
                  <div className="text-center md:text-right min-w-[100px]">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                     <p className="text-xl font-black text-gray-900">{order.total}</p>
                  </div>
                  <button className="bg-gray-50 hover:bg-gray-100 text-gray-500 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                     View Details
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
