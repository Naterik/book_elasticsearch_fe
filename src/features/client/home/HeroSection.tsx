import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const HeroSection = ({ isLoggedIn, onSearch, onRegister }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section
      className=" relative py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&h=900&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4 text-center text-white max-w-5xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
          Discover the World of Knowledge
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Thousands of books waiting for you to explore. Search, borrow, and
          read today!
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-10">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-2xl">
            <Input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 focus:ring-0 text-base"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>

        {!isLoggedIn && (
          <Button
            variant="outline"
            size="lg"
            onClick={onRegister}
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-blue-600 shadow-lg"
          >
            Become a Member
          </Button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
