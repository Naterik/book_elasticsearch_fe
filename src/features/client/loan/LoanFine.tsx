import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/helper";
import { Badge } from "@/components/ui/badge";
import LoanFineDialog from "./LoanFineDialog";

interface Props {
  loanFine: IFine[] | null;
  onFinePaid?: () => void | Promise<void>;
}

const LoanFine = ({ loanFine, onFinePaid }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Fine Overview</CardTitle>
          <CardDescription>
            Review and settle fines attached to your loans.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanFine?.length ? (
                loanFine.map((fine) => (
                  <TableRow key={fine.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            fine.loan?.bookCopy.books.image ||
                            "https://placehold.co/56x72?text=Book"
                          }
                          alt={fine.loan?.bookCopy.books.title || "Book cover"}
                          className="w-14 h-18 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">
                            {fine.loan?.bookCopy.books.title || "Unknown title"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {fine.loan?.bookCopy.books.authors.name ||
                              "Unknown author"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(fine.amount)}</TableCell>
                    <TableCell>{fine.reason}</TableCell>
                    <TableCell>
                      {fine.isPaid ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-600 text-white dark:bg-green-700"
                        >
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Unpaid</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {fine.isPaid ? (
                        <span className="text-sm text-muted-foreground">
                          Payment completed
                        </span>
                      ) : (
                        <LoanFineDialog fine={fine} onSuccess={onFinePaid} />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    You have no fines at the moment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanFine;
