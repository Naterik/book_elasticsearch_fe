import axios from "services/axios.customize";
import qs from "qs";
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
  console.log("respond :>> ", respond);
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

const getAllBookAPI = (page: number) => {
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

const getLoanByUserIdAPI = (id: number) => {
  return axios.get<IBackendRes<ILoan>>(`/api/v1/loans/${id}`);
};

const getAllLoanAPI = () => {
  const urlBackend = "/api/v1/loans";
  return axios.get<IBackendRes<ILoan>>(urlBackend);
};

const getFineByLoanIdAPI = (id: number) => {
  return axios.get<IBackendRes<IFineDetail>>(`/api/v1/loans/${id}`);
};

const getRenewalLoanAPI = (loanId: number, userId: number) => {
  const urlBackend = "/api/v1/loans/renewal";
  return axios.put<IBackendRes<any>>(urlBackend, {
    loanId,
    userId,
  });
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
  getAllLoanAPI,
  getLoanByUserIdAPI,
  getRenewalLoanAPI,
  getFineByLoanIdAPI,
};
