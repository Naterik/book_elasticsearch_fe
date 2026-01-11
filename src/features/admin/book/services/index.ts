import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IBook, ISelectBookOption } from "@/types/entities/book";
import { bookByIdUrl, bookSelectNameUrl, booksUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getBookSelectOptions = (search?: string) => {
  return axios.get<IBackendRes<ISelectBookOption[]>>(bookSelectNameUrl, {
    params: { search },
  });
};

export const getAllBooks = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(booksUrl, {
    params: { page },
  });
};

export const getBookById = (id: number) => {
  return axios.get<IBackendRes<IBook>>(bookByIdUrl(id));
};

export const createBook = (formData: FormData) => {
  return axios.post<IBackendRes<IBook>>(booksUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateBook = (formData: FormData) => {
  return axios.put<IBackendRes<IBook>>(booksUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBook = (id: number) => {
  return axios.delete<IBackendRes<void>>(bookByIdUrl(id));
};

const BookService = {
  getBookSelectOptions,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default BookService;
