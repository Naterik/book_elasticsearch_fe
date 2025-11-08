import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import { useTableLoadingState } from "@/hooks/use-table-loading";
import { getPublishersAPI, deletePublisherAPI } from "../services";
import { getPublisherColumns } from "../publisher-columns";

export const usePublisherManagement = () => {
  const { setIsLoading } = useCurrentApp();
  const { isInitialLoading, setIsInitialLoading } = useTableLoadingState();
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState<IPublisher | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchPublishers();
  }, [currentPage]);

  const fetchPublishers = async () => {
    setIsLoading(true);
    try {
      const res = await getPublishersAPI({ page: currentPage });
      if (res.data && res.data.result) {
        setPublishers(res.data.result);
        setTotalPages(res.data.pagination.totalPages);
        setTotalItems(res.data.pagination.totalItems);
        setPageSize(res.data.pagination.pageSize);
      } else if (res.error) {
        toast.error(Array.isArray(res.error) ? res.error[0] : res.error);
      }
    } catch (err) {
      toast.error("Failed to fetch publishers.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  const handleCreatePublisher = () => {
    setSelectedPublisher(null);
    setIsFormDialogOpen(true);
  };

  const handleEditPublisher = (publisher: IPublisher) => {
    setSelectedPublisher(publisher);
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (publisher: IPublisher) => {
    setSelectedPublisher(publisher);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPublisher) return;
    setIsLoading(true);
    try {
      await deletePublisherAPI(+selectedPublisher.id);
      toast.success("Publisher deleted successfully.");
      fetchPublishers();
    } catch (error) {
      toast.error("Failed to delete publisher.");
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setSelectedPublisher(null);
    }
  };

  const handleFormSuccess = () => {
    setIsFormDialogOpen(false);
    fetchPublishers();
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
    () => getPublisherColumns(handleEditPublisher, handleDeleteClick),
    []
  );

  return {
    publishers,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    columns,
    isFormDialogOpen,
    setIsFormDialogOpen,
    selectedPublisher,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreatePublisher,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isInitialLoading,
  };
};
