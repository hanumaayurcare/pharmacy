import Link from "next/link";
import Image from "next/image";

// Define a type for the product that matches what we expect from DB
export interface Product {
    id: string;
    title?: string; // mapping from DB 'name'
    name: string;
    slug: string;
    price: number;
    old_price: number;
    image_url: string;
    category?: string;
    is_new?: boolean;
}

interface ProductRailProps {
  title: string;
  products: Product[];
  link?: string;
}

export function ProductRail({ title, products, link }: ProductRailProps) {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-gray-100">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1a3c1e]">{title}</h2>
        </div>
        {link && (
          <Link href={link} className="hidden md:block text-[#2d5a27] font-bold text-xs uppercase tracking-widest hover:text-[#d4a373] transition-colors">
            View All
          </Link>
        )}
      </div>

      <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`} 
            className="min-w-[200px] md:min-w-[240px] group"
          >
            <div className="aspect-[4/5] bg-[#f9fafb] rounded-2xl mb-4 relative overflow-hidden">
                {product.is_new && (
                    <span className="absolute top-3 left-3 bg-[#d4a373] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10">
                        New
                    </span>
                )}
                {product.image_url ? (
                    <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill 
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
                
                {/* Quick Add Button (Visible on Hover) */}
                <button className="absolute bottom-4 right-4 bg-[#1a3c1e] text-white w-10 h-10 rounded-full flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
            
            <h3 className="text-[#1a3c1e] font-bold text-sm md:text-base line-clamp-1 group-hover:text-[#d4a373] transition-colors">{product.name}</h3>
            {product.category && <p className="text-xs text-gray-400 font-medium">{product.category}</p>}
            
            <div className="flex items-center gap-2 mt-2">
                <span className="text-[#1a3c1e] font-bold">₹{product.price}</span>
                {product.old_price > product.price && (
                    <span className="text-gray-400 text-xs line-through">₹{product.old_price}</span>
                )}
            </div>
          </Link>
        ))}
      </div>
      
       {link && (
          <div className="md:hidden text-center mt-4">
            <Link href={link} className="text-[#2d5a27] font-bold text-xs uppercase tracking-widest hover:text-[#d4a373] transition-colors">
                View All
            </Link>
          </div>
        )}
    </section>
  );
}
