import createInstanceAxios from "@/lib/api/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Fine Management APIs
export const getAllFinesAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/fines?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IFine>>>(urlBackend);
};

export const getFineByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/fines/${id}`;
  return axios.get<IBackendRes<IFine>>(urlBackend);
};

export const createFineAPI = (data: {
  amount: number;
  reason: string;
  loanId: number;
  userId: number;
}) => {
  const urlBackend = "/api/v1/fines";
  return axios.post<IBackendRes<IFine>>(urlBackend, data);
};

export const updateFineAPI = (data: {
  id: number;
  amount: number;
  reason: string;
  isPaid: boolean;
}) => {
  const urlBackend = `/api/v1/fines`;
  return axios.put<IBackendRes<IFine>>(urlBackend, data);
};

export const deleteFineAPI = (id: number) => {
  const urlBackend = `/api/v1/fines/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};
