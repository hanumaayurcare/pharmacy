"use client";

import React from "react";
import { CartProvider } from "@/context/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="shop-layout min-h-screen bg-white flex flex-col">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
