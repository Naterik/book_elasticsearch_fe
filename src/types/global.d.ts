import { ISuggest } from "./api/response.types";
import type * as Entities from "./entities";
import type * as Enums from "./enums";
import type * as API from "./api/response.types";

declare global {
  type IBackendRes<T> = API.IBackendRes<T>;
  type IModelPaginate<T> = API.IModelPaginate<T>;
  type ILogin = Entities.ILogin;
  type IRegister = Entities.IRegister;
  type IHistorySearch = API.IHistorySearch;
  type ISuggestElastic = API.ISuggestElastic;
  type ISuggest = API.ISuggest;

  type IBook = Entities.IBook;
  type IAuthor = Entities.IAuthor;
  type IGenre = Entities.IGenre;
  type IGenreBook = Entities.IGenreBook;
  type IPublisher = Entities.IPublisher;
  type IAggregations = API.IAggregations;
  type IBookCopy = Entities.IBookCopy;

  type IUserBase = Entities.IUserBase;
  type IUser = Entities.IUser;
  type IUserInfo = Entities.IUserInfo;
  type IAdminUser = Entities.IAdminUser;
  type IAdminUserDetail = Entities.IAdminUserDetail;

  type ILoan = Entities.ILoan;
  type IReservation = Entities.IReservation;

  type IFine = Entities.IFine;
  type IFineDetail = Entities.IFineDetail;
  type IPayment = Entities.IPayment;

  type INotification = Entities.INotification;
  type IDashboardSummary = Entities.IDashboardSummary;

  type UserStatus = keyof typeof Enums.UserStatus;
  type UserAccountType = keyof typeof Enums.UserAccountType;
  type UserRole = keyof typeof Enums.UserRole;
  type BookCopyStatus = keyof typeof Enums.BookCopyStatus;
  type LoanStatus = keyof typeof Enums.LoanStatus;
  type ReservationStatus = keyof typeof Enums.ReservationStatus;
  type PaymentStatus = keyof typeof Enums.PaymentStatus;
}

export {};
