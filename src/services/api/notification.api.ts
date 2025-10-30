/**
 * Notification API Services
 * Handles user notifications
 */

import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

/**
 * Get notifications by user ID (legacy)
 * @deprecated Use getNotificationsByUserIdAPI instead
 */
export const getNotificationByUserAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

/**
 * Get notifications by user ID
 */
export const getNotificationsByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

/**
 * Mark single notification as read
 */
export const putSingleNotificationAPI = (id: number) => {
  return axios.put<IBackendRes<INotification>>(`/api/v1/notifications/${id}`);
};

/**
 * Mark all notifications as read for a user
 */
export const putBulkNotificationAPI = (userId: number) => {
  return axios.put<IBackendRes<{ count: number }>>(
    `/api/v1/notifications/bulk/${userId}`
  );
};
