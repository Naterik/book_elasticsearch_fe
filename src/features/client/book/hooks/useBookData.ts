import { useState, useEffect, useCallback, useTransition } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { getFilterBookElasticAPI } from "@/services/api";
import type { FilterState } from "@/types";

export const useBookData = (filterState: FilterState) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPending] = useTransition();

  const [dataBook, setDataBook] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [view, setView] = useState<"List" | "Kanban">("Kanban");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    setSearchInput(keyword);
  }, [searchParams]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await getFilterBookElasticAPI(
          currentPage,
          filterState.yearRange[0] !== 1960 || filterState.yearRange[1] !== 2025
            ? filterState.yearRange
            : null,
          filterState.priceRange[0] !== 120_000 ||
            filterState.priceRange[1] !== 1_500_000
            ? filterState.priceRange
            : null,
          searchInput,
          sortBy,
          filterState.selectedGenres,
          filterState.selectedLanguage
        );
        if (res.data !== null) {
          const pagination = res.data.pagination;
          setDataBook(res.data.result);
          setCurrentPage(pagination.currentPage);
          setTotalPages(pagination.totalPages);
          setTotalItems(pagination.totalItems);
        } else {
          setTotalItems(0);
          setDataBook([]);
        }
      } catch (err) {
        toast.error("Failed to fetch book data");
      }
    };

    fetchBookData();
  }, [
    currentPage,
    filterState.yearRange,
    filterState.priceRange,
    searchInput,
    sortBy,
    filterState.selectedGenres,
    filterState.selectedLanguage,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterState.selectedGenres,
    filterState.selectedLanguage,
    filterState.priceRange,
    filterState.yearRange,
    searchInput,
    sortBy,
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

    setCurrentPage: handlePageChange,
    searchInput,
    setSearchInput: handleSearch,
    view,
    setView,
    sortBy,
    setSortBy,

    isPending,
  };
};
