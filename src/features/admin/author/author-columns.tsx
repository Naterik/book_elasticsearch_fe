import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export const getAuthorColumns = (
  onEdit: (author: IAuthor) => void,
  onDelete: (authorId: number) => void,
  onView: (authorId: number) => void
): ColumnDef<IAuthor>[] => [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "bio",
    header: "Biography",
    cell: ({ row }) => {
      const bio = row.original.bio;
      return (
        <p className="text-muted-foreground max-w-xs truncate text-sm">
          {bio || <span className="italic">No biography</span>}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const author = row.original;
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
                onClick={() => onEdit(author)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Author
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(author.id)}
                className="text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Author
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
