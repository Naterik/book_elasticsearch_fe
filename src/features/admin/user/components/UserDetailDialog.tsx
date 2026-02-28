import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/helper";
import { getImageUrl } from "@/lib/utils";
import UserService from "@admin/user/services";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number | null;
}

const getInitials = (name: string | null) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const UserDetailDialog = ({
  open,
  onOpenChange,
  userId,
}: UserDetailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IAdminUserDetail | null>(null);
  useEffect(() => {
    if (open && userId) {
      fetchUserDetails();
    } else {
      setUser(null);
    }
  }, [open, userId]);
  const fetchUserDetails = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const response = await UserService.getUserById(userId);

      if (response.data) {
        setUser(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("object :>> ", getImageUrl(user?.avatar, "users"));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about the user account
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={getImageUrl(user.avatar, "users")}
                  alt={user.fullName || "User"}
                />
                <AvatarFallback className="text-lg">
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h3 className="text-2xl font-semibold">
                  {user.fullName || "No Name Provided"}
                </h3>
                <p className="text-muted-foreground">{user.username}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline">{user.role.name}</Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-muted-foreground text-sm font-semibold uppercase">
                Account Information
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">User ID</p>
                  <p className="font-medium">#{user.id}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Role</p>
                  <p className="font-medium">{user.role.name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Account Type</p>
                  <p className="font-medium">{user.type}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Status</p>
                  <p className="font-medium">{user.status}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-muted-foreground text-sm font-semibold uppercase">
                Contact Information
              </h4>

              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p className="font-medium">{user.username}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p className="font-medium">{user.phone || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Address</p>
                  <p className="font-medium">
                    {user.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Membership Information */}
            {(user.cardNumber ||
              user.membershipStart ||
              user.membershipEnd) && (
              <>
                <div className="space-y-4">
                  <h4 className="text-muted-foreground text-sm font-semibold uppercase">
                    Membership Information
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Card Number
                      </p>
                      <p className="font-medium">
                        {user.cardNumber || "No card assigned"}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-sm">
                        Membership Start
                      </p>
                      <p className="font-medium">
                        {formatDate(user.membershipStart || "")}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-muted-foreground text-sm">
                        Membership End
                      </p>
                      <p className="font-medium">
                        {formatDate(user.membershipEnd || "")}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground py-12 text-center">
            No user data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
