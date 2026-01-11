import createInstanceAxios from "@/lib/api/axios.customize";
import {
  loanByUserIdUrl,
  returnedLoanByUserUrl,
  checkLoanUrl,
  loanByIdUrl,
  loansUrl,
  renewalLoanUrl,
  reservationByUserUrl,
  reservationByIdUrl,
  fineByIdUrl,
  userPayFineUrl,
  userFineUpdateStatusUrl,
  fineByUserIdUrl,
} from "./url";
import type { IBackendRes } from "@/types/api/response.types";
import type { ILoan } from "@/types/entities/loan";
import type { IReservation } from "@/types/entities/reservation";
import type { IFine, IFineDetail } from "@/types/entities/payment";
import type { IPayment } from "@/types/entities/payment";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getLoanByUserId = (userId: number) => {
  return axios.get<IBackendRes<ILoan[]>>(loanByUserIdUrl(userId));
};

const getReturnedLoanByUser = (userId: number) => {
  return axios.get<IBackendRes<ILoan[]>>(returnedLoanByUserUrl(userId));
};

const getBookOnLoan = (userId: number) => {
  return axios.get<IBackendRes<ILoan>>(checkLoanUrl(userId));
};

const getOnLoanById = (loanId: number) => {
  return axios.get<IBackendRes<IFineDetail>>(loanByIdUrl(loanId));
};

const createLoan = (userId: number, bookId: number, dueDate: string) => {
  return axios.post<IBackendRes<ILoan>>(loansUrl, {
    userId,
    bookId,
    dueDate,
  });
};

const renewalLoan = (loanId: number, userId: number) => {
  return axios.put<IBackendRes<any>>(renewalLoanUrl, {
    loanId,
    userId,
  });
};

const getReservationByUser = (userId: number) => {
  return axios.get<IBackendRes<IReservation[]>>(reservationByUserUrl(userId));
};

const cancelReservation = (reservationId: number) => {
  return axios.put<IBackendRes<IReservation[]>>(
    reservationByIdUrl(reservationId)
  );
};

// --- Fine APIs ---

const getFineById = (fineId: number) => {
  return axios.get<IBackendRes<IFine>>(fineByIdUrl(fineId));
};

const userPayFine = (fineId: number, paymentRef: string) => {
  return axios.post<IBackendRes<IFine>>(userPayFineUrl, {
    fineId,
    paymentRef,
  });
};

const userPaymentUpdateStatus = (
  paymentRef: string,
  paymentStatus: string,
  paymentType: string
) => {
  return axios.post<IBackendRes<IFine>>(userFineUpdateStatusUrl, {
    paymentRef,
    paymentStatus,
    paymentType,
  });
};

const getFineByUserId = (userId: number) => {
  return axios.get<IBackendRes<IFine[]>>(fineByUserIdUrl(userId));
};

const createFinePayment = (fineId: number, paymentRef: string | null) => {
  return axios.post<IBackendRes<{ payment: IPayment; fine: IFine }>>(
    userPayFineUrl,
    {
      fineId,
      paymentRef,
    }
  );
};

const LoanService = {
  getLoanByUserId,
  getReturnedLoanByUser,
  getBookOnLoan,
  getOnLoanById,
  createLoan,
  renewalLoan,
  getReservationByUser,
  cancelReservation,
  getFineById,
  userPayFine,
  userPaymentUpdateStatus,
  getFineByUserId,
  createFinePayment,
};

export default LoanService;
