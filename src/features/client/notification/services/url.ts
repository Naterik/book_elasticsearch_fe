export const notificationsUrl = "/notifications";
export const notificationByUserUrl = (userId: number) =>
  `/notifications/${userId}`;
export const notificationUnreadUrl = (userId: number) =>
  `/notifications/unread/${userId}`;
export const notificationBulkUrl = (userId: number) =>
  `/notifications/bulk/${userId}`;
