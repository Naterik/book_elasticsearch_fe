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
import { useBookCopyManagement } from "@/features/admin/book-copy/hooks/useBookCopyManagement";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookCopyManagementPage = () => {
  const {
    bookCopies,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,

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
    handleYearPublishedChange,
    handleStatusFilterChange,
    dataCountYearPublished,
    dataCountStatus,
  } = useBookCopyManagement();

  const toolbarLeftContent = (
    <>
      <div className="relative w-full lg:w-[350px]">
        <Input
          placeholder="Search by location, copy number, title"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />

        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded cursor-pointer"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
      <div className="flex gap-2  md:gap-6 lg:gap-10">
        <Select onValueChange={(val) => handleYearPublishedChange(+val)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataCountYearPublished?.map((year: IAggregations) => (
                <SelectItem key={year.key} value={year.key}>
                  {year.key}{" "}
                  <span className=" text-gray-600 font-light">
                    ({year.doc_count})
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => handleStatusFilterChange(val)}>
          <SelectTrigger className="min-w-40">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataCountStatus?.map((status: IAggregations) => (
                <SelectItem key={status.key} value={status.key}>
                  {status.key}{" "}
                  <span className=" text-gray-600 font-light">
                    ({status.doc_count})
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );

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
        isLoading={isLoading}
        toolbarLeftContent={toolbarLeftContent}
      />

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
