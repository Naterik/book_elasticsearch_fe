import { useState, useEffect, useCallback, useMemo } from "react";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";
import { getCountDate } from "@/helper";
import { LoanService } from "@/lib/api";

export const useLoanPage = () => {
  const { user, setIsLoading } = useCurrentApp();
  const [dataLoanReturn, setDataLoanReturn] = useState<ILoan[]>([]);
  const [dataOnLoan, setDataOnLoan] = useState<ILoan[]>([]);

  const [fine, setFine] = useState<IFine[] | null>(null);

  const [renewingId, setRenewingId] = useState<number | null>(null);
  const userId = user?.id ?? 0;
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

  const fetchAllLoans = useCallback(async () => {
    if (!userId || userId === 0) return;
    try {
      const res = await LoanService.getLoanByUserId(userId);
      if (res.data) {
        setDataOnLoan(res?.data);
      }
    } catch (error) {
      toast.error("Cannot load the book on loan.");
    }
  }, [userId]);

  const fetchReturnedLoan = useCallback(async () => {
    if (!userId || userId === 0) return;
    try {
      const res = await LoanService.getReturnedLoanByUser(userId);
      if (res.data) {
        setDataLoanReturn(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch returned loans");
    }
  }, [userId]);



  const fetchFineByUserId = useCallback(async () => {
    if (!userId || userId === 0) return;
    try {
      const res = await LoanService.getFineByUserId(userId);
      if (res.data) {
        setFine(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch fine");
    }
  }, [userId]);

  const handleRenewLoan = async (loanId: number) => {
    if (!userId || userId === 0) return;
    setRenewingId(loanId);
    try {
      await LoanService.renewalLoan(loanId, userId);
      toast.success("Book renewed successfully!");
      await fetchAllLoans();
    } catch (error) {
      toast.error("Failed to renew the book. Please try again.");
    } finally {
      setRenewingId(null);
    }
  };



  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchAllLoans(),
        fetchReturnedLoan(),
        fetchFineByUserId(),

      ]);
      setIsLoading(false);
    };
    initData();
  }, [
    fetchAllLoans,
    fetchReturnedLoan,

    fetchFineByUserId,
    checkStatus,
    setIsLoading,
  ]);

  return {
    dataLoanReturn,
    dataOnLoan,
    fine,
    renewingId,
    checkStatus,
    stats,
    handleRenewLoan,
    fetchFineByUserId,
  };
};
