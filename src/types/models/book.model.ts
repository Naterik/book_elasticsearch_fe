export interface IBook {
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

export interface IAuthor {
  id: number;
  name: string;
  bio: string | null;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreBook {
  genres: IGenre;
}

export interface IPublisher {
  id: number;
  name: string;
}

export interface ILanguages {
  key: string;
  doc_count: number;
}

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
