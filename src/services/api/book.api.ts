import createInstanceAxios from "@/services/axios.customize";
import qs from "qs";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllBookAPI = (page: number = 1) => {
  const urlBackend = "/api/v1/books";
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(urlBackend, {
    params: { page },
  });
};

export const getBookByIdAPI = (id: number) => {
  return axios.get<IBackendRes<IBook>>(`/api/v1/books/${id}`);
};

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

export const getFilterBookElasticAPI = (
  page: number,
  yearRange: number[] | null,
  priceRange: number[] | null,
  search: string,
  order: string,
  genres: string[],
  language: string | null
) => {
  const urlBackend = "/api/v1/filter/elastic";
  return axios.get(urlBackend, {
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
  });
};

export const getMostBorrowedBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/most-borrowed");
};

export const getTrendingBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/trending");
};

export const getNewArrivalBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/new-arrivals");
};

export const getRecommendedBooksAPI = (userId: number) => {
  return axios.get<IBackendRes<IBook[]>>(`/api/v1/books/recommend/${userId}`);
};

export const getSuggestAPI = (q: string, size = 5) => {
  const urlBackend = "/api/v1/suggest/elastic";
  return axios.get(urlBackend, { params: { q, size } });
};
