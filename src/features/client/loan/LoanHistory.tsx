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

import { getStatusBadge } from "@/components/Statusbook";
import { formatDate } from "@/helper";

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
                        src={loan.bookCopy.books.image}
                        className="w-8 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">
                          {loan.bookCopy.books.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {loan.bookCopy.books.authors.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(loan.loanDate)}</TableCell>
                  <TableCell>{formatDate(loan.dueDate)}</TableCell>
                  <TableCell>{formatDate(loan.returnDate!)}</TableCell>

                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
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
