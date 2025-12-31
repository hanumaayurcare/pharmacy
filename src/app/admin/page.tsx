import React from "react";

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: '₹4,25,000', change: '+12.5%', icon: '💰', color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Orders', value: '154', change: '+5.2%', icon: '📦', color: 'bg-orange-50 text-orange-600' },
    { label: 'Total Users', value: '12,450', change: '+18.4%', icon: '👥', color: 'bg-green-50 text-green-600' },
    { label: 'Avg Order Value', value: '₹1,250', change: '-2.1%', icon: '📈', color: 'bg-purple-50 text-purple-600' },
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
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <button className="text-sm font-bold text-[#2d5a27] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-gray-500 font-bold border-b border-[#e2e8f0]">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">#ORD-000{i}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">JD</div>
                        <span className="text-sm text-gray-600">John Doe</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Delivered</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">₹1,250</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6">
          <h3 className="font-bold text-gray-800 mb-6">Inventory Alerts</h3>
          <div className="space-y-6">
            {[
              { item: 'Paracetamol 500mg', msg: 'Low Stock: 5 items left', type: 'warning' },
              { item: 'Vitamin C Serum', msg: 'Out of Stock', type: 'critical' },
              { item: 'Natural Honey', msg: 'Expiring Soon (15 days)', type: 'info' }
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg bg-gray-50 border-l-4 border-orange-400">
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-800">{alert.item}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{alert.msg}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 px-4 border border-[#e2e8f0] rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            Manage Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
