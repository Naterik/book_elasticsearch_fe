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

const updateUserAPI = (id: number, formData: FormData) => {
  const urlBackend = `/api/v1/users/${id}`;
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

export {
  getAllLoanAPI,
  getAllUsersAPI,
  getUserByIdAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
};
