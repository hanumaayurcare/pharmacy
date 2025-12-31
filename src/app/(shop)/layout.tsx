import React from "react";
import Link from "next/link";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shop-layout min-h-screen bg-[#f8fdf8]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e0f0e0] px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <Link
            href="/"
            className="font-bold text-xl text-[#2d5a27] tracking-tight"
          >
            HANUMA
          </Link>
        </div>

        <div className="flex-1 mx-4 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicines, wellness..."
              className="w-full bg-[#f0f7f0] border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-[#2d5a27] transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#d42c2c] text-white text-[10px] font-bold px-1.5 rounded-full">
              0
            </span>
          </Link>
          <Link href="/profile" className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </header>

      {/* Delivery Bar */}
      <div className="bg-[#2d5a27] text-white px-4 py-2 text-xs flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>
          Delivery at: <b>Home - 500001</b>
        </span>
      </div>

      <main className="pb-20">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0f0e0] px-6 py-2 flex items-center justify-between md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[#2d5a27]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          href="/categories"
          className="flex flex-col items-center gap-1 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span className="text-[10px] font-medium">Categories</span>
        </Link>
        <Link
          href="/health-services"
          className="flex flex-col items-center gap-1 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span className="text-[10px] font-medium">Services</span>
        </Link>
        <Link
          href="/orders"
          className="flex flex-col items-center gap-1 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="text-[10px] font-medium">Orders</span>
        </Link>
      </nav>

      <footer className="bg-white border-t border-[#e0f0e0] p-10 hidden md:block mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold text-[#2d5a27] text-lg mb-4">HANUMA</h3>
            <p className="text-gray-500 leading-relaxed">
              Your trusted Ayurvedic pharmacy and diagnostic partner. Dedicated
              to your wellness since 1995.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/support">Contact Us</Link>
              </li>
              <li>
                <Link href="/blog">Health Blog</Link>
              </li>
              <li>
                <Link href="/support/faq">FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/support/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/support/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/support/shipping">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/support/returns">Return Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Download App</h4>
            <div className="flex gap-4">
              <div className="w-32 h-10 bg-black rounded flex items-center justify-center text-white">
                App Store
              </div>
              <div className="w-32 h-10 bg-black rounded flex items-center justify-center text-white">
                Play Store
              </div>
            </div>
            <div className="mt-6 flex gap-4">{/* Add social icons here */}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
