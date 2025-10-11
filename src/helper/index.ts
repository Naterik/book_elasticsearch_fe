export const getDaysUntilDue = (dueDate: string, loanDate: string) => {
  const due = new Date(dueDate);
  const today = new Date(loanDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
const DAY = 86_400_000; // ms/day
const sod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));

export function getCountDate(
  loanDate: string,
  dueDate: string,
  now: Date = new Date()
) {
  const loan = sod(new Date(loanDate));
  const due = sod(new Date(dueDate));
  const today = sod(now);

  // Tổng số ngày của kỳ mượn (ít nhất 1 để tránh chia 0)
  const totalDays = Math.max(
    1,
    Math.ceil((due.getTime() - loan.getTime()) / DAY)
  );

  // Số ngày còn lại đến hạn (âm nếu quá hạn)
  const rawLeft = Math.ceil((due.getTime() - today.getTime()) / DAY);
  const daysLeft = rawLeft;

  // % còn lại (0..100)
  const percentRemaining = clamp((Math.max(0, daysLeft) / totalDays) * 100);

  return {
    percentRemaining,
    daysLeft,
    totalDays,
    overdueDays: Math.max(0, -daysLeft),
  };
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (isoDateString: string | Date): string => {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
      return "N/A";
    }
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};
