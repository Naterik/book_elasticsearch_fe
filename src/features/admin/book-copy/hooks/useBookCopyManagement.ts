import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
// import { useCurrentApp } from "@/app/providers/app.context";
import {
  getAllBookCopiesAdminAPI,
  getFilterBookCopyElasticAPI,
  deleteBookCopyAPI,
  getCountBookCopiesByStatusAPI,
  getCountBookCopiesYearPublishedAPI,
} from "@/features/admin/book-copy/services";
import { getBookCopyColumns } from "@/features/admin/book-copy/book-copy-columns";

export const useBookCopyManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookCopies, setBookCopies] = useState<IBookCopy[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedBookCopy, setSelectedBookCopy] = useState<IBookCopy | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [bookCopyToDelete, setBookCopyToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [yearPublished, setYearPublished] = useState<number>(1901);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dataCountYearPublished, setDataCountYearPublished] =
    useState<IAggregations | null>(null);
  const [dataCountStatus, setDataCountStatus] = useState<IAggregations | null>(
    null
  );

  useEffect(() => {
    if (isSearching) {
      fetchBookCopiesWithSearch();
    } else {
      fetchBookCopies();
      fetchCountYearPublished();
      fetchCountStatus();
    }
  }, [currentPage, searchQuery, isSearching, yearPublished, statusFilter]);

  const fetchBookCopies = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBookCopiesAdminAPI(currentPage);

      if (response.data && response.data.result) {
        const paginationRes = response.data.pagination;
        setBookCopies(response.data.result);
        setTotalPages(paginationRes.totalPages);
        setTotalItems(paginationRes.totalItems);
        setPageSize(paginationRes.pageSize);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch book copies");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCountYearPublished = async () => {
    try {
      const resYear = await getCountBookCopiesYearPublishedAPI();
      if (resYear.data) {
        setDataCountYearPublished(resYear.data);
      }
    } catch (error) {
      console.error("Failed to fetch year published count", error);
      toast.error("Failed to fetch year published count");
    }
  };

  const fetchCountStatus = async () => {
    try {
      const resStatus = await getCountBookCopiesByStatusAPI();
      if (resStatus.data) {
        setDataCountStatus(resStatus.data);
      }
    } catch (error) {
      toast.error("Failed to fetch status count");
    }
  };

  const fetchBookCopiesWithSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getFilterBookCopyElasticAPI(
        currentPage,
        searchQuery,
        yearPublished,
        statusFilter
      );

      if (response.data && response.data.result) {
        const paginationRes = response.data.pagination;
        setBookCopies(response.data.result);
        setTotalPages(paginationRes.totalPages);
        setTotalItems(paginationRes.totalItems);
        setPageSize(paginationRes.pageSize);
      } else {
        toast.error(response.message);
        setBookCopies([]);
      }
    } catch (error) {
      toast.error("Failed to search book copies");
      setBookCopies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBookCopy = () => {
    setSelectedBookCopy(null);
    setIsFormDialogOpen(true);
  };

  const handleEditBookCopy = (bookCopy: IBookCopy) => {
    setSelectedBookCopy(bookCopy);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (bookCopyId: number) => {
    setBookCopyToDelete(bookCopyId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookCopyToDelete) return;
    setIsLoading(true);
    try {
      const response = await deleteBookCopyAPI(bookCopyToDelete);

      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Book copy deleted successfully");
        fetchBookCopies();
      }
    } catch (error) {
      console.error("Error deleting book copy:", error);
      toast.error("Failed to delete book copy");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setBookCopyToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedBookCopy(null);
    fetchBookCopies();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Handle search input change - trigger Elasticsearch search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      // Start searching
      setIsSearching(true);
      setCurrentPage(1); // Reset to page 1 on new search
    } else {
      // Clear search - show all items
      setIsSearching(false);
      setCurrentPage(1);
    }
  };

  // Clear search and show all
  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleYearPublishedChange = (year: number) => {
    setYearPublished(year);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const columns = useMemo(
    () => getBookCopyColumns(handleEditBookCopy, handleDeleteClick),
    []
  );

  return {
    bookCopies,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,

    dataCountYearPublished,
    dataCountStatus,
    setDataCountStatus,
    setDataCountYearPublished,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedBookCopy,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateBookCopy,
    handleEditBookCopy,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,

    // Search handlers
    searchQuery,
    handleSearchChange,
    handleClearSearch,
    isSearching,
    yearPublished,
    statusFilter,
    handleYearPublishedChange,
    handleStatusFilterChange,
  };
};
