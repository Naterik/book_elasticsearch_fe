import createInstanceAxios from "@/lib/api/axios.customize";
import type {
  IDashboardSummary,
  IBookCopiesStatusChartData,
  ILoanTrend,
  IRevenueChartData,
  ISearchTermsChartData,
  IPendingReservation,
  IUserWithCard,
} from "@/types/entities/dashboard";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getSummary = () => {
  const urlBackend = "/api/v1/dashboard/summary";
  return axios.get<IBackendRes<IDashboardSummary>>(urlBackend);
};

const getChartForBookCopiesStatus = () => {
  const urlBackend = "/api/v1/dashboard/chart/book-copies-status";
  return axios.get<IBackendRes<IBookCopiesStatusChartData[]>>(urlBackend);
};

const getChartForLoanTrends = (timeframe: string) => {
  const urlBackend = `/api/v1/dashboard/chart/loan-trends?timeframe=${timeframe}`;
  return axios.get<IBackendRes<ILoanTrend[]>>(urlBackend);
};

const getChartForRevenue = () => {
  const urlBackend = "/api/v1/dashboard/chart/revenue";
  return axios.get<IBackendRes<IRevenueChartData[]>>(urlBackend);
};

const getChartForSearchTerms = () => {
  const urlBackend = "/api/v1/dashboard/chart/search-terms";
  return axios.get<IBackendRes<ISearchTermsChartData[]>>(urlBackend);
};

const getPendingReservations = () => {
  const urlBackend = "/api/v1/dashboard/pending-reservations";
  return axios.get<IBackendRes<IPendingReservation[]>>(urlBackend);
};

const getUserWithCard = (timeframe: string) => {
  const urlBackend = `/api/v1/dashboard/user-with-card?timeframe=${timeframe}`;
  return axios.get<IBackendRes<IUserWithCard[]>>(urlBackend);
};

export {
  getSummary,
  getChartForBookCopiesStatus,
  getChartForLoanTrends,
  getChartForRevenue,
  getChartForSearchTerms,
  getPendingReservations,
  getUserWithCard,
};
