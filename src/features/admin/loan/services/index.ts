import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { ILoan } from "@/types/entities/loan";
import { loanByIdUrl, loanReturnUrl, loansUrl, loansUserUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllLoans = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<ILoan>>>(loansUrl, {
    params: { page },
  });
};

export const getLoanById = (id: number) => {
  return axios.get<IBackendRes<ILoan>>(loanByIdUrl(id));
};

export const getLoansByUserId = (userId: number) => {
  return axios.get<IBackendRes<IModelPaginate<ILoan>>>(loansUserUrl(userId));
};

export const createLoan = (data: {
  bookId: number;
  userId: number;
  dueDate: string;
}) => {
  return axios.post<IBackendRes<ILoan>>(loansUrl, data);
};

export const updateLoan = (
  id: number,
  data: {
    dueDate: string;
    status: string;
  }
) => {
  return axios.put<IBackendRes<ILoan>>(loanByIdUrl(id), data);
};

export const deleteLoan = (id: number) => {
  return axios.delete<IBackendRes<void>>(loanByIdUrl(id));
};

export const returnBookApprove = (loanId: number, userId: number) => {
  return axios.put<IBackendRes<ILoan>>(loanReturnUrl, { loanId, userId });
};

const LoanService = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  returnBookApprove,
};

export default LoanService;
