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

  const totalDays = Math.max(
    1,
    Math.ceil((due.getTime() - loan.getTime()) / DAY)
  );

  const rawLeft = Math.ceil((due.getTime() - today.getTime()) / DAY);
  const daysLeft = rawLeft;
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

export const calculateDueDate = (days: number) => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};
