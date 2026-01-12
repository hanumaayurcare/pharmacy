"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  items?: FAQItem[];
}

export function ProductFAQ({ items }: ProductFAQProps) {
  const defaultFaqs = [
    {
      question: "Is this product safe for long-term use?",
      answer: "Yes, this is an authentic Ayurvedic formulation made from 100% natural herbal ingredients. It is generally safe for long-term use when taken as directed. However, we always recommend consulting an Ayurvedic physician for personalized advice."
    },
    {
      question: "How long does it take to see results?",
      answer: "Ayurveda works on the root cause rather than just symptoms. While some relief may be felt within a few days, significant and lasting improvements are typically observed over a course of 4-6 weeks of regular usage along with recommended diet changes."
    },
    {
      question: "Can I take this with my other allopathic medicines?",
      answer: "Generally, a gap of 60 minutes is recommended between Ayurvedic supplements and allopathic medicines. Please consult your healthcare provider to ensure there are no specific contraindications for your condition."
    },
    {
      question: "Are there any side effects?",
      answer: "This product is made from pure herbs and is typically free from side effects. In very rare cases, some people may experience mild gastric discomfort initially. If symptoms persist, discontinue use and consult a doctor."
    }
  ];

  const faqs = items && items.length > 0 ? items : defaultFaqs;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6 pt-10">
      <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
        <MessageCircleQuestion className="w-6 h-6 text-[#2d5a27]" />
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/30">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-bold text-gray-900 pr-8">{faq.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-[#c7511f]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
