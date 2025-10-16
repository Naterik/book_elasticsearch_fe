import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Loan APIs
const getAllLoanAPI = () => {
  const urlBackend = "/api/v1/loans";
  return axios.get<IBackendRes<ILoan>>(urlBackend);
};

// User Management APIs
const getAllUsersAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/users?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IAdminUser>>>(urlBackend);
};

const getUserByIdAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.get<IBackendRes<IAdminUserDetail>>(urlBackend);
};

const createUserAPI = (formData: FormData) => {
  const urlBackend = "/api/v1/users";
  return axios.post<IBackendRes<IAdminUser>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUserAPI = (formData: FormData) => {
  const urlBackend = `/api/v1/users`;
  return axios.put<IBackendRes<IAdminUser>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};

// Book Management APIs
const getAllBooksAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/books?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(urlBackend);
};

const getBookByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/books/${id}`;
  return axios.get<IBackendRes<IBook>>(urlBackend);
};

const createBookAPI = (formData: FormData) => {
  const urlBackend = "/api/v1/books";
  return axios.post<IBackendRes<IBook>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateBookAPI = (formData: FormData) => {
  const urlBackend = `/api/v1/books`;
  return axios.put<IBackendRes<IBook>>(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteBookAPI = (id: number) => {
  const urlBackend = `/api/v1/books/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
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

export {
  getAllLoanAPI,
  getAllUsersAPI,
  getUserByIdAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  getAllBooksAdminAPI,
  getBookByIdAdminAPI,
  createBookAPI,
  updateBookAPI,
  deleteBookAPI,
  getAllAuthorsAPI,
  getAllPublishersAPI,
  getAllGenresAPI,
};
