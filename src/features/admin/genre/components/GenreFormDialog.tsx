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
import { createGenreAPI, updateGenreAPI } from "../services";

const genreFormSchema = z.object({
  name: z.string().min(1, "Genre name is required"),
});

type GenreFormValues = z.infer<typeof genreFormSchema>;

interface GenreFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  genre: IGenre | null;
  onSuccess: () => void;
}

const GenreFormDialog = ({
  open,
  onOpenChange,
  genre,
  onSuccess,
}: GenreFormDialogProps) => {
  const { showLoader, hideLoader } = useCurrentApp();
  const isEditMode = !!genre;

  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (genre) {
        form.reset({
          name: genre.name,
        });
      } else {
        form.reset({
          name: "",
        });
      }
    }
  }, [open, genre, form]);

  const onSubmit = async (values: GenreFormValues) => {
    showLoader();
    try {
      let response;
      if (isEditMode && genre) {
        response = await updateGenreAPI(genre.id, values);
      } else {
        response = await createGenreAPI(values);
      }

      if (response.error) {
        const errorMessage = Array.isArray(response.error)
          ? response.error.join(", ")
          : response.error;
        toast.error(errorMessage);
      } else {
        toast.success(
          isEditMode
            ? "Genre updated successfully"
            : "Genre created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update genre" : "Failed to create genre"
      );
    } finally {
      hideLoader();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Genre" : "Create New Genre"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the genre's information."
              : "Add a new genre to the system."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Science Fiction" {...field} />
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
                {isEditMode ? "Update Genre" : "Create Genre"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GenreFormDialog;
