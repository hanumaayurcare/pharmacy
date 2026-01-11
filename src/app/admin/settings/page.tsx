import React from "react";
import { createAdminClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminSettingsPage() {
  const supabase = await createAdminClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
     redirect('/auth/login');
  }

  // Fetch role
  const { data: membership } = await supabase
    .from('context_memberships')
    .select('role')
    .eq('user_id', user.id)
    .single();

  const role = membership?.role || 'user';

  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-gray-800 tracking-tight">System Settings</h1>
         <span className="bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {role} Access
         </span>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm space-y-6">
           <h3 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span> My Profile
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                 <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700">
                    {user.email}
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">User ID</label>
                 <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-mono text-gray-500 truncate">
                    {user.id}
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Sign In</label>
                 <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-white p-8 rounded-[2rem] border border-[#e2e8f0] shadow-sm space-y-6 opacity-75">
           <h3 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2d5a27] rounded-full"></span> Store Configuration (Admin Only)
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Store Name</label>
                 <input disabled type="text" defaultValue="Hanuma Ayurveda Official" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-500 cursor-not-allowed" />
              </div>
           </div>
           <p className="text-[10px] text-gray-400 italic">Global store settings are currently managed via environment variables.</p>
        </section>

        <div className="flex justify-start">
           <form action="/auth/signout" method="post">
             <button className="px-8 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all">
                Sign Out
             </button>
           </form>
        </div>
      </div>
    </div>
  );
}
