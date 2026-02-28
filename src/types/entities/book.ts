import type { IPagination } from "../api/response.types";
import type { IAuthor } from "./author";
import type { IDigitalBook } from "./digital";
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
  digitalBook: IDigitalBook | null;
  highlight?: {
    title?: string[];
  };
  matchedCopyId?: number;
  isDirectBarcodeMatch?: boolean;

}

export interface IBookElasticIndex extends IBook {
  suggest: string[];
  score: null;
}

export interface IBookElasticResponse {
  result: IBookElasticIndex[];
  pagination: IPagination;
  aggregations?: {
    languages: Record<string, number>;
    // Add other aggregations if needed
  };
}

export interface AdminBookResponse {
    result: IBook[];
    pagination: IPagination;
    aggregations?: {
        languages: Record<string, number>;
    }
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

export interface ISelectBookOption {
  id: number;
  title: string;
  isbn: string;
  image: string;
  authors: IAuthor;
}

export interface AdminBookSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  stock?: "available" | "out_of_stock";
  genreIds?: string; // Comma-separated IDs
  authorIds?: string; // Comma-separated IDs
  language?: string;
}
