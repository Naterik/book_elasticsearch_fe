import { DataTable } from "@/components/layout/admin/data-table";
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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AuthorDetailDialog from "../components/AuthorDetailDialog";
import AuthorFormDialog from "../components/AuthorFormDialog";
import { useAuthorManagement } from "../hooks/useAuthorManagement";

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
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedAuthor,
    selectedAuthorId,
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
      <div className="mb-6 flex items-center justify-between">
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
        isLoading={isLoading}
      />

      <AuthorFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        author={selectedAuthor}
        onSuccess={handleFormSuccess}
      />

      <AuthorDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        authorId={selectedAuthorId}
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
