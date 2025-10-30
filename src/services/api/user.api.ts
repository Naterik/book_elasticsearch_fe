/**
 * User API Services
 * Handles user profile and member card operations
 */

import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

/**
 * Get user profile by ID
 */
export const getUserProfileAPI = (userId: number) => {
  return axios.get<IBackendRes<IUserInfo>>(`/api/v1/users/${userId}`);
};

/**
 * Create member card for user
 */
export const postCreateMemberCardAPI = (data: any) => {
  const urlBackend = "/api/v1/users/member";
  return axios.post<IBackendRes<any>>(urlBackend, data);
};

/**
 * Update member card payment status
 */
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

/**
 * Update fine payment status
 */
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
