import { Badge } from "@/components/ui/badge";

const statusConfig = {
  ACTIVE: {
    variant: "default" as const,
    className: "bg-green-500",
    label: "Active",
  },
  PENDING_CARD: {
    variant: "secondary" as const,
    className: "bg-yellow-500",
    label: "Pending Card",
  },
  INACTIVE: {
    variant: "secondary" as const,
    className: "",
    label: "Inactive",
  },
  SUSPENDED: {
    variant: "destructive" as const,
    className: "",
    label: "Suspended",
  },
};

export const StatusBadgeUser = (status: UserStatus) => {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};
