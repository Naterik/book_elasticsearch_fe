import BookToolbar from "@/features/client/book/components/BookToolbar";
import BookGrid from "@/features/client/book/components/BookGrid";
import BookPagination from "@/features/client/book/components/BookPagination";
import BookFilter from "@/features/client/book/components/BookFilter";
import { useBookSearch } from "@/features/client/book/hooks/useBookSearch";
import SearchBar from "@/components/Search";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const BookPage = () => {
  const {
    dataBook,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    searchInput,
    setSearchInput,
    genres,
    selectedGenres,
    toggleGenre,
    languages,
    selectedLanguage,
    setSelectedLanguage,
    priceRange,
    PRICE_BOUNDS,
    setPriceRange,
    yearRange,
    YEAR_BOUNDS,
    setYearRange,
    view,
    setView,
    sortBy,
    setSortBy,
    countFilter,
    applyFilters,
    resetFilters,
    isFilterOpen,
    setIsFilterOpen,
  } = useBookSearch();

  const handleApplyFilters = () => {
    applyFilters();
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    resetFilters();
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Search Bar - Full Width */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <SearchBar
            initialQuery={searchInput}
            onSearch={setSearchInput}
            onClear={resetFilters}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Mobile & Tablet Filter Button - Hidden on Desktop (lg+) */}
        <div className="lg:hidden mb-4 flex gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className=" sm:w-auto gap-2 text-xs sm:text-sm"
                size="sm"
              >
                <Filter className="h-4 w-4" />
                Filters
                {countFilter > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded">
                    {countFilter}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 sm:w-96 p-0 overflow-y-auto"
            >
              <SheetHeader className="px-4 sm:px-6 py-4 border-b sticky top-0 bg-white z-50">
                <SheetTitle className="text-base sm:text-lg">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 sm:px-6 py-4">
                <BookFilter
                  genresAll={genres as any}
                  genresSelected={selectedGenres}
                  onToggleGenre={toggleGenre}
                  selectedLanguage={selectedLanguage}
                  onChangeLanguage={setSelectedLanguage}
                  languagesAll={languages}
                  priceRange={priceRange}
                  priceBounds={PRICE_BOUNDS}
                  onPriceChange={setPriceRange}
                  yearRange={yearRange}
                  yearBounds={YEAR_BOUNDS}
                  onYearChange={setYearRange}
                  onApply={handleApplyFilters}
                  onReset={handleResetFilters}
                  sticky={false}
                  isCompact={true}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop + Mobile Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Sidebar Filter - Only on lg (1024px+) */}
          <aside className="hidden lg:block w-full lg:w-[280px] lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookFilter
                genresAll={genres as any}
                genresSelected={selectedGenres}
                onToggleGenre={toggleGenre}
                selectedLanguage={selectedLanguage}
                onChangeLanguage={setSelectedLanguage}
                languagesAll={languages}
                priceRange={priceRange}
                priceBounds={PRICE_BOUNDS}
                onPriceChange={setPriceRange}
                yearRange={yearRange}
                yearBounds={YEAR_BOUNDS}
                onYearChange={setYearRange}
                onApply={applyFilters}
                onReset={resetFilters}
                sticky={true}
                isCompact={false}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <BookToolbar
              view={view}
              onChangeView={setView}
              sortBy={sortBy}
              onChangeSort={setSortBy}
              countFilter={countFilter}
              total={totalItems}
            />
            <BookGrid items={dataBook} view={view} />
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
