import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/StatusBadge";

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
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {bookCopy.books?.title || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "copyNumber",
    header: "Copy Number",
    cell: ({ row }) => {
      return (
        <code className="text-xs bg-muted px-2 py-1 rounded">
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
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.location}</span>;
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit(bookCopy)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(bookCopy.id)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
