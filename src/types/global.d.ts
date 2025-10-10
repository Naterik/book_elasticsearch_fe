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
    shortDesc: string;
    detailDesc: string;
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

  interface Item {
    id: string;
    kind: "BOOK" | "ARTICLE" | "STANDARD";
    image: string;
    title: string;
    authors: string;
    meta1?: string;
    meta2?: string;
    publisher: string;
  }
}
