import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { getAllUsersAPI, deleteUserAPI } from "@/services/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, Pencil, Trash2, Eye } from "lucide-react";
import { StatusBadgeUser } from "@/features/admin/user/StatusUser";
import UserFormDialog from "@/features/admin/user/UserFormDialog";
import UserDetailDialog from "@/features/admin/user/UserDetailDialog";

const UserManagement = () => {
  const { showLoader, hideLoader } = useCurrentApp();

  const [users, setUsers] = useState<IAdminUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IAdminUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    showLoader();
    try {
      const response = await getAllUsersAPI(currentPage);

      if (response.data && response.data.result) {
        setUsers(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      hideLoader();
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsFormDialogOpen(true);
  };

  const handleEditUser = (user: IAdminUser) => {
    setSelectedUser(user);
    setIsFormDialogOpen(true);
  };

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    showLoader();
    try {
      const response = await deleteUserAPI(userToDelete);

      if (response.error) {
        toast.error(
          Array.isArray(response.error) ? response.error[0] : response.error
        );
      } else {
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      hideLoader();
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage system users and their permissions
          </p>
        </div>
        <Button onClick={handleCreateUser} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        {users.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-muted-foreground">No users found</p>
              <Button
                onClick={handleCreateUser}
                className="mt-4"
                variant="outline"
              >
                Create your first user
              </Button>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Card Number</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      #{user.id}
                    </button>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.fullName || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role.name}</Badge>
                  </TableCell>
                  <TableCell>{StatusBadgeUser(user.status)}</TableCell>
                  <TableCell>{user.cardNumber || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewUser(user.id)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                        title="Edit User"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(user.id)}
                        title="Delete User"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {users.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} users
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblingCount={1}
          />
        </div>
      )}
      <UserFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        user={selectedUser}
        onSuccess={handleFormSuccess}
      />
      <UserDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        userId={selectedUserId}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
