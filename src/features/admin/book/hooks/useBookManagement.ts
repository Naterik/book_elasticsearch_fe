import { useDebounce } from "@/hooks/useDebounce";
import { getBookColumns } from "@admin/book/book-columns";
import BookService from "@admin/book/services";
import GenreService from "@admin/genre/services";
import type { AdminBookSearchParams, IBook } from "@/types/entities/book";
import type { ExpandedState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const useBookManagement = () => {
    // Consolidated Filter State
  const [filters, setFilters] = useState<AdminBookSearchParams>({
    page: 1,
    limit: 12,
    q: "",
  });
  const debouncedFilters = useDebounce(filters, 500);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  
  // Dynamic Filter Options

  // Dynamic Filter Options
  const [availableLanguages, setAvailableLanguages] = useState<{ label: string; value: string; count?: number }[]>([]);
  const [availableGenres, setAvailableGenres] = useState<{ label: string; value: string }[]>([]);

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);

  // Filter Handlers
  const handleFilterChange = (key: keyof AdminBookSearchParams, value: any) => {
    setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: 1, // Reset to page 1 on filter change
    }));
  };

  const handleResetFilters = () => {
      setFilters({
          page: 1,
          limit: 12,
          q: "",
          stock: undefined,
          language: undefined,
          genreIds: undefined,
      });
  };

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const hasActiveFilters = !!(
        debouncedFilters.q ||
        debouncedFilters.stock ||
        debouncedFilters.language ||
        debouncedFilters.genreIds ||
        debouncedFilters.authorIds
      );

      let response;
      if (hasActiveFilters) {
        response = await BookService.searchAdminBooks(debouncedFilters);
      } else {
        response = await BookService.getAllBooks(debouncedFilters.page);
      }

      if (response.data) {
           let resultBooks: IBook[] = [];
           let total = 0;
           let pages = 1;

           if (hasActiveFilters) {
               // Search Response Structure
               const data = response.data as import("@/types/entities/book").AdminBookResponse;
               resultBooks = data.result || [];
               total = data.pagination?.totalItems || 0;
               pages = data.pagination?.totalPages || 1;
               

           } else {
               // Standard List Response Structure
               const data = response.data as import("@/types/api/response.types").IModelPaginate<IBook>;
               resultBooks = data.result || [];
               total = data.pagination?.totalItems || 0;
               pages = data.pagination?.totalPages || 1;
               
               // Restore full language list if coming back to main view
               fetchLanguages();
               
               // Restore full language list if coming back to main view
               // We only do this if we suspect it might be stale/filtered.
               // Simplest is to just re-fetch or use a separate "allLanguages" state?
               // Re-fetching is safer for now to sync with DB.

           }

           setBooks(resultBooks);
           setTotalItems(total);
           setTotalPages(pages);

           // Auto-expand logic for Barcode Direct Match (Only in search mode)
           if (hasActiveFilters && resultBooks.length === 1 && resultBooks[0].isDirectBarcodeMatch) {
              setExpanded({ [resultBooks[0].id]: true });
              toast.success("Barcode matched! Showing copies.");
           } else {
             setExpanded({});
           }
      } else if (response.message) {
        toast.error(response.message);
      }
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  }, [debouncedFilters, filters.limit]);





  const fetchLanguages = useCallback(async () => {
      try {
          const res = await BookService.getAllLanguagesElastic();
          if (res.data) {
             const data = res.data as any; 
             let langs: { label: string; value: string; count?: number }[] = [];
             
             if (Array.isArray(data)) {
                 langs = data.map((item: any) => ({
                     label: item.key,
                     value: item.key,
                     count: item.doc_count
                 }));
             } else if (data.languages && !Array.isArray(data.languages)) {
                 langs = Object.entries(data.languages).map(([key, count]) => ({
                    label: key,
                    value: key,
                    count: typeof count === 'number' ? count : 0
                 }));
             } else if (data.languages && Array.isArray(data.languages)) {
                  langs = data.languages.map((item: any) => ({
                     label: item.key,
                     value: item.key,
                     count: item.doc_count
                 }));
             } else {
                 langs = Object.entries(data).map(([key, count]) => ({
                    label: key,
                    value: key,
                    count: typeof count === 'number' ? count : 0
                 }));
             }
             setAvailableLanguages(langs);
          }
      } catch (error) {
          console.error("Failed to fetch languages", error);
      }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const res = await GenreService.getAllGenres();
      if (res.data) {
        setAvailableGenres(
          res.data.map((g) => ({ label: g.name, value: g.id.toString() }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  }, []);

  useEffect(() => {
    fetchLanguages();
    fetchGenres();
    fetchBooks();
  }, [fetchBooks, fetchLanguages, fetchGenres]);

  const handleCreateBook = () => {
    setSelectedBook(null);
    setIsFormDialogOpen(true);
  };

  const handleEditBook = (book: IBook) => {
    setSelectedBook(book);
    setIsFormDialogOpen(true);
  };

  const handleViewBook = (bookId: number) => {
    setSelectedBookId(bookId);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteClick = (bookId: number) => {
    setBookToDelete(bookId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setIsLoading(true);
    try {
      const response = await BookService.deleteBook(bookToDelete);

      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Book deleted successfully");
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedBook(null);
    fetchBooks();
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setFilters(prev => ({ ...prev, limit: size, page: 1 }));
  };

  const columns = useMemo(
    () => getBookColumns(handleEditBook, handleDeleteClick, handleViewBook),
    []
  );

  return {
    books,
    currentPage: filters.page || 1,
    totalPages,
    totalItems,
    pageSize: filters.limit || 12,
    columns,
    filters,
    
    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedBook,
    selectedBookId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    expanded,
    setExpanded,

    handleCreateBook,
    handleEditBook,
    handleViewBook,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    handleFilterChange,
    handleResetFilters,
    isLoading,
    availableLanguages,
    availableGenres,
  };
};
