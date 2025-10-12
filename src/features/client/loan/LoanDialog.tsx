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
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  RotateCcw,
  User,
  Calendar,
  Clock,
  Hash,
  BadgePercent,
  Loader2,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/helper";
import { DetailRow } from "./DetailRow";

interface LoanActionDialogsProps {
  loan: ILoan;
  canRenew: boolean;
  onRenew: (loanId: number) => void;
  fine: IFine | null;
  renewingId: number | null;
}

export const LoanActionDialogs: React.FC<LoanActionDialogsProps> = ({
  loan,
  canRenew,
  onRenew,
  fine,
  renewingId,
}) => {
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  const book = loan?.bookCopy?.books;
  const fineAmount = fine?.amount ?? 0;
  const isRenewing = renewingId === loan.id;
  if (!book) {
    return null;
  }
  const handleConfirmRenew = async () => {
    await onRenew(loan.id);
    setIsRenewDialogOpen(false);
  };
  return (
    <div className="flex gap-2 flex-wrap">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Eye className="h-4 w-4 mr-2" />
            Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Loan Details</DialogTitle>
            <DialogDescription>
              Overview of the book and your loan history.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <img
              src={
                book.image ||
                `https://placehold.co/100x140/e2e8f0/64748b?text=${encodeURIComponent(
                  book.title
                )}`
              }
              alt={book.title}
              className="w-24 h-36 object-cover rounded-md self-center sm:self-start"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">
                {book.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <User className="h-4 w-4 mr-2" />
                <span>{book.authors.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ISBN: {book.isbn}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <DetailRow
              icon={Hash}
              label="Copy code"
              value={
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  {loan.bookcopyId}
                </span>
              }
            />
            <DetailRow
              icon={Calendar}
              label="Loan date"
              value={formatDate(loan.loanDate)}
            />
            <DetailRow
              icon={Clock}
              label="Due date"
              value={formatDate(loan.dueDate)}
            />
            <DetailRow
              icon={RotateCcw}
              label="Renewal Count"
              value={`${loan.renewalCount} / 2`}
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <DetailRow
              icon={BadgePercent}
              label="Fine"
              value={formatCurrency(fineAmount)}
              valueClassName={
                fineAmount > 0 ? "text-red-600" : "text-green-600"
              }
            />
          </div>
        </DialogContent>
      </Dialog>

      {canRenew && (
        <Dialog open={isRenewDialogOpen} onOpenChange={setIsRenewDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Renew
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Book Renewal</DialogTitle>
              <DialogDescription>
                You are about to renew the book <strong>"{book.title}"</strong>{" "}
                for another 14 days.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 my-4 bg-muted/50 rounded-lg border">
              <div className="space-y-3">
                <DetailRow
                  icon={Clock}
                  label="Current Due Date"
                  value={formatDate(loan.dueDate)}
                />
                <DetailRow
                  label="New Due Date"
                  icon={Clock}
                  value={formatDate(
                    new Date(
                      new Date(loan.dueDate).getTime() +
                        14 * 24 * 60 * 60 * 1000
                    )
                  )}
                  valueClassName="text-green-600"
                />
                <DetailRow
                  icon={RotateCcw}
                  label="Renewal Count"
                  value={`${loan.renewalCount + 1} / 2`}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRenewDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmRenew}
                disabled={isRenewing}
              >
                {isRenewing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4 mr-2" />
                )}
                {isRenewing ? "Renewing..." : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
