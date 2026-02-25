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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookCopyFormDialog from "@/features/admin/book-copy/components/BookCopyFormDialog";
import { useBookCopyManagement } from "@/features/admin/book-copy/hooks/useBookCopyManagement";
import { FileSpreadsheet, PlusIcon, X } from "lucide-react";
import { exportToExcel } from "@/helper/excel";
import { toast } from "sonner";

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
    handleClearFilters,
    yearPublished,
    statusFilter,
  } = useBookCopyManagement();

  const handleExport = () => {
    if (!bookCopies || bookCopies.length === 0) {
      toast.error("No data to export");
      return;
    }

    const exportData = bookCopies.map((copy) => ({
      ID: copy.id,
      "Copy Number": copy.copyNumber,
      Status: copy.status,
      "Year Published": copy.year_published,
      "Book Title": copy.books?.title || "N/A",
      ISBN: copy.books?.isbn || "N/A",
    }));

    exportToExcel({
      data: exportData,
      fileName: `Book_Copies_${new Date().toISOString().split("T")[0]}`,
      sheetName: "Book Copies",
    });

    toast.success("Exported successfully!");
  };

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
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
      <div className="flex gap-2 md:gap-4 lg:gap-6 items-center">
        <Select
          value={yearPublished ? yearPublished.toString() : ""}
          onValueChange={(val) => handleYearPublishedChange(+val)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataCountYearPublished?.map((year: IAggregations) => (
                <SelectItem key={year.key} value={year.key.toString()}>
                  {year.key}{" "}
                  <span className="font-light text-gray-600">
                    ({year.doc_count})
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(val) => handleStatusFilterChange(val)}
        >
          <SelectTrigger className="min-w-40">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataCountStatus?.map((status: IAggregations) => (
                <SelectItem key={status.key} value={status.key}>
                  {status.key}{" "}
                  <span className="font-light text-gray-600">
                    ({status.doc_count})
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {(searchQuery || yearPublished || statusFilter) && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="px-2 lg:px-3 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Book Copy Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage book copies and their availability status
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" onClick={handleExport} size="sm" className="gap-2 hidden lg:flex">
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
              Export Excel
            </Button>
            <Button onClick={handleCreateBookCopy} className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Book Copy
            </Button>
        </div>
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
