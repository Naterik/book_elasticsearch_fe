import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, BookCheck, Calendar } from "lucide-react";

const ActionableAlerts = ({
  loans,
  reservations,
  onViewLoans,
  onViewReservations,
}: any) => {
  const overdueLoans =
    loans?.filter((loan: ILoan) => {
      const dueDate = new Date(loan.dueDate);
      const today = new Date();
      return loan.status === "ON_LOAN" && dueDate < today;
    }) || [];

  const dueSoonLoans =
    loans?.filter((loan: ILoan) => {
      const dueDate = new Date(loan.dueDate);
      const today = new Date();
      const threeDaysLater = new Date(
        today.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      return (
        loan.status === "ON_LOAN" &&
        dueDate >= today &&
        dueDate <= threeDaysLater
      );
    }) || [];

  const readyReservations =
    reservations?.filter((r: IReservation) => r.status === "NOTIFIED") || [];

  type AlertVariant = "destructive" | "default";
  const alerts: {
    variant: AlertVariant;
    icon: any;
    title: string;
    description: string;
    action: string;
    onClick: () => void;
  }[] = [];

  if (overdueLoans.length > 0) {
    alerts.push({
      variant: "destructive",
      icon: AlertTriangle,
      title: "Overdue Books",
      description: `You have ${overdueLoans.length} overdue book${
        overdueLoans.length > 1 ? "s" : ""
      }. Please return them to avoid late fees.`,
      action: "View Details",
      onClick: onViewLoans,
    });
  }

  if (dueSoonLoans.length > 0) {
    alerts.push({
      variant: "destructive",
      icon: Calendar,
      title: "Books Due Soon",
      description: `You have ${dueSoonLoans.length} book${
        dueSoonLoans.length > 1 ? "s" : ""
      } due in the next 3 days.`,
      action: "View Details",
      onClick: onViewLoans,
    });
  }

  if (readyReservations.length > 0) {
    alerts.push({
      variant: "default",
      icon: BookCheck,
      title: "Books Ready for Pickup",
      description: `You have ${readyReservations.length} book${
        readyReservations.length > 1 ? "s" : ""
      } ready for pickup. Visit the library to collect them!`,
      action: "View Reservations",
      onClick: onViewReservations,
    });
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <Alert key={index} variant={alert.variant}>
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>
                      {alert.description}{" "}
                      <button
                        onClick={alert.onClick}
                        className="font-semibold underline hover:no-underline cursor-pointer"
                      >
                        {alert.action}
                      </button>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActionableAlerts;
