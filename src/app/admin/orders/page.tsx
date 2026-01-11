"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  delivery_address: {
    fullName?: string;
    email?: string;
    [key: string]: string | undefined; // Allow other fields
  } | null;
  // Join fields
  order_items: { count: number }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .schema('shop')
        .from('orders')
        .select(`
          *,
          order_items (count)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
       console.error('Error fetching orders:', error);
    } finally {
       setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // Optimistic update
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      
      const { error } = await supabase
        .schema('shop')
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
         throw error;
         // Revert on error?
         fetchOrders(); // Refresh to be safe
      }
    } catch (error) {
       console.error('Error updating status:', error);
       alert('Failed to update status');
    }
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter.toLowerCase());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  // Helper to get customer name from delivery address
  const getCustomerName = (order: Order) => {
     if (order.delivery_address && order.delivery_address.fullName) {
        return order.delivery_address.fullName;
     }
     return 'Guest Customer';
  };
  
  // Helper to get email (mapped from user_id if possible, or address)
  const getCustomerEmail = (order: Order) => {
     if (order.delivery_address && order.delivery_address.email) {
        return order.delivery_address.email;
     }
     return 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-orange-500 px-6 py-2 rounded-2xl shadow-lg">Order Management System</h1>
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
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
              {loading ? (
                 <tr><td colSpan={6} className="text-center py-10">Loading orders...</td></tr>
              ) : filteredOrders.length === 0 ? (
                 <tr><td colSpan={6} className="text-center py-10">No orders found.</td></tr>
              ) : filteredOrders.map((order) => {
                const customerName = getCustomerName(order);
                const customerEmail = getCustomerEmail(order);
                const itemCount = order.order_items ? order.order_items[0]?.count : 0;
                
                return (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 text-sm font-black text-orange-600">#{order.id.slice(0, 8)}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-700">
                        {customerName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900">{customerName}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{customerEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-gray-600">
                    <div className="flex flex-col">
                       <span className="text-xs uppercase tracking-tight">{formatDate(order.created_at)}</span>
                       <span className="text-[10px] text-gray-400 flex items-center gap-1">📦 {itemCount} Items</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-gray-900">₹{order.total_amount}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end">
                       <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer"
                       >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                       </select>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
