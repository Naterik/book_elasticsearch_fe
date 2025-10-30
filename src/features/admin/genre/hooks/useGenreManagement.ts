import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { getGenresAPI, deleteGenreAPI } from "../services";
import { getGenreColumns } from "../genre-columns";

export const useGenreManagement = () => {
  const { setIsLoading } = useCurrentApp();
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
      const res = await getGenresAPI({ page: currentPage });
      if (res.data && res.data.result) {
        setGenres(res.data.result);
        setTotalPages(res.data.pagination.totalPages);
        setTotalItems(res.data.pagination.totalItems);
        setPageSize(res.data.pagination.pageSize);
      } else if (res.error) {
        toast.error(Array.isArray(res.error) ? res.error[0] : res.error);
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
      await deleteGenreAPI(selectedGenre.id);
      toast.success("Genre deleted successfully.");
      fetchGenres();
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
  };
};
