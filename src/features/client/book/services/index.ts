import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBookElasticIndex, IDigitalBook } from "@/types";
import qs from "qs";
import {
  booksUrl,
  bookByIdUrl,
  filterBooksUrl,
  filterElasticUrl,
  mostBorrowedBooksUrl,
  trendingBooksUrl,
  newArrivalBooksUrl,
  recommendBooksUrl,
  suggestElasticUrl,
  genresDisplayUrl,
  languagesElasticUrl,
  digitalBookUrl,
} from "./url";

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

const getFilterBooks = (
  page: number,
  yearRange: number[],
  priceRange: number[],
  search: string,
  order: string,
  genres: string[],
  language: string | null
) => {
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(filterBooksUrl, {
    params: { page, yearRange, priceRange, search, order, genres, language },
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          skipNulls: true,
        }),
    },
  });
};

const getFilterBooksElastic = (
  page: number,
  yearRange: number[] | null,
  priceRange: number[] | null,
  search: string,
  order: string,
  genres: string[] | null,
  language: string | null
) => {
  return axios.get<IBackendRes<IModelPaginate<IBookElasticIndex>>>(
    filterElasticUrl,
    {
      params: {
        page,
        yearRange,
        priceRange,
        search,
        order,
        genres,
        language,
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

const BookService = {
  getAllBooks,
  getBookById,
  getFilterBooks,
  getFilterBooksElastic,
  getMostBorrowedBooks,
  getTrendingBooks,
  getNewArrivalBooks,
  getRecommendedBooks,
  getSuggest,
  getAllGenres,
  getAllLanguagesElastic,
  showDigitalBook,
};

export default BookService;
