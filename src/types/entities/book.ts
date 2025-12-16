import type { IPagination } from "../api/response.types";
import type { IAuthor } from "./author";
import type { IGenre } from "./genre";
import type { IPublisher } from "./publisher";

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

export interface IBookElasticResponse {
  result: IBookElasticIndex[];
  pagination: IPagination;
}

export interface IGenreBook {
  genres: IGenre;
}

export interface FilterState {
  selectedGenres: string[];
  selectedLanguage: string | null;
  priceRange: [number, number];
  yearRange: [number, number];
}
