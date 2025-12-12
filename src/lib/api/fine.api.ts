import createInstanceAxios from "./axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getFineByIdAPI = (fineId: number) => {
  const urlBackend = `fines/${fineId}`;
  return axios.get<IBackendRes<IFine>>(urlBackend);
};

export const postUserPayFineAPI = (fineId: number, paymentRef: string) => {
  const urlBackend = `/api/v1/users/fine`;
  return axios.post<IBackendRes<IFine>>(urlBackend, {
    fineId,
    paymentRef,
  });
};

export const postUserPaymentUpdateStatusAPI = (
  paymentRef: string,
  paymentStatus: string,
  paymentType: string
) => {
  const urlBackend = `/api/v1//users/fine/update-status`;
  return axios.post<IBackendRes<IFine>>(urlBackend, {
    paymentRef,
    paymentStatus,
    paymentType,
  });
};
