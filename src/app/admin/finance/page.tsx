import React from "react";
import { createAdminClient } from "@/lib/supabase-server";

export default async function AdminFinancePage() {
  const supabase = await createAdminClient();
  
  // Fetch paid orders for revenue calculation
  const { data: orders, error } = await supabase
    .schema('shop')
    .from('orders')
    .select('id, total_amount, payment_status, created_at, status')
    .eq('payment_status', 'paid')
    .order('created_at', { ascending: false });

  if (error) {
     console.error("Error fetching finance data:", error);
  }

  const paidOrders = orders || [];
  const totalRevenue = paidOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const recentSettlements = paidOrders.slice(0, 5);
  
  // Gross profit hypothesis (assuming 30% margin for simple demo calculation)
  const grossProfit = totalRevenue * 0.3;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-green-800 px-6 py-2 rounded-2xl shadow-lg">Financial Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm space-y-6">
           <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Revenue Growth</h3>
           <div className="h-48 w-full bg-green-50 rounded-2xl flex items-center justify-center text-green-300 font-black italic">
               <span className="text-4xl">📈</span>
           </div>
           <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Gross Profit</p>
                 <h4 className="text-xl font-black text-[#2d5a27]">₹{grossProfit.toLocaleString('en-IN')}</h4>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Net Revenue</p>
                 <h4 className="text-xl font-black text-gray-900">₹{totalRevenue.toLocaleString('en-IN')}</h4>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#2d5a27] text-white p-8 rounded-[2rem] shadow-xl shadow-[#2d5a27]/20">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Total Confirmed Sales</p>
              <h2 className="text-4xl font-black mb-6 tracking-tight">₹{totalRevenue.toLocaleString('en-IN')}</h2>
              <button className="w-full bg-white text-[#2d5a27] py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">View Details</button>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                 {recentSettlements.length === 0 ? (
                    <div className="text-center text-gray-400 text-xs py-4">No paid transactions found</div>
                 ) : recentSettlements.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                       <div>
                          <p className="text-xs font-bold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-[10px] font-bold text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                       </div>
                       <span className="text-xs font-black text-[#2d5a27]">+ ₹{Number(order.total_amount).toLocaleString('en-IN')}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
