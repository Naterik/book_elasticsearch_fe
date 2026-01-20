import type { IBook } from "./book";

export interface IBookCopy {
  id: number;
  year_published: string;
  copyNumber: string;
  status: BookCopyStatus;
  heldByUserId: number | null;
  holdExpiryDate: string | null;
  bookId: number;
  books: IBook;
}
