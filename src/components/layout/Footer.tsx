import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a3c1e] text-gray-400 pt-16 pb-8 border-t border-[#2d5a27]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4a373] rounded-lg flex items-center justify-center text-[#1a3c1e] font-black text-2xl">H</div>
            <div className="flex flex-col">
               <span className="font-serif font-bold text-xl text-[#f3f4f6] uppercase tracking-wide leading-none">Hanuma</span>
               <span className="text-[9px] text-[#d4a373] font-bold tracking-[0.3em] uppercase">Ayurveda</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs text-gray-400">
            Authentic Ayurvedic formulations for modern wellness. Rooted in wisdom, backed by science.
          </p>
          <div className="flex gap-4">
             {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                <a key={social} href={`#${social}`} className="w-9 h-9 rounded-full bg-[#2d5a27]/30 flex items-center justify-center hover:bg-[#d4a373] hover:text-[#1a3c1e] transition-all">
                  <span className="sr-only">{social}</span>
                  {/* Icon placeholder */}
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
             ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#f3f4f6] font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#2d5a27] pb-2 inline-block">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-[#d4a373] transition-colors">Our Story</Link></li>
            <li><Link href="/shop" className="hover:text-[#d4a373] transition-colors">Shop All</Link></li>
            <li><Link href="/consult" className="hover:text-[#d4a373] transition-colors">Consult Vaidya</Link></li>
            <li><Link href="/blog" className="hover:text-[#d4a373] transition-colors">Health Blog</Link></li>
            <li><Link href="/contact" className="hover:text-[#d4a373] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
           <h4 className="text-[#f3f4f6] font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#2d5a27] pb-2 inline-block">Categories</h4>
           <ul className="space-y-3 text-sm">
            <li><Link href="/category/immunity" className="hover:text-[#d4a373] transition-colors">Immunity & Wellness</Link></li>
            <li><Link href="/category/digestion" className="hover:text-[#d4a373] transition-colors">Digestion & Gut</Link></li>
            <li><Link href="/category/hair-care" className="hover:text-[#d4a373] transition-colors">Hair & Skin</Link></li>
            <li><Link href="/category/stress-relief" className="hover:text-[#d4a373] transition-colors">Stress Relief</Link></li>
            <li><Link href="/category/womens-health" className="hover:text-[#d4a373] transition-colors">Women&apos;s Health</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[#f3f4f6] font-bold text-sm uppercase tracking-widest mb-6 border-b border-[#2d5a27] pb-2 inline-block">Newsletter</h4>
          <p className="text-xs mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="space-y-3">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="w-full bg-[#2d5a27]/20 border border-[#2d5a27] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a373] transition-all"
             />
             <button type="button" className="w-full bg-[#d4a373] text-[#1a3c1e] font-bold text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-[#c29264] transition-all">
                Subscribe
             </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#2d5a27] pt-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
           <p>&copy; 2024 Hanuma Ayurveda. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#d4a373]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#d4a373]">Terms of Service</Link>
              <Link href="/shipping" className="hover:text-[#d4a373]">Shipping Policy</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
