import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePaymentReturn } from "@client/payment/hooks/usePaymentReturn";
import {
  ArrowRight,
  CheckCircle2,
  History,
  Home,
  Loader2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const ReturnPayment = () => {
  const { isProcessing, paymentStatus, paymentRef, paymentType } =
    usePaymentReturn();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-2xl border-0 bg-white/80 shadow-2xl backdrop-blur-sm dark:bg-gray-950/80">
        <CardContent className="p-8 md:p-12">
          {isProcessing ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <Loader2 className="h-20 w-20 animate-spin text-blue-500" />
                  <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full bg-blue-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                  Processing Payment
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we verify your transaction...
                </p>
              </div>
            </div>
          ) : paymentStatus === "PAYMENT_SUCCEED" ? (
            <div className="animate-in fade-in space-y-6 text-center duration-500">
              <div className="flex justify-center">
                <div className="relative">
                  <CheckCircle2 className="animate-in zoom-in h-20 w-20 text-green-500 duration-300" />
                  <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full bg-green-500/20" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                  Payment Successful! 🎉
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {paymentType === "membership"
                    ? "Your membership has been successfully activated"
                    : "Your fine has been paid successfully"}
                </p>
              </div>

              {paymentRef && (
                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
                  <CardContent className="p-4">
                    <div className="space-y-1 text-sm">
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

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
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
                  <Link
                    to={
                      paymentType === "membership" ? "/user/info" : "/user/loan"
                    }
                  >
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
            <div className="animate-in fade-in space-y-6 text-center duration-500">
              <div className="flex justify-center">
                <div className="relative">
                  <XCircle className="animate-in zoom-in h-20 w-20 text-red-500 duration-300" />
                  <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full bg-red-500/20" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                  Payment Failed
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Unfortunately, your transaction could not be completed
                </p>
              </div>

              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
                <CardContent className="p-4">
                  <div className="space-y-2 text-left text-sm">
                    <p className="font-semibold text-red-700 dark:text-red-400">
                      Possible reasons:
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
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

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
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
                  <Link
                    to={
                      paymentType === "membership"
                        ? "/user/member"
                        : "/user/loan"
                    }
                  >
                    Try Again
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <p className="pt-4 text-xs text-gray-500 dark:text-gray-500">
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
