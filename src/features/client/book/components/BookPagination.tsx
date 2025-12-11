import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getCompactItems } from "@/helper";
import { memo } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // mặc định 1
};

const BookPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: Props) => {
  const goPrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const goNext = () =>
    currentPage < totalPages && onPageChange(currentPage + 1);
  const items = getCompactItems(currentPage, totalPages, siblingCount);

  if (totalPages <= 1) return null;

  return (
    <div className="my-6 sm:my-8 flex justify-center cursor-pointer">
      <div className="flex w-full items-center justify-between sm:hidden px-2">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="rounded-md border px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          ← Prev
        </button>
        <span className="text-xs sm:text-sm font-medium text-muted-foreground">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="rounded-md border px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          Next →
        </button>
      </div>

      <Pagination className="hidden sm:flex">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                goPrev();
              }}
              aria-disabled={currentPage === 1}
              className={`text-xs sm:text-sm ${
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer hover:bg-gray-100"
              }`}
            />
          </PaginationItem>

          {items.map((it, idx) =>
            it === "ELLIPSIS" ? (
              <PaginationItem key={`e-${idx}`}>
                <PaginationEllipsis className="text-xs sm:text-sm" />
              </PaginationItem>
            ) : (
              <PaginationItem key={it}>
                <PaginationLink
                  isActive={it === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    if (it !== currentPage) onPageChange(it);
                  }}
                  className="text-xs sm:text-sm"
                >
                  {it}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                goNext();
              }}
              aria-disabled={currentPage === totalPages}
              className={`text-xs sm:text-sm ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer hover:bg-gray-100"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default memo(BookPagination);
