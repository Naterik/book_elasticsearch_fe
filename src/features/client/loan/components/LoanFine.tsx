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
import LoanFineDialog from "./LoanFineDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { IMAGE_DEFAULT } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
                            fine?.loan?.bookCopy.books.image || IMAGE_DEFAULT
                          }
                          alt={fine?.loan?.bookCopy.books.title}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== IMAGE_DEFAULT) {
                              target.src = IMAGE_DEFAULT;
                            }
                          }}
                          className="w-[60px] h-[80px] object-cover rounded flex-shrink-0"
                        />
                        <div>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="font-medium max-w-35">
                                <p className="truncate">
                                  {fine?.loan?.bookCopy.books.title}
                                </p>
                              </div>
                              <TooltipContent>
                                {fine?.loan?.bookCopy.books.title} <br />
                                {fine?.loan?.bookCopy.books.authors.name}
                              </TooltipContent>
                            </TooltipTrigger>
                          </Tooltip>
                          <div className="text-sm text-muted-foreground max-w-35 ">
                            <p className="truncate">
                              {fine?.loan?.bookCopy.books.authors.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(fine.amount)}</TableCell>
                    <TableCell>{fine.reason}</TableCell>
                    <TableCell>
                      <StatusBadge status={fine.isPaid} />
                    </TableCell>
                    <TableCell>
                      <LoanFineDialog fine={fine} onSuccess={onFinePaid} />
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
