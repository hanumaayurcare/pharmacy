export function TrustSection() {
  return (
    <section className="py-20 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {[
            { label: 'Authentic Products', sub: 'Surced directly from manufacturers', icon: '🌿' },
            { label: 'Secure Payments', sub: '100% Purchase Protection', icon: '🔒' },
            { label: 'Pan India Delivery', sub: 'Fast & Reliable Shipping', icon: '🚚' },
            { label: 'Expert Support', sub: 'Consult with Vaidyas', icon: '👨‍⚕️' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-4 group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-[#f0f7f0] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#1a3c1e] group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-[#1a3c1e] text-sm md:text-base uppercase tracking-tight">{item.label}</h4>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Strip */}
      <div className="mt-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-serif font-medium text-[#1a3c1e]">Join the Hanuma Family</h3>
        <p className="text-gray-500">Subscribe for health tips, new arrivals, and exclusive offers.</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]"
            />
            <button className="px-8 py-3 bg-[#d4a373] text-[#1a3c1e] rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#c29264] transition-colors">
                Subscribe
            </button>
        </div>
      </div>
    </section>
  );
}
