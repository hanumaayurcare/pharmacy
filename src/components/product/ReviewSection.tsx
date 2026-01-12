"use client";

import React from "react";

export function ReviewSection() {
  const reviews = [
    {
      id: 1,
      author: "Priya S.",
      rating: 5,
      date: "2 months ago",
      title: "Excellent results for joint pain",
      content: "I have been using this for my mother's arthritis and have seen visible improvement. The swelling has gone down significantly.",
      verified: true
    },
    {
      id: 2,
      author: "Rahul M.",
      rating: 4,
      date: "1 month ago",
      title: "Good product, fast delivery/packaging",
      content: "Genuine ayurvedic medicine. The packaging was secure and delivery was prompt.",
      verified: true
    },
    {
      id: 3,
      author: "Anjali K.",
      rating: 5,
      date: "3 weeks ago",
      title: "Very effective",
      content: "Highly recommend for anyone looking for authentic ayurvedic remedies.",
      verified: false
    }
  ];

  return (
    <div className="border-t border-gray-100 pt-16 mt-16 max-w-5xl">
       <div className="flex flex-col md:flex-row gap-12">
           
           {/* Summary Side */}
           <div className="md:w-1/3 space-y-6">
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Customer Reviews</h2>
               
               <div className="flex items-baseline gap-4">
                   <span className="text-5xl font-black text-gray-900">4.8</span>
                   <div className="space-y-1">
                       <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Based on 124 reviews</p>
                   </div>
               </div>
               
               <div className="space-y-2">
                   {[5, 4, 3, 2, 1].map(stars => (
                       <div key={stars} className="flex items-center gap-3 text-xs">
                           <span className="font-bold text-gray-500 w-3">{stars}★</span>
                           <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                               <div 
                                 className="h-full bg-[#eca809]" 
                                 style={{ width: stars === 5 ? '70%' : stars === 4 ? '20%' : '5%' }}
                               ></div>
                           </div>
                           <span className="text-gray-400 w-6 text-right">{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</span>
                       </div>
                   ))}
               </div>

               <button className="w-full bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:border-[#2d5a27] hover:text-[#2d5a27] transition-colors shadow-sm">
                   Write a Review
               </button>
           </div>

           {/* Reviews List */}
           <div className="flex-1 space-y-8">
               {reviews.map(review => (
                   <div key={review.id} className="border-b border-gray-50 last:border-0 pb-8 last:pb-0">
                       <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-[#f0f7f0] text-[#2d5a27] flex items-center justify-center font-bold text-xs">
                                   {review.author[0]}
                               </div>
                               <span className="text-sm font-bold text-gray-900">{review.author}</span>
                               {review.verified && (
                                   <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                       Verified Buyer
                                   </span>
                               )}
                           </div>
                           <span className="text-xs text-gray-400 font-bold">{review.date}</span>
                       </div>
                       
                       <div className="flex text-yellow-400 text-xs mb-2">
                           {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                       </div>
                       
                       <h4 className="text-sm font-black text-gray-900 mb-1">{review.title}</h4>
                       <p className="text-sm text-gray-600 leading-relaxed">
                           {review.content}
                       </p>
                   </div>
               ))}
               
               <button className="text-xs font-black text-[#2d5a27] uppercase tracking-widest hover:underline">
                   Load More Reviews
               </button>
           </div>
       </div>
    </div>
  );
}
