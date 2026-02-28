import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IAuthor } from "@/types/entities/author";
import { authorByIdUrl, authorsAllBooksUrl, authorsUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAuthors = (page: number, name?: string) => {
  return axios.get<IBackendRes<IModelPaginate<IAuthor>>>(authorsUrl, {
    params: { page, name },
  });
};

export const createAuthor = (data: { name: string; bio?: string }) => {
  return axios.post<IBackendRes<IAuthor>>(authorsUrl, data);
};

export const updateAuthor = (
  id: number,
  data: { name: string; bio?: string }
) => {
  return axios.put<IBackendRes<IAuthor>>(authorByIdUrl(id), data);
};

export const getAuthorById = (id: number) => {
  return axios.get<IBackendRes<IAuthor>>(authorByIdUrl(id));
};

export const getAllAuthors = () => {
  return axios.get<IBackendRes<IAuthor[]>>(authorsAllBooksUrl);
};

export const deleteAuthor = (id: number) => {
  return axios.delete<IBackendRes<void>>(authorByIdUrl(id));
};

const AuthorService = {
  getAuthors,
  createAuthor,
  updateAuthor,
  getAllAuthors,
  deleteAuthor,
  getAuthorById,
};

export default AuthorService;
