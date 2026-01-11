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
import GenreDetailDialog from "../components/GenreDetailDialog";
import GenreFormDialog from "../components/GenreFormDialog";
import { useGenreManagement } from "../hooks/useGenreManagement";

const GenreManagementPage = () => {
  const {
    genres,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedGenre,
    selectedGenreId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateGenre,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
  } = useGenreManagement();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Genre Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage genres in the library system
          </p>
        </div>
        <Button onClick={handleCreateGenre} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Genre
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={genres}
        searchKey="name"
        searchPlaceholder="Search by genre name..."
        pageCount={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        showColumnToggle={true}
        showPagination={true}
        showSearch={true}
        emptyMessage="No genres found. Add your first genre to get started."
        isLoading={isLoading}
      />

      <GenreFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        genre={selectedGenre}
        onSuccess={handleFormSuccess}
      />

      <GenreDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        genreId={selectedGenreId}
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
              genre.
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

export default GenreManagementPage;
