import PaymentService from "@client/payment/services";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [paymentRef, setPaymentRef] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");

  useEffect(() => {
    const processPayment = async () => {
      const responseCode = searchParams.get("vnp_ResponseCode");
      const ref = searchParams.get("vnp_TxnRef");
      // Assuming paymentType is passed in the URL query params
      const type = searchParams.get("paymentType") || "membership";

      const status =
        responseCode === "00" ? "PAYMENT_SUCCEED" : "PAYMENT_FAILED";

      setPaymentRef(ref || "");
      setPaymentType(type);
      setPaymentStatus(status);

      if (status === "PAYMENT_SUCCEED" && ref) {
        try {
          if (type === "membership") {
            await PaymentService.updatePaymentMember("SUCCESS", ref);
          } else {
            await PaymentService.updatePaymentFine("SUCCESS", ref);
          }
        } catch (error) {
          console.error("Failed to update payment status", error);
        }
      }
      setIsProcessing(false);
    };

    processPayment();
  }, [searchParams]);

  return { isProcessing, paymentStatus, paymentRef, paymentType };
};
