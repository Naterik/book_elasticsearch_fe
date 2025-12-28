import createInstanceAxios from "@/lib/api/axios.customize";

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

export const getHistorySearchByUserId = (userId: number) => {
  const urlBackend = `/api/v1/history-searches/full/${userId}`;
  return axios.get<IBackendRes<IHistorySearch[]>>(urlBackend);
};

export const postHistorySearchByUserId = (userId: number, term: string) => {
  const urlBackend = "/api/v1/history-searches/recent";
  return axios.post<IBackendRes<IHistorySearch>>(urlBackend, {
    userId,
    term,
  });
};

export const postMergeRecentSearchAsGuest = (
  userId: number,
  terms: Array<string>
) => {
  const urlBackend = `/api/v1/history-searches/merge`;
  return axios.post<IBackendRes<IHistorySearch[]>>(urlBackend, {
    userId,
    terms,
  });
};

export const deleteHistorySearchByUserId = (searchId: number) => {
  const urlBackend = `/api/v1/history-searches/${searchId}`;
  return axios.delete<IBackendRes<IHistorySearch>>(urlBackend);
};

export const deleteAllHistorySearchUser = () => {
  const urlBackend = `/api/v1/history-searches`;
  return axios.delete<IBackendRes<IHistorySearch>>(urlBackend);
};
