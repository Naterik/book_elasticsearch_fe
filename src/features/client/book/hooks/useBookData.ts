import { useState, useEffect, useCallback, useTransition } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { getFilterBookElasticAPI } from "@/lib/api";
import type { FilterState, ViewCard } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { PRICE_BOUNDS, YEAR_BOUNDS } from "@/types/enums/book.enum";

export const useBookData = ({
  priceRange,
  yearRange,
  selectedGenres,
  selectedLanguage,
}: FilterState) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [dataBook, setDataBook] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("q") || ""
  );
  const [view, setView] = useState<ViewCard>("Kanban");
  const [sortBy, setSortBy] = useState<string>("newest");

  const debouncedSearch = useDebounce(searchInput, 500);
  const debouncedPrice = useDebounce(priceRange, 500);
  const debouncedYear = useDebounce(yearRange, 500);
  const fetchBookData = async () => {
    setIsLoading(true);
    try {
      const res = await getFilterBookElasticAPI(
        currentPage,
        debouncedYear[0] !== YEAR_BOUNDS[0] ||
          debouncedYear[1] !== YEAR_BOUNDS[1]
          ? debouncedYear
          : null,
        debouncedPrice[0] !== PRICE_BOUNDS[0] ||
          debouncedPrice[1] !== PRICE_BOUNDS[1]
          ? debouncedPrice
          : null,
        debouncedSearch,
        sortBy,
        selectedGenres,
        selectedLanguage
      );
      if (res.data !== null) {
        const pagination = res.data.pagination;
        startTransition(() => {
          setDataBook(res.data.result);
          setTotalPages(pagination.totalPages);
          setTotalItems(pagination.totalItems);
        });
      } else {
        setTotalItems(0);
        setDataBook([]);
      }
    } catch (err) {
      toast.error("Failed to fetch book data");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    setSearchInput(keyword);
  }, [searchParams]);

  useEffect(() => {
    fetchBookData();
  }, [
    currentPage,
    debouncedYear,
    debouncedPrice,
    debouncedSearch,
    sortBy,
    selectedGenres,
    selectedLanguage,
  ]);

  const handleSearch = useCallback(
    (keyword: string) => {
      setSearchInput(keyword);
      navigate(`/book?q=${encodeURIComponent(keyword)}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    dataBook,
    currentPage,
    totalPages,
    totalItems,
    isLoading,

    setCurrentPage: handlePageChange,
    searchInput,
    setSearchInput: handleSearch,
    view,
    setView,
    sortBy,
    setSortBy,

    isPending,
    startTransition,
  };
};
