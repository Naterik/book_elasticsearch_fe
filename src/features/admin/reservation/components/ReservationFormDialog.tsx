import { Button } from "@/components/ui/button";
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
import {
  reservationFormSchema,
  type ReservationFormValues,
} from "@/lib/validators/reservation";
import BookService from "@admin/book/services";
import ReservationService from "@admin/reservation/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ReservationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: IReservation | null;
  onSuccess: () => void;
}

const ReservationFormDialog = ({
  open,
  onOpenChange,
  reservation,
  onSuccess,
}: ReservationFormDialogProps) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const isEditMode = !!reservation;

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      bookId: "",
      userId: "",
    },
  });

  useEffect(() => {
    if (open) {
      fetchBooks();
      if (reservation) {
        form.reset({
          bookId: String(reservation.bookId),
          userId: String(reservation.userId),
        });
      } else {
        form.reset({
          bookId: "",
          userId: "",
        });
      }
    }
  }, [open, reservation, form]);

  const fetchBooks = async () => {
    try {
      const res = await BookService.getAllBooks(1);
      if (res.data && res.data.result) {
        setBooks(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    }
  };

  const onSubmit = async (values: ReservationFormValues) => {
    try {
      let response;
      if (isEditMode && reservation?.id) {
        response = await ReservationService.updateReservation(reservation.id, {
          bookId: parseInt(values.bookId),
          userId: parseInt(values.userId),
        });
      } else {
        response = await ReservationService.createReservation({
          bookId: parseInt(values.bookId),
          userId: parseInt(values.userId),
        });
      }

      if (response?.message) {
        toast.error(response.message);
      } else {
        toast.success(
          isEditMode
            ? "Reservation updated successfully"
            : "Reservation created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update reservation"
          : "Failed to create reservation"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Reservation" : "Create New Reservation"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update reservation information"
              : "Create a new reservation for a member"}
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
                          {book.title} - {book.authors.name}
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
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID *</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="Enter user ID"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
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
                {isEditMode ? "Update Reservation" : "Create Reservation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationFormDialog;
