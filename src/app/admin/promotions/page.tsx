"use client";

import React, { useState } from "react";

interface Coupon {
  id: string;
  code: string;
  discount: string;
  usage: string;
  status: 'Active' | 'Paused' | 'Expired';
  type: 'Percentage' | 'Flat' | 'Shipping';
}

export default function AdminPromotionsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', code: 'HANUMA20', discount: '20% OFF', usage: '450/1000', status: 'Active', type: 'Percentage' },
    { id: '2', code: 'WELLNESS50', discount: '₹50 Flat', usage: '120/500', status: 'Paused', type: 'Flat' },
    { id: '3', code: 'FIRSTORDER', discount: 'Free Ship', usage: '821', status: 'Active', type: 'Shipping' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<Partial<Coupon>>({ code: '', discount: '', type: 'Percentage' });

  const openModal = (coupon: Coupon | null = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData(coupon);
    } else {
      setEditingCoupon(null);
      setFormData({ code: '', discount: '', type: 'Percentage' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      setCoupons(coupons.map(c => c.id === editingCoupon.id ? { ...c, ...formData } as Coupon : c));
    } else {
      setCoupons([...coupons, { ...formData, id: Math.random().toString(), usage: '0', status: 'Active' } as Coupon]);
    }
    setIsModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c));
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
        {coupons.map(promo => (
          <div key={promo.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
             
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                     promo.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                     {promo.status}
                  </span>
                  <div className="flex gap-2">
                     <button onClick={() => openModal(promo)} className="text-gray-300 hover:text-purple-600 text-sm transition-colors">✏️</button>
                     <button onClick={() => toggleStatus(promo.id)} className="text-gray-300 hover:text-gray-900 text-sm transition-colors">⏸️</button>
                  </div>
                </div>

                <div className="space-y-1">
                   <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{promo.code}</h3>
                   <p className="text-xs font-black text-purple-600 uppercase tracking-widest">{promo.discount} • {promo.type}</p>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Usage</p>
                      <p className="text-sm font-black text-gray-900">{promo.usage}</p>
                   </div>
                   <div className="h-2 w-20 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 w-[65%]"></div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
           <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl relative">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Coupon Code</label>
                    <input required type="text" value={formData.code} onChange={e=>setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-purple-600/5 outline-none font-black" placeholder="SAVE50" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Promotion Type</label>
                       <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value as Coupon['type']})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none">
                          <option>Percentage</option>
                          <option>Flat</option>
                          <option>Shipping</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount Value</label>
                       <input required type="text" value={formData.discount} onChange={e=>setFormData({...formData, discount: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm outline-none font-bold" placeholder="20% OFF" />
                    </div>
                 </div>
                 <div className="pt-6 flex gap-4">
                    <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 text-[10px] font-black uppercase text-gray-400 tracking-widest">Discard</button>
                    <button type="submit" className="flex-1 bg-purple-600 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest">Active Campaign</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
