import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DataTable } from "@/components/layout/admin/data-table";
import { usePaymentManagement } from "@/features/admin/payment/hooks/usePaymentManagement";
import PaymentDetailDialog from "../components/PaymentDetailDialog";

const PaymentManagementPage = () => {
  const {
    payments,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,

    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedPaymentId,

    handleConfirmDelete,
    handlePageChange,
    handlePageSizeChange,
  } = usePaymentManagement();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage payment records
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={payments}
        searchKey="status"
        searchPlaceholder=""
        pageCount={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        showColumnToggle={true}
        showPagination={true}
        showSearch={true}
        emptyMessage="No payments found."
        isLoading={isLoading}
      />

      <PaymentDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        paymentId={selectedPaymentId}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              payment record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaymentManagementPage;
