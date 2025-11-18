import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getAllLoansAdminAPI,
  deleteLoanAPI,
  returnBookApproveAPI,
} from "@/features/admin/loan/services";
import { getLoanColumns } from "@/features/admin/loan/loan-columns";

export const useLoanManagement = () => {
  const { isLoading, setIsLoading } = useCurrentApp();
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [loanToDelete, setLoanToDelete] = useState<number | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialLoading(true);
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [currentPage]);

  const fetchLoans = async () => {
    setIsInitialLoading(true);
    try {
      const response = await getAllLoansAdminAPI(currentPage);

      if (response.data && response.data.result) {
        setLoans(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch loans");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleDeleteClick = (loanId: number) => {
    setLoanToDelete(loanId);
    setIsDeleteDialogOpen(true);
  };

  const handleReturnBook = async (loanId: number, userId: number) => {
    setIsLoading(true);
    try {
      const res = await returnBookApproveAPI(loanId, userId);
      if (res.data) {
        toast.success("Book return approved successfully");
        fetchLoans();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to approve book return");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!loanToDelete) return;
    setIsLoading(true);
    try {
      const response = await deleteLoanAPI(loanToDelete);

      if (response.data) {
        toast.success("Loan deleted successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting loan:", error);
      toast.error("Failed to delete loan");
    } finally {
      fetchLoans();
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setLoanToDelete(null);
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

  const columns = useMemo(
    () => getLoanColumns(handleDeleteClick, handleReturnBook),
    []
  );

  return {
    loans,
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
    handleReturnBook,
    isLoading,
    isInitialLoading,
  };
};
