/**
 * Payment & Fine Related Models
 */

import type { IBook } from "./book";
import type { IUserInfo } from "./user";

export interface IFine {
  id: number;
  amount: number;
  reason: string;
  isPaid: boolean;
  loanId: number;
  userId: number;
  user?: IUserInfo;
  loan?: {
    bookCopy: {
      books: IBook;
    };
  };
}

export interface IFineDetail extends IFine {
  user: IUserInfo;
}

export interface IPayment {
  id: number;
  amount: number;
  paymentDate: string;
  status: string;
  fineId: number;
  userId: number;
  user?: IUserInfo;
  fine?: IFine;
  paymentRef: string | null;
  type?: string;
}
