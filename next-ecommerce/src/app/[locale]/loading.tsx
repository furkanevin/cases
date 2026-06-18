import Layout from "@/components/layout/Layout";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Layout>
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <Skeleton className="h-16 w-3/4 bg-white/20" />
            <Skeleton className="h-6 w-full bg-white/10" />
            <Skeleton className="h-6 w-2/3 bg-white/10" />
            <div className="flex items-center gap-x-6 pt-4">
              <Skeleton className="h-12 w-32 bg-white/20" />
              <Skeleton className="h-6 w-40 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section Skeleton */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <ProductGridSkeleton count={4} />

          <div className="text-center mt-12">
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </div>
      </section>

      {/* Categories Section Skeleton */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-10 w-72 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 text-center space-y-4">
                <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
