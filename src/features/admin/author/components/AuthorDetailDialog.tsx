import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IAuthor } from "@/types/entities/author";
import AuthorService from "@admin/author/services";
import { Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthorDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorId: number | null;
}

const AuthorDetailDialog = ({
  open,
  onOpenChange,
  authorId,
}: AuthorDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState<IAuthor | null>(null);

  useEffect(() => {
    if (open && authorId) {
      fetchAuthorDetails();
    } else {
      setAuthor(null);
    }
  }, [open, authorId]);

  const fetchAuthorDetails = async () => {
    if (!authorId) return;
    setIsLoading(true);
    try {
      const response = await AuthorService.getAuthorById(authorId);

      if (response.data) {
        setAuthor(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch author details");
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
            <User className="h-6 w-6" />
            Author Details
          </DialogTitle>
          <DialogDescription>Information about this author</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : author ? (
          <div className="grid justify-start space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left font-semibold">ID</span>
              <span className="col-span-3">
                <span className="mx-2 font-medium">:</span>#{author.id}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left font-semibold">Name</span>
              <span className="col-span-3 font-medium">
                {" "}
                <span className="mx-2 font-medium">:</span>
                {author.name}
              </span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="mt-1 text-left font-semibold">Bio:</span>
              <span className="text-muted-foreground col-span-3">
                <span className="mx-2 font-medium">:</span>
                {author.bio || "No info"}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No author data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthorDetailDialog;
