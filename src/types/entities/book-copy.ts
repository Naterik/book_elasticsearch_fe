import type { IBook } from "./book";

export interface IBookCopy {
  id: number;
  year_published: string;
  copyNumber: string;
  status: BookCopyStatus;
  bookId: number;
  books: IBook;
}
