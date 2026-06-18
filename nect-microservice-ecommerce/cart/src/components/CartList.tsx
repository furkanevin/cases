"use client";

import { CartItem as CartItemType } from "../../../shared/services/CartManager";
import { CartItem } from "./CartItem";

interface CartListProps {
  items: CartItemType[];
}

export function CartList({ items }: CartListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">Cart Items</h2>

      {items.map((item) => (
        <div key={item.id} className="animate-fade-in">
          <CartItem item={item} />
        </div>
      ))}
    </div>
  );
}
