"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../../../shared/services/CartManager";
import { useCart } from "@/lib/useCart";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await addToCart(product);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding to cart:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
              {product.title}
            </h3>

            <p className="text-secondary-600 text-sm mb-3 line-clamp-3">{product.description}</p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-secondary-600 ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
              <span className="text-xs text-secondary-500 ml-auto capitalize">{product.category}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-primary-600">{formatPrice(product.price)}</span>

            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2 text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
