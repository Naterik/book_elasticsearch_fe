import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Reservation Management APIs
export const getAllReservationsAdminAPI = (page: number = 1) => {
  const urlBackend = `/api/v1/reservations?page=${page}`;
  return axios.get<IBackendRes<IModelPaginate<IReservation>>>(urlBackend);
};

export const getReservationByIdAdminAPI = (id: number) => {
  const urlBackend = `/api/v1/reservations/${id}`;
  return axios.get<IBackendRes<IReservation>>(urlBackend);
};

export const createReservationAPI = (data: {
  bookId: number;
  userId: number;
}) => {
  const urlBackend = "/api/v1/reservations";
  return axios.post<IBackendRes<IReservation>>(urlBackend, data);
};

export const updateReservationStatusAPI = (id: number, status: string) => {
  const urlBackend = `/api/v1/reservations/${id}`;
  return axios.put<IBackendRes<IReservation>>(urlBackend, { status });
};

export const updateReservationAPI = (
  id: number,
  data: {
    bookId: number;
    userId: number;
  }
) => {
  const urlBackend = `/api/v1/reservations/${id}`;
  return axios.put<IBackendRes<IReservation>>(urlBackend, data);
};

export const deleteReservationAPI = (id: number) => {
  const urlBackend = `/api/v1/reservations/${id}`;
  return axios.delete<IBackendRes<void>>(urlBackend);
};
