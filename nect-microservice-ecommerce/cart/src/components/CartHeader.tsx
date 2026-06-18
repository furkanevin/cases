"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, RefreshCw } from "lucide-react";
import { useCart } from "@/lib/useCart";

export function CartHeader() {
  const { cart, refreshCart } = useCart();

  const handleBackToStore = () => {
    // Transfer cart data back to home via URL parameter
    const cartData = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(cartData);
    window.location.href = `http://localhost:3000?cart=${encodedCart}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToStore}
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Store</span>
            </button>

            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-secondary-900">Shopping Cart</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={refreshCart}
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
              title="Refresh Cart"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>

            <span className="text-secondary-600">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
