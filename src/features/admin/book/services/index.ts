import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { 
  AdminBookResponse, 
  AdminBookSearchParams, 
  IBook, 
  ISelectBookOption 
} from "@/types/entities/book";
import type { IBookCopy } from "@/types/entities/book-copy";
import {
  bookByIdUrl,
  bookCopiesUrl,
  bookSelectNameUrl,
  booksUrl,
  searchAdminBooksUrl,
  languagesElasticUrl,
} from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// ... existing CRUD functions ...
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



export const getAllLanguagesElastic = () => {
  return axios.get<IBackendRes<AdminBookResponse["aggregations"]>>(languagesElasticUrl);
};

export const searchAdminBooks = (params: AdminBookSearchParams) => {
    // Convert params to query string for flexibility
    const queryParams: Record<string, any> = {
      q: params.q,
      page: params.page,
      limit: params.limit,
      stock: params.stock,
      genreIds: params.genreIds,
      authorIds: params.authorIds,
      language: params.language
    };

    // Filter undefined values
    Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);

    return axios.get<IBackendRes<AdminBookResponse>>(searchAdminBooksUrl, {
      params: queryParams,
    });
};

export const getBookCopies = (bookId: number) => {
    return axios.get<IBackendRes<IBookCopy[]>>(
      bookCopiesUrl(bookId)
    );
};

const BookService = {
  getBookSelectOptions,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,

  getAllLanguagesElastic,
  searchAdminBooks,
  getBookCopies,
};

export default BookService;
