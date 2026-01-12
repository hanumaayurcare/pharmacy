import React, { Suspense } from "react";
import { createClient } from "@/lib/supabase-server";
import { ProductsClient } from "@/components/product/ProductsClient";
import { ProductSkeleton } from "@/components/product/ProductSkeleton";

export const revalidate = 3600;

interface SearchParams {
  search?: string;
  category?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await createClient();
  const { search, category, sort, minPrice, maxPrice } = await searchParams;
  
  // Build query with filters
  let query = supabase.from('products').select('*');
  
  // Search filter
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  // Category filter (support both dosage and therapeutic via name match)
  const categoryFilter = category;
  if (categoryFilter && categoryFilter !== 'all') {
    // This is a simplified filter. Ideally, use a relation or specific columns.
    // Matching logic similar to category details page
    query = query.or(`dosage_form.ilike.%${categoryFilter}%,therapeutic_categories.cs.{${categoryFilter}}`);
  }
  
  // Price range filter
  if (minPrice) {
    query = query.gte('price', parseFloat(minPrice));
  }
  if (maxPrice) {
    query = query.lte('price', parseFloat(maxPrice));
  }
  
  // Sorting
  switch (sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'name-asc':
      query = query.order('name', { ascending: true });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('id', { ascending: true });
  }

  const { data: products, error } = await query;
  
  // Fetch organized categories from the DB
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('name, type')
    .order('name');

  const dosageCategories = categoriesData
    ?.filter(c => c.type === 'dosage')
    .map(c => c.name) || [];

  const therapeuticCategories = categoriesData
    ?.filter(c => c.type === 'therapeutic')
    .map(c => c.name) || [];

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-bold">Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            All Products
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">
            Showing {products?.length || 0} results
          </p>
        </div>
      </div>

      <Suspense fallback={<ProductsSkeletonGrid />}>
        <ProductsClient 
          initialProducts={products || []} 
          dosageCategories={dosageCategories}
          therapeuticCategories={therapeuticCategories}
          searchParams={{ search, category, sort, minPrice, maxPrice }}
        />
      </Suspense>
    </div>
  );
}

function ProductsSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}