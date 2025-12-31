"use client";

import React, { useState } from "react";

interface Service {
  id: string;
  name: string;
  provider: string;
  type: 'Ayurvedic' | 'Diagnostic' | 'Therapy' | 'Pharmacy';
  icon: string;
  status: 'Active' | 'Maintenance' | 'Disabled';
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Doctor Consultation', provider: 'Dr. Ramesh Kumar', type: 'Ayurvedic', icon: '👨‍⚕️', status: 'Active' },
    { id: '2', name: 'Home Lab Test', provider: 'Hanuma Labs', type: 'Diagnostic', icon: '🧪', status: 'Active' },
    { id: '3', name: 'Panchakarma', provider: 'Heritage Center', type: 'Therapy', icon: '🧘', status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({ name: '', provider: '', type: 'Ayurvedic', icon: '🏥' });

  const openModal = (service: Service | null = null) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({ name: '', provider: '', type: 'Ayurvedic', icon: '🏥' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } as Service : s));
    } else {
      setServices([...services, { ...formData, id: Math.random().toString(), status: 'Active' } as Service]);
    }
    setIsModalOpen(false);
  };

  const deleteService = (id: string) => {
    if (confirm("Delete this service permanently?")) {
      setServices(services.filter(s => s.id !== id));
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
            {services.map((service) => (
               <div key={service.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all group">
                  <div className="flex items-center gap-8">
                     <div className="text-5xl group-hover:scale-110 transition-transform">{service.icon}</div>
                     <div>
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{service.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{service.provider}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-12">
                     <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                        service.type === 'Ayurvedic' ? 'bg-green-100 text-green-700' :
                        service.type === 'Diagnostic' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                     }`}>
                        {service.type}
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
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Service Configuration</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Service Name</label>
                    <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-blue-600/5 outline-none font-bold" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Provider Name</label>
                    <input required type="text" value={formData.provider} onChange={e=>setFormData({...formData, provider: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Service Type</label>
                       <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value as Service['type']})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none">
                          <option>Ayurvedic</option>
                          <option>Diagnostic</option>
                          <option>Therapy</option>
                          <option>Pharmacy</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Icon (Emoji)</label>
                       <input required type="text" value={formData.icon} onChange={e=>setFormData({...formData, icon: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm text-center" />
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
