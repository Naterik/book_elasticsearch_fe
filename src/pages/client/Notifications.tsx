import { NotificationList } from "@/features/client/notification";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <NotificationList />
      </div>
    </div>
  );
}
