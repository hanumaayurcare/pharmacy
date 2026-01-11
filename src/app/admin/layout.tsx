"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";



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

  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = React.useState<boolean | null>(null);
  const [userRole, setUserRole] = React.useState<string>('Staff');

  React.useEffect(() => {
    async function checkRole() {
       try {
         console.log('Checking admin role...');
         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
         
         if (sessionError) {
           console.error('Session error:', sessionError);
           router.replace('/auth/login');
           return;
         }

         if (!session) {
           console.log('No session found, redirecting to login');
           window.location.href = '/auth/login';
           return;
         }

         console.log('Session found for user:', session.user.id);

         // Check role in context_memberships
         const { data: memberships, error: membershipError } = await supabase
            .from('context_memberships')
            .select('role')
            .eq('user_id', session.user.id);
            // .limit(1) - logic below handles if multiple rows exist, though typically explicit check is better

         if (membershipError) {
            console.error('Error fetching memberships:', membershipError);
            setAuthorized(false); 
            return;
         }

         console.log('Memberships fetched:', memberships);
         
         // Check if user has any admin role
         const isAdmin = memberships?.some(m => ['super_admin', 'admin'].includes(m.role));
         const isStaff = memberships?.some(m => m.role === 'staff');
         
         if (isAdmin) {
            console.log('User authorized as Admin/SuperAdmin');
            setAuthorized(true);
            setUserRole('Admin'); // Normalize to 'Admin' for UI
         } else if (isStaff) {
             console.log('User authorized as Staff');
             setAuthorized(true);
             setUserRole('Staff');
         } else {
            console.warn('Unauthorized role(s):', memberships?.map(m => m.role));
            router.replace('/');
         }
       } catch (err) {
         console.error('Unexpected error during role check:', err);
         setAuthorized(false);
       }
    }
    checkRole();
  }, [router]);

  // Role-based menu filtering
  const filteredMenuItems = menuItems.filter(item => {
    if (userRole === 'Staff') {
       // Staff cannot see Finance, Settings, or Reports
       return !['Finance', 'Settings', 'Reports', 'Users'].includes(item.name);
    }
    return true; // Admin sees everything
  });

  if (authorized === null) {

     return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
           <div className="w-12 h-12 border-4 border-[#2d5a27]/20 border-t-[#2d5a27] rounded-full animate-spin"></div>
        </div>
     );
  }

  return (

    <div className="admin-layout flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-[#f2f8f2] to-[#e6f2e6] border-r border-[#d6e6d6] flex-shrink-0 flex flex-col hidden lg:flex relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-[-5%] right-[-5%] w-64 h-64 bg-[#2d5a27] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"></div>
        
        <div className="p-8 relative z-10">
          <Link href="/admin" className="flex flex-col gap-1 group">
            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase leading-tight">
              Hanuma<span className="text-[#2d5a27] ml-1">Care</span>
            </span>
            <span className="text-[10px] font-black text-[#5a8a5a] uppercase tracking-[0.4em] ml-0.5">Control Center</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-1.5 relative z-10 overflow-y-auto no-scrollbar">
          {filteredMenuItems.map((item) => {

            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-white text-[#2d5a27] shadow-xl shadow-[#2d5a27]/10 border border-[#2d5a27]/20 scale-105' 
                    : 'text-[#5a8a5a]/70 hover:text-[#2d5a27] hover:bg-white/40 hover:scale-102'
                }`}
              >
                <span className={`text-xl transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto relative z-10">
          <div className="bg-[#deede0]/60 rounded-[2rem] p-5 border border-[#c8d8c8] backdrop-blur-md">
            <Link href="/" className="flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-[#5a8a5a] uppercase tracking-widest leading-none mb-1">Exit Point</span>
                <span className="text-[11px] font-black text-[#2d5a27]/80 group-hover:text-[#2d5a27] transition-colors">Back to Store</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white shadow-md border border-[#c8d8c8] flex items-center justify-center text-sm group-hover:translate-x-1 transition-transform">
                🚀
              </div>
            </Link>
          </div>
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
                <p className="text-[10px] text-[#2d5a27]/60 font-black uppercase tracking-widest mt-1">{userRole} Profile</p>
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
