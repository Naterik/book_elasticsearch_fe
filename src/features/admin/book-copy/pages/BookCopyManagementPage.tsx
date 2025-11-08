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
import BookCopyFormDialog from "@/features/admin/book-copy/components/BookCopyFormDialog";
import { DataTable } from "@/components/layout/admin/data-table";
import { TableSkeletonLoader } from "@/components/layout/admin/table-skeleton-loader";
import { useBookCopyManagement } from "@/features/admin/book-copy/hooks/useBookCopyManagement";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const BookCopyManagementPage = () => {
  const {
    bookCopies,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isInitialLoading,

    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedBookCopy,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateBookCopy,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    handleClearSearch,
    searchQuery,
  } = useBookCopyManagement();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Book Copy Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage book copies and their availability status
          </p>
        </div>
        <Button onClick={handleCreateBookCopy} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Book Copy
        </Button>
      </div>

      {/* Custom Search Bar with Elasticsearch */}
      <div className="mb-6 flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Search by location, copy number, title, ISBN... (n-gram search)"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {isInitialLoading ? (
        <TableSkeletonLoader rows={12} columns={6} />
      ) : (
        <DataTable
          columns={columns}
          data={bookCopies}
          searchKey={undefined}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          showColumnToggle={true}
          showPagination={true}
          showSearch={false}
          emptyMessage={
            searchQuery
              ? "No book copies found. Try a different search."
              : "No book copies found. Add your first book copy to get started."
          }
        />
      )}

      <BookCopyFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        bookCopy={selectedBookCopy}
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
              book copy from the library.
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

export default BookCopyManagementPage;
