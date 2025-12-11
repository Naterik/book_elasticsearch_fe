import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  getAllBooksAdminAPI,
  deleteBookAPI,
} from "@/features/admin/book/services";
import { getBookColumns } from "@/features/admin/book/book-columns";
import { useDebounce } from "@/hooks/use-debounce";

export const useBookManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [currentPage, debouncedSearchTerm, pageSize]);


  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBooksAdminAPI(currentPage, debouncedSearchTerm);


      if (response.data && response.data.result) {
        setBooks(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.message) {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await deleteBookAPI(bookToDelete);

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
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const columns = useMemo(
    () => getBookColumns(handleEditBook, handleDeleteClick, handleViewBook),
    []
  );

  return {
    books,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedBook,
    selectedBookId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateBook,
    handleEditBook,
    handleViewBook,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
};
