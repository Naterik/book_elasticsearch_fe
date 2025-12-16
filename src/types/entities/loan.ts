import type { IBookCopy } from "./book-copy";
import type { IUserInfo } from "./user";

export interface ILoan {
  id: number;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  renewalCount: number;
  status: string;
  bookcopyId: number;
  userId: number;
  bookCopy: IBookCopy;
  user: IUserInfo;
}
