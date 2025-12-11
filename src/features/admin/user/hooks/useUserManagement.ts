import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { getAllUsersAPI, deleteUserAPI } from "@/features/admin/user/services";
import { getUserColumns } from "../user-columns";

export const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    setIsLoading(true);
    try {
      const response = await getAllUsersAPI(currentPage);

      if (response.data && response.data.result) {
        setUsers(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);
    try {
      const response = await deleteUserAPI(userToDelete);

      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
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

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const columns = useMemo(
    () => getUserColumns(handleEditUser, handleDeleteClick, handleViewUser),
    []
  );

  return {
    users,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedUser,
    selectedUserId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    handleCreateUser,
    handleEditUser,
    handleViewUser,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
  };
};
