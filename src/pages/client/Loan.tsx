import Statistical from "@/components/Statistical";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoanCurrent from "@/features/client/loan/LoanCurrent";
import LoanHistory from "@/features/client/loan/LoanHistory";
import LoanReservation from "@/features/client/loan/LoanReservation";
const LoanPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div>
        <Statistical />
      </div>
      <div>noti</div>
      <div>
        <Tabs defaultValue="current">
          <TabsList>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Đang mượn 1</TabsTrigger>
              <TabsTrigger value="history">Lịch sử 1</TabsTrigger>
              <TabsTrigger value="reservations">Đặt trước 1</TabsTrigger>
            </TabsList>
          </TabsList>
          <TabsContent value="current">
            <LoanCurrent />
          </TabsContent>
          <TabsContent value="history">
            <LoanHistory />
          </TabsContent>
          <TabsContent value="reservations">
            <LoanReservation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanPage;
