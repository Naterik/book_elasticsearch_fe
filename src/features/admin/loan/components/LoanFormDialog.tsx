import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLoanAPI, updateLoanAPI } from "@/features/admin/loan/services";
import { getAllBookCopiesAdminAPI } from "@/features/admin/book-copy/services";
import { loanFormSchema, type LoanFormValues } from "@/lib/validators/loan";
import { Loader2 } from "lucide-react";

interface LoanFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: ILoan | null;
  onSuccess: () => void;
}

const LoanFormDialog = ({
  open,
  onOpenChange,
  loan,
  onSuccess,
}: LoanFormDialogProps) => {
  const { user } = useCurrentApp();
  const [bookCopies, setBookCopies] = useState<IBookCopy[]>([]);
  const isEditMode = !!loan;

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      bookId: "",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "active",
    },
  });

  useEffect(() => {
    if (open) {
      fetchBookCopies();
      if (loan) {
        form.reset({
          bookId: String(loan.bookCopy.bookId),
          dueDate: loan.dueDate.split("T")[0],
        });
      } else {
        form.reset({
          bookId: "",
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          status: "active",
        });
      }
    }
  }, [open, loan, form]);

  const fetchBookCopies = async () => {
    try {
      const res = await getAllBookCopiesAdminAPI(1);
      if (res.data && res.data.result) {
        setBookCopies(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching book copies:", error);
      toast.error("Failed to load book copies");
    }
  };

  const onSubmit = async (values: LoanFormValues) => {
    try {
      let response;
      if (isEditMode && loan?.id) {
        response = await updateLoanAPI(loan.id, {
          dueDate: values.dueDate,
          status: values.status,
        });
      } else {
        response = await createLoanAPI({
          bookId: parseInt(values.bookId),
          userId: user?.id || 1,
          dueDate: values.dueDate,
        });
      }

      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success(
          isEditMode ? "Loan updated successfully" : "Loan created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update loan" : "Failed to create loan"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Loan" : "Create New Loan"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update loan information"
              : "Create a new loan for a member"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bookId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Copy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book copy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bookCopies.map((bookCopy) => (
                        <SelectItem
                          key={bookCopy.id}
                          value={bookCopy.id.toString()}
                        >
                          {bookCopy.books?.title} - {bookCopy.copyNumber} (
                          {bookCopy.status})
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
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                  <FormLabel>Status </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="RETURNED">Returned</SelectItem>
                        <SelectItem value="LOST">Lost</SelectItem>
                        <SelectItem value="OVERDUE">Overdue</SelectItem>
                        <SelectItem value="ON_LOAN">On Loan</SelectItem>
                      </SelectGroup>
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
                {isEditMode ? "Update Loan" : "Create Loan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoanFormDialog;
