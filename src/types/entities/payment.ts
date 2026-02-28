/**
 * Payment & Fine Related Models
 */

import type { IBook } from "./book";
import type { ISystemUser } from "./user";

export interface IFine {
  id: number;
  amount: number;
  reason: string;
  isPaid: boolean;
  loanId: number;
  userId: number;
  user?: ISystemUser;
  loan?: {
    bookCopy: {
      books: IBook;
    };
  };
}

export interface IFineDetail extends IFine {
  user: ISystemUser;
}

export interface IPayment {
  id: number;
  amount: number;
  paymentDate: string;
  status: string;
  fineId: number;
  userId: number;
  user?: ISystemUser;
  fine?: IFine;
  paymentRef: string | null;
  type?: string;
}
