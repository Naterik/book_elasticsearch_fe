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
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/helper";

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PAYMENT_SUCCESS":
      return "bg-green-100 text-green-800";
    case "UNPAID":
      return "bg-red-100 text-red-800";
    case "CANCELLED":
      return "bg-gray-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

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
      return (
        <Badge variant="outline" className={getStatusColor(payment.status)}>
          {payment.status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "fineId",
    header: "Fine ID",
    cell: ({ row }) => {
      return <span className="text-sm">Fine #{row.original.fineId}</span>;
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
