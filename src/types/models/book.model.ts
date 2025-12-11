export interface IAuthor {
  id: number;
  name: string;
  bio?: string | null;
}

export interface IGenre {
  id: number;
  name: string;
  description?: string;
}

export interface IPublisher {
  id: number;
  name: string;
  description?: string;
}

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

export interface IBookElasticIndex extends IBook {
  suggest: string[];
  score: null;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface IBookElasticResponse {
  result: IBookElasticIndex[];
  pagination: IPagination;
}

export interface IGenreBook {
  genres: IGenre;
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

export interface FilterState {
  selectedGenres: string[];
  selectedLanguage: string | null;
  priceRange: [number, number];
  yearRange: [number, number];
}

export interface ILanguages {
  key: string;
  doc_count: number;
}
