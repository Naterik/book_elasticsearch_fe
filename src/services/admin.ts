import createInstanceAxios from "services/axios.customize";
import qs from "qs";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Dashboard Stats APIs
const getDashboardStatsAPI = () => {
  const urlBackend = "/api/v1/dashboard/stats";
  return axios.get<IBackendRes<IDashboardStats>>(urlBackend);
};

// Loan APIs
const getAllLoanAPI = () => {
  const urlBackend = "/api/v1/loans";
  return axios.get<IBackendRes<ILoan[]>>(urlBackend);
};

// Book APIs
const getAllBooksAPI = () => {
  const urlBackend = "/api/v1/books";
  return axios.get<IBackendRes<IBook[]>>(urlBackend);
};

// User APIs
const getAllUsersAPI = () => {
  const urlBackend = "/api/v1/users";
  return axios.get<IBackendRes<IAdminUser[]>>(urlBackend);
};

// Fine APIs - Get successful payments //
const getSuccessfulPaymentsAPI = () => {
  const urlBackend = "/api/v1/fines/successful-payments";
  return axios.get<IBackendRes<{ totalAmount: number; count: number }>>(
    urlBackend
  );
};

// Author Management APIs
const getAllAuthorsAPI = () => {
  const urlBackend = `/api/v1/authors`;
  return axios.get<IBackendRes<IAuthor[]>>(urlBackend);
};

// Publisher Management APIs
const getAllPublishersAPI = () => {
  const urlBackend = `/api/v1/publishers`;
  return axios.get<IBackendRes<IPublisher[]>>(urlBackend);
};

// Genre Management APIs
const getAllGenresAPI = () => {
  const urlBackend = `/api/v1/genres`;
  return axios.get<IBackendRes<IGenre[]>>(urlBackend);
};

// Book Copy Search APIs
const getFilterBookCopyElasticAPI = (page: number = 1, search: string = "") => {
  const urlBackend = "/api/v1/book-copies/elastic";
  return axios.get<IBackendRes<IModelPaginate<IBookCopy>>>(urlBackend, {
    params: { page, search },
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          skipNulls: true,
        }),
    },
  });
};

export {
  getDashboardStatsAPI,
  getAllLoanAPI,
  getAllBooksAPI,
  getAllUsersAPI,
  getSuccessfulPaymentsAPI,
  getAllAuthorsAPI,
  getAllPublishersAPI,
  getAllGenresAPI,
  getFilterBookCopyElasticAPI,
};
