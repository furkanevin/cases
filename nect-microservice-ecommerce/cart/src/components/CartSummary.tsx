"use client";

import { useCart } from "@/lib/useCart";
import toast from "react-hot-toast";

export function CartSummary() {
  const { cart, clearCart, isLoading } = useCart();

  const handleContinueShopping = () => {
    // Transfer cart data back to home via URL parameter
    const cartData = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(cartData);
    window.location.href = `http://localhost:3000?cart=${encodedCart}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Error clearing cart:", error);
    }
  };

  const handleCheckout = () => {
    toast.success("Checkout feature coming soon!");
  };

  const shipping = cart.total > 50 ? 0 : 5.99;
  const tax = cart.total * 0.08;
  const finalTotal = cart.total + shipping + tax;

  return (
    <div className="card p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-secondary-600">
            Subtotal ({cart.itemCount} {cart.itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold">{formatPrice(cart.total)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-secondary-600">Shipping</span>
          <span className="font-semibold">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-secondary-600">Tax</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>

        <hr className="border-secondary-200" />

        <div className="flex justify-between text-lg">
          <span className="font-bold text-secondary-900">Total</span>
          <span className="font-bold text-primary-600">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {shipping > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-800">Add {formatPrice(50 - cart.total)} more to get FREE shipping!</p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.itemCount === 0}
        >
          Proceed to Checkout
        </button>

        <button
          onClick={handleClearCart}
          className="w-full btn-secondary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.itemCount === 0 || isLoading}
        >
          {isLoading ? "Clearing..." : "Clear Cart"}
        </button>

        <button onClick={handleContinueShopping} className="w-full btn-secondary py-2 text-center">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
