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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import BookFormDialog from "@/features/admin/book/components/BookFormDialog";
import { cn } from "@/lib/utils";
import { Check, FileSpreadsheet, PlusCircle, PlusIcon, X } from "lucide-react";

import { DataTable } from "@/components/layout/admin/data-table";
import BookCopies from "@/features/admin/book/components/BookCopies";
import BookDetailDialog from "@/features/admin/book/components/BookDetailDialog";
import { useBookManagement } from "@/features/admin/book/hooks/useBookManagement";
import { exportToExcel } from "@/helper/excel";
import { toast } from "sonner";
// import { DashboardFilterBar } from "../components/DashboardFilterBar";

const BookManagement = () => {
  const {
    books,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isLoading,
    filters,
    handleFilterChange,

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
    expanded,
    setExpanded,
    availableLanguages,
    availableGenres,
  } = useBookManagement();

  const handleExport = () => {
    if (!books || books.length === 0) {
      toast.error("No data to export");
      return;
    }

    const exportData = books.map((book) => ({
      ID: book.id,
      Title: book.title,
      Authors: book.authors?.name || "",
      Publisher: book.publishers?.name || "",
      Genres: book.genres?.map((g) => g.genres.name).join(", ") || "",
      Price: book.price,
      "Publication Year": book.publishDate,
      Language: book.language,
      Pages: book.pages,
    }));

    exportToExcel({
      data: exportData,
      fileName: `Book_List_${new Date().toISOString().split("T")[0]}`,
      sheetName: "Books",
    });

    toast.success("Exported successfully!");
  };

  // --- Faceted Filter Component (Inlined for consistency) ---
  const FacetedFilter = ({
    title,
    selectedValues,
    options,
    onSelect,
    onClear,
  }: {
    title: string;
    selectedValues: Set<string>;
    options: { label: string; value: string; count?: number }[];
    onSelect: (val: string) => void;
    onClear: () => void;
  }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircle className="mr-2 h-4 w-4" />
            {title}
            {selectedValues.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <>
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {selectedValues.size} selected
                      </Badge>
                    </>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => onSelect(option.value)}
                    >
                      <div
                        className={cn(
                          "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>{option.label}</span>
                      {option.count !== undefined && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {option.count}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={onClear}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  const selectedGenreIds = filters.genreIds
    ? filters.genreIds.split(",").filter(Boolean)
    : [];

  const handleGenreSelect = (value: string) => {
    const currentIds = new Set(selectedGenreIds);
    if (currentIds.has(value)) {
      currentIds.delete(value);
    } else {
      currentIds.add(value);
    }
    const newIds = Array.from(currentIds);
    handleFilterChange(
      "genreIds",
      newIds.length > 0 ? newIds.join(",") : undefined
    );
  };

  const toolbarLeftContent = (
    <>
      <div className="relative w-full lg:w-55">
        <Input
          placeholder="Filter books..."
          value={filters.q || ""}
          onChange={(e) => handleFilterChange("q", e.target.value)}
          className="w-full"
        />
        {filters.q && (
          <button
            onClick={() => handleFilterChange("q", "")}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Genre Filter - Multi Select */}
        <FacetedFilter
          title="Genre"
          selectedValues={new Set(selectedGenreIds)}
          options={
            availableGenres?.map((g) => ({ label: g.label, value: g.value })) ||
            []
          }
          onSelect={handleGenreSelect}
          onClear={() => handleFilterChange("genreIds", undefined)}
        />

        {/* Language Filter */}
        <FacetedFilter
          title="Language"
          selectedValues={new Set(filters.language ? [filters.language] : [])}
          options={
            availableLanguages?.map((l) => ({
              label: l.label,
              value: l.value,
              count: l.count,
            })) || []
          }
          onSelect={(val) =>
            handleFilterChange(
              "language",
              filters.language === val ? undefined : val
            )
          }
          onClear={() => handleFilterChange("language", undefined)}
        />

        {/* Status Filter */}
        <FacetedFilter
          title="Status"
          selectedValues={new Set(filters.stock ? [filters.stock] : [])}
          options={[
            { label: "Available", value: "available" },
            { label: "Out of Stock", value: "out_of_stock" },
          ]}
          onSelect={(val) =>
            handleFilterChange("stock", filters.stock === val ? undefined : val)
          }
          onClear={() => handleFilterChange("stock", undefined)}
        />

        {(filters.q ||
          filters.stock ||
          filters.genreIds ||
          filters.language) && (
          <Button
            variant="ghost"
            onClick={() => {
              handleFilterChange("q", undefined);
              handleFilterChange("stock", undefined);
              handleFilterChange("genreIds", undefined);
              handleFilterChange("language", undefined);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Book Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage library books and catalog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            size="sm"
            className="hidden gap-2 lg:flex"
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            Export Excel
          </Button>
          <Button onClick={handleCreateBook} className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Book
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={books}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        showColumnToggle={true}
        showPagination={true}
        showSearch={false}
        emptyMessage="No books found. Add your first book to get started."
        isLoading={isLoading}
        toolbarLeftContent={toolbarLeftContent}
        renderSubComponent={({ row }) => (
          <BookCopies
            bookId={row.original.id}
            highlightCopyId={row.original.matchedCopyId}
          />
        )}
        expanded={expanded}
        onExpandedChange={setExpanded}
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
