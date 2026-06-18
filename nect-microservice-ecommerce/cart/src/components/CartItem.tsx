"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../../../shared/services/CartManager";
import { useCart } from "@/lib/useCart";
import toast from "react-hot-toast";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await handleRemove();
        return;
      }
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.id);
      toast.success(`${item.product.title} removed from cart`);
    } catch (error) {
      toast.error("Failed to remove item");
      console.error("Error removing item:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const totalPrice = item.product.price * item.quantity;

  return (
    <div className="card p-4 mb-4">
      <div className="flex items-start space-x-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={item.product.image}
            alt={item.product.title}
            fill
            className="object-contain rounded"
            sizes="80px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2">{item.product.title}</h3>

          <p className="text-sm text-secondary-600 mb-2 capitalize">{item.product.category}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="btn-secondary p-1 w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={item.quantity <= 1 || isLoading}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>

              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="btn-secondary p-1 w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-primary-600">{formatPrice(totalPrice)}</div>
              <div className="text-sm text-secondary-500">{formatPrice(item.product.price)} each</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleRemove}
          className="btn-danger p-2 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Remove item"
          disabled={isLoading}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
