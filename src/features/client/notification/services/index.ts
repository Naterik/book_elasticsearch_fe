import createInstanceAxios from "@/lib/api/axios.customize";
import {
  notificationByUserUrl,
  notificationUnreadUrl,
  notificationBulkUrl,
} from "./url";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getNotificationsByUserId = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(notificationByUserUrl(userId));
};

const getUnreadNotifications = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(notificationUnreadUrl(userId));
};

const putSingleNotificationAsRead = (
  userId: number,
  notificationId: number
) => {
  return axios.put<IBackendRes<INotification>>(notificationByUserUrl(userId), {
    id: notificationId,
  });
};

const putBulkNotificationAsRead = (userId: number) => {
  return axios.put<IBackendRes<{ count: number }>>(notificationBulkUrl(userId));
};

const NotificationService = {
  getNotificationsByUserId,
  getUnreadNotifications,
  putSingleNotificationAsRead,
  putBulkNotificationAsRead,
};

export default NotificationService;
