import createInstanceAxios from "@/lib/api/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Payment Management APIs
export const getAllPaymentsAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/payments?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IPayment>>>(urlBackend);
};

export const getPaymentByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/payments/${id}`;
  return axios.get<IBackendRes<IPayment>>(urlBackend);
};

export const deletePaymentAPI = (id: number) => {
  const urlBackend = `/api/v1/payments/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};
