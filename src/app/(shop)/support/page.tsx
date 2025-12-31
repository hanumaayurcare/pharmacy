"use client";

import React from "react";

export default function SupportPage() {
  const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order using the Order ID sent to your email or via the "Orders" page in your profile.' },
    { q: 'What is your return policy?', a: 'Products can be returned within 7 days of delivery if the seal is unbroken. Medicinal returns require proof of damage.' },
    { q: 'Do you offer international shipping?', a: 'Currently we ship all over India. International shipping is coming soon to select countries.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Support Center</h1>
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">We&apos;re here to help you on your health journey</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#f0f7f0] p-10 rounded-[3rem] border border-white shadow-xl shadow-gray-100 flex flex-col items-center text-center space-y-6">
              <div className="text-4xl">📧</div>
              <h3 className="text-xl font-black text-[#2d5a27] uppercase tracking-tight">Email Support</h3>
              <p className="text-gray-500 text-xs font-bold leading-relaxed">Drop us a line and our experts will get back within 24 hours.</p>
              <a href="mailto:care@hanuma.com" className="text-sm font-black text-[#2d5a27] underline">care@hanuma.com</a>
           </div>
           <div className="bg-blue-50 p-10 rounded-[3rem] border border-white shadow-xl shadow-gray-100 flex flex-col items-center text-center space-y-6">
              <div className="text-4xl">💬</div>
              <h3 className="text-xl font-black text-blue-700 uppercase tracking-tight">WhatsApp Chat</h3>
              <p className="text-gray-500 text-xs font-bold leading-relaxed">Chat with us live for instant order queries or health questions.</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Start Chat</button>
           </div>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
           <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight text-center">Common Questions</h2>
           <div className="divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                 <details key={i} className="group py-6">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                       <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{faq.q}</span>
                       <span className="text-gray-300 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-4 text-gray-500 text-xs font-medium leading-relaxed pr-8">
                       {faq.a}
                    </p>
                 </details>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
