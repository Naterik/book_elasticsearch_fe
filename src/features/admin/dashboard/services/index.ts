import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes } from "@/types/api/response.types";
import type {
  IBookCopiesStatusChartData,
  IDashboardSummary,
  ILoanTrend,
  IPendingReservation,
  IRevenueChartData,
  ISearchTermsChartData,
  IUserWithCard,
} from "@/types/entities/dashboard";
import {
  chartBookCopiesStatusUrl,
  chartLoanTrendsUrl,
  chartRevenueUrl,
  chartSearchTermsUrl,
  pendingReservationsUrl,
  summaryUrl,
  userWithCardUrl,
} from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getSummary = () => {
  return axios.get<IBackendRes<IDashboardSummary>>(summaryUrl);
};

const getChartForBookCopiesStatus = () => {
  return axios.get<IBackendRes<IBookCopiesStatusChartData[]>>(
    chartBookCopiesStatusUrl
  );
};

const getChartForLoanTrends = (timeframe: string) => {
  return axios.get<IBackendRes<ILoanTrend[]>>(chartLoanTrendsUrl, {
    params: { timeframe },
  });
};

const getChartForRevenue = () => {
  return axios.get<IBackendRes<IRevenueChartData[]>>(chartRevenueUrl);
};

const getChartForSearchTerms = () => {
  return axios.get<IBackendRes<ISearchTermsChartData[]>>(chartSearchTermsUrl);
};

const getPendingReservations = () => {
  return axios.get<IBackendRes<IPendingReservation[]>>(pendingReservationsUrl);
};

const getUserWithCard = (timeframe: string) => {
  return axios.get<IBackendRes<IUserWithCard[]>>(userWithCardUrl, {
    params: { timeframe },
  });
};

const DashboardService = {
  getSummary,
  getChartForBookCopiesStatus,
  getChartForLoanTrends,
  getChartForRevenue,
  getChartForSearchTerms,
  getPendingReservations,
  getUserWithCard,
};

export default DashboardService;
