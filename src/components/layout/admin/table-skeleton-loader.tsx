import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonLoaderProps {
  rows?: number;
  columns?: number;
}

/**
 * Reusable skeleton loader for admin data tables
 * Shows loading state while fetching table data
 */
export const TableSkeletonLoader = ({
  rows = 12,
  columns = 4,
}: TableSkeletonLoaderProps) => {
  return (
    <div className="space-y-3">
      {/* Table Header Skeleton */}
      <div className="flex gap-4 p-4 border rounded-lg bg-muted/30">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-5 flex-1" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={`row-${rowIdx}`} className="flex gap-4 p-4 border rounded-lg">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={`cell-${rowIdx}-${colIdx}`} className="h-6 flex-1" />
          ))}
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex gap-2 justify-between items-center p-4 border rounded-lg bg-muted/30">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
};
