import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
  useRef,
} from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  getAllGenreAPI,
  getAllLanguagesElasticAPI,
  getFilterBookElasticAPI,
} from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";

const PRICE_BOUNDS: [number, number] = [120_000, 1_500_000];
const YEAR_BOUNDS: [number, number] = [1960, 2025];

export const useBookSearch = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { setIsLoading } = useCurrentApp();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [isPending] = useTransition();

  const [dataBook, setDataBook] = useState<IBook[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [searchInput, setSearchInput] = useState(initialQuery);

  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]);

  const [languages, setLanguages] = useState<ILanguages[]>([]);
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

  // Debounce timers cho price/year
  const priceDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const yearDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (priceDebounceTimer.current) clearTimeout(priceDebounceTimer.current);
      if (yearDebounceTimer.current) clearTimeout(yearDebounceTimer.current);
    };
  }, []);

  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    setSearchInput(keyword);
  }, [searchParams]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
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
        toast.error("Error loading initial data");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const isFilterPriceApplied = useMemo(() => {
    const priceChanged =
      appliedPrice[0] !== PRICE_BOUNDS[0] ||
      appliedPrice[1] !== PRICE_BOUNDS[1];
    return priceChanged;
  }, [appliedPrice]);

  const isFilterYearApplied = useMemo(() => {
    const yearChanged =
      appliedYear[0] !== YEAR_BOUNDS[0] || appliedYear[1] !== YEAR_BOUNDS[1];
    return yearChanged;
  }, [appliedYear]);

  const countFilter = useMemo(() => {
    let count = 0;
    if (appliedGenres.length > 0) count += appliedGenres.length;
    if (appliedLanguage) count += 1;
    if (isFilterPriceApplied) count += 1;
    if (isFilterYearApplied) count += 1;
    return count;
  }, [
    appliedGenres,
    appliedLanguage,
    isFilterPriceApplied,
    isFilterYearApplied,
  ]);

  const fetchAllFilterBook = useCallback(async () => {
    try {
      const res = await getFilterBookElasticAPI(
        currentPage,
        isFilterYearApplied ? appliedYear : null,
        isFilterPriceApplied ? appliedPrice : null,
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
      } else {
        setTotalItems(0);
      }
    } catch (err) {
      toast.error("Failed to fetch book data");
    }
  }, [
    currentPage,
    appliedYear,
    appliedPrice,
    searchInput,
    sortBy,
    appliedGenres,
    appliedLanguage,
    isFilterYearApplied,
    isFilterPriceApplied,
  ]);

  useEffect(() => {
    fetchAllFilterBook();
  }, [fetchAllFilterBook]);

  const handleSearch = useCallback(
    (keyword: string) => {
      setSearchInput(keyword);
      navigate(`/book?q=${encodeURIComponent(keyword)}`);
      setCurrentPage(1);
    },
    [navigate]
  );

  const toggleGenre = useCallback((value: string, checked: boolean) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  }, []);

  const resetFilters = useCallback(() => {
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
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePriceChange = useCallback((range: [number, number]) => {
    setPriceRange(range);

    // Clear previous timer
    if (priceDebounceTimer.current) {
      clearTimeout(priceDebounceTimer.current);
    }

    // Set new timer - gọi API sau 500ms khi user dừng drag
    priceDebounceTimer.current = setTimeout(() => {
      setAppliedPrice(range);
      setCurrentPage(1);
    }, 300);
  }, []);

  const handleYearChange = useCallback((range: [number, number]) => {
    setYearRange(range);

    // Clear previous timer
    if (yearDebounceTimer.current) {
      clearTimeout(yearDebounceTimer.current);
    }

    // Set new timer - gọi API sau 500ms khi user dừng drag
    yearDebounceTimer.current = setTimeout(() => {
      setAppliedYear(range);
      setCurrentPage(1);
    }, 300);
  }, []);

  const handleLanguageChange = useCallback((lang: string | null) => {
    setSelectedLanguage(lang);
  }, []);

  const removeGenreFromSelected = useCallback((genre: string) => {
    setSelectedGenres((prev) => prev.filter((g) => g !== genre));
  }, []);

  const removeLanguageFromSelected = useCallback(() => {
    setSelectedLanguage(null);
  }, []);

  // Auto-fetch when genres change
  useEffect(() => {
    setAppliedGenres(selectedGenres);
    setCurrentPage(1);
  }, [selectedGenres]);

  // Auto-fetch when language changes
  useEffect(() => {
    setAppliedLanguage(selectedLanguage);
    setCurrentPage(1);
  }, [selectedLanguage]);

  return {
    dataBook,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage: handlePageChange,
    searchInput,
    setSearchInput: handleSearch,
    genres,
    selectedGenres,
    appliedGenres,
    toggleGenre,
    languages,
    selectedLanguage,
    appliedLanguage,
    setSelectedLanguage: handleLanguageChange,
    priceRange,
    appliedPrice,
    PRICE_BOUNDS,
    setPriceRange: handlePriceChange,
    yearRange,
    appliedYear,
    YEAR_BOUNDS,
    setYearRange: handleYearChange,
    view,
    setView,
    sortBy,
    setSortBy,
    countFilter,
    resetFilters,
    isFilterOpen,
    setIsFilterOpen,
    removeGenreFromSelected,
    removeLanguageFromSelected,
    isPending,
  };
};
