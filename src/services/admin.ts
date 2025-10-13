import axios from "services/axios.customize";
const getAllLoanAPI = () => {
  const urlBackend = "/api/v1/loans";
  return axios.get<IBackendRes<ILoan>>(urlBackend);
};

export { getAllLoanAPI };
