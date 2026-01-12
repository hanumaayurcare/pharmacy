import React from "react";
import { ShieldCheck, Leaf, Heart, Award } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      id: "ayush",
      icon: <Award className="w-6 h-6 text-[#2d5a27]" />,
      title: "AYUSH Certified",
      desc: "Ministry of Ayush"
    },
    {
      id: "gmp",
      icon: <ShieldCheck className="w-6 h-6 text-[#2d5a27]" />,
      title: "GMP Certified",
      desc: "Manufacturing Practice"
    },
    {
      id: "natural",
      icon: <Leaf className="w-6 h-6 text-[#2d5a27]" />,
      title: "100% Herbal",
      desc: "Pure & Natural"
    },
    {
      id: "cruelty",
      icon: <Heart className="w-6 h-6 text-[#2d5a27]" />,
      title: "Cruelty Free",
      desc: "No Animal Testing"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100 my-6">
      {badges.map((badge) => (
        <div key={badge.id} className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-gray-50/50 hover:bg-[#f0f7f0] transition-colors group">
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
             {badge.icon}
          </div>
          <div>
            <h4 className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-widest leading-tight">{badge.title}</h4>
            <p className="text-[9px] text-gray-500 font-medium">{badge.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
