import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import CartPageClient from "@/components/cart/CartPageClient";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Shopping Cart - E-Shop",
  description: "Review and manage your shopping cart items before checkout.",
  openGraph: {
    title: "Shopping Cart - E-Shop",
    description: "Review and manage your shopping cart items before checkout.",
  },
};

export default function CartPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartPageClient />
      </div>
    </Layout>
  );
}
