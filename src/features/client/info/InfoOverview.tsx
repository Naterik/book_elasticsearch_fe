"use client";

import { BookOpen, Calendar, Bell, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type {
  Activity,
  NotificationItem,
  ActivityType,
  NotificationType,
} from "@/types/info";
import Notifications from "@/components/Notification";

type Props = {
  recentActivity: Activity[];
  notifications: NotificationItem[];
  onViewAllActivity?: () => void;
  onViewAllNotifications?: () => void;
};

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "borrow":
      return <BookOpen className="h-4 w-4 text-green-600" />;
    case "return":
      return <Calendar className="h-4 w-4 text-blue-600" />;
    case "reserve":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "fine":
      return <Bell className="h-4 w-4 text-red-600" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "reminder":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "available":
      return <BookOpen className="h-4 w-4 text-green-600" />;
    case "overdue":
      return <Bell className="h-4 w-4 text-red-600" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default function InfoOverview({
  recentActivity,
  notifications,
  onViewAllActivity,
  onViewAllNotifications,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Recent activity</CardTitle>
          <CardDescription>Latest borrow/return actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">
                    {activity.bookTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent"
            onClick={onViewAllActivity}
          >
            View all activity
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Notifications />
        </CardContent>
      </Card>
    </div>
  );
}
