import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";

const BookCarousel = ({ title, books, onBookClick }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 6;

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(books.length - itemsPerView, currentIndex + 1));
  };

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
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
                disabled={currentIndex >= books.length - itemsPerView}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {books.map((book: IBook) => (
              <div
                key={book.id}
                className="flex-shrink-0"
                style={{ width: `calc(${100 / itemsPerView}% - 14px)` }}
              >
                <Card
                  className="p-0 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 duration-300 cursor-pointer group"
                  onClick={() => onBookClick(book.id)}
                >
                  <AspectRatio ratio={3 / 4}>
                    <img
                      src={
                        book.image ||
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
                      }
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCarousel;
