import createInstanceAxios from "@/lib/api/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getAllLoansAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/loans?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<ILoan>>>(urlBackend);
};

export const getLoanByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/loans/${id}`;
  return axios.get<IBackendRes<ILoan>>(urlBackend);
};

export const createLoanAPI = (data: {
  bookId: number;
  userId: number;
  dueDate: string;
}) => {
  const urlBackend = "/api/v1/loans";
  return axios.post<IBackendRes<ILoan>>(urlBackend, data);
};

export const updateLoanAPI = (
  id: number,
  data: {
    dueDate: string;
    status: string;
  }
) => {
  const urlBackend = `/api/v1/loans/${id}`;
  return axios.put<IBackendRes<ILoan>>(urlBackend, data);
};

export const deleteLoanAPI = (id: number) => {
  const urlBackend = `/api/v1/loans/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};

export const returnBookApproveAPI = (loanId: number, userId: number) => {
  const urlBackend = `/api/v1/loans/return-book`;
  return axios.put<IBackendRes<ILoan>>(urlBackend, { loanId, userId });
};
