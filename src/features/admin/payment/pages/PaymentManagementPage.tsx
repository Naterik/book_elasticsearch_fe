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
import { usePaymentManagement } from "@/features/admin/payment/hooks/usePaymentManagement";
import { DataTable } from "@/components/layout/admin/data-table";
import { TableSkeletonLoader } from "@/components/layout/admin/table-skeleton-loader";

const PaymentManagementPage = () => {
  const {
    payments,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isInitialLoading,

    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleConfirmDelete,
    handlePageChange,
    handlePageSizeChange,
  } = usePaymentManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Payments Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage payment records
          </p>
        </div>
      </div>

      {isInitialLoading ? (
        <TableSkeletonLoader rows={12} columns={5} />
      ) : (
        <DataTable
          columns={columns}
          data={payments}
          searchKey="transactionId"
          searchPlaceholder="Search by transaction ID..."
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
        />
      )}

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
