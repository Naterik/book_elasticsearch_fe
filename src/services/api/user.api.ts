import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getUserProfileAPI = (userId: number) => {
  return axios.get<IBackendRes<IUserInfo>>(`/api/v1/users/${userId}`);
};

export const postCreateMemberCardAPI = (data: any) => {
  const urlBackend = "/api/v1/users/member";
  return axios.post<IBackendRes<any>>(urlBackend, data);
};

export const updatePaymentMemberAPI = (
  paymentStatus: string,
  paymentRef: string
) => {
  const urlBackend = "/api/v1/users/member/update-status";
  return axios.post<IBackendRes<IUser>>(urlBackend, {
    paymentStatus,
    paymentRef,
  });
};

export const updatePaymentFineAPI = (
  paymentStatus: string,
  paymentRef: string
) => {
  const urlBackend = "/api/v1/users/fine/update-status";
  return axios.post<IBackendRes<{ message: string }>>(urlBackend, {
    paymentStatus,
    paymentRef,
  });
};
