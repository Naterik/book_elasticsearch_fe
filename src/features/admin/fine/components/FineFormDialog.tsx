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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fineFormSchema, type FineFormValues } from "@/lib/validators/fine";
import FineService from "@admin/fine/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FineFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fine: IFine | null;
  onSuccess: () => void;
}

const FineFormDialog = ({
  open,
  onOpenChange,
  fine,
  onSuccess,
}: FineFormDialogProps) => {
  const isEditMode = !!fine;

  const form = useForm<FineFormValues>({
    resolver: zodResolver(fineFormSchema),
    defaultValues: {
      amount: "",
      reason: "",
      isPaid: false,
      loanId: "",
      userId: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (fine) {
        form.reset({
          amount: String(fine.amount),
          reason: fine.reason,
          isPaid: fine.isPaid,
          loanId: String(fine.loanId),
          userId: String(fine.userId),
        });
      } else {
        form.reset({
          amount: "",
          reason: "",
          isPaid: false,
          loanId: "",
          userId: "",
        });
      }
    }
  }, [open, fine, form]);

  const onSubmit = async (values: FineFormValues) => {
    try {
      const submitData = {
        amount: parseFloat(values.amount),
        reason: values.reason,
        isPaid: values.isPaid,
        loanId: parseInt(values.loanId),
        userId: parseInt(values.userId),
      };

      let response;
      if (isEditMode && fine) {
        response = await FineService.updateFine({
          id: fine.id,
          amount: submitData.amount,
          reason: submitData.reason,
          isPaid: submitData.isPaid,
        });
      } else {
        response = await FineService.createFine({
          amount: submitData.amount,
          reason: submitData.reason,
          loanId: submitData.loanId,
          userId: submitData.userId,
        });
      }

      if (response?.message) {
        toast.error(response.message);
      } else {
        toast.success(
          isEditMode ? "Fine updated successfully" : "Fine created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting fine:", error);
      toast.error("Failed to submit fine");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Fine" : "Create New Fine"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the fine details below"
              : "Enter the fine details below"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter fine reason (e.g., Late return, Damaged book)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="false">Unpaid</SelectItem>
                      <SelectItem value="true">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="loanId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter loan ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter user ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
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
                {isEditMode ? "Update Fine" : "Create Fine"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FineFormDialog;
