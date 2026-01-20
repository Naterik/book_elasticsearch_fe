import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInstantSearch } from "./useInstantSearch";
import { SearchDropdown } from "./SearchDropdown";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

export function SearchBar({ initialQuery = "", onSearch, onClear }: SearchBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we are on the books page
  const isSearchPage = location.pathname === "/books";

  const { query, setQuery, data, loading } = useInstantSearch(initialQuery);
  
  // Live Search Effect
  useEffect(() => {
    if (isSearchPage && query !== initialQuery) {
        // Debounce handled in useInstantSearch, but here we trigger external callback
        const timer = setTimeout(() => {
             onSearch?.(query); 
        }, 300);
        return () => clearTimeout(timer);
    }
  }, [query, isSearchPage, onSearch, initialQuery]);

  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    // Default action: Navigate to search page
    navigate(`/books?q=${encodeURIComponent(query)}`);
    onSearch?.(query);
    setFocused(false);
  };

  const handleSuggestionSelect = (
    suggestion: { id: number | string; text: string } | string
  ) => {
    const text = typeof suggestion === "string" ? suggestion : suggestion.text;
    const id = typeof suggestion === "object" ? suggestion.id : null;

    setQuery(text);
    if (id) {
      navigate(
        `/books?q=${encodeURIComponent(text)}&exactId=${id}`
      );
    } else {
      navigate(`/books?q=${encodeURIComponent(text)}`);
    }

    onSearch?.(text);
    setFocused(false);
  };

  const handleBookSelect = (id: number | string) => {
    // If selecting a book directly, we might want to go to detail page OR exact search
    // Plan says: "Selecting "Stone Cold" from dropdown -> Shows 1 result"
    // So distinct book clicks in dropdown probably go to detail page, 
    // BUT suggestion clicks go to exactId search.
    // Let's keep book select as detail page for now, or match likely user intent.
    // If it's a specific book row, usually user expects detail page.
    navigate(`/books/${id}`);
    setFocused(false);
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  // Check if we are on global/home usage (HeroSection)
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Backdrop for focus mode */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-opacity duration-300 pointer-events-none",
          focused ? "opacity-100" : "opacity-0"
        )} 
      />

      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-3xl mx-auto relative z-50 transition-all duration-300",
          isHomePage ? "my-0" : "my-8",
          focused && "scale-[1.02]"
        )}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-2 relative"
        >
          <Input
            type="text"
            placeholder="Search books by title, content, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            // Delay processing of blur to allow clicks on dropdown items to register
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className={cn(
              "w-full pl-12 pr-12 h-14 text-base transition-all duration-300",
              "rounded-xl border-0 shadow-lg ring-1 ring-slate-200",
              isHomePage 
                ? "bg-white/90 backdrop-blur-md focus:bg-white focus:ring-blue-500/30" 
                : "bg-white focus:ring-blue-500/30",
              "placeholder:text-slate-400 text-slate-700 font-medium"
            )}
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Dropdown */}
        {focused && query.trim().length > 0 && (
          <div className="absolute top-full left-0 w-full pt-2">
            <SearchDropdown
              data={data}
              loading={loading}
              onSelect={handleSuggestionSelect}
              onBookSelect={handleBookSelect}
              hideBooks={isSearchPage}
              hideSuggestions={isHomePage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
