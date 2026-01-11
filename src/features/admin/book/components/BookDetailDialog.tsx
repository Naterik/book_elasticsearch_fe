import { useCurrentApp } from "@/app/providers/app.context";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import BookService from "@admin/book/services";
import { BookOpen, Building2, Calendar, Globe, Tag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BookDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: number | null;
}

const BookDetailDialog = ({
  open,
  onOpenChange,
  bookId,
}: BookDetailDialogProps) => {
  const { setIsLoading } = useCurrentApp();
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    if (!open || !bookId) {
      setBook(null);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchBookDetails = async () => {
      setIsLoading(true);
      try {
        const response = await BookService.getBookById(bookId);

        // Chỉ update state nếu component vẫn mounted và bookId không đổi
        if (isMounted && response.data) {
          setBook(response.data);
        }
        if (isMounted && response?.message) {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to fetch book details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [open, bookId]);

  if (!book) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Details</DialogTitle>
          <DialogDescription>
            Complete information about this book
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-6">
            {book.image && (
              <div className="flex-shrink-0">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-60 w-40 rounded-lg border object-cover shadow-md"
                />
              </div>
            )}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  ISBN: {book.isbn}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {book.genres.map((genreBook) => (
                  <Badge key={genreBook.genres.id} variant="secondary">
                    {genreBook.genres.name}
                  </Badge>
                ))}
              </div>

              {book.shortDesc && (
                <p className="text-muted-foreground text-sm">
                  {book.shortDesc}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Author</p>
                <p className="text-muted-foreground text-sm">
                  {book.authors.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Publisher</p>
                <p className="text-muted-foreground text-sm">
                  {book.publishers.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Publish Date</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(book.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Language</p>
                <p className="text-muted-foreground text-sm">{book.language}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Pages</p>
                <p className="text-muted-foreground text-sm">{book.pages}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Price</p>
                <p className="text-muted-foreground text-sm">
                  ${book.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-muted grid grid-cols-3 gap-4 rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{book.quantity}</p>
              <p className="text-muted-foreground text-xs">Total Copies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{book.borrowed}</p>
              <p className="text-muted-foreground text-xs">Borrowed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {book.quantity - book.borrowed}
              </p>
              <p className="text-muted-foreground text-xs">Available</p>
            </div>
          </div>

          {book.detailDesc && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">Description</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {book.detailDesc}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailDialog;
