"use client";

import { useParams } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetProductQuery } from "@/lib/api";

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const { data: product, isLoading, error } = useGetProductQuery(productId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-secondary-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}

