import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  getAllGenreAPI,
  getAllLanguagesElasticAPI,
  getFilterBookElasticAPI,
} from "@/services/api";

const PRICE_BOUNDS: [number, number] = [120_000, 1_500_000];
const YEAR_BOUNDS: [number, number] = [1960, 2025];

export const useBookSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  // Books and results
  const [dataBook, setDataBook] = useState<IBook[]>([]);
  const [error, setError] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Search
  const [searchInput, setSearchInput] = useState(initialQuery);

  // Genres
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [appliedGenres, setAppliedGenres] = useState<string[]>([]);

  // Languages
  const [languages, setLanguages] = useState<ILanguages[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [appliedLanguage, setAppliedLanguage] = useState<string | null>(null);

  // Price
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    PRICE_BOUNDS[1],
  ]);
  const [appliedPrice, setAppliedPrice] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    PRICE_BOUNDS[1],
  ]);

  // Year
  const [yearRange, setYearRange] = useState<[number, number]>([
    YEAR_BOUNDS[0],
    YEAR_BOUNDS[1],
  ]);
  const [appliedYear, setAppliedYear] = useState<[number, number]>([
    YEAR_BOUNDS[0],
    YEAR_BOUNDS[1],
  ]);

  // View and sort
  const [view, setView] = useState<"List" | "Kanban">("Kanban");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [countFilter, setCountFilter] = useState<number>(0);

  // Update search input from URL
  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    setSearchInput(keyword);
  }, [searchParams]);

  // Load initial genres and languages
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

  // Fetch books with filters
  const fetchAllFilterBook = useCallback(async () => {
    try {
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
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(true);
    }
  }, [
    currentPage,
    appliedYear,
    appliedPrice,
    searchInput,
    sortBy,
    appliedGenres,
    appliedLanguage,
  ]);

  // Fetch books when filters change
  useEffect(() => {
    fetchAllFilterBook();
  }, [fetchAllFilterBook]);

  // Handle search
  const handleSearch = useCallback(
    (keyword: string) => {
      setSearchInput(keyword);
      navigate(`/book?q=${encodeURIComponent(keyword)}`);
      setCurrentPage(1);
    },
    [navigate]
  );

  // Toggle genre selection
  const toggleGenre = useCallback((value: string, checked: boolean) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  }, []);

  // Apply filters
  const applyFilters = useCallback(() => {
    setAppliedGenres(selectedGenres);
    setAppliedLanguage(selectedLanguage);
    setAppliedPrice(priceRange);
    setAppliedYear(yearRange);
    setCountFilter(1);
    setCurrentPage(1);
  }, [selectedGenres, selectedLanguage, priceRange, yearRange]);

  // Reset all filters
  const resetFilters = useCallback(() => {
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
  }, [navigate]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Handle price range change
  const handlePriceChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
  }, []);

  // Handle year range change
  const handleYearChange = useCallback((range: [number, number]) => {
    setYearRange(range);
  }, []);

  // Handle language change
  const handleLanguageChange = useCallback((lang: string | null) => {
    setSelectedLanguage(lang);
  }, []);

  return {
    // Books
    dataBook,
    error,

    // Pagination
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage: handlePageChange,

    // Search
    searchInput,
    setSearchInput: handleSearch,

    // Genres
    genres,
    selectedGenres,
    appliedGenres,
    toggleGenre,

    // Languages
    languages,
    selectedLanguage,
    appliedLanguage,
    setSelectedLanguage: handleLanguageChange,

    // Price
    priceRange,
    appliedPrice,
    PRICE_BOUNDS,
    setPriceRange: handlePriceChange,

    // Year
    yearRange,
    appliedYear,
    YEAR_BOUNDS,
    setYearRange: handleYearChange,

    // View and sort
    view,
    setView,
    sortBy,
    setSortBy,
    countFilter,

    // Filters
    applyFilters,
    resetFilters,
  };
};
