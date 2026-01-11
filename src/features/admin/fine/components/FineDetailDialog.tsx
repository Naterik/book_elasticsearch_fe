import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/helper";
import type { IFine } from "@/types/entities/payment";
import FineService from "@admin/fine/services";
import { FileText, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FineDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fineId: number | null;
}

const FineDetailDialog = ({
  open,
  onOpenChange,
  fineId,
}: FineDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fine, setFine] = useState<IFine | null>(null);

  useEffect(() => {
    if (open && fineId) {
      fetchFineDetails();
    } else {
      setFine(null);
    }
  }, [open, fineId]);

  const fetchFineDetails = async () => {
    if (!fineId) return;
    setIsLoading(true);
    try {
      const response = await FineService.getFineById(fineId);

      if (response.data) {
        setFine(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch fine details");
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
            <FileText className="h-6 w-6" />
            Fine Details
          </DialogTitle>
          <DialogDescription>
            Detail information about this fine
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : fine ? (
          <div className="space-y-6">
            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Amount
                </p>
                <p className="text-destructive text-2xl font-bold">
                  {formatCurrency(fine.amount)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <Badge
                  variant={fine.isPaid ? "default" : "destructive"}
                  className="mt-1"
                >
                  {fine.isPaid ? "PAID" : "UNPAID"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Reason</h4>
              <div className="bg-background rounded-md border p-3 text-sm">
                {fine.reason}
              </div>
            </div>

            {fine.user && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4" /> User
                </h4>
                <div className="rounded-md border p-3 text-sm">
                  <p className="font-medium">{fine.user.fullName}</p>
                  <p className="text-muted-foreground">{fine.user.username}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No fine data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FineDetailDialog;
