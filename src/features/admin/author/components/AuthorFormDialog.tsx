import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createAuthorAPI, updateAuthorAPI } from "../services";

const authorFormSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  bio: z.string().optional(),
});

type AuthorFormValues = z.infer<typeof authorFormSchema>;

interface AuthorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author: IAuthor | null;
  onSuccess: () => void;
}

const AuthorFormDialog = ({
  open,
  onOpenChange,
  author,
  onSuccess,
}: AuthorFormDialogProps) => {
  const { showLoader, hideLoader } = useCurrentApp();
  const isEditMode = !!author;

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (author) {
        form.reset({
          name: author.name,
          bio: author.bio || "",
        });
      } else {
        form.reset({
          name: "",
          bio: "",
        });
      }
    }
  }, [open, author, form]);

  const onSubmit = async (values: AuthorFormValues) => {
    showLoader();
    try {
      let response;
      if (isEditMode && author) {
        response = await updateAuthorAPI(author.id, values);
      } else {
        response = await createAuthorAPI(values);
      }

      if (response.error) {
        const errorMessage = Array.isArray(response.error)
          ? response.error.join(", ")
          : response.error;
        toast.error(errorMessage);
      } else {
        toast.success(
          isEditMode
            ? "Author updated successfully"
            : "Author created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update author" : "Failed to create author"
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
            {isEditMode ? "Edit Author" : "Create New Author"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the author's information."
              : "Add a new author to the system."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Stephen King" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short biography of the author..."
                      className="resize-none"
                      rows={4}
                      {...field}
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
              <Button type="submit">
                {isEditMode ? "Update Author" : "Create Author"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorFormDialog;
