import createInstanceAxios from "@/lib/api/axios.customize";

const axiosPayment = createInstanceAxios(
  import.meta.env.VITE_BACKEND_PAYMENT_URL
);

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
