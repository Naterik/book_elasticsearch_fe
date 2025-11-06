/**
 * Notification API Services
 * Handles all user notification API calls
 */

import createInstanceAxios from "@/services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// ============================================
// Get Notifications
// ============================================

/**
 * Get all notifications for a user
 * @param userId - User ID
 */
export const getNotificationsByUserIdAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/${userId}`
  );
};

/**
 * Get unread notifications for a user
 * @param userId - User ID
 */
export const getUnreadNotificationsAPI = (userId: number) => {
  return axios.get<IBackendRes<INotification[]>>(
    `/api/v1/notifications/unread/${userId}`
  );
};

// ============================================
// Update Notifications
// ============================================

/**
 * Mark single notification as read
 * @param userId - User ID
 * @param notificationId - Notification ID
 */
export const putSingleNotificationAPI = (
  userId: number,
  notificationId: number
) => {
  return axios.put<IBackendRes<INotification>>(
    `/api/v1/notifications/${userId}`,
    { id: notificationId }
  );
};

/**
 * Mark all notifications as read
 * @param userId - User ID
 */
export const putBulkNotificationAPI = (userId: number) => {
  return axios.put<IBackendRes<{ count: number }>>(
    `/api/v1/notifications/bulk/${userId}`
  );
};

// ============================================
// Deprecated - for backward compatibility
// ============================================

export const getNotificationByUserAPI = getNotificationsByUserIdAPI;
export const putSingleNotificationAsReadAPI = putSingleNotificationAPI;
export const putBulkNotificationAsReadAPI = putBulkNotificationAPI;
