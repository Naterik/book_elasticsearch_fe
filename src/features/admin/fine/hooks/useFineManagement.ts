import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getAllFinesAdminAPI,
  deleteFineAPI,
} from "@/features/admin/fine/services";
import { getFineColumns } from "@/features/admin/fine/fine-columns";

export const useFineManagement = () => {
  const { showLoader, hideLoader } = useCurrentApp();
  const [fines, setFines] = useState<IFine[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedFine, setSelectedFine] = useState<IFine | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [fineToDelete, setFineToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchFines();
  }, [currentPage]);

  const fetchFines = async () => {
    showLoader();
    try {
      const response = await getAllFinesAdminAPI(currentPage);

      if (response.data && response.data.result) {
        setFines(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching fines:", error);
      toast.error("Failed to fetch fines");
    } finally {
      hideLoader();
    }
  };

  const handleCreateFine = () => {
    setSelectedFine(null);
    setIsFormDialogOpen(true);
  };

  const handleEditFine = (fine: IFine) => {
    setSelectedFine(fine);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (fineId: number) => {
    setFineToDelete(fineId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!fineToDelete) return;
    showLoader();
    try {
      const response = await deleteFineAPI(fineToDelete);

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("Fine deleted successfully");
        fetchFines();
      }
    } catch (error) {
      console.error("Error deleting fine:", error);
      toast.error("Failed to delete fine");
    } finally {
      hideLoader();
      setIsDeleteDialogOpen(false);
      setFineToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedFine(null);
    fetchFines();
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
    () => getFineColumns(handleEditFine, handleDeleteClick),
    []
  );

  return {
    fines,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedFine,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateFine,
    handleEditFine,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  };
};
