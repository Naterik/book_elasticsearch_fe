import { BadgeCheck, MoreHorizontal, Trash2 } from "lucide-react";
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
import { formatDate } from "@/helper";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "returned":
      return "bg-green-200 text-green-800";
    case "lost":
      return "bg-red-200 text-red-800";
    case "overdue":
      return "bg-orange-200 text-orange-900";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getLoanColumns = (
  onDelete: (loanId: number) => void,
  onBookReturn: (loanId: number, userId: number) => void
): ColumnDef<ILoan>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      return <span className="text-sm font-medium">#{row.original.id}</span>;
    },
  },
  {
    accessorKey: "bookCopy.books.title",
    header: "Book Title",
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {loan.bookCopy?.books?.title || "-"}
          </div>
          <div className="text-xs text-muted-foreground">
            Copy: {loan.bookCopy?.copyNumber || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.fullName",
    header: "User",
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {loan.user?.fullName || "-"}
          </div>
          <div className="text-xs text-muted-foreground">
            {loan.user?.cardNumber || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "loanDate",
    header: "Loan Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm">{formatDate(row.original.loanDate)}</span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm">{formatDate(row.original.dueDate)}</span>
      );
    },
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => {
      const returnDate = row.original.returnDate;
      return (
        <span className="text-sm">
          {returnDate ? formatDate(returnDate) : "-"}
        </span>
      );
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
      const loan = row.original;

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
              onClick={() => onBookReturn(loan.id, loan.userId)}
              className="cursor-pointer text-[#26ec18] focus:text-[#0fad0398]"
            >
              <BadgeCheck className="mr-2 h-4 w-4 " color="#26ec18" />
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(loan.id)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" color="red" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
