import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IAdminUser, IAdminUserDetail } from "@/types/entities/user";
import { userByIdUrl, usersUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllUsers = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IAdminUser>>>(usersUrl, {
    params: { page },
  });
};

export const getUserById = (id: number) => {
  return axios.get<IBackendRes<IAdminUserDetail>>(userByIdUrl(id));
};

export const createUser = (formData: FormData) => {
  return axios.post<IBackendRes<IAdminUser>>(usersUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUser = (formData: FormData) => {
  return axios.put<IBackendRes<IAdminUser>>(usersUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUser = (id: number) => {
  return axios.delete<IBackendRes<void>>(userByIdUrl(id));
};

const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default UserService;
