import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper";
import LoanService from "@client/loan/services";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FinePaymentFormProps {
  fine: { id: number; amount: number };
  onSuccess: () => void;
}

export function FinePaymentForm({ fine, onSuccess }: FinePaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    try {
      const res = await LoanService.createFinePayment(fine.id, null);

      if (res.data) {
        toast.success("Fine paid successfully!");
        onSuccess();
      } else {
        toast.error(res.message || "Payment failed.");
      }
    } catch (error) {
      toast.error("An error occurred during payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-600">Amount to pay:</p>
        <p className="text-3xl font-bold">{formatCurrency(fine.amount)}</p>
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Please confirm that you want to proceed with the payment for this fine.
      </p>

      <Button
        onClick={handleConfirmPayment}
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Confirm Payment
      </Button>
    </div>
  );
}
