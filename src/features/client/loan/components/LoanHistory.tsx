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

import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/helper";
import { IMAGE_DEFAULT } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LoanHistory = ({ loanHistory }: { loanHistory: ILoan[] }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Lịch sử mượn sách</CardTitle>
          <CardDescription>
            Danh sách các cuốn sách bạn đã mượn trước đây
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sách</TableHead>
                <TableHead>Ngày mượn</TableHead>
                <TableHead>Hạn trả</TableHead>
                <TableHead>Ngày trả</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanHistory?.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={loan.bookCopy.books.image || IMAGE_DEFAULT}
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
                                {loan.bookCopy.books.title}
                              </p>
                            </div>
                            <TooltipContent>
                              {loan.bookCopy.books.title} <br />
                              {loan.bookCopy.books.authors.name}
                            </TooltipContent>
                          </TooltipTrigger>
                        </Tooltip>
                        <div className="text-sm text-muted-foreground max-w-35 ">
                          <p className="truncate">
                            {loan.bookCopy.books.authors.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(loan.loanDate)}</TableCell>
                  <TableCell>{formatDate(loan.dueDate)}</TableCell>
                  <TableCell>{formatDate(loan.returnDate!)}</TableCell>

                  <TableCell>
                    <StatusBadge status={loan.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanHistory;
