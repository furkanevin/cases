"use client";

import { ShoppingCart } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <ShoppingCart className="w-24 h-24 text-secondary-300 mx-auto" />
      </div>

      <h2 className="text-3xl font-bold text-secondary-900 mb-4">Your cart is empty</h2>

      <p className="text-secondary-600 text-lg mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
      </p>

      <a href="http://localhost:3000" className="btn-primary inline-flex items-center space-x-2 text-lg py-3 px-6">
        <span>Start Shopping</span>
      </a>
    </div>
  );
}

