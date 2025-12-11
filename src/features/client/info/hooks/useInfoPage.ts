import { useState, useEffect } from "react";
import { useCurrentApp } from "@/app/providers/app.context";
import { getUserProfileAPI } from "@/services/api";
import { toast } from "sonner";

export const useInfoPage = () => {
  const { user, setIsLoading } = useCurrentApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState<IUserInfo | null>(null);
  const checkUserId = user?.id ?? 0;

  const fetchUserProfile = async () => {
    if (!checkUserId || checkUserId === 0) return;
    setIsLoading(true);
    try {
      const res = await getUserProfileAPI(checkUserId);
      if (res.data) {
        setCurrentUser(res.data);
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSettingsClick = () => {
    console.log("Open settings");
  };

  useEffect(() => {
    if (checkUserId && checkUserId !== 0) {
      fetchUserProfile();
    }
  }, [checkUserId]);

  return {
    activeTab,
    setActiveTab,
    currentUser,
    onSettingsClick,
  };
};
