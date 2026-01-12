import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-3xl mx-auto max-w-[98%] mt-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-2.jpg"
          alt="Ayurvedic Wellness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c1e]/90 via-[#1a3c1e]/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col items-start gap-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#d4a373] text-[#2d5a27] text-xs font-bold uppercase tracking-wider mb-2">
          100% Natural & Authentic
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-[#f3f4f6] leading-[1.1]">
          Restore Balance <br />
          <span className="italic text-[#d4a373]">Naturally</span>
        </h1>
        <p className="text-[#e5e7eb] text-lg md:text-xl max-w-xl font-light leading-relaxed">
          Discover the ancient wisdom of Ayurveda with our premium selection of
          herbal remedies and wellness products.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="/categories"
            className="px-8 py-4 bg-[#d4a373] text-[#2d5a27] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#c29264] transition-all transform hover:-translate-y-1"
          >
            Shop Now
          </Link>
          <Link
            href="/doctor-consult"
            className="px-8 py-4 bg-transparent border-2 border-[#f3f4f6] text-[#f3f4f6] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#f3f4f6] hover:text-[#1a3c1e] transition-all transform hover:-translate-y-1"
          >
            Consult Doctor
          </Link>
        </div>
      </div>
    </section>
  );
}
