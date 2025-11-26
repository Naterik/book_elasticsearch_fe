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
import { DataTable } from "@/components/layout/admin/data-table";
import { TableSkeletonLoader } from "@/components/layout/admin/table-skeleton-loader";
import { usePublisherManagement } from "../hooks/usePublisherManagement";
import PublisherFormDialog from "../components/PublisherFormDialog";

const PublisherManagementPage = () => {
  const {
    publishers,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedPublisher,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreatePublisher,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
  } = usePublisherManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Publisher Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage publishers in the library system
          </p>
        </div>
        <Button onClick={handleCreatePublisher} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Publisher
        </Button>
      </div>

      {isLoading ? (
        <TableSkeletonLoader rows={12} columns={4} />
      ) : (
        <DataTable
          columns={columns}
          data={publishers}
          searchKey="name"
          searchPlaceholder="Search by publisher name..."
          pageCount={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          showColumnToggle={true}
          showPagination={true}
          showSearch={true}
          emptyMessage="No publishers found. Add your first publisher to get started."
        />
      )}

      <PublisherFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        publisher={selectedPublisher}
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
              publisher.
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

export default PublisherManagementPage;
