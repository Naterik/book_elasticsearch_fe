import PublisherService from "@admin/publisher/services";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getPublisherColumns } from "../publisher-columns";

export const usePublisherManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState<IPublisher | null>(
    null
  );
  const [selectedPublisherId, setSelectedPublisherId] = useState<number | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchPublishers();
  }, [currentPage]);

  const fetchPublishers = async () => {
    setIsLoading(true);
    try {
      const response = await PublisherService.getPublishers({
        page: currentPage,
      });
      if (response.data && response.data.result) {
        setPublishers(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setPageSize(response.data.pagination.pageSize);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Failed to fetch publishers.");
      console.error(err);
    } finally {
      setIsLoading(false);
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
  const handleViewPublisher = (publisherId: number) => {
    setSelectedPublisherId(publisherId);
    setIsDetailDialogOpen(true);
  };
  const handleDeleteClick = (publisher: IPublisher) => {
    setSelectedPublisher(publisher);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPublisher) return;
    setIsLoading(true);
    try {
      const response = await PublisherService.deletePublisher(
        +selectedPublisher.id
      );
      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Publisher deleted successfully.");
        fetchPublishers();
      }
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
    () =>
      getPublisherColumns(
        handleEditPublisher,
        handleDeleteClick,
        handleViewPublisher
      ),
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
    isDetailDialogOpen,
    setIsDetailDialogOpen,
    selectedPublisher,
    selectedPublisherId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreatePublisher,
    handleConfirmDelete,
    handleFormSuccess,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
  };
};
