export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    data?: T;
  }

  interface IModelPaginate<T> {
    pagination: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalItems: number;
    };
    result: T[];
  }
  interface IBook {
    id: number;
    isbn: string;
    title: string;
    shortDesc: string | null;
    detailDesc: string | null;
    price: number;
    quantity: number;
    publishDate: string;
    image: string;
    language: string;
    pages: number;
    borrowed: number;
    authorId: number;
    publisherId: number;
    authors: IAuthor;
    genres: IGenreBook[];
    publishers: IPublisher;
  }
  interface IAuthor {
    id: number;
    name: string;
    bio: string | null;
  }
  interface IGenreBook {
    genres: IGenre;
  }
  interface IGenre {
    id: number;
    name: string;
  }
  interface IPublisher {
    id: number;
    name: string;
  }

  interface ILogin {
    access_token: string;
    user: {
      id: number;
      email: string;
      fullName: string | null;
      avatar: string;
      status: string;
      role: string;
      cardNumber: string | null;
    };
  }
  interface IRegister {
    id: number;
    email: string;
    fullName: string | null;
  }
  interface IUser {
    id: number;
    email: string;
    fullName: string | null;
    avatar: string;
    status: string;
    role: string;
    cardNumber: string | null;
  }
  interface ILanguages {
    key: string;
    doc_count: number;
  }

  // Base User Core Properties
  interface IUserBase {
    id: number;
    username: string;
    fullName: string | null;
    address: string | null;
    phone: string | null;
    avatar: string | null;
    status: UserStatus;
    roleId: number;
  }

  interface IUserInfo extends IUserBase {
    cardNumber: string | null;
    membershipStart: string | null;
    membershipEnd: string | null;
  }

  interface IAdminUser extends IUserBase {
    fullName: string;
    type: UserAccountType;
    cardNumber: string | null;
    membershipStart: string | null;
    membershipEnd: string | null;
    googleId: string | null;
    role: {
      id: number;
      name: string;
    };
  }

  interface IAdminUserDetail extends IAdminUser {
    createdAt?: string;
    updatedAt?: string;
  }

  interface IBookCopy {
    id: number;
    year_published: number;
    copyNumber: string;
    status: BookCopyStatus;
    location: string;
    heldByUserId: number | null;
    holdExpiryDate: string | null;
    bookId: number;
    books: IBook;
  }
  interface ILoan {
    id: number;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
    renewalCount: number;
    status: LoanStatus;
    bookcopyId: number;
    userId: number;
    bookCopy: IBookCopy;
    user: IUserInfo;
  }
  interface IFine {
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

  interface IFineDetail extends IFine {
    user: IUserInfo;
  }

  interface IReservation {
    id: number;
    requestDate: string;
    status: ReservationStatus;
    bookId: number;
    userId: number;
    user: IUserInfo;
    book: IBook;
  }

  interface IPayment {
    id: number;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string;
    status: PaymentStatus;
    fineId: number;
    userId: number;
    user?: IUserInfo;
    fine?: IFine;
    paymentRef: string | null;
    type?: string;
  }

  interface INotification {
    id: number;
    sentAt: string;
    type: string;
    content: string;
    isRead: boolean;
    userId: number;
  }

  interface IDashboardStats {
    totalBooks: number;
    totalBooksChange: number;
    activeLoans: number;
    activeLoansChange: number;
    totalSuccessfulPayments: number;
    totalSuccessfulPaymentsChange: number;
    totalUsers: number;
    totalUsersChange: number;
  }
}
