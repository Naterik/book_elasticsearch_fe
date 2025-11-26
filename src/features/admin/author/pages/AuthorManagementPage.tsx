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
import { useAuthorManagement } from "../hooks/useAuthorManagement";
import AuthorFormDialog from "../components/AuthorFormDialog";

const AuthorManagementPage = () => {
  const {
    authors,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedAuthor,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateAuthor,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
  } = useAuthorManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Author Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage authors in the library system
          </p>
        </div>
        <Button onClick={handleCreateAuthor} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Author
        </Button>
      </div>

      {isLoading ? (
        <TableSkeletonLoader rows={12} columns={4} />
      ) : (
        <DataTable
          columns={columns}
          data={authors}
          searchKey="name"
          searchPlaceholder="Search by author name..."
          pageCount={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          showColumnToggle={true}
          showPagination={true}
          showSearch={true}
          emptyMessage="No authors found. Add your first author to get started."
        />
      )}

      <AuthorFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        author={selectedAuthor}
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
              author and all associated books might be affected.
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

export default AuthorManagementPage;
