import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Layout from "@/components/layout/Layout";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(Number(id));

    return {
      title: `${product.title} - E-Shop`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Product Not Found - E-Shop",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  try {
    const product = await getProductById(Number(id));

    return (
      <Layout>
        <ProductDetail product={product} />
      </Layout>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
