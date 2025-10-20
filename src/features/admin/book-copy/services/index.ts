import createInstanceAxios from "@/services/axios.customize";
import qs from "qs";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Book Copy Management APIs
export const getAllBookCopiesAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/book-copies?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IBookCopy>>>(urlBackend);
};

// Book Copy Elasticsearch Search API - n_gram search
export const getFilterBookCopyElasticAPI = (
  page: number = 1,
  search: string = ""
) => {
  const urlBackend = "/api/v1/book-copies/elastic";
  return axios.get<IBackendRes<IModelPaginate<IBookCopy>>>(urlBackend, {
    params: { page, search },
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          skipNulls: true,
        }),
    },
  });
};

export const getBookCopyByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/book-copies/${id}`;
  return axios.get<IBackendRes<IBookCopy>>(urlBackend);
};

export const createBookCopyAPI = (data: {
  yearPublished: number;
  copyNumber: string;
  status: string;
  location: string;
  bookId: number;
}) => {
  const urlBackend = "/api/v1/book-copies";
  return axios.post<IBackendRes<IBookCopy>>(urlBackend, data);
};

export const updateBookCopyAPI = (data: {
  id: number;
  yearPublished: number;
  copyNumber: string;
  status: string;
  location: string;
  bookId: number;
}) => {
  const urlBackend = `/api/v1/book-copies`;
  return axios.put<IBackendRes<IBookCopy>>(urlBackend, data);
};

export const deleteBookCopyAPI = (id: number) => {
  const urlBackend = `/api/v1/book-copies/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};
