"use client";
import React, { useState } from "react";


interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  sku: string;
  description?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', title: 'Ashwagandha Gold', category: 'Vitamins', price: 499, oldPrice: 650, stock: 45, status: 'In Stock', sku: 'HAN-PRO-001' },
    { id: '2', title: 'Triphala Churna', category: 'Digestive', price: 299, oldPrice: 350, stock: 5, status: 'Low Stock', sku: 'HAN-PRO-002' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    category: 'Vitamins',
    price: 0,
    oldPrice: 0,
    stock: 0,
    sku: '',
  });

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        category: 'Vitamins',
        price: 0,
        oldPrice: 0,
        stock: 0,
        sku: `HAN-PRO-00${products.length + 1}`,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p));
    } else {
      const newProduct = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        status: (formData.stock || 0) > 10 ? 'In Stock' : (formData.stock || 0) > 0 ? 'Low Stock' : 'Out of Stock'
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
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
             <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50">Drafts</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50">
                <th className="px-8 py-4">Product Info</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price / MRP</th>
                <th className="px-8 py-4">Inventory</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#f0f7f0] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💊</div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 group-hover:text-[#2d5a27] transition-colors">{product.title}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: {product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-[#2d5a27] uppercase tracking-widest px-3 py-1 bg-[#f0f7f0] rounded-full">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900">₹{product.price}</span>
                      <span className="text-[10px] text-gray-400 line-through font-bold uppercase tracking-widest">MRP: ₹{product.oldPrice}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-600">{product.stock} Units</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      product.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => openModal(product)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#2d5a27] hover:text-white transition-all shadow-sm">✏️</button>
                       <button onClick={() => handleDelete(product.id)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
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
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                     <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium appearance-none"
                     >
                        <option>Vitamins</option>
                        <option>Immunity</option>
                        <option>Digestive</option>
                        <option>Personal Care</option>
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SKU Code</label>
                     <input 
                        type="text" 
                        value={formData.sku} 
                        onChange={e => setFormData({...formData, sku: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white outline-none font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sale Price (₹)</label>
                     <input 
                        required
                        type="number" 
                        value={formData.price} 
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#2d5a27]/5 focus:bg-white focus:border-[#2d5a27] outline-none transition-all font-medium" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Units</label>
                     <input 
                        required
                        type="number" 
                        value={formData.stock} 
                        onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
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
