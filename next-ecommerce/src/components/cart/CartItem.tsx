"use client";

import Image from "next/image";
import Link from "next/link";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { CartItem as CartItemType } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { formatPrice, truncateText } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Link href={`/products/${product.id}`}>
            <Image src={product.image} alt={product.title} fill className="object-cover rounded-lg" sizes="96px" />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2">
          <Link href={`/products/${product.id}`} className="block hover:text-primary transition-colors">
            <h3 className="font-semibold text-sm">{truncateText(product.title, 60)}</h3>
          </Link>

          <p className="text-sm text-muted-foreground">{product.category}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Quantity Controls */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <MinusIcon className="h-3 w-3" />
              </Button>

              <span className="w-12 text-center font-medium">{quantity}</span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="h-8 w-8"
              >
                <PlusIcon className="h-3 w-3" />
              </Button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-semibold">{formatPrice(product.price * quantity)}</div>
              {quantity > 1 && <div className="text-xs text-muted-foreground">{formatPrice(product.price)} each</div>}
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Remove from cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
