"use client";

import React from "react";

export default function HealthServicesPage() {
  const services = [
    { title: 'Online Doctor Consult', sub: 'Talk to certified Ayurvedic specialists from the comfort of your home.', icon: '👨‍⚕️', color: 'bg-green-50 text-[#2d5a27]', tags: ['Video Call', 'Instant'] },
    { title: 'Diagnostic Lab Tests', sub: 'Sample collection at your doorstep with reports delivered digitally.', icon: '🔬', color: 'bg-blue-50 text-blue-700', tags: ['At Home', '24h Delivery'] },
    { title: 'Panchakarma center', sub: 'Premium detoxification and restoration therapies at our centers.', icon: '🧘', color: 'bg-orange-50 text-orange-700', tags: ['In-person', 'Therapy'] },
    { title: 'Ayurvedic Pharmacy', sub: '100% Genuine and Pure medicines delivered across India.', icon: '💊', color: 'bg-purple-50 text-purple-700', tags: ['Fast Ship', 'Pure'] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="space-y-4 mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Holistic Health Services</h1>
        <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">Bridging ancient wisdom with modern convenience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <div key={i} className={`${service.color} p-10 rounded-[3rem] border border-white shadow-2xl shadow-gray-100/50 flex flex-col items-center text-center space-y-6 group transition-all hover:-translate-y-2`}>
             <div className="text-6xl group-hover:scale-110 transition-all duration-500">{service.icon}</div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3>
                <p className="text-gray-600/70 text-sm font-medium leading-relaxed max-w-sm">{service.sub}</p>
             </div>
             <div className="flex gap-3">
                {service.tags.map(tag => (
                   <span key={tag} className="bg-white/50 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{tag}</span>
                ))}
             </div>
             <button className="mt-4 bg-gray-900 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Book Service</button>
          </div>
        ))}
      </div>
    </div>
  );
}
