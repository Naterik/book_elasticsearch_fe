import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IPayment } from "@/types/entities/payment";
import { paymentByIdUrl, paymentsUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Payment Management APIs
export const getAllPayments = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IPayment>>>(paymentsUrl, {
    params: { page },
  });
};

export const getPaymentById = (id: number) => {
  return axios.get<IBackendRes<IPayment>>(paymentByIdUrl(id));
};

export const deletePayment = (id: number) => {
  return axios.delete<IBackendRes<void>>(paymentByIdUrl(id));
};

const PaymentService = {
  getAllPayments,
  getPaymentById,
  deletePayment,
};

export default PaymentService;
