import createInstanceAxios from "@/lib/api/axios.customize";
import {
  userByIdUrl,
  historySearchFullUrl,
  historySearchRecentUrl,
  historySearchMergeUrl,
  historySearchByIdUrl,
  historySearchUrl,
} from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getUserProfile = (userId: number) => {
  return axios.get<IBackendRes<IUserInfo>>(userByIdUrl(userId));
};

const getHistorySearchByUserId = (userId: number) => {
  return axios.get<IBackendRes<IHistorySearch[]>>(historySearchFullUrl(userId));
};

const postHistorySearchByUserId = (userId: number, term: string) => {
  return axios.post<IBackendRes<IHistorySearch>>(historySearchRecentUrl, {
    userId,
    term,
  });
};

const postMergeRecentSearchAsGuest = (userId: number, terms: Array<string>) => {
  return axios.post<IBackendRes<IHistorySearch[]>>(historySearchMergeUrl, {
    userId,
    terms,
  });
};

const deleteHistorySearchByUserId = (searchId: number) => {
  return axios.delete<IBackendRes<IHistorySearch>>(
    historySearchByIdUrl(searchId)
  );
};

const deleteAllHistorySearchUser = () => {
  return axios.delete<IBackendRes<IHistorySearch>>(historySearchUrl);
};

const InfoService = {
  getUserProfile,
  getHistorySearchByUserId,
  postHistorySearchByUserId,
  postMergeRecentSearchAsGuest,
  deleteHistorySearchByUserId,
  deleteAllHistorySearchUser,
};

export default InfoService;
