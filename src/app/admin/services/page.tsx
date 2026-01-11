"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  service_url: string | null;
  priority: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    icon: '🏥',
    description: '',
    service_url: '',
    priority: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .schema('shop')
        .from('quick_services')
        .select('*')
        .order('priority', { ascending: true });
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
       console.error('Error fetching services:', error);
    } finally {
       setLoading(false);
    }
  };

  const openModal = (service: Service | null = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
         name: service.name,
         slug: service.slug,
         icon: service.icon || '🏥',
         description: service.description || '',
         service_url: service.service_url || '',
         priority: service.priority
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        slug: '',
        icon: '🏥',
        description: '',
        service_url: '',
        priority: services.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        const { error } = await supabase
          .schema('shop')
          .from('quick_services')
          .update(formData)
          .eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .schema('shop')
          .from('quick_services')
          .insert([formData]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
       alert('Error saving service: ' + (error as Error).message);
    }
  };

  const deleteService = async (id: string) => {
    if (confirm("Delete this service permanently?")) {
       try {
         const { error } = await supabase.schema('shop').from('quick_services').delete().eq('id', id);
         if (error) throw error;
         fetchServices();
       } catch (error) {
          console.error('Error deleting service:', error);
          alert('Error deleting service');
       }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-blue-600 px-6 py-2 rounded-2xl shadow-lg uppercase">Service Infrastructure</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all"
        >
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
         <div className="divide-y divide-gray-50">
            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading services...</div>
            ) : services.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No services found.</div>
            ) : services.map((service) => (
               <div key={service.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all group">
                  <div className="flex items-center gap-8">
                     <div className="text-5xl group-hover:scale-110 transition-transform">{service.icon}</div>
                     <div>
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{service.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{service.description || 'No description'}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-12">
                     <span className="text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-gray-100 text-gray-600">
                        Priority: {service.priority}
                     </span>
                     <div className="flex gap-4">
                        <button onClick={() => openModal(service)} className="text-gray-300 hover:text-blue-600 transition-colors">✏️</button>
                        <button onClick={() => deleteService(service.id)} className="text-gray-300 hover:text-red-500 transition-colors">🗑️</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
           <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 text-2xl font-black transition-colors">×</button>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">{editingService ? 'Edit Service' : 'Add Service'}</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Service Name</label>
                    <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-blue-600/5 outline-none font-bold" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Slug</label>
                    <input required type="text" value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                    <input type="text" value={formData.description || ''} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Icon (Emoji/URL)</label>
                       <input type="text" value={formData.icon || ''} onChange={e=>setFormData({...formData, icon: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm text-center" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Priority</label>
                       <input type="number" value={formData.priority} onChange={e=>setFormData({...formData, priority: Number(e.target.value)})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm text-center" />
                    </div>
                 </div>
                 <div className="pt-6 flex gap-4">
                    <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 text-[10px] font-black uppercase text-gray-400 tracking-widest">Cancel</button>
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20">Save Service</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
