import { use, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookToolbar from "@/features/client/book/components/BookToolbar";
import BookGrid from "@/features/client/book/components/BookGrid";
import BookPagination from "@/features/client/book/components/BookPagination";
import BookFilter from "@/features/client/book/components/BookFilter";
import {
  getAllBookAPI,
  getAllGenreAPI,
  getAllLanguagesElasticAPI,
  getFilterBookAPI,
  getFilterBookElasticAPI,
} from "@/services/api";

const PRICE_BOUNDS: [number, number] = [120_000, 1_500_000];
const YEAR_BOUNDS: [number, number] = [1960, 2025];

export default function BookPage() {
  const [dataBook, setDataBook] = useState<IBook[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]);

  const [languages, setLanguages] = useState<ILanguages[]>();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [appliedLanguage, setAppliedLanguage] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    PRICE_BOUNDS[1],
  ]);
  const [appliedPrice, setAppliedPrice] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    PRICE_BOUNDS[1],
  ]);
  const [yearRange, setYearRange] = useState<[number, number]>([
    YEAR_BOUNDS[0],
    YEAR_BOUNDS[1],
  ]);
  const [appliedYear, setAppliedYear] = useState<[number, number]>([
    YEAR_BOUNDS[0],
    YEAR_BOUNDS[1],
  ]);

  const [view, setView] = useState<"List" | "Kanban">("Kanban");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [countFilter, setCountFilter] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const fetchAllBook = async () => {
    const res = await getAllBookAPI(1);

    if (res.data) {
      const result = res?.data?.result;
      const pagination = res.data.pagination;
      setDataBook(result);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    }
  };
  useEffect(() => {
    const fetchAllGenre = async () => {
      const res = await getAllGenreAPI();
      if (res.data) {
        setGenres(res.data);
      }
    };
    const fetchAllLanguages = async () => {
      const res = await getAllLanguagesElasticAPI();
      if (res.data) {
        setLanguages(res.data);
      }
    };
    fetchAllBook();
    fetchAllGenre();
    fetchAllLanguages();
  }, []);
  useEffect(() => {
    const fetchAllFilterBook = async () => {
      const res = await getFilterBookElasticAPI(
        currentPage,
        appliedYear,
        appliedPrice,
        searchInput,
        sortBy,
        appliedGenres,
        appliedLanguage
      );
      if (res.data !== null) {
        const pagination = res.data.pagination;
        setDataBook(res.data.result);
        setCurrentPage(pagination.currentPage);
        setTotalPages(pagination.totalPages);
        setTotalItems(pagination.totalItems);
        setError(false);
      } else {
        setError(true);
        setTotalItems(0);
      }
    };
    fetchAllFilterBook();
  }, [
    currentPage,
    appliedYear,
    appliedPrice,
    searchInput,
    sortBy,
    appliedGenres,
    appliedLanguage,
  ]);
  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setCountFilter(1);
    setCurrentPage(1);
  };

  const toggleGenre = (value: any, checked: boolean) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  };
  const applyFilters = () => {
    setAppliedGenres(selectedGenres);
    setAppliedLanguage(selectedLanguage);
    setAppliedPrice(priceRange);
    setAppliedYear(yearRange);
    setCountFilter(1);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setCountFilter(0);
    setError(false);
    setSearchInput("");
    setSearch("");
    setSelectedGenres([]);
    setAppliedGenres([]);
    setSelectedLanguage(null);
    setAppliedLanguage(null);
    setAppliedPrice([PRICE_BOUNDS[0], PRICE_BOUNDS[1]]);
    setPriceRange([PRICE_BOUNDS[0], PRICE_BOUNDS[1]]);
    setYearRange([YEAR_BOUNDS[0], YEAR_BOUNDS[1]]);
    setAppliedYear([YEAR_BOUNDS[0], YEAR_BOUNDS[1]]);
    setCurrentPage(1);
  };
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmitSearch}
        className="flex items-center justify-center gap-2 my-8"
      >
        <Input
          placeholder="Input search text"
          value={searchInput}
          onChange={(e) => (setSearchInput(e.target.value), setCountFilter(1))}
          className="w-[520px]"
        />
        <Button size="lg" type="submit">
          Search
        </Button>
        {searchInput && (
          <Button type="button" variant="ghost" onClick={resetFilters}>
            Clear
          </Button>
        )}
      </form>

      <div className="flex gap-8">
        <BookFilter
          genresAll={genres as any}
          genresSelected={selectedGenres}
          onToggleGenre={toggleGenre}
          selectedLanguage={selectedLanguage}
          onChangeLanguage={setSelectedLanguage}
          languagesAll={languages!}
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
}
