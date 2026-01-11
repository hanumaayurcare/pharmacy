"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Promotion {
  id: string;
  title: string | null;
  type: string; // 'banner', 'strip', 'popup'
  image_url: string | null;
  link_url: string | null;
  priority: number;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
}

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: '',
    type: 'banner',
    image_url: '',
    link_url: '',
    priority: 0,
    active: true,
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .schema('shop')
        .from('promotions')
        .select('*')
        .order('priority', { ascending: true });
      
      if (error) throw error;
      setPromotions(data || []);
    } catch (error) {
       console.error('Error fetching promotions:', error);
    } finally {
       setLoading(false);
    }
  };

  const openModal = (promo: Promotion | null = null) => {
    if (promo) {
      setEditingPromo(promo);
      setFormData({
         title: promo.title || '',
         type: promo.type,
         image_url: promo.image_url || '',
         link_url: promo.link_url || '',
         priority: promo.priority,
         active: promo.active,
         start_date: promo.start_date ? new Date(promo.start_date).toISOString().split('T')[0] : '',
         end_date: promo.end_date ? new Date(promo.end_date).toISOString().split('T')[0] : ''
      });
    } else {
      setEditingPromo(null);
      setFormData({
        title: '',
        type: 'banner',
        image_url: '',
        link_url: '',
        priority: promotions.length + 1,
        active: true,
        start_date: '',
        end_date: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        type: formData.type,
        image_url: formData.image_url,
        link_url: formData.link_url,
        priority: Number(formData.priority),
        active: formData.active,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null
      };

      if (editingPromo) {
        const { error } = await supabase
          .schema('shop')
          .from('promotions')
          .update(payload)
          .eq('id', editingPromo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .schema('shop')
          .from('promotions')
          .insert([payload]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchPromotions();
    } catch (error) {
       alert('Error saving promotion: ' + (error as Error).message);
    }
  };

  const toggleStatus = async (promo: Promotion) => {
     try {
        const { error } = await supabase
           .schema('shop')
           .from('promotions')
           .update({ active: !promo.active })
           .eq('id', promo.id);
        if (error) throw error;
        // Optimistic update
        setPromotions(promotions.map(p => p.id === promo.id ? { ...p, active: !p.active } : p));
     } catch (error) {
        console.error('Error toggling status:', error);
        alert('Failed to update status');
     }
  };

  const deletePromo = async (id: string) => {
    if (confirm("Delete this promotion permanently?")) {
       try {
         const { error } = await supabase.schema('shop').from('promotions').delete().eq('id', id);
         if (error) throw error;
         fetchPromotions();
       } catch (error) {
          console.error('Error deleting promotion:', error);
          alert('Error deleting promotion');
       }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-purple-600 px-6 py-2 rounded-2xl shadow-lg">Campaigns & Promotions</h1>
        <button 
          onClick={() => openModal()}
          className="bg-purple-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-purple-600/20 hover:bg-purple-700 hover:-translate-y-1 transition-all active:scale-95"
        >
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             <div className="col-span-full text-center py-10 text-gray-500">Loading promotions...</div>
        ) : promotions.length === 0 ? (
             <div className="col-span-full text-center py-10 text-gray-500">No active campaigns found. Create one!</div>
        ) : promotions.map(promo => (
          <div key={promo.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden group hover:-translate-y-1 transition-all">
             {/* Decorative Background */}
             <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700 ${
                 promo.active ? 'bg-purple-50' : 'bg-gray-100'
             }`}></div>
             
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                     promo.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                     {promo.active ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex gap-2">
                     <button onClick={() => openModal(promo)} className="text-gray-300 hover:text-purple-600 text-sm transition-colors">✏️</button>
                     <button onClick={() => toggleStatus(promo)} className="text-gray-300 hover:text-gray-900 text-sm transition-colors">
                        {promo.active ? '⏸️' : '▶️'}
                     </button>
                     <button onClick={() => deletePromo(promo.id)} className="text-gray-300 hover:text-red-600 text-sm transition-colors">🗑️</button>
                  </div>
                </div>

                <div className="space-y-1">
                   <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase line-clamp-1">{promo.title || 'Untitled Promo'}</h3>
                   <p className="text-xs font-black text-purple-600 uppercase tracking-widest">{promo.type} • Priority {promo.priority}</p>
                </div>
                
                {promo.image_url && (
                    <div className="h-20 w-full bg-gray-50 rounded-xl overflow-hidden relative">
                         {/* Placeholder for image if we had an Image component, or use img tag */}
                         <img src={promo.image_url} alt="Promo" className="w-full h-full object-cover opacity-80" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                )}

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Schedule</p>
                      <p className="text-[10px] font-black text-gray-900">
                          {promo.start_date ? new Date(promo.start_date).toLocaleDateString() : 'Immediate'} 
                          {' → '} 
                          {promo.end_date ? new Date(promo.end_date).toLocaleDateString() : 'Forever'}
                      </p>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
           <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 text-2xl font-black transition-colors">×</button>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">{editingPromo ? 'Edit Campaign' : 'New Campaign'}</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                    <input required type="text" value={formData.title || ''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-purple-600/5 outline-none font-black" placeholder="Summer Sale" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Details</label>
                       <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none">
                          <option value="banner">Banner</option>
                          <option value="strip">Strip</option>
                          <option value="popup">Popup</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Priority</label>
                       <input type="number" value={formData.priority} onChange={e=>setFormData({...formData, priority: Number(e.target.value)})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none font-bold text-center" />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                    <input type="text" value={formData.image_url || ''} onChange={e=>setFormData({...formData, image_url: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none" placeholder="https://..." />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Link</label>
                    <input type="text" value={formData.link_url || ''} onChange={e=>setFormData({...formData, link_url: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none" placeholder="/shop/products/..." />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                       <input type="date" value={formData.start_date || ''} onChange={e=>setFormData({...formData, start_date: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
                       <input type="date" value={formData.end_date || ''} onChange={e=>setFormData({...formData, end_date: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none" />
                    </div>
                 </div>
                 <div className="pt-6 flex gap-4">
                    <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 text-[10px] font-black uppercase text-gray-400 tracking-widest">Discard</button>
                    <button type="submit" className="flex-1 bg-purple-600 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest">Save Campaign</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
