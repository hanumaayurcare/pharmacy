import React from "react";
import { createAdminClient } from "@/lib/supabase-server";

export default async function AdminReportsPage() {
  const supabase = await createAdminClient();

  // Fetch basic stats
  const { count: totalOrders } = await supabase.schema('shop').from('orders').select('*', { count: 'exact', head: true });
  const { count: totalProducts } = await supabase.schema('shop').from('products').select('*', { count: 'exact', head: true });
  const { count: lowStock } = await supabase.schema('shop').from('products').select('*', { count: 'exact', head: true }).lt('stock_quantity', 10);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-blue-500 px-6 py-2 rounded-2xl shadow-lg">Analytics & Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Inventory Health</h3>
              <span className={`text-xs font-black ${(lowStock || 0) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                 {(lowStock || 0) > 0 ? '⚠️ Action Needed' : '✅ Healthy'}
              </span>
           </div>
           <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                 <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Total Products</span>
                 <span className="text-xl font-black text-gray-900">{totalProducts || 0}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                 <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Low Stock Items</span>
                 <span className="text-xl font-black text-red-600">{lowStock || 0}</span>
              </div>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Sales Funnel</h3>
              <span className="text-xs font-black text-[#2d5a27]">{(totalOrders || 0) > 0 ? 'Active' : 'No Data'}</span>
           </div>
           <div className="space-y-4">
              {[
                 { label: 'Total Orders Placed', val: totalOrders || 0, w: 'w-full', color: 'bg-blue-600' },
                 { label: 'Successful Allocations', val: totalOrders || 0, w: 'w-[90%]', color: 'bg-blue-500' }, 
                 { label: 'Completed Deliveries', val: 'Check Orders Page', w: 'w-[10%]', color: 'bg-green-500' }
              ].map(stat => (
                 <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                       <span>{stat.label}</span>
                       <span className="text-gray-800">{stat.val}</span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                       <div className={`h-full ${stat.color} ${stat.w}`}></div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
