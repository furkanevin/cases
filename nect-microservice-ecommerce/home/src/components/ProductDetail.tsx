"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Product } from "../../../shared/services/CartManager";
import { useCart } from "@/lib/useCart";
import toast from "react-hot-toast";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { cart, addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding to cart:", error);
    }
  };

  const handleViewCart = () => {
    // Transfer cart data via URL parameter
    const currentCart = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(currentCart);
    window.location.href = `http://localhost:3001?cart=${encodedCart}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full mb-2 capitalize">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-secondary-900 mb-4">{product.title}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold text-secondary-700 ml-1">{product.rating.rate}</span>
                <span className="text-secondary-500 ml-1">({product.rating.count} reviews)</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary-600 mb-6">{formatPrice(product.price)}</div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">Description</h2>
            <p className="text-secondary-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
            </button>

            <button
              onClick={handleViewCart}
              className="w-full btn-secondary flex items-center justify-center space-x-2 py-3 text-lg"
            >
              <span>View Cart</span>
            </button>
          </div>

          <div className="bg-secondary-50 rounded-lg p-4">
            <h3 className="font-semibold text-secondary-900 mb-2">Product Information</h3>
            <div className="space-y-1 text-sm text-secondary-600">
              <p>
                <span className="font-medium">Category:</span> {product.category}
              </p>
              <p>
                <span className="font-medium">Rating:</span> {product.rating.rate}/5
              </p>
              <p>
                <span className="font-medium">Reviews:</span> {product.rating.count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
