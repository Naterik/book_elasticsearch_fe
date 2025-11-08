import { set } from "zod";
import { useState, useEffect, useCallback } from "react";
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
  const [countFilter, setCountFilter] = useState<number>(0);

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
        console.error(err);
        toast.error("Error loading initial data");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

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

  const applyFilters = useCallback(() => {
    setAppliedGenres(selectedGenres);
    setAppliedLanguage(selectedLanguage);
    setAppliedPrice(priceRange);
    setAppliedYear(yearRange);
    setCountFilter(1);
    setCurrentPage(1);
  }, [selectedGenres, selectedLanguage, priceRange, yearRange]);

  const resetFilters = useCallback(() => {
    setCountFilter(0);
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
  }, []);

  const handleYearChange = useCallback((range: [number, number]) => {
    setYearRange(range);
  }, []);

  const handleLanguageChange = useCallback((lang: string | null) => {
    setSelectedLanguage(lang);
  }, []);

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
    applyFilters,
    resetFilters,
    isFilterOpen,
    setIsFilterOpen,
  };
};
