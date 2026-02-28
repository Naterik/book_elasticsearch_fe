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
import { formatDate } from "@/helper";
import type { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck, Eye, MoreHorizontal, Trash2 } from "lucide-react";

export const getLoanColumns = (
  onDelete: (loanId: number) => void,
  onBookReturn: (loanId: number, userId: number) => void,
  onView: (loanId: number) => void
): ColumnDef<ILoan>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    size: 50,
    cell: ({ row }) => {
      return (
        <a
          onClick={(e) => {
            e.preventDefault();
            onView(row.original.id);
          }}
          className="cursor-pointer font-bold text-blue-600 no-underline hover:no-underline"
        >
          #{row.original.id}
        </a>
      );
    },
  },
  {
    accessorKey: "bookCopy.books.title",
    header: "Book Title",
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-xs">
              <div className="truncate text-sm font-medium hover:cursor-pointer">
                {loan.bookCopy?.books?.title || "-"}
              </div>
              <div className="text-muted-foreground text-xs">
                Copy: {loan.bookCopy?.copyNumber || "-"}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span>{loan.bookCopy?.books?.title || "-"}</span>
          </TooltipContent>
        </Tooltip>
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
          <div className="truncate text-sm font-medium">
            {loan.user?.fullName || "-"}
          </div>
          <div className="text-muted-foreground text-xs">
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
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const loan = row.original;

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
              {loan.status?.toUpperCase() === "ON_LOAN" ? (
                <DropdownMenuItem
                  onClick={() => onBookReturn(loan.id, loan.userId)}
                  className="cursor-pointer text-[#26ec18] focus:text-[#0fad0398]"
                >
                  <BadgeCheck color="#26ec18" className="mr-2 h-4 w-4" />
                  Approved
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onView(loan.id)}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(loan.id)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Loan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
