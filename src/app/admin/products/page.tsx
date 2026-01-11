"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  category_id: string;
  price: number; // MRP
  discounted_price?: number; // Selling Price
  stock_quantity: number;
  slug: string; // Using as SKU for now
  description?: string;
  image_url?: string;
  // Join fields
  categories?: { name: string };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category_id: '',
    price: 0,
    discounted_price: 0,
    stock_quantity: 0,
    slug: '',
    description: ''
  });

  // Fetch Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch Categories
      const { data: catData } = await supabase.schema('shop').from('categories').select('id, name');
      if (catData) setCategories(catData);

      // Fetch Products
      const { data: prodData, error } = await supabase
        .schema('shop')
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(prodData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
         name: product.name,
         category_id: product.category_id,
         price: product.price,
         discounted_price: product.discounted_price,
         stock_quantity: product.stock_quantity,
         slug: product.slug,
         description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category_id: categories[0]?.id || '',
        price: 0,
        discounted_price: 0,
        stock_quantity: 0,
        slug: `PROD-${Date.now()}`, // Auto-generate slug/SKU base
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category_id: formData.category_id,
        // If discounted_price is 0 or empty, maybe null? keeping it simple
        price: Number(formData.price), // This is MRP
        discounted_price: Number(formData.discounted_price) || null, // Selling Price
        stock_quantity: Number(formData.stock_quantity),
        slug: formData.slug,
        description: formData.description
      };

      if (editingProduct) {
        const { error } = await supabase
          .schema('shop')
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .schema('shop')
          .from('products')
          .insert([payload]);
        if (error) throw error;
      }
      
      setIsModalOpen(false);
      fetchData(); // Refresh
    } catch (error) {
      alert('Error saving product: ' + (error as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase.schema('shop').from('products').delete().eq('id', id);
        if (error) throw error;
        fetchData();
      } catch (error) {
         console.error('Error deleting product:', error);
         alert('Error deleting product');
      }
    }
  };

  const getStockStatus = (qty: number) => {
     if (qty <= 0) return 'Out of Stock';
     if (qty < 10) return 'Low Stock';
     return 'In Stock';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-white bg-[#2d5a27] px-6 py-2 rounded-2xl shadow-lg">Product Inventory Management</h1>
        <button 
          onClick={() => openModal()}
          className="bg-[#2d5a27] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] hover:-translate-y-1 transition-all active:scale-95"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <input 
              type="text" 
              placeholder="Search products by name, SKU..." 
              className="w-full bg-gray-50 border-none rounded-2xl py-3 px-12 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 outline-none transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2d5a27] bg-[#f0f7f0]">All Categories</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50">
                <th className="px-8 py-4">Product Info</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price (MRP / Sale)</th>
                <th className="px-8 py-4">Inventory</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr><td colSpan={6} className="text-center py-10">Loading inventory...</td></tr>
              ) : products.length === 0 ? (
                 <tr><td colSpan={6} className="text-center py-10">No products found. Add one to get started.</td></tr>
              ) : products.map((product) => {
                const status = getStockStatus(product.stock_quantity);
                return (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#f0f7f0] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💊</div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 group-hover:text-[#2d5a27] transition-colors">{product.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: {product.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest px-3 py-1 bg-[#f0f7f0] rounded-full">
                        {product.categories?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900">₹{product.discounted_price || product.price}</span>
                      {product.discounted_price && (
                          <span className="text-[10px] text-gray-400 line-through font-bold uppercase tracking-widest">MRP: ₹{product.price}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-600">{product.stock_quantity} Units</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => openModal(product)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#2d5a27] hover:text-white transition-all shadow-sm">✏️</button>
                       <button onClick={() => handleDelete(product.id)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 overflow-hidden relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 text-2xl font-black transition-colors">×</button>
            <div className="space-y-8">
               <div className="space-y-2">
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Enter product details below</p>
               </div>

               <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 col-span-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Title</label>
                     <input 
                        required
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                     <select 
                        value={formData.category_id} 
                        onChange={e => setFormData({...formData, category_id: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium appearance-none"
                     >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SKU / Slug</label>
                     <input 
                        type="text" 
                        value={formData.slug} 
                        onChange={e => setFormData({...formData, slug: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white outline-none font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">MRP (₹)</label>
                     <input 
                        required
                        type="number" 
                        value={formData.price} 
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sale Price (₹)</label>
                     <input 
                        type="number" 
                        value={formData.discounted_price} 
                        onChange={e => setFormData({...formData, discounted_price: Number(e.target.value)})}
                        onBlur={e => {
                            // If empty or 0, maybe set to same as price or leave as 0 logic
                             if(!e.target.value) setFormData({...formData, discounted_price: 0})
                        }}
                        placeholder="Optional"
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Units</label>
                     <input 
                        required
                        type="number" 
                        value={formData.stock_quantity} 
                        onChange={e => setFormData({...formData, stock_quantity: Number(e.target.value)})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
                     />
                  </div>
                  
                  <div className="col-span-2 pt-4 flex gap-4">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                     <button type="submit" className="flex-1 bg-[#2d5a27] text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#2d5a27]/20 hover:bg-[#1f3f1b] transition-all">
                        {editingProduct ? 'Update Product' : 'Save Product'}
                     </button>
                  </div>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
