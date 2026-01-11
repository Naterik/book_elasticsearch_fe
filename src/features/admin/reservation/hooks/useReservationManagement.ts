import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
// import { useCurrentApp } from "@/app/providers/app.context";
import { getReservationColumns } from "@admin/reservation/reservation-columns";
import ReservationService from "@admin/reservation/services";

export const useReservationManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] =
    useState<IReservation | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [reservationToDelete, setReservationToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchReservations();
  }, [currentPage]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const response = await ReservationService.getAllReservations(currentPage);

      if (response.data && response.data.result) {
        setReservations(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Failed to fetch reservations");
    } finally {
      setIsLoading(false);
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

  const handleViewReservation = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteClick = (reservationId: number) => {
    setReservationToDelete(reservationId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reservationToDelete) return;
    setIsLoading(true);
    try {
      const response =
        await ReservationService.deleteReservation(reservationToDelete);

      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Reservation deleted successfully");
        fetchReservations();
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to delete reservation");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setReservationToDelete(null);
    }
  };

  const handleStatusChange = async (
    reservationId: number,
    newStatus: string
  ) => {
    setIsLoading(true);
    try {
      const response = await ReservationService.updateReservationStatus(
        reservationId,
        newStatus
      );

      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Reservation status updated successfully");
        fetchReservations();
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      toast.error("Failed to update reservation status");
    } finally {
      setIsLoading(false);
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
        handleStatusChange,
        handleViewReservation
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
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedReservation,
    selectedReservationId,
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
    isLoading,
  };
};
