import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { getAuthorsAPI, deleteAuthorAPI } from "../services";
import { getAuthorColumns } from "../author-columns";

export const useAuthorManagement = () => {
  const { setIsLoading } = useCurrentApp();

  // Data state
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  // UI state
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [authorToDelete, setAuthorToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchAuthors(currentPage);
  }, [currentPage]);

  const fetchAuthors = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAuthorsAPI(page);

      if (response.data && response.data.result) {
        setAuthors(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
      toast.error("Failed to fetch authors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAuthor = () => {
    setSelectedAuthor(null);
    setIsFormDialogOpen(true);
  };

  const handleEditAuthor = (author: IAuthor) => {
    setSelectedAuthor(author);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (authorId: number) => {
    setAuthorToDelete(authorId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!authorToDelete) return;

    setIsLoading(true);
    try {
      const response = await deleteAuthorAPI(authorToDelete);
      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("Author deleted successfully");
        fetchAuthors(currentPage);
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error("Failed to delete author");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setAuthorToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedAuthor(null);
    fetchAuthors(currentPage);
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
    () => getAuthorColumns(handleEditAuthor, handleDeleteClick),
    []
  );

  return {
    authors,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedAuthor,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateAuthor,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  };
};
