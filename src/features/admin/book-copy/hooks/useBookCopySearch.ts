import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getFilterBookCopyElasticAPI } from "@/services/admin";

export const useBookCopySearch = () => {
  const [dataBookCopies, setDataBookCopies] = useState<IBookCopy[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
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

  useEffect(() => {
    fetchAllFilterBookCopy();
  }, [fetchAllFilterBookCopy]);

  const handleSearch = useCallback((keyword: string) => {
    setSearchInput(keyword);
    setCurrentPage(1);
  }, []);

  const applyFilters = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setError(false);
    setSearchInput("");
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    dataBookCopies,
    error,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage: handlePageChange,
    searchInput,
    setSearchInput: handleSearch,
    applyFilters,
    resetFilters,
  };
};
