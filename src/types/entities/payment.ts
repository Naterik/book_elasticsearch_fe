/**
 * Payment & Fine Related Models
 */

import type { IUserInfo } from "./user";
import type { IBook } from "./book";

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
  paymentMethod: string;
  transactionId: string;
  status: string;
  fineId: number;
  userId: number;
  user?: IUserInfo;
  fine?: IFine;
  paymentRef: string | null;
  type?: string;
}
