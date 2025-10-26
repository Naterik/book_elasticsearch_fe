import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

const getNotificationsByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

const putSingleNotificationAPI = (userId: number, id: number) => {
  return axios.put<IBackendRes<INotification>>(
    `/api/v1/notifications/${userId}`,
    { id }
  );
};

const putBulkNotificationAPI = (userId: number) => {
  return axios.put<IBackendRes<{ count: number }>>(
    `/api/v1/notifications/bulk/${userId}`
  );
};

export {
  getNotificationsByUserIdAPI,
  putSingleNotificationAPI,
  putBulkNotificationAPI,
};
