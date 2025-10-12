import { useCurrentApp } from "@/app/providers/app.context";
import Statistical from "@/components/Statistical";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoanCurrent from "@/features/client/loan/LoanCurrent";
import LoanHistory from "@/features/client/loan/LoanHistory";
import LoanReservation from "@/features/client/loan/LoanReservation";
import { getCountDate } from "@/helper";
import {
  getLoanByUserIdAPI,
  getRenewalLoanAPI,
  getReservationByUserAPI,
  getReturnedLoanByUserAPI,
  putCancelReservationAPI,
} from "@/services/loans";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
const LoanPage = () => {
  const { user, showLoader, hideLoader } = useCurrentApp();
  const [dataLoanReturn, setDataLoanReturn] = useState<ILoan[]>([]);
  const [dataOnLoan, setDataOnLoan] = useState<ILoan[]>([]);
  const [dataReservation, setReservation] = useState<IReservation[]>([]);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [renewingId, setRenewingId] = useState<number | null>(null);
  const userId = user?.id;
  const checkStatus = user?.status === "ACTIVE";
  const stats = useMemo(() => {
    let upcomingDue = 0;
    let overdue = 0;
    const totalFine = 0;

    dataOnLoan.forEach((loan) => {
      const { daysLeft } = getCountDate(loan.loanDate, loan.dueDate);

      if (daysLeft < 0) {
        overdue++;
      } else if (daysLeft <= 3) {
        upcomingDue++;
      }
    });

    return {
      onLoan: dataOnLoan.length,
      upcomingDue,
      overdue,
      totalFine,
    };
  }, [dataOnLoan]);

  const onCancelReservation = async (id: number) => {
    setCancellingId(id);
    try {
      const res = await putCancelReservationAPI(id);
      if (res.data) {
        toast.success("Cancel reservation success!");
        fetchReservation();
      } else {
        toast.error(res.message || "Cancel reservation failed.");
      }
    } catch (error) {
      toast.error("Something wrong with cancelling.");
      console.error(error);
    } finally {
      setCancellingId(null);
    }
  };

  const fetchAllLoans = useCallback(async () => {
    if (!userId) return;
    showLoader();
    try {
      const res: any = await getLoanByUserIdAPI(userId);
      if (res.data) {
        setDataOnLoan(res?.data);
      }
    } catch (error) {
      toast.error("Cannot load the book on loan.");
    } finally {
      hideLoader();
    }
  }, [userId, showLoader, hideLoader]);

  const fetchReturnedLoan = useCallback(async () => {
    if (!userId) return;
    showLoader();
    try {
      const res = await getReturnedLoanByUserAPI(userId);
      if (res.data) {
        setDataLoanReturn(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch returned loans");
      console.error(error);
    } finally {
      hideLoader();
    }
  }, [userId, showLoader, hideLoader]);

  const fetchReservation = useCallback(async () => {
    if (!userId) return;
    showLoader();
    try {
      const res = await getReservationByUserAPI(userId);
      if (res.data) {
        setReservation(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch reservation");
      console.error(error);
    } finally {
      hideLoader();
    }
  }, [userId, showLoader, hideLoader]);
  const handleRenewLoan = async (loanId: number) => {
    if (!userId) return;
    setRenewingId(loanId);
    try {
      await getRenewalLoanAPI(loanId, userId);
      toast.success("Book renewed successfully!");
      await fetchAllLoans();
    } catch (error) {
      toast.error("Failed to renew the book. Please try again.");
    } finally {
      setRenewingId(null);
    }
  };
  useEffect(() => {
    fetchAllLoans();
    fetchReturnedLoan();
    if (checkStatus) {
      fetchReservation();
    }
  }, [fetchAllLoans, fetchReturnedLoan, fetchReservation]);

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
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="current">
              Loan
              <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5">
                {dataOnLoan.length}
                <span className="sr-only"> books on loan</span>
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="history">
              History
              <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5">
                {dataLoanReturn.length}
                <span className="sr-only"> books in history</span>
              </Badge>
            </TabsTrigger>
            {checkStatus && (
              <TabsTrigger value="reservations">
                Reservation
                <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5">
                  {dataReservation.length}
                  <span className="sr-only"> book reservations</span>
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
          <TabsContent value="reservations">
            <LoanReservation
              reservationData={dataReservation}
              onCancelReservation={onCancelReservation}
              cancellingId={cancellingId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanPage;
