import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Layout from "@/components/layout/Layout";
import ProductsPageClient from "@/components/product/ProductsPageClient";
import { getProducts } from "@/lib/api";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "All Products - E-Shop",
  description:
    "Browse our complete collection of quality products at great prices. Find electronics, clothing, jewelry and more.",
  openGraph: {
    title: "All Products - E-Shop",
    description:
      "Browse our complete collection of quality products at great prices. Find electronics, clothing, jewelry and more.",
  },
};

export default async function ProductsPage() {
  // Fetch all products
  const products = await getProducts();
  const t = await getTranslations("products");

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Client-side Products with Filters */}
        <ProductsPageClient products={products} />
      </div>
    </Layout>
  );
}
