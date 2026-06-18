"use client";

import { useEffect } from "react";
import { CartList } from "@/components/CartList";
import { CartSummary } from "@/components/CartSummary";
import { EmptyCart } from "@/components/EmptyCart";
import { useCart } from "@/lib/useCart";

export default function CartPage() {
  const { cart, refreshCart } = useCart();

  // Force refresh when page loads to catch URL parameters
  useEffect(() => {
    const timer = setTimeout(() => {
      refreshCart();
    }, 100); // Small delay to ensure URL is processed

    return () => clearTimeout(timer);
  }, [refreshCart]);

  console.log("🛒 Cart Page: Current cart items:", cart.items);
  console.log("🛒 Cart Page: Item count:", cart.itemCount);

  if (cart.itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-2">Shopping Cart</h1>
        <p className="text-secondary-600 text-lg">
          {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartList items={cart.items} />
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
