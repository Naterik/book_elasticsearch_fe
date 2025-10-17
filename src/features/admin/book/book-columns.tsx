import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/helper";

export const getBookColumns = (
  onEdit: (book: IBook) => void,
  onDelete: (bookId: number) => void,
  onView: (bookId: number) => void
): ColumnDef<IBook>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      return (
        <button
          onClick={() => onView(row.original.id)}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          #{row.original.id}
        </button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Cover",
    cell: ({ row }) => {
      const book = row.original;
      return book.image ? (
        <img
          src={book.image}
          alt={book.title}
          className="w-12 h-16 object-cover rounded"
        />
      ) : (
        <div className="w-12 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
          No Image
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="max-w-xs">
          <div className="truncate font-medium">{book.title}</div>
          <div className="text-xs text-muted-foreground truncate">
            {book.shortDesc || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "authors",
    header: "Author",
    cell: ({ row }) => {
      return <span>{row.original.authors.name}</span>;
    },
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => {
      return (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          {row.original.isbn}
        </code>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{formatCurrency(row.original.price)}</div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.quantity}</Badge>;
    },
  },
  {
    accessorKey: "borrowed",
    header: "Borrowed",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.borrowed > 0 ? "default" : "secondary"}>
          {row.original.borrowed}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(book.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(book)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Book
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(book.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
