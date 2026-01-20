import { Spinner } from "@/components/ui/spinner";
import { Search } from "lucide-react";
import { useWindowWidth } from "@/hooks/useMobile";
import type { ViewCard } from "@/types";
import type { IBookElasticIndex } from "@/types/entities/book";
import { useVirtualizer } from "@tanstack/react-virtual";
import { memo, useEffect, useMemo, useRef } from "react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import BookListCard from "./BookListCard";

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
    overscan: 5,
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
      <div
        className={`grid gap-4 ${
          view === "List"
            ? "grid-cols-1"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (dataBook.length === 0) {
    return (
      <div className="flex h-[calc(100vh-250px)] min-h-[500px] flex-col items-center justify-center gap-4 rounded border bg-gray-50 text-center">
        <div className="rounded-full bg-slate-100 p-4">
          <Search className="h-8 w-8 text-slate-400" />
        </div>
        <div className="max-w-md px-4">
          <h3 className="text-lg font-semibold text-slate-900">
            No books found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            We couldn't find any books matching your search. Try checking for
            typos or using broader terms.
          </p>
        </div>
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
        className="h-[calc(100vh-250px)] min-h-[1100px] overflow-y-auto rounded border bg-gray-50"
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
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="absolute top-0 left-0 flex w-full items-center justify-center py-4"
                >
                  {isFetchingNextPage ? (
                    <div className="flex flex-col items-center gap-2 rounded py-4">
                      <Spinner />
                      <p className="text-sm text-gray-500">
                        Loading more books...
                      </p>
                    </div>
                  ) : hasNextPage ? (
                    <span className="text-sm text-gray-400">Load more</span>
                  ) : null}
                </div>
              );
            }

            if (!row) return null;

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={`grid px-4 ${view === "List" ? "py-2" : "py-3"}`}
                  style={{
                    gridTemplateColumns:
                      view === "List"
                        ? "1fr"
                        : `repeat(${cols}, minmax(0, 1fr)) `,
                    gap: view === "List" ? "1rem" : `1.5rem`,
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
