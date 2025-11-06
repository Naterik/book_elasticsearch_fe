import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getLoanByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<ILoan[]>>(`/api/v1/loans/${userId}`);
};

export const getReturnedLoanByUserAPI = (userId: number) => {
  return axios.get<IBackendRes<ILoan[]>>(`/api/v1/loans/returned/${userId}`);
};

export const getBookOnLoanAPI = (userId: number) => {
  return axios.get<IBackendRes<ILoan>>(`/api/v1/users/check-loan/${userId}`);
};

export const getOnLoanByIdAPI = (loanId: number) => {
  return axios.get<IBackendRes<IFineDetail>>(`/api/v1/loans/${loanId}`);
};

export const postCreateLoanAPI = (
  userId: number,
  bookId: number,
  dueDate: string
) => {
  return axios.post<IBackendRes<ILoan>>("/api/v1/loans", {
    userId,
    bookId,
    dueDate,
  });
};

export const getRenewalLoanAPI = (loanId: number, userId: number) => {
  return axios.put<IBackendRes<any>>("/api/v1/loans/renewal", {
    loanId,
    userId,
  });
};

export const getReservationByUserAPI = (userId: number) => {
  return axios.get<IBackendRes<IReservation[]>>(
    `/api/v1/reservations/users/${userId}`
  );
};

export const putCancelReservationAPI = (reservationId: number) => {
  return axios.put<IBackendRes<IReservation[]>>(
    `/api/v1/reservations/${reservationId}`
  );
};

export const getFineByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<IFine[]>>(`/api/v1/fines/${userId}`);
};

export const postCreateFinePaymentAPI = (
  fineId: number,
  paymentRef: string
) => {
  return axios.post<IBackendRes<{ payment: IPayment; fine: IFine }>>(
    "/api/v1/users/fine",
    {
      fineId,
      paymentRef,
    }
  );
};
