import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Bell as BellIcon } from "lucide-react";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getLoanByUserIdAPI,
  getFineByUserIdAPI,
  getNotificationsByUserIdAPI,
} from "@/services/api";
import {
  getNotificationIcon,
  getNotificationIconColor,
  getNotificationTitle,
  formatNotificationContent,
} from "@/helper/notificationUtils";

export default function InfoOverview() {
  const { user } = useCurrentApp();
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [fines, setFines] = useState<IFine[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const [loansRes, finesRes, notificationsRes] = await Promise.all([
        getLoanByUserIdAPI(user.id),
        getFineByUserIdAPI(user.id),
        getNotificationsByUserIdAPI(user.id),
      ]);

      if (loansRes?.data && Array.isArray(loansRes.data)) {
        setLoans(loansRes.data.slice(0, 3));
      }
      if (finesRes?.data && Array.isArray(finesRes.data)) {
        setFines(finesRes.data.filter((f: IFine) => !f.isPaid).slice(0, 2));
      }
      if (notificationsRes?.data && Array.isArray(notificationsRes.data)) {
        setNotifications(notificationsRes.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recent Loans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Loans</CardTitle>
          <CardDescription>Your current borrowed books</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : loans.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No active loans</p>
            </div>
          ) : (
            <div className="space-y-3">
              {loans.map((loan) => {
                const isOverdue = new Date(loan.dueDate) < new Date();
                return (
                  <div
                    key={loan.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {loan.bookCopy?.books?.title || "Book"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(loan.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      {isOverdue && (
                        <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded">
                          Overdue
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Link to="/user/loan" className="block mt-4">
            <Button
              variant="outline"
              className="w-full justify-between"
              size="sm"
            >
              View all loans
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Pending Fines & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Alerts</CardTitle>
          <CardDescription>Fines and important notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : fines.length === 0 && notifications.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <BellIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No alerts</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Fines */}
              {fines.map((fine) => (
                <div
                  key={`fine-${fine.id}`}
                  className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-red-900 dark:text-red-400">
                        Fine: {fine.reason}
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-300">
                        {fine.amount.toLocaleString()} ₫
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recent Notifications */}
              {notifications.slice(0, 2).map((notif) => {
                const Icon = getNotificationIcon(notif.type as any);
                const iconColor = getNotificationIconColor(notif.type as any);
                const title = getNotificationTitle(notif.type as any);
                const content = formatNotificationContent(notif.content);

                return (
                  <div
                    key={notif.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link to="/user/loan" className="block">
              <Button variant="outline" className="w-full" size="sm">
                View loans
              </Button>
            </Link>
            <Link to="/user/notifications" className="block">
              <Button variant="outline" className="w-full" size="sm">
                View alerts
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
