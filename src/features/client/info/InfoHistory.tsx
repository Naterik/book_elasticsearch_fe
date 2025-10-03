"use client";

import { BookOpen, Calendar, Bell, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Activity, ActivityType } from "@/types/info";

type Props = {
  activities: Activity[];
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

export default function InfoHistory({ activities }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Activity history</CardTitle>
        <CardDescription>All your borrowing/returning activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 border rounded-lg"
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{activity.bookTitle}</p>
                  <span className="text-sm text-muted-foreground">
                    {activity.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
