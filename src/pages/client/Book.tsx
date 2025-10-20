import BookToolbar from "@/features/client/book/components/BookToolbar";
import BookGrid from "@/features/client/book/components/BookGrid";
import BookPagination from "@/features/client/book/components/BookPagination";
import BookFilter from "@/features/client/book/components/BookFilter";
import { useBookSearch } from "@/features/client/book/hooks/useBookSearch";
import SearchBar from "@/components/Search";

const BookPage = () => {
  const {
    dataBook,
    error,
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
  } = useBookSearch();

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        initialQuery={searchInput}
        onSearch={setSearchInput}
        onClear={resetFilters}
      />

      <div className="flex gap-8 mt-8">
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
          sticky
        />

        <div className="flex-1 min-w-0">
          <BookToolbar
            view={view}
            onChangeView={setView}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            countFilter={countFilter}
            total={totalItems}
          />
          <BookGrid items={dataBook} view={view} error={error} />
          <BookPagination
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
