import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full" />

      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-4 w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between">
        {/* Price skeleton */}
        <Skeleton className="h-6 w-20" />

        {/* Button skeleton */}
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
