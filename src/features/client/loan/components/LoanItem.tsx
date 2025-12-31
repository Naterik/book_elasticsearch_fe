import { useEffect, useState } from "react";
import { Calendar, Clock, CreditCard, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, getCountDate } from "@/helper/index";
import { StatusBadge } from "@/components/StatusBadge";

import { getOnLoanByIdAPI } from "@/lib/api";
import { IMAGE_DEFAULT } from "@/types";
import { LoanActionDialogs } from "./LoanDialog";

interface LoanItemProps {
  loan: ILoan;
  onRenew: (loanId: number) => void;
  renewingId: number | null;
}
export const LoanItem = ({ loan, onRenew, renewingId }: LoanItemProps) => {
  const [dataFine, setDataFine] = useState<IFine | null>(null);
  const { percentRemaining, daysLeft } = getCountDate(
    loan.loanDate,
    loan.dueDate
  );
  const book = loan?.bookCopy?.books;
  let amount = 0;
  const checkCard = loan.user.cardNumber ?? null;

  const canRenew = loan.renewalCount < 2 && loan.status !== "RETURNED";

  useEffect(() => {
    const fetchOnLoanById = async () => {
      const res = await getOnLoanByIdAPI(loan.id);
      if (res.data) {
        setDataFine(res.data);
      }
    };
    if (checkCard) {
      fetchOnLoanById();
    }
  }, [loan.id, checkCard]);

  return (
    <Card
      key={loan.id}
      className="border-l-4 border-l-secondary shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          <img
            src={book.image || IMAGE_DEFAULT}
            alt={book.title}
            className="w-16 h-20 object-cover rounded shadow-sm"
          />

          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-primary">
                {book.title}
              </h3>
              <StatusBadge status={loan.status} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Loan Date:</span>
                </div>
                <div className="font-medium">{formatDate(loan.loanDate)}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span>Due Date:</span>
                </div>
                <div
                  className={`font-medium ${
                    daysLeft < 0
                      ? "text-red-600"
                      : daysLeft <= 3
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {formatDate(loan.dueDate)}
                </div>
              </div>
              {checkCard ? (
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <RotateCcw className="h-3 w-3" />
                    <span>Renewals:</span>
                  </div>
                  <div className="font-medium">{loan.renewalCount}/2</div>
                </div>
              ) : (
                <></>
              )}

              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <CreditCard className="h-3 w-3" />
                  <span>Fine:</span>
                </div>
                <div
                  className={`font-medium ${
                    amount !== 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatCurrency(amount)}
                </div>
              </div>
            </div>

            {loan.status === "RETURNED" ? (
              <Separator />
            ) : (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Loan Period</span>
                  <span
                    className={`font-medium ${
                      daysLeft < 0
                        ? "text-red-600"
                        : daysLeft <= 3
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {daysLeft >= 0
                      ? `Have ${daysLeft} day`
                      : `Due ${Math.abs(daysLeft)} day`}
                  </span>
                </div>

                <Progress
                  value={percentRemaining}
                  className={`h-3 ${daysLeft < 0 ? "bg-red-100" : ""}`}
                />
              </div>
            )}

            <Separator className="my-4" />

            <LoanActionDialogs
              loan={loan}
              canRenew={canRenew}
              onRenew={onRenew}
              fine={dataFine}
              renewingId={renewingId}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
