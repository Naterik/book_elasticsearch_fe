import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getCompactItems } from "@/helper";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showOnSinglePage?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showOnSinglePage = false,
}: PaginationProps) {
  const goPrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const goNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const items = getCompactItems(currentPage, totalPages, siblingCount);
  if (totalPages <= 1 && !showOnSinglePage) {
    return null;
  }
  return (
    <div className="cursor-pointer my-4 flex justify-center">
      <div className="flex w-full items-center justify-between sm:hidden">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="rounded-md border px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="rounded-md border px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <PaginationRoot className="hidden sm:flex">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                goPrev();
              }}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {items.map((item, idx) =>
            item === "ELLIPSIS" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={item === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item !== currentPage) {
                      onPageChange(item);
                    }
                  }}
                >
                  {item}
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
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
}
