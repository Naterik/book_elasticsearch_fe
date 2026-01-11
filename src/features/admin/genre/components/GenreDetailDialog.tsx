import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IGenre } from "@/types/entities/genre";
import GenreService from "@admin/genre/services";
import { Loader2, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface GenreDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  genreId: number | null;
}

const GenreDetailDialog = ({
  open,
  onOpenChange,
  genreId,
}: GenreDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState<IGenre | null>(null);

  useEffect(() => {
    if (open && genreId) {
      fetchGenreDetails();
    } else {
      setGenre(null);
    }
  }, [open, genreId]);

  const fetchGenreDetails = async () => {
    if (!genreId) return;
    setIsLoading(true);
    try {
      const response = await GenreService.getGenreById(genreId);

      if (response.data) {
        setGenre(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch genre details");
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
            <Tag className="h-6 w-6" />
            Genre Details
          </DialogTitle>
          <DialogDescription>Information about this genre</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : genre ? (
          <div className="grid justify-start space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left font-semibold">ID</span>
              <span className="col-span-3">
                <span className="mx-2 font-medium">:</span>#{genre.id}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left font-semibold">Name</span>
              <span className="col-span-3 font-medium">
                {" "}
                <span className="mx-2 font-medium">:</span>
                {genre.name}
              </span>
            </div>
            {genre.description && (
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="mt-1 text-left font-semibold">
                  Description:
                </span>
                <span className="text-muted-foreground col-span-3">
                  <span className="mx-2 font-medium">:</span>
                  {genre.description}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No genre data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GenreDetailDialog;
