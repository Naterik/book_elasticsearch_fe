import type { IBook } from "./book";

export interface IBookCopy {
  id: number;
  year_published: number;
  copyNumber: string;
  status: string;
  location: string;
  heldByUserId: number | null;
  holdExpiryDate: string | null;
  bookId: number;
  books: IBook;
}
