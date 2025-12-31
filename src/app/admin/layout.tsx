import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Products', icon: '💊', path: '/admin/products' },
    { name: 'Orders', icon: '📦', path: '/admin/orders' },
    { name: 'Users', icon: '👥', path: '/admin/users' },
    { name: 'Services', icon: '👨‍⚕️', path: '/admin/services' },
    { name: 'Finance', icon: '💰', path: '/admin/finance' },
    { name: 'Promotions', icon: '🎟️', path: '/admin/promotions' },
    { name: 'Reports', icon: '📈', path: '/admin/reports' },
    { name: 'Settings', icon: '⚙️', path: '/admin/settings' },
  ];

  return (
    <div className="admin-layout flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e2e8f0] flex-shrink-0 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-[#e2e8f0]">
          <Link href="/admin" className="font-bold text-xl text-[#2d5a27] tracking-tight">HANUMA <span className="text-gray-400 font-medium text-sm">ADMIN</span></Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-[#f0f7f0] hover:text-[#2d5a27] transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#e2e8f0]">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800">
            <span>🏠</span> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 shadow-sm">
          <button className="lg:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div className="flex-1 px-4 max-w-xl hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg py-1.5 px-10 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none"
              />
              <svg className="absolute left-3 top-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-1 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-xs font-bold">BS</div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-none">Budda Seshu</p>
                <p className="text-[10px] text-gray-500 mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
