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
  console.log("status :>> ", status);
  switch (status) {
    case "NOTIFIED":
      return "default"; // Màu xanh lá (mặc định của Shadcn)
    case "PENDING":
      return "secondary"; // Màu xám
    case "CANCELED":
      return "destructive"; // Màu đỏ
    default:
      return "outline";
  }
};
