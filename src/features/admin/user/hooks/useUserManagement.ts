import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { getAllUsersAPI, deleteUserAPI } from "@/features/admin/user/services";
import { getUserColumns } from "../user-columns";

/**
 * Custom hook for managing user CRUD operations
 * Handles all business logic for user management page
 */
export const useUserManagement = () => {
  const { showLoader, hideLoader } = useCurrentApp();

  // Data state
  const [users, setUsers] = useState<IAdminUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);

  // UI state
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IAdminUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  // Fetch users when page changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  /**
   * Fetch users from API
   */
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

  /**
   * Open form dialog for creating new user
   */
  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsFormDialogOpen(true);
  };

  /**
   * Open form dialog for editing existing user
   */
  const handleEditUser = (user: IAdminUser) => {
    setSelectedUser(user);
    setIsFormDialogOpen(true);
  };

  /**
   * Open detail dialog to view user information
   */
  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setIsDetailDialogOpen(true);
  };

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirm and execute user deletion
   */
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

  /**
   * Handle successful form submission (create/edit)
   */
  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  /**
   * Handle page change in pagination
   */
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /**
   * Handle page size change in pagination
   */
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  /**
   * Memoized column definitions with event handlers
   */
  const columns = useMemo(
    () => getUserColumns(handleEditUser, handleDeleteClick, handleViewUser),
    []
  );

  return {
    // Data
    users,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,

    // UI State
    isFormDialogOpen,
    setIsFormDialogOpen,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedUser,
    selectedUserId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,

    // Handlers
    handleCreateUser,
    handleEditUser,
    handleViewUser,
    handleDeleteClick,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
  };
};
