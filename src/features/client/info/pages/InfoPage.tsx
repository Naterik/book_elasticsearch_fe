import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InfoAvatar,
  InfoOverview,
  InfoHistory,
  useInfoPage,
} from "@/features/client/info";

export default function InfoPage() {
  const { activeTab, setActiveTab, currentUser, onSettingsClick } =
    useInfoPage();

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
