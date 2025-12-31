"use client";

import React, { useState } from "react";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '#ORD-99821', customer: 'Jane Smith', email: 'jane@example.com', date: 'Oct 24, 2024', total: 1450, status: 'Processing', items: 3 },
    { id: '#ORD-99822', customer: 'John Doe', email: 'john@example.com', date: 'Oct 23, 2024', total: 850, status: 'Shipped', items: 1 },
    { id: '#ORD-99823', customer: 'Anjali Verma', email: 'anjali@example.com', date: 'Oct 22, 2024', total: 2100, status: 'Delivered', items: 4 },
  ]);

  const [filter, setFilter] = useState('All');

  const updateStatus = (id: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-orange-500 px-6 py-2 rounded-2xl shadow-lg">Order Management System</h1>
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
            <button 
               key={status} 
               onClick={() => setFilter(status)}
               className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  filter === status ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:text-gray-900'
               }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer Details</th>
                <th className="px-8 py-5">Date / Items</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Current Status</th>
                <th className="px-8 py-5 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 text-sm font-black text-orange-600">{order.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-700">
                        {order.customer.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900">{order.customer}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{order.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-gray-600">
                    <div className="flex flex-col">
                       <span className="text-xs uppercase tracking-tight">{order.date}</span>
                       <span className="text-[10px] text-gray-400 flex items-center gap-1">📦 {order.items} Items</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-gray-900">₹{order.total}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end">
                       <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                          className="bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer"
                       >
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                       </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
