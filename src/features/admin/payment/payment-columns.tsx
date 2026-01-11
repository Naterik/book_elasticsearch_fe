import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/helper";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";

export const getPaymentColumns = (
  onDelete: (paymentId: number) => void,
  onView: (paymentId: number) => void
): ColumnDef<IPayment>[] => [
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
          <div className="truncate text-sm font-medium">
            {payment.user?.fullName || "-"}
          </div>
          <div className="text-muted-foreground text-xs">
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
                onClick={() => onDelete(payment.id)}
                className="text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Payment</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
