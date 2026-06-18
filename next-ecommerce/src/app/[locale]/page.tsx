import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import { getFeaturedProducts } from "@/lib/api";

export default async function Home() {
  // Fetch featured products (first 4 products)
  const featuredProducts = await getFeaturedProducts();
  const t = await getTranslations("homepage");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t("title")}</h1>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90">{t("subtitle")}</p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  {t("shopNow")}
                </Button>
              </Link>
              <Link
                href="/categories"
                className="text-sm font-semibold leading-6 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
              >
                {t("browseCategories")} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("featuredProducts")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("featuredSubtitle")}</p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                {t("viewAllProducts")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("shopByCategory")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("categorySubtitle")}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Electronics", href: "/products" as const, icon: "📱" },
              { name: "Jewelry", href: "/products" as const, icon: "💎" },
              { name: "Men's Clothing", href: "/products" as const, icon: "👔" },
              { name: "Women's Clothing", href: "/products" as const, icon: "👗" },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative rounded-lg border bg-card p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
