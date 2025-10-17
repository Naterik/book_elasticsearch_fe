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
import { formatCurrency } from "@/helper";

const getStatusColor = (isPaid: boolean) => {
  return isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

export const getFineColumns = (
  onEdit: (fine: IFine) => void,
  onDelete: (fineId: number) => void
): ColumnDef<IFine>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      return <span className="text-sm font-medium">#{row.original.id}</span>;
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
      return (
        <Badge variant="outline" className={getStatusColor(fine.isPaid)}>
          {fine.isPaid ? "Paid" : "Unpaid"}
        </Badge>
      );
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
          <div className="font-medium text-sm truncate">
            {fine.user?.fullName || "-"}
          </div>
          <div className="text-xs text-muted-foreground">
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
            <DropdownMenuItem onClick={() => onEdit(fine)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(fine.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
