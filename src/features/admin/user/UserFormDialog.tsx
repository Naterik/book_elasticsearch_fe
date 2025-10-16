import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUserAPI, updateUserAPI } from "@/services/admin";
import { Upload, X } from "lucide-react";
import {
  userFormSchema,
  type UserFormValues,
  type UserStatusType,
} from "@/lib/validators/user";

export type CreateUserPayload = Pick<
  IUserBase,
  "username" | "fullName" | "address" | "phone" | "roleId"
> & {
  password: string;
  avatar?: File;
};

export type UpdateUserPayload = Partial<Omit<CreateUserPayload, "password">> & {
  id: number;
  password?: string;
  status?: UserStatusType;
};

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IAdminUser | null;
  onSuccess: () => void;
}

const UserFormDialog = ({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserFormDialogProps) => {
  const { showLoader, hideLoader } = useCurrentApp();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const isEditMode = !!user;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      address: "",
      phone: "",
      roleId: "",
      status: undefined,
      avatar: undefined,
    },
  });
  useEffect(() => {
    if (open) {
      if (user) {
        form.reset({
          username: user.username,
          password: "",
          fullName: user.fullName || "",
          address: user.address || "",
          phone: user.phone || "",
          roleId: user.roleId.toString(),
          status: user.status,
          avatar: undefined,
        });
        if (user.avatar) {
          setAvatarPreview(user.avatar);
        }
      } else {
        form.reset({
          username: "",
          password: "",
          fullName: "",
          address: "",
          phone: "",
          roleId: "",
          status: undefined,
          avatar: undefined,
        });
        setAvatarPreview(null);
      }
    }
  }, [open, user, form]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      form.setValue("avatar", file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    form.setValue("avatar", undefined);
    const fileInput = document.getElementById(
      "avatar-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (values: UserFormValues) => {
    showLoader();

    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("fullName", values.fullName);
      formData.append("roleId", values.roleId);
      if (values.password) {
        formData.append("password", values.password);
      } else if (!isEditMode) {
        toast.error("Password is required for new users");
        hideLoader();
        return;
      }
      if (values.address) {
        formData.append("address", values.address);
      }
      if (values.phone) {
        formData.append("phone", values.phone);
      }
      if (values.status) {
        formData.append("status", values.status);
      }
      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }
      let response;
      if (isEditMode) {
        if (user?.id) {
          formData.append("id", user.id.toString());
        }
        response = await updateUserAPI(formData);
      } else {
        response = await createUserAPI(formData);
      }
      if (response.error) {
        const errorMessage = Array.isArray(response.error)
          ? response.error.join(", ")
          : response.error;
        toast.error(errorMessage);
      } else {
        toast.success(
          isEditMode ? "User updated successfully" : "User created successfully"
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update user" : "Failed to create user"
      );
    } finally {
      hideLoader();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit User" : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update user information and permissions"
              : "Add a new user to the system"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username (Email) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username (Email) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password {!isEditMode && "*"}
                    {isEditMode && " (leave blank to keep current)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Admin</SelectItem>
                      <SelectItem value="2">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditMode && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="PENDING_CARD">
                          Pending Card
                        </SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {avatarPreview && (
                        <div className="relative inline-block">
                          <img
                            src={avatarPreview}
                            alt="Avatar preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={handleRemoveAvatar}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Input
                          id="avatar-input"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="cursor-pointer"
                        />
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Max file size: 5MB. Supported formats: JPG, PNG, GIF
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update User" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
