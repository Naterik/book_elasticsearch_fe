/**
 * Payment API Services
 * Handles VNPay payment integration
 */

import createInstanceAxios from "@/services/axios.customize";

const axiosPayment = createInstanceAxios(
  import.meta.env.VITE_BACKEND_PAYMENT_URL
);

/**
 * Get VNPay payment URL
 * @param amount - Payment amount
 * @param locale - Language locale (vi/en)
 * @param paymentRef - Payment reference ID
 * @param paymentType - Type of payment (membership/fine)
 */
export const getVNPayUrlAPI = (
  amount: number,
  locale: string,
  paymentRef: string,
  paymentType: string = "membership"
) => {
  const urlBackend = "/vnpay/payment-url";
  return axiosPayment.post<IBackendRes<{ url: string }>>(urlBackend, {
    amount,
    locale,
    paymentRef,
    paymentType,
  });
};
