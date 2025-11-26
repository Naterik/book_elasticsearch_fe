import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { getGenresAPI, deleteGenreAPI } from "../services";
import { getGenreColumns } from "../genre-columns";

export const useGenreManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<IGenre | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, [currentPage]);

  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      const response = await getGenresAPI({ page: currentPage });
      if (response.data && response.data.result) {
        setGenres(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Failed to fetch genres.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGenre = () => {
    setSelectedGenre(null);
    setIsFormDialogOpen(true);
  };

  const handleEditGenre = (genre: IGenre) => {
    setSelectedGenre(genre);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (genre: IGenre) => {
    setSelectedGenre(genre);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedGenre) return;
    setIsLoading(true);
    try {
      const response = await deleteGenreAPI(+selectedGenre.id);
      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Genre deleted successfully.");
        fetchGenres();
      }
    } catch (error) {
      toast.error("Failed to delete genre.");
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setSelectedGenre(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    fetchGenres();
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
    () => getGenreColumns(handleEditGenre, handleDeleteClick),
    []
  );

  return {
    genres,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedGenre,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateGenre,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
  };
};
