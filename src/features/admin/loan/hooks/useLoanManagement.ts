import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { useTableLoadingState } from "@/hooks/use-table-loading";
import {
  getAllLoansAdminAPI,
  deleteLoanAPI,
} from "@/features/admin/loan/services";
import { getLoanColumns } from "@/features/admin/loan/loan-columns";

export const useLoanManagement = () => {
  const { setIsLoading } = useCurrentApp();
  const { isInitialLoading, setIsInitialLoading } = useTableLoadingState();
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedLoan, setSelectedLoan] = useState<ILoan | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [loanToDelete, setLoanToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchLoans();
  }, [currentPage]);

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await getAllLoansAdminAPI(currentPage);

      if (response.data && response.data.result) {
        setLoans(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to fetch loans");
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  const handleCreateLoan = () => {
    setSelectedLoan(null);
    setIsFormDialogOpen(true);
  };

  const handleEditLoan = (loan: ILoan) => {
    setSelectedLoan(loan);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (loanId: number) => {
    setLoanToDelete(loanId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!loanToDelete) return;
    setIsLoading(true);
    try {
      const response = await deleteLoanAPI(loanToDelete);

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("Loan deleted successfully");
        fetchLoans();
      }
    } catch (error) {
      console.error("Error deleting loan:", error);
      toast.error("Failed to delete loan");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setLoanToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedLoan(null);
    fetchLoans();
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
    () => getLoanColumns(handleEditLoan, handleDeleteClick),
    []
  );

  return {
    loans,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedLoan,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateLoan,
    handleEditLoan,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isInitialLoading,
  };
};
