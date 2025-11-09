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
import { PlusIcon } from "lucide-react";
import UserFormDialog from "@/features/admin/user/components/UserFormDialog";
import UserDetailDialog from "@/features/admin/user/components/UserDetailDialog";
import { DataTable } from "@/components/layout/admin/data-table";
import { TableSkeletonLoader } from "@/components/layout/admin/table-skeleton-loader";
import { useUserManagement } from "@/features/admin/user/hooks/useUserManagement";

const UserManagement = () => {
  const {
    users,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isInitialLoading,

    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedUser,
    selectedUserId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateUser,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  } = useUserManagement();

  return (
    <>
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

      {isInitialLoading ? (
        <TableSkeletonLoader rows={12} columns={5} />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          searchKey="username"
          searchPlaceholder="Search by username..."
          pageCount={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          showColumnToggle={true}
          showPagination={true}
          showSearch={true}
          emptyMessage="No users found. Add your first user to get started."
        />
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
    </>
  );
};

export default UserManagement;
