import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  type?: "table" | "stats" | "charts";
  rows?: number;
  columns?: number;
  cards?: number;
}

export const TableSkeletonLoader = ({
  type = "table",
  rows = 12,
  columns = 4,
  cards = 4,
}: SkeletonLoaderProps) => {
  if (type === "stats") {
    return (
      <div className="space-y-4">
        <div className="px-0.5 space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={`stat-card-${i}`}
              className="border-0 shadow-md rounded-lg p-6 space-y-4 bg-gradient-to-br from-slate-50 to-slate-100"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "charts") {
    return (
      <div className="space-y-4">
        <div className="px-0.5">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`chart-${i}`}
              className="border rounded-lg p-6 bg-card space-y-4"
            >
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={`chart-line-${j}`}
                    className="flex items-center gap-4"
                  >
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-2 flex-1" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4 border-t">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={`legend-${j}`} className="h-4 w-24" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default:
  return (
    <div className="space-y-3">
      <div className="flex gap-4 p-4 border rounded-lg bg-muted/30">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-5 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={`row-${rowIdx}`} className="flex gap-4 p-4 border rounded-lg">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={`cell-${rowIdx}-${colIdx}`} className="h-6 flex-1" />
          ))}
        </div>
      ))}
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
