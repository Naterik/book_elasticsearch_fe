/**
 * Example: BookCopySearchComponent.tsx
 *
 * This is a practical example showing how to use the useBookCopySearch hook
 * with the getFilterBookCopyElasticAPI to search and filter book copies.
 *
 * Usage:
 * import BookCopySearchComponent from "@/features/admin/book-copy/components/BookCopySearchComponent";
 *
 * <BookCopySearchComponent />
 */

import { useBookCopySearch } from "@/features/admin/book-copy/hooks/useBookCopySearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface BookCopySearchComponentProps {
  onSelectBookCopy?: (bookCopy: IBookCopy) => void;
}

export const BookCopySearchComponent: React.FC<
  BookCopySearchComponentProps
> = ({ onSelectBookCopy }) => {
  const {
    dataBookCopies,
    error,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    searchInput,
    setSearchInput,
    resetFilters,
  } = useBookCopySearch();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "on_loan":
        return "bg-yellow-100 text-yellow-800";
      case "on_hold":
        return "bg-blue-100 text-blue-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full space-y-6 p-4">
      {/* Search and Filters Section */}
      <div className="space-y-4">
        {/* Search Input - Search by Location/Copy Number/Title/ISBN */}
        <div>
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by location, copy number, title, ISBN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="mt-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: "floor1", "BC874", "BRIDGE"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={resetFilters} variant="outline">
            Reset Search
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {/* Result Count */}
        <div className="text-sm text-gray-600">
          Found {totalItems} book copy(ies) - Page {currentPage} of {totalPages}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Loading book copies...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">
              Error loading book copies. Please try again.
            </p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && dataBookCopies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No book copies found</p>
          </div>
        )}

        {/* Book Copies List */}
        {!isLoading && !error && dataBookCopies.length > 0 && (
          <div className="space-y-3">
            {dataBookCopies.map((bookCopy) => (
              <div
                key={bookCopy.id}
                onClick={() => onSelectBookCopy?.(bookCopy)}
                className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                  onSelectBookCopy ? "cursor-pointer" : ""
                }`}
              >
                {/* Book Title */}
                <div className="font-semibold text-lg mb-2">
                  {bookCopy.books?.title || "Unknown Title"}
                </div>

                {/* Book Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                  <div>
                    <span className="text-gray-600">Copy Number:</span>
                    <code className="ml-2 bg-gray-100 px-2 py-1 rounded">
                      {bookCopy.copyNumber}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-600">ISBN:</span>
                    <span className="ml-2 font-mono">
                      {bookCopy.books?.isbn || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Year Published:</span>
                    <span className="ml-2">{bookCopy.year_published}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Book ID:</span>
                    <span className="ml-2">#{bookCopy.bookId}</span>
                  </div>
                </div>

                {/* Status and Location */}
                <div className="flex flex-wrap gap-3 mb-3 items-center">
                  <div>
                    <Badge
                      className={`${getStatusColor(bookCopy.status)} border-0`}
                    >
                      {bookCopy.status.charAt(0).toUpperCase() +
                        bookCopy.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    📍 {bookCopy.location}
                  </div>
                </div>

                {/* Book Description */}
                {bookCopy.books?.shortDesc && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {bookCopy.books.shortDesc}
                  </p>
                )}

                {/* Held by info */}
                {bookCopy.heldByUserId && (
                  <div className="mt-2 text-xs bg-blue-50 p-2 rounded text-blue-700">
                    Currently held by user #{bookCopy.heldByUserId}
                    {bookCopy.holdExpiryDate &&
                      ` until ${new Date(
                        bookCopy.holdExpiryDate
                      ).toLocaleDateString()}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {!isLoading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            variant="outline"
          >
            Previous
          </Button>

          <div className="text-sm font-medium px-4">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookCopySearchComponent;
