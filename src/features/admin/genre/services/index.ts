import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getGenresAPI = (params?: { page?: number }) => {
  return axios.get<IBackendRes<IModelPaginate<IGenre>>>("/api/v1/genres", {
    params,
  });
};

export const createGenreAPI = (data: { name: string; description: string }) => {
  return axios.post<IBackendRes<IGenre>>("/api/v1/genres", data);
};

export const updateGenreAPI = (data: IGenre) => {
  return axios.put<IBackendRes<IGenre>>(`/api/v1/genres`, data);
};

export const deleteGenreAPI = (id: number) => {
  return axios.delete<IBackendRes<null>>(`/api/v1/genres/${+id}`);
};
