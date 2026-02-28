import { useDebounce } from "@/hooks/useDebounce";
import { getBookCopyColumns } from "@admin/book-copy/book-copy-columns";
import BookCopyService from "@admin/book-copy/services";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export const useBookCopyManagement = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedBookCopy, setSelectedBookCopy] = useState<IBookCopy | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [bookCopyToDelete, setBookCopyToDelete] = useState<number | null>(null);
  // Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [yearPublished, setYearPublished] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: bookCopiesData, isLoading } = useQuery({
    queryKey: [
      "book-copies",
      {
        page: currentPage,
        pageSize: +pageSize,
        search: debouncedSearchQuery,
        year: yearPublished,
        status: statusFilter,
      },
    ],
    queryFn: async () =>
      await BookCopyService.getFilterBookCopy(
        currentPage,
        debouncedSearchQuery,
        yearPublished,
        statusFilter
      ),
    placeholderData: keepPreviousData,
  });

  const { data: aggregationsData } = useQuery({
    queryKey: ["book-copy-aggregations"],
    queryFn: async () => {
      const [resStatus, resYear] = await Promise.all([
        BookCopyService.getCountBookCopiesByStatus(),
        BookCopyService.getCountBookCopiesYearPublished(),
      ]);
      return {
        resStatus: resStatus.data,
        resYear: resYear.data,
      };
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const resBookCopyData = bookCopiesData?.data;
  const bookCopies = resBookCopyData?.result || [];
  const totalPages = resBookCopyData?.pagination.totalPages || 1;
  const totalItems = resBookCopyData?.pagination.totalItems || 0;
  const dataCountYearPublished = aggregationsData?.resYear || [];
  const dataCountStatus = aggregationsData?.resStatus || [];

  const deleteMutation = useMutation({
    mutationFn: (bookCopyId: number) =>
      BookCopyService.deleteBookCopy(bookCopyId),
    onSuccess: () => {
      toast.success("Book copy deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["book-copies"] });
      queryClient.invalidateQueries({ queryKey: ["book-copy-aggregations"] });
      setIsDeleteDialogOpen(false);
      setBookCopyToDelete(null);
    },
    onError: () => {
      toast.error("Failed to delete book copy. Please try again.");
    },
  });

  const handleCreateBookCopy = useCallback(() => {
    setSelectedBookCopy(null);
    setIsFormDialogOpen(true);
  }, []);

  const handleEditBookCopy = useCallback((bookCopy: IBookCopy) => {
    setSelectedBookCopy(bookCopy);
    setIsFormDialogOpen(true);
  }, []);
  const handleDeleteClick = useCallback((bookCopyId: number) => {
    setBookCopyToDelete(bookCopyId);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = () => {
    deleteMutation.mutate(bookCopyToDelete!);
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedBookCopy(null);
    queryClient.invalidateQueries({ queryKey: ["book-copies"] });
    queryClient.invalidateQueries({ queryKey: ["book-copy-aggregations"] });
  };

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search input change - trigger Elasticsearch search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Clear search and show all
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handleYearPublishedChange = useCallback((year: number | null) => {
    setYearPublished(year);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setYearPublished(null);
    setStatusFilter("");
    setCurrentPage(1);
  }, []);

  const columns = useMemo(
    () => getBookCopyColumns(handleEditBookCopy, handleDeleteClick),
    [handleEditBookCopy, handleDeleteClick]
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
    handlePageSizeChange,

    // Search handlers
    handlePageChange,
    searchQuery,
    handleSearchChange,
    handleClearSearch,
    yearPublished,
    statusFilter,
    handleYearPublishedChange,
    handleStatusFilterChange,
    handleClearFilters,
  };
};
