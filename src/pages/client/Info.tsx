import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoAvatar from "@/features/client/info/InfoAvatar";
import InfoOverview from "@/features/client/info/InfoOverview";
import InfoHistory from "@/features/client/info/InfoHistory";
import { getUserProfileAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";

const onSettingsClick = () => console.log("Open settings");

export default function InfoPage() {
  const { user, showLoader, hideLoader } = useCurrentApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState<IUserInfo | null>(null);
  const checkUserId = user?.id ?? 0;

  const fetchUserProfile = async () => {
    if (!checkUserId || checkUserId === 0) return;
    showLoader();
    try {
      const res = await getUserProfileAPI(checkUserId);
      if (res.data) {
        setCurrentUser(res.data);
      } else {
        toast.error(res.message);
      }
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    if (checkUserId && checkUserId !== 0) {
      fetchUserProfile();
    }
  }, [checkUserId, showLoader, hideLoader]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-4">
        <div className="lg:col-span-1">
          <InfoAvatar user={currentUser} onSettingsClick={onSettingsClick} />
        </div>

        <div className="lg:col-span-3">
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
              <InfoOverview />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <InfoHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
