import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IMAGE_DEFAULT, type IBookElasticIndex } from "@/types";
import BookService from "@client/book/services";
import { BookOpen, Eye, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function BookListCard({
  item,
}: {
  item: IBook | IBookElasticIndex;
}) {
  const navigate = useNavigate();
  const isAvailable = item.quantity - item.borrowed > 0;

  const handleShowDigital = async (e: React.MouseEvent, isbn: string) => {
    e.stopPropagation();
    try {
      const res = await BookService.showDigitalBook(isbn);
      if (res.data.status === "NO_VIEW") {
        navigate(`/book/${item.id}`);
      } else {
        window.open(res.data.previewUrl, "_blank");
      }
      if (res.message) {
        toast.error(res.message);
      }
    } catch (e) {
      toast.error("Cannot show the digital");
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
      onClick={() => navigate(`/book/${item.id}`)}
    >
      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-4">
        <div className="w-full flex-shrink-0 sm:w-24 md:w-28">
          <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-md">
            <img
              src={item.image || IMAGE_DEFAULT}
              alt={item.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== IMAGE_DEFAULT) {
                  target.src = IMAGE_DEFAULT;
                }
              }}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              draggable={false}
            />
          </AspectRatio>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="mb-2 sm:mb-3">
            <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-base">
              {item.title}
            </h3>
            <p className="truncate text-xs text-gray-600 sm:text-sm">
              by {item.authors?.name || "Unknown Author"}
            </p>
          </div>

          {item.shortDesc && (
            <p className="mb-2 line-clamp-2 hidden text-xs text-gray-500 sm:block sm:text-sm">
              {item.shortDesc}
            </p>
          )}

          <div className="mb-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 sm:gap-3">
            <div className="space-y-0.5">
              <p className="text-gray-500">Genre</p>
              <p className="truncate font-medium text-gray-900">
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

          <div className="mt-auto flex flex-col justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Badge
                variant={isAvailable ? "default" : "destructive"}
                className={`px-2.5 py-0.5 text-xs whitespace-nowrap shadow-none ${
                  isAvailable
                    ? "border-emerald-200 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "border-red-200 bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {isAvailable ? "Available" : "Out of Stock"}
              </Badge>

              <div className="hidden h-4 w-px bg-slate-200 sm:block" />

              <span className="flex items-center gap-1.5 rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                {item.borrowed} borrowed
              </span>
            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              {item.digitalBook?.status &&
                item.digitalBook.status !== "NO_VIEW" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs font-medium shadow-sm sm:flex-none sm:text-sm"
                    onClick={(e) => handleShowDigital(e, item.isbn)}
                  >
                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                    Read Online
                  </Button>
                )}
              <Button
                size="sm"
                className="w-full flex-1 text-xs font-medium shadow-sm sm:w-auto sm:flex-none sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/book/${item.id}`);
                }}
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
