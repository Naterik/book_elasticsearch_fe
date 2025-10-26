import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

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

const getOnLoanByIdAPI = (id: number) => {
  return axios.get<IBackendRes<IFineDetail>>(`/api/v1/loans/${id}`);
};

const getRenewalLoanAPI = (loanId: number, userId: number) => {
  const urlBackend = "/api/v1/loans/renewal";
  return axios.put<IBackendRes<any>>(urlBackend, {
    loanId,
    userId,
  });
};

const postCreateLoanAPI = (userId: number, bookId: number, dueDate: string) => {
  const urlBackend = "/api/v1/loans";
  return axios.post<IBackendRes<ILoan>>(urlBackend, {
    userId,
    bookId,
    dueDate,
  });
};

const getFineByUserIdAPI = (id: number) => {
  return axios.get<IBackendRes<IFine[]>>(`/api/v1/fines/${id}`);
};

const postCreateFinePaymentAPI = (fineId: number, paymentRef: string) => {
  const urlBackend = "/api/v1/users/fine";
  return axios.post<IBackendRes<{ payment: IPayment; fine: IFine }>>(
    urlBackend,
    {
      fineId,
      paymentRef,
    }
  );
};

export {
  getLoanByUserIdAPI,
  getRenewalLoanAPI,
  getOnLoanByIdAPI,
  getFineByUserIdAPI,
  getReturnedLoanByUserAPI,
  getReservationByUserAPI,
  putCancelReservationAPI,
  postCreateLoanAPI,
  postCreateFinePaymentAPI,
};
