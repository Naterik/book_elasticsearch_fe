import { MoreHorizontal, Pencil, Trash2, ChevronDown } from "lucide-react";
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
import { formatDate } from "@/helper";

export const getReservationColumns = (
  onEdit: (reservation: IReservation) => void,
  onDelete: (reservationId: number) => void,
  onStatusChange: (reservationId: number, newStatus: string) => void
): ColumnDef<IReservation>[] => [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      return <span className="text-sm font-medium">#{row.original.id}</span>;
    },
  },
  {
    accessorKey: "book.title",
    header: "Book Title",
    cell: ({ row }) => {
      const reservation = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {reservation.book?.title || "-"}
          </div>
          <div className="text-xs text-muted-foreground">
            {reservation.book?.authors?.name || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.fullName",
    header: "Member",
    cell: ({ row }) => {
      const reservation = row.original;
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm truncate">
            {reservation.user?.fullName || "-"}
          </div>
          <div className="text-xs text-muted-foreground">
            {reservation.user?.username || "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm">{formatDate(row.original.requestDate)}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const reservation = row.original;
      const status = reservation.status;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <StatusBadge status={status} className="cursor-pointer" />
              <ChevronDown className="ml-1 h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onStatusChange(reservation.id, "PENDING")}
              className="cursor-pointer"
            >
              <StatusBadge status="PENDING" className="mr-2" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(reservation.id, "COMPLETED")}
              className="cursor-pointer"
            >
              <StatusBadge status="COMPLETED" className="mr-2" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(reservation.id, "NOTIFIED")}
              className="cursor-pointer"
            >
              <StatusBadge status="NOTIFIED" className="mr-2" />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onStatusChange(reservation.id, "CANCELED")}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <StatusBadge status="CANCELED" className="mr-2" />
            </DropdownMenuItem>

            {/* <DropdownMenuItem
              onClick={() => onStatusChange(reservation.id, "EXPIRED")}
              className="cursor-pointer"
            >
              <Badge className="bg-gray-100 text-gray-800 border-0 mr-2">
                EXPIRED
              </Badge>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const reservation = row.original;

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
              onClick={() => onEdit(reservation)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(reservation.id)}
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
