/**
 * Book API Services
 * Handles book-related operations: search, filter, recommendations
 */

import createInstanceAxios from "@/services/axios.customize";
import qs from "qs";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

/**
 * Get all books with pagination
 */
export const getAllBookAPI = (page: number = 1) => {
  const urlBackend = "/api/v1/books";
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(urlBackend, {
    params: { page },
  });
};

/**
 * Get book by ID
 */
export const getBookByIdAPI = (id: number) => {
  return axios.get<IBackendRes<IBook>>(`/api/v1/books/${id}`);
};

/**
 * Filter books (legacy)
 */
export const filterBookAPI = (
  title: string,
  detailDesc: string,
  minPrice: number,
  maxPrice: number,
  publishDate: string,
  genres: string[],
  page: number
) => {
  const urlBackend = "/api/v1/filter";
  return axios.get<IModelPaginate<IBook>>(urlBackend, {
    params: {
      page,
      title,
      detailDesc,
      minPrice,
      maxPrice,
      publishDate,
      genres,
    },
  });
};

/**
 * Filter books with advanced options
 */
export const getFilterBookAPI = (
  page: number,
  yearRange: number[],
  priceRange: number[],
  search: string,
  order: string,
  genres: string[],
  language: string | null
) => {
  const urlBackend = "/api/v1/books/filter";
  return axios.get(urlBackend, {
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

/**
 * Filter books using Elasticsearch
 */
export const getFilterBookElasticAPI = (
  page: number,
  yearRange: number[],
  priceRange: number[],
  search: string,
  order: string,
  genres: string[],
  language: string | null
) => {
  const urlBackend = "/api/v1/filter/elastic";
  return axios.get(urlBackend, {
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

/**
 * Get most borrowed books
 */
export const getMostBorrowedBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/most-borrowed");
};

/**
 * Get trending books
 */
export const getTrendingBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/trending");
};

/**
 * Get new arrival books
 */
export const getNewArrivalBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/new-arrivals");
};

/**
 * Get recommended books for a user
 */
export const getRecommendedBooksAPI = (userId: number) => {
  return axios.get<IBackendRes<IBook[]>>(`/api/v1/books/recommend/${userId}`);
};

/**
 * Get book suggestions for search (autocomplete)
 */
export const getSuggestAPI = (q: string, size = 5) => {
  const urlBackend = "/api/v1/suggest/elastic";
  return axios.get(urlBackend, { params: { q, size } });
};
