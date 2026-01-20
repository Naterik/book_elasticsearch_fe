import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBook, IBookElasticIndex, IDigitalBook } from "@/types";
import qs from "qs";
import {
  bookByIdUrl,
  booksUrl,
  digitalBookUrl,
  filterElasticUrl,
  genresDisplayUrl,
  languagesElasticUrl,
  mostBorrowedBooksUrl,
  newArrivalBooksUrl,
  recommendBooksUrl,
  suggestElasticUrl,
  trendingBooksUrl,
  instantSearchUrl,
} from "./url";

export interface IInstantSearchResponse {
  books: (IBook & {
    highlight?: { title?: string[]; shortDesc?: string[]; detailDesc?: string[] };
  })[];
  suggestions: {
    titles: (
      | {
          id: number | string;
          text: string;
          score: number;
          author?: string;
        }
      | string
    )[];
  };
  total: number;
}


const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// --- Book APIs ---

const getAllBooks = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(booksUrl, {
    params: { page },
  });
};

const getBookById = (id: number) => {
  return axios.get<IBackendRes<IBook>>(bookByIdUrl(id));
};

const getFilterBooksElastic = (
  page: number,
  yearRange: number[] | null,
  priceRange: number[] | null,
  search: string,
  order: string,
  selectedGenres: string[] | null,
  selectedLanguage: string | null,
  exactId?: number | string | null,
  limit: number = 10
) => {
  return axios.get<IBackendRes<IModelPaginate<IBookElasticIndex>>>(
    filterElasticUrl,
    {
      params: {
        page,
        limit,
        yearRange,
        priceRange,
        search,
        order,
        genres: selectedGenres,
        language: selectedLanguage,
        exactId,
      },
      paramsSerializer: {
        serialize: (params) =>
          qs.stringify(params, {
            arrayFormat: "repeat",
            skipNulls: true,
          }),
      },
    }
  );
};

const getMostBorrowedBooks = () => {
  return axios.get<IBackendRes<IBook[]>>(mostBorrowedBooksUrl);
};

const getTrendingBooks = () => {
  return axios.get<IBackendRes<IBook[]>>(trendingBooksUrl);
};

const getNewArrivalBooks = () => {
  return axios.get<IBackendRes<IBook[]>>(newArrivalBooksUrl);
};

const getRecommendedBooks = (userId: number) => {
  return axios.get<IBackendRes<IBook[]>>(recommendBooksUrl(userId));
};

const getSuggest = (q: string, size = 5) => {
  return axios.get<IBackendRes<ISuggestResult>>(suggestElasticUrl, {
    params: { q, size },
  });
};

// --- Genre APIs ---

const getAllGenres = () => {
  return axios.get(genresDisplayUrl);
};

const getAllLanguagesElastic = () => {
  return axios.get(languagesElasticUrl);
};

// --- Digital Book APIs ---

const showDigitalBook = (isbn: string) => {
  return axios.get<IBackendRes<IDigitalBook>>(digitalBookUrl(isbn));
};

const getInstantSearch = (q: string) => {
  return axios.get<IBackendRes<IInstantSearchResponse>>(instantSearchUrl, {
    params: { q },
  });
};

const BookService = {
  getAllBooks,
  getBookById,
  getFilterBooksElastic,
  getMostBorrowedBooks,
  getTrendingBooks,
  getNewArrivalBooks,
  getRecommendedBooks,
  getSuggest,
  getAllGenres,
  getAllLanguagesElastic,
  showDigitalBook,
  getInstantSearch,
};

export default BookService;
