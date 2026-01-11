import React from "react";
import { createClient } from "@/lib/supabase-server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch Stats concurrently
  const [productsRes, ordersRes, usersRes] = await Promise.all([
    supabase.schema('shop').from('products').select('*', { count: 'exact', head: true }),
    supabase.schema('shop').from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('context_memberships').select('*', { count: 'exact', head: true }).eq('role', 'user')
  ]);
  
  // Calculate revenue (simple sum for now, or just mock if too complex for single query without aggregation function support in simple client)
  // For revenue we might need an RPC or just fetch all orders and sum in JS (bad for scale but okay for now)
  // Let's stick to simple counts and a mock revenue or simplified revenue if possible.
  // Actually, we can just show counts for now.

  const stats = [
    { label: 'Total Products', value: productsRes.count?.toString() || '0', change: 'Inventory', icon: '💊', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Orders', value: ordersRes.count?.toString() || '0', change: 'Lifetime', icon: '📦', color: 'bg-orange-50 text-orange-600' },
    { label: 'Total Users', value: usersRes.count?.toString() || '0', change: 'Registered', icon: '👥', color: 'bg-green-50 text-green-600' },
    { label: 'Revenue', value: '₹0', change: 'To be implemented', icon: '💰', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold text-gray-500`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Placeholder for now until Orders CRUD is ready */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Recent Activity</h3>
            <button className="text-sm font-bold text-[#2d5a27] hover:underline">View All</button>
          </div>
          <div className="p-6 text-center text-gray-500 text-sm">
            Recent orders will appear here.
          </div>
        </div>

        {/* Alerts & Notifications - Static for now */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6">
          <h3 className="font-bold text-gray-800 mb-6">System Status</h3>
          <div className="space-y-6">
             <div className="flex gap-4 p-3 rounded-lg bg-green-50 border-l-4 border-green-400">
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-800">System Online</h4>
                  <p className="text-[10px] text-gray-500 mt-1">All systems operational.</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
