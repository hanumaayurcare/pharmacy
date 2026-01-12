import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      {/* Header removed to allow parent control */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center gap-4 text-center p-4 rounded-2xl hover:bg-[#f0f7f0] transition-colors"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#e5e7eb] group-hover:border-[#2d5a27] transition-all p-1 relative">
               <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                 {/* Fallback to icon if no image, or a placeholder */}
                 {category.icon ? (
                   <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-50">
                     {category.icon}
                   </div>
                 ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 font-bold text-xs uppercase">
                      {category.name[0]}
                    </div>
                 )}
               </div>
            </div>
            <h3 className="font-bold text-[#1a3c1e] text-sm md:text-base group-hover:text-[#d4a373] transition-colors">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
      
      <div className="mt-10 text-center">
         <Link href="/categories" className="text-[#2d5a27] font-bold text-sm uppercase tracking-widest border-b-2 border-[#d4a373] pb-1 hover:text-[#1a3c1e] transition-colors">
            View All Categories
         </Link>
      </div>
    </div>
  );
}
