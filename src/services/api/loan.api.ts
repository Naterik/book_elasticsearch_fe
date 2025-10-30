/**
 * Loan API Services
 * Handles book loan operations
 */

import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

/**
 * Check if user has book on loan
 */
export const getBookOnLoanAPI = (userId: number) => {
  return axios.get<IBackendRes<ILoan>>(`/api/v1/users/check-loan/${userId}`);
};
