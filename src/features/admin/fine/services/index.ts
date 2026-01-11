import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IFine } from "@/types/entities/payment";
import { fineByIdUrl, finesUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Fine Management APIs
export const getAllFines = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IFine>>>(finesUrl, {
    params: { page },
  });
};

export const getFineById = (id: number) => {
  return axios.get<IBackendRes<IFine>>(fineByIdUrl(id));
};

export const createFine = (data: {
  amount: number;
  reason: string;
  loanId: number;
  userId: number;
}) => {
  return axios.post<IBackendRes<IFine>>(finesUrl, data);
};

export const updateFine = (data: {
  id: number;
  amount: number;
  reason: string;
  isPaid: boolean;
}) => {
  return axios.put<IBackendRes<IFine>>(finesUrl, data);
};

export const deleteFine = (id: number) => {
  return axios.delete<IBackendRes<void>>(fineByIdUrl(id));
};

const FineService = {
  getAllFines,
  getFineById,
  createFine,
  updateFine,
  deleteFine,
};

export default FineService;
