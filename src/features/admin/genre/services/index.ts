import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IGenre } from "@/types/entities/genre";
import { genreByIdUrl, genresAllBooksUrl, genresUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getGenres = (params?: { page?: number }) => {
  return axios.get<IBackendRes<IModelPaginate<IGenre>>>(genresUrl, {
    params,
  });
};

export const createGenre = (data: { name: string; description: string }) => {
  return axios.post<IBackendRes<IGenre>>(genresUrl, data);
};

export const updateGenre = (data: IGenre) => {
  return axios.put<IBackendRes<IGenre>>(genresUrl, data);
};

export const getGenreById = (id: number) => {
  return axios.get<IBackendRes<IGenre>>(genreByIdUrl(id));
};

export const deleteGenre = (id: number) => {
  return axios.delete<IBackendRes<null>>(genreByIdUrl(id));
};

export const getAllGenres = () => {
  return axios.get<IBackendRes<IGenre[]>>(genresAllBooksUrl);
};

const GenreService = {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
};

export default GenreService;
