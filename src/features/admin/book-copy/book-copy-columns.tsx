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
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "available":
      return "bg-green-100 text-green-800";
    case "on_loan":
      return "bg-yellow-100 text-yellow-800";
    case "on_hold":
      return "bg-blue-100 text-blue-800";
    case "lost":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

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
      console.log("row :>> ", row);
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
      return (
        <Badge className={`${getStatusColor(status)} border-0`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
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
