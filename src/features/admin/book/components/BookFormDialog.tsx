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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createBookAPI, updateBookAPI } from "@/features/admin/book/services";
import {
  getAllAuthorsAPI,
  getAllPublishersAPI,
  getAllGenresAPI,
} from "@/services/admin";
import { Upload, X } from "lucide-react";
import { bookFormSchema, type BookFormValues } from "@/lib/validators/book";
import { Textarea } from "@/components/ui/textarea";

interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: IBook | null;
  onSuccess: () => void;
}

const BookFormDialog = ({
  open,
  onOpenChange,
  book,
  onSuccess,
}: BookFormDialogProps) => {
  const { setIsLoading } = useCurrentApp();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const isEditMode = !!book;

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      isbn: "",
      title: "",
      shortDesc: "",
      detailDesc: "",
      price: "",
      quantity: "",
      publishDate: "",
      language: "",
      pages: "",
      authorId: "",
      publisherId: "",
      genreIds: [],
      image: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      fetchDropdownData();
      if (book) {
        form.reset({
          isbn: book.isbn,
          title: book.title,
          shortDesc: book.shortDesc || "",
          detailDesc: book.detailDesc || "",
          price: book.price.toString(),
          quantity: book.quantity.toString(),
          publishDate: book.publishDate,
          language: book.language,
          pages: book.pages.toString(),
          authorId: book.authorId.toString(),
          publisherId: book.publisherId.toString(),
          genreIds: book.genres.map((g) => g.genres.id.toString()),
          image: undefined,
        });
        if (book.image) {
          setImagePreview(book.image);
        }
      } else {
        form.reset({
          isbn: "",
          title: "",
          shortDesc: "",
          detailDesc: "",
          price: "",
          quantity: "",
          publishDate: "",
          language: "",
          pages: "",
          authorId: "",
          publisherId: "",
          genreIds: [],
          image: undefined,
        });
        setImagePreview(null);
      }
    }
  }, [open, book, form]);

  const fetchDropdownData = async () => {
    try {
      const [authorsRes, publishersRes, genresRes] = await Promise.all([
        getAllAuthorsAPI(),
        getAllPublishersAPI(),
        getAllGenresAPI(),
      ]);

      if (authorsRes.data) {
        setAuthors(authorsRes.data);
      }
      if (publishersRes.data) {
        setPublishers(publishersRes.data);
      }
      if (genresRes.data) {
        setGenres(genresRes.data);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      toast.error("Failed to load form data");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue("image", undefined);
    const fileInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (values: BookFormValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("isbn", values.isbn);
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("publishDate", values.publishDate);
      formData.append("language", values.language);
      formData.append("pages", values.pages);
      formData.append("authorId", values.authorId);
      formData.append("publisherId", values.publisherId);

      if (values.shortDesc) {
        formData.append("shortDesc", values.shortDesc);
      }
      if (values.detailDesc) {
        formData.append("detailDesc", values.detailDesc);
      }

      // Add genre IDs as an array
      values.genreIds.forEach((genreId) => {
        formData.append("genreIds[]", genreId);
      });

      if (values.image instanceof File) {
        formData.append("image", values.image);
      } else if (isEditMode) {
      }

      let response;
      if (isEditMode) {
        if (book?.id) {
          formData.append("id", book.id.toString());
        }
        response = await updateBookAPI(formData);
      } else {
        response = await createBookAPI(formData);
      }

      if (response.error) {
        const errorMessage = Array.isArray(response.error)
          ? response.error.join(", ")
          : response.error;
        toast.error(errorMessage);
      } else {
        toast.success(
          isEditMode ? "Book updated successfully" : "Book created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update book" : "Failed to create book"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Book" : "Create New Book"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update book information in the library"
              : "Add a new book to the library catalog"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN *</FormLabel>
                    <FormControl>
                      <Input placeholder="978-0-123456-78-9" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language *</FormLabel>
                    <FormControl>
                      <Input placeholder="English" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Book Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="detailDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="29.99"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pages *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="350" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="publishDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {authors.map((author) => (
                          <SelectItem
                            key={author.id}
                            value={author.id.toString()}
                          >
                            {author.name}
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
                name="publisherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publisher *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a publisher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {publishers.map((publisher) => (
                          <SelectItem
                            key={publisher.id}
                            value={publisher.id.toString()}
                          >
                            {publisher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="genreIds"
              render={() => (
                <FormItem>
                  <FormLabel>Genres *</FormLabel>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                    {genres.map((genre) => (
                      <FormField
                        key={genre.id}
                        control={form.control}
                        name="genreIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={genre.id}
                              className="flex flex-row items-start space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(
                                    genre.id.toString()
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          genre.id.toString(),
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) =>
                                              value !== genre.id.toString()
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm cursor-pointer">
                                {genre.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Book Cover Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {imagePreview && (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Book cover preview"
                            className="w-32 h-48 rounded-md object-cover border-2 border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Input
                          id="image-input"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Max file size: 5MB. Supported formats: JPG, PNG, GIF
                      </p>
                    </div>
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
                {isEditMode ? "Update Book" : "Create Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookFormDialog;
