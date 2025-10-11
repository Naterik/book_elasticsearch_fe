import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, AlertTriangle, CreditCard } from "lucide-react";
const Statistical = () => {
  return (
    <div className=" grid grid-cols-4 gap-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6 text-center">
          <BookOpen className="size-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-700 mb-1">1</div>
          <div className="text-sm text-blue-600 font-medium">Đang mượn</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-700 mb-1">{1}</div>
          <div className="text-sm text-yellow-600 font-medium">Sắp đến hạn</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-700 mb-1">{1}</div>
          <div className="text-sm text-red-600 font-medium">Quá hạn</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6 text-center">
          <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-700 mb-1">{1}vnd</div>
          <div className="text-sm text-purple-600 font-medium">Tiền phạt</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistical;
