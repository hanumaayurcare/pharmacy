"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { Product } from "@/context/cart-context";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    category?: { name: string };
  };
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartProduct: Product = {
      id: product.id,
      title: product.name, // Map name to title
      price: product.price,
      image: product.image_url, // Map image_url to image
      category: product.category?.name || "General",
    };
    addToCart(cartProduct);
    // Optional: Add toast notification here
    alert("Added to cart!"); 
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={className || "flex-1 bg-[#1a3c1e] text-white py-4 md:py-5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#2d5a27]/20 hover:bg-[#2d5a27] hover:-translate-y-1 transition-all active:scale-95"}
    >
      Add to Cart
    </button>
  );
}
