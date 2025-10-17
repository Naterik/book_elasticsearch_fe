import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getGenresAPI = (params?: { page?: number }) => {
  return axios.get<IBackendRes<IModelPaginate<IGenre>>>("/api/v1/genres", {
    params,
  });
};

export const createGenreAPI = (data: { name: string }) => {
  return axios.post<IBackendRes<IGenre>>("/api/v1/genres", data);
};

export const updateGenreAPI = (id: number, data: { name: string }) => {
  return axios.put<IBackendRes<IGenre>>(`/api/v1/genres/${id}`, data);
};

export const deleteGenreAPI = (id: number) => {
  return axios.delete<IBackendRes<null>>(`/api/v1/genres/${id}`);
};
