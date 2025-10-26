import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/features/client/home/HeroSection";
import FeaturesSection from "@/features/client/home/FeaturesSection";
import ActionableAlerts from "@/features/client/home/ActionableAlerts";
import BookCarousel from "@/features/client/home/BookCarousel";
import MembershipCTA from "@/features/client/home/MembershipCTA";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  getMostBorrowedBooksAPI,
  getNewArrivalBooksAPI,
  getRecommendedBooksAPI,
  getTrendingBooksAPI,
} from "@/services/api";
import { toast } from "sonner";
import IntroPage from "@/features/client/home/Intro";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader, isAuthenticated, user } = useCurrentApp();
  const [trendingBooks, setTrendingBooks] = useState<IBook[] | undefined>([]);
  const [newArrivals, setNewArrivals] = useState<IBook[] | undefined>([]);
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState<IBook[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<IBook[]>([]);
  const checkCard = user?.status === "ACTIVE";

  useEffect(() => {
    fetchHomePageData();
  }, [isAuthenticated, user]);

  const fetchHomePageData = async () => {
    try {
      showLoader();
      const [trending, newBooks, mostBorrowed] = await Promise.all([
        getTrendingBooksAPI(),
        getNewArrivalBooksAPI(),
        getMostBorrowedBooksAPI(),
      ]);
      if ((trending.data, newBooks.data, mostBorrowed.data)) {
        setTrendingBooks(trending?.data);
        setNewArrivals(newBooks?.data);
        setMostBorrowedBooks(mostBorrowed?.data);
      }

      if (isAuthenticated && user) {
        await fetchUserData(user.id);
      }
    } catch (error) {
      console.error("Error fetching home page data:", error);
      toast.error("Failed to fetch home page data");
    } finally {
      hideLoader();
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

  const handleLearnMore = () => {
    navigate("/member");
  };

  const handleMember = () => {
    navigate("/member");
  };

  const handleViewLoans = () => {
    navigate("/loan");
  };

  const handleViewReservations = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        isHaveCard={checkCard}
        onSearch={handleSearch}
        onMember={handleMember}
      />

      {isAuthenticated && (
        <ActionableAlerts
          loans={[]}
          reservations={[]}
          onViewLoans={handleViewLoans}
          onViewReservations={handleViewReservations}
        />
      )}
      <div className="container mx-auto">
        <IntroPage user={user} isHaveCard={checkCard} />
      </div>
      {!isAuthenticated && <FeaturesSection />}
      <div className="container mx-auto">
        <BookCarousel
          title="New Arrivals"
          books={newArrivals}
          onBookClick={handleBookClick}
        />
      </div>
      <div className="container mx-auto">
        <BookCarousel
          title="Most Borrowed"
          books={mostBorrowedBooks}
          onBookClick={handleBookClick}
        />
      </div>
      <div className="container mx-auto">
        {isAuthenticated ? (
          <BookCarousel
            title="Recommended for You"
            books={recommendedBooks}
            onBookClick={handleBookClick}
          />
        ) : (
          <BookCarousel
            title="Trending Now"
            books={trendingBooks}
            onBookClick={handleBookClick}
          />
        )}
      </div>

      {!isAuthenticated && (
        <MembershipCTA
          onRegister={handleRegister}
          onLearnMore={handleLearnMore}
        />
      )}
    </div>
  );
};

export default HomePage;
