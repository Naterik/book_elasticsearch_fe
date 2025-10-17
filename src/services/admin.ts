import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Loan APIs
const getAllLoanAPI = () => {
  const urlBackend = "/api/v1/loans";
  return axios.get<IBackendRes<ILoan>>(urlBackend);
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
  getAllAuthorsAPI,
  getAllPublishersAPI,
  getAllGenresAPI,
};
