import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
import { getStatusBadge } from "@/components/Statusbook";

const mockLoanHistory = [
  {
    id: "L004",
    bookId: "2",
    bookTitle: "Truyện Kiều",
    authors: ["Nguyễn Du"],
    isbn: "978-604-1-11111-1",
    copyId: "C008",
    loanDate: "2023-10-01",
    dueDate: "2023-11-01",
    returnDate: "2023-10-28",
    status: "returned",
    fineAmount: 0,
    image: "",
  },
  {
    id: "L005",
    bookId: "3",
    bookTitle: "Introduction to Machine Learning",
    authors: ["Andrew Ng", "Michael Jordan"],
    isbn: "978-0-262-01234-5",
    copyId: "C012",
    loanDate: "2023-09-15",
    dueDate: "2023-10-15",
    returnDate: "2023-10-20",
    status: "returned",
    fineAmount: 5000,
    image: "",
  },
];

const LoanHistory = () => {
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
                <TableHead>Phạt</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLoanHistory.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          loan.image ||
                          `/placeholder.svg?height=60&width=45&query=book+cover+${
                            encodeURIComponent(loan.bookTitle) ||
                            "/placeholder.svg"
                          }`
                        }
                        alt={loan.bookTitle}
                        className="w-8 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{loan.bookTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          {loan.authors.join(", ")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{loan.loanDate}</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
                  <TableCell>{loan.returnDate}</TableCell>
                  <TableCell
                    className={loan.fineAmount > 0 ? "text-red-600" : ""}
                  >
                    {formatCurrency(loan.fineAmount)}
                  </TableCell>
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
