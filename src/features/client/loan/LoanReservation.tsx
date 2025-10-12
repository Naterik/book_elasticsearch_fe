import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/helper";
import { Book, AlertCircle, Loader2 } from "lucide-react";
import { getStatusVariant } from "@/components/Statusbook";
import { Spinner } from "@/components/ui/spinner";
interface LoanReservationProps {
  reservationData: IReservation[];
  onCancelReservation: (reservationId: number) => void;
  cancellingId: number | null;
}

const LoanReservation = ({
  reservationData,
  onCancelReservation,
  cancellingId,
}: LoanReservationProps) => {
  if (reservationData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Sách đặt trước</CardTitle>
          <CardDescription>
            Danh sách các cuốn sách bạn đã đặt trước
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <Book className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-1">
              Chưa có lượt đặt trước nào
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Hãy bắt đầu khám phá và đặt trước những cuốn sách bạn yêu thích.
            </p>
            <Button>Khám phá sách</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {reservationData.map((reservation) => {
            const isCancelling = reservation.status === "CANCELED";
            const cancelId = cancellingId === reservation.id;
            return (
              <div
                key={reservation.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={reservation.book.image}
                  alt={reservation.book.title}
                  className="w-20 h-24 object-cover rounded flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold font-montserrat text-lg leading-tight">
                        {reservation.book.title}
                      </h3>
                      {/* Hiển thị trạng thái rõ ràng */}
                      <Badge
                        variant={getStatusVariant(reservation.status)}
                        className="flex-shrink-0 w-fit"
                      >
                        {reservation.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {reservation.book.authors.name}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Ngày đặt: </span>
                      <span className="font-medium">
                        {formatDate(reservation.requestDate)}
                      </span>
                    </div>

                    {!isCancelling ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={cancelId}
                          >
                            {cancelId ? (
                              <Spinner className="mr-2 h-4 w-4" />
                            ) : (
                              <AlertCircle className="mr-2 h-4 w-4" />
                            )}
                            Hủy đặt trước
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Bạn có chắc chắn không?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành động này sẽ hủy lượt đặt trước cho cuốn sách
                              "{reservation.book.title}". Bạn không thể hoàn tác
                              hành động này.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Thoát</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                onCancelReservation(reservation.id)
                              }
                            >
                              Hủy
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanReservation;
