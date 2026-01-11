import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPublisher } from "@/types/entities/publisher";
import PublisherService from "@admin/publisher/services";
import { Building2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PublisherDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publisherId: number | null;
}

const PublisherDetailDialog = ({
  open,
  onOpenChange,
  publisherId,
}: PublisherDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [publisher, setPublisher] = useState<IPublisher | null>(null);

  useEffect(() => {
    if (open && publisherId) {
      fetchPublisherDetails();
    } else {
      setPublisher(null);
    }
  }, [open, publisherId]);

  const fetchPublisherDetails = async () => {
    if (!publisherId) return;
    setIsLoading(true);
    try {
      const response = await PublisherService.getPublisherById(publisherId);

      if (response.data) {
        setPublisher(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch publisher details");
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
            <Building2 className="h-6 w-6" />
            Publisher Details
          </DialogTitle>
          <DialogDescription>
            Information about this publisher
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : publisher ? (
          <div className="grid justify-start space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left font-semibold">ID</span>
              <span className="col-span-3">
                <span className="mx-2 font-medium">:</span>#{publisher.id}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left font-semibold">Name</span>
              <span className="col-span-3 font-medium">
                {" "}
                <span className="mx-2 font-medium">:</span>
                {publisher.name}
              </span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="mt-1 text-left font-semibold">Bio:</span>
              <span className="text-muted-foreground col-span-3">
                <span className="mx-2 font-medium">:</span>
                {publisher.description || "No info"}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No publisher data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PublisherDetailDialog;
