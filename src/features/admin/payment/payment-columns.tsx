import { MoreHorizontal, Trash2 } from "lucide-react";
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
import { formatCurrency, formatDate } from "@/helper";
import { StatusBadge } from "@/components/StatusBadge";

export const getPaymentColumns = (
  onDelete: (paymentId: number) => void
): ColumnDef<IPayment>[] => [
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
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm">{formatDate(row.original.paymentDate)}</span>
      );
    },
  },
  {
    accessorKey: "user.username",
    header: "User",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {payment.user?.fullName || "-"}
          </div>
          <div className="text-xs text-muted-foreground">
            @{payment.user?.username || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const payment = row.original;
      return <StatusBadge status={payment?.status ?? ""} />;
    },
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.type}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => onDelete(payment.id)}
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
