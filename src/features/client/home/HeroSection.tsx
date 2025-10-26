import SearchBar from "@/components/Search";
import { Button } from "@/components/ui/button";

type Props = {
  isHaveCard: boolean | null;
  onSearch: (query: string) => void;
  onMember: () => void;
};

const HeroSection = ({ isHaveCard, onSearch, onMember }: Props) => {
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

        <SearchBar onSearch={onSearch} />

        {!isHaveCard && (
          <Button
            variant="outline"
            size="lg"
            onClick={onMember}
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
