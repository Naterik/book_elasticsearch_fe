import type { IBookCopy } from "./book.model";
import type { IUserInfo } from "./user.model";

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

export interface IReservation {
  id: number;
  requestDate: string;
  status: string;
  bookId: number;
  userId: number;
  user: IUserInfo;
  book: any;
}
