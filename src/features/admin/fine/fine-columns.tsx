import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/helper";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export const getFineColumns = (
  onEdit: (fine: IFine) => void,
  onDelete: (fineId: number) => void,
  onView: (fineId: number) => void
): ColumnDef<IFine>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      return (
        <a
          onClick={(e) => {
            e.preventDefault();
            onView(row.original.id);
          }}
          className="cursor-pointer text-sm font-bold text-blue-600 no-underline hover:no-underline"
        >
          #{row.original.id}
        </a>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-semibold">
          {formatCurrency(row.original.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.reason}</span>;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Status",
    cell: ({ row }) => {
      const fine = row.original;
      return <StatusBadge status={fine.isPaid} />;
    },
  },
  {
    accessorKey: "loanId",
    header: "Loan ID",
    cell: ({ row }) => {
      return <span className="text-sm">Loan #{row.original.loanId}</span>;
    },
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => {
      const fine = row.original;
      return (
        <div className="max-w-xs">
          <div className="truncate text-sm font-medium">
            {fine.user?.fullName || "-"}
          </div>
          <div className="text-muted-foreground text-xs">
            @{fine.user?.username || "-"}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const fine = row.original;

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
                onClick={() => onEdit(fine)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit Fine</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(fine.id)}
                className="text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Fine</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
