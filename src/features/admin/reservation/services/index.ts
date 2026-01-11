import createInstanceAxios from "@/lib/api/axios.customize";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import type { IReservation } from "@/types/entities/reservation";
import { reservationByIdUrl, reservationsUrl } from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// Reservation Management APIs
export const getAllReservations = (page: number = 1) => {
  return axios.get<IBackendRes<IModelPaginate<IReservation>>>(reservationsUrl, {
    params: { page },
  });
};

export const getReservationById = (id: number) => {
  return axios.get<IBackendRes<IReservation>>(reservationByIdUrl(id));
};

export const createReservation = (data: { bookId: number; userId: number }) => {
  return axios.post<IBackendRes<IReservation>>(reservationsUrl, data);
};

export const updateReservationStatus = (id: number, status: string) => {
  return axios.put<IBackendRes<IReservation>>(reservationByIdUrl(id), {
    status,
  });
};

export const updateReservation = (
  id: number,
  data: {
    bookId: number;
    userId: number;
  }
) => {
  return axios.put<IBackendRes<IReservation>>(reservationByIdUrl(id), data);
};

export const deleteReservation = (id: number) => {
  return axios.delete<IBackendRes<void>>(reservationByIdUrl(id));
};

const ReservationService = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservationStatus,
  updateReservation,
  deleteReservation,
};

export default ReservationService;
