import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const axiosPayment = createInstanceAxios(
  import.meta.env.VITE_BACKEND_PAYMENT_URL
);
import qs from "qs";
export const loginWithGoogleURL = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  return `${backendURL}/api/v1/auth/google`;
};
const registerAPI = (
  username: string,
  password: string,
  confirmPassword: string,
  fullName?: string
) => {
  const urlBackend = "/api/v1/register";
  return axios.post<IBackendRes<IRegister>>(
    urlBackend,
    {
      username,
      password,
      confirmPassword,
      fullName,
    },
    {
      headers: {
        delay: 3000,
      },
    }
  );
};

const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/login";
  const respond = axios.post<IBackendRes<ILogin>>(urlBackend, {
    username,
    password,
  });

  return respond;
};

const fetchAPI = () => {
  const urlBackend = "/api/v1/account";
  return axios.get<IBackendRes<IUser>>(urlBackend, {
    headers: {
      delay: 3000,
    },
  });
};

const filterBookAPI = (
  title: string,
  detailDesc: string,
  minPrice: number,
  maxPrice: number,
  publishDate: string,
  genres: string[],
  page: number
) => {
  const urlBackend = "/api/v1/filter";
  return axios.get<IModelPaginate<IBook>>(urlBackend, {
    params: {
      page,
      title,
      detailDesc,
      minPrice,
      maxPrice,
      publishDate,
      genres,
    },
  });
};

const getAllBookAPI = (page: number = 1) => {
  const urlBackend = "/api/v1/books";
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(urlBackend, {
    params: { page },
  });
};

const getAllGenreAPI = () => {
  return axios.get("/api/v1/genres/display");
};

const getAllLanguagesElasticAPI = () => {
  return axios.get("/api/v1/languages/elastic");
};

const getFilterBookAPI = (
  page: number,
  yearRange: number[],
  priceRange: number[],
  search: string,
  order: string,
  genres: string[],
  language: string | null
) => {
  const urlBackend = "/api/v1/books/filter";
  return axios.get(urlBackend, {
    params: { page, yearRange, priceRange, search, order, genres, language },
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          skipNulls: true,
        }),
    },
  });
};

const getFilterBookElasticAPI = (
  page: number,
  yearRange: number[],
  priceRange: number[],
  search: string,
  order: string,
  genres: string[],
  language: string | null
) => {
  const urlBackend = "/api/v1/filter/elastic";
  return axios.get(urlBackend, {
    params: { page, yearRange, priceRange, search, order, genres, language },
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          skipNulls: true,
        }),
    },
  });
};

const getBookByIdAPI = (id: number) => {
  return axios.get<IBackendRes<IBook>>(`/api/v1/books/${id}`);
};

const getMostBorrowedBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/most-borrowed");
};

const getTrendingBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/trending");
};

const getNewArrivalBooksAPI = () => {
  return axios.get<IBackendRes<IBook[]>>("/api/v1/books/new-arrivals");
};

const getRecommendedBooksAPI = (userId: number) => {
  return axios.get<IBackendRes<IBook[]>>(`/api/v1/books/recommend/${userId}`);
};

const postCreateMemberCardAPI = (data: any) => {
  const urlBackend = "/api/v1/users/member";
  return axios.post<IBackendRes<any>>(urlBackend, data);
};

const getVNPayUrlAPI = (
  amount: number,
  locale: string,
  paymentRef: string,
  paymentType: string = "membership"
) => {
  const urlBackend = "/vnpay/payment-url";
  return axiosPayment.post<IBackendRes<{ url: string }>>(urlBackend, {
    amount,
    locale,
    paymentRef,
    paymentType,
  });
};

const updatePaymentMemberAPI = (paymentStatus: string, paymentRef: string) => {
  const urlBackend = "/api/v1/users/member/update-status";
  return axios.post<IBackendRes<IUser>>(urlBackend, {
    paymentStatus,
    paymentRef,
  });
};

const updatePaymentFineAPI = (paymentStatus: string, paymentRef: string) => {
  const urlBackend = "/api/v1/users/fine/update-status";
  return axios.post<IBackendRes<{ message: string }>>(urlBackend, {
    paymentStatus,
    paymentRef,
  });
};

const getBookOnLoanAPI = (userId: number) => {
  return axios.get<IBackendRes<ILoan>>(`"/api/v1/users/check-loan"/${userId}`);
};

const getSuggestAPI = (q: string, size = 5) => {
  const urlBackend = "/api/v1/suggest/elastic";
  return axios.get(urlBackend, { params: { q, size } });
};

const getNotificationByUserAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

const getUserProfileAPI = (userId: number) => {
  return axios.get<IBackendRes<IUserInfo>>(`/api/v1/users/${userId}`);
};

const getNotificationsByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

const putSingleNotificationAPI = (id: number) => {
  return axios.put<IBackendRes<INotification>>(`/api/v1/notifications/${id}`);
};

const putBulkNotificationAPI = (userId: number) => {
  return axios.put<IBackendRes<{ count: number }>>(
    `/api/v1/notifications/bulk/${userId}`
  );
};

export {
  registerAPI,
  loginAPI,
  fetchAPI,
  filterBookAPI,
  getAllBookAPI,
  getAllGenreAPI,
  getAllLanguagesElasticAPI,
  getFilterBookAPI,
  getFilterBookElasticAPI,
  getBookByIdAPI,
  getMostBorrowedBooksAPI,
  getTrendingBooksAPI,
  getNewArrivalBooksAPI,
  getRecommendedBooksAPI,
  postCreateMemberCardAPI,
  getSuggestAPI,
  updatePaymentMemberAPI,
  updatePaymentFineAPI,
  getVNPayUrlAPI,
  getBookOnLoanAPI,
  getNotificationByUserAPI,
  getUserProfileAPI,
    getNotificationsByUserIdAPI,
  putSingleNotificationAPI,
  putBulkNotificationAPI,
};
