import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string | boolean;
  className?: string;
  label?: string;
}

// 1. Định nghĩa các nhóm trạng thái
const STATUS_GROUPS = {
  success: [
    "AVAILABLE",
    "ACTIVE",
    "PAID",
    "COMPLETED",
    "APPROVED",
    "RETURNED",
    "NOTIFIED",
    "FULFILLED",
  ],
  warning: ["ON_LOAN", "PENDING", "INACTIVE", "PENDING_CARD", "PROCESSING"],
  destructive: [
    "OVERDUE",
    "SUSPENDED",
    "CANCELED",
    "CANCELLED",
    "REJECTED",
    "UNPAID",
    "FAILED",
    "EXPIRED",
  ],
  info: ["RESERVED", "ON_HOLD", "PAYMENT_SUCCEED"],
  serious: ["LOST"],
};

// 2. Map màu sắc cho từng nhóm
const VARIANT_STYLES = {
  success: "success-badge",
  warning: "warning-badge",
  destructive: "destructive-badge",
  info: "info-badge",
  serious: "serious-badge",
  default: "default-badge",
};

// 3. Helper function xác định style dựa trên status key
const getStatusStyle = (statusKey: string): string => {
  switch (true) {
    case STATUS_GROUPS.success.includes(statusKey):
      return VARIANT_STYLES.success;
    case STATUS_GROUPS.warning.includes(statusKey):
      return VARIANT_STYLES.warning;
    case STATUS_GROUPS.destructive.includes(statusKey):
      return VARIANT_STYLES.destructive;
    case STATUS_GROUPS.info.includes(statusKey):
      return VARIANT_STYLES.info;
    case STATUS_GROUPS.serious.includes(statusKey):
      return VARIANT_STYLES.serious;
    default:
      return VARIANT_STYLES.default;
  }
};

export const StatusBadge = ({ status, className, label }: StatusBadgeProps) => {
  let statusKey = "";
  let displayLabel = label;

  // Xử lý logic chuyển đổi status sang key và label
  if (typeof status === "boolean") {
    if (status) {
      statusKey = "PAID";
      displayLabel = displayLabel || "PAID";
    } else {
      statusKey = "UNPAID";
      displayLabel = displayLabel || "UNPAID";
    }
  } else {
    statusKey = status?.toString().toUpperCase() || "UNKNOWN";
    displayLabel = displayLabel || status;
  }

  // Lấy style class tương ứng
  const variantClass = getStatusStyle(statusKey);

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border px-2.5 py-0.5",
        variantClass,
        className
      )}
    >
      {displayLabel}
    </Badge>
  );
};
