import type { IUserInfo } from "./user";
import type { IBook } from "./book";

export interface IReservation {
  id: number;
  requestDate: string;
  status: string;
  bookId: number;
  userId: number;
  user: IUserInfo;
  book: IBook;
}
