import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useCurrentApp } from "@/app/providers/app.context";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createBookCopyAPI,
  updateBookCopyAPI,
} from "@/features/admin/book-copy/services";
import { getAllBooksAdminAPI } from "@/features/admin/book/services";

const bookCopyFormSchema = z.object({
  copyNumber: z.string().min(1, "Copy number is required"),
  yearPublished: z.string().min(4, "Year published is required"),
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
  bookId: z.string().min(1, "Book is required"),
});

type BookCopyFormValues = z.infer<typeof bookCopyFormSchema>;

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
  const { showLoader, hideLoader } = useCurrentApp();
  const [books, setBooks] = useState<IBook[]>([]);

  const isEditMode = !!bookCopy;

  const form = useForm<BookCopyFormValues>({
    resolver: zodResolver(bookCopyFormSchema),
    defaultValues: {
      copyNumber: "",
      yearPublished: new Date().getFullYear().toString(),
      status: "available",
      location: "",
      bookId: "",
    },
  });

  useEffect(() => {
    if (open) {
      fetchBooks();
      if (bookCopy) {
        form.reset({
          copyNumber: bookCopy.copyNumber,
          yearPublished: String(bookCopy.year_published),
          status: bookCopy.status,
          location: bookCopy.location,
          bookId: String(bookCopy.bookId),
        });
      } else {
        form.reset({
          copyNumber: "",
          yearPublished: String(new Date().getFullYear()),
          status: "available",
          location: "",
          bookId: "",
        });
      }
    }
  }, [open, bookCopy, form]);

  const fetchBooks = async () => {
    try {
      const res = await getAllBooksAdminAPI(1);
      if (res.data && res.data.result) {
        setBooks(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    }
  };

  const onSubmit = async (values: BookCopyFormValues) => {
    showLoader();

    try {
      const submitData = {
        copyNumber: values.copyNumber,
        yearPublished: parseInt(values.yearPublished),
        status: values.status,
        location: values.location,
        bookId: parseInt(values.bookId),
      };

      let response;
      if (isEditMode) {
        response = await updateBookCopyAPI({ id: bookCopy.id, ...submitData });
      } else {
        response = await createBookCopyAPI(submitData);
      }

      if (response.error) {
        const errorMessage = Array.isArray(response.error)
          ? response.error.join(", ")
          : response.error;
        toast.error(errorMessage);
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
    } finally {
      hideLoader();
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
                <FormItem>
                  <FormLabel>Book *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {books.map((book) => (
                        <SelectItem key={book.id} value={book.id.toString()}>
                          {book.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copy Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., COPY-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearPublished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Published *</FormLabel>
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Shelf A1" {...field} />
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
                  <FormLabel>Status *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="ON_LOAN">Borrowed</SelectItem>
                      <SelectItem value="ON_HOLD">Reserved</SelectItem>
                      <SelectItem value="LOST">Lost</SelectItem>
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
              <Button type="submit">
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
