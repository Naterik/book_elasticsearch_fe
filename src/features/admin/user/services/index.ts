import createInstanceAxios from "@/lib/api/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllUsersAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/users?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IAdminUser>>>(urlBackend);
};

export const getUserByIdAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.get<IBackendRes<IAdminUserDetail>>(urlBackend);
};

export const createUserAPI = (formData: FormData) => {
  const urlBackend = "/api/v1/users";
  return axios.post<IBackendRes<IAdminUser>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUserAPI = (formData: FormData) => {
  const urlBackend = `/api/v1/users`;
  return axios.put<IBackendRes<IAdminUser>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};
