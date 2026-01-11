import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import {
  bookCopyFormSchema,
  type BookCopyFormValues,
} from "@/lib/validators/book-copy";
import { BookCopyStatus } from "@/types";
import BookCopyService from "@admin/book-copy/services";
import BookService from "@admin/book/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface BookCopyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookCopy: IBookCopy | null;
  onSuccess: () => void;
}

const BookCopyFormDialog = ({
  open,
  onOpenChange,
  bookCopy,
  onSuccess,
}: BookCopyFormDialogProps) => {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [bookOptions, setBookOptions] = useState<ISelectBookOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingBooks, setLoadingBooks] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const isEditMode = !!bookCopy;

  const form = useForm<BookCopyFormValues>({
    resolver: zodResolver(bookCopyFormSchema),
    defaultValues: {
      copyNumber: "",
      year_published: new Date().getFullYear(),
      status: BookCopyStatus.AVAILABLE,
      bookId: 100,
    },
  });
  const selectedBookId = form.watch("bookId");
  const selectedBook = bookOptions.find((book) => book.id === +selectedBookId);
  useEffect(() => {
    if (open) {
      if (bookCopy) {
        form.reset({
          copyNumber: bookCopy.copyNumber,
          year_published: bookCopy.year_published,
          status: bookCopy.status,
          bookId: bookCopy.bookId,
        });
      } else {
        form.reset({
          copyNumber: "",
          year_published: new Date().getFullYear(),
          status: BookCopyStatus.AVAILABLE,
          bookId: 0,
        });
      }
    }
  }, [open, bookCopy, selectedBookId]);

  useEffect(() => {
    fetchBooks(debouncedSearch);
  }, [debouncedSearch]);

  const fetchBooks = async (query: string) => {
    try {
      const res = await BookService.getBookSelectOptions(query);
      if (res.data && res.data) {
        setBookOptions(res.data);
      }
    } catch (error) {
      toast.error("Failed to load books");
    } finally {
      setLoadingBooks(false);
    }
  };

  const onSubmit = async (values: BookCopyFormValues) => {
    try {
      const submitData = {
        copyNumber: values.copyNumber,
        year_published: +values.year_published,
        status: values.status,
        bookId: +values.bookId,
      };

      let response;
      if (isEditMode) {
        response = await BookCopyService.updateBookCopy({
          id: bookCopy.id,
          ...submitData,
        });
      } else {
        response = await BookCopyService.createBookCopy(submitData);
      }

      if (response?.message) {
        toast.error(response.message);
      } else {
        toast.success(
          isEditMode
            ? "Book copy updated successfully"
            : "Book copy created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update book copy" : "Failed to create book copy"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Book Copy" : "Create New Book Copy"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update book copy information in the library"
              : "Add a new book copy to the library"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bookId"
              render={({ field }) => (
                <FormItem className="flex min-w-50 flex-col">
                  <FormLabel>Book</FormLabel>
                  <Popover
                    open={openCombobox}
                    onOpenChange={setOpenCombobox}
                    modal={true}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          disabled={isEditMode}
                          className={cn(
                            "w-112 justify-between disabled:bg-gray-200 disabled:font-semibold",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <span className="truncate">
                            {selectedBook
                              ? selectedBook.title
                              : bookCopy && !selectedBook // Trường hợp edit nhưng book chưa load vào list
                                ? `Book : ${bookCopy.books.title}` // Hoặc hiển thị title từ props nếu có
                                : "Select a book"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[450px] p-0" align="start">
                      {/* shouldFilter={false} để tắt lọc client-side của cmkd */}
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search book by title or ISBN..."
                          value={searchQuery}
                          onValueChange={setSearchQuery}
                        />
                        <CommandList className="max-h-[300px] overflow-y-auto">
                          {loadingBooks && (
                            <div className="text-muted-foreground py-6 text-center text-sm">
                              Loading books...
                            </div>
                          )}
                          {!loadingBooks && bookOptions.length === 0 && (
                            <CommandEmpty>No book found.</CommandEmpty>
                          )}
                          <CommandGroup>
                            {bookOptions.map((book) => (
                              <CommandItem
                                value={book.isbn}
                                key={book.id}
                                onSelect={() => {
                                  form.setValue("bookId", book.id);
                                  setOpenCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    book.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {book.title}
                                  </span>
                                  <span className="text-muted-foreground text-xs">
                                    ISBN: {book.isbn} - {book.authors?.name}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copy Number </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., COPY-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Published </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={!isEditMode}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={BookCopyStatus.AVAILABLE}>
                        Available
                      </SelectItem>
                      <SelectItem value={BookCopyStatus.ON_HOLD}>
                        On Hold
                      </SelectItem>
                      <SelectItem value={BookCopyStatus.ON_LOAN}>
                        On Loan
                      </SelectItem>
                      <SelectItem value={BookCopyStatus.LOST}>Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditMode ? "Update Book Copy" : "Create Book Copy"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookCopyFormDialog;
