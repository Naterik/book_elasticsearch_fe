import axios from "services/axios.customize";
const getLoanByUserIdAPI = (id: number) => {
  return axios.get<IBackendRes<ILoan[]>>(`/api/v1/loans/${id}`);
};

const getReturnedLoanByUserAPI = (id: number) => {
  return axios.get<IBackendRes<ILoan[]>>(`/api/v1/loans/returned/${id}`);
};

const getReservationByUserAPI = (id: number) => {
  return axios.get<IBackendRes<IReservation[]>>(
    `/api/v1/reservations/users/${id}`
  );
};

const putCancelReservationAPI = (id: number) => {
  return axios.put<IBackendRes<IReservation[]>>(`/api/v1/reservations/${id}`);
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
  getLoanByUserIdAPI,
  getRenewalLoanAPI,
  getFineByLoanIdAPI,
  getReturnedLoanByUserAPI,
  getReservationByUserAPI,
  putCancelReservationAPI,
};
