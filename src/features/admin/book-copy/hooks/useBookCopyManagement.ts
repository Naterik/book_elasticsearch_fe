import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { useTableLoadingState } from "@/hooks/use-table-loading";
import {
  getAllBookCopiesAdminAPI,
  getFilterBookCopyElasticAPI,
  deleteBookCopyAPI,
} from "@/features/admin/book-copy/services";
import { getBookCopyColumns } from "@/features/admin/book-copy/book-copy-columns";

export const useBookCopyManagement = () => {
  const { setIsLoading } = useCurrentApp();
  const { isInitialLoading, setIsInitialLoading } = useTableLoadingState();
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

  useEffect(() => {
    if (isSearching && searchQuery.trim()) {
      fetchBookCopiesWithSearch();
    } else {
      fetchBookCopies();
    }
  }, [currentPage, searchQuery, isSearching]);

  const fetchBookCopies = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBookCopiesAdminAPI(currentPage);

      if (response.data && response.data.result) {
        setBookCopies(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching book copies:", error);
      toast.error("Failed to fetch book copies");
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };
  const fetchBookCopiesWithSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getFilterBookCopyElasticAPI(
        currentPage,
        searchQuery
      );

      if (response.data && response.data.result) {
        setBookCopies(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        setBookCopies([]);
      }
    } catch (error) {
      console.error("Error searching book copies:", error);
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

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
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
    // useEffect will trigger and fetch all items
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
    isInitialLoading,

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
  };
};
