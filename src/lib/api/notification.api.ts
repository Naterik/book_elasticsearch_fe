import createInstanceAxios from "@/lib/api/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const getNotificationsByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

export const getUnreadNotificationsAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/unread/${userId}`
  );
};

export const putSingleNotificationAsReadAPI = (
  userId: number,
  notificationId: number
) => {
  return axios.put<IBackendRes<INotification>>(
    `/api/v1/notifications/${userId}`,
    { id: notificationId }
  );
};

export const putBulkNotificationAsReadAPI = (userId: number) => {
  return axios.put<IBackendRes<{ count: number }>>(
    `/api/v1/notifications/bulk/${userId}`
  );
};
