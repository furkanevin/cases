"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
}

const ProductGrid = memo(function ProductGrid({ products, title, className = "" }: ProductGridProps) {
  const t = useTranslations("products");

  if (!products || products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-medium text-muted-foreground">{t("noProducts")}</h3>
        <p className="text-sm text-muted-foreground mt-2">{t("noProductsSubtitle")}</p>
      </div>
    );
  }

  return (
    <section className={className}>
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4} // Prioritize loading for first 4 images
          />
        ))}
      </div>
    </section>
  );
});

export default ProductGrid;
