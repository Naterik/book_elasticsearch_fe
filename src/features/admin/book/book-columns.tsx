import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export const getBookColumns = (
  onEdit: (book: IBook) => void,
  onDelete: (bookId: number) => void,
  onView: (bookId: number) => void
): ColumnDef<IBook>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    size: 80,
    cell: ({ row }) => {
      return (
        <button
          onClick={() => onView(row.original.id)}
          className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
        >
          #{row.original.id}
        </button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] hover:cursor-pointer">
                {book.highlight?.title ? (
                  <div
                    className="truncate font-medium [&_em]:not-italic [&_em]:rounded [&_em]:bg-yellow-100 [&_em]:px-0.5 [&_em]:font-bold [&_em]:text-yellow-700"
                    dangerouslySetInnerHTML={{
                      __html: book.highlight.title[0],
                    }}
                  />
                ) : (
                  <div className="truncate font-medium">{book.title}</div>
                )}
                <div className="text-muted-foreground truncate text-xs">
                  {book.shortDesc || "-"}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{book.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "authors",
    header: "Author",

    cell: ({ row }) => {
      return (
        <div className="text-md text-muted-foreground max-w-[150px] truncate">
          {row.original.authors.name || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
          className="bg-muted rounded px-1 py-0.5 text-xs font-mono cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors inline-block"
        >
          {row.original.isbn}
        </div>
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
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="text-left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => onEdit(book)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Book
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(book.id)}
                className="text-destructive cursor-pointer"
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
