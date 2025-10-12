import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoanItem } from "./LoanItem";

interface LoanCurrentProps {
  loanCurrent: ILoan[];
  onRenewLoan: (loanId: number) => Promise<void>;
  renewingId: number | null;
}

const LoanCurrent = ({
  loanCurrent,
  onRenewLoan,
  renewingId,
}: LoanCurrentProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">
            Currently Borrowed Books
          </CardTitle>
          <CardDescription>
            A list of books you are currently borrowing and their return
            information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loanCurrent?.length > 0 ? (
              loanCurrent.map((loan: ILoan) => (
                <LoanItem
                  key={loan.id}
                  loan={loan}
                  onRenew={onRenewLoan}
                  renewingId={renewingId}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                You have no books currently on loan.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCurrent;
