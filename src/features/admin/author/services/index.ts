import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAuthorsAPI = (page: number) => {
  return axios.get<IBackendRes<IModelPaginate<IAuthor>>>("/api/v1/authors", {
    params: { page },
  });
};

export const createAuthorAPI = (data: { name: string; bio?: string }) => {
  return axios.post<IBackendRes<IAuthor>>("/api/v1/authors", data);
};

export const updateAuthorAPI = (
  id: number,
  data: { name: string; bio?: string }
) => {
  return axios.put<IBackendRes<IAuthor>>(`/api/v1/authors/${id}`, data);
};

export const deleteAuthorAPI = (id: number) => {
  return axios.delete<IBackendRes<void>>(`/api/v1/authors/${id}`);
};
