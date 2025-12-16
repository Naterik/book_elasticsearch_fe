import type { IBookElasticResponse } from "@/types/entities/book";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { getFilterBookElasticAPI } from "@/lib/api";
import { PRICE_BOUNDS, ViewCard, YEAR_BOUNDS, type FilterState } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBookInfinite = ({
  priceRange,
  yearRange,
  selectedGenres,
  selectedLanguage,
}: FilterState) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [view, setView] = useState<ViewCard>(
    (searchParams.get("view") as ViewCard) || "Kanban"
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sort") || "newest"
  );

  const debouncedSearch = useDebounce(searchInput, 500);
  const debouncedPrice = useDebounce(priceRange, 500);
  const debouncedYear = useDebounce(yearRange, 500);

  // Sync view, sort, search to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let hasChanges = false;

    // View
    const currentView = params.get("view");
    if (view !== "Kanban") {
      if (currentView !== view) {
        params.set("view", view);
        hasChanges = true;
      }
    } else if (currentView) {
      params.delete("view");
      hasChanges = true;
    }

    // Sort
    const currentSort = params.get("sort");
    if (sortBy !== "newest") {
      if (currentSort !== sortBy) {
        params.set("sort", sortBy);
        hasChanges = true;
      }
    } else if (currentSort) {
      params.delete("sort");
      hasChanges = true;
    }

    // Search
    const currentQ = params.get("q");
    if (searchInput) {
      if (currentQ !== searchInput) {
        params.set("q", searchInput);
        hasChanges = true;
      }
    } else if (currentQ) {
      params.delete("q");
      hasChanges = true;
    }

    if (hasChanges) {
      setSearchParams(params, { replace: true });
    }
  }, [view, sortBy, searchInput, searchParams, setSearchParams]);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "books-infinite",
      debouncedSearch,
      debouncedYear,
      debouncedPrice,
      sortBy,
      selectedGenres,
      selectedLanguage,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getFilterBookElasticAPI(
        pageParam,
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
      return res.data as IBookElasticResponse;
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const allRows = data?.pages.flatMap((page) => page.result) ?? [];
  const totalItems = data?.pages[0]?.pagination.totalItems ?? 0;
  const totalPages = data?.pages[0]?.pagination.totalPages ?? 1;

  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    if (keyword !== searchInput) {
      setSearchInput(keyword);
    }
  }, [searchParams]);

  const handleSearch = useCallback((keyword: string) => {
    setSearchInput(keyword);
  }, []);

  return {
    dataBook: allRows,
    totalItems,
    totalPages,
    isLoading: status === "pending",
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    searchInput,
    setSearchInput: handleSearch,
    view,
    setView,
    sortBy,
    setSortBy,
    fetchNextPage,
    refetch,
  };
};
