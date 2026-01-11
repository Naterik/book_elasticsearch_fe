import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/helper";
import type { IReservation } from "@/types/entities/reservation";
import ReservationService from "@admin/reservation/services";
import { Calendar, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ReservationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservationId: number | null;
}

const ReservationDetailDialog = ({
  open,
  onOpenChange,
  reservationId,
}: ReservationDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<IReservation | null>(null);

  useEffect(() => {
    if (open && reservationId) {
      fetchReservationDetails();
    } else {
      setReservation(null);
    }
  }, [open, reservationId]);

  const fetchReservationDetails = async () => {
    if (!reservationId) return;
    setIsLoading(true);
    try {
      const response =
        await ReservationService.getReservationById(reservationId);

      if (response.data) {
        setReservation(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch reservation details");
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6" />
            Reservation Details
          </DialogTitle>
          <DialogDescription>Details about this reservation</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : reservation ? (
          <div className="space-y-6">
            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <Badge className="mt-1">{reservation.status}</Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Reservation Date
                </p>
                <p className="font-semibold">
                  {formatDate(reservation.requestDate)}
                </p>
              </div>
            </div>

            {reservation.user && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4" /> User
                </h4>
                <div className="rounded-md border p-3 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name: </span>
                    {reservation.user.fullName}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email: </span>
                    {reservation.user.username}
                  </p>
                </div>
              </div>
            )}

            {reservation.book && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Book</h4>
                <div className="flex gap-4 rounded-md border p-3 text-sm">
                  {reservation.book.image && (
                    <img
                      src={reservation.book.image}
                      alt="cover"
                      className="h-16 w-12 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{reservation.book.title}</p>
                    <p className="text-muted-foreground">
                      ISBN: {reservation.book.isbn}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No reservation data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailDialog;
