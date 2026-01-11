import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IMAGE_DEFAULT, type IBookElasticIndex } from "@/types";
import BookService from "@client/book/services";
import { Book, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
        window.open(res.data.previewUrl, "_blank");
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
    navigate(`/book/${item.id}`);
  };

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col overflow-hidden bg-white p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={() => navigate(`/book/${item.id}`)}
    >
      <div className="relative">
        <AspectRatio ratio={3 / 4}>
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

      <div className="flex flex-1 flex-col p-3">
        <p
          className="line-clamp-1 truncate text-sm font-semibold text-gray-900"
          title={item.title}
        >
          {item.title}
        </p>
        <p className="mt-1 line-clamp-1 truncate text-xs text-gray-500">
          {item.authors?.name || "Unknown"}
        </p>
        <div className="mt-2 flex items-center justify-between gap-1">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              isAvailable
                ? "bg-blue-50 text-blue-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {isAvailable ? "Available" : "Out of Stock"}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <TrendingUp className="h-3 w-3" />
            {item.borrowed}
          </span>
        </div>

        <div className="mt-auto pt-3">
          {hasDigital ? (
            <Button
              className="h-8 w-full bg-blue-600 text-xs text-white hover:cursor-alias hover:bg-blue-800 hover:text-gray-100"
              onClick={(e) => handleShowDigital(e, item.isbn)}
            >
              <BookOpen className="mr-2 h-3.5 w-3.5" />
              Read Online
            </Button>
          ) : (
            <Button
              className="h-8 w-full text-xs"
              variant="outline"
              onClick={handleBorrow}
            >
              <Book className="mr-2 h-3.5 w-3.5" />
              Borrow
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
