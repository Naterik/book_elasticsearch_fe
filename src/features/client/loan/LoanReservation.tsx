import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatusBadge } from "@/components/Statusbook";
import { Button } from "@/components/ui/button";
const mockReservations = [
  {
    id: "R001",
    bookId: "2",
    bookTitle: "Truyện Kiều",
    authors: ["Nguyễn Du"],
    isbn: "978-604-1-11111-1",
    requestDate: "2023-12-15",
    status: "pending",
    position: 2,
    estimatedAvailable: "2024-01-20",
    image: "",
  },
];
const LoanReservation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Sách đặt trước</CardTitle>
        <CardDescription>
          Danh sách các cuốn sách bạn đã đặt trước
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockReservations.map((reservation) => (
            <Card key={reservation.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={reservation.image}
                    alt={reservation.bookTitle}
                    className="w-16 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold font-montserrat text-lg mb-1">
                          {reservation.bookTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {reservation.authors.join(", ")}
                        </p>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Ngày đặt:</span>
                        <div className="font-medium">
                          {reservation.requestDate}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Vị trí hàng đợi:
                        </span>
                        <div className="font-medium">
                          #{reservation.position}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Dự kiến có sẵn:
                        </span>
                        <div className="font-medium">
                          {reservation.estimatedAvailable}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        Hủy đặt trước
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanReservation;
