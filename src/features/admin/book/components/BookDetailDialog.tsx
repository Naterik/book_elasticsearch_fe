import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBookByIdAdminAPI } from "@/features/admin/book/services";
import { Calendar, User, Building2, Tag, Globe, BookOpen } from "lucide-react";

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
  const { showLoader, hideLoader } = useCurrentApp();
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    if (open && bookId) {
      fetchBookDetails();
    }
  }, [open, bookId]);

  const fetchBookDetails = async () => {
    if (!bookId) return;

    showLoader();
    try {
      const response = await getBookByIdAdminAPI(bookId);

      if (response.data) {
        setBook(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      toast.error("Failed to fetch book details");
    } finally {
      hideLoader();
    }
  };

  if (!book) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Details</DialogTitle>
          <DialogDescription>
            Complete information about this book
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Book Cover and Basic Info */}
          <div className="flex gap-6">
            {book.image && (
              <div className="flex-shrink-0">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-40 h-60 rounded-lg object-cover border shadow-md"
                />
              </div>
            )}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
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
                <p className="text-sm text-muted-foreground">
                  {book.shortDesc}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Detailed Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Author</p>
                <p className="text-sm text-muted-foreground">
                  {book.authors.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Publisher</p>
                <p className="text-sm text-muted-foreground">
                  {book.publishers.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Publish Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(book.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Language</p>
                <p className="text-sm text-muted-foreground">{book.language}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Pages</p>
                <p className="text-sm text-muted-foreground">{book.pages}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Price</p>
                <p className="text-sm text-muted-foreground">
                  ${book.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Inventory Information */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold">{book.quantity}</p>
              <p className="text-xs text-muted-foreground">Total Copies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{book.borrowed}</p>
              <p className="text-xs text-muted-foreground">Borrowed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {book.quantity - book.borrowed}
              </p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </div>

          {/* Detailed Description */}
          {book.detailDesc && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
