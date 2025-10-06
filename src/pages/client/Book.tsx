import { use, useEffect, useMemo, useState } from "react";
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
} from "@/services/api";
import { Value } from "@radix-ui/react-select";

const PRICE_BOUNDS: [number, number] = [120_000, 1_500_000];
const YEAR_BOUNDS: [number, number] = [1999, 2025];

export default function BookPage() {
  const [searchInput, setSearchInput] = useState("");
  const [dataBook, setDataBook] = useState<IBook[]>();
  const [search, setSearch] = useState("");

  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<ILanguages[]>();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [appliedLanguage, setAppliedLanguage] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    1_500_000,
  ]);
  const [yearRange, setYearRange] = useState<[number, number]>([
    1999,
    YEAR_BOUNDS[1],
  ]);

  const [view, setView] = useState<"List" | "Kanban">("Kanban");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
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
      const res = await getFilterBookAPI(
        currentPage,
        yearRange,
        priceRange,
        search,
        sortBy,
        appliedGenres,
        appliedLanguage
      );
      if (res.data) {
        setDataBook(res.data.result);
        setCurrentPage(res.data.pagination.currentPage);
        setTotalPages(res.data.pagination.totalPages);
      }
    };
    fetchAllFilterBook();
  }, [
    currentPage,
    yearRange,
    priceRange,
    search,
    sortBy,
    appliedGenres,
    appliedLanguage,
  ]);
  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
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
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setAppliedGenres([]);
    setLanguages([]);
    setSelectedLanguage(null);
    setAppliedLanguage(null);
    setPriceRange([PRICE_BOUNDS[0], 1_500_000]);
    setYearRange([2005, YEAR_BOUNDS[1]]);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmitSearch}
        className="flex items-center justify-center gap-2 my-8"
      >
        <Input
          placeholder="input search text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[520px]"
        />
        <Button size="lg" type="submit">
          Search
        </Button>
        {searchInput && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSearchInput("")}
          >
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
            total={123}
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
  );
}
