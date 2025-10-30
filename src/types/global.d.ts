import type * as Models from "./models";
import type * as Enums from "./enums";
import type * as API from "./api";

declare global {
  type IBackendRes<T> = API.IBackendRes<T>;
  type IModelPaginate<T> = API.IModelPaginate<T>;
  type ILogin = API.ILogin;
  type IRegister = API.IRegister;

  // Book Models
  type IBook = Models.IBook;
  type IAuthor = Models.IAuthor;
  type IGenre = Models.IGenre;
  type IGenreBook = Models.IGenreBook;
  type IPublisher = Models.IPublisher;
  type ILanguages = Models.ILanguages;
  type IBookCopy = Models.IBookCopy;

  // User Models
  type IUserBase = Models.IUserBase;
  type IUser = Models.IUser;
  type IUserInfo = Models.IUserInfo;
  type IAdminUser = Models.IAdminUser;
  type IAdminUserDetail = Models.IAdminUserDetail;

  // Loan Models
  type ILoan = Models.ILoan;
  type IReservation = Models.IReservation;

  // Payment Models
  type IFine = Models.IFine;
  type IFineDetail = Models.IFineDetail;
  type IPayment = Models.IPayment;

  // Other Models
  type INotification = Models.INotification;
  type IDashboardStats = Models.IDashboardStats;

  // Enums (as types for backward compatibility)
  type UserStatus = keyof typeof Enums.UserStatus;
  type UserAccountType = keyof typeof Enums.UserAccountType;
  type UserRole = keyof typeof Enums.UserRole;
  type BookCopyStatus = keyof typeof Enums.BookCopyStatus;
  type LoanStatus = keyof typeof Enums.LoanStatus;
  type ReservationStatus = keyof typeof Enums.ReservationStatus;
  type PaymentStatus = keyof typeof Enums.PaymentStatus;
}

export {};
