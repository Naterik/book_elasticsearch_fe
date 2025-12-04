import { Button } from "@/components/ui/button";
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
import { PlusIcon } from "lucide-react";
import ReservationFormDialog from "@/features/admin/reservation/components/ReservationFormDialog";
import { DataTable } from "@/components/layout/admin/data-table";
import { useReservationManagement } from "@/features/admin/reservation/hooks/useReservationManagement";

const ReservationManagementPage = () => {
  const {
    reservations,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedReservation,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateReservation,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  } = useReservationManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reservation Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage book reservations and track member requests
          </p>
        </div>
        <Button onClick={handleCreateReservation} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Reservation
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={reservations}
        searchKey="user.fullName"
        searchPlaceholder="Search by member name..."
        pageCount={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        showColumnToggle={true}
        showPagination={true}
        showSearch={true}
        emptyMessage="No reservations found. Create your first reservation to get started."
        isLoading={isLoading}
      />

      <ReservationFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        reservation={selectedReservation}
        onSuccess={handleFormSuccess}
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
              reservation record from the system.
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

export default ReservationManagementPage;
