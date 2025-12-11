import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { updatePaymentMemberAPI, updatePaymentFineAPI } from "@/services/api";

type PaymentType = "membership" | "fine";
type PaymentStatus = "PAYMENT_SUCCEED" | "PAYMENT_FAILED" | "processing";

export const usePaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("processing");
  const { setIsLoading, setUser } = useCurrentApp();
  const paymentRef = searchParams?.get("vnp_TxnRef") ?? "";
  const responseCode = searchParams?.get("vnp_ResponseCode") ?? "";
  const paymentType = (searchParams?.get("paymentType") ??
    "membership") as PaymentType;

  const changeStatusPayment = async () => {
    setIsLoading(true);
    setIsProcessing(true);

    try {
      const status: PaymentStatus =
        responseCode === "00" ? "PAYMENT_SUCCEED" : "PAYMENT_FAILED";
      setPaymentStatus(status);

      if (paymentType === "membership") {
        const res = await updatePaymentMemberAPI(status, paymentRef);
        if (res.data) {
          toast.success("Payment status updated successfully");
          setUser(res.data);
        } else {
          toast.error("Failed to update payment status");
          setPaymentStatus("PAYMENT_FAILED");
        }
      } else if (paymentType === "fine") {
        const res = await updatePaymentFineAPI(status, paymentRef);
        if (res.data) {
          toast.success("Fine payment processed successfully");
        } else {
          toast.error("Failed to process fine payment");
          setPaymentStatus("PAYMENT_FAILED");
        }
      }
    } catch (error) {
      toast.error("An error occurred while processing payment");
      setPaymentStatus("PAYMENT_FAILED");
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (paymentRef) {
      changeStatusPayment();
    } else {
      setIsProcessing(false);
      setPaymentStatus("PAYMENT_FAILED");
    }
  }, [paymentRef, responseCode, paymentType]);

  return {
    isProcessing,
    paymentStatus,
    paymentRef,
    paymentType,
  };
};
