import { use, useEffect, useMemo, useRef, useState } from "react";
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
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import SearchBar from "@/components/Search";

const PRICE_BOUNDS: [number, number] = [120_000, 1_500_000];
const YEAR_BOUNDS: [number, number] = [1960, 2025];

const BookPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [dataBook, setDataBook] = useState<IBook[]>([]);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]);
  const [view, setView] = useState<"List" | "Kanban">("Kanban");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [countFilter, setCountFilter] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
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

  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    setSearchInput(keyword);
  }, [searchParams]);
  useEffect(() => {
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

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [allGenres, allLanguages] = await Promise.all([
          getAllGenreAPI(),
          getAllLanguagesElasticAPI(),
        ]);
        if (allGenres.data && allLanguages.data) {
          setGenres(allGenres.data);
          setLanguages(allLanguages.data);
        } else {
          toast.error("Failed to fetch initial data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading initial data");
      }
    };

    loadInitialData();
  }, []);
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

  const handleSearch = (keyword: string) => {
    setSearchInput(keyword);
    navigate(`/book?q=${encodeURIComponent(keyword)}`);
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
    setSelectedGenres([]);
    navigate("/book");
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
      <SearchBar
        initialQuery={initialQuery}
        onSearch={handleSearch}
        onClear={resetFilters}
      />

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
};

export default BookPage;
