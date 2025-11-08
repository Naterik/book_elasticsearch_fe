import { useState } from "react";

/**
 * Custom hook for managing table loading state (initial load only)
 * Does NOT show loader when changing pages/pagination
 *
 * Usage:
 * const { isInitialLoading, setIsInitialLoading } = useTableLoadingState();
 */
export const useTableLoadingState = () => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  return {
    isInitialLoading,
    setIsInitialLoading,
  };
};
