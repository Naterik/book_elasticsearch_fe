import React from "react";
import {
  HeroSection,
  FeaturesSection,
  ActionableAlerts,
  BookCarousel,
  MembershipCTA,
  IntroPage,
} from "@/features/client/home/components";
import { useHomePage } from "@/features/client/home/hooks/useHomePage";

const HomePage: React.FC = () => {
  const {
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
    handleLearnMore,
    handleMember,
    handleViewLoans,
    handleViewReservations,
  } = useHomePage();

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
