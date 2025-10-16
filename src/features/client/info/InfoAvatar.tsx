import { Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/info";

type Props = {
  user: UserProfile;
  onSettingsClick?: () => void;
};

export default function InfoAvatar({ user, onSettingsClick }: Props) {
  const initials =
    user.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  const { label: statusLabel, cls: statusCls } =
    user.status === "active"
      ? { label: "Active member", cls: "bg-green-500" }
      : user.status === "inactive"
      ? { label: "Inactive", cls: "bg-gray-400" }
      : { label: "Banned", cls: "bg-red-500" };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-semibold font-montserrat mb-1">
            {user.fullName}
          </h2>
          <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
          <Badge className={statusCls}>{statusLabel}</Badge>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">Card ID:</span>
            <div className="font-mono font-medium">{user.cardNumber}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <div className="font-medium">{user.email}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span>
            <div className="font-medium">{user.phone}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Member since:</span>
            <div className="font-medium">{user.membershipStart}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Expires on:</span>
            <div className="font-medium">{user.membershipEnd}</div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 bg-transparent"
          onClick={onSettingsClick}
        >
          <Settings className="h-4 w-4 mr-2" />
          Account settings
        </Button>
      </CardContent>
    </Card>
  );
}
