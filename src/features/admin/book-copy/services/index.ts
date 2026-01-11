import createInstanceAxios from "@/lib/api/axios.customize";
import type { BookCopyFormValues } from "@/lib/validators/book-copy";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IBookCopy } from "@/types/entities/book-copy";
import qs from "qs";
import {
  bookCopiesCountStatusUrl,
  bookCopiesCountYearUrl,
  bookCopiesFilterUrl,
  bookCopiesUrl,
  bookCopyByIdUrl,
} from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllBookCopies = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IBookCopy>>>(bookCopiesUrl, {
    params: { page },
  });
};

export const getFilterBookCopy = (
  page: number = 1,
  search: string = "",
  yearPublished: number | null,
  status: string
) => {
  return axios.get<IBackendRes<IModelPaginate<IBookCopy>>>(
    bookCopiesFilterUrl,
    {
      params: { page, search, yearPublished, status },
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

export const getBookCopyById = (id: number) => {
  return axios.get<IBackendRes<IBookCopy>>(bookCopyByIdUrl(id));
};

export const createBookCopy = (data: BookCopyFormValues) => {
  return axios.post<IBackendRes<IBookCopy>>(bookCopiesUrl, data);
};

export const updateBookCopy = (
  data: Omit<IBookCopy, "heldByUserId" | "holdExpiryDate" | "books">
) => {
  return axios.put<IBackendRes<IBookCopy>>(bookCopiesUrl, data);
};

export const deleteBookCopy = (id: number) => {
  return axios.delete<IBackendRes<void>>(bookCopyByIdUrl(id));
};

export const getCountBookCopiesByStatus = () => {
  return axios.get<IBackendRes<IAggregations[]>>(bookCopiesCountStatusUrl);
};

export const getCountBookCopiesYearPublished = () => {
  return axios.get<IBackendRes<IAggregations[]>>(bookCopiesCountYearUrl);
};

const BookCopyService = {
  getAllBookCopies,
  getFilterBookCopy,
  getBookCopyById,
  createBookCopy,
  updateBookCopy,
  deleteBookCopy,
  getCountBookCopiesByStatus,
  getCountBookCopiesYearPublished,
};

export default BookCopyService;
