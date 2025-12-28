import BookToolbar from "@/features/client/book/components/BookToolbar";
// import BookGrid from "@/features/client/book/components/BookGrid";
// import BookPagination from "@/features/client/book/components/BookPagination";
import BookFilter from "@/features/client/book/components/BookFilter";
import BookSelectedFilters from "@/features/client/book/components/BookSelectedFilters";
import { useBookFilter } from "@/features/client/book";
import SearchBar from "@/components/Search";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import BookGridVirtual from "@/features/client/book/components/BookGridVirtual";
import { useBookInfinite } from "@/features/client/book/hooks/useBookInfinite";

const BookPage = () => {
  const filterState = useBookFilter();
  const {
    genres,
    selectedGenres,
    toggleGenre,
    languages,
    selectedLanguage,
    handleLanguageChange,
    priceRange,
    PRICE_BOUNDS,
    handlePriceChange,
    yearRange,
    YEAR_BOUNDS,
    handleYearChange,
    countFilter,
    resetFilters,
    isFilterOpen,
    setIsFilterOpen,
    removeGenreFromSelected,
    removeLanguageFromSelected,
  } = filterState;

  const {
    dataBook,
    totalItems,
    totalPages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    searchInput,
    setSearchInput,
    view,
    setView,
    sortBy,
    setSortBy,
    fetchNextPage,
  } = useBookInfinite(filterState);

  // const {
  //   dataBook,
  //   currentPage,
  //   totalPages,
  //   totalItems,
  //   setCurrentPage,
  //   searchInput,
  //   setSearchInput,
  //   view,
  //   setView,
  //   sortBy,
  //   setSortBy,
  //   isPending,
  //   isLoading,
  // } = useBookData(filterState);

  const handleResetFilters = () => {
    resetFilters();
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto p-2 sm:py-3">
          <SearchBar
            initialQuery={searchInput}
            onSearch={setSearchInput}
            onClear={resetFilters}
          />
        </div>
      </div>

      <div className="container mx-auto px-8 py-2 sm:py-8">
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
                  genresAll={genres}
                  genresSelected={selectedGenres}
                  onToggleGenre={toggleGenre}
                  selectedLanguage={selectedLanguage}
                  onChangeLanguage={handleLanguageChange}
                  languagesAll={languages}
                  priceRange={priceRange}
                  priceBounds={PRICE_BOUNDS}
                  onPriceChange={handlePriceChange}
                  yearRange={yearRange}
                  yearBounds={YEAR_BOUNDS}
                  onYearChange={handleYearChange}
                  onReset={handleResetFilters}
                  sticky={false}
                  isCompact={true}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <aside className="hidden lg:block w-full lg:w-[280px] lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookFilter
                genresAll={genres}
                genresSelected={selectedGenres}
                onToggleGenre={toggleGenre}
                selectedLanguage={selectedLanguage}
                onChangeLanguage={handleLanguageChange}
                languagesAll={languages}
                priceRange={priceRange}
                priceBounds={PRICE_BOUNDS}
                onPriceChange={handlePriceChange}
                yearRange={yearRange}
                yearBounds={YEAR_BOUNDS}
                onYearChange={handleYearChange}
                onReset={resetFilters}
                sticky={true}
                isCompact={false}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <BookSelectedFilters
              selectedGenres={selectedGenres}
              selectedLanguage={selectedLanguage}
              onRemoveGenre={removeGenreFromSelected}
              onRemoveLanguage={removeLanguageFromSelected}
              onClearAll={resetFilters}
            />
            <BookToolbar
              view={view}
              onChangeView={setView}
              sortBy={sortBy}
              onChangeSort={setSortBy}
              countFilter={countFilter}
              total={totalItems}
            />

            <BookGridVirtual
              dataBook={dataBook}
              totalItems={totalItems}
              totalPages={totalPages}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              view={view}
              countFilter={countFilter}
            />

            {/* <BookGrid items={dataBook} view={view} isPending={isLoading} />
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
