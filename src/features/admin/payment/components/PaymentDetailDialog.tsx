import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/helper";
import type { IPayment } from "@/types/entities/payment";
import PaymentService from "@admin/payment/services";
import { CreditCard, FileText, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PaymentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId: number | null;
}

const PaymentDetailDialog = ({
  open,
  onOpenChange,
  paymentId,
}: PaymentDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState<IPayment | null>(null);

  useEffect(() => {
    if (open && paymentId) {
      fetchPaymentDetails();
    } else {
      setPayment(null);
    }
  }, [open, paymentId]);

  const fetchPaymentDetails = async () => {
    if (!paymentId) return;
    setIsLoading(true);
    try {
      const response = await PaymentService.getPaymentById(paymentId);

      if (response.data) {
        setPayment(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch payment details");
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CreditCard className="h-6 w-6" />
            Payment Details
          </DialogTitle>
          <DialogDescription>Transaction information</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : payment ? (
          <div className="space-y-6">
            {/* Main Info */}
            <div className="bg-muted/50 grid grid-cols-2 gap-4 rounded-lg p-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Amount
                </p>
                <p className="text-primary text-2xl font-bold">
                  {formatCurrency(payment.amount)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <Badge
                  variant={
                    payment.status === "COMPLETED" ||
                    payment.status === "SUCCESS"
                      ? "default"
                      : "destructive"
                  }
                  className="mt-1"
                >
                  {payment.status}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground font-semibold">
                  Date
                </span>
                <span>{formatDate(payment.paymentDate)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground font-semibold">
                  Type
                </span>
                <span>{payment.type || "N/A"}</span>
              </div>
            </div>

            {/* User Info */}
            {payment.user && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold">
                  <User className="h-4 w-4" /> User Information
                </h4>
                <div className="rounded-md border p-3 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name: </span>
                    {payment.user.fullName}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email: </span>
                    {payment.user.username}
                  </p>
                </div>
              </div>
            )}

            {/* Fine Info */}
            {payment.fine && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold">
                  <FileText className="h-4 w-4" /> Fine Details
                </h4>
                <div className="rounded-md border p-3 text-sm">
                  <p>
                    <span className="text-muted-foreground">Reason: </span>
                    {payment.fine.reason}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No payment data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailDialog;
