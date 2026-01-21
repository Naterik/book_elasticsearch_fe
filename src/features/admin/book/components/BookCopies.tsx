import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookService from "@/features/admin/book/services";
import { cn } from "@/lib/utils";
import type { IBookCopy } from "@/types/entities/book-copy";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BookCopiesProps {
  bookId: number;
  highlightCopyId?: number;
}

export const BookCopies = ({ bookId, highlightCopyId }: BookCopiesProps) => {
  const [copies, setCopies] = useState<IBookCopy[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCopies = async () => {
      if (!bookId) return;
      setLoading(true);
      try {
        const res = await BookService.getBookCopies(bookId);
        if (res.data) {
           // Providing a fallback if data is wrapped differently, but assuming standard Structure
           setCopies(Array.isArray(res.data) ? res.data : (res.data as any).result || []);
        }
      } catch (error) {
        console.error("Failed to load book copies", error);
        toast.error("Failed to load book copies");
      } finally {
        setLoading(false);
      }
    };
    fetchCopies();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (copies.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground bg-muted/30">
        No copies found for this book.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-muted/20 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold leading-none">Book Copies</h4>
        <Badge variant="outline">{copies.length} copies</Badge>
      </div>
      <div className="overflow-hidden rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Copy Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Year Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {copies.map((copy) => {
              const isHighlighted = highlightCopyId === copy.id;
              
              return (
                <TableRow 
                    key={copy.id}
                    className={cn(isHighlighted && "bg-yellow-100 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30")}
                >
                  <TableCell className="font-mono text-xs">{copy.copyNumber}</TableCell>
                  <TableCell>
                    <Badge variant={copy.status === 'AVAILABLE' ? 'default' : 'secondary'}>
                        {copy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{copy.year_published}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookCopies;
