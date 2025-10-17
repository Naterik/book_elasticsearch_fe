import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Book Management APIs
export const getAllBooksAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/books?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(urlBackend);
};

export const getBookByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/books/${id}`;
  return axios.get<IBackendRes<IBook>>(urlBackend);
};

export const createBookAPI = (formData: FormData) => {
  const urlBackend = "/api/v1/books";
  return axios.post<IBackendRes<IBook>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateBookAPI = (formData: FormData) => {
  const urlBackend = `/api/v1/books`;
  return axios.put<IBackendRes<IBook>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBookAPI = (id: number) => {
  const urlBackend = `/api/v1/books/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};
