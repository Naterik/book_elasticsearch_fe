import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getAllReservationsAdminAPI,
  deleteReservationAPI,
  updateReservationStatusAPI,
} from "@/features/admin/reservation/services";
import { getReservationColumns } from "@/features/admin/reservation/reservation-columns";

export const useReservationManagement = () => {
  const { showLoader, hideLoader } = useCurrentApp();
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] =
    useState<IReservation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [reservationToDelete, setReservationToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchReservations();
  }, [currentPage]);

  const fetchReservations = async () => {
    showLoader();
    try {
      const response = await getAllReservationsAdminAPI(currentPage);

      if (response.data && response.data.result) {
        setReservations(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Failed to fetch reservations");
    } finally {
      hideLoader();
    }
  };

  const handleCreateReservation = () => {
    setSelectedReservation(null);
    setIsFormDialogOpen(true);
  };

  const handleEditReservation = (reservation: IReservation) => {
    setSelectedReservation(reservation);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (reservationId: number) => {
    setReservationToDelete(reservationId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reservationToDelete) return;
    showLoader();
    try {
      const response = await deleteReservationAPI(reservationToDelete);

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("Reservation deleted successfully");
        fetchReservations();
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to delete reservation");
    } finally {
      hideLoader();
      setIsDeleteDialogOpen(false);
      setReservationToDelete(null);
    }
  };

  const handleStatusChange = async (
    reservationId: number,
    newStatus: string
  ) => {
    showLoader();
    try {
      const response = await updateReservationStatusAPI(
        reservationId,
        newStatus
      );

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("Reservation status updated successfully");
        fetchReservations();
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      toast.error("Failed to update reservation status");
    } finally {
      hideLoader();
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedReservation(null);
    fetchReservations();
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
    () =>
      getReservationColumns(
        handleEditReservation,
        handleDeleteClick,
        handleStatusChange
      ),
    []
  );

  return {
    reservations,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedReservation,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateReservation,
    handleEditReservation,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handleStatusChange,
    handlePageChange,
    handlePageSizeChange,
  };
};
