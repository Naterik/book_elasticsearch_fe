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
import BookFormDialog from "@/features/admin/book/components/BookFormDialog";
import { DataTable } from "@/components/layout/admin/data-table";
import BookDetailDialog from "@/features/admin/book/components/BookDetailDialog";
import { useBookManagement } from "@/features/admin/book/hooks/useBookManagement";

const BookManagement = () => {
  const {
    books,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,

    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedBook,
    selectedBookId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateBook,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  } = useBookManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Book Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage library books and catalog
          </p>
        </div>
        <Button onClick={handleCreateBook} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={books}
        searchKey="title"
        searchPlaceholder="Search by book title..."
        pageCount={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        showColumnToggle={true}
        showPagination={true}
        showSearch={true}
        emptyMessage="No books found. Add your first book to get started."
        isLoading={isLoading}
      />

      <BookFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        book={selectedBook}
        onSuccess={handleFormSuccess}
      />

      <BookDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        bookId={selectedBookId}
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
              book from the library catalog and all associated data.
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

export default BookManagement;
