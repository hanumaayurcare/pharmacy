import Image from "next/image";

export function InfoSection() {
  return (
    <section className="py-20 bg-[#f9fafb] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a373]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2d5a27]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest pl-1">The Essence of Life</span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#1a3c1e] leading-tight">
                Why Choose <br className="hidden md:block" /> Ayurveda?
              </h2>
              <p className="text-[#4b5563] text-lg leading-relaxed max-w-xl">
                Ayurveda is not just about curing disease but preventing it. Our products are crafted using time-tested formulations that restore the natural balance of your body, mind, and spirit.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Holistic Healing", desc: "Treats the root cause, not just symptoms." },
                { title: "100% Natural", desc: "Free from harmful chemicals and preservatives." },
                { title: "Time-Tested", desc: "Based on 5000+ years of Vedic wisdom." },
                { title: "No Side Effects", desc: "Gentle on the body and safe for long-term use." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-[#d4a373] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1a3c1e] text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
                <button className="px-8 py-3 bg-[#1a3c1e] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#2d5a27] transition-all shadow-xl shadow-[#2d5a27]/20">
                    Discover Our Story
                </button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
             <div className="relative aspect-square max-w-md mx-auto">
                 {/* Main Image */}
                 <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
                     <Image src="/images/ayurveda-about.jpg" alt="Ayurvedic Preparation" fill className="object-cover" />
                 </div>
                 {/* Decorative borders */}
                 <div className="absolute inset-0 border-2 border-[#d4a373]/30 rounded-[3rem] rotate-3"></div>
                 <div className="absolute inset-0 border-2 border-[#1a3c1e]/10 rounded-[3rem] -rotate-3 scale-105"></div>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
