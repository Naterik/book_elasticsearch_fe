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
import { formatDate } from "@/helper";
import { Book, AlertCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  if (reservationData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Reservation book</CardTitle>
          <CardDescription>List reservation of book</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <Book className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-1">
              Haven't reservation yet !!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore more with our fascinating library books
            </p>
            <Button onClick={() => navigate("/")}>Explore more book</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-montserrat">Reservation book</CardTitle>
        <CardDescription>List of reservation book</CardDescription>
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

                      <StatusBadge
                        status={reservation.status}
                        className="flex-shrink-0 w-fit"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {reservation.book.authors.name}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Request date:{" "}
                      </span>
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
                            Cancel reservation
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will cancel the reservation "
                              {reservation.book.title}". You cannot redo this.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                onCancelReservation(reservation.id)
                              }
                            >
                              Yes
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
