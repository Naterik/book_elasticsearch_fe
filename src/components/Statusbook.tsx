import type { ReservationStatus } from "@/types/info";
import { Badge } from "./ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "OVERDUE":
      return <Badge variant="destructive">{status}</Badge>;
    case "RETURNED":
      return <Badge>{status}</Badge>;
    case "ON_LOAN":
      return <Badge className="bg-blue-500">{status}</Badge>;
    default:
      return <Badge className="bg-red-500">{status}</Badge>;
  }
};

export const getStatusVariant = (status: ReservationStatus) => {
  switch (status) {
    case "NOTIFIED":
      return "default";
    case "PENDING":
      return "secondary";
    case "CANCELED":
      return "destructive";
    default:
      return "outline";
  }
};

export const getStatusBadgeUser = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return <Badge className="bg-green-500">{status}</Badge>;
    case "INACTIVE":
      return <Badge className="bg-orange-400">{status}</Badge>;
    case "SUSPENDED":
      return <Badge className="bg-red-500">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
