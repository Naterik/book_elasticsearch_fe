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
    description: string;
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
  }
  interface ILanguages {
    key: string;
    doc_count: number;
  }
  interface IUserInfo {
    id: number;
    username: string;
    fullName: string | null;
    address: string | null;
    phone: string | null;
    avatar: string | null;
    cardNumber: string | null;
    membershipStart: string | null;
    membershipEnd: string | null;
    status: UserStatus;
    roleId: number;
  }

  interface IBookCopy {
    id: number;
    yearPublished: number;
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

  interface IFine {
    id: number;
    amount: number;
    reason: string;
    isPaid: boolean;
    loan: {
      bookCopy: {
        books: {
          title: string;
        };
      };
    };
  }
}
