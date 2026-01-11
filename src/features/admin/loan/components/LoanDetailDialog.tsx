import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/helper";
import type { ILoan } from "@/types/entities/loan";
import LoanService from "@admin/loan/services";
import { BookOpen, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface LoanDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loanId: number | null;
}

const LoanDetailDialog = ({
  open,
  onOpenChange,
  loanId,
}: LoanDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loan, setLoan] = useState<ILoan | null>(null);

  useEffect(() => {
    if (open && loanId) {
      fetchLoanDetails();
    } else {
      setLoan(null);
    }
  }, [open, loanId]);

  const fetchLoanDetails = async () => {
    if (!loanId) return;
    setIsLoading(true);
    try {
      const response = await LoanService.getLoanById(loanId);

      if (response.data) {
        setLoan(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch loan details");
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
            <BookOpen className="h-6 w-6" />
            Loan Details
          </DialogTitle>
          <DialogDescription>Transaction information</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : loan ? (
          <div className="space-y-6">
            {/* Status & Timeline Card */}
            <div className="bg-muted/30 rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Current Status
                  </p>
                  <Badge
                    variant={
                      loan.status === "RETURNED" ? "secondary" : "default"
                    }
                    className="px-3 py-1 text-sm"
                  >
                    {loan.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Reference ID
                  </p>
                  <p className="font-mono text-sm">#{loan.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 justify-between gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Borrowed On</p>
                  <p className="text-sm font-medium">
                    {formatDate(loan.loanDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Due Date</p>
                  <p className="text-destructive text-sm font-medium">
                    {formatDate(loan.dueDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Returned On</p>
                  <p className="text-sm font-medium">
                    {loan.returnDate ? formatDate(loan.returnDate) : "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Borrower Info */}
              {loan.user && (
                <div className="flex flex-col space-y-3">
                  <div className="text-primary flex items-center gap-2 font-semibold">
                    <User className="h-4 w-4" />
                    <h4>Borrower</h4>
                  </div>
                  <div className="bg-card flex-1 space-y-3 rounded-lg border p-4 text-sm shadow-sm">
                    <div>
                      <span className="text-muted-foreground block text-xs">
                        Full Name
                      </span>
                      <span className="font-medium">{loan.user.fullName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">
                        Email / Username
                      </span>
                      <span className="break-all">{loan.user.username}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Info */}
              {loan.bookCopy && loan.bookCopy.books && (
                <div className="flex flex-col space-y-3">
                  <div className="text-primary flex items-center gap-2 font-semibold">
                    <BookOpen className="h-4 w-4" />
                    <h4>Book Details</h4>
                  </div>
                  <div className="bg-card flex flex-1 items-stretch gap-3 rounded-lg border p-4 text-sm shadow-sm">
                    <div className="space-y-4 overflow-hidden">
                      <p
                        className="line-clamp-2 leading-tight font-medium"
                        title={loan.bookCopy.books.title}
                      >
                        {loan.bookCopy.books.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        ISBN: {loan.bookCopy.books.isbn}
                      </p>
                      <p className="h-5 text-xs">Copy ID: {loan.bookCopy.id}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No loan data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoanDetailDialog;
