import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getAllPaymentsAdminAPI,
  deletePaymentAPI,
} from "@/features/admin/payment/services";
import { getPaymentColumns } from "@/features/admin/payment/payment-columns";

export const usePaymentManagement = () => {
  const { showLoader, hideLoader } = useCurrentApp();
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [paymentToDelete, setPaymentToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [currentPage]);

  const fetchPayments = async () => {
    showLoader();
    try {
      const response = await getAllPaymentsAdminAPI(currentPage);

      if (response.data && response.data.result) {
        setPayments(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments");
    } finally {
      hideLoader();
    }
  };

  const handleDeleteClick = (paymentId: number) => {
    setPaymentToDelete(paymentId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!paymentToDelete) return;
    showLoader();
    try {
      const response = await deletePaymentAPI(paymentToDelete);

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("Payment deleted successfully");
        fetchPayments();
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Failed to delete payment");
    } finally {
      hideLoader();
      setIsDeleteDialogOpen(false);
      setPaymentToDelete(null);
    }
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

  const columns = useMemo(() => getPaymentColumns(handleDeleteClick), []);

  return {
    payments,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleDeleteClick,
    handleConfirmDelete,
    handlePageChange,
    handlePageSizeChange,
  };
};
