import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import CategoriesPageClient from "@/components/categories/CategoriesPageClient";
import { getCategories } from "@/lib/api";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Product Categories - E-Shop",
  description: "Browse our product categories: electronics, jewelry, men's clothing, women's clothing and more.",
  openGraph: {
    title: "Product Categories - E-Shop",
    description: "Browse our product categories: electronics, jewelry, men's clothing, women's clothing and more.",
  },
};

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Fetch all categories
  const categories = await getCategories();
  const t = await getTranslations("categories");

  // Create localized products URL
  const productsUrl = locale === "tr" ? "/tr/urunler" : "/en/products";

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Categories Grid */}
        <CategoriesPageClient categories={categories} />

        {/* All Products Link */}
        <div className="text-center mt-12">
          <Link
            href={productsUrl}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            {t("viewAllProducts")}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
