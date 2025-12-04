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
import FineFormDialog from "@/features/admin/fine/components/FineFormDialog";
import { DataTable } from "@/components/layout/admin/data-table";
import { useFineManagement } from "@/features/admin/fine/hooks/useFineManagement";

const FineManagementPage = () => {
  const {
    fines,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedFine,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateFine,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  } = useFineManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Fines Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage library fines and track payments
          </p>
        </div>
        <Button onClick={handleCreateFine} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Fine
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={fines}
        searchKey="reason"
        searchPlaceholder="Search by reason..."
        pageCount={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        showColumnToggle={true}
        showPagination={true}
        showSearch={true}
        emptyMessage="No fines found. Create your first fine to get started."
        isLoading={isLoading}
      />

      <FineFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        fine={selectedFine}
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
              fine record from the system.
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

export default FineManagementPage;
