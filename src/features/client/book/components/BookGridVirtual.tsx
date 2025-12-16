import { useMemo, useRef, useEffect, memo } from "react";
import { Spinner } from "@/components/ui/spinner";
import BookCard from "./BookCard";
import BookListCard from "./BookListCard";
import type { IBookElasticIndex } from "@/types/entities/book";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { ViewCard } from "@/types";
import { useWindowWidth } from "@/hooks/useMobile";

interface BookGridVirtualProps {
  dataBook: IBookElasticIndex[];
  totalItems: number;
  totalPages: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  view: ViewCard;
  countFilter: number;
}

const BookGridVirtual = ({
  dataBook,
  totalItems,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  view,
  countFilter,
}: BookGridVirtualProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowWidth();

  const cols = useMemo(() => {
    if (view === "List") return 1;
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 640) return 3;
    return 2;
  }, [view, windowWidth]);

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < dataBook.length; i += cols) {
      result.push(dataBook.slice(i, i + cols));
    }
    return result;
  }, [dataBook, cols]);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (view === "List" ? 280 : 500),
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastVirtualItem = virtualItems[virtualItems.length - 1];

  // Infinite scroll trigger
  useEffect(() => {
    if (
      !isLoading &&
      !isFetchingNextPage &&
      lastVirtualItem &&
      lastVirtualItem.index >= rows.length - 1 &&
      hasNextPage
    ) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [
    lastVirtualItem,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    rows.length,
  ]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-250px)] min-h-[1100px] items-center justify-center rounded border bg-gray-50">
        <Spinner />
      </div>
    );
  }

  if (dataBook.length === 0) {
    return (
      <div className="flex h-[calc(100vh-250px)] min-h-[1100px] items-center justify-center rounded border bg-gray-50">
        <p className="text-gray-500">No books found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {countFilter === 0 && (
        <div className="flex items-center justify-between px-4">
          <p className="text-sm text-gray-600">
            Showing {dataBook.length} of {totalItems} books
          </p>
        </div>
      )}

      {/* Virtual Scrolling Container */}
      <div
        ref={parentRef}
        className="overflow-y-auto rounded border bg-gray-50 h-[calc(100vh-250px)] min-h-[1100px]"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            const isLoaderRow = virtualRow.index > rows.length - 1;

            if (isLoaderRow) {
              return (
                <div
                  key={virtualRow.key}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="flex items-center justify-center absolute top-0 left-0 w-full "
                >
                  {isFetchingNextPage ? (
                    <div className="flex flex-col items-center gap-2 py-4 rounded">
                      <Spinner />
                      <p className="text-sm text-gray-500">
                        Loading more books...
                      </p>
                    </div>
                  ) : hasNextPage ? (
                    <span className="text-gray-400 text-sm">Load more</span>
                  ) : null}
                </div>
              );
            }

            if (!row) return null;

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className="p-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      view === "List"
                        ? "1fr"
                        : `repeat(${cols}, minmax(0, 1fr))`,
                    gap: "1rem",
                  }}
                >
                  {row.map((book) =>
                    view === "List" ? (
                      <BookListCard key={book.id} item={book} />
                    ) : (
                      <BookCard key={book.id} item={book} />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default memo(BookGridVirtual);
