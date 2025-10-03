"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type {
  Activity,
  NotificationItem,
  Stats,
  UserProfile,
} from "@/types/info";
import { Button } from "@/components/ui/button";
import InfoAvatar from "@/features/client/info/InfoAvatar";
import InfoOverview from "@/features/client/info/InfoOverview";
import InfoHistory from "@/features/client/info/InfoHistory";

const user: UserProfile = {
  id: "U001",
  username: "johndoe",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "0123456789",
  address: "123 Elm Street, Springfield",
  cardNumber: "LIB2023001",
  membershipStart: "2023-01-15",
  membershipEnd: "2024-01-15",
  status: "active",
  avatar: "",
};

const stats: Stats = {
  totalBooksRead: 45,
  currentLoans: 3,
  overdueBooks: 1,
  totalFines: 15000,
  favoriteBooks: 12,
  readingGoal: 50,
  readingStreak: 7,
};

const recentActivity: Activity[] = [
  {
    id: "1",
    type: "borrow",
    bookTitle: "Modern JavaScript",
    date: "2023-12-01",
    description: "Borrowed successfully",
  },
  {
    id: "2",
    type: "return",
    bookTitle: "The Great Gatsby",
    date: "2023-11-28",
    description: "Returned on time",
  },
];

const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "reminder",
    title: "Due soon",
    message: '"Algorithms" is due on 2023-12-20',
    date: "2023-12-18",
    read: false,
  },
  {
    id: "2",
    type: "available",
    title: "Now available",
    message: '"The Great Gatsby" you reserved is now available',
    date: "2023-12-15",
    read: false,
  },
];

const onSettingsClick = () => console.log("Open settings");
const onViewAllActivity = () => console.log("View all activity");
const onViewAllNotifications = () => console.log("View all notifications");

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-4">
        <div className="lg:col-span-1">
          <InfoAvatar user={user} onSettingsClick={onSettingsClick} />
        </div>

        <div className="lg:col-span-3">
          {stats.overdueBooks > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <Bell className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                You have {stats.overdueBooks} overdue book(s) and fines totaling{" "}
                {formatCurrency(stats.totalFines)}.
                <Button
                  variant="link"
                  className="p-0 h-auto text-red-800 underline ml-2"
                >
                  View details
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <InfoOverview
                recentActivity={recentActivity}
                notifications={notifications}
                onViewAllActivity={onViewAllActivity}
                onViewAllNotifications={onViewAllNotifications}
              />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <InfoHistory activities={recentActivity} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
