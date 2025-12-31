import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IMAGE_DEFAULT } from "@/types";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const BookCarousel = ({ title, books, onBookClick }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  const getItemsPerView = (width: number): number => {
    switch (true) {
      case width < 640:
        return 2;
      case width < 1024:
        return 3;
      case width < 1280:
        return 4;
      default:
        return 5;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = books.length - itemsPerView;

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + itemsPerView, maxIndex));
  };

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {books.length > itemsPerView && (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden ">
          <div
            className=" flex transition-transform duration-300 gap-5"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {books.map((book: IBook) => (
              <Card
                className="p-0 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 duration-300 cursor-pointer group flex-none w-[calc(50%-10px)] md:w-[calc(33.333%-13.33px)] lg:w-[calc(25%-15px)] xl:w-[calc(20%-16px)]"
                onClick={() => onBookClick(book.id)}
                key={book.id}
              >
                <AspectRatio ratio={3 / 4}>
                  <img
                    src={book.image || IMAGE_DEFAULT}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </AspectRatio>
                <div className="p-3 bg-white">
                  <p className="text-sm font-semibold truncate text-gray-900">
                    {book.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {book.authors?.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-600 font-medium">
                      {book.quantity - book.borrowed > 0
                        ? "Available"
                        : "Out of Stock"}
                    </span>
                    <span className="text-xs text-gray-400">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      {book.borrowed}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCarousel;
