import Layout from "@/components/layout/Layout";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header Skeleton */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        <div className="space-y-8">
          {/* Filters Skeleton */}
          <div className="bg-background border-b pb-6 mb-8">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-10 w-full max-w-md" />
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Product Grid Skeleton */}
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </Layout>
  );
}
