import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getFilterBookCopyElasticAPI } from "@/services/admin";

export const useBookCopySearch = () => {
  // Book copies and results
  const [dataBookCopies, setDataBookCopies] = useState<IBookCopy[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Search
  const [searchInput, setSearchInput] = useState<string>("");

  // Fetch book copies with filters
  const fetchAllFilterBookCopy = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getFilterBookCopyElasticAPI(currentPage, searchInput);

      if (res.data && res.data.pagination && res.data.result) {
        const pagination = res.data.pagination;
        setDataBookCopies(res.data.result);
        setCurrentPage(pagination.currentPage);
        setTotalPages(pagination.totalPages);
        setTotalItems(pagination.totalItems);
        setError(false);
      } else {
        setError(true);
        setTotalItems(0);
        toast.error("No book copies found");
      }
    } catch (err) {
      console.error("Error fetching book copies:", err);
      setError(true);
      toast.error("Failed to fetch book copies");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchInput]);

  // Fetch book copies when filters change
  useEffect(() => {
    fetchAllFilterBookCopy();
  }, [fetchAllFilterBookCopy]);

  // Handle search
  const handleSearch = useCallback((keyword: string) => {
    setSearchInput(keyword);
    setCurrentPage(1);
  }, []);

  // Apply filters
  const applyFilters = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setError(false);
    setSearchInput("");
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    // Book copies
    dataBookCopies,
    error,
    isLoading,

    // Pagination
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage: handlePageChange,

    // Search
    searchInput,
    setSearchInput: handleSearch,

    // Actions
    applyFilters,
    resetFilters,
  };
};
