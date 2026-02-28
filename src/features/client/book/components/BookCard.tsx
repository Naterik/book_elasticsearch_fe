import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IMAGE_DEFAULT, type IBookElasticIndex } from "@/types";
import BookService from "@client/book/services";
import { Book, BookOpen, TrendingUp } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("archive.org")) {
      if (urlObj.pathname.includes("/details/")) {
        return url.replace("/details/", "/embed/");
      }
    }
    return url;
  } catch (e) {
    return url;
  }
};

const BookCard = ({ item }: { item: IBook | IBookElasticIndex }) => {
  const navigate = useNavigate();
  const isAvailable = item.quantity - item.borrowed > 0;
  const hasDigital =
    item.digitalBook?.status && item.digitalBook.status !== "NO_VIEW";

  const handleShowDigital = async (e: React.MouseEvent, isbn: string) => {
    e.stopPropagation();
    try {
      const res = await BookService.showDigitalBook(isbn);
      if (res.data.status === "NO_VIEW") {
        navigate(`/book/${item.id}`);
      } else {
        const smartUrl = getEmbedUrl(res.data.previewUrl);
        window.open(smartUrl, "_blank");
      }
      if (res.message) {
        toast.error(res.message);
      }
    } catch (e) {
      toast.error("Cannot show the digital");
    }
  };

  const handleBorrow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/books/${item.id}`);
  };

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      imgRef.current.classList.remove("opacity-0");
    }
  }, []);

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col overflow-hidden bg-white p-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ring-1 ring-slate-200/50 hover:ring-blue-500/20"
      onClick={() => navigate(`/books/${item.id}`)}
    >
        <div className="relative overflow-hidden">
          <AspectRatio ratio={3 / 4} className="bg-slate-100/50">
            <img
              ref={imgRef}
              src={item.image || IMAGE_DEFAULT}
              alt={item.title}
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.classList.remove("opacity-0");
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== IMAGE_DEFAULT) {
                  target.src = IMAGE_DEFAULT;
                }
                target.classList.remove("opacity-0");
              }}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 opacity-0"
              draggable={false}
            />
          </AspectRatio>
          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2">
              <p
                className="line-clamp-1 truncate text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors"
                title={item.title}
              >
                {item.title}
              </p>
              <p className="mt-0.5 line-clamp-1 truncate text-xs font-medium text-slate-500">
                {item.authors?.name || "Unknown"}
              </p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide font-bold ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                      : "bg-rose-50 text-rose-600 ring-1 ring-rose-100"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-rose-500"}`} />
                  {isAvailable ? "Available" : "Out of Stock"}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                  <TrendingUp className="h-3 w-3" />
                  {item.borrowed}
                </span>
              </div>

              <div className="pt-1">
                {hasDigital ? (
                  <Button
                    className="h-8 w-full bg-blue-600/90 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow transition-all"
                    onClick={(e) => handleShowDigital(e, item.isbn)}
                  >
                    <BookOpen className="mr-2 h-3.5 w-3.5" />
                    Read Online
                  </Button>
                ) : (
                  <Button
                    className="h-8 w-full text-xs font-semibold hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    variant="outline"
                    onClick={handleBorrow}
                  >
                    <Book className="mr-2 h-3.5 w-3.5" />
                    Borrow
                  </Button>
                )}
              </div>
          </div>
        </div>
      </Card>
  );
};

export default BookCard;
