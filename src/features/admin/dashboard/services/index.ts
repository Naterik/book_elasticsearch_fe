import createInstanceAxios from "@/lib/api/axios.customize";
import type {
  IDashboardSummary,
  IBookCopiesStatusChartData,
  ILoanTrend,
  IRevenueChartData,
  ISearchTermsChartData,
  IPendingReservation,
  IUserWithCard,
} from "@/types/dashboard";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getSummary = () => {
  const urlBackend = "/api/v1/dashboard/summary";
  return axios.get<IBackendRes<IDashboardSummary>>(urlBackend) as Promise<
    IBackendRes<IDashboardSummary>
  >;
};

const getChartForBookCopiesStatus = () => {
  const urlBackend = "/api/v1/dashboard/chart/book-copies-status";
  return axios.get<IBackendRes<IBookCopiesStatusChartData[]>>(
    urlBackend
  ) as Promise<IBackendRes<IBookCopiesStatusChartData[]>>;
};

const getChartForLoanTrends = (timeframe: string) => {
  const urlBackend = `/api/v1/dashboard/chart/loan-trends?timeframe=${timeframe}`;
  return axios.get<IBackendRes<ILoanTrend[]>>(urlBackend) as Promise<
    IBackendRes<ILoanTrend[]>
  >;
};

const getChartForRevenue = () => {
  const urlBackend = "/api/v1/dashboard/chart/revenue";
  return axios.get<IBackendRes<IRevenueChartData[]>>(urlBackend) as Promise<
    IBackendRes<IRevenueChartData[]>
  >;
};

const getChartForSearchTerms = () => {
  const urlBackend = "/api/v1/dashboard/chart/search-terms";
  return axios.get<IBackendRes<ISearchTermsChartData[]>>(urlBackend) as Promise<
    IBackendRes<ISearchTermsChartData[]>
  >;
};

const getPendingReservations = () => {
  const urlBackend = "/api/v1/dashboard/pending-reservations";
  return axios.get<IBackendRes<IPendingReservation[]>>(urlBackend) as Promise<
    IBackendRes<IPendingReservation[]>
  >;
};

const getUserWithCard = (timeframe: string) => {
  const urlBackend = `/api/v1/dashboard/user-with-card?timeframe=${timeframe}`;
  return axios.get<IBackendRes<IUserWithCard[]>>(urlBackend) as Promise<
    IBackendRes<IUserWithCard[]>
  >;
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
