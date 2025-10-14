import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserByIdAPI } from "@/services/admin";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/helper";
import { StatusBadgeUser } from "./StatusUser";

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number | null;
}

type UserAccountType = "SYSTEM" | "GOOGLE";
const getTypeBadge = (type: UserAccountType) => {
  return type === "SYSTEM" ? (
    <Badge variant="default">System</Badge>
  ) : (
    <Badge variant="secondary">Google</Badge>
  );
};

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
  const { showLoader, hideLoader } = useCurrentApp();
  const [user, setUser] = useState<IAdminUser | null>(null);
  useEffect(() => {
    if (open && userId) {
      fetchUserDetails();
    } else {
      setUser(null);
    }
  }, [open, userId]);
  const fetchUserDetails = async () => {
    if (!userId) return;
    showLoader();
    try {
      const response = await getUserByIdAPI(userId);

      if (response.data) {
        setUser(response.data);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
      onOpenChange(false);
    } finally {
      hideLoader();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about the user account
          </DialogDescription>
        </DialogHeader>

        {user ? (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar || undefined}
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
                <div className="flex gap-2 pt-2 flex-wrap">
                  {StatusBadgeUser(user.status)}
                  {getTypeBadge(user.type)}
                  <Badge variant="outline">{user.role.name}</Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                Account Information
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-medium">#{user.id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{user.role.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">{user.type}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{user.status}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                Contact Information
              </h4>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.username}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
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
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                    Membership Information
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Card Number
                      </p>
                      <p className="font-medium">
                        {user.cardNumber || "No card assigned"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Membership Start
                      </p>
                      <p className="font-medium">
                        {formatDate(user.membershipStart || "")}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">
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
          <div className="text-center py-12 text-muted-foreground">
            No user data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
