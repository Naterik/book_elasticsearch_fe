import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createGenreAPI, updateGenreAPI } from "../services";
import { genreFormSchema, type GenreFormValues } from "@/lib/validators/genre";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!genre;

  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (genre) {
        form.reset({
          name: genre.name,
          description: genre.description || "",
        });
      } else {
        form.reset({
          name: "",
          description: "",
        });
      }
    }
  }, [open, genre, form]);

  const onSubmit = async (values: GenreFormValues) => {
    setIsSubmitting(true);
    try {
      let response;
      if (isEditMode && genre) {
        response = await updateGenreAPI({
          name: values.name,
          description: values.description || "",
          id: genre.id,
        });
      } else {
        response = await createGenreAPI({
          name: values.name,
          description: values.description || "",
        });
      }
      if (response?.message) {
        toast.error(response.message);
      } else if (response?.data) {
        toast.success(
          isEditMode
            ? "Genre updated successfully"
            : "Genre created successfully"
        );
        form.reset();
        onOpenChange(false);
        onSuccess();
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update genre" : "Failed to create genre"
      );
    } finally {
      setIsSubmitting(false);
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter genre description..."
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditMode ? "Update Genre" : "Create Genre"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GenreFormDialog;
