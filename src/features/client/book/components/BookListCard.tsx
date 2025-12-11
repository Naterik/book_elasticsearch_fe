import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { placeholderImage } from "@/config";
import type { IBookElasticIndex } from "@/types";

export default function BookListCard({
  item,
}: {
  item: IBook | IBookElasticIndex;
}) {
  const navigate = useNavigate();
  const isAvailable = item.quantity - item.borrowed > 0;
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
        <div className="w-full sm:w-24 md:w-28 flex-shrink-0">
          <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-md">
            <img
              src={item.image || placeholderImage}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              draggable={false}
            />
          </AspectRatio>
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="mb-2 sm:mb-3">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 mb-1">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              by {item.authors?.name || "Unknown Author"}
            </p>
          </div>

          {item.shortDesc && (
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2 hidden sm:block">
              {item.shortDesc}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 text-xs">
            <div className="space-y-0.5">
              <p className="text-gray-500">Genre</p>
              <p className="font-medium text-gray-900 truncate">
                {item.genres?.[0]?.genres?.name || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500">Language</p>
              <p className="font-medium text-gray-900">{item.language}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500">Pages</p>
              <p className="font-medium text-gray-900">{item.pages}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-gray-500">Year</p>
              <p className="font-medium text-gray-900">
                {new Date(item.publishDate).getFullYear()}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0">
            <div className="flex items-center justify-between gap-2 flex-1">
              <Badge
                variant={isAvailable ? "default" : "destructive"}
                className="text-xs whitespace-nowrap"
              >
                {isAvailable ? "Available" : "Out of Stock"}
              </Badge>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {item.borrowed} borrowed
              </span>
            </div>
            <Button
              size="sm"
              className="w-full sm:w-auto text-xs sm:text-sm"
              onClick={() => navigate(`/book/${item.id}`)}
            >
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
