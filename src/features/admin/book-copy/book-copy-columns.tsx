import { StatusBadge } from "@/components/StatusBadge";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export const getBookCopyColumns = (
  onEdit: (bookCopy: IBookCopy) => void,
  onDelete: (bookCopyId: number) => void
): ColumnDef<IBookCopy>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      return <span className="text-sm font-medium">#{row.original.id}</span>;
    },
  },
  {
    accessorKey: "books.title",
    header: "Book Title",
    cell: ({ row }) => {
      const bookCopy = row.original;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-xs hover:cursor-pointer">
              <div className="truncate text-sm font-medium">
                {bookCopy.books?.title || "-"}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span>{bookCopy.books?.title || "-"}</span>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "copyNumber",
    header: "Copy Number",
    cell: ({ row }) => {
      return (
        <code className="bg-muted rounded px-2 py-1 text-xs">
          {row.original.copyNumber}
        </code>
      );
    },
  },
  {
    accessorKey: "yearPublished",
    header: "Year Published",
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.year_published}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusBadge status={status} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const bookCopy = row.original;

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
                onClick={() => onEdit(bookCopy)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Book Copy
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(bookCopy.id)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Book Copy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
