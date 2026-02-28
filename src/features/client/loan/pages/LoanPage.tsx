import Statistical from "@/components/Statistical";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanCurrent } from "@/features/client/loan";

import LoanFine from "@/features/client/loan/components/LoanFine";
import LoanHistory from "@/features/client/loan/components/LoanHistory";

import { useLoanPage } from "@/features/client/loan/hooks/useLoanPage";
import { AlertTriangle } from "lucide-react";

const LoanPage = () => {
  const {
    dataLoanReturn,
    dataOnLoan,
    fine,
    renewingId,

    stats,
    handleRenewLoan,
    fetchFineByUserId,
  } = useLoanPage();

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <Statistical stats={stats} />

        {stats.overdue > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>You have overdue books!</AlertTitle>
            <AlertDescription>
              You have {stats.overdue} book(s) that are past their due date.
              Please return them as soon as possible to avoid further fines.
            </AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4">
            <TabsTrigger value="current">
              Loan
              <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5">
                {dataOnLoan.length}
                <span className="sr-only"> books on loan</span>
              </Badge>
            </TabsTrigger>
            {dataLoanReturn.length > 0 && (
              <TabsTrigger value="history">
                History
                <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5">
                  {dataLoanReturn.length}
                  <span className="sr-only"> books in history</span>
                </Badge>
              </TabsTrigger>
            )}
            {fine && fine.length > 0 && (
              <TabsTrigger value="fine">
                Fine
                <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5">
                  {fine?.length}
                  <span className="sr-only"> books in fine</span>
                </Badge>
              </TabsTrigger>
            )}


          </TabsList>
          <TabsContent value="current">
            <LoanCurrent
              loanCurrent={dataOnLoan}
              onRenewLoan={handleRenewLoan}
              renewingId={renewingId}
            />
          </TabsContent>
          <TabsContent value="history">
            <LoanHistory loanHistory={dataLoanReturn} />
          </TabsContent>
          <TabsContent value="fine">
            <LoanFine loanFine={fine} onFinePaid={fetchFineByUserId} />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default LoanPage;
