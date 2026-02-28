import { useEffect, useState, useCallback } from "react";
import {
  BookOpen,

  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LoanService } from "@/lib/api";
import { useCurrentApp } from "@/app/providers/app.context";

type Activity = {
  id: string;
  type: "loan_active" | "loan_returned" | "fine";
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  status?: "pending" | "completed" | "overdue";
};

export default function InfoHistory() {
  const { user } = useCurrentApp();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const [loansRes, returnsRes, finesRes] =
        await Promise.all([
          LoanService.getLoanByUserId(user.id),
          LoanService.getReturnedLoanByUser(user.id),
          LoanService.getFineByUserId(user.id),
        ]);

      const allActivities: Activity[] = [];

      // Add active loans
      if (loansRes?.data && Array.isArray(loansRes.data)) {
        loansRes.data.forEach((loan: ILoan) => {
          allActivities.push({
            id: `loan-${loan.id}`,
            type: "loan_active",
            title: `Borrowed: ${loan.bookCopy?.books?.title || "Book"}`,
            description: `Due on ${new Date(
              loan.dueDate
            ).toLocaleDateString()}`,
            date: new Date(loan.loanDate).toLocaleDateString(),
            icon: <BookOpen className="h-4 w-4 text-blue-600" />,
            status: new Date(loan.dueDate) < new Date() ? "overdue" : "pending",
          });
        });
      }

      // Add returned loans
      if (returnsRes?.data && Array.isArray(returnsRes.data)) {
        returnsRes.data.forEach((loan: ILoan) => {
          allActivities.push({
            id: `return-${loan.id}`,
            type: "loan_returned",
            title: `Returned: ${loan.bookCopy?.books?.title || "Book"}`,
            description: `Returned on ${
              loan.returnDate
                ? new Date(loan.returnDate).toLocaleDateString()
                : "pending"
            }`,
            date: loan.returnDate || loan.dueDate,
            icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
            status: "completed",
          });
        });
      }



      // Add fines
      if (finesRes?.data && Array.isArray(finesRes.data)) {
        finesRes.data.forEach((fine: IFine) => {
          allActivities.push({
            id: `fine-${fine.id}`,
            type: "fine",
            title: `Fine: ${fine.reason}`,
            description: `Amount: ${fine.amount.toLocaleString()} ₫ - ${
              fine.isPaid ? "Paid" : "Pending"
            }`,
            date: new Date().toLocaleDateString(),
            icon: <AlertCircle className="h-4 w-4 text-red-600" />,
            status: fine.isPaid ? "completed" : "pending",
          });
        });
      }

      // Sort by date (newest first)
      allActivities.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setActivities(allActivities.slice(0, 10)); // Show last 10 activities
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Activity history</CardTitle>
        <CardDescription>All your borrowing/returning activity</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No activity history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border"
              >
                <div className="flex-shrink-0 mt-0.5">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    {activity.status && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          activity.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : activity.status === "overdue"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
