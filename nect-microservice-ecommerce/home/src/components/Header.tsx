"use client";

import Link from "next/link";
import { ShoppingCart, Home } from "lucide-react";
import { useCart } from "@/lib/useCart";

export function Header() {
  const { cart } = useCart();

  const handleCartClick = () => {
    // Transfer cart data via URL parameter
    const cartData = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(cartData);
    window.location.href = `http://localhost:3001?cart=${encodedCart}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-secondary-900">E-Commerce Store</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-secondary-600 hover:text-primary-600 transition-colors duration-200">
              Products
            </Link>

            <button
              onClick={handleCartClick}
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Cart</span>
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
