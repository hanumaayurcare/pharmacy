"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Customer' | 'Staff';
  joined: string;
  orders: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
       const { data } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
       
       if (data) {
          setUsers(data as User[]);
       }

       setLoading(false);
    }
    fetchUsers();
  }, []);

  const changeRole = async (id: string, newRole: User['role']) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id);

    if (!error) {
       setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    } else {
       alert("Error updating role: " + error.message);
    }
  };

  if (loading) {
     return (
        <div className="min-h-[400px] flex items-center justify-center">
           <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
     );
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-blue-600 px-6 py-2 rounded-2xl shadow-lg">User CRM & Access Control</h1>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
          Export Database
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Verified Users', value: '4,821', icon: '👤', trend: '+12%', color: 'text-blue-600' },
          { label: 'Prime Members', value: '1,245', icon: '💎', trend: '+8%', color: 'text-orange-500' },
          { label: 'Monthly Growth', value: '154', icon: '📈', trend: '+22%', color: 'text-green-600' }
        ].map(card => (
          <div key={card.label} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
             <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{card.icon}</span>
                <span className={`text-[10px] font-black ${card.color} px-3 py-1 bg-gray-50 rounded-full tracking-widest`}>{card.trend}</span>
             </div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{card.label}</p>
             <h3 className="text-4xl font-black text-gray-900 tracking-tighter mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden mt-10">
         <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">Access Directory</h3>
            <div className="flex gap-2">
               <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
               <span className="w-3 h-3 bg-green-500 rounded-full"></span>
               <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-gray-400 font-black border-b border-gray-50">
                     <th className="px-8 py-5">Identified User</th>
                     <th className="px-8 py-5">Assigned Role</th>
                     <th className="px-8 py-5">Registration</th>
                     <th className="px-8 py-5">Activity</th>
                     <th className="px-8 py-5 text-right">Settings</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {users.map(user => (
                     <tr key={user.id} className="hover:bg-gray-50/50 transition-all cursor-pointer group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 {user.name.split(' ').map(n=>n[0]).join('')}
                              </div>
                              <div>
                                 <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{user.name}</p>
                                 <p className="text-[10px] text-gray-400 font-bold">{user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <select 
                              value={user.role} 
                              onChange={(e) => changeRole(user.id, e.target.value as User['role'])}
                              className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none outline-none focus:ring-2 focus:ring-blue-100 appearance-none bg-gray-50 ${
                                 user.role === 'Admin' ? 'text-red-600' : user.role === 'Staff' ? 'text-green-600' : 'text-blue-600'
                              }`}
                           >
                              <option>Admin</option>
                              <option>Staff</option>
                              <option>Customer</option>
                           </select>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-gray-600 uppercase tracking-tight">{user.joined}</td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{user.orders} Purchases</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="text-gray-300 hover:text-gray-900 transition-colors text-xl">⚙️</button>
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
