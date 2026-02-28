import createInstanceAxios from "@/lib/api/axios.customize";
import { vnpayUrl, updatePaymentMemberUrl, updatePaymentFineUrl } from "./url";
import type { IBackendRes } from "@/types/api/response.types";
import type { IUser } from "@/types/entities/user";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);
const axiosPayment = createInstanceAxios(
  import.meta.env.VITE_BACKEND_PAYMENT_URL
);

export const getVNPayUrl = (
  amount: number,
  locale: string,
  paymentRef: string,
  paymentType: string = "membership"
) => {
  return axiosPayment.post<IBackendRes<{ url: string }>>(vnpayUrl, {
    amount,
    locale,
    paymentRef,
    paymentType,
  });
};

export const updatePaymentMember = (
  paymentStatus: string,
  paymentRef: string
) => {
  return axios.post<IBackendRes<IUser>>(updatePaymentMemberUrl, {
    paymentStatus,
    paymentRef,
  });
};

export const updatePaymentFine = (
  paymentStatus: string,
  paymentRef: string
) => {
  return axios.post<IBackendRes<{ message: string }>>(updatePaymentFineUrl, {
    paymentStatus,
    paymentRef,
  });
};

const PaymentService = {
  getVNPayUrl,
  updatePaymentMember,
  updatePaymentFine,
};

export default PaymentService;
