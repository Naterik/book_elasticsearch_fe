import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DetailRow } from "./DetailRow";
import { formatCurrency } from "@/helper";
import {
  CreditCard,
  BookOpen,
  Receipt,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { getVNPayUrlAPI, postCreateFinePaymentAPI } from "@/lib/api";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type LoanFineDialogProps = {
  fine: IFine;
  onSuccess?: () => void | Promise<void>;
};

const LoanFineDialog: React.FC<LoanFineDialogProps> = ({ fine, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const book = fine.loan?.bookCopy?.books;

  if (fine.isPaid) {
    return null;
  }

  const handleConfirmPayment = async () => {
    const paymentRef = uuidv4();
    setIsPaying(true);

    try {
      const response = await postCreateFinePaymentAPI(fine.id, paymentRef);
      if (!response.data?.payment) {
        throw new Error(response.message || "Failed to create payment record.");
      }

      const { payment } = response.data;
      const currentPaymentRef = payment.paymentRef ?? paymentRef;

      toast.success("Redirecting to payment gateway...");

      const paymentUrlRes = await getVNPayUrlAPI(
        payment.amount,
        "vn",
        currentPaymentRef,
        "fine"
      );

      if (!paymentUrlRes.data?.url) {
        throw new Error(paymentUrlRes.message || "Payment URL not available.");
      }

      await onSuccess?.();
      setIsOpen(false);
      window.location.href = paymentUrlRes.data.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Payment failed.";
      toast.error(message);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Fine
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Fine Payment</DialogTitle>
          <DialogDescription>
            Review the details below before proceeding to the payment gateway.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 my-4 bg-muted/50 rounded-lg border">
          <div className="space-y-3">
            <DetailRow
              icon={Receipt}
              label="Fine Amount"
              value={formatCurrency(fine.amount)}
              valueClassName="text-red-600"
            />
            <DetailRow icon={ShieldAlert} label="Reason" value={fine.reason} />
            {book && (
              <DetailRow icon={BookOpen} label="Book" value={book.title} />
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPaying}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirmPayment}
            disabled={isPaying}
          >
            {isPaying ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4 mr-2" />
            )}
            {isPaying ? "Processing..." : "Proceed to Pay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoanFineDialog;
