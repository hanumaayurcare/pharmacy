"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  email: string;
  name: string; // from metadata
  role: string;
  last_sign_in_at: string;
  created_at: string;
}

interface AdminUsersClientProps {
  initialUsers: User[];
}

export default function AdminUsersClient({ initialUsers }: AdminUsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filter, setFilter] = useState('');

  const changeRole = async (userId: string, newRole: string) => {
    try {
      // Optimistic update
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));

      // Update in Supabase
      // First check if a membership exists
      const { data: existing } = await supabase
        .from('context_memberships')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existing) {
         const { error } = await supabase
            .from('context_memberships')
            .update({ role: newRole })
            .eq('id', existing.id); // Better to match ID
         if (error) throw error;
      } else {
         // Insert new
         const { error } = await supabase
            .from('context_memberships')
            .insert([{
                user_id: userId,
                role: newRole,
                context_type: 'global', // Default
                context_id: 'all' // Default
            }]);
         if (error) throw error;
      }

    } catch (error) {
       console.error('Error updating role:', error);
       alert('Failed to update role. Check console/permissions.');
       // Revert?
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(filter.toLowerCase()) || 
    u.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-blue-600 px-6 py-2 rounded-2xl shadow-lg">User Access Control</h1>
        <div className="relative">
           <input 
              type="text" 
              placeholder="Filter users..." 
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-white border-none rounded-xl py-2 px-4 shadow-sm text-sm outline-none focus:ring-2 focus:ring-blue-100"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: users.length, icon: '👤', trend: 'Lifetime', color: 'text-blue-600' },
          { label: 'Admins', value: users.filter(u => u.role === 'super_admin' || u.role === 'admin').length, icon: '💎', trend: 'Global', color: 'text-orange-500' },
          { label: 'Staff', value: users.filter(u => u.role === 'staff').length, icon: '👔', trend: 'Active', color: 'text-green-600' }
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
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-gray-400 font-black border-b border-gray-50">
                     <th className="px-8 py-5">Identified User</th>
                     <th className="px-8 py-5">Assigned Role</th>
                     <th className="px-8 py-5">Last Active</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map(user => (
                     <tr key={user.id} className="hover:bg-gray-50/50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 {(user.name || user.email || '?').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                 <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{user.name || 'No Name'}</p>
                                 <p className="text-[10px] text-gray-400 font-bold">{user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <select 
                              value={user.role} 
                              onChange={(e) => changeRole(user.id, e.target.value)}
                              className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none outline-none focus:ring-2 focus:ring-blue-100 appearance-none bg-gray-50 cursor-pointer ${
                                 ['super_admin', 'admin'].includes(user.role) ? 'text-red-600' : user.role === 'staff' ? 'text-green-600' : 'text-blue-600'
                              }`}
                           >
                              <option value="user">User</option>
                              <option value="staff">Staff</option>
                              <option value="admin">Admin</option>
                              <option value="super_admin">Super Admin</option>
                           </select>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-gray-600 uppercase tracking-tight">
                            {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
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
