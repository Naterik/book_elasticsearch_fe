import { useCurrentApp } from "@/app/providers/app.context";
import { updatePaymentMemberAPI, updatePaymentFineAPI } from "@/services/api";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Home,
  History,
  ArrowRight,
} from "lucide-react";

type PaymentType = "membership" | "fine";

const ReturnPayment = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "PAYMENT_SUCCEED" | "PAYMENT_FAILED" | "processing"
  >("processing");

  const paymentRef = searchParams?.get("vnp_TxnRef") ?? "";
  const responseCode = searchParams?.get("vnp_ResponseCode") ?? "";
  const paymentType = (searchParams?.get("paymentType") ??
    "membership") as PaymentType;
  const { showLoader, hideLoader, setUser } = useCurrentApp();

  useEffect(() => {
    if (paymentRef) {
      const changeStatusPayment = async () => {
        showLoader();
        setIsProcessing(true);

        try {
          const status =
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
          hideLoader();
          setIsProcessing(false);
        }
      };

      changeStatusPayment();
    } else {
      setIsProcessing(false);
      setPaymentStatus("PAYMENT_FAILED");
    }
  }, [paymentRef, responseCode, paymentType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <CardContent className="p-8 md:p-12">
          {isProcessing ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Loader2 className="h-20 w-20 text-blue-500 animate-spin" />
                  <div className="absolute inset-0 h-20 w-20 rounded-full bg-blue-500/20 animate-ping" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Processing Payment
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we verify your transaction...
                </p>
              </div>
            </div>
          ) : paymentStatus === "PAYMENT_SUCCEED" ? (
            <div className="text-center space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-center">
                <div className="relative">
                  <CheckCircle2 className="h-20 w-20 text-green-500 animate-in zoom-in duration-300" />
                  <div className="absolute inset-0 h-20 w-20 rounded-full bg-green-500/20 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Payment Successful! 🎉
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {paymentType === "membership"
                    ? "Your membership has been successfully activated"
                    : "Your fine has been paid successfully"}
                </p>
              </div>

              {paymentRef && (
                <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600 dark:text-gray-400">
                        Transaction Reference
                      </p>
                      <p className="font-mono font-semibold text-green-700 dark:text-green-400">
                        {paymentRef}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    Go to Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2"
                >
                  <Link to={paymentType === "membership" ? "/info" : "/loan"}>
                    <History className="h-4 w-4" />
                    {paymentType === "membership" ? "View Info" : "View Loans"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* <p className="text-xs text-gray-500 dark:text-gray-500 pt-4">
                A confirmation email has been sent to your registered email
                address
              </p> */}
            </div>
          ) : (
            <div className="text-center space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-center">
                <div className="relative">
                  <XCircle className="h-20 w-20 text-red-500 animate-in zoom-in duration-300" />
                  <div className="absolute inset-0 h-20 w-20 rounded-full bg-red-500/20 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Payment Failed
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Unfortunately, your transaction could not be completed
                </p>
              </div>

              <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="text-sm space-y-2 text-left">
                    <p className="font-semibold text-red-700 dark:text-red-400">
                      Possible reasons:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Insufficient funds in your account</li>
                      <li>Payment timeout or network error</li>
                      <li>Transaction was cancelled</li>
                      <li>Invalid card information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {paymentRef && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    Transaction Reference:{" "}
                    <span className="font-mono font-semibold">
                      {paymentRef}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild size="lg" className="flex-1 gap-2">
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    Go to Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2"
                >
                  <Link to={paymentType === "membership" ? "/member" : "/loan"}>
                    Try Again
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 pt-4">
                Need help? Please contact our support team with your transaction
                reference
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnPayment;
