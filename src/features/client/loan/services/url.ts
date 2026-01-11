export const loanByUserIdUrl = (userId: number) => `/loans/user/${userId}`;
export const returnedLoanByUserUrl = (userId: number) =>
  `/loans/returned/${userId}`;
export const checkLoanUrl = (userId: number) => `/users/check-loan/${userId}`;
export const loanByIdUrl = (loanId: number) => `/loans/${loanId}`;
export const loansUrl = "/loans";
export const renewalLoanUrl = "/loans/renewal";
export const reservationByUserUrl = (userId: number) =>
  `/reservations/users/${userId}`;
export const reservationByIdUrl = (reservationId: number) =>
  `/reservations/${reservationId}`;
export const fineByIdUrl = (fineId: number) => `/fines/${fineId}`;
export const userPayFineUrl = "/users/fine";
export const userFineUpdateStatusUrl = "/users/fine/update-status";
export const fineByUserIdUrl = (userId: number) => `/fines/${userId}`;
