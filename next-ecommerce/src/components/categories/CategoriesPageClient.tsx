"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { capitalizeWords } from "@/lib/utils";

interface CategoriesPageClientProps {
  categories: string[];
}

export default function CategoriesPageClient({ categories }: CategoriesPageClientProps) {
  const locale = useLocale();
  const t = useTranslations("categories");

  const categoryIcons: Record<string, string> = {
    electronics: "📱",
    jewelery: "💎",
    "men's clothing": "👔",
    "women's clothing": "👗",
  };

  // Create localized category URL
  const createCategoryUrl = (category: string) => {
    const baseUrl = locale === "tr" ? "/tr/urunler" : "/en/products";
    return `${baseUrl}?category=${encodeURIComponent(category)}`;
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category}
          href={createCategoryUrl(category)}
          className="group relative rounded-xl border bg-card p-8 text-center hover:shadow-lg transition-all duration-300"
        >
          <div className="text-6xl mb-6">{categoryIcons[category] || "📦"}</div>
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {capitalizeWords(category)}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("browse", { category })}</p>
        </Link>
      ))}
    </div>
  );
}
