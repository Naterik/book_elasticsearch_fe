import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookCardSkeleton() {
  return (
    <Card className="p-0 overflow-hidden bg-white">
      <AspectRatio ratio={3 / 4}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <div className="p-2 sm:p-3 bg-white">
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-1/2 mt-0.5" />

        <div className="flex items-center justify-between mt-2 gap-1">
          <Skeleton className="h-5 w-16" />

          <Skeleton className="h-5 w-10" />
        </div>
      </div>
    </Card>
  );
}
