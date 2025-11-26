import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getMostBorrowedBooksAPI,
  getNewArrivalBooksAPI,
  getRecommendedBooksAPI,
  getTrendingBooksAPI,
} from "@/services/api";
import { toast } from "sonner";

export const useHomePage = () => {
  const navigate = useNavigate();
  const { setIsLoading, isAuthenticated, user } = useCurrentApp();
  const [trendingBooks, setTrendingBooks] = useState<IBook[] | undefined>([]);
  const [newArrivals, setNewArrivals] = useState<IBook[] | undefined>([]);
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState<IBook[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<IBook[]>([]);
  const checkCard = user?.status !== "ACTIVE" && isAuthenticated === true;

  useEffect(() => {
    fetchHomePageData();
  }, [isAuthenticated, user]);

  const fetchHomePageData = async () => {
    try {
      const [trending, newBooks, mostBorrowed] = await Promise.all([
        getTrendingBooksAPI(),
        getNewArrivalBooksAPI(),
        getMostBorrowedBooksAPI(),
      ]);

      if (trending.data && newBooks.data && mostBorrowed.data) {
        setTrendingBooks(trending.data);
        setNewArrivals(newBooks.data);
        setMostBorrowedBooks(mostBorrowed.data);
      }

      if (isAuthenticated && user) {
        await fetchUserData(user.id);
      }
    } catch (error) {
      console.error("Error fetching home page data:", error);
      toast.error("Failed to fetch home page data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userId: number) => {
    try {
      const recommended = await getRecommendedBooksAPI(userId);
      if (recommended.data) {
        setRecommendedBooks(recommended.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  const handleSearch = (query: string) => {
    navigate(`/book?q=${encodeURIComponent(query)}`);
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleMember = () => {
    navigate("/user/member");
  };

  const handleViewLoans = () => {
    navigate("/user/loan");
  };

  const handleViewReservations = () => {
    navigate("/user/loan");
  };

  return {
    trendingBooks,
    newArrivals,
    mostBorrowedBooks,
    recommendedBooks,
    isAuthenticated,
    user,
    checkCard,
    handleSearch,
    handleBookClick,
    handleRegister,
    handleMember,
    handleViewLoans,
    handleViewReservations,
  };
};
