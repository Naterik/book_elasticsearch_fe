import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createPublisherAPI, updatePublisherAPI } from "../services";
import {
  publisherFormSchema,
  type PublisherFormValues,
} from "@/lib/validators/publisher";

interface PublisherFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publisher: IPublisher | null;
  onSuccess: () => void;
}

const PublisherFormDialog = ({
  open,
  onOpenChange,
  publisher,
  onSuccess,
}: PublisherFormDialogProps) => {
  const isEditMode = !!publisher;

  const form = useForm<PublisherFormValues>({
    resolver: zodResolver(publisherFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (publisher) {
        form.reset({
          name: publisher.name,
        });
      } else {
        form.reset({
          name: "",
        });
      }
    }
  }, [open, publisher, form]);

  const onSubmit = async (values: PublisherFormValues) => {
    try {
      let response;
      if (isEditMode && publisher) {
        response = await updatePublisherAPI(+publisher.id, values);
      } else {
        response = await createPublisherAPI(values);
      }

      if (response?.message) {
        toast.error(response.message);
      } else {
        toast.success(
          isEditMode
            ? "Publisher updated successfully"
            : "Publisher created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update publisher" : "Failed to create publisher"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Publisher" : "Create New Publisher"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the publisher's information."
              : "Add a new publisher to the system."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Penguin Books" {...field} />
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
                {isEditMode ? "Update Publisher" : "Create Publisher"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PublisherFormDialog;
