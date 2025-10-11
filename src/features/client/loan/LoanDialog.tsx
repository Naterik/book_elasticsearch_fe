import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  RotateCcw,
  Book,
  User,
  Calendar,
  Clock,
  Hash,
  BadgePercent,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/helper";
import { DetailRow } from "./DetailRow";

interface LoanActionDialogsProps {
  loan: ILoan;
  canRenew: boolean;
  onRenew: (loanId: number) => void;
  fine: IFine | null;
}

export const LoanActionDialogs: React.FC<LoanActionDialogsProps> = ({
  loan,
  canRenew,
  onRenew,
  fine,
}) => {
  const book = loan?.bookCopy?.books;
  const fineAmount = fine?.amount ?? 0;

  if (!book) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Dialog Chi tiết */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Eye className="h-4 w-4 mr-2" />
            Chi tiết
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <span className="font-montserrat">Chi tiết lượt mượn</span>
            </DialogTitle>
            <DialogDescription>
              Thông tin tổng quan về sách và lịch sử mượn của bạn.
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
              label="Mã bản sao"
              value={
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  {loan.bookcopyId}
                </span>
              }
            />
            <DetailRow
              icon={Calendar}
              label="Ngày mượn"
              value={formatDate(loan.loanDate)}
            />
            <DetailRow
              icon={Clock}
              label="Hạn trả"
              value={formatDate(loan.dueDate)}
            />
            <DetailRow
              icon={RotateCcw}
              label="Số lần gia hạn"
              value={`${loan.renewalCount} / 2`}
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <DetailRow
              icon={BadgePercent}
              label="Tiền phạt"
              value={formatCurrency(fineAmount)}
              valueClassName={
                fineAmount > 0 ? "text-red-600" : "text-green-600"
              }
            />
          </div>
        </DialogContent>
      </Dialog>

      {canRenew && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="cursor-pointer">
              <RotateCcw className="h-4 w-4 mr-2" />
              Gia hạn
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-montserrat">
                Xác nhận gia hạn sách
              </DialogTitle>
              <DialogDescription>
                Bạn sẽ gia hạn cuốn <strong>"{book.title}"</strong> thêm 14
                ngày.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 my-4 bg-muted/50 rounded-lg border">
              <div className="space-y-3">
                <DetailRow
                  icon={Clock}
                  label="Hạn trả hiện tại"
                  value={formatDate(loan.dueDate)}
                />
                <DetailRow
                  icon={Clock}
                  label="Hạn trả mới"
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
                  label="Lượt gia hạn"
                  value={`${loan.renewalCount + 1} / 2`}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </DialogClose>
              <Button type="button" onClick={() => onRenew(loan.id)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Xác nhận
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
